import { l as createServerFn } from "./esm-Dova13aH.mjs";
import { a as objectType, o as stringType, r as enumType } from "../_libs/zod.mjs";
import { t as createServerRpc } from "./createServerRpc-WJgk8O8C.mjs";
import { t as createPublishableServerClient } from "./supabase-server-hsIoh7C5.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/catalog.functions-duLMl_gR.js
var INR_MAP = {
	"VOID HOODIE": {
		price: 249900,
		gender: "MENS"
	},
	"OBSIDIAN DROP TEE": {
		price: 119900,
		gender: "MENS"
	},
	"RAZOR CARGO PANT": {
		price: 199900,
		gender: "MENS"
	},
	"PHANTOM HEAVY HOOD": {
		price: 269900,
		gender: "MENS"
	},
	"BONE DROP-SHOULDER": {
		price: 129900,
		gender: "MENS"
	},
	"TITAN CARGO": {
		price: 219900,
		gender: "MENS"
	}
};
var WOMENS_PRODUCTS = [
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
			{
				label: "S",
				stock_qty: 15,
				sort_order: 1
			},
			{
				label: "M",
				stock_qty: 25,
				sort_order: 2
			},
			{
				label: "L",
				stock_qty: 10,
				sort_order: 3
			},
			{
				label: "XL",
				stock_qty: 5,
				sort_order: 4
			}
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
			{
				label: "S",
				stock_qty: 20,
				sort_order: 1
			},
			{
				label: "M",
				stock_qty: 30,
				sort_order: 2
			},
			{
				label: "L",
				stock_qty: 15,
				sort_order: 3
			}
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
			{
				label: "S",
				stock_qty: 12,
				sort_order: 1
			},
			{
				label: "M",
				stock_qty: 18,
				sort_order: 2
			},
			{
				label: "L",
				stock_qty: 15,
				sort_order: 3
			},
			{
				label: "XL",
				stock_qty: 8,
				sort_order: 4
			}
		],
		gender: "WOMENS"
	}
];
var listProducts_createServerFn_handler = createServerRpc({
	id: "ec305e715d428bd5a056174d65530dc3f73a4aae7224baa7e85f3de5db811249",
	name: "listProducts",
	filename: "src/lib/catalog.functions.ts"
}, (opts) => listProducts.__executeServer(opts));
var listProducts = createServerFn({ method: "GET" }).inputValidator((input) => objectType({ status: enumType(["live", "archived"]).optional() }).optional().parse(input) ?? {}).handler(listProducts_createServerFn_handler, async ({ data }) => {
	const sb = createPublishableServerClient();
	const status = data?.status ?? "live";
	const { data: products, error } = await sb.from("products").select("id, drop_id, ref, slug, name, description, price_cents, currency, category, fabric, image_url, status, sort_order, product_sizes(label, stock_qty, sort_order)").eq("status", status).order("sort_order", { ascending: true });
	if (error) throw new Error(error.message);
	const mapped = (products ?? []).map((p) => {
		const match = INR_MAP[p.name.toUpperCase()];
		return {
			...p,
			price_cents: match ? match.price : p.price_cents * 80,
			currency: "INR",
			gender: match ? match.gender : "MENS",
			sizes: (p.product_sizes ?? []).slice().sort((a, b) => a.sort_order - b.sort_order)
		};
	});
	if (status === "live") return [...mapped, ...WOMENS_PRODUCTS];
	return mapped;
});
var getProductBySlug_createServerFn_handler = createServerRpc({
	id: "338e414efdb61533c60e3c1671e7aea82e763a0409c4afad4a1f474e3d8c65ce",
	name: "getProductBySlug",
	filename: "src/lib/catalog.functions.ts"
}, (opts) => getProductBySlug.__executeServer(opts));
var getProductBySlug = createServerFn({ method: "GET" }).inputValidator((input) => objectType({ slug: stringType().min(1).max(120) }).parse(input)).handler(getProductBySlug_createServerFn_handler, async ({ data }) => {
	if (data.slug === "vapor-cropped-hood") return WOMENS_PRODUCTS[0];
	if (data.slug === "eclipse-baby-tee") return WOMENS_PRODUCTS[1];
	if (data.slug === "parachute-track-pant") return WOMENS_PRODUCTS[2];
	const { data: product, error } = await createPublishableServerClient().from("products").select("id, drop_id, ref, slug, name, description, price_cents, currency, category, fabric, image_url, status, sort_order, product_sizes(label, stock_qty, sort_order)").eq("slug", data.slug).maybeSingle();
	if (error) throw new Error(error.message);
	if (!product) return null;
	const match = INR_MAP[product.name.toUpperCase()];
	return {
		...product,
		price_cents: match ? match.price : product.price_cents * 80,
		currency: "INR",
		gender: match ? match.gender : "MENS",
		sizes: (product.product_sizes ?? []).slice().sort((a, b) => a.sort_order - b.sort_order)
	};
});
var listLookbook_createServerFn_handler = createServerRpc({
	id: "334f29a482866d5ae331f6ca34b0ae1ff943b1b8327c858c1a7f48fdb71c2a73",
	name: "listLookbook",
	filename: "src/lib/catalog.functions.ts"
}, (opts) => listLookbook.__executeServer(opts));
var listLookbook = createServerFn({ method: "GET" }).handler(listLookbook_createServerFn_handler, async () => {
	const { data, error } = await createPublishableServerClient().from("lookbook_images").select("id, drop_id, product_id, image_url, caption, sort_order").order("sort_order", { ascending: true });
	if (error) throw new Error(error.message);
	return data ?? [];
});
var listArchivedDrops_createServerFn_handler = createServerRpc({
	id: "9912bf73232f29e4f28c3307e06a07c78392b508eb7179a96d7ec0e934919b62",
	name: "listArchivedDrops",
	filename: "src/lib/catalog.functions.ts"
}, (opts) => listArchivedDrops.__executeServer(opts));
var listArchivedDrops = createServerFn({ method: "GET" }).handler(listArchivedDrops_createServerFn_handler, async () => {
	const { data, error } = await createPublishableServerClient().from("drops").select("id, code, title, season, status, opens_at, closes_at").in("status", ["archived", "live"]).order("opens_at", {
		ascending: false,
		nullsFirst: false
	});
	if (error) throw new Error(error.message);
	return data ?? [];
});
var getCurrentDrop_createServerFn_handler = createServerRpc({
	id: "4916e1ae13fd766ec6c5b3c3e90e4793a6d41b4a8dc0a43531112cffc8166ccd",
	name: "getCurrentDrop",
	filename: "src/lib/catalog.functions.ts"
}, (opts) => getCurrentDrop.__executeServer(opts));
var getCurrentDrop = createServerFn({ method: "GET" }).handler(getCurrentDrop_createServerFn_handler, async () => {
	const { data, error } = await createPublishableServerClient().from("drops").select("id, code, title, season, status, opens_at, closes_at").eq("status", "live").order("opens_at", {
		ascending: false,
		nullsFirst: false
	}).limit(1).maybeSingle();
	if (error) throw new Error(error.message);
	return data ?? null;
});
var listSizeCharts_createServerFn_handler = createServerRpc({
	id: "1c8e913fa869e7898c315fb2fde3dd54e17b4660946e7845062ebe746be0c927",
	name: "listSizeCharts",
	filename: "src/lib/catalog.functions.ts"
}, (opts) => listSizeCharts.__executeServer(opts));
var listSizeCharts = createServerFn({ method: "GET" }).handler(listSizeCharts_createServerFn_handler, async () => {
	const { data, error } = await createPublishableServerClient().from("size_charts").select("id, kind, title, unit, headers, rows, note").order("kind", { ascending: true });
	if (error) throw new Error(error.message);
	return data ?? [];
});
//#endregion
export { getCurrentDrop_createServerFn_handler, getProductBySlug_createServerFn_handler, listArchivedDrops_createServerFn_handler, listLookbook_createServerFn_handler, listProducts_createServerFn_handler, listSizeCharts_createServerFn_handler };
