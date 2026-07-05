import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/receipt._orderId-Bza_yh6D.js
var import_jsx_runtime = require_jsx_runtime();
var SplitNotFoundComponent = () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
	className: "page-container pt-28 pb-24 text-center",
	children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "section-num mb-4",
			children: "404"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "display-md mb-6",
			children: "ORDER NOT FOUND"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/drop",
			className: "cta cta-primary",
			children: "STOREFRONT"
		})
	]
});
//#endregion
export { SplitNotFoundComponent as notFoundComponent };
