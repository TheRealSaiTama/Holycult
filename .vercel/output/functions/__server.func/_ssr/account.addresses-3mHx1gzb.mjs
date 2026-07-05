import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { i as AnimatePresence } from "../_libs/framer-motion.mjs";
import { t as motion } from "../_libs/motion.mjs";
import { i as useQuery, o as useQueryClient, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { i as Star, l as Plus, r as Trash2 } from "../_libs/lucide-react.mjs";
import { t as useServerFn } from "./useServerFn-CrZF2pjq.mjs";
import { o as upsertMyAddress, r as listMyAddresses, t as deleteMyAddress } from "./account.functions-DDbr4uhZ.mjs";
import { i as myAddressesQuery } from "./queries-CHhq0NY_.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/account.addresses-3mHx1gzb.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var empty = {
	label: "",
	name: "",
	phone: "",
	address: "",
	city: "",
	postal: "",
	country: "India",
	is_default: false
};
function AddressesPage() {
	const listFn = useServerFn(listMyAddresses);
	const upsertFn = useServerFn(upsertMyAddress);
	const deleteFn = useServerFn(deleteMyAddress);
	const qc = useQueryClient();
	const { data: addresses = [] } = useQuery({
		...myAddressesQuery(),
		queryFn: () => listFn()
	});
	const [editing, setEditing] = (0, import_react.useState)(null);
	const save = useMutation({
		mutationFn: (vals) => upsertFn({ data: {
			id: vals.id,
			label: vals.label || null,
			name: vals.name,
			phone: vals.phone || null,
			address: vals.address,
			city: vals.city,
			postal: vals.postal,
			country: vals.country,
			is_default: vals.is_default
		} }),
		onSuccess: () => {
			toast.success("ADDRESS SAVED");
			qc.invalidateQueries({ queryKey: ["account", "addresses"] });
			setEditing(null);
		},
		onError: (e) => toast.error(e.message)
	});
	const remove = useMutation({
		mutationFn: (id) => deleteFn({ data: { id } }),
		onSuccess: () => {
			toast.success("ADDRESS REMOVED");
			qc.invalidateQueries({ queryKey: ["account", "addresses"] });
		},
		onError: (e) => toast.error(e.message)
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex items-end justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "section-num mb-1",
					children: "/ 02 — SHIP-TO"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "display-md",
					children: "ADDRESSES"
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: () => setEditing(empty),
					className: "cta cta-primary",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {
						size: 14,
						className: "mr-2"
					}), " ADD"]
				})]
			}),
			addresses.length === 0 && !editing && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "border border-dashed border-hc-border p-10 text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-5xl text-hc-bronze/40 mb-3",
						children: "☩"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "meta text-hc-muted mb-4",
						children: "No saved addresses yet."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => setEditing(empty),
						className: "cta cta-outline",
						children: "ADD YOUR FIRST"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-1 sm:grid-cols-2 gap-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: addresses.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
					layout: true,
					initial: {
						opacity: 0,
						y: 8
					},
					animate: {
						opacity: 1,
						y: 0
					},
					exit: {
						opacity: 0,
						scale: .95
					},
					className: "border border-hc-border p-5 relative bg-hc-surface group",
					children: [
						a.is_default && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "absolute -top-2 left-3 bg-hc-neon px-2 py-0.5 label-xs flex items-center gap-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, {
								size: 9,
								fill: "currentColor"
							}), " DEFAULT"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "font-bold text-sm uppercase tracking-tight mb-1",
							children: a.label || a.name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "meta text-hc-muted leading-relaxed",
							children: [
								a.name,
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
								a.address,
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
								a.city,
								" ",
								a.postal,
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
								a.country,
								a.phone && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
									"☎ ",
									a.phone
								] })
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex gap-2 mt-4 pt-3 border-t border-hc-border",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setEditing({
									...a,
									label: a.label ?? "",
									phone: a.phone ?? ""
								}),
								className: "label-xs hover:text-hc-bronze",
								children: "EDIT"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => {
									if (confirm("Delete this address?")) remove.mutate(a.id);
								},
								className: "label-xs text-hc-muted hover:text-hc-danger ml-auto",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, {
									size: 12,
									className: "inline mr-1"
								}), " DELETE"]
							})]
						})
					]
				}, a.id)) })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: editing && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
				initial: { opacity: 0 },
				animate: { opacity: 1 },
				exit: { opacity: 0 },
				className: "fixed inset-0 z-[80] bg-black/50 flex items-end sm:items-center justify-center p-0 sm:p-6",
				onClick: () => setEditing(null),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
					initial: {
						y: 30,
						opacity: 0
					},
					animate: {
						y: 0,
						opacity: 1
					},
					exit: {
						y: 30,
						opacity: 0
					},
					onClick: (e) => e.stopPropagation(),
					className: "bg-hc-bg w-full sm:max-w-lg border border-hc-border p-6 sm:p-8 space-y-5 max-h-[92vh] overflow-y-auto",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "section-num mb-1",
						children: [
							"/ ",
							editing.id ? "EDIT" : "NEW",
							" ADDRESS"
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "display-md",
						children: editing.id ? "UPDATE" : "ADD ADDRESS"
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit: (e) => {
							e.preventDefault();
							save.mutate(editing);
						},
						className: "space-y-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: "form-input",
								placeholder: "LABEL (HOME, OFFICE...)",
								value: editing.label,
								onChange: (e) => setEditing({
									...editing,
									label: e.target.value
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: "form-input",
								placeholder: "FULL NAME",
								required: true,
								value: editing.name,
								onChange: (e) => setEditing({
									...editing,
									name: e.target.value
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: "form-input",
								placeholder: "PHONE",
								value: editing.phone,
								onChange: (e) => setEditing({
									...editing,
									phone: e.target.value
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: "form-input",
								placeholder: "STREET ADDRESS",
								required: true,
								value: editing.address,
								onChange: (e) => setEditing({
									...editing,
									address: e.target.value
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-2 gap-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									className: "form-input",
									placeholder: "CITY",
									required: true,
									value: editing.city,
									onChange: (e) => setEditing({
										...editing,
										city: e.target.value
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									className: "form-input",
									placeholder: "POSTAL",
									required: true,
									value: editing.postal,
									onChange: (e) => setEditing({
										...editing,
										postal: e.target.value
									})
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: "form-input",
								placeholder: "COUNTRY",
								required: true,
								value: editing.country,
								onChange: (e) => setEditing({
									...editing,
									country: e.target.value
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "flex items-center gap-2 label-xs cursor-pointer",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "checkbox",
									checked: editing.is_default,
									onChange: (e) => setEditing({
										...editing,
										is_default: e.target.checked
									})
								}), "SET AS DEFAULT"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex gap-3 pt-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "submit",
									disabled: save.isPending,
									className: "cta cta-primary flex-1",
									children: save.isPending ? "SAVING…" : "SAVE"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => setEditing(null),
									className: "cta cta-outline",
									children: "CANCEL"
								})]
							})
						]
					})]
				})
			}) })
		]
	});
}
//#endregion
export { AddressesPage as component };
