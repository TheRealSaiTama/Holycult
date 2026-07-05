import { n as queryOptions } from "../_libs/tanstack__react-query.mjs";
import { l as createServerFn } from "./esm-Dova13aH.mjs";
import { t as createSsrRpc } from "./createSsrRpc-C-VrtN-k.mjs";
import { a as objectType, i as numberType, o as stringType, r as enumType, t as arrayType } from "../_libs/zod.mjs";
import { i as listMyOrders, n as getMyProfile, r as listMyAddresses } from "./account.functions-CpEEcHKd.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/queries-7cnJYuKS.js
var listProducts = createServerFn({ method: "GET" }).inputValidator((input) => objectType({ status: enumType(["live", "archived"]).optional() }).optional().parse(input) ?? {}).handler(createSsrRpc("ec305e715d428bd5a056174d65530dc3f73a4aae7224baa7e85f3de5db811249"));
createServerFn({ method: "GET" }).inputValidator((input) => objectType({ slug: stringType().min(1).max(120) }).parse(input)).handler(createSsrRpc("338e414efdb61533c60e3c1671e7aea82e763a0409c4afad4a1f474e3d8c65ce"));
var listLookbook = createServerFn({ method: "GET" }).handler(createSsrRpc("334f29a482866d5ae331f6ca34b0ae1ff943b1b8327c858c1a7f48fdb71c2a73"));
var listArchivedDrops = createServerFn({ method: "GET" }).handler(createSsrRpc("9912bf73232f29e4f28c3307e06a07c78392b508eb7179a96d7ec0e934919b62"));
var getCurrentDrop = createServerFn({ method: "GET" }).handler(createSsrRpc("4916e1ae13fd766ec6c5b3c3e90e4793a6d41b4a8dc0a43531112cffc8166ccd"));
var listSizeCharts = createServerFn({ method: "GET" }).handler(createSsrRpc("1c8e913fa869e7898c315fb2fde3dd54e17b4660946e7845062ebe746be0c927"));
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
createServerFn({ method: "POST" }).inputValidator((input) => placeOrderSchema.parse(input)).handler(createSsrRpc("a6485a0caa6c7276b8f38fd2e39c7cd965ae3addca5ff318987f97661206380a"));
var getOrder = createServerFn({ method: "GET" }).inputValidator((input) => objectType({ orderId: stringType().uuid() }).parse(input)).handler(createSsrRpc("8d89b7179a61ab3d48e536226751a804c2a4a27f478238699b8c0eb2189983ec"));
var productsQuery = (status = "live") => queryOptions({
	queryKey: ["products", status],
	queryFn: () => listProducts({ data: { status } })
});
var lookbookQuery = () => queryOptions({
	queryKey: ["lookbook"],
	queryFn: () => listLookbook()
});
var dropsQuery = () => queryOptions({
	queryKey: ["drops"],
	queryFn: () => listArchivedDrops()
});
var currentDropQuery = () => queryOptions({
	queryKey: ["drop", "current"],
	queryFn: () => getCurrentDrop()
});
var sizeChartsQuery = () => queryOptions({
	queryKey: ["size-charts"],
	queryFn: () => listSizeCharts(),
	staleTime: 6e4
});
var orderQuery = (orderId) => queryOptions({
	queryKey: ["order", orderId],
	queryFn: () => getOrder({ data: { orderId } })
});
var myProfileQuery = () => queryOptions({
	queryKey: ["account", "profile"],
	queryFn: () => getMyProfile()
});
var myAddressesQuery = () => queryOptions({
	queryKey: ["account", "addresses"],
	queryFn: () => listMyAddresses()
});
var myOrdersQuery = () => queryOptions({
	queryKey: ["account", "orders"],
	queryFn: () => listMyOrders()
});
//#endregion
export { myOrdersQuery as a, productsQuery as c, myAddressesQuery as i, sizeChartsQuery as l, dropsQuery as n, myProfileQuery as o, lookbookQuery as r, orderQuery as s, currentDropQuery as t };
