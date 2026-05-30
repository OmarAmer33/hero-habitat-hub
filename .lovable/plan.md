1. Edit `src/routes/lovable/email/queue/process.ts` lines 82–90: replace Bearer+SERVICE_ROLE_KEY check with `apikey` header check against `import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY`. Add TODO comment noting `vault.email_queue_service_role_key` is now orphaned and can be dropped in a follow-up migration.
2. Run cron migration: `cron.alter_job(4, ...)` to switch header to `apikey: <publishable-key>`.
3. Surface publish button. Wait for user to publish.
4. After publish: poll cron details + email_send_log + net._http_response. Report.

Vault cleanup deferred to a follow-up migration per user request — TODO marker added in route file as a breadcrumb.