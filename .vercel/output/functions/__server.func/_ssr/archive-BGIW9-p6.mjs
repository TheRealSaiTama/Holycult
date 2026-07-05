import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { r as useSuspenseQuery } from "../_libs/tanstack__react-query.mjs";
import { c as productsQuery, n as dropsQuery } from "./queries-CHhq0NY_.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/archive-BGIW9-p6.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ArchivePage() {
	const { data: products } = useSuspenseQuery(productsQuery("archived"));
	const { data: drops } = useSuspenseQuery(dropsQuery());
	const [activeImage, setActiveImage] = (0, import_react.useState)(null);
	const [coords, setCoords] = (0, import_react.useState)({
		x: 0,
		y: 0
	});
	const rows = products.length ? products.map((p) => ({
		label: `${p.ref} — ${p.name}`,
		image: p.image_url,
		sub: p.fabric ?? ""
	})) : drops.map((d) => ({
		label: `${d.code} — ${d.title}`,
		image: "/brand/holycult.png",
		sub: d.season
	}));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "page-container pt-28 pb-24",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "section-num mb-2",
				children: "/ 003 — ARCHIVE"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "display-lg mb-3",
				children: "PAST RELEASES"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "meta text-hc-muted mb-8 max-w-md",
				children: "Every piece below has sold its full production. None will return."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "rule mb-2" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "relative select-none",
				children: rows.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "py-12 text-hc-muted meta",
					children: "The archive is empty — for now."
				}) : rows.map((row, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					onMouseEnter: () => setActiveImage(row.image),
					onMouseLeave: () => setActiveImage(null),
					onMouseMove: (e) => setCoords({
						x: e.clientX,
						y: e.clientY
					}),
					className: "flex flex-col sm:flex-row sm:items-center justify-between py-6 gap-2 sm:gap-0 hover:bg-hc-surface/60 px-4 -mx-4 transition-colors cursor-crosshair",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-medium text-base tracking-tight",
						children: row.label
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "meta text-hc-muted",
							children: row.sub
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "label-xs text-hc-muted",
							children: "SOLD OUT"
						})]
					})]
				}), i < rows.length - 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "rule" })] }, row.label + i))
			}),
			activeImage && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: activeImage,
				alt: "",
				className: "archive-preview-image no-print",
				style: {
					left: coords.x,
					top: coords.y
				}
			})
		]
	});
}
//#endregion
export { ArchivePage as component };
