CREATE TABLE public.support_sites (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  platform_id TEXT NOT NULL,
  contact_method TEXT NOT NULL,
  contact_value TEXT NOT NULL,
  logo_url TEXT NOT NULL DEFAULT '',
  note TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT SELECT ON public.support_sites TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.support_sites TO authenticated;
GRANT ALL ON public.support_sites TO service_role;

ALTER TABLE public.support_sites ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.is_site_admin()
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT lower(coalesce(auth.jwt() ->> 'email', '')) = 'mt2970446@gmail.com'
$$;

CREATE POLICY "Anyone can view support sites"
ON public.support_sites FOR SELECT
USING (true);

CREATE POLICY "Admin can create support sites"
ON public.support_sites FOR INSERT TO authenticated
WITH CHECK (public.is_site_admin());

CREATE POLICY "Admin can update support sites"
ON public.support_sites FOR UPDATE TO authenticated
USING (public.is_site_admin())
WITH CHECK (public.is_site_admin());

CREATE POLICY "Admin can delete support sites"
ON public.support_sites FOR DELETE TO authenticated
USING (public.is_site_admin());

CREATE OR REPLACE FUNCTION public.support_sites_touch_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$ BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;

CREATE TRIGGER support_sites_updated_at
BEFORE UPDATE ON public.support_sites
FOR EACH ROW EXECUTE FUNCTION public.support_sites_touch_updated_at();