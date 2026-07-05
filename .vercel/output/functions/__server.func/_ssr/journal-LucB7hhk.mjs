import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/journal-LucB7hhk.js
var import_jsx_runtime = require_jsx_runtime();
var POSTS = [
	{
		slug: "the-weight-of-420",
		date: "2026.06.14",
		read: "4 MIN",
		title: "The Weight of 420",
		excerpt: "Why we don't make light fleece, even when the spreadsheet asks us to.",
		cover: "/products/void-hoodie.jpg"
	},
	{
		slug: "one-run-no-mercy",
		date: "2026.05.30",
		read: "6 MIN",
		title: "One Run, No Mercy",
		excerpt: "Notes from the cutting floor on drop 026 — what we ordered, what we'll never order again.",
		cover: "/products/razor-cargo.jpg"
	},
	{
		slug: "the-archive-is-a-graveyard",
		date: "2026.05.02",
		read: "3 MIN",
		title: "The Archive Is a Graveyard",
		excerpt: "A short defense of letting things end.",
		cover: "/products/phantom-hood.jpg"
	},
	{
		slug: "fits-from-the-faithful",
		date: "2026.04.18",
		read: "2 MIN",
		title: "Fits From the Faithful",
		excerpt: "What the congregation wore this month.",
		cover: "/products/bone-tee.jpg"
	}
];
function JournalPage() {
	const [feature, ...rest] = POSTS;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "pt-28 pb-24",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "page-container mb-16",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "section-num mb-4",
				children: "/ 006 — JOURNAL"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
				className: "display-xl",
				children: [
					"FIELD",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
					"NOTES."
				]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "page-container",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/journal",
				className: "group grid md:grid-cols-12 gap-8 mb-20 items-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: feature.cover,
					alt: feature.title,
					className: "md:col-span-7 w-full aspect-[16/10] object-cover"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "md:col-span-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "label-xs text-hc-muted mb-3",
							children: [
								feature.date,
								" · ",
								feature.read
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "display-md mb-3 group-hover:text-hc-bronze transition-colors",
							children: feature.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-hc-muted text-lg leading-relaxed mb-6",
							children: feature.excerpt
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "label-xs",
							children: "READ →"
						})
					]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid md:grid-cols-3 gap-10 border-t border-hc-border pt-12",
				children: rest.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/journal",
					className: "group",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: p.cover,
							alt: p.title,
							className: "w-full aspect-[4/5] object-cover mb-4"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "label-xs text-hc-muted mb-2",
							children: [
								p.date,
								" · ",
								p.read
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "display-md mb-2 group-hover:text-hc-bronze transition-colors",
							children: p.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-hc-muted meta",
							children: p.excerpt
						})
					]
				}, p.slug))
			})]
		})]
	});
}
//#endregion
export { JournalPage as component };
