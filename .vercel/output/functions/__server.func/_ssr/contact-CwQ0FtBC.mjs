import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/contact-CwQ0FtBC.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ContactPage() {
	const [sent, setSent] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "pt-28 pb-24",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "page-container",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "section-num mb-4",
					children: "/ 005 — TRANSMISSION"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
					className: "display-xl mb-16",
					children: [
						"GET IN",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
						"TOUCH."
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid md:grid-cols-12 gap-12",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "md:col-span-5 space-y-10",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "label-xs text-hc-muted mb-2",
								children: "STUDIO"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-lg",
								children: [
									"Bandra West, Mumbai 400050",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
									"India"
								]
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "label-xs text-hc-muted mb-2",
								children: "EMAIL"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: "mailto:hello@holycult.shop",
								className: "text-lg hover:text-hc-bronze",
								children: "hello@holycult.shop"
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "label-xs text-hc-muted mb-2",
								children: "PRESS"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: "mailto:press@holycult.shop",
								className: "text-lg hover:text-hc-bronze",
								children: "press@holycult.shop"
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "label-xs text-hc-muted mb-2",
								children: "WHOLESALE"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: "mailto:trade@holycult.shop",
								className: "text-lg hover:text-hc-bronze",
								children: "trade@holycult.shop"
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "label-xs text-hc-muted mb-2",
								children: "SOCIAL"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex gap-5 text-lg",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: "https://instagram.com",
									className: "hover:text-hc-bronze",
									children: "Instagram"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: "https://tiktok.com",
									className: "hover:text-hc-bronze",
									children: "TikTok"
								})]
							})] })
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("form", {
						className: "md:col-span-7 border border-hc-border p-8 md:p-10 bg-hc-surface",
						onSubmit: (e) => {
							e.preventDefault();
							setSent(true);
						},
						children: sent ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "py-24 text-center",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "label-xs text-hc-neon mb-3",
									children: "TRANSMISSION RECEIVED"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "display-md mb-3",
									children: "WE'LL BE IN TOUCH."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-hc-muted meta",
									children: "Usually within 48 hours."
								})
							]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-6",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid sm:grid-cols-2 gap-6",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										className: "form-input",
										placeholder: "NAME",
										required: true
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										className: "form-input",
										placeholder: "EMAIL",
										type: "email",
										required: true
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
									className: "form-input",
									defaultValue: "",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "",
											disabled: true,
											children: "SUBJECT"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Order Help" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Fit & Sizing" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Press" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Wholesale" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Other" })
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
									className: "form-input min-h-[160px] resize-y",
									placeholder: "MESSAGE",
									required: true
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									className: "cta cta-primary w-full sm:w-auto",
									children: "SEND TRANSMISSION"
								})
							]
						})
					})]
				})
			]
		})
	});
}
//#endregion
export { ContactPage as component };
