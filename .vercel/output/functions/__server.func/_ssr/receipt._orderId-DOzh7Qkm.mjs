import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { o as formatPriceShort } from "./site-DdWOgeii.mjs";
import { r as useSuspenseQuery } from "../_libs/tanstack__react-query.mjs";
import { s as orderQuery } from "./queries-7cnJYuKS.mjs";
import { t as Route } from "./receipt._orderId-C99P1LhV.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/receipt._orderId-DOzh7Qkm.js
var import_jsx_runtime = require_jsx_runtime();
var BARS = [
	3,
	1,
	2,
	4,
	1,
	3,
	2,
	1,
	4,
	2,
	1,
	3,
	1,
	2,
	4,
	1,
	2,
	3,
	4,
	1,
	1,
	3,
	2,
	4,
	1,
	3
];
function Barcode() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "barcode-strip",
		children: BARS.map((w, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "barcode-bar",
			style: { width: w }
		}, i))
	});
}
function ReceiptPage() {
	const { orderId } = Route.useParams();
	const { data: order } = useSuspenseQuery(orderQuery(orderId));
	if (!order) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen pt-28 pb-24 page-container text-center",
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
	const date = new Date(order.created_at).toLocaleString();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "min-h-screen pt-24 pb-24 flex items-center justify-center p-6",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "printable-receipt max-w-sm w-full bg-hc-surface p-8 flex flex-col items-center relative",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "receipt-jagged absolute top-0 left-0 right-0 no-print" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: "/logo/logo.jpeg",
					alt: "HC",
					className: "h-12 w-auto mb-4 mt-4 object-contain"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-center font-black tracking-[0.2em] text-base mb-1",
					children: "HOLYCULT"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "label-xs text-hc-muted mb-6",
					children: "ACQUISITION DOCUMENT"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-full rule mb-4" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "w-full space-y-2 font-mono text-[10px] leading-relaxed",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-hc-muted",
								children: "SERIAL:"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-bold",
								children: order.ref_code
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-hc-muted",
								children: "TIME:"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-bold",
								children: date
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-hc-muted",
								children: "EMAIL:"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-bold truncate ml-2",
								children: order.email
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-hc-muted",
								children: "STATUS:"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-hc-text bg-hc-neon px-1.5 py-0.5 font-bold tracking-wider text-[9px]",
								children: order.status.toUpperCase()
							})]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-full rule my-4" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "w-full space-y-3 font-mono text-[10px]",
					children: [
						order.items.map((it) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-between font-bold",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "truncate",
								children: it.product_name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "shrink-0",
								children: formatPriceShort(it.unit_price_cents * it.qty, order.currency)
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-between text-hc-muted pl-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
								"SIZE ",
								it.size_label,
								" · ×",
								it.qty
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: it.product_ref })]
						})] }, it.id)),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "rule my-3" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-between text-hc-muted",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "SUBTOTAL" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: formatPriceShort(order.subtotal_cents, order.currency) })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-between text-hc-muted",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "SHIPPING" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: formatPriceShort(order.shipping_cents, order.currency) })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "rule my-3" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-between font-bold text-xs",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "TOTAL" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
								formatPriceShort(order.total_cents, order.currency),
								" ",
								order.currency
							] })]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-full rule my-4" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "w-full space-y-1 font-mono text-[9px] text-hc-muted leading-relaxed",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "font-bold text-hc-text uppercase",
							children: "SHIPS TO"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: order.shipping.name }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: order.shipping.address }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							order.shipping.city,
							" ",
							order.shipping.postal
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: order.shipping.country })
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-full rule my-4" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-[9px] font-mono text-center text-hc-muted max-w-[240px] leading-normal mb-5 uppercase",
					children: "PROOF OF SECURED MERCHANDISE. NO RESTOCKS. EVER."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "w-full mb-2",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Barcode, {})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "font-mono text-[8px] tracking-[0.25em] text-center text-hc-muted mb-6",
					children: [
						"*",
						order.ref_code,
						"*"
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "receipt-jagged-bottom absolute bottom-0 left-0 right-0 no-print" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "w-full space-y-2 mt-4 no-print",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => window.print(),
						className: "cta cta-primary w-full",
						children: "PRINT RECEIPT"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/drop",
						className: "cta cta-outline w-full",
						children: "RETURN TO STOREFRONT"
					})]
				})
			]
		})
	});
}
//#endregion
export { ReceiptPage as component };
