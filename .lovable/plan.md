
# HOLYCULT — Phase 3+4 Build

A full upgrade pass: real backend, multi-item cart, admin CMS, gallery, and a mobile/typography polish — all built scalable so nothing about the storefront stays hardcoded.

## 1. Enable Lovable Cloud
Backend powers products, inventory, orders, lookbook, and admin auth. Everything currently in `data.ts` moves into the database; the storefront reads via TanStack Query.

## 2. Database schema
````text
products(id, ref, slug, name, price_cents, category, fabric,
         image_url, description, status [draft|live|archived],
         drop_id, sort_order, created_at)

product_sizes(id, product_id, label, stock_qty)

lookbook_images(id, product_id?, image_url, caption, sort_order)

drops(id, code, title, season, status [upcoming|live|archived], opens_at)

orders(id, user_id?, email, shipping_json, subtotal_cents,
       shipping_cents, total_cents, status, ref_code, created_at)

order_items(id, order_id, product_id, size_label, qty, unit_price_cents)

user_roles(user_id, role)   -- has_role(uid, 'admin') for CMS gate
````
RLS: public SELECT on `products` / `product_sizes` / `lookbook_images` / `drops` where `status != 'draft'`. Orders are insertable by anyone (guest checkout) and readable by owner or admin. Admin-only writes everywhere else via `has_role`.

## 3. Cart system
- Zustand store persisted to `localStorage` (lines: productId, sizeLabel, qty, snapshot of price/name/image).
- `/cart` page: line items, qty +/-, remove, subtotal, "PROCEED".
- Cart drawer (sheet) opens from nav on every page with live count badge.
- Server validates stock at checkout against `product_sizes.stock_qty` and decrements atomically inside a server function.

## 4. Checkout flow
- `/checkout` reads cart, collects shipping (zod-validated), calls `placeOrder` server fn which creates `orders` + `order_items`, decrements stock, returns order ref.
- Redirects to `/receipt/$orderId` (existing receipt UI, now reading from DB).
- Existing per-product `/checkout/$productId` becomes a thin "buy now" → adds to cart → straight to `/checkout`.

## 5. Admin CMS (`/admin`)
- Gated by `_authenticated` layout + `has_role(uid,'admin')` check; non-admins get a polite 403.
- `/admin` dashboard: order count, live drop, low-stock alerts.
- `/admin/products`: list + create/edit form (name, ref, price, category, fabric, image upload to Supabase Storage, sizes table with stock).
- `/admin/lookbook`: image manager with drag-sort.
- `/admin/orders`: orders list, mark fulfilled.
- `/admin/drops`: create/curate drops.
All forms zod-validated, mutations via TanStack Query + `useServerFn`.

## 6. Lookbook gallery
- Pulls from `lookbook_images` ordered by `sort_order`.
- Masonry grid (CSS columns) with lightbox: tap to expand, swipe between, links to product. Lazy-loaded images, fade-in on view.

## 7. Mobile polish
- Hamburger drawer nav (sheet) with full link list + cart, ENTER CTA pinned.
- Fluid type clamps tuned per breakpoint; hero composition reflows so HOLY/CULT type isn't clipped on narrow screens.
- Sticky add-to-cart bar on product/checkout on mobile.
- Tap targets ≥ 44px, safe-area insets respected, focus rings preserved.

## 8. Typography + decor polish
- Ligatures, OpenType `ss01`/`tnum`/`case` features on display + mono.
- Refined scale: `.display-xl/.lg/.md` rebalanced with letter-spacing per size.
- Decor primitives (reusable): `<Crosshair/>`, `<Rule label="002"/>` ruled divider with section number, `<MarqueeStrip/>`, `<MetaLine/>` (rotated mono caption), `<BronzeAura/>`. Drop into any page.
- Hairline section numbers in margins on desktop, subtle grain overlay token.

## 9. Scalable architecture
- `src/lib/api/*.functions.ts` — server fns: `listProducts`, `getProductBySlug`, `placeOrder`, `getOrder`, `listLookbook`, admin CRUD fns.
- `src/lib/cart/store.ts` — zustand cart.
- `src/lib/queries.ts` — `queryOptions` factories used by both loaders and components.
- `src/components/storefront/*` — presentational pieces (ProductCard, CartLine, SizePicker, etc).
- `src/components/admin/*` — admin shell, form fields.
- `src/components/decor/*` — reusable decoration primitives.
- All copy/content driven by DB or a single `src/content/site.ts` (nav links, footer columns, ethos copy) — no string-literal duplication across routes.

## Technical notes
- Seed migration loads the current 6 products + lookbook + a `holycult` admin role grant template (admin user created on first signup matching configured email, or promoted manually).
- Server fns: `requireSupabaseAuth` for admin writes, `placeOrder` accepts guest carts (no auth required) but rate-limits by IP via a simple `order_attempts` table.
- All money in integer cents; formatter helper `formatPrice(cents, currency)`.
- Image uploads via `supabase.storage` bucket `products` (public read, admin write).
- TanStack Query everywhere; `defaultPreloadStaleTime: 0` already set.

## Build order
1. Enable Cloud + migration (schema, RLS, seed, storage bucket, admin role).
2. Server fns + query options + cart store.
3. Refactor `/drop`, `/`, `/lookbook`, `/archive` to read from DB.
4. Cart drawer + `/cart` + new `/checkout` flow + receipt from DB.
5. Admin auth shell + product/lookbook/order/drop CMS.
6. Mobile nav drawer, sticky bars, responsive sweep.
7. Decor primitives + typography refinement applied site-wide.

Approve and I'll start with the migration and server-fn foundation, then ship the rest in order.
