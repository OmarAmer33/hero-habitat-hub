## Final approved plan — executing in build mode

### Part 1 — Five content/code fixes

1. **Phone** — `src/content/shelley.ts` L13–14: `902` → `906`.
2. **Testimonials** — `src/routes/index.tsx`: replace `[0,1,2].map()` with three hardcoded entries (Carissa A./Las Vegas, Mike R./Henderson, David K./Summerlin), preserving panel styling.
3. **Duplicate meta** — `src/routes/__root.tsx`: delete L81–86.
4. **OG image** — `src/routes/__root.tsx` L87–88: → `"/og-image.jpg"`.
5. **Rate limiting** — `lead_rate_limit` migration + logic in `submit-lead.ts`, 5/hour/IP, 429 + `Retry-After: 3600`.

### Part 2 — Cloud + leads schema

- Enable Lovable Cloud.
- Migration: `lead_status` enum (`new | contacted | qualified | closed | archived`).
- Migration `public.leads`: standard columns, `status lead_status not null default 'new'`, CHECK constraints on `preferred_contact_method` and `interest`, RLS on, `GRANT ALL TO service_role`.
- Migration `public.lead_rate_limit`.

### Part 3 — Lovable Emails on `notify.superrealtor.com`

- Trigger sender-domain setup dialog (`notify.superrealtor.com`).
- `setup_email_infra` → pgmq queues, RPC wrappers, email tables, cron.
- `scaffold_transactional_email` → server routes + registry.
- New template `src/lib/email-templates/new-lead-notification.tsx` — internal notification to Shelley, brand-consistent, white body bg.
- Wire `submit-lead.ts`: after successful insert, fire-and-forget POST to `/lovable/email/transactional/send` with `idempotencyKey: new-lead-${id}` to `shelleyjackson@gmail.com`. Email failure must not fail submission.

### Part 4 — E2E test + final report

After build green, run on preview URL:

1. Submit a test lead via the contact form.
2. Pull the row from `public.leads` and report contents.
3. Submit 6× rapidly, confirm 6th returns 429.
4. Query `email_send_log` for that lead's send, report status (sent/pending/failed/dlq).
5. Open Cloud table editor on `public.leads`, confirm `status` column renders as a dropdown with the 5 enum values.
6. Surface the two NS records from the email-domain status check:
   - `notify.superrealtor.com  NS  ns3.lovable.cloud`
   - `notify.superrealtor.com  NS  ns4.lovable.cloud`
   (Exact values confirmed from the live tool output — these are Lovable's standard delegation pair, but the report will paste the verified output.)

### Files / migrations

- Edit: `src/content/shelley.ts`, `src/routes/index.tsx`, `src/routes/__root.tsx`, `src/routes/api/public/submit-lead.ts`
- New: `src/lib/email-templates/new-lead-notification.tsx`
- Tool-generated: `src/integrations/supabase/*`, `src/lib/email-templates/registry.ts`, email server routes, `process-email-queue` cron
- Migrations: `lead_status` enum, `leads`, `lead_rate_limit`, email infra (tool-managed)