import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/faq-CYm-ZMIE.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var FAQS = [
	{
		q: "Will this piece be restocked?",
		a: "No. Every HOLYCULT drop is a single, numbered production run. When it's gone, it's gone — permanently archived."
	},
	{
		q: "How does sizing run?",
		a: "Relaxed, drop-shoulder. If you're between sizes, size down for closer fit, up for the lookbook silhouette. See the size guide for measurements."
	},
	{
		q: "When does the next drop go live?",
		a: "Drops are announced 7 days in advance by email to the congregation. Subscribe at the bottom of any page."
	},
	{
		q: "How long until my order ships?",
		a: "Within 2 business days of drop close. You'll receive tracking by email."
	},
	{
		q: "Do you ship worldwide?",
		a: "Yes. See Shipping & Returns for rates and timing. Duties are paid on delivery."
	},
	{
		q: "Can I return or exchange?",
		a: "Returns within 14 days, unworn with tags. Exchanges are not guaranteed because every piece is finite."
	},
	{
		q: "How do I care for heavyweight fleece?",
		a: "Cold wash inside-out, hang dry. No tumble dry. The piece will soften and improve over the first ten washes."
	},
	{
		q: "Is HOLYCULT vegan?",
		a: "All current pieces are 100% cotton or cotton-blend. No animal materials."
	},
	{
		q: "Wholesale or press?",
		a: "Email trade@holycult.shop or press@holycult.shop respectively."
	}
];
function FAQPage() {
	const [open, setOpen] = (0, import_react.useState)(0);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "pt-28 pb-24 page-container",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "section-num mb-4",
				children: "/ HELP — FAQ"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
				className: "display-xl mb-16",
				children: [
					"ASK.",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-hc-bronze",
						children: "RECEIVE."
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "border-t border-hc-text",
				children: FAQS.map((f, i) => {
					const isOpen = open === i;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "border-b border-hc-border",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => setOpen(isOpen ? null : i),
							className: "w-full flex items-center justify-between py-6 text-left gap-6",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "display-md",
								children: f.q
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-2xl font-mono shrink-0",
								children: isOpen ? "−" : "+"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "overflow-hidden transition-[max-height] duration-500 ease-out",
							style: { maxHeight: isOpen ? 400 : 0 },
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "pb-6 text-lg text-hc-muted leading-relaxed max-w-3xl",
								children: f.a
							})
						})]
					}, i);
				})
			})
		]
	});
}
//#endregion
export { FAQPage as component };
