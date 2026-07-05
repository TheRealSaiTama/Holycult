import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { o as formatPriceShort } from "./site-DdWOgeii.mjs";
import { i as useQuery } from "../_libs/tanstack__react-query.mjs";
import { t as useServerFn } from "./useServerFn-CrZF2pjq.mjs";
import { o as adminListOrders, s as adminListProducts } from "./admin.functions-YJqvsvCJ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.index-Db9NZtHR.js
var import_jsx_runtime = require_jsx_runtime();
function AdminDashboard() {
	const ordersFn = useServerFn(adminListOrders);
	const productsFn = useServerFn(adminListProducts);
	const { data: orders = [] } = useQuery({
		queryKey: ["admin", "orders"],
		queryFn: () => ordersFn()
	});
	const { data: products = [] } = useQuery({
		queryKey: ["admin", "products"],
		queryFn: () => productsFn()
	});
	const revenue = orders.reduce((n, o) => n + (o.status === "paid" || o.status === "fulfilled" ? o.total_cents : 0), 0);
	const lowStock = products.filter((p) => {
		const total = (p.product_sizes ?? []).reduce((n, s) => n + s.stock_qty, 0);
		return total > 0 && total < 10;
	});
	const liveProducts = products.filter((p) => p.status === "live").length;
	const stats = [
		{
			k: orders.length.toString(),
			l: "ORDERS"
		},
		{
			k: formatPriceShort(revenue),
			l: "REVENUE"
		},
		{
			k: liveProducts.toString(),
			l: "LIVE PRODUCTS"
		},
		{
			k: lowStock.length.toString(),
			l: "LOW STOCK"
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "section-num mb-2",
				children: "/ OVERVIEW"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "display-md",
				children: "DASHBOARD"
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-2 md:grid-cols-4 border border-hc-border",
				children: stats.map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: `p-6 ${i > 0 ? "border-l border-hc-border" : ""}`,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "display-md mb-2 tabular-nums",
						children: s.k
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "label-xs text-hc-muted",
						children: s.l
					})]
				}, s.l))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between mb-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "display-md",
					children: "RECENT ORDERS"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/admin/orders",
					className: "label-xs hover:text-hc-bronze",
					children: "VIEW ALL →"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "border border-hc-border",
				children: orders.slice(0, 5).length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "p-6 meta text-hc-muted",
					children: "No orders yet."
				}) : orders.slice(0, 5).map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-[1fr_auto_auto] gap-4 items-center p-4 border-b border-hc-border last:border-b-0",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "font-mono text-xs",
							children: o.ref_code
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "meta text-hc-muted truncate",
							children: o.email
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "label-xs",
							children: o.status.toUpperCase()
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-mono tabular-nums text-sm",
							children: formatPriceShort(o.total_cents)
						})
					]
				}, o.id))
			})] }),
			lowStock.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "display-md mb-4",
				children: "LOW STOCK"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "border border-hc-border",
				children: lowStock.map((p) => {
					const total = (p.product_sizes ?? []).reduce((n, s) => n + s.stock_qty, 0);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between p-4 border-b border-hc-border last:border-b-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: p.image_url,
								alt: p.name,
								className: "w-10 h-12 object-cover"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "font-bold text-sm",
								children: p.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "ref-code",
								children: p.ref
							})] })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "label-xs text-hc-danger",
							children: [total, " LEFT"]
						})]
					}, p.id);
				})
			})] })
		]
	});
}
//#endregion
export { AdminDashboard as component };
