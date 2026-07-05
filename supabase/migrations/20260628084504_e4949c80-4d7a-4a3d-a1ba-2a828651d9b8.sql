
-- 1) Lock down has_role: only the database itself (in policies) should call it.
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) FROM PUBLIC, anon, authenticated;

-- 2) Replace permissive INSERT policies with predicate-based ones.
DROP POLICY IF EXISTS "anyone can create order" ON public.orders;
CREATE POLICY "anyone can create order"
ON public.orders FOR INSERT
TO anon, authenticated
WITH CHECK (
  length(email) >= 5
  AND total_cents >= 0
  AND subtotal_cents >= 0
  AND (user_id IS NULL OR user_id = auth.uid())
);

DROP POLICY IF EXISTS "anyone can insert order items" ON public.order_items;
CREATE POLICY "anyone can insert order items"
ON public.order_items FOR INSERT
TO anon, authenticated
WITH CHECK (
  qty > 0
  AND unit_price_cents >= 0
  AND EXISTS (SELECT 1 FROM public.orders o WHERE o.id = order_id)
);
