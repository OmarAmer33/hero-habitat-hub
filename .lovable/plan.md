Execute `email_domain--setup_email_infra` to resync vault `email_queue_service_role_key` with the worker's runtime `SUPABASE_SERVICE_ROLE_KEY`. Then:

1. Wait ~10s for one cron tick.
2. Pull last 5 `cron.job_run_details` rows for jobid=4.
3. Pull last 5 `net._http_response` rows to confirm 200s replaced 403s.
4. Pull final status of both `email_send_log` rows for `shelleyjackson@gmail.com`.
5. Report back.

If 403s persist, stop and surface the auth-model patch diff (switch route + cron to `apikey` header with anon key) for review before any publish.