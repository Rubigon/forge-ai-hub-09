CREATE TABLE public.ai_service_state (
  id text PRIMARY KEY,
  status integer NOT NULL,
  message text NOT NULL,
  blocked_at timestamptz NOT NULL DEFAULT now()
);
GRANT ALL ON public.ai_service_state TO service_role;
ALTER TABLE public.ai_service_state ENABLE ROW LEVEL SECURITY;
COMMENT ON TABLE public.ai_service_state IS 'Server-only persistent AI access-denial circuit breaker. Clear after provider access is restored; never expose through the browser.';