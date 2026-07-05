import { i as SHIPPING_FLAT_CENTS, s as generateRefCode } from "./site-DdWOgeii.mjs";
import { l as createServerFn } from "./esm-Dova13aH.mjs";
import { a as objectType, i as numberType, o as stringType, t as arrayType } from "../_libs/zod.mjs";
import { t as createServerRpc } from "./createServerRpc-WJgk8O8C.mjs";
import { t as createPublishableServerClient } from "./supabase-server-CghjYImo.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/orders.functions-BUKWlzWX.js
var shippingSchema = objectType({
	name: stringType().trim().min(2).max(120),
	address: stringType().trim().min(4).max(240),
	city: stringType().trim().min(1).max(120),
	postal: stringType().trim().min(1).max(40),
	country: stringType().trim().min(2).max(60)
});
var cartLineSchema = objectType({
	productId: stringType().uuid(),
	sizeLabel: stringType().min(1).max(12),
	qty: numberType().int().positive().max(10)
});
var placeOrderSchema = objectType({
	email: stringType().email().max(255),
	shipping: shippingSchema,
	lines: arrayType(cartLineSchema).min(1).max(20)
});
var placeOrder_createServerFn_handler = createServerRpc({
	id: "a6485a0caa6c7276b8f38fd2e39c7cd965ae3addca5ff318987f97661206380a",
	name: "placeOrder",
	filename: "src/lib/orders.functions.ts"
}, (opts) => placeOrder.__executeServer(opts));
var placeOrder = createServerFn({ method: "POST" }).inputValidator((input) => placeOrderSchema.parse(input)).handler(placeOrder_createServerFn_handler, async ({ data }) => {
	const { supabaseAdmin } = await import("./client.server-CMWGB301.mjs");
	const productIds = Array.from(new Set(data.lines.map((l) => l.productId)));
	const { data: products, error: pErr } = await supabaseAdmin.from("products").select("id, ref, name, price_cents, currency, status, product_sizes(label, stock_qty, id)").in("id", productIds);
	if (pErr) throw new Error(pErr.message);
	if (!products || products.length === 0) throw new Error("Cart contains unknown products");
	const byId = new Map(products.map((p) => [p.id, p]));
	let subtotal = 0;
	const itemRows = [];
	const stockUpdates = [];
	for (const line of data.lines) {
		const product = byId.get(line.productId);
		if (!product || product.status === "draft") throw new Error(`Unavailable product: ${line.productId}`);
		const size = (product.product_sizes ?? []).find((s) => s.label === line.sizeLabel);
		if (!size) throw new Error(`Size ${line.sizeLabel} not available for ${product.name}`);
		if (size.stock_qty < line.qty) throw new Error(`${product.name} (${line.sizeLabel}) only has ${size.stock_qty} left`);
		subtotal += product.price_cents * line.qty;
		itemRows.push({
			product_id: product.id,
			product_name: product.name,
			product_ref: product.ref,
			size_label: line.sizeLabel,
			qty: line.qty,
			unit_price_cents: product.price_cents
		});
		stockUpdates.push({
			sizeId: size.id,
			nextQty: size.stock_qty - line.qty
		});
	}
	const shippingCents = SHIPPING_FLAT_CENTS;
	const totalCents = subtotal + shippingCents;
	const refCode = generateRefCode();
	const { data: order, error: oErr } = await supabaseAdmin.from("orders").insert({
		ref_code: refCode,
		email: data.email,
		shipping: data.shipping,
		subtotal_cents: subtotal,
		shipping_cents: shippingCents,
		total_cents: totalCents,
		status: "paid"
	}).select("id, ref_code").single();
	if (oErr || !order) throw new Error(oErr?.message ?? "Could not create order");
	const { error: iErr } = await supabaseAdmin.from("order_items").insert(itemRows.map((r) => ({
		...r,
		order_id: order.id
	})));
	if (iErr) {
		await supabaseAdmin.from("orders").delete().eq("id", order.id);
		throw new Error(iErr.message);
	}
	for (const u of stockUpdates) await supabaseAdmin.from("product_sizes").update({ stock_qty: u.nextQty }).eq("id", u.sizeId);
	return {
		orderId: order.id,
		refCode: order.ref_code
	};
});
var getOrder_createServerFn_handler = createServerRpc({
	id: "8d89b7179a61ab3d48e536226751a804c2a4a27f478238699b8c0eb2189983ec",
	name: "getOrder",
	filename: "src/lib/orders.functions.ts"
}, (opts) => getOrder.__executeServer(opts));
var getOrder = createServerFn({ method: "GET" }).inputValidator((input) => objectType({ orderId: stringType().uuid() }).parse(input)).handler(getOrder_createServerFn_handler, async ({ data }) => {
	const { data: order, error } = await createPublishableServerClient().from("orders").select("id, ref_code, email, shipping, subtotal_cents, shipping_cents, total_cents, currency, status, created_at, order_items(id, product_id, product_name, product_ref, size_label, qty, unit_price_cents)").eq("id", data.orderId).maybeSingle();
	if (error) throw new Error(error.message);
	if (!order) return null;
	return {
		...order,
		shipping: order.shipping,
		items: order.order_items ?? []
	};
});
//#endregion
export { getOrder_createServerFn_handler, placeOrder_createServerFn_handler };
