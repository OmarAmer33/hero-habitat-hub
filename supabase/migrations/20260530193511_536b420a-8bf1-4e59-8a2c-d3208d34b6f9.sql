SELECT cron.alter_job(
  (SELECT jobid FROM cron.job WHERE jobname = 'process-email-queue'),
  command := $cmd$
  SELECT CASE
    WHEN (SELECT retry_after_until FROM public.email_send_state WHERE id = 1) > now() THEN NULL
    WHEN EXISTS (SELECT 1 FROM pgmq.q_auth_emails LIMIT 1)
      OR EXISTS (SELECT 1 FROM pgmq.q_transactional_emails LIMIT 1)
    THEN net.http_post(
      url := 'https://hero-habitat-hub.lovable.app/lovable/email/queue/process',
      headers := jsonb_build_object(
        'Content-Type', 'application/json',
        'apikey', 'sb_publishable_9fbN1V_Xs_uudf6LztCzwg_NbPAyJOY'
      ),
      body := '{}'::jsonb
    )
    ELSE NULL
  END;
  $cmd$
);