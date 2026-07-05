import { i as SHIPPING_FLAT_CENTS, s as generateRefCode } from "./site-DdWOgeii.mjs";
import { l as createServerFn } from "./esm-Dova13aH.mjs";
import { a as objectType, i as numberType, o as stringType, t as arrayType } from "../_libs/zod.mjs";
import { t as createServerRpc } from "./createServerRpc-WJgk8O8C.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/razorpay.functions-BUU84_5A.js
var getRazorpayPublicKey_createServerFn_handler = createServerRpc({
	id: "8021b06e43030dd8809c4eae6e5f48603276a689f66cb131d259ebe736a5dc56",
	name: "getRazorpayPublicKey",
	filename: "src/lib/razorpay.functions.ts"
}, (opts) => getRazorpayPublicKey.__executeServer(opts));
var getRazorpayPublicKey = createServerFn({ method: "GET" }).handler(getRazorpayPublicKey_createServerFn_handler, async () => {
	const key = process.env.RAZORPAY_KEY_ID || process.env.VITE_RAZORPAY_KEY_ID || void 0;
	if (!key) throw new Error("Razorpay key not configured");
	return { keyId: key };
});
var shippingSchema = objectType({
	name: stringType().trim().min(2).max(120),
	phone: stringType().trim().max(40).optional().nullable(),
	address: stringType().trim().min(4).max(240),
	city: stringType().trim().min(1).max(120),
	postal: stringType().trim().min(1).max(40),
	country: stringType().trim().min(2).max(60)
});
var lineSchema = objectType({
	productId: stringType().uuid(),
	sizeLabel: stringType().min(1).max(12),
	qty: numberType().int().positive().max(10)
});
var initSchema = objectType({
	email: stringType().email().max(255),
	shipping: shippingSchema,
	lines: arrayType(lineSchema).min(1).max(20),
	userId: stringType().uuid().optional().nullable()
});
async function razorpayFetch(path, init) {
	const id = process.env.RAZORPAY_KEY_ID || process.env.VITE_RAZORPAY_KEY_ID || void 0;
	const secret = process.env.RAZORPAY_KEY_SECRET || process.env.VITE_RAZORPAY_KEY_SECRET || void 0;
	if (!id || !secret) throw new Error("Razorpay credentials missing");
	const auth = Buffer.from(`${id}:${secret}`).toString("base64");
	const res = await fetch(`https://api.razorpay.com/v1${path}`, {
		...init,
		headers: {
			"content-type": "application/json",
			authorization: `Basic ${auth}`,
			...init?.headers ?? {}
		}
	});
	const json = await res.json().catch(() => ({}));
	if (!res.ok) {
		const msg = json?.error?.description ?? `Razorpay ${res.status}`;
		throw new Error(msg);
	}
	return json;
}
var initRazorpayCheckout_createServerFn_handler = createServerRpc({
	id: "e1560354334364e68896556f3b50366b649b8fac3942074b6a17138c4dc487a4",
	name: "initRazorpayCheckout",
	filename: "src/lib/razorpay.functions.ts"
}, (opts) => initRazorpayCheckout.__executeServer(opts));
var initRazorpayCheckout = createServerFn({ method: "POST" }).inputValidator((i) => initSchema.parse(i)).handler(initRazorpayCheckout_createServerFn_handler, async ({ data }) => {
	const { supabaseAdmin } = await import("./client.server-CMWGB301.mjs");
	const productIds = Array.from(new Set(data.lines.map((l) => l.productId)));
	const { data: products, error: pErr } = await supabaseAdmin.from("products").select("id, ref, name, price_cents, currency, status, product_sizes(label, stock_qty, id)").in("id", productIds);
	if (pErr) throw new Error(pErr.message);
	if (!products?.length) throw new Error("Cart contains unknown products");
	const byId = new Map(products.map((p) => [p.id, p]));
	let subtotal = 0;
	let currency = "INR";
	const itemRows = [];
	for (const line of data.lines) {
		const product = byId.get(line.productId);
		if (!product || product.status === "draft") throw new Error(`Unavailable: ${line.productId}`);
		const size = (product.product_sizes ?? []).find((s) => s.label === line.sizeLabel);
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
			unit_price_cents: product.price_cents
		});
	}
	const shippingCents = SHIPPING_FLAT_CENTS;
	const totalCents = subtotal + shippingCents;
	const refCode = generateRefCode();
	const rpOrder = await razorpayFetch("/orders", {
		method: "POST",
		body: JSON.stringify({
			amount: totalCents,
			currency,
			receipt: refCode,
			notes: {
				email: data.email,
				ref_code: refCode
			}
		})
	});
	const { data: order, error: oErr } = await supabaseAdmin.from("orders").insert({
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
		razorpay_order_id: rpOrder.id
	}).select("id, ref_code").single();
	if (oErr || !order) throw new Error(oErr?.message ?? "Order create failed");
	const { error: iErr } = await supabaseAdmin.from("order_items").insert(itemRows.map((r) => ({
		...r,
		order_id: order.id
	})));
	if (iErr) {
		await supabaseAdmin.from("orders").delete().eq("id", order.id);
		throw new Error(iErr.message);
	}
	return {
		orderId: order.id,
		razorpayOrderId: rpOrder.id,
		amount: totalCents,
		currency,
		keyId: process.env.RAZORPAY_KEY_ID || process.env.VITE_RAZORPAY_KEY_ID || void 0,
		refCode: order.ref_code
	};
});
var verifySchema = objectType({
	orderId: stringType().uuid(),
	razorpay_order_id: stringType().min(4),
	razorpay_payment_id: stringType().min(4),
	razorpay_signature: stringType().min(4)
});
var verifyRazorpayPayment_createServerFn_handler = createServerRpc({
	id: "5e2c6a85ce8b9f3a92cd9b0a9b4d8f015d9ec2fa0b30eb31f8605ecef9f67199",
	name: "verifyRazorpayPayment",
	filename: "src/lib/razorpay.functions.ts"
}, (opts) => verifyRazorpayPayment.__executeServer(opts));
var verifyRazorpayPayment = createServerFn({ method: "POST" }).inputValidator((i) => verifySchema.parse(i)).handler(verifyRazorpayPayment_createServerFn_handler, async ({ data }) => {
	const secret = process.env.RAZORPAY_KEY_SECRET || process.env.VITE_RAZORPAY_KEY_SECRET || void 0;
	if (!secret) throw new Error("Razorpay secret missing");
	const { createHmac, timingSafeEqual } = await import("node:crypto");
	const expected = createHmac("sha256", secret).update(`${data.razorpay_order_id}|${data.razorpay_payment_id}`).digest("hex");
	const a = Buffer.from(expected);
	const b = Buffer.from(data.razorpay_signature);
	if (a.length !== b.length || !timingSafeEqual(a, b)) throw new Error("Invalid payment signature");
	const { supabaseAdmin } = await import("./client.server-CMWGB301.mjs");
	const { data: order, error: oErr } = await supabaseAdmin.from("orders").select("id, status, payment_status, razorpay_order_id, order_items(product_id, size_label, qty)").eq("id", data.orderId).maybeSingle();
	if (oErr || !order) throw new Error("Order not found");
	if (order.razorpay_order_id !== data.razorpay_order_id) throw new Error("Order mismatch");
	if (order.payment_status === "paid") return {
		ok: true,
		orderId: order.id
	};
	for (const line of order.order_items ?? []) {
		const { data: size } = await supabaseAdmin.from("product_sizes").select("id, stock_qty").eq("product_id", line.product_id).eq("label", line.size_label).maybeSingle();
		if (size) await supabaseAdmin.from("product_sizes").update({ stock_qty: Math.max(0, size.stock_qty - line.qty) }).eq("id", size.id);
	}
	const { error: upErr } = await supabaseAdmin.from("orders").update({
		status: "paid",
		payment_status: "paid",
		razorpay_payment_id: data.razorpay_payment_id,
		razorpay_signature: data.razorpay_signature
	}).eq("id", data.orderId);
	if (upErr) throw new Error(upErr.message);
	return {
		ok: true,
		orderId: data.orderId
	};
});
//#endregion
export { getRazorpayPublicKey_createServerFn_handler, initRazorpayCheckout_createServerFn_handler, verifyRazorpayPayment_createServerFn_handler };
