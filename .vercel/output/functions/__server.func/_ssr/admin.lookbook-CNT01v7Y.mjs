import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { i as useQuery, o as useQueryClient, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { l as Plus, r as Trash2 } from "../_libs/lucide-react.mjs";
import { t as useServerFn } from "./useServerFn-CrZF2pjq.mjs";
import { a as adminListLookbook, n as adminDeleteLookbook, u as adminUpsertLookbook } from "./admin.functions-YJqvsvCJ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.lookbook-CNT01v7Y.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function LookbookAdmin() {
	const qc = useQueryClient();
	const listFn = useServerFn(adminListLookbook);
	const upsertFn = useServerFn(adminUpsertLookbook);
	const deleteFn = useServerFn(adminDeleteLookbook);
	const { data: images = [] } = useQuery({
		queryKey: ["admin", "lookbook"],
		queryFn: () => listFn()
	});
	const [draft, setDraft] = (0, import_react.useState)({
		image_url: "",
		caption: ""
	});
	const create = useMutation({
		mutationFn: () => upsertFn({ data: {
			image_url: draft.image_url,
			caption: draft.caption || null,
			sort_order: images.length + 1
		} }),
		onSuccess: () => {
			toast.success("ADDED");
			setDraft({
				image_url: "",
				caption: ""
			});
			qc.invalidateQueries({ queryKey: ["admin", "lookbook"] });
			qc.invalidateQueries({ queryKey: ["lookbook"] });
		},
		onError: (e) => toast.error(e.message)
	});
	const remove = useMutation({
		mutationFn: (id) => deleteFn({ data: { id } }),
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: ["admin", "lookbook"] });
			qc.invalidateQueries({ queryKey: ["lookbook"] });
		}
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "section-num mb-2",
				children: "/ CMS"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "display-md",
				children: "LOOKBOOK"
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: (e) => {
					e.preventDefault();
					if (draft.image_url) create.mutate();
				},
				className: "border border-hc-border p-5 space-y-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "label-xs text-hc-muted",
						children: "ADD IMAGE"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						className: "form-input",
						placeholder: "IMAGE URL (e.g. /products/void-hoodie.jpg)",
						value: draft.image_url,
						onChange: (e) => setDraft((d) => ({
							...d,
							image_url: e.target.value
						})),
						required: true
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						className: "form-input",
						placeholder: "CAPTION (optional)",
						value: draft.caption,
						onChange: (e) => setDraft((d) => ({
							...d,
							caption: e.target.value
						}))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "submit",
						disabled: create.isPending,
						className: "cta cta-primary",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {
								size: 14,
								className: "mr-2"
							}),
							" ",
							create.isPending ? "ADDING…" : "ADD IMAGE"
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4",
				children: images.map((img) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative group",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: img.image_url,
							alt: img.caption ?? "",
							className: "w-full aspect-[4/5] object-cover bg-hc-surface"
						}),
						img.caption && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "meta text-hc-muted mt-2 truncate",
							children: img.caption
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => {
								if (confirm("Delete this image?")) remove.mutate(img.id);
							},
							className: "absolute top-2 right-2 bg-hc-bg/90 p-2 opacity-0 group-hover:opacity-100 transition-opacity",
							"aria-label": "Delete image",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { size: 14 })
						})
					]
				}, img.id))
			})
		]
	});
}
//#endregion
export { LookbookAdmin as component };
