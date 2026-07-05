import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { a as DialogOverlay$1, c as DialogTrigger$1, i as DialogDescription$1, n as DialogClose, o as DialogPortal$1, r as DialogContent$1, s as DialogTitle$1, t as Dialog$1 } from "../_libs/@radix-ui/react-dialog+[...].mjs";
import { i as AnimatePresence } from "../_libs/framer-motion.mjs";
import { t as motion } from "../_libs/motion.mjs";
import { o as formatPriceShort } from "./site-DdWOgeii.mjs";
import { i as useQuery } from "../_libs/tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { a as ShoppingBag, c as Ruler, t as X } from "../_libs/lucide-react.mjs";
import { l as sizeChartsQuery } from "./queries-CHhq0NY_.mjs";
import { n as useCart } from "./store-BOQEfw_w.mjs";
import { t as clsx } from "../_libs/clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/Rule-DG17kLkf.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function InventoryBar({ pct }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: `inventory-bar ${pct < 15 ? "inventory-low" : ""}`,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "inventory-fill",
			style: { width: `${Math.max(pct, 3)}%` }
		})
	});
}
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
var Dialog = Dialog$1;
var DialogTrigger = DialogTrigger$1;
var DialogPortal = DialogPortal$1;
var DialogOverlay = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay$1, {
	ref,
	className: cn("fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", className),
	...props
}));
DialogOverlay.displayName = DialogOverlay$1.displayName;
var DialogContent = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent$1, {
	ref,
	className: cn("fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 sm:rounded-lg", className),
	...props,
	children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogClose, {
		className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background cursor-pointer transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "sr-only",
			children: "Close"
		})]
	})]
})] }));
DialogContent.displayName = DialogContent$1.displayName;
var DialogHeader = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: cn("flex flex-col space-y-1.5 text-center sm:text-left", className),
	...props
});
DialogHeader.displayName = "DialogHeader";
var DialogFooter = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className),
	...props
});
DialogFooter.displayName = "DialogFooter";
var DialogTitle = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle$1, {
	ref,
	className: cn("text-lg font-semibold leading-none tracking-tight", className),
	...props
}));
DialogTitle.displayName = DialogTitle$1.displayName;
var DialogDescription = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription$1, {
	ref,
	className: cn("text-sm text-muted-foreground", className),
	...props
}));
DialogDescription.displayName = DialogDescription$1.displayName;
function inferSizeKind(category) {
	const c = (category ?? "").toLowerCase();
	if (c.includes("pant") || c.includes("cargo") || c.includes("short") || c.includes("bottom") || c.includes("jean")) return "bottoms";
	return "tops";
}
var FALLBACK = {
	tops: {
		id: "fallback-tops",
		kind: "tops",
		title: "TOPS & HOODIES",
		unit: "cm",
		headers: [
			"SIZE",
			"CHEST",
			"LENGTH",
			"SLEEVE"
		],
		rows: [
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
		],
		note: "Cut for a relaxed, drop-shoulder fit."
	},
	bottoms: {
		id: "fallback-bottoms",
		kind: "bottoms",
		title: "BOTTOMS",
		unit: "cm",
		headers: [
			"SIZE",
			"WAIST",
			"HIP",
			"INSEAM"
		],
		rows: [
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
		],
		note: "Mid-rise, relaxed leg."
	}
};
function Table({ headers, rows }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "overflow-x-auto border border-hc-border",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
			className: "w-full text-sm",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
				className: "bg-hc-text text-hc-bg",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: headers.map((h) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
					className: "text-left p-2.5 label-xs whitespace-nowrap",
					children: h
				}, h)) })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: rows.map((r, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", {
				className: "border-t border-hc-border",
				children: r.map((c, j) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
					className: `p-2.5 whitespace-nowrap ${j === 0 ? "label-xs" : "font-mono text-xs tabular-nums"}`,
					children: c
				}, j))
			}, i)) })]
		})
	});
}
function SizeChartDialog({ category, trigger }) {
	const kind = inferSizeKind(category);
	const { data: charts } = useQuery(sizeChartsQuery());
	const chart = (charts ?? []).find((c) => c.kind === kind) ?? FALLBACK[kind];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Dialog, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTrigger, {
		asChild: true,
		children: trigger ?? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			type: "button",
			className: "caption text-hc-muted hover:text-hc-text inline-flex items-center gap-1 cursor-pointer transition-colors",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ruler, { size: 10 }), " SIZE CHART"]
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
		className: "max-w-lg p-0 bg-hc-surface border border-hc-border rounded-none",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "tricolor-bar h-[3px] w-full" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "p-5 sm:p-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
					className: "display-md",
					children: chart.title
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "meta text-hc-muted mt-1",
					children: ["MEASUREMENTS IN ", chart.unit.toUpperCase()]
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-5",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table, {
						headers: chart.headers,
						rows: chart.rows
					})
				}),
				chart.note && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-5 text-xs text-hc-muted leading-relaxed",
					children: chart.note
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 pt-4 border-t border-hc-border flex items-center justify-between gap-3 flex-wrap",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "caption text-hc-muted",
						children: "🇮🇳 CUT & SEWN IN INDIA"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/size-guide",
						className: "caption text-hc-text underline underline-offset-4",
						children: "FULL GUIDE →"
					})]
				})
			]
		})]
	})] });
}
var SIZE_KEY = (id) => `hc:size:${id}`;
var variants = {
	hidden: {
		opacity: 0,
		y: 16
	},
	visible: {
		opacity: 1,
		y: 0,
		transition: {
			duration: .5,
			ease: "easeOut"
		}
	}
};
function ProductCard({ product }) {
	const addLine = useCart((s) => s.addLine);
	const [selectedSize, setSelectedSize] = (0, import_react.useState)(null);
	const [sizeError, setSizeError] = (0, import_react.useState)(false);
	const [hovered, setHovered] = (0, import_react.useState)(false);
	const [sparkle, setSparkle] = (0, import_react.useState)(0);
	(0, import_react.useEffect)(() => {
		try {
			const saved = localStorage.getItem(SIZE_KEY(product.id));
			if (saved && product.sizes.some((s) => s.label === saved && s.stock_qty > 0)) setSelectedSize(saved);
		} catch {}
	}, [product.id, product.sizes]);
	function pickSize(label) {
		setSelectedSize(label);
		try {
			if (label) localStorage.setItem(SIZE_KEY(product.id), label);
			else localStorage.removeItem(SIZE_KEY(product.id));
		} catch {}
	}
	const totalStock = product.sizes.reduce((n, s) => n + s.stock_qty, 0);
	const startStock = product.sizes.length * 20;
	const inventoryPct = Math.min(100, Math.round(totalStock / Math.max(1, startStock) * 100));
	const isLow = inventoryPct < 18 && inventoryPct > 0;
	const isSoldOut = totalStock === 0;
	function onAdd() {
		if (isSoldOut) return;
		if (!selectedSize) {
			setSizeError(true);
			setTimeout(() => setSizeError(false), 500);
			return;
		}
		const size = product.sizes.find((s) => s.label === selectedSize);
		if (!size || size.stock_qty === 0) {
			toast.error(`Size ${selectedSize} sold out`);
			return;
		}
		addLine({
			productId: product.id,
			productName: product.name,
			productRef: product.ref,
			productImage: product.image_url,
			productSlug: product.slug,
			sizeLabel: selectedSize,
			unitPriceCents: product.price_cents,
			currency: product.currency
		});
		setSparkle((n) => n + 1);
		toast.success(`${product.name} · ${selectedSize} → CART`);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
		variants,
		className: `card flex flex-col ${isSoldOut ? "opacity-50" : ""}`,
		onHoverStart: () => setHovered(true),
		onHoverEnd: () => setHovered(false),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative aspect-[4/5] bg-hc-bg overflow-hidden",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: product.image_url,
					alt: product.name,
					loading: "lazy",
					className: "absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out",
					style: {
						transform: hovered ? "scale(1.05)" : "scale(1)",
						filter: isSoldOut ? "grayscale(0.5)" : "none"
					}
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "absolute top-3 left-3",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "label-xs text-hc-muted bg-hc-surface/90 px-2 py-1",
						children: product.category
					})
				}),
				isSoldOut && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "absolute inset-0 flex items-center justify-center",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "bg-hc-text text-hc-bg label-xs px-4 py-2",
						children: "SOLD OUT"
					})
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "p-4 sm:p-5 flex flex-col flex-1 gap-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col gap-1.5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-baseline justify-between gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "font-bold text-[15px] sm:text-base tracking-tight leading-tight truncate min-w-0",
								children: product.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "font-mono text-sm shrink-0 tabular-nums",
								children: formatPriceShort(product.price_cents, product.currency)
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "meta text-hc-muted truncate",
							children: product.fabric
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "ref-code",
								children: product.ref
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "ref-code inline-flex items-center gap-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "inline-block w-3 h-[6px] tricolor-bar" }), " INDIA"]
							})]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex justify-between items-center mb-2 gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "caption text-hc-muted",
						children: "SIZE"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3",
						children: [sizeError && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[10px] text-hc-danger font-bold animate-pulse",
							children: "SELECT SIZE"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SizeChartDialog, { category: product.category })]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: `flex flex-wrap gap-x-4 gap-y-1 ${sizeError ? "animate-shake" : ""}`,
					children: product.sizes.map((s) => {
						const out = s.stock_qty === 0;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							disabled: out || isSoldOut,
							onClick: () => pickSize(selectedSize === s.label ? null : s.label),
							className: `size-tab ${selectedSize === s.label ? "selected" : ""} ${out ? "line-through opacity-40 cursor-not-allowed" : ""}`,
							children: s.label
						}, s.label);
					})
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-auto",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between meta mb-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-hc-muted flex items-center gap-1.5",
							children: [!isSoldOut && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "inline-block w-1.5 h-1.5 rounded-full bg-hc-neon" }), isSoldOut ? "SOLD OUT" : "INVENTORY"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: `font-mono tabular-nums ${isLow ? "text-hc-danger" : "text-hc-muted"}`,
							children: isSoldOut ? "0%" : `${inventoryPct}%`
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InventoryBar, { pct: inventoryPct })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					disabled: isSoldOut,
					onClick: onAdd,
					className: `cta w-full relative overflow-visible ${isSoldOut ? "cta-outline cursor-not-allowed" : selectedSize ? "cta-neon" : "cta-outline"}`,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingBag, {
							size: 14,
							className: "mr-2"
						}),
						isSoldOut ? "SOLD OUT" : selectedSize ? `ADD — ${selectedSize}` : "SELECT SIZE",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: sparkle > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.span, {
							initial: {
								opacity: 1,
								y: 0,
								scale: 1
							},
							animate: {
								opacity: 0,
								y: -60,
								scale: 1.6
							},
							exit: { opacity: 0 },
							transition: {
								duration: .9,
								ease: [
									.22,
									1,
									.36,
									1
								]
							},
							className: "absolute left-1/2 -translate-x-1/2 -top-1 text-hc-bronze pointer-events-none text-xl",
							style: { fontFamily: "'Archivo Black', sans-serif" },
							children: "+1 ☩"
						}, sparkle) })
					]
				})
			]
		})]
	});
}
function Rule({ label, sub, className = "" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: `flex items-center gap-4 ${className}`,
		children: [
			label && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "section-num shrink-0",
				children: label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "flex-1 h-px bg-hc-border" }),
			sub && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "label-xs text-hc-muted shrink-0",
				children: sub
			})
		]
	});
}
//#endregion
export { Rule as n, ProductCard as t };
