DO $$
DECLARE
  v_token text;
BEGIN
  -- Get-or-create unsubscribe token for the notify recipient.
  SELECT token INTO v_token
  FROM public.email_unsubscribe_tokens
  WHERE email = 'shelleyjackson@gmail.com';

  IF v_token IS NULL THEN
    v_token := replace(gen_random_uuid()::text, '-', '') || replace(gen_random_uuid()::text, '-', '');
    INSERT INTO public.email_unsubscribe_tokens (token, email)
    VALUES (v_token, 'shelleyjackson@gmail.com')
    ON CONFLICT (email) DO NOTHING;
    SELECT token INTO v_token FROM public.email_unsubscribe_tokens WHERE email = 'shelleyjackson@gmail.com';
  END IF;

  -- Patch the two stuck pgmq messages with the unsubscribe_token field.
  UPDATE pgmq.q_transactional_emails
  SET message = message || jsonb_build_object('unsubscribe_token', v_token),
      vt = now()  -- make immediately visible to the next cron tick
  WHERE (message ->> 'to') = 'shelleyjackson@gmail.com'
    AND NOT (message ? 'unsubscribe_token');
END $$;