
CREATE TABLE public.size_charts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  kind TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  unit TEXT NOT NULL DEFAULT 'cm',
  headers JSONB NOT NULL DEFAULT '[]'::jsonb,
  rows JSONB NOT NULL DEFAULT '[]'::jsonb,
  note TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT SELECT ON public.size_charts TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.size_charts TO authenticated;
GRANT ALL ON public.size_charts TO service_role;

ALTER TABLE public.size_charts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "size_charts_public_read" ON public.size_charts FOR SELECT USING (true);
CREATE POLICY "size_charts_admin_write" ON public.size_charts FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER size_charts_set_updated_at BEFORE UPDATE ON public.size_charts
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

INSERT INTO public.size_charts (kind, title, unit, headers, rows, note) VALUES
('tops', 'TOPS & HOODIES', 'cm',
 '["SIZE","CHEST","LENGTH","SLEEVE"]'::jsonb,
 '[["S","96","70","62"],["M","102","72","64"],["L","108","74","66"],["XL","114","76","68"]]'::jsonb,
 'Cut for a relaxed, drop-shoulder fit. Between sizes? Size down for a closer fit, up for the oversized silhouette.'),
('bottoms', 'BOTTOMS', 'cm',
 '["SIZE","WAIST","HIP","INSEAM"]'::jsonb,
 '[["S","76","94","104"],["M","82","100","106"],["L","88","106","108"],["XL","94","112","110"]]'::jsonb,
 'Mid-rise, relaxed leg. Measure a pair you love flat and compare.');
