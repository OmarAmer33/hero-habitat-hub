
-- lead_status enum
CREATE TYPE public.lead_status AS ENUM ('new','contacted','qualified','closed','archived');

-- leads table
CREATE TABLE public.leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  full_name text NOT NULL,
  email text NOT NULL,
  phone text,
  preferred_contact_method text NOT NULL DEFAULT 'email'
    CHECK (preferred_contact_method IN ('phone','text','email')),
  interest text NOT NULL
    CHECK (interest IN ('buying','selling','leasing','property_management','exploring')),
  best_time_to_contact text NOT NULL DEFAULT 'anytime',
  message text,
  source_path text,
  user_agent text,
  status public.lead_status NOT NULL DEFAULT 'new'
);

GRANT ALL ON public.leads TO service_role;
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- No anon/authenticated policies — all access via service_role server route.
-- (Add policies later if/when an admin viewer is built.)

-- Rate limit table (per-IP, 5/hour window)
CREATE TABLE public.lead_rate_limit (
  ip text PRIMARY KEY,
  window_start timestamptz NOT NULL DEFAULT now(),
  count integer NOT NULL DEFAULT 0
);

GRANT ALL ON public.lead_rate_limit TO service_role;
ALTER TABLE public.lead_rate_limit ENABLE ROW LEVEL SECURITY;

CREATE INDEX leads_created_at_idx ON public.leads (created_at DESC);
CREATE INDEX leads_status_idx ON public.leads (status);
