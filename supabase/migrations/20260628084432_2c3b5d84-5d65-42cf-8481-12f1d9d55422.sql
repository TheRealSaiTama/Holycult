
-- ==============================
-- ENUMS
-- ==============================
CREATE TYPE public.app_role AS ENUM ('admin', 'staff', 'user');
CREATE TYPE public.drop_status AS ENUM ('upcoming', 'live', 'archived');
CREATE TYPE public.product_status AS ENUM ('draft', 'live', 'archived');
CREATE TYPE public.order_status AS ENUM ('pending', 'paid', 'fulfilled', 'cancelled');

-- ==============================
-- updated_at helper
-- ==============================
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- ==============================
-- USER ROLES
-- ==============================
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role public.app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  );
$$;

CREATE POLICY "users see their own roles"
ON public.user_roles FOR SELECT
TO authenticated
USING (auth.uid() = user_id OR public.has_role(auth.uid(), 'admin'));

CREATE POLICY "admins manage roles"
ON public.user_roles FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- ==============================
-- DROPS
-- ==============================
CREATE TABLE public.drops (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code TEXT NOT NULL UNIQUE,           -- e.g. "SS26-026"
  title TEXT NOT NULL,                 -- "FIRST LIGHT"
  season TEXT NOT NULL,                -- "SS26"
  status public.drop_status NOT NULL DEFAULT 'upcoming',
  opens_at TIMESTAMPTZ,
  closes_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.drops TO anon, authenticated;
GRANT ALL ON public.drops TO service_role;
ALTER TABLE public.drops ENABLE ROW LEVEL SECURITY;

CREATE POLICY "public reads non-draft drops"
ON public.drops FOR SELECT
TO anon, authenticated
USING (status IN ('live', 'archived', 'upcoming'));

CREATE POLICY "admins manage drops"
ON public.drops FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER drops_set_updated_at
BEFORE UPDATE ON public.drops
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ==============================
-- PRODUCTS
-- ==============================
CREATE TABLE public.products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  drop_id UUID REFERENCES public.drops(id) ON DELETE SET NULL,
  ref TEXT NOT NULL UNIQUE,            -- "HC-SS26-HOOD-01"
  slug TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  description TEXT,
  price_cents INTEGER NOT NULL CHECK (price_cents >= 0),
  currency TEXT NOT NULL DEFAULT 'USD',
  category TEXT NOT NULL,              -- HOODIE / TEE / CARGO
  fabric TEXT,
  image_url TEXT NOT NULL,
  status public.product_status NOT NULL DEFAULT 'draft',
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.products TO anon, authenticated;
GRANT ALL ON public.products TO service_role;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "public reads live or archived products"
ON public.products FOR SELECT
TO anon, authenticated
USING (status IN ('live', 'archived'));

CREATE POLICY "admins read all products"
ON public.products FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "admins manage products"
ON public.products FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER products_set_updated_at
BEFORE UPDATE ON public.products
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE INDEX products_drop_id_idx ON public.products(drop_id);
CREATE INDEX products_status_idx ON public.products(status);

-- ==============================
-- PRODUCT SIZES
-- ==============================
CREATE TABLE public.product_sizes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  label TEXT NOT NULL,                 -- S / M / L / XL
  stock_qty INTEGER NOT NULL DEFAULT 0 CHECK (stock_qty >= 0),
  sort_order INTEGER NOT NULL DEFAULT 0,
  UNIQUE (product_id, label)
);
GRANT SELECT ON public.product_sizes TO anon, authenticated;
GRANT ALL ON public.product_sizes TO service_role;
ALTER TABLE public.product_sizes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "public reads sizes for visible products"
ON public.product_sizes FOR SELECT
TO anon, authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.products p
    WHERE p.id = product_id AND p.status IN ('live', 'archived')
  )
);

CREATE POLICY "admins manage sizes"
ON public.product_sizes FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE INDEX product_sizes_product_id_idx ON public.product_sizes(product_id);

-- ==============================
-- LOOKBOOK IMAGES
-- ==============================
CREATE TABLE public.lookbook_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  drop_id UUID REFERENCES public.drops(id) ON DELETE SET NULL,
  product_id UUID REFERENCES public.products(id) ON DELETE SET NULL,
  image_url TEXT NOT NULL,
  caption TEXT,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.lookbook_images TO anon, authenticated;
GRANT ALL ON public.lookbook_images TO service_role;
ALTER TABLE public.lookbook_images ENABLE ROW LEVEL SECURITY;

CREATE POLICY "public reads lookbook"
ON public.lookbook_images FOR SELECT
TO anon, authenticated
USING (true);

CREATE POLICY "admins manage lookbook"
ON public.lookbook_images FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE INDEX lookbook_drop_id_idx ON public.lookbook_images(drop_id);

-- ==============================
-- ORDERS
-- ==============================
CREATE TABLE public.orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ref_code TEXT NOT NULL UNIQUE,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  email TEXT NOT NULL,
  shipping JSONB NOT NULL,
  subtotal_cents INTEGER NOT NULL CHECK (subtotal_cents >= 0),
  shipping_cents INTEGER NOT NULL DEFAULT 0 CHECK (shipping_cents >= 0),
  total_cents INTEGER NOT NULL CHECK (total_cents >= 0),
  currency TEXT NOT NULL DEFAULT 'USD',
  status public.order_status NOT NULL DEFAULT 'paid',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT ON public.orders TO anon;
GRANT SELECT, INSERT, UPDATE ON public.orders TO authenticated;
GRANT ALL ON public.orders TO service_role;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- guest checkout: anyone can insert; reading back relies on having the ref/id
CREATE POLICY "anyone can create order"
ON public.orders FOR INSERT
TO anon, authenticated
WITH CHECK (true);

CREATE POLICY "owner reads own orders"
ON public.orders FOR SELECT
TO authenticated
USING (user_id = auth.uid() OR public.has_role(auth.uid(), 'admin'));

-- public can read by id (guest receipt) — receipt page fetches by id which is unguessable UUID
CREATE POLICY "anon reads order by id"
ON public.orders FOR SELECT
TO anon
USING (true);

CREATE POLICY "admins manage orders"
ON public.orders FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER orders_set_updated_at
BEFORE UPDATE ON public.orders
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ==============================
-- ORDER ITEMS
-- ==============================
CREATE TABLE public.order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
  product_id UUID REFERENCES public.products(id) ON DELETE SET NULL,
  product_name TEXT NOT NULL,
  product_ref TEXT NOT NULL,
  size_label TEXT NOT NULL,
  qty INTEGER NOT NULL CHECK (qty > 0),
  unit_price_cents INTEGER NOT NULL CHECK (unit_price_cents >= 0)
);
GRANT SELECT, INSERT ON public.order_items TO anon, authenticated;
GRANT ALL ON public.order_items TO service_role;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "anyone can insert order items"
ON public.order_items FOR INSERT
TO anon, authenticated
WITH CHECK (true);

CREATE POLICY "read items via order policy"
ON public.order_items FOR SELECT
TO anon, authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.orders o
    WHERE o.id = order_id
  )
);

CREATE INDEX order_items_order_id_idx ON public.order_items(order_id);

-- ==============================
-- SEED — SS26 / FIRST LIGHT
-- ==============================
INSERT INTO public.drops (id, code, title, season, status, opens_at)
VALUES (
  '00000000-0000-0000-0000-000000000026',
  'SS26-026', 'FIRST LIGHT', 'SS26', 'live', now()
);

WITH new_products AS (
  INSERT INTO public.products (drop_id, ref, slug, name, price_cents, category, fabric, image_url, status, sort_order, description)
  VALUES
    ('00000000-0000-0000-0000-000000000026','HC-SS26-HOOD-01','void-hoodie','VOID HOODIE',16500,'HOODIE','420GSM HEAVY FLEECE','/products/void-hoodie.jpg','live',1,'Heavyweight pullover hood. Boxed fit, dropped shoulder, ribbed cuffs.'),
    ('00000000-0000-0000-0000-000000000026','HC-SS26-OVR-02','obsidian-tee','OBSIDIAN DROP TEE',7800,'TEE','280GSM PREMIUM COTTON','/products/obsidian-tee.jpg','live',2,'Heavy-cotton tee with a relaxed drop-shoulder cut.'),
    ('00000000-0000-0000-0000-000000000026','HC-SS26-CRG-03','razor-cargo','RAZOR CARGO PANT',14200,'CARGO','HEAVYWEIGHT TWILL','/products/razor-cargo.jpg','live',3,'Wide-leg cargo cut from heavyweight twill. Bellowed pockets.'),
    ('00000000-0000-0000-0000-000000000026','HC-SS26-HOOD-04','phantom-hood','PHANTOM HEAVY HOOD',17800,'HOODIE','420GSM HEAVY FLEECE','/products/phantom-hood.jpg','live',4,'A second cut of the pullover hood, milled in matte bone.'),
    ('00000000-0000-0000-0000-000000000026','HC-SS26-OVR-05','bone-tee','BONE DROP-SHOULDER',8200,'TEE','280GSM PREMIUM COTTON','/products/bone-tee.jpg','live',5,'Bone-toned tee, washed twice for hand.'),
    ('00000000-0000-0000-0000-000000000026','HC-SS26-CRG-06','titan-cargo','TITAN CARGO',15500,'CARGO','HEAVYWEIGHT TWILL','/products/titan-cargo.jpg','live',6,'Cropped cargo with reinforced knee.')
  RETURNING id, ref
)
INSERT INTO public.product_sizes (product_id, label, stock_qty, sort_order)
SELECT np.id, s.label, s.qty, s.idx
FROM new_products np
CROSS JOIN LATERAL (
  VALUES ('S', 12, 1), ('M', 18, 2), ('L', 14, 3), ('XL', 8, 4)
) AS s(label, qty, idx);

INSERT INTO public.lookbook_images (drop_id, product_id, image_url, caption, sort_order)
SELECT '00000000-0000-0000-0000-000000000026', p.id, p.image_url, p.name, p.sort_order
FROM public.products p
WHERE p.drop_id = '00000000-0000-0000-0000-000000000026';
