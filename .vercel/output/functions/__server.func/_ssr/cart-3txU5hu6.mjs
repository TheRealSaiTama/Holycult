import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { i as SHIPPING_FLAT_CENTS, o as formatPriceShort } from "./site-DdWOgeii.mjs";
import { l as Plus, r as Trash2, u as Minus } from "../_libs/lucide-react.mjs";
import { n as useCart, t as cartSelectors } from "./store-BOQEfw_w.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/cart-3txU5hu6.js
var import_jsx_runtime = require_jsx_runtime();
function CartPage() {
	const lines = useCart((s) => s.lines);
	const setQty = useCart((s) => s.setQty);
	const removeLine = useCart((s) => s.removeLine);
	const subtotal = useCart(cartSelectors.subtotalCents);
	const shipping = lines.length ? SHIPPING_FLAT_CENTS : 0;
	const total = subtotal + shipping;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "pt-28 pb-24 page-container",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "section-num mb-2",
				children: "/ 04 — CART"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
				className: "display-xl mb-12",
				children: [
					"YOUR",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
					"ACQUISITION."
				]
			}),
			lines.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "border border-hc-border p-12 text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-5xl text-hc-bronze/40 mb-4",
						children: "☩"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "display-md mb-3",
						children: "EMPTY VESSEL."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-hc-muted meta mb-8",
						children: "No pieces secured yet."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/drop",
						className: "cta cta-primary",
						children: "ENTER THE DROP"
					})
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid md:grid-cols-3 gap-10 items-start",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "md:col-span-2 border-t border-hc-text",
					children: lines.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-[88px_minmax(0,1fr)_auto] gap-4 sm:gap-6 py-6 border-b border-hc-border items-center",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: l.productImage,
								alt: l.productName,
								className: "w-22 h-28 object-cover bg-hc-surface"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "font-bold tracking-tight truncate",
										children: l.productName
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "ref-code mt-0.5",
										children: l.productRef
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "meta text-hc-muted mt-1",
										children: ["SIZE ", l.sizeLabel]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-3 flex items-center gap-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center border border-hc-border",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													onClick: () => setQty(l.productId, l.sizeLabel, l.qty - 1),
													className: "p-2 hover:bg-hc-surface",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Minus, { size: 12 })
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "px-3 font-mono text-xs tabular-nums",
													children: l.qty
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													onClick: () => setQty(l.productId, l.sizeLabel, l.qty + 1),
													className: "p-2 hover:bg-hc-surface",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { size: 12 })
												})
											]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											onClick: () => removeLine(l.productId, l.sizeLabel),
											className: "text-hc-muted hover:text-hc-danger label-xs flex items-center gap-1.5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { size: 12 }), " REMOVE"]
										})]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-right font-mono tabular-nums",
								children: formatPriceShort(l.unitPriceCents * l.qty)
							})
						]
					}, `${l.productId}-${l.sizeLabel}`))
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
					className: "md:sticky md:top-24 border border-hc-border p-6 space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "label-xs text-hc-muted",
							children: "SUMMARY"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2 font-mono text-sm",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-hc-muted",
										children: "SUBTOTAL"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: formatPriceShort(subtotal) })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-hc-muted",
										children: "SHIPPING"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: formatPriceShort(shipping) })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "rule my-3" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between font-bold text-base",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "TOTAL" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: formatPriceShort(total) })]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/checkout",
							className: "cta cta-primary w-full",
							children: "CHECKOUT"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/drop",
							className: "cta cta-outline w-full",
							children: "KEEP BROWSING"
						})
					]
				})]
			})
		]
	});
}
//#endregion
export { CartPage as component };
