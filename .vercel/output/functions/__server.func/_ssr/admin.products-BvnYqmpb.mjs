import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { o as formatPriceShort } from "./site-DdWOgeii.mjs";
import { i as useQuery, o as useQueryClient, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { l as Plus, o as Search, r as Trash2 } from "../_libs/lucide-react.mjs";
import { t as useServerFn } from "./useServerFn-CrZF2pjq.mjs";
import { r as adminDeleteProduct, s as adminListProducts } from "./admin.functions-YJqvsvCJ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.products-BvnYqmpb.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var STATUS_FILTERS = [
	"all",
	"live",
	"draft",
	"archived"
];
function ProductsList() {
	const listFn = useServerFn(adminListProducts);
	const deleteFn = useServerFn(adminDeleteProduct);
	const qc = useQueryClient();
	const { data: products = [], isLoading } = useQuery({
		queryKey: ["admin", "products"],
		queryFn: () => listFn()
	});
	const [q, setQ] = (0, import_react.useState)("");
	const [status, setStatus] = (0, import_react.useState)("all");
	const remove = useMutation({
		mutationFn: (id) => deleteFn({ data: { id } }),
		onSuccess: () => {
			toast.success("DELETED");
			qc.invalidateQueries({ queryKey: ["admin", "products"] });
			qc.invalidateQueries({ queryKey: ["products"] });
		},
		onError: (e) => toast.error(e.message)
	});
	const filtered = (0, import_react.useMemo)(() => {
		const needle = q.trim().toLowerCase();
		return products.filter((p) => {
			if (status !== "all" && p.status !== status) return false;
			if (!needle) return true;
			return [
				p.name,
				p.ref,
				p.category
			].join(" ").toLowerCase().includes(needle);
		});
	}, [
		products,
		q,
		status
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-end justify-between gap-4 flex-wrap",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "section-num mb-2",
					children: "/ CMS"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
					className: "display-md",
					children: ["PRODUCTS · ", products.length]
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/admin/products/new",
					className: "cta cta-primary",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {
						size: 14,
						className: "mr-2"
					}), " NEW"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col sm:flex-row gap-3 items-stretch sm:items-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative flex-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, {
						size: 14,
						className: "absolute left-3 top-1/2 -translate-y-1/2 text-hc-muted"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						value: q,
						onChange: (e) => setQ(e.target.value),
						placeholder: "SEARCH NAME, REF, CATEGORY…",
						className: "form-input pl-9 border border-hc-border px-3 py-2 bg-hc-surface"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex gap-1 border border-hc-border bg-hc-surface",
					children: STATUS_FILTERS.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => setStatus(s),
						className: `px-3 py-2 label-xs transition-colors ${status === s ? "bg-hc-text text-hc-bg" : "text-hc-muted hover:text-hc-text"}`,
						children: s.toUpperCase()
					}, s))
				})]
			}),
			isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "label-xs text-hc-muted",
				children: "LOADING…"
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "border border-hc-border",
				children: [filtered.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "p-6 meta text-hc-muted",
					children: "No products match."
				}), filtered.map((p) => {
					const total = (p.product_sizes ?? []).reduce((n, s) => n + s.stock_qty, 0);
					const low = total > 0 && total < 10;
					const out = total === 0;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-[64px_minmax(0,1fr)_auto_auto_auto] items-center gap-4 p-4 border-b border-hc-border last:border-b-0 hover:bg-hc-surface transition-colors",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: p.image_url,
								alt: p.name,
								className: "w-16 h-20 object-cover bg-hc-surface"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "font-bold tracking-tight truncate",
										children: p.name
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "ref-code",
										children: p.ref
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "meta text-hc-muted mt-1 flex items-center gap-2 flex-wrap",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: p.category }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "·" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: out ? "text-hc-danger" : low ? "text-hc-bronze" : "",
												children: [total, " IN STOCK"]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "·" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: `px-1.5 py-0.5 text-[9px] ${p.status === "live" ? "bg-hc-neon" : p.status === "draft" ? "bg-hc-surface border border-hc-border" : "bg-hc-text text-hc-bg"}`,
												children: p.status.toUpperCase()
											})
										]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-mono text-sm tabular-nums",
								children: formatPriceShort(p.price_cents)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/admin/products/$id",
								params: { id: p.id },
								className: "label-xs hover:text-hc-bronze",
								children: "EDIT →"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => {
									if (confirm(`Delete ${p.name}?`)) remove.mutate(p.id);
								},
								className: "text-hc-muted hover:text-hc-danger p-2",
								"aria-label": "Delete product",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { size: 14 })
							})
						]
					}, p.id);
				})]
			})
		]
	});
}
//#endregion
export { ProductsList as component };
