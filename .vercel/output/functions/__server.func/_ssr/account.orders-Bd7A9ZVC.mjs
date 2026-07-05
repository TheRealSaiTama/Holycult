import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { o as formatPriceShort } from "./site-DdWOgeii.mjs";
import { i as useQuery } from "../_libs/tanstack__react-query.mjs";
import { t as useServerFn } from "./useServerFn-CrZF2pjq.mjs";
import { i as listMyOrders } from "./account.functions-CpEEcHKd.mjs";
import { a as myOrdersQuery } from "./queries-7cnJYuKS.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/account.orders-Bd7A9ZVC.js
var import_jsx_runtime = require_jsx_runtime();
function OrdersPage() {
	const fn = useServerFn(listMyOrders);
	const { data: orders = [], isLoading } = useQuery({
		...myOrdersQuery(),
		queryFn: () => fn()
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "section-num mb-1",
				children: "/ 03 — RECORD"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "display-md",
				children: "ORDERS"
			})] }),
			isLoading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "label-xs text-hc-muted",
				children: "LOADING…"
			}),
			!isLoading && orders.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "border border-dashed border-hc-border p-10 text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-5xl text-hc-bronze/40 mb-3",
						children: "☩"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "meta text-hc-muted mb-4",
						children: "No orders yet."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/drop",
						className: "cta cta-primary",
						children: "ENTER THE DROP"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-3",
				children: orders.map((o) => {
					const items = o.order_items ?? [];
					const totalQty = items.reduce((n, i) => n + i.qty, 0);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/receipt/$orderId",
						params: { orderId: o.id },
						className: "block border border-hc-border p-5 hover:border-hc-text transition-colors bg-hc-surface",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start justify-between gap-4 mb-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "font-mono text-xs",
								children: o.ref_code
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "meta text-hc-muted",
								children: new Date(o.created_at).toLocaleString()
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-right",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "font-mono tabular-nums font-bold",
									children: formatPriceShort(o.total_cents, o.currency)
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "label-xs mt-1",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: `px-1.5 py-0.5 ${o.status === "paid" || o.status === "fulfilled" ? "bg-hc-neon" : o.status === "cancelled" ? "bg-hc-danger text-hc-bg" : "bg-hc-surface border border-hc-border"}`,
										children: o.status.toUpperCase()
									})
								})]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "meta text-hc-muted",
							children: [
								totalQty,
								" ITEM",
								totalQty !== 1 ? "S" : "",
								items.slice(0, 2).map((i) => ` · ${i.product_name} (${i.size_label})`).join(""),
								items.length > 2 && ` · +${items.length - 2} more`
							]
						})]
					}, o.id);
				})
			})
		]
	});
}
//#endregion
export { OrdersPage as component };
