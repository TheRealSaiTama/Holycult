import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { o as formatPriceShort } from "./site-DdWOgeii.mjs";
import { i as useQuery, o as useQueryClient, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { o as Search } from "../_libs/lucide-react.mjs";
import { t as useServerFn } from "./useServerFn-CrZF2pjq.mjs";
import { l as adminUpdateOrderStatus, o as adminListOrders } from "./admin.functions-BLBuRbc3.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.orders-DHeXnAFr.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var STATUSES = [
	"pending",
	"paid",
	"fulfilled",
	"cancelled"
];
var FILTERS = ["all", ...STATUSES];
function AdminOrders() {
	const qc = useQueryClient();
	const listFn = useServerFn(adminListOrders);
	const updateFn = useServerFn(adminUpdateOrderStatus);
	const { data: orders = [], isLoading } = useQuery({
		queryKey: ["admin", "orders"],
		queryFn: () => listFn()
	});
	const [filter, setFilter] = (0, import_react.useState)("all");
	const [q, setQ] = (0, import_react.useState)("");
	const setStatus = useMutation({
		mutationFn: (vars) => updateFn({ data: vars }),
		onSuccess: () => {
			toast.success("UPDATED");
			qc.invalidateQueries({ queryKey: ["admin", "orders"] });
		},
		onError: (e) => toast.error(e.message)
	});
	const filtered = (0, import_react.useMemo)(() => {
		const needle = q.trim().toLowerCase();
		return orders.filter((o) => {
			if (filter !== "all" && o.status !== filter) return false;
			if (!needle) return true;
			return [o.ref_code, o.email].join(" ").toLowerCase().includes(needle);
		});
	}, [
		orders,
		filter,
		q
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "section-num mb-2",
				children: "/ CMS"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
				className: "display-md",
				children: ["ORDERS · ", orders.length]
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col sm:flex-row gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative flex-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, {
						size: 14,
						className: "absolute left-3 top-1/2 -translate-y-1/2 text-hc-muted"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						value: q,
						onChange: (e) => setQ(e.target.value),
						placeholder: "SEARCH BY REF OR EMAIL…",
						className: "form-input pl-9 border border-hc-border px-3 py-2 bg-hc-surface"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex border border-hc-border bg-hc-surface overflow-x-auto",
					children: FILTERS.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => setFilter(f),
						className: `px-3 py-2 label-xs whitespace-nowrap ${filter === f ? "bg-hc-text text-hc-bg" : "text-hc-muted hover:text-hc-text"}`,
						children: f.toUpperCase()
					}, f))
				})]
			}),
			isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "label-xs text-hc-muted",
				children: "LOADING…"
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "border border-hc-border",
				children: [filtered.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "p-6 meta text-hc-muted",
					children: "No orders match."
				}), filtered.map((o) => {
					const items = o.order_items ?? [];
					const totalQty = items.reduce((n, i) => n + i.qty, 0);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-4 border-b border-hc-border last:border-b-0 hover:bg-hc-surface transition-colors",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-1 md:grid-cols-[1fr_auto_auto_auto] gap-3 md:gap-4 items-start md:items-center",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "min-w-0",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-2 flex-wrap mb-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-mono text-xs font-bold",
												children: o.ref_code
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: `label-xs px-1.5 py-0.5 ${o.payment_status === "paid" ? "bg-hc-neon" : "bg-hc-surface border border-hc-border text-hc-muted"}`,
												children: (o.payment_status ?? "unpaid").toUpperCase()
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "meta text-hc-muted truncate",
											children: o.email
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "meta text-hc-muted",
											children: [
												new Date(o.created_at).toLocaleString(),
												" · ",
												totalQty,
												" ITEM",
												totalQty !== 1 ? "S" : ""
											]
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-mono tabular-nums font-bold",
									children: formatPriceShort(o.total_cents, o.currency)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
									value: o.status,
									onChange: (e) => setStatus.mutate({
										id: o.id,
										status: e.target.value
									}),
									className: "form-input py-2 text-xs uppercase border border-hc-border px-2 bg-hc-bg",
									children: STATUSES.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: s,
										children: s.toUpperCase()
									}, s))
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "label-xs text-hc-muted hidden md:inline",
									children: o.status === "fulfilled" ? "✓" : "—"
								})
							]
						}), items.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-2 pt-2 border-t border-hc-border meta text-hc-muted",
							children: items.map((i, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
								idx > 0 && " · ",
								i.product_name,
								" (",
								i.size_label,
								"×",
								i.qty,
								")"
							] }, idx))
						})]
					}, o.id);
				})]
			})
		]
	});
}
//#endregion
export { AdminOrders as component };
