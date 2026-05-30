## Goal

Get the published worker to pick up the rotated `SUPABASE_SERVICE_ROLE_KEY` so the cron dispatcher's call to `/lovable/email/queue/process` stops 401'ing and the two pending emails flush to `sent`.

## Chosen path: Option 1 (trivial source diff)

Cleanest on my side. Options 2 and 3 are out:
- No "force redeploy" / restart-worker API is exposed to me on this stack.
- Rotating the service_role key again would re-introduce the exact same drift problem (vault updates via my tools, runtime env updates via publish) — it doesn't fix the atomicity issue, it just resets the clock.

A 1-line comment bump in a route file is the lowest-risk way to enable the publish button. The worker rebuilds, runtime env is refreshed from the project's secrets store (which already holds the current service_role key), and the cron call starts succeeding.

## Steps

1. Add a single no-op comment line to `src/routes/lovable/email/queue/process.ts` (e.g. `// redeploy: refresh runtime env for rotated service_role key`). No logic change.
2. Reply to you confirming the publish button should now be enabled. **You hit publish.**
3. After publish completes, I:
   - Poll `cron.job_run_details` until I see a 200 from the new deployment.
   - Pull the last 5 `cron.job_run_details` rows.
   - Pull the final status of the two `email_send_log` entries for `shelleyjackson@gmail.com`.
   - Report back. If both flip to `sent`, Shelley checks her inbox before we move to production DNS.

## Why not touch `package.json`

A version bump there triggers a dependency-resolution path on rebuild. A comment in an already-deployed route file is strictly narrower and won't affect anything else.

## Rollback

None needed — the change is a comment. If for some reason publish still doesn't enable, I'll fall back to a comment bump in a second file (e.g. `src/start.ts`).