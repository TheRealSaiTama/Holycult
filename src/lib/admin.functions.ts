import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import type { SupabaseClient } from "@supabase/supabase-js";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import type { Database } from "@/integrations/supabase/types";

async function assertAdmin(supabase: SupabaseClient<Database>, userId: string) {
  const { data, error } = await supabase.rpc("has_role", { _user_id: userId, _role: "admin" });
  if (error) throw new Error(error.message);
  if (!data) throw new Error("Forbidden");
}

const sizeInputSchema = z.object({
  label: z.string().trim().min(1).max(12),
  stock_qty: z.number().int().min(0).max(9999),
  sort_order: z.number().int().min(0).max(99),
});

const productInputSchema = z.object({
  id: z.string().uuid().optional(),
  drop_id: z.string().uuid().nullable().optional(),
  ref: z.string().trim().min(2).max(64),
  slug: z.string().trim().min(2).max(80).regex(/^[a-z0-9-]+$/, "lowercase letters, digits, dashes only"),
  name: z.string().trim().min(2).max(120),
  description: z.string().trim().max(2000).optional().nullable(),
  price_cents: z.number().int().min(0).max(10_000_000),
  category: z.string().trim().min(2).max(40),
  fabric: z.string().trim().max(120).optional().nullable(),
  image_url: z.string().trim().min(1).max(500),
  status: z.enum(["draft", "live", "archived"]),
  sort_order: z.number().int().min(0).max(9999),
  sizes: z.array(sizeInputSchema).min(1).max(12),
});

export const adminListProducts = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await assertAdmin(context.supabase, context.userId);
    const { data, error } = await context.supabase
      .from("products")
      .select("id, ref, slug, name, price_cents, category, status, sort_order, image_url, product_sizes(id, label, stock_qty, sort_order)")
      .order("sort_order", { ascending: true });
    if (error) throw new Error(error.message);
    return data ?? [];
  });

export const adminUpsertProduct = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => productInputSchema.parse(input))
  .handler(async ({ data, context }) => {
    await assertAdmin(context.supabase, context.userId);
    const { sizes, id, ...productFields } = data;
    const { data: saved, error } = id
      ? await context.supabase.from("products").update(productFields).eq("id", id).select("id").single()
      : await context.supabase.from("products").insert(productFields).select("id").single();
    if (error || !saved) throw new Error(error?.message ?? "Save failed");

    // Replace sizes (delete + insert) inside this admin scope.
    await context.supabase.from("product_sizes").delete().eq("product_id", saved.id);
    if (sizes.length) {
      const { error: sErr } = await context.supabase
        .from("product_sizes")
        .insert(sizes.map((s) => ({ ...s, product_id: saved.id })));
      if (sErr) throw new Error(sErr.message);
    }
    return { id: saved.id };
  });

export const adminDeleteProduct = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: { id: string }) => z.object({ id: z.string().uuid() }).parse(input))
  .handler(async ({ data, context }) => {
    await assertAdmin(context.supabase, context.userId);
    const { error } = await context.supabase.from("products").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

const lookbookSchema = z.object({
  id: z.string().uuid().optional(),
  drop_id: z.string().uuid().nullable().optional(),
  product_id: z.string().uuid().nullable().optional(),
  image_url: z.string().min(1).max(500),
  caption: z.string().max(200).nullable().optional(),
  sort_order: z.number().int().min(0).max(9999),
});

export const adminListLookbook = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await assertAdmin(context.supabase, context.userId);
    const { data, error } = await context.supabase
      .from("lookbook_images")
      .select("id, drop_id, product_id, image_url, caption, sort_order")
      .order("sort_order", { ascending: true });
    if (error) throw new Error(error.message);
    return data ?? [];
  });

export const adminUpsertLookbook = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => lookbookSchema.parse(input))
  .handler(async ({ data, context }) => {
    await assertAdmin(context.supabase, context.userId);
    const { id, ...fields } = data;
    const { data: saved, error } = id
      ? await context.supabase.from("lookbook_images").update(fields).eq("id", id).select("id").single()
      : await context.supabase.from("lookbook_images").insert(fields).select("id").single();
    if (error || !saved) throw new Error(error?.message ?? "Save failed");
    return { id: saved.id };
  });

export const adminDeleteLookbook = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: { id: string }) => z.object({ id: z.string().uuid() }).parse(input))
  .handler(async ({ data, context }) => {
    await assertAdmin(context.supabase, context.userId);
    const { error } = await context.supabase.from("lookbook_images").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const adminListOrders = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await assertAdmin(context.supabase, context.userId);
    const { data, error } = await context.supabase
      .from("orders")
      .select("id, ref_code, email, total_cents, currency, status, payment_status, razorpay_payment_id, created_at, order_items(qty, product_name, size_label)")
      .order("created_at", { ascending: false })
      .limit(200);
    if (error) throw new Error(error.message);
    return data ?? [];
  });

export const adminUpdateOrderStatus = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) =>
    z
      .object({
        id: z.string().uuid(),
        status: z.enum(["pending", "paid", "fulfilled", "cancelled"]),
      })
      .parse(input),
  )
  .handler(async ({ data, context }) => {
    await assertAdmin(context.supabase, context.userId);
    const { error } = await context.supabase.from("orders").update({ status: data.status }).eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const adminCheckRole = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data, error } = await context.supabase.rpc("has_role", {
      _user_id: context.userId,
      _role: "admin",
    });
    if (error) throw new Error(error.message);
    return { isAdmin: Boolean(data), userId: context.userId };
  });

const sizeChartSchema = z.object({
  id: z.string().uuid().optional(),
  kind: z.string().trim().min(1).max(40).regex(/^[a-z0-9-]+$/, "lowercase letters, digits, dashes only"),
  title: z.string().trim().min(1).max(80),
  unit: z.string().trim().min(1).max(8),
  headers: z.array(z.string().trim().min(1).max(40)).min(2).max(8),
  rows: z.array(z.array(z.string().trim().max(40)).min(2).max(8)).min(1).max(20),
  note: z.string().trim().max(400).nullable().optional(),
});

export const adminListSizeCharts = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await assertAdmin(context.supabase, context.userId);
    const { data, error } = await context.supabase
      .from("size_charts")
      .select("id, kind, title, unit, headers, rows, note")
      .order("kind", { ascending: true });
    if (error) throw new Error(error.message);
    return data ?? [];
  });

export const adminUpsertSizeChart = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => sizeChartSchema.parse(input))
  .handler(async ({ data, context }) => {
    await assertAdmin(context.supabase, context.userId);
    const { id, ...fields } = data;
    const { data: saved, error } = id
      ? await context.supabase.from("size_charts").update(fields).eq("id", id).select("id").single()
      : await context.supabase.from("size_charts").upsert(fields, { onConflict: "kind" }).select("id").single();
    if (error || !saved) throw new Error(error?.message ?? "Save failed");
    return { id: saved.id };
  });

export const adminDeleteSizeChart = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: { id: string }) => z.object({ id: z.string().uuid() }).parse(input))
  .handler(async ({ data, context }) => {
    await assertAdmin(context.supabase, context.userId);
    const { error } = await context.supabase.from("size_charts").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

