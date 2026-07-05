import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { t as motion } from "../_libs/motion.mjs";
import { r as useSuspenseQuery } from "../_libs/tanstack__react-query.mjs";
import { c as productsQuery, t as currentDropQuery } from "./queries-CHhq0NY_.mjs";
import { n as Rule, t as ProductCard } from "./Rule-DG17kLkf.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/drop-r336ydYZ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var container = {
	hidden: {},
	visible: { transition: { staggerChildren: .06 } }
};
function DropPage() {
	const { data: products } = useSuspenseQuery(productsQuery("live"));
	const { data: drop } = useSuspenseQuery(currentDropQuery());
	const [activeWall, setActiveWall] = (0, import_react.useState)("MENS");
	const filtered = products.filter((p) => p.gender === activeWall);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "page-container pt-28 pb-24",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rule, {
				label: `/ ${drop?.code ?? "DROP"}`,
				sub: "INVENTORY LIVE",
				className: "mb-6"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-2 mb-12",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
					className: "display-lg",
					children: [
						drop?.season ?? "SS26",
						" — ",
						drop?.title ?? "FIRST LIGHT"
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "meta text-hc-muted max-w-lg",
					children: "Six pieces. One production run. When stock hits zero the piece is archived forever."
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex gap-4 border-b border-hc-border mb-10",
				children: ["MENS", "WOMENS"].map((gender) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => setActiveWall(gender),
					className: `px-8 py-3.5 label-xs font-mono tracking-widest transition-colors duration-200 border border-b-0 -mb-px ${activeWall === gender ? "bg-hc-text text-hc-bg border-hc-text" : "text-hc-muted hover:text-hc-text border-transparent"}`,
					children: [gender, " WALL"]
				}, gender))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
				className: "product-grid",
				variants: container,
				initial: "hidden",
				whileInView: "visible",
				viewport: {
					once: true,
					margin: "-80px"
				},
				children: filtered.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductCard, { product: p }, p.id))
			})
		]
	});
}
//#endregion
export { DropPage as component };
