import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { t as motion } from "../_libs/motion.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/about-DcWr0fBh.js
var import_jsx_runtime = require_jsx_runtime();
function AboutPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "pt-28 pb-24",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "page-container",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "section-num mb-4",
						children: "/ 001 — DOCTRINE"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.h1, {
						initial: {
							opacity: 0,
							y: 24
						},
						animate: {
							opacity: 1,
							y: 0
						},
						transition: { duration: .8 },
						className: "display-xl mb-10",
						children: [
							"UNIFORM",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
							"FOR THE",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-hc-bronze",
								children: "FAITHFUL."
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid md:grid-cols-12 gap-10 mt-16",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "md:col-span-5",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: "/brand/holycult2.png",
								alt: "HOLYCULT studio",
								className: "w-full"
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "md:col-span-7 space-y-6 text-lg leading-relaxed text-hc-muted",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "HOLYCULT was born in a small studio in Mumbai with a stubborn idea: clothing should be made like a ritual, not a refill. Every season we cut one production run. When it's gone, it's gone — archived forever." }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-hc-text",
									children: "We obsess over fabric weight, stitch density, and the way a hem falls after a hundred washes. Then we put a number on it. That number is yours."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "No celebrity drops. No restocks. No discount codes. Just heavyweight uniform for the congregation." })
							]
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "border-y border-hc-border mt-24 py-20",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "page-container grid md:grid-cols-3 gap-12",
					children: [
						{
							n: "01",
							t: "FABRIC FIRST",
							d: "420gsm fleece, 280gsm cotton, heavyweight twill. Sourced, never substituted."
						},
						{
							n: "02",
							t: "ONE RUN",
							d: "We cut what we cut. Numbered, sealed, sent. Then the archive closes."
						},
						{
							n: "03",
							t: "NO RESTOCKS",
							d: "If you missed it, you missed it. Scarcity is respect — for the piece and the holder."
						}
					].map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "section-num mb-4",
							children: ["/ ", b.n]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "display-md mb-3",
							children: b.t
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-hc-muted leading-relaxed",
							children: b.d
						})
					] }, b.n))
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "page-container py-20 text-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "display-lg mb-8",
					children: "JOIN THE CONGREGATION."
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/drop",
					className: "cta cta-primary",
					children: "ENTER THE DROP"
				})]
			})
		]
	});
}
//#endregion
export { AboutPage as component };
