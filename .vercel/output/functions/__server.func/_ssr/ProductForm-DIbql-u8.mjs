import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { F as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { o as useQueryClient, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { l as Plus, r as Trash2 } from "../_libs/lucide-react.mjs";
import { t as useServerFn } from "./useServerFn-CrZF2pjq.mjs";
import { d as adminUpsertProduct } from "./admin.functions-BLBuRbc3.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ProductForm-DIbql-u8.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var emptyValues = {
	ref: "",
	slug: "",
	name: "",
	description: "",
	price_cents: 0,
	category: "TEE",
	fabric: "",
	image_url: "",
	status: "draft",
	sort_order: 0,
	sizes: [
		{
			label: "S",
			stock_qty: 10,
			sort_order: 1
		},
		{
			label: "M",
			stock_qty: 10,
			sort_order: 2
		},
		{
			label: "L",
			stock_qty: 10,
			sort_order: 3
		},
		{
			label: "XL",
			stock_qty: 10,
			sort_order: 4
		}
	]
};
function ProductForm({ initial }) {
	const navigate = useNavigate();
	const qc = useQueryClient();
	const upsert = useServerFn(adminUpsertProduct);
	const [values, setValues] = (0, import_react.useState)(initial ?? emptyValues);
	const [priceInput, setPriceInput] = (0, import_react.useState)((initial?.price_cents ?? 0) / 100 + "");
	const save = useMutation({
		mutationFn: () => upsert({ data: {
			...values,
			description: values.description || null,
			fabric: values.fabric || null,
			price_cents: Math.round((parseFloat(priceInput) || 0) * 100)
		} }),
		onSuccess: () => {
			toast.success("SAVED");
			qc.invalidateQueries({ queryKey: ["admin", "products"] });
			qc.invalidateQueries({ queryKey: ["products"] });
			navigate({ to: "/admin/products" });
		},
		onError: (e) => toast.error(e.message)
	});
	function field(key, value) {
		setValues((v) => ({
			...v,
			[key]: value
		}));
	}
	function updateSize(i, patch) {
		setValues((v) => ({
			...v,
			sizes: v.sizes.map((s, idx) => idx === i ? {
				...s,
				...patch
			} : s)
		}));
	}
	function addSize() {
		setValues((v) => ({
			...v,
			sizes: [...v.sizes, {
				label: "",
				stock_qty: 0,
				sort_order: v.sizes.length + 1
			}]
		}));
	}
	function removeSize(i) {
		setValues((v) => ({
			...v,
			sizes: v.sizes.filter((_, idx) => idx !== i)
		}));
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		onSubmit: (e) => {
			e.preventDefault();
			save.mutate();
		},
		className: "space-y-10 max-w-3xl",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "space-y-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "label-xs text-hc-muted",
						children: "BASIC"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-1 sm:grid-cols-2 gap-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "NAME",
								required: true,
								value: values.name,
								onChange: (v) => field("name", v)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "REF (e.g. HC-SS26-...)",
								required: true,
								value: values.ref,
								onChange: (v) => field("ref", v.toUpperCase())
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "SLUG (kebab-case)",
								required: true,
								value: values.slug,
								onChange: (v) => field("slug", v.toLowerCase().replace(/[^a-z0-9-]/g, "-"))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "CATEGORY",
								required: true,
								value: values.category,
								onChange: (v) => field("category", v.toUpperCase())
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "PRICE (INR)",
								required: true,
								type: "number",
								value: priceInput,
								onChange: setPriceInput
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "SORT ORDER",
								type: "number",
								value: values.sort_order + "",
								onChange: (v) => field("sort_order", parseInt(v) || 0)
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "FABRIC",
						value: values.fabric,
						onChange: (v) => field("fabric", v)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "IMAGE URL",
						required: true,
						value: values.image_url,
						onChange: (v) => field("image_url", v)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "label-xs text-hc-muted block mb-2",
						children: "DESCRIPTION"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
						className: "form-input min-h-[120px] resize-y",
						value: values.description,
						onChange: (e) => field("description", e.target.value)
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "label-xs text-hc-muted block mb-2",
						children: "STATUS"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
						className: "form-input",
						value: values.status,
						onChange: (e) => field("status", e.target.value),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "draft",
								children: "DRAFT (hidden)"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "live",
								children: "LIVE"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "archived",
								children: "ARCHIVED"
							})
						]
					})] })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "space-y-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "label-xs text-hc-muted",
						children: "SIZES & STOCK"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: addSize,
						className: "label-xs hover:text-hc-bronze flex items-center gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { size: 12 }), " ADD SIZE"]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "border border-hc-border",
					children: values.sizes.map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-[1fr_1fr_1fr_auto] gap-3 p-3 border-b border-hc-border last:border-b-0 items-center",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: "form-input py-2",
								placeholder: "LABEL",
								value: s.label,
								onChange: (e) => updateSize(i, { label: e.target.value.toUpperCase() })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: "form-input py-2",
								type: "number",
								placeholder: "STOCK",
								value: s.stock_qty,
								onChange: (e) => updateSize(i, { stock_qty: parseInt(e.target.value) || 0 })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: "form-input py-2",
								type: "number",
								placeholder: "ORDER",
								value: s.sort_order,
								onChange: (e) => updateSize(i, { sort_order: parseInt(e.target.value) || 0 })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => removeSize(i),
								className: "text-hc-muted hover:text-hc-danger p-2",
								"aria-label": "Remove size",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { size: 14 })
							})
						]
					}, i))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "submit",
					disabled: save.isPending,
					className: "cta cta-primary",
					children: save.isPending ? "SAVING…" : initial?.id ? "UPDATE PRODUCT" : "CREATE PRODUCT"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => navigate({ to: "/admin/products" }),
					className: "cta cta-outline",
					children: "CANCEL"
				})]
			})
		]
	});
}
function Field({ label, value, onChange, type = "text", required }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
		className: "label-xs text-hc-muted block mb-2",
		children: label
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		className: "form-input",
		type,
		required,
		value,
		onChange: (e) => onChange(e.target.value)
	})] });
}
//#endregion
export { ProductForm as t };
