import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { createPublishableServerClient } from "./supabase-server";

export interface SizeStock { label: string; stock_qty: number; sort_order: number }
export interface CatalogProduct {
  id: string;
  drop_id: string | null;
  ref: string;
  slug: string;
  name: string;
  description: string | null;
  price_cents: number;
  currency: string;
  category: string;
  fabric: string | null;
  image_url: string;
  status: "draft" | "live" | "archived";
  sort_order: number;
  sizes: SizeStock[];
  gender: "MENS" | "WOMENS";
}

const INR_MAP: Record<string, { price: number; gender: "MENS" | "WOMENS" }> = {
  "VOID HOODIE": { price: 249900, gender: "MENS" },
  "OBSIDIAN DROP TEE": { price: 119900, gender: "MENS" },
  "RAZOR CARGO PANT": { price: 199900, gender: "MENS" },
  "PHANTOM HEAVY HOOD": { price: 269900, gender: "MENS" },
  "BONE DROP-SHOULDER": { price: 129900, gender: "MENS" },
  "TITAN CARGO": { price: 219900, gender: "MENS" }
};

const WOMENS_PRODUCTS: CatalogProduct[] = [
  {
    id: "p-w1",
    drop_id: "d-w1",
    ref: "HC-SS26-HOOD-W1",
    slug: "vapor-cropped-hood",
    name: "VAPOR CROPPED HOOD",
    description: "Premium heavyweight cropped fit hoodie with custom metal hardware. Made in very limited quantities.",
    price_cents: 229900,
    currency: "INR",
    category: "HOODIE",
    fabric: "380GSM CROPPED FLEECE",
    image_url: "/products/void-hoodie.jpg",
    status: "live",
    sort_order: 10,
    sizes: [
      { label: "S", stock_qty: 15, sort_order: 1 },
      { label: "M", stock_qty: 25, sort_order: 2 },
      { label: "L", stock_qty: 10, sort_order: 3 },
      { label: "XL", stock_qty: 5, sort_order: 4 }
    ],
    gender: "WOMENS"
  },
  {
    id: "p-w2",
    drop_id: "d-w2",
    ref: "HC-SS26-TEE-W2",
    slug: "eclipse-baby-tee",
    name: "ECLIPSE BABY TEE",
    description: "Ribbed heavyweight baby tee with signature cross embroideries. Slim cropped fit.",
    price_cents: 99900,
    currency: "INR",
    category: "TEE",
    fabric: "220GSM RIBBED COTTON",
    image_url: "/products/obsidian-tee.jpg",
    status: "live",
    sort_order: 11,
    sizes: [
      { label: "S", stock_qty: 20, sort_order: 1 },
      { label: "M", stock_qty: 30, sort_order: 2 },
      { label: "L", stock_qty: 15, sort_order: 3 }
    ],
    gender: "WOMENS"
  },
  {
    id: "p-w3",
    drop_id: "d-w3",
    ref: "HC-SS26-PNT-W3",
    slug: "parachute-track-pant",
    name: "PARACHUTE TRACK PANT",
    description: "Ultra loose fit nylon ripstop track pants with adjustable toggle cords. Windproof and water-resistant.",
    price_cents: 189900,
    currency: "INR",
    category: "PANTS",
    fabric: "NYLON RIPSTOP",
    image_url: "/products/razor-cargo.jpg",
    status: "live",
    sort_order: 12,
    sizes: [
      { label: "S", stock_qty: 12, sort_order: 1 },
      { label: "M", stock_qty: 18, sort_order: 2 },
      { label: "L", stock_qty: 15, sort_order: 3 },
      { label: "XL", stock_qty: 8, sort_order: 4 }
    ],
    gender: "WOMENS"
  }
];

export interface LookbookImage {
  id: string;
  drop_id: string | null;
  product_id: string | null;
  image_url: string;
  caption: string | null;
  sort_order: number;
}

export interface DropRow {
  id: string;
  code: string;
  title: string;
  season: string;
  status: "upcoming" | "live" | "archived";
  opens_at: string | null;
  closes_at: string | null;
}

export const listProducts = createServerFn({ method: "GET" })
  .inputValidator((input: { status?: "live" | "archived" } | undefined) =>
    z
      .object({ status: z.enum(["live", "archived"]).optional() })
      .optional()
      .parse(input) ?? {},
  )
  .handler(async ({ data }) => {
    const sb = createPublishableServerClient();
    const status = data?.status ?? "live";
    const { data: products, error } = await sb
      .from("products")
      .select("id, drop_id, ref, slug, name, description, price_cents, currency, category, fabric, image_url, status, sort_order, product_sizes(label, stock_qty, sort_order)")
      .eq("status", status)
      .order("sort_order", { ascending: true });
    if (error) throw new Error(error.message);
    
    const mapped = (products ?? []).map<CatalogProduct>((p) => {
      const match = INR_MAP[p.name.toUpperCase()];
      return {
        ...p,
        price_cents: match ? match.price : p.price_cents * 80,
        currency: "INR",
        gender: match ? match.gender : "MENS",
        sizes: ((p as unknown as { product_sizes: SizeStock[] }).product_sizes ?? [])
          .slice()
          .sort((a, b) => a.sort_order - b.sort_order),
      };
    });

    if (status === "live") {
      return [...mapped, ...WOMENS_PRODUCTS];
    }
    return mapped;
  });

export const getProductBySlug = createServerFn({ method: "GET" })
  .inputValidator((input: { slug: string }) =>
    z.object({ slug: z.string().min(1).max(120) }).parse(input),
  )
  .handler(async ({ data }) => {
    if (data.slug === "vapor-cropped-hood") return WOMENS_PRODUCTS[0];
    if (data.slug === "eclipse-baby-tee") return WOMENS_PRODUCTS[1];
    if (data.slug === "parachute-track-pant") return WOMENS_PRODUCTS[2];

    const sb = createPublishableServerClient();
    const { data: product, error } = await sb
      .from("products")
      .select("id, drop_id, ref, slug, name, description, price_cents, currency, category, fabric, image_url, status, sort_order, product_sizes(label, stock_qty, sort_order)")
      .eq("slug", data.slug)
      .maybeSingle();
    if (error) throw new Error(error.message);
    if (!product) return null;

    const match = INR_MAP[product.name.toUpperCase()];
    return {
      ...product,
      price_cents: match ? match.price : product.price_cents * 80,
      currency: "INR",
      gender: match ? match.gender : "MENS",
      sizes: ((product as unknown as { product_sizes: SizeStock[] }).product_sizes ?? [])
        .slice()
        .sort((a, b) => a.sort_order - b.sort_order),
    } as CatalogProduct;
  });

export const listLookbook = createServerFn({ method: "GET" }).handler(async () => {
  const sb = createPublishableServerClient();
  const { data, error } = await sb
    .from("lookbook_images")
    .select("id, drop_id, product_id, image_url, caption, sort_order")
    .order("sort_order", { ascending: true });
  if (error) throw new Error(error.message);
  return (data ?? []) as LookbookImage[];
});

export const listArchivedDrops = createServerFn({ method: "GET" }).handler(async () => {
  const sb = createPublishableServerClient();
  const { data, error } = await sb
    .from("drops")
    .select("id, code, title, season, status, opens_at, closes_at")
    .in("status", ["archived", "live"])
    .order("opens_at", { ascending: false, nullsFirst: false });
  if (error) throw new Error(error.message);
  return (data ?? []) as DropRow[];
});

export const getCurrentDrop = createServerFn({ method: "GET" }).handler(async () => {
  const sb = createPublishableServerClient();
  const { data, error } = await sb
    .from("drops")
    .select("id, code, title, season, status, opens_at, closes_at")
    .eq("status", "live")
    .order("opens_at", { ascending: false, nullsFirst: false })
    .limit(1)
    .maybeSingle();
  if (error) throw new Error(error.message);
  return (data ?? null) as DropRow | null;
});

export interface SizeChart {
  id: string;
  kind: string;
  title: string;
  unit: string;
  headers: string[];
  rows: string[][];
  note: string | null;
}

export const listSizeCharts = createServerFn({ method: "GET" }).handler(async () => {
  const sb = createPublishableServerClient();
  const { data, error } = await sb
    .from("size_charts")
    .select("id, kind, title, unit, headers, rows, note")
    .order("kind", { ascending: true });
  if (error) throw new Error(error.message);
  return (data ?? []) as unknown as SizeChart[];
});

