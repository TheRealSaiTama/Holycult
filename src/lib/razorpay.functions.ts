import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { generateRefCode } from "./format";
import { SHIPPING_FLAT_CENTS } from "./site";

// Public — surfaces the Razorpay Key ID for the browser checkout SDK.
export const getRazorpayPublicKey = createServerFn({ method: "GET" }).handler(async () => {
  const key = process.env.RAZORPAY_KEY_ID || process.env.VITE_RAZORPAY_KEY_ID || import.meta.env.VITE_RAZORPAY_KEY_ID;
  if (!key) throw new Error("Razorpay key not configured");
  return { keyId: key };
});

const shippingSchema = z.object({
  name: z.string().trim().min(2).max(120),
  phone: z.string().trim().max(40).optional().nullable(),
  address: z.string().trim().min(4).max(240),
  city: z.string().trim().min(1).max(120),
  postal: z.string().trim().min(1).max(40),
  country: z.string().trim().min(2).max(60),
});

const lineSchema = z.object({
  productId: z.string().uuid(),
  sizeLabel: z.string().min(1).max(12),
  qty: z.number().int().positive().max(10),
});

const initSchema = z.object({
  email: z.string().email().max(255),
  shipping: shippingSchema,
  lines: z.array(lineSchema).min(1).max(20),
  userId: z.string().uuid().optional().nullable(),
});

interface InitResult {
  orderId: string; // our DB id
  razorpayOrderId: string;
  amount: number; // smallest unit
  currency: string;
  keyId: string;
  refCode: string;
}

async function razorpayFetch(path: string, init?: RequestInit) {
  const id = process.env.RAZORPAY_KEY_ID || process.env.VITE_RAZORPAY_KEY_ID || import.meta.env.VITE_RAZORPAY_KEY_ID;
  const secret = process.env.RAZORPAY_KEY_SECRET || process.env.VITE_RAZORPAY_KEY_SECRET || import.meta.env.VITE_RAZORPAY_KEY_SECRET;
  if (!id || !secret) throw new Error("Razorpay credentials missing");
  const auth = Buffer.from(`${id}:${secret}`).toString("base64");
  const res = await fetch(`https://api.razorpay.com/v1${path}`, {
    ...init,
    headers: {
      "content-type": "application/json",
      authorization: `Basic ${auth}`,
      ...(init?.headers ?? {}),
    },
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) {
    const msg = (json as { error?: { description?: string } })?.error?.description ?? `Razorpay ${res.status}`;
    throw new Error(msg);
  }
  return json;
}

export const initRazorpayCheckout = createServerFn({ method: "POST" })
  .inputValidator((i: unknown) => initSchema.parse(i))
  .handler(async ({ data }): Promise<InitResult> => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    // Validate cart + price totals server-side.
    const productIds = Array.from(new Set(data.lines.map((l) => l.productId)));
    const { data: products, error: pErr } = await supabaseAdmin
      .from("products")
      .select("id, ref, name, price_cents, currency, status, product_sizes(label, stock_qty, id)")
      .in("id", productIds);
    if (pErr) throw new Error(pErr.message);
    if (!products?.length) throw new Error("Cart contains unknown products");

    type P = (typeof products)[number];
    const byId = new Map<string, P>(products.map((p) => [p.id, p]));

    let subtotal = 0;
    let currency = "INR";
    const itemRows: Array<{
      product_id: string;
      product_name: string;
      product_ref: string;
      size_label: string;
      qty: number;
      unit_price_cents: number;
    }> = [];

    for (const line of data.lines) {
      const product = byId.get(line.productId);
      if (!product || product.status === "draft") throw new Error(`Unavailable: ${line.productId}`);
      const size = (product.product_sizes ?? []).find((s: { label: string }) => s.label === line.sizeLabel) as
        | { id: string; label: string; stock_qty: number }
        | undefined;
      if (!size) throw new Error(`Size ${line.sizeLabel} not available for ${product.name}`);
      if (size.stock_qty < line.qty) throw new Error(`${product.name} (${line.sizeLabel}) only has ${size.stock_qty} left`);
      subtotal += product.price_cents * line.qty;
      currency = product.currency ?? currency;
      itemRows.push({
        product_id: product.id,
        product_name: product.name,
        product_ref: product.ref,
        size_label: line.sizeLabel,
        qty: line.qty,
        unit_price_cents: product.price_cents,
      });
    }

    const shippingCents = SHIPPING_FLAT_CENTS;
    const totalCents = subtotal + shippingCents;
    const refCode = generateRefCode();

    // Create razorpay order
    const rpOrder = (await razorpayFetch("/orders", {
      method: "POST",
      body: JSON.stringify({
        amount: totalCents,
        currency,
        receipt: refCode,
        notes: { email: data.email, ref_code: refCode },
      }),
    })) as { id: string };

    const { data: order, error: oErr } = await supabaseAdmin
      .from("orders")
      .insert({
        ref_code: refCode,
        email: data.email,
        user_id: data.userId ?? null,
        shipping: data.shipping,
        subtotal_cents: subtotal,
        shipping_cents: shippingCents,
        total_cents: totalCents,
        currency,
        status: "pending",
        payment_status: "unpaid",
        razorpay_order_id: rpOrder.id,
      })
      .select("id, ref_code")
      .single();
    if (oErr || !order) throw new Error(oErr?.message ?? "Order create failed");

    const { error: iErr } = await supabaseAdmin
      .from("order_items")
      .insert(itemRows.map((r) => ({ ...r, order_id: order.id })));
    if (iErr) {
      await supabaseAdmin.from("orders").delete().eq("id", order.id);
      throw new Error(iErr.message);
    }

    return {
      orderId: order.id,
      razorpayOrderId: rpOrder.id,
      amount: totalCents,
      currency,
      keyId: (process.env.RAZORPAY_KEY_ID || process.env.VITE_RAZORPAY_KEY_ID || import.meta.env.VITE_RAZORPAY_KEY_ID)!,
      refCode: order.ref_code,
    };
  });

const verifySchema = z.object({
  orderId: z.string().uuid(),
  razorpay_order_id: z.string().min(4),
  razorpay_payment_id: z.string().min(4),
  razorpay_signature: z.string().min(4),
});

export const verifyRazorpayPayment = createServerFn({ method: "POST" })
  .inputValidator((i: unknown) => verifySchema.parse(i))
  .handler(async ({ data }) => {
    const secret = process.env.RAZORPAY_KEY_SECRET || process.env.VITE_RAZORPAY_KEY_SECRET || import.meta.env.VITE_RAZORPAY_KEY_SECRET;
    if (!secret) throw new Error("Razorpay secret missing");

    const { createHmac, timingSafeEqual } = await import("node:crypto");
    const expected = createHmac("sha256", secret)
      .update(`${data.razorpay_order_id}|${data.razorpay_payment_id}`)
      .digest("hex");
    const a = Buffer.from(expected);
    const b = Buffer.from(data.razorpay_signature);
    if (a.length !== b.length || !timingSafeEqual(a, b)) {
      throw new Error("Invalid payment signature");
    }

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    // Mark paid + decrement stock atomically-ish.
    const { data: order, error: oErr } = await supabaseAdmin
      .from("orders")
      .select("id, status, payment_status, razorpay_order_id, order_items(product_id, size_label, qty)")
      .eq("id", data.orderId)
      .maybeSingle();
    if (oErr || !order) throw new Error("Order not found");
    if (order.razorpay_order_id !== data.razorpay_order_id) throw new Error("Order mismatch");
    if (order.payment_status === "paid") return { ok: true, orderId: order.id };

    // Decrement stock for each line.
    type Line = { product_id: string; size_label: string; qty: number };
    for (const line of (order.order_items ?? []) as Line[]) {
      const { data: size } = await supabaseAdmin
        .from("product_sizes")
        .select("id, stock_qty")
        .eq("product_id", line.product_id)
        .eq("label", line.size_label)
        .maybeSingle();
      if (size) {
        await supabaseAdmin
          .from("product_sizes")
          .update({ stock_qty: Math.max(0, size.stock_qty - line.qty) })
          .eq("id", size.id);
      }
    }

    const { error: upErr } = await supabaseAdmin
      .from("orders")
      .update({
        status: "paid",
        payment_status: "paid",
        razorpay_payment_id: data.razorpay_payment_id,
        razorpay_signature: data.razorpay_signature,
      })
      .eq("id", data.orderId);
    if (upErr) throw new Error(upErr.message);

    return { ok: true, orderId: data.orderId };
  });
