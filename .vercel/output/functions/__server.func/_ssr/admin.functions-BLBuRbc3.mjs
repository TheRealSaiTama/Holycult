import { l as createServerFn } from "./esm-Dova13aH.mjs";
import { t as createSsrRpc } from "./createSsrRpc-_t2hXfty.mjs";
import { t as requireSupabaseAuth } from "./auth-middleware-Bv5cWBD8.mjs";
import { a as objectType, i as numberType, o as stringType, r as enumType, t as arrayType } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.functions-BLBuRbc3.js
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
var adminListProducts = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).handler(createSsrRpc("9932f7d91182148199cbc8b49e99aa83ab2855e0f2166e0d0e38e6c091b587df"));
var adminUpsertProduct = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((input) => productInputSchema.parse(input)).handler(createSsrRpc("8552c7bea139694beea39d17e69f323a972d63fd26947a65dd6b49554eb191c8"));
var adminDeleteProduct = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((input) => objectType({ id: stringType().uuid() }).parse(input)).handler(createSsrRpc("0ddf57ac23192120a1e98e48f57343c6fe83e8a1ddcf5df54be83354a1f768ad"));
var lookbookSchema = objectType({
	id: stringType().uuid().optional(),
	drop_id: stringType().uuid().nullable().optional(),
	product_id: stringType().uuid().nullable().optional(),
	image_url: stringType().min(1).max(500),
	caption: stringType().max(200).nullable().optional(),
	sort_order: numberType().int().min(0).max(9999)
});
var adminListLookbook = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).handler(createSsrRpc("afc775ab0daae934d1694a3c678b560f096ad374c9b2136a27e76bb4c5b7050b"));
var adminUpsertLookbook = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((input) => lookbookSchema.parse(input)).handler(createSsrRpc("8dde107d88efdb9abe0442c14c07234ce30e816cc68d8727c2cf85f57deb8bdd"));
var adminDeleteLookbook = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((input) => objectType({ id: stringType().uuid() }).parse(input)).handler(createSsrRpc("b534db098fb05438bd1bd5fbe650f48522d1c53e7d121fae863503944936d4f0"));
var adminListOrders = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).handler(createSsrRpc("573be2cdf3c95bfa88f6bb3d2080ff0b0c620db545ac53f2f5a039a50348d737"));
var adminUpdateOrderStatus = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((input) => objectType({
	id: stringType().uuid(),
	status: enumType([
		"pending",
		"paid",
		"fulfilled",
		"cancelled"
	])
}).parse(input)).handler(createSsrRpc("9505b54584006d8459dff4f0d9b2b1ccc184fc05200648ce850e9f9f7ee3f723"));
var adminCheckRole = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).handler(createSsrRpc("29dc8f8c5a541388068626feeaee78accd5ee1955341856129f99f07cf1cbcdb"));
var sizeChartSchema = objectType({
	id: stringType().uuid().optional(),
	kind: stringType().trim().min(1).max(40).regex(/^[a-z0-9-]+$/, "lowercase letters, digits, dashes only"),
	title: stringType().trim().min(1).max(80),
	unit: stringType().trim().min(1).max(8),
	headers: arrayType(stringType().trim().min(1).max(40)).min(2).max(8),
	rows: arrayType(arrayType(stringType().trim().max(40)).min(2).max(8)).min(1).max(20),
	note: stringType().trim().max(400).nullable().optional()
});
var adminListSizeCharts = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).handler(createSsrRpc("fac17dcf55b92ba5c643e0ade77260da96f84a2f0064ac8545c2b0941e8ac74c"));
var adminUpsertSizeChart = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((input) => sizeChartSchema.parse(input)).handler(createSsrRpc("8d8f04b020ec2bfb817e887da44ab4e9b24140ada8523faa577ea202b03633ab"));
var adminDeleteSizeChart = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((input) => objectType({ id: stringType().uuid() }).parse(input)).handler(createSsrRpc("7af40c94ebf677635f09af0e4487be5ecb8e14e9386b26958485e2f5e3eadd87"));
//#endregion
export { adminListLookbook as a, adminListSizeCharts as c, adminUpsertProduct as d, adminUpsertSizeChart as f, adminDeleteSizeChart as i, adminUpdateOrderStatus as l, adminDeleteLookbook as n, adminListOrders as o, adminDeleteProduct as r, adminListProducts as s, adminCheckRole as t, adminUpsertLookbook as u };
