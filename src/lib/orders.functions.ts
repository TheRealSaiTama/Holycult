import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { createPublishableServerClient } from "./supabase-server";
import { generateRefCode } from "./format";
import { SHIPPING_FLAT_CENTS } from "./site";

const shippingSchema = z.object({
  name: z.string().trim().min(2).max(120),
  address: z.string().trim().min(4).max(240),
  city: z.string().trim().min(1).max(120),
  postal: z.string().trim().min(1).max(40),
  country: z.string().trim().min(2).max(60),
});

const cartLineSchema = z.object({
  productId: z.string().uuid(),
  sizeLabel: z.string().min(1).max(12),
  qty: z.number().int().positive().max(10),
});

const placeOrderSchema = z.object({
  email: z.string().email().max(255),
  shipping: shippingSchema,
  lines: z.array(cartLineSchema).min(1).max(20),
});

export interface PlacedOrderResult {
  orderId: string;
  refCode: string;
}

export const placeOrder = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => placeOrderSchema.parse(input))
  .handler(async ({ data }): Promise<PlacedOrderResult> => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    // Fetch product + size info for the cart lines.
    const productIds = Array.from(new Set(data.lines.map((l) => l.productId)));
    const { data: products, error: pErr } = await supabaseAdmin
      .from("products")
      .select("id, ref, name, price_cents, currency, status, product_sizes(label, stock_qty, id)")
      .in("id", productIds);
    if (pErr) throw new Error(pErr.message);
    if (!products || products.length === 0) throw new Error("Cart contains unknown products");

    type ProductRow = (typeof products)[number];
    const byId = new Map<string, ProductRow>(products.map((p) => [p.id, p]));

    let subtotal = 0;
    const itemRows: Array<{
      product_id: string;
      product_name: string;
      product_ref: string;
      size_label: string;
      qty: number;
      unit_price_cents: number;
    }> = [];
    const stockUpdates: Array<{ sizeId: string; nextQty: number }> = [];

    for (const line of data.lines) {
      const product = byId.get(line.productId);
      if (!product || product.status === "draft") throw new Error(`Unavailable product: ${line.productId}`);
      const size = (product.product_sizes ?? []).find((s: { label: string }) => s.label === line.sizeLabel) as
        | { id: string; label: string; stock_qty: number }
        | undefined;
      if (!size) throw new Error(`Size ${line.sizeLabel} not available for ${product.name}`);
      if (size.stock_qty < line.qty) throw new Error(`${product.name} (${line.sizeLabel}) only has ${size.stock_qty} left`);

      subtotal += product.price_cents * line.qty;
      itemRows.push({
        product_id: product.id,
        product_name: product.name,
        product_ref: product.ref,
        size_label: line.sizeLabel,
        qty: line.qty,
        unit_price_cents: product.price_cents,
      });
      stockUpdates.push({ sizeId: size.id, nextQty: size.stock_qty - line.qty });
    }

    const shippingCents = SHIPPING_FLAT_CENTS;
    const totalCents = subtotal + shippingCents;
    const refCode = generateRefCode();

    const { data: order, error: oErr } = await supabaseAdmin
      .from("orders")
      .insert({
        ref_code: refCode,
        email: data.email,
        shipping: data.shipping,
        subtotal_cents: subtotal,
        shipping_cents: shippingCents,
        total_cents: totalCents,
        status: "paid",
      })
      .select("id, ref_code")
      .single();
    if (oErr || !order) throw new Error(oErr?.message ?? "Could not create order");

    const { error: iErr } = await supabaseAdmin
      .from("order_items")
      .insert(itemRows.map((r) => ({ ...r, order_id: order.id })));
    if (iErr) {
      await supabaseAdmin.from("orders").delete().eq("id", order.id);
      throw new Error(iErr.message);
    }

    // Decrement stock — best-effort sequential.
    for (const u of stockUpdates) {
      await supabaseAdmin.from("product_sizes").update({ stock_qty: u.nextQty }).eq("id", u.sizeId);
    }

    return { orderId: order.id, refCode: order.ref_code };
  });

export interface OrderDetail {
  id: string;
  ref_code: string;
  email: string;
  shipping: z.infer<typeof shippingSchema>;
  subtotal_cents: number;
  shipping_cents: number;
  total_cents: number;
  currency: string;
  status: "pending" | "paid" | "fulfilled" | "cancelled";
  created_at: string;
  items: Array<{
    id: string;
    product_id: string | null;
    product_name: string;
    product_ref: string;
    size_label: string;
    qty: number;
    unit_price_cents: number;
  }>;
}

export const getOrder = createServerFn({ method: "GET" })
  .inputValidator((input: { orderId: string }) =>
    z.object({ orderId: z.string().uuid() }).parse(input),
  )
  .handler(async ({ data }): Promise<OrderDetail | null> => {
    const sb = createPublishableServerClient();
    const { data: order, error } = await sb
      .from("orders")
      .select("id, ref_code, email, shipping, subtotal_cents, shipping_cents, total_cents, currency, status, created_at, order_items(id, product_id, product_name, product_ref, size_label, qty, unit_price_cents)")
      .eq("id", data.orderId)
      .maybeSingle();
    if (error) throw new Error(error.message);
    if (!order) return null;
    return {
      ...order,
      shipping: order.shipping as z.infer<typeof shippingSchema>,
      items: (order as unknown as { order_items: OrderDetail["items"] }).order_items ?? [],
    } as OrderDetail;
  });
