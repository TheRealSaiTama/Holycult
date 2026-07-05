import { l as createServerFn } from "./esm-Dova13aH.mjs";
import { a as objectType, o as stringType, r as enumType } from "../_libs/zod.mjs";
import { t as createServerRpc } from "./createServerRpc-WJgk8O8C.mjs";
import { t as createPublishableServerClient } from "./supabase-server-CghjYImo.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/catalog.functions-DzVDb9uB.js
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
var MENS_PRODUCTS = [
	{
		id: "p-m1",
		drop_id: "d-live",
		ref: "HC-SS26-HOOD-01",
		slug: "void-hoodie",
		name: "VOID HOODIE",
		description: "420GSM ultra heavyweight fleece hoodie with signature cross embroidery on hood and back. Oversized boxy fit.",
		price_cents: 249900,
		currency: "INR",
		category: "HOODIE",
		fabric: "420GSM HEAVYWEIGHT FLEECE",
		image_url: "/products/void-hoodie.jpg",
		status: "live",
		sort_order: 1,
		sizes: [
			{
				label: "S",
				stock_qty: 20,
				sort_order: 1
			},
			{
				label: "M",
				stock_qty: 35,
				sort_order: 2
			},
			{
				label: "L",
				stock_qty: 25,
				sort_order: 3
			},
			{
				label: "XL",
				stock_qty: 15,
				sort_order: 4
			}
		],
		gender: "MENS"
	},
	{
		id: "p-m2",
		drop_id: "d-live",
		ref: "HC-SS26-TEE-02",
		slug: "obsidian-drop-tee",
		name: "OBSIDIAN DROP TEE",
		description: "280GSM combed cotton drop shoulder t-shirt. Enzyme washed for vintage fade and zero shrink.",
		price_cents: 119900,
		currency: "INR",
		category: "TEE",
		fabric: "280GSM DROP SHOULDER COTTON",
		image_url: "/products/obsidian-tee.jpg",
		status: "live",
		sort_order: 2,
		sizes: [
			{
				label: "S",
				stock_qty: 25,
				sort_order: 1
			},
			{
				label: "M",
				stock_qty: 40,
				sort_order: 2
			},
			{
				label: "L",
				stock_qty: 30,
				sort_order: 3
			},
			{
				label: "XL",
				stock_qty: 15,
				sort_order: 4
			}
		],
		gender: "MENS"
	},
	{
		id: "p-m3",
		drop_id: "d-live",
		ref: "HC-SS26-PNT-03",
		slug: "razor-cargo-pant",
		name: "RAZOR CARGO PANT",
		description: "Heavy cotton ripstop cargo pants with 8 reinforced utility pockets and adjustable ankle cords.",
		price_cents: 199900,
		currency: "INR",
		category: "PANTS",
		fabric: "HEAVY COTTON RIPSTOP",
		image_url: "/products/razor-cargo.jpg",
		status: "live",
		sort_order: 3,
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
				stock_qty: 20,
				sort_order: 3
			},
			{
				label: "XL",
				stock_qty: 10,
				sort_order: 4
			}
		],
		gender: "MENS"
	},
	{
		id: "p-m4",
		drop_id: "d-live",
		ref: "HC-SS26-HOOD-04",
		slug: "phantom-heavy-hood",
		name: "PHANTOM HEAVY HOOD",
		description: "450GSM French terry hoodie with distressed seam details and double-lined hood structure.",
		price_cents: 269900,
		currency: "INR",
		category: "HOODIE",
		fabric: "450GSM FRENCH TERRY",
		image_url: "/products/phantom-hood.jpg",
		status: "live",
		sort_order: 4,
		sizes: [
			{
				label: "S",
				stock_qty: 10,
				sort_order: 1
			},
			{
				label: "M",
				stock_qty: 20,
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
		gender: "MENS"
	},
	{
		id: "p-m5",
		drop_id: "d-live",
		ref: "HC-SS26-TEE-05",
		slug: "bone-drop-shoulder",
		name: "BONE DROP-SHOULDER",
		description: "Off-white bone wash tee with heavyweight ribbed collar and puff-print sigil on chest.",
		price_cents: 129900,
		currency: "INR",
		category: "TEE",
		fabric: "280GSM COMBED COTTON",
		image_url: "/products/bone-tee.jpg",
		status: "live",
		sort_order: 5,
		sizes: [
			{
				label: "S",
				stock_qty: 20,
				sort_order: 1
			},
			{
				label: "M",
				stock_qty: 35,
				sort_order: 2
			},
			{
				label: "L",
				stock_qty: 25,
				sort_order: 3
			},
			{
				label: "XL",
				stock_qty: 12,
				sort_order: 4
			}
		],
		gender: "MENS"
	},
	{
		id: "p-m6",
		drop_id: "d-live",
		ref: "HC-SS26-PNT-06",
		slug: "titan-cargo",
		name: "TITAN CARGO",
		description: "320GSM heavy canvas tactical trousers with pleated knees and custom matte bronze rivets.",
		price_cents: 219900,
		currency: "INR",
		category: "PANTS",
		fabric: "320GSM HEAVY CANVAS",
		image_url: "/products/titan-cargo.jpg",
		status: "live",
		sort_order: 6,
		sizes: [
			{
				label: "S",
				stock_qty: 15,
				sort_order: 1
			},
			{
				label: "M",
				stock_qty: 30,
				sort_order: 2
			},
			{
				label: "L",
				stock_qty: 20,
				sort_order: 3
			},
			{
				label: "XL",
				stock_qty: 10,
				sort_order: 4
			}
		],
		gender: "MENS"
	}
];
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
var FALLBACK_LOOKBOOK = [
	{
		id: "lb-1",
		drop_id: "d-live",
		product_id: "p-m1",
		image_url: "/products/void-hoodie.jpg",
		caption: "SS26 / VOID HOODIE IN PITCH BLACK",
		sort_order: 1
	},
	{
		id: "lb-2",
		drop_id: "d-live",
		product_id: "p-m3",
		image_url: "/products/razor-cargo.jpg",
		caption: "SS26 / RAZOR CARGO UTILITY DETAILS",
		sort_order: 2
	},
	{
		id: "lb-3",
		drop_id: "d-live",
		product_id: "p-w1",
		image_url: "/products/obsidian-tee.jpg",
		caption: "SS26 / ECLIPSE BABY TEE CROPPED FIT",
		sort_order: 3
	},
	{
		id: "lb-4",
		drop_id: "d-live",
		product_id: "p-m6",
		image_url: "/products/titan-cargo.jpg",
		caption: "SS26 / TITAN HEAVY CANVAS TROUSERS",
		sort_order: 4
	}
];
var FALLBACK_DROPS = [{
	id: "d-live",
	code: "0026",
	title: "SS26 / FIRST LIGHT",
	season: "SS26",
	status: "live",
	opens_at: (/* @__PURE__ */ new Date()).toISOString(),
	closes_at: null
}, {
	id: "d-archived-1",
	code: "0025",
	title: "FW25 / OBSIDIAN REIGN",
	season: "FW25",
	status: "archived",
	opens_at: "2025-10-01T00:00:00Z",
	closes_at: "2025-10-08T00:00:00Z"
}];
var FALLBACK_SIZE_CHARTS = [
	{
		id: "sc-1",
		kind: "HOODIE",
		title: "HEAVYWEIGHT HOODIE FIT",
		unit: "INCHES",
		headers: [
			"SIZE",
			"CHEST",
			"LENGTH",
			"SHOULDER",
			"SLEEVE"
		],
		rows: [
			[
				"S",
				"44",
				"26",
				"22",
				"23"
			],
			[
				"M",
				"46",
				"27",
				"23",
				"24"
			],
			[
				"L",
				"48",
				"28",
				"24",
				"25"
			],
			[
				"XL",
				"50",
				"29",
				"25",
				"26"
			]
		],
		note: "Oversized boxy cut. Order your normal size for intended drape."
	},
	{
		id: "sc-2",
		kind: "TEE",
		title: "DROP SHOULDER TEE FIT",
		unit: "INCHES",
		headers: [
			"SIZE",
			"CHEST",
			"LENGTH",
			"SHOULDER"
		],
		rows: [
			[
				"S",
				"42",
				"27",
				"21"
			],
			[
				"M",
				"44",
				"28",
				"22"
			],
			[
				"L",
				"46",
				"29",
				"23"
			],
			[
				"XL",
				"48",
				"30",
				"24"
			]
		],
		note: "Relaxed drop-shoulder fit. Pre-shrunk."
	},
	{
		id: "sc-3",
		kind: "PANTS",
		title: "UTILITY CARGO & TRACK FIT",
		unit: "INCHES",
		headers: [
			"SIZE",
			"WAIST",
			"INSEAM",
			"THIGH",
			"LEG OPENING"
		],
		rows: [
			[
				"S",
				"28-30",
				"30",
				"24",
				"16"
			],
			[
				"M",
				"31-33",
				"31",
				"25",
				"17"
			],
			[
				"L",
				"34-36",
				"32",
				"26",
				"18"
			],
			[
				"XL",
				"37-39",
				"33",
				"27",
				"19"
			]
		],
		note: "Elastic waist with drawstring and toggle cords at ankles."
	}
];
var listProducts_createServerFn_handler = createServerRpc({
	id: "ec305e715d428bd5a056174d65530dc3f73a4aae7224baa7e85f3de5db811249",
	name: "listProducts",
	filename: "src/lib/catalog.functions.ts"
}, (opts) => listProducts.__executeServer(opts));
var listProducts = createServerFn({ method: "GET" }).inputValidator((input) => objectType({ status: enumType(["live", "archived"]).optional() }).optional().parse(input) ?? {}).handler(listProducts_createServerFn_handler, async ({ data }) => {
	const status = data?.status ?? "live";
	let products = null;
	try {
		const res = await createPublishableServerClient().from("products").select("id, drop_id, ref, slug, name, description, price_cents, currency, category, fabric, image_url, status, sort_order, product_sizes(label, stock_qty, sort_order)").eq("status", status).order("sort_order", { ascending: true });
		if (!res.error && res.data && res.data.length > 0) products = res.data;
	} catch (err) {
		console.warn("[listProducts] Graceful fallback to static catalog due to:", err);
	}
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
	if (status === "live") {
		const hasMens = mapped.some((p) => p.gender === "MENS");
		const hasWomens = mapped.some((p) => p.gender === "WOMENS");
		const combined = [...mapped];
		if (!hasMens) combined.push(...MENS_PRODUCTS);
		if (!hasWomens) combined.push(...WOMENS_PRODUCTS);
		return combined.sort((a, b) => a.sort_order - b.sort_order);
	}
	return mapped.length > 0 ? mapped : status === "archived" ? [] : [...MENS_PRODUCTS, ...WOMENS_PRODUCTS];
});
var getProductBySlug_createServerFn_handler = createServerRpc({
	id: "338e414efdb61533c60e3c1671e7aea82e763a0409c4afad4a1f474e3d8c65ce",
	name: "getProductBySlug",
	filename: "src/lib/catalog.functions.ts"
}, (opts) => getProductBySlug.__executeServer(opts));
var getProductBySlug = createServerFn({ method: "GET" }).inputValidator((input) => objectType({ slug: stringType().min(1).max(120) }).parse(input)).handler(getProductBySlug_createServerFn_handler, async ({ data }) => {
	const fallbackW = WOMENS_PRODUCTS.find((p) => p.slug === data.slug);
	if (fallbackW) return fallbackW;
	const fallbackM = MENS_PRODUCTS.find((p) => p.slug === data.slug);
	if (fallbackM) return fallbackM;
	try {
		const { data: product, error } = await createPublishableServerClient().from("products").select("id, drop_id, ref, slug, name, description, price_cents, currency, category, fabric, image_url, status, sort_order, product_sizes(label, stock_qty, sort_order)").eq("slug", data.slug).maybeSingle();
		if (!error && product) {
			const match = INR_MAP[product.name.toUpperCase()];
			return {
				...product,
				price_cents: match ? match.price : product.price_cents * 80,
				currency: "INR",
				gender: match ? match.gender : "MENS",
				sizes: (product.product_sizes ?? []).slice().sort((a, b) => a.sort_order - b.sort_order)
			};
		}
	} catch (err) {
		console.warn("[getProductBySlug] Graceful fallback:", err);
	}
	return null;
});
var listLookbook_createServerFn_handler = createServerRpc({
	id: "334f29a482866d5ae331f6ca34b0ae1ff943b1b8327c858c1a7f48fdb71c2a73",
	name: "listLookbook",
	filename: "src/lib/catalog.functions.ts"
}, (opts) => listLookbook.__executeServer(opts));
var listLookbook = createServerFn({ method: "GET" }).handler(listLookbook_createServerFn_handler, async () => {
	try {
		const { data, error } = await createPublishableServerClient().from("lookbook_images").select("id, drop_id, product_id, image_url, caption, sort_order").order("sort_order", { ascending: true });
		if (!error && data && data.length > 0) return data;
	} catch (err) {
		console.warn("[listLookbook] Graceful fallback:", err);
	}
	return FALLBACK_LOOKBOOK;
});
var listArchivedDrops_createServerFn_handler = createServerRpc({
	id: "9912bf73232f29e4f28c3307e06a07c78392b508eb7179a96d7ec0e934919b62",
	name: "listArchivedDrops",
	filename: "src/lib/catalog.functions.ts"
}, (opts) => listArchivedDrops.__executeServer(opts));
var listArchivedDrops = createServerFn({ method: "GET" }).handler(listArchivedDrops_createServerFn_handler, async () => {
	try {
		const { data, error } = await createPublishableServerClient().from("drops").select("id, code, title, season, status, opens_at, closes_at").in("status", ["archived", "live"]).order("opens_at", {
			ascending: false,
			nullsFirst: false
		});
		if (!error && data && data.length > 0) return data;
	} catch (err) {
		console.warn("[listArchivedDrops] Graceful fallback:", err);
	}
	return FALLBACK_DROPS;
});
var getCurrentDrop_createServerFn_handler = createServerRpc({
	id: "4916e1ae13fd766ec6c5b3c3e90e4793a6d41b4a8dc0a43531112cffc8166ccd",
	name: "getCurrentDrop",
	filename: "src/lib/catalog.functions.ts"
}, (opts) => getCurrentDrop.__executeServer(opts));
var getCurrentDrop = createServerFn({ method: "GET" }).handler(getCurrentDrop_createServerFn_handler, async () => {
	try {
		const { data, error } = await createPublishableServerClient().from("drops").select("id, code, title, season, status, opens_at, closes_at").eq("status", "live").order("opens_at", {
			ascending: false,
			nullsFirst: false
		}).limit(1).maybeSingle();
		if (!error && data) return data;
	} catch (err) {
		console.warn("[getCurrentDrop] Graceful fallback:", err);
	}
	return FALLBACK_DROPS[0];
});
var listSizeCharts_createServerFn_handler = createServerRpc({
	id: "1c8e913fa869e7898c315fb2fde3dd54e17b4660946e7845062ebe746be0c927",
	name: "listSizeCharts",
	filename: "src/lib/catalog.functions.ts"
}, (opts) => listSizeCharts.__executeServer(opts));
var listSizeCharts = createServerFn({ method: "GET" }).handler(listSizeCharts_createServerFn_handler, async () => {
	try {
		const { data, error } = await createPublishableServerClient().from("size_charts").select("id, kind, title, unit, headers, rows, note").order("kind", { ascending: true });
		if (!error && data && data.length > 0) return data;
	} catch (err) {
		console.warn("[listSizeCharts] Graceful fallback:", err);
	}
	return FALLBACK_SIZE_CHARTS;
});
//#endregion
export { getCurrentDrop_createServerFn_handler, getProductBySlug_createServerFn_handler, listArchivedDrops_createServerFn_handler, listLookbook_createServerFn_handler, listProducts_createServerFn_handler, listSizeCharts_createServerFn_handler };
