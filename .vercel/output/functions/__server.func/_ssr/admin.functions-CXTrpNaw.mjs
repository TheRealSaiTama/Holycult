import { l as createServerFn } from "./esm-Dova13aH.mjs";
import { t as requireSupabaseAuth } from "./auth-middleware-Bv5cWBD8.mjs";
import { a as objectType, i as numberType, o as stringType, r as enumType, t as arrayType } from "../_libs/zod.mjs";
import { t as createServerRpc } from "./createServerRpc-WJgk8O8C.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.functions-CXTrpNaw.js
async function assertAdmin(supabase, userId) {
	const { data, error } = await supabase.rpc("has_role", {
		_user_id: userId,
		_role: "admin"
	});
	if (error) throw new Error(error.message);
	if (!data) throw new Error("Forbidden");
}
var sizeInputSchema = objectType({
	label: stringType().trim().min(1).max(12),
	stock_qty: numberType().int().min(0).max(9999),
	sort_order: numberType().int().min(0).max(99)
});
var productInputSchema = objectType({
	id: stringType().uuid().optional(),
	drop_id: stringType().uuid().nullable().optional(),
	ref: stringType().trim().min(2).max(64),
	slug: stringType().trim().min(2).max(80).regex(/^[a-z0-9-]+$/, "lowercase letters, digits, dashes only"),
	name: stringType().trim().min(2).max(120),
	description: stringType().trim().max(2e3).optional().nullable(),
	price_cents: numberType().int().min(0).max(1e7),
	category: stringType().trim().min(2).max(40),
	fabric: stringType().trim().max(120).optional().nullable(),
	image_url: stringType().trim().min(1).max(500),
	status: enumType([
		"draft",
		"live",
		"archived"
	]),
	sort_order: numberType().int().min(0).max(9999),
	sizes: arrayType(sizeInputSchema).min(1).max(12)
});
var adminListProducts_createServerFn_handler = createServerRpc({
	id: "9932f7d91182148199cbc8b49e99aa83ab2855e0f2166e0d0e38e6c091b587df",
	name: "adminListProducts",
	filename: "src/lib/admin.functions.ts"
}, (opts) => adminListProducts.__executeServer(opts));
var adminListProducts = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).handler(adminListProducts_createServerFn_handler, async ({ context }) => {
	await assertAdmin(context.supabase, context.userId);
	const { data, error } = await context.supabase.from("products").select("id, ref, slug, name, price_cents, category, status, sort_order, image_url, product_sizes(id, label, stock_qty, sort_order)").order("sort_order", { ascending: true });
	if (error) throw new Error(error.message);
	return data ?? [];
});
var adminUpsertProduct_createServerFn_handler = createServerRpc({
	id: "8552c7bea139694beea39d17e69f323a972d63fd26947a65dd6b49554eb191c8",
	name: "adminUpsertProduct",
	filename: "src/lib/admin.functions.ts"
}, (opts) => adminUpsertProduct.__executeServer(opts));
var adminUpsertProduct = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((input) => productInputSchema.parse(input)).handler(adminUpsertProduct_createServerFn_handler, async ({ data, context }) => {
	await assertAdmin(context.supabase, context.userId);
	const { sizes, id, ...productFields } = data;
	const { data: saved, error } = id ? await context.supabase.from("products").update(productFields).eq("id", id).select("id").single() : await context.supabase.from("products").insert(productFields).select("id").single();
	if (error || !saved) throw new Error(error?.message ?? "Save failed");
	await context.supabase.from("product_sizes").delete().eq("product_id", saved.id);
	if (sizes.length) {
		const { error: sErr } = await context.supabase.from("product_sizes").insert(sizes.map((s) => ({
			...s,
			product_id: saved.id
		})));
		if (sErr) throw new Error(sErr.message);
	}
	return { id: saved.id };
});
var adminDeleteProduct_createServerFn_handler = createServerRpc({
	id: "0ddf57ac23192120a1e98e48f57343c6fe83e8a1ddcf5df54be83354a1f768ad",
	name: "adminDeleteProduct",
	filename: "src/lib/admin.functions.ts"
}, (opts) => adminDeleteProduct.__executeServer(opts));
var adminDeleteProduct = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((input) => objectType({ id: stringType().uuid() }).parse(input)).handler(adminDeleteProduct_createServerFn_handler, async ({ data, context }) => {
	await assertAdmin(context.supabase, context.userId);
	const { error } = await context.supabase.from("products").delete().eq("id", data.id);
	if (error) throw new Error(error.message);
	return { ok: true };
});
var lookbookSchema = objectType({
	id: stringType().uuid().optional(),
	drop_id: stringType().uuid().nullable().optional(),
	product_id: stringType().uuid().nullable().optional(),
	image_url: stringType().min(1).max(500),
	caption: stringType().max(200).nullable().optional(),
	sort_order: numberType().int().min(0).max(9999)
});
var adminListLookbook_createServerFn_handler = createServerRpc({
	id: "afc775ab0daae934d1694a3c678b560f096ad374c9b2136a27e76bb4c5b7050b",
	name: "adminListLookbook",
	filename: "src/lib/admin.functions.ts"
}, (opts) => adminListLookbook.__executeServer(opts));
var adminListLookbook = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).handler(adminListLookbook_createServerFn_handler, async ({ context }) => {
	await assertAdmin(context.supabase, context.userId);
	const { data, error } = await context.supabase.from("lookbook_images").select("id, drop_id, product_id, image_url, caption, sort_order").order("sort_order", { ascending: true });
	if (error) throw new Error(error.message);
	return data ?? [];
});
var adminUpsertLookbook_createServerFn_handler = createServerRpc({
	id: "8dde107d88efdb9abe0442c14c07234ce30e816cc68d8727c2cf85f57deb8bdd",
	name: "adminUpsertLookbook",
	filename: "src/lib/admin.functions.ts"
}, (opts) => adminUpsertLookbook.__executeServer(opts));
var adminUpsertLookbook = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((input) => lookbookSchema.parse(input)).handler(adminUpsertLookbook_createServerFn_handler, async ({ data, context }) => {
	await assertAdmin(context.supabase, context.userId);
	const { id, ...fields } = data;
	const { data: saved, error } = id ? await context.supabase.from("lookbook_images").update(fields).eq("id", id).select("id").single() : await context.supabase.from("lookbook_images").insert(fields).select("id").single();
	if (error || !saved) throw new Error(error?.message ?? "Save failed");
	return { id: saved.id };
});
var adminDeleteLookbook_createServerFn_handler = createServerRpc({
	id: "b534db098fb05438bd1bd5fbe650f48522d1c53e7d121fae863503944936d4f0",
	name: "adminDeleteLookbook",
	filename: "src/lib/admin.functions.ts"
}, (opts) => adminDeleteLookbook.__executeServer(opts));
var adminDeleteLookbook = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((input) => objectType({ id: stringType().uuid() }).parse(input)).handler(adminDeleteLookbook_createServerFn_handler, async ({ data, context }) => {
	await assertAdmin(context.supabase, context.userId);
	const { error } = await context.supabase.from("lookbook_images").delete().eq("id", data.id);
	if (error) throw new Error(error.message);
	return { ok: true };
});
var adminListOrders_createServerFn_handler = createServerRpc({
	id: "573be2cdf3c95bfa88f6bb3d2080ff0b0c620db545ac53f2f5a039a50348d737",
	name: "adminListOrders",
	filename: "src/lib/admin.functions.ts"
}, (opts) => adminListOrders.__executeServer(opts));
var adminListOrders = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).handler(adminListOrders_createServerFn_handler, async ({ context }) => {
	await assertAdmin(context.supabase, context.userId);
	const { data, error } = await context.supabase.from("orders").select("id, ref_code, email, total_cents, currency, status, payment_status, razorpay_payment_id, created_at, order_items(qty, product_name, size_label)").order("created_at", { ascending: false }).limit(200);
	if (error) throw new Error(error.message);
	return data ?? [];
});
var adminUpdateOrderStatus_createServerFn_handler = createServerRpc({
	id: "9505b54584006d8459dff4f0d9b2b1ccc184fc05200648ce850e9f9f7ee3f723",
	name: "adminUpdateOrderStatus",
	filename: "src/lib/admin.functions.ts"
}, (opts) => adminUpdateOrderStatus.__executeServer(opts));
var adminUpdateOrderStatus = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((input) => objectType({
	id: stringType().uuid(),
	status: enumType([
		"pending",
		"paid",
		"fulfilled",
		"cancelled"
	])
}).parse(input)).handler(adminUpdateOrderStatus_createServerFn_handler, async ({ data, context }) => {
	await assertAdmin(context.supabase, context.userId);
	const { error } = await context.supabase.from("orders").update({ status: data.status }).eq("id", data.id);
	if (error) throw new Error(error.message);
	return { ok: true };
});
var adminCheckRole_createServerFn_handler = createServerRpc({
	id: "29dc8f8c5a541388068626feeaee78accd5ee1955341856129f99f07cf1cbcdb",
	name: "adminCheckRole",
	filename: "src/lib/admin.functions.ts"
}, (opts) => adminCheckRole.__executeServer(opts));
var adminCheckRole = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).handler(adminCheckRole_createServerFn_handler, async ({ context }) => {
	const { data, error } = await context.supabase.rpc("has_role", {
		_user_id: context.userId,
		_role: "admin"
	});
	if (error) throw new Error(error.message);
	return {
		isAdmin: Boolean(data),
		userId: context.userId
	};
});
var sizeChartSchema = objectType({
	id: stringType().uuid().optional(),
	kind: stringType().trim().min(1).max(40).regex(/^[a-z0-9-]+$/, "lowercase letters, digits, dashes only"),
	title: stringType().trim().min(1).max(80),
	unit: stringType().trim().min(1).max(8),
	headers: arrayType(stringType().trim().min(1).max(40)).min(2).max(8),
	rows: arrayType(arrayType(stringType().trim().max(40)).min(2).max(8)).min(1).max(20),
	note: stringType().trim().max(400).nullable().optional()
});
var adminListSizeCharts_createServerFn_handler = createServerRpc({
	id: "fac17dcf55b92ba5c643e0ade77260da96f84a2f0064ac8545c2b0941e8ac74c",
	name: "adminListSizeCharts",
	filename: "src/lib/admin.functions.ts"
}, (opts) => adminListSizeCharts.__executeServer(opts));
var adminListSizeCharts = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).handler(adminListSizeCharts_createServerFn_handler, async ({ context }) => {
	await assertAdmin(context.supabase, context.userId);
	const { data, error } = await context.supabase.from("size_charts").select("id, kind, title, unit, headers, rows, note").order("kind", { ascending: true });
	if (error) throw new Error(error.message);
	return data ?? [];
});
var adminUpsertSizeChart_createServerFn_handler = createServerRpc({
	id: "8d8f04b020ec2bfb817e887da44ab4e9b24140ada8523faa577ea202b03633ab",
	name: "adminUpsertSizeChart",
	filename: "src/lib/admin.functions.ts"
}, (opts) => adminUpsertSizeChart.__executeServer(opts));
var adminUpsertSizeChart = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((input) => sizeChartSchema.parse(input)).handler(adminUpsertSizeChart_createServerFn_handler, async ({ data, context }) => {
	await assertAdmin(context.supabase, context.userId);
	const { id, ...fields } = data;
	const { data: saved, error } = id ? await context.supabase.from("size_charts").update(fields).eq("id", id).select("id").single() : await context.supabase.from("size_charts").upsert(fields, { onConflict: "kind" }).select("id").single();
	if (error || !saved) throw new Error(error?.message ?? "Save failed");
	return { id: saved.id };
});
var adminDeleteSizeChart_createServerFn_handler = createServerRpc({
	id: "7af40c94ebf677635f09af0e4487be5ecb8e14e9386b26958485e2f5e3eadd87",
	name: "adminDeleteSizeChart",
	filename: "src/lib/admin.functions.ts"
}, (opts) => adminDeleteSizeChart.__executeServer(opts));
var adminDeleteSizeChart = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((input) => objectType({ id: stringType().uuid() }).parse(input)).handler(adminDeleteSizeChart_createServerFn_handler, async ({ data, context }) => {
	await assertAdmin(context.supabase, context.userId);
	const { error } = await context.supabase.from("size_charts").delete().eq("id", data.id);
	if (error) throw new Error(error.message);
	return { ok: true };
});
//#endregion
export { adminCheckRole_createServerFn_handler, adminDeleteLookbook_createServerFn_handler, adminDeleteProduct_createServerFn_handler, adminDeleteSizeChart_createServerFn_handler, adminListLookbook_createServerFn_handler, adminListOrders_createServerFn_handler, adminListProducts_createServerFn_handler, adminListSizeCharts_createServerFn_handler, adminUpdateOrderStatus_createServerFn_handler, adminUpsertLookbook_createServerFn_handler, adminUpsertProduct_createServerFn_handler, adminUpsertSizeChart_createServerFn_handler };
