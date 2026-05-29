Resuming the previously approved plan (already documented in `.lovable/plan.md`). No scope changes — this is the execution pass.

## Part 2 — Cloud + leads schema

1. Enable Lovable Cloud (credits now topped up).
2. Migration: `lead_status` enum (`new | contacted | qualified | closed | archived`).
3. Migration `public.leads`:
   - `id uuid pk default gen_random_uuid()`, `created_at timestamptz default now()`
   - `full_name`, `email`, `phone`, `message`, `source_path`, `user_agent`
   - `preferred_contact_method text` + CHECK in (`phone`, `text`, `email`)
   - `interest text` + CHECK in (`buying`, `selling`, `leasing`, `property_management`, `exploring`)
   - `best_time_to_contact text`
   - `status lead_status not null default 'new'`
   - RLS enabled; `GRANT ALL ON public.leads TO service_role` only (no anon/authenticated — all writes go through service-role server route)
4. Migration `public.lead_rate_limit (ip text, window_start timestamptz, count int)` for the 5/hour limiter.
5. Add rate-limit logic to `src/routes/api/public/submit-lead.ts`: 5 inserts/hour/IP → `429` with `Retry-After: 3600` on the 6th.

## Part 3 — Lovable Emails on `notify.superrealtor.com`

1. Trigger sender-domain setup dialog for `notify.superrealtor.com`.
2. Run `setup_email_infra` (pgmq queues, RPC wrappers, email tables, cron job, vault secret).
3. Run `scaffold_transactional_email` (server routes + `registry.ts`).
4. Create `src/lib/email-templates/new-lead-notification.tsx` — internal notification template to Shelley. Brand-consistent (Super Realtor comic-style colors), white body bg, displays full lead details. Optional `templateData` props: `fullName`, `email`, `phone`, `interest`, `preferredContactMethod`, `bestTimeToContact`, `message`, `sourcePath`.
5. Register the template in `src/lib/email-templates/registry.ts`.
6. Wire `submit-lead.ts`: after successful insert, fire-and-forget call to `/lovable/email/transactional/send` with:
   - `templateName: 'new-lead-notification'`
   - `recipientEmail: 'shelleyjackson@gmail.com'`
   - `idempotencyKey: new-lead-${id}`
   - `templateData: { ...lead fields }`
   - Service-role auth (this is a public unauthenticated form, per the public-trigger pattern).
   - Email failure must NOT fail the submission — wrap in try/catch, log only.

## Part 4 — E2E test on preview URL

After build green:

1. POST a test lead to `/api/public/submit-lead` on the preview URL via `stack_modern--invoke-server-function`.
2. Query `public.leads` for the row; report all column values (esp. `status='new'`, constraints held).
3. POST 6× rapidly from the same IP context; confirm the 6th returns `429` with `Retry-After: 3600`.
4. Query `email_send_log` for the test send; report `status` (`pending` → `sent` / `failed` / `dlq`).
5. Confirm `lead_status` enum exists with all 5 values (table editor renders it as a native dropdown).
6. Run `email_domain--check_email_domain_status` and surface the exact two NS records for the user to paste at the registrar.

## Final report

A single message with:
- Lead row contents (JSON)
- 429 response body + `Retry-After` header confirmation
- `email_send_log` row status
- Enum verification (5 values present)
- Two NS records, copy-paste ready
- Any failure / partial-success notes
