import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/size-guide-Bt1zHs6E.js
var import_jsx_runtime = require_jsx_runtime();
var TOPS = [
	[
		"S",
		"96",
		"70",
		"62"
	],
	[
		"M",
		"102",
		"72",
		"64"
	],
	[
		"L",
		"108",
		"74",
		"66"
	],
	[
		"XL",
		"114",
		"76",
		"68"
	]
];
var BOTTOMS = [
	[
		"S",
		"76",
		"94",
		"104"
	],
	[
		"M",
		"82",
		"100",
		"106"
	],
	[
		"L",
		"88",
		"106",
		"108"
	],
	[
		"XL",
		"94",
		"112",
		"110"
	]
];
function Table({ headers, rows }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "overflow-x-auto border border-hc-border",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
			className: "w-full text-sm",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
				className: "bg-hc-text text-hc-bg",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: headers.map((h) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
					className: "text-left p-3 label-xs",
					children: h
				}, h)) })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: rows.map((r, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", {
				className: "border-t border-hc-border",
				children: r.map((c, j) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
					className: `p-3 ${j === 0 ? "label-xs" : "font-mono text-xs"}`,
					children: c
				}, j))
			}, i)) })]
		})
	});
}
function SizeGuide() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "pt-28 pb-24 page-container",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "section-num mb-4",
				children: "/ HELP — SIZE GUIDE"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
				className: "display-xl mb-12",
				children: [
					"FIND",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
					"YOUR",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-hc-bronze",
						children: "FIT."
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-hc-muted text-lg max-w-2xl mb-16 leading-relaxed",
				children: "All HOLYCULT pieces are cut for a relaxed, drop-shoulder fit. If you're between sizes, size down for a closer fit, or up for the oversized silhouette pictured in the lookbook."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mb-16",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "display-md mb-6",
					children: "TOPS & HOODIES (CM)"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table, {
					headers: [
						"SIZE",
						"CHEST",
						"LENGTH",
						"SLEEVE"
					],
					rows: TOPS
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mb-16",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "display-md mb-6",
					children: "BOTTOMS (CM)"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table, {
					headers: [
						"SIZE",
						"WAIST",
						"HIP",
						"INSEAM"
					],
					rows: BOTTOMS
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "border-t border-hc-border pt-12",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "display-md mb-4",
					children: "HOW TO MEASURE"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					className: "space-y-3 text-hc-muted text-lg max-w-2xl leading-relaxed list-disc pl-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-hc-text",
							children: "Chest:"
						}), " around the fullest part, under the arms."] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-hc-text",
							children: "Length:"
						}), " from highest point of shoulder to hem."] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-hc-text",
							children: "Waist:"
						}), " around your natural waistline."] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-hc-text",
							children: "Inseam:"
						}), " from crotch seam to bottom of leg."] })
					]
				})]
			})
		]
	});
}
//#endregion
export { SizeGuide as component };
