import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { i as AnimatePresence } from "../_libs/framer-motion.mjs";
import { t as motion } from "../_libs/motion.mjs";
import { r as useSuspenseQuery } from "../_libs/tanstack__react-query.mjs";
import { m as ChevronLeft, p as ChevronRight, t as X } from "../_libs/lucide-react.mjs";
import { r as lookbookQuery } from "./queries-CHhq0NY_.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/lookbook-CRgxCatu.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function LookbookPage() {
	const { data: images } = useSuspenseQuery(lookbookQuery());
	const [active, setActive] = (0, import_react.useState)(null);
	const open = (i) => setActive(i);
	const close = () => setActive(null);
	const next = () => setActive((i) => i === null ? null : (i + 1) % images.length);
	const prev = () => setActive((i) => i === null ? null : (i - 1 + images.length) % images.length);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "pt-28 pb-24",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "page-container mb-12",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "section-num mb-4",
						children: "/ 004 — LOOKBOOK"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
						className: "display-xl",
						children: [
							"FIRST",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
							"LIGHT."
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "meta text-hc-muted max-w-md mt-6",
						children: [
							"Tap any image to enlarge. ",
							images.length,
							" frames."
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "page-container",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "gap-2 sm:gap-3 md:gap-4 [column-fill:_balance] columns-2 md:columns-3 lg:columns-4",
					children: images.map((img, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.button, {
						onClick: () => open(i),
						initial: {
							opacity: 0,
							y: 24
						},
						whileInView: {
							opacity: 1,
							y: 0
						},
						viewport: {
							once: true,
							margin: "-50px"
						},
						transition: {
							duration: .6,
							delay: i % 4 * .05
						},
						className: "block w-full mb-2 sm:mb-3 md:mb-4 break-inside-avoid relative group overflow-hidden bg-hc-surface",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: img.image_url,
							alt: img.caption ?? "lookbook",
							loading: "lazy",
							className: "w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
						}), img.caption && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "label-xs text-white",
								children: img.caption
							})
						})]
					}, img.id))
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "text-center py-24",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/drop",
					className: "cta cta-primary",
					children: "SHOP THE DROP"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: active !== null && images[active] && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
				initial: { opacity: 0 },
				animate: { opacity: 1 },
				exit: { opacity: 0 },
				className: "fixed inset-0 z-[80] bg-black/90 flex items-center justify-center no-print",
				onClick: close,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: close,
						className: "absolute top-5 right-5 text-white p-3",
						"aria-label": "Close",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { size: 24 })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: (e) => {
							e.stopPropagation();
							prev();
						},
						className: "absolute left-3 sm:left-8 text-white p-3",
						"aria-label": "Previous",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { size: 28 })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.img, {
						src: images[active].image_url,
						alt: images[active].caption ?? "lookbook",
						initial: {
							scale: .96,
							opacity: 0
						},
						animate: {
							scale: 1,
							opacity: 1
						},
						exit: {
							scale: .96,
							opacity: 0
						},
						transition: { duration: .25 },
						className: "max-w-[92vw] max-h-[88vh] object-contain",
						onClick: (e) => e.stopPropagation()
					}, images[active].id),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: (e) => {
							e.stopPropagation();
							next();
						},
						className: "absolute right-3 sm:right-8 text-white p-3",
						"aria-label": "Next",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { size: 28 })
					}),
					images[active].caption && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "absolute bottom-6 inset-x-0 text-center text-white label-xs",
						children: images[active].caption
					})
				]
			}) })
		]
	});
}
//#endregion
export { LookbookPage as component };
