import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { i as useQuery } from "../_libs/tanstack__react-query.mjs";
import { t as useServerFn } from "./useServerFn-CrZF2pjq.mjs";
import { s as adminListProducts } from "./admin.functions-YJqvsvCJ.mjs";
import { t as Route } from "./admin.products._id-DPp6Ohbq.mjs";
import { t as ProductForm } from "./ProductForm-nwaSfdUh.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.products._id-uYG1IA0C.js
var import_jsx_runtime = require_jsx_runtime();
function EditProduct() {
	const { id } = Route.useParams();
	const listFn = useServerFn(adminListProducts);
	const { data: products = [], isLoading } = useQuery({
		queryKey: ["admin", "products"],
		queryFn: () => listFn()
	});
	const product = products.find((p) => p.id === id);
	if (isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "label-xs text-hc-muted",
		children: "LOADING…"
	});
	if (!product) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "label-xs text-hc-danger",
		children: "PRODUCT NOT FOUND"
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "section-num mb-2",
			children: "/ CMS"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
			className: "display-md",
			children: ["EDIT — ", product.name]
		})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductForm, { initial: {
			id: product.id,
			ref: product.ref,
			slug: product.slug,
			name: product.name,
			description: "",
			price_cents: product.price_cents,
			category: product.category,
			fabric: "",
			image_url: product.image_url,
			status: product.status,
			sort_order: product.sort_order,
			sizes: (product.product_sizes ?? []).map((s) => ({
				label: s.label,
				stock_qty: s.stock_qty,
				sort_order: s.sort_order
			}))
		} })]
	});
}
//#endregion
export { EditProduct as component };
