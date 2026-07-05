import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { I as useRouter, c as HeadContent, d as createRouter, f as Outlet, g as Link, h as createRootRouteWithContext, k as redirect, l as useRouterState, m as createFileRoute, p as lazyRouteComponent, s as Scripts } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { i as AnimatePresence } from "../_libs/framer-motion.mjs";
import { t as motion } from "../_libs/motion.mjs";
import { a as SITE, n as FOOTER_COLUMNS, o as formatPriceShort, r as PRIMARY_NAV } from "./site-DdWOgeii.mjs";
import { t as supabase } from "./client-DDfIBccA.mjs";
import { n as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { a as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { t as Toaster } from "../_libs/sonner.mjs";
import { a as ShoppingBag, d as Menu, l as Plus, n as User, r as Trash2, t as X, u as Minus } from "../_libs/lucide-react.mjs";
import { a as objectType, o as stringType } from "../_libs/zod.mjs";
import { c as productsQuery, n as dropsQuery, r as lookbookQuery, t as currentDropQuery } from "./queries-7cnJYuKS.mjs";
import { t as Route$25 } from "./admin.products._id-DPp6Ohbq.mjs";
import { t as Route$26 } from "./auth-B8ERajRy.mjs";
import { n as useCart, t as cartSelectors } from "./store-BOQEfw_w.mjs";
import { t as useAuthUser } from "./use-auth-user-DOTs8fqw.mjs";
import { t as Route$27 } from "./receipt._orderId-C99P1LhV.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-BW_xdapw.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var styles_default = "/assets/styles-B0_8pBTI.css";
function MobileNav({ open, onClose }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: open && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
		initial: { opacity: 0 },
		animate: { opacity: 1 },
		exit: { opacity: 0 },
		onClick: onClose,
		className: "fixed inset-0 bg-black/50 z-[70] md:hidden no-print"
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
		initial: { y: "-100%" },
		animate: { y: 0 },
		exit: { y: "-100%" },
		transition: {
			type: "spring",
			damping: 32,
			stiffness: 320
		},
		className: "fixed top-0 left-0 right-0 bg-hc-bg z-[71] md:hidden no-print border-b border-hc-text",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between p-5 border-b border-hc-border",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/",
					onClick: onClose,
					className: "flex items-center gap-2.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: "/logo/logo.jpeg",
						alt: "HOLYCULT",
						className: "h-7 w-auto"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "uppercase tracking-tight text-sm",
						style: { fontFamily: "'Archivo Black', sans-serif" },
						children: "HOLYCULT"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: onClose,
					"aria-label": "Close menu",
					className: "p-2",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { size: 22 })
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
				className: "p-2",
				children: PRIMARY_NAV.map((l, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
					initial: {
						opacity: 0,
						x: -16
					},
					animate: {
						opacity: 1,
						x: 0
					},
					transition: { delay: .05 + i * .04 },
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: l.to,
						onClick: onClose,
						className: "flex items-center justify-between px-4 py-5 border-b border-hc-border",
						activeProps: { className: "text-hc-bronze" },
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "uppercase text-2xl",
							style: { fontFamily: "'Archivo Black', sans-serif" },
							children: l.label
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "label-xs text-hc-muted",
							children: String(i + 1).padStart(2, "0")
						})]
					})
				}, l.to))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "p-5 space-y-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/drop",
					onClick: onClose,
					className: "cta cta-primary w-full",
					children: "ENTER THE DROP"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/account",
					onClick: onClose,
					className: "cta cta-outline w-full",
					children: "MY ACCOUNT"
				})]
			})
		]
	})] }) });
}
function Nav() {
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const isCheckoutFlow = pathname.startsWith("/checkout") || pathname.startsWith("/receipt");
	const [mobileOpen, setMobileOpen] = (0, import_react.useState)(false);
	const cartCount = useCart(cartSelectors.count);
	const openCart = useCart((s) => s.open);
	const { user } = useAuthUser();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
		className: "fixed top-0 left-0 right-0 z-50 bg-hc-bg/85 backdrop-blur-md no-print transition-colors",
		style: { paddingTop: "env(safe-area-inset-top, 0px)" },
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "page-container flex items-center justify-between h-16",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/",
				className: "flex items-center gap-2.5 cursor-pointer min-w-0 group",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.img, {
					src: "/logo/logo.jpeg",
					alt: "HOLYCULT",
					className: "h-7 w-auto shrink-0",
					whileHover: {
						rotate: 8,
						scale: 1.05
					},
					transition: {
						type: "spring",
						stiffness: 400,
						damping: 12
					}
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "hidden sm:inline uppercase tracking-tight text-sm truncate",
					style: { fontFamily: "'Archivo Black', sans-serif" },
					children: "HOLYCULT"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-3 md:gap-6",
				children: [
					!isCheckoutFlow && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "hidden md:flex items-center gap-6 label-xs",
						children: PRIMARY_NAV.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: l.to,
							className: "text-hc-muted hover:text-hc-text transition-colors relative group",
							activeProps: { className: "text-hc-text" },
							children: [l.label, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute -bottom-1 left-0 h-px w-0 bg-hc-bronze group-hover:w-full transition-all duration-300" })]
						}, l.to))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: user ? "/account" : "/auth",
						"aria-label": user ? "Account" : "Sign in",
						className: "p-2 hover:text-hc-bronze transition-colors relative",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { size: 18 }), user && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.span, {
							initial: { scale: 0 },
							animate: { scale: 1 },
							className: "absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-hc-neon"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: openCart,
						"aria-label": `Open cart, ${cartCount} items`,
						className: "relative p-2 hover:text-hc-bronze transition-colors",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingBag, { size: 18 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: cartCount > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.span, {
							initial: {
								scale: .4,
								opacity: 0
							},
							animate: {
								scale: 1,
								opacity: 1
							},
							exit: {
								scale: .4,
								opacity: 0
							},
							transition: {
								type: "spring",
								stiffness: 500,
								damping: 22
							},
							className: "absolute -top-0.5 -right-0.5 bg-hc-neon text-hc-text text-[10px] font-bold tabular-nums min-w-[18px] h-[18px] flex items-center justify-center px-1",
							children: cartCount
						}, cartCount) })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => setMobileOpen(true),
						"aria-label": "Open menu",
						className: "md:hidden p-2",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { size: 20 })
					})
				]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "rule" })]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MobileNav, {
		open: mobileOpen,
		onClose: () => setMobileOpen(false)
	})] });
}
function Footer() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
		className: "border-t border-hc-border no-print mt-24",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "page-container py-16 grid grid-cols-2 md:grid-cols-5 gap-10",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "col-span-2 md:col-span-2 max-w-sm",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2.5 mb-5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: "/logo/logo.jpeg",
							alt: "HOLYCULT",
							className: "h-7 w-auto"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "uppercase tracking-tight text-sm",
							style: { fontFamily: "'Archivo Black', sans-serif" },
							children: SITE.name
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "meta text-hc-muted leading-relaxed mb-6",
						children: SITE.tagline
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit: (e) => e.preventDefault(),
						className: "flex items-center gap-3 border-b border-hc-border pb-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							className: "form-input border-none flex-1 py-1 text-xs",
							placeholder: "EMAIL / JOIN THE CULT",
							type: "email",
							"aria-label": "Email address"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "label-xs hover:text-hc-bronze transition-colors",
							children: "JOIN →"
						})]
					})
				]
			}), FOOTER_COLUMNS.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "label-xs text-hc-muted mb-4",
				children: c.title
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "flex flex-col gap-2.5",
				children: c.links.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: l.to,
					className: "text-sm text-hc-text hover:text-hc-bronze transition-colors",
					children: l.label
				}) }, l.to))
			})] }, c.title))]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "border-t border-hc-border",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "page-container py-5 flex flex-col sm:flex-row items-center justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "label-xs text-hc-muted",
					children: [
						"HOLYCULT © ",
						(/* @__PURE__ */ new Date()).getFullYear(),
						" — ALL RIGHTS RESERVED"
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "label-xs text-hc-neon font-bold",
					children: "NO RESTOCKS. EVER."
				})]
			})
		})]
	});
}
function CartDrawer() {
	const isOpen = useCart((s) => s.isOpen);
	const close = useCart((s) => s.close);
	const lines = useCart((s) => s.lines);
	const setQty = useCart((s) => s.setQty);
	const removeLine = useCart((s) => s.removeLine);
	const subtotal = useCart(cartSelectors.subtotalCents);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: isOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
		initial: { opacity: 0 },
		animate: { opacity: 1 },
		exit: { opacity: 0 },
		transition: { duration: .2 },
		onClick: close,
		className: "fixed inset-0 bg-black/40 z-[60] no-print"
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.aside, {
		initial: { x: "100%" },
		animate: { x: 0 },
		exit: { x: "100%" },
		transition: {
			type: "spring",
			stiffness: 380,
			damping: 40
		},
		className: "fixed top-0 right-0 bottom-0 z-[61] w-full sm:max-w-md bg-hc-bg flex flex-col no-print",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "flex items-center justify-between p-5 border-b border-hc-border",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "section-num",
				children: "/ CART"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "display-md mt-1",
				children: [
					lines.length,
					" ",
					lines.length === 1 ? "ITEM" : "ITEMS"
				]
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				onClick: close,
				className: "p-2 hover:text-hc-bronze transition-colors",
				"aria-label": "Close cart",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { size: 20 })
			})]
		}), lines.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex-1 flex flex-col items-center justify-center p-8 text-center gap-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-6xl text-hc-bronze/40",
					children: "☩"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "display-md",
					children: "EMPTY VESSEL."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "meta text-hc-muted max-w-xs",
					children: "Add a piece from the current drop. Pieces won't return once gone."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/drop",
					onClick: close,
					className: "cta cta-primary mt-2",
					children: "ENTER THE DROP"
				})
			]
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex-1 overflow-y-auto p-5 space-y-5",
			children: lines.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: l.productImage,
					alt: l.productName,
					className: "w-20 h-24 object-cover bg-hc-surface shrink-0"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex-1 min-w-0",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-baseline justify-between gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-bold text-sm tracking-tight truncate",
								children: l.productName
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-mono text-sm tabular-nums shrink-0",
								children: formatPriceShort(l.unitPriceCents * l.qty)
							})]
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
							className: "mt-3 flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center border border-hc-border",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => setQty(l.productId, l.sizeLabel, l.qty - 1),
										className: "p-2 hover:bg-hc-surface",
										"aria-label": "Decrease quantity",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Minus, { size: 12 })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "px-3 font-mono text-xs tabular-nums",
										children: l.qty
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => setQty(l.productId, l.sizeLabel, l.qty + 1),
										className: "p-2 hover:bg-hc-surface",
										"aria-label": "Increase quantity",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { size: 12 })
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => removeLine(l.productId, l.sizeLabel),
								className: "text-hc-muted hover:text-hc-danger p-2",
								"aria-label": "Remove item",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { size: 14 })
							})]
						})
					]
				})]
			}, `${l.productId}-${l.sizeLabel}`))
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
			className: "p-5 border-t border-hc-border space-y-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "label-xs text-hc-muted",
						children: "SUBTOTAL"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-mono text-lg tabular-nums",
						children: formatPriceShort(subtotal)
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "meta text-hc-muted",
					children: "Shipping calculated at checkout."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/checkout",
					onClick: close,
					className: "cta cta-primary w-full",
					children: "CHECKOUT"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/cart",
					onClick: close,
					className: "cta cta-outline w-full",
					children: "VIEW CART"
				})
			]
		})] })]
	})] }) });
}
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "min-h-screen flex items-center justify-center bg-hc-bg px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "section-num mb-4",
					children: "404 — LOST"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "display-md mb-4",
					children: "NOT FOUND"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "meta text-hc-muted mb-8",
					children: "This page does not exist. Or it sold out."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/",
					className: "cta cta-primary",
					children: "RETURN"
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "min-h-screen flex items-center justify-center bg-hc-bg px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "section-num mb-4",
					children: "FAULT"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "display-md mb-4",
					children: "SOMETHING BROKE"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "meta text-hc-muted mb-8",
					children: error?.message ?? "Reload or return to the storefront."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex justify-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "cta cta-primary",
						children: "RETRY"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/",
						className: "cta cta-outline",
						children: "RETURN"
					})]
				})
			]
		})
	});
}
var Route$24 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1, viewport-fit=cover"
			},
			{
				name: "theme-color",
				content: "#F5F0EB"
			},
			{
				property: "og:site_name",
				content: "HOLYCULT"
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			}
		],
		links: [{
			rel: "stylesheet",
			href: styles_default
		}, {
			rel: "icon",
			href: "/logo/logo.jpeg"
		}]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	});
}
function RootComponent() {
	const { queryClient } = Route$24.useRouteContext();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryClientProvider, {
		client: queryClient,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "min-h-screen bg-hc-bg text-hc-text selection:bg-hc-neon selection:text-hc-text",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Nav, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartDrawer, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
					position: "bottom-right",
					toastOptions: { style: {
						background: "var(--hc-text)",
						color: "var(--hc-bg)",
						border: "none",
						borderRadius: 0,
						fontSize: "11px",
						letterSpacing: "0.12em",
						textTransform: "uppercase",
						fontWeight: 600
					} }
				})
			]
		})
	});
}
var $$splitComponentImporter$23 = () => import("./size-guide-Bt1zHs6E.mjs");
var Route$23 = createFileRoute("/size-guide")({
	head: () => ({
		meta: [
			{ title: "Size Guide — HOLYCULT" },
			{
				name: "description",
				content: "HOLYCULT size guide for tops, hoodies, and cargo pants. Measurements in cm and inches."
			},
			{
				property: "og:title",
				content: "Size Guide — HOLYCULT"
			},
			{
				property: "og:description",
				content: "Find your fit."
			}
		],
		links: [{
			rel: "canonical",
			href: "/size-guide"
		}]
	}),
	component: lazyRouteComponent($$splitComponentImporter$23, "component")
});
var $$splitComponentImporter$22 = () => import("./shipping-returns-5T9GUooi.mjs");
var Route$22 = createFileRoute("/shipping-returns")({
	head: () => ({
		meta: [
			{ title: "Shipping & Returns — HOLYCULT" },
			{
				name: "description",
				content: "How HOLYCULT ships worldwide and handles returns and exchanges."
			},
			{
				property: "og:title",
				content: "Shipping & Returns — HOLYCULT"
			},
			{
				property: "og:description",
				content: "Worldwide shipping. Honest returns."
			}
		],
		links: [{
			rel: "canonical",
			href: "/shipping-returns"
		}]
	}),
	component: lazyRouteComponent($$splitComponentImporter$22, "component")
});
var $$splitComponentImporter$21 = () => import("./lookbook-DPhGJjbN.mjs");
var Route$21 = createFileRoute("/lookbook")({
	head: () => ({
		meta: [
			{ title: "Lookbook — HOLYCULT SS26" },
			{
				name: "description",
				content: "SS26 / FIRST LIGHT lookbook. Heavyweight uniform, photographed in low light."
			},
			{
				property: "og:title",
				content: "Lookbook — HOLYCULT SS26"
			},
			{
				property: "og:description",
				content: "SS26 / FIRST LIGHT lookbook."
			},
			{
				property: "og:image",
				content: "/brand/holycult.png"
			}
		],
		links: [{
			rel: "canonical",
			href: "/lookbook"
		}]
	}),
	loader: ({ context }) => {
		context.queryClient.ensureQueryData(lookbookQuery());
	},
	component: lazyRouteComponent($$splitComponentImporter$21, "component")
});
var $$splitComponentImporter$20 = () => import("./journal-LucB7hhk.mjs");
var Route$20 = createFileRoute("/journal")({
	head: () => ({
		meta: [
			{ title: "Journal — HOLYCULT" },
			{
				name: "description",
				content: "Field notes from the HOLYCULT studio — drops, fabric, process."
			},
			{
				property: "og:title",
				content: "Journal — HOLYCULT"
			},
			{
				property: "og:description",
				content: "Field notes from the studio."
			}
		],
		links: [{
			rel: "canonical",
			href: "/journal"
		}]
	}),
	component: lazyRouteComponent($$splitComponentImporter$20, "component")
});
var $$splitComponentImporter$19 = () => import("./faq-CYm-ZMIE.mjs");
var Route$19 = createFileRoute("/faq")({
	head: () => ({
		meta: [
			{ title: "FAQ — HOLYCULT" },
			{
				name: "description",
				content: "Answers about drops, sizing, restocks, shipping, returns, and the cult."
			},
			{
				property: "og:title",
				content: "FAQ — HOLYCULT"
			},
			{
				property: "og:description",
				content: "Everything you'd ask before joining the cult."
			}
		],
		links: [{
			rel: "canonical",
			href: "/faq"
		}]
	}),
	component: lazyRouteComponent($$splitComponentImporter$19, "component")
});
var $$splitComponentImporter$18 = () => import("./drop-CtsAofq_.mjs");
var Route$18 = createFileRoute("/drop")({
	head: () => ({
		meta: [
			{ title: "Current Drop — SS26 / FIRST LIGHT — HOLYCULT" },
			{
				name: "description",
				content: "Heavyweight pieces. One production run. Live inventory. Select a size and SECURE."
			},
			{
				property: "og:title",
				content: "Current Drop — SS26 / FIRST LIGHT"
			},
			{
				property: "og:description",
				content: "Heavyweight pieces. One production run. Live inventory."
			},
			{
				property: "og:url",
				content: "/drop"
			},
			{
				property: "og:image",
				content: "/products/void-hoodie.jpg"
			}
		],
		links: [{
			rel: "canonical",
			href: "/drop"
		}]
	}),
	loader: ({ context }) => {
		context.queryClient.ensureQueryData(productsQuery("live"));
		context.queryClient.ensureQueryData(currentDropQuery());
	},
	component: lazyRouteComponent($$splitComponentImporter$18, "component")
});
var $$splitComponentImporter$17 = () => import("./contact-CwQ0FtBC.mjs");
var Route$17 = createFileRoute("/contact")({
	head: () => ({
		meta: [
			{ title: "Contact — HOLYCULT" },
			{
				name: "description",
				content: "Get in touch with HOLYCULT — orders, press, wholesale, fit help."
			},
			{
				property: "og:title",
				content: "Contact — HOLYCULT"
			},
			{
				property: "og:description",
				content: "Reach the HOLYCULT studio."
			}
		],
		links: [{
			rel: "canonical",
			href: "/contact"
		}]
	}),
	component: lazyRouteComponent($$splitComponentImporter$17, "component")
});
var $$splitComponentImporter$16 = () => import("./cart-3txU5hu6.mjs");
var Route$16 = createFileRoute("/cart")({
	head: () => ({
		meta: [
			{ title: "Cart — HOLYCULT" },
			{
				name: "description",
				content: "Review your acquisition."
			},
			{
				name: "robots",
				content: "noindex"
			}
		],
		links: [{
			rel: "canonical",
			href: "/cart"
		}]
	}),
	component: lazyRouteComponent($$splitComponentImporter$16, "component")
});
var $$splitComponentImporter$15 = () => import("./archive-CjZ7zApY.mjs");
var Route$15 = createFileRoute("/archive")({
	head: () => ({
		meta: [
			{ title: "Archive — Past Drops — HOLYCULT" },
			{
				name: "description",
				content: "Past releases. Unit counts. All sold out. No restocks. Ever."
			},
			{
				property: "og:title",
				content: "Archive — Past Drops"
			},
			{
				property: "og:description",
				content: "Past releases. All sold out."
			},
			{
				property: "og:url",
				content: "/archive"
			},
			{
				property: "og:image",
				content: "/products/obsidian-tee.jpg"
			}
		],
		links: [{
			rel: "canonical",
			href: "/archive"
		}]
	}),
	loader: ({ context }) => {
		context.queryClient.ensureQueryData(productsQuery("archived"));
		context.queryClient.ensureQueryData(dropsQuery());
	},
	component: lazyRouteComponent($$splitComponentImporter$15, "component")
});
var $$splitComponentImporter$14 = () => import("./about-DcWr0fBh.mjs");
var Route$14 = createFileRoute("/about")({
	head: () => ({
		meta: [
			{ title: "About — HOLYCULT" },
			{
				name: "description",
				content: "HOLYCULT is a congregation, not a brand. Numbered drops, heavyweight fabric, no restocks."
			},
			{
				property: "og:title",
				content: "About — HOLYCULT"
			},
			{
				property: "og:description",
				content: "HOLYCULT is a congregation, not a brand."
			}
		],
		links: [{
			rel: "canonical",
			href: "/about"
		}]
	}),
	component: lazyRouteComponent($$splitComponentImporter$14, "component")
});
var $$splitComponentImporter$13 = () => import("./route-Di7iQBCH.mjs");
var Route$13 = createFileRoute("/_authenticated")({
	ssr: false,
	beforeLoad: async () => {
		const { data, error } = await supabase.auth.getUser();
		if (error || !data.user) throw redirect({ to: "/auth" });
		return { user: data.user };
	},
	component: lazyRouteComponent($$splitComponentImporter$13, "component")
});
var $$splitComponentImporter$12 = () => import("./routes-vNottOaX.mjs");
var Route$12 = createFileRoute("/")({
	head: () => ({
		meta: [
			{ title: "HOLYCULT — SS26 / FIRST LIGHT" },
			{
				name: "description",
				content: "Heavyweight fabrics. Drop-based releases. One production run. No restocks. Ever."
			},
			{
				property: "og:title",
				content: "HOLYCULT — SS26 / FIRST LIGHT"
			},
			{
				property: "og:description",
				content: "Heavyweight fabrics. Drop-based releases. No restocks. Ever."
			},
			{
				property: "og:url",
				content: "/"
			},
			{
				property: "og:image",
				content: "/brand/holycult.png"
			}
		],
		links: [{
			rel: "canonical",
			href: "/"
		}]
	}),
	loader: ({ context }) => {
		context.queryClient.ensureQueryData(productsQuery("live"));
	},
	component: lazyRouteComponent($$splitComponentImporter$12, "component")
});
var $$splitComponentImporter$11 = () => import("./checkout.index-iCOUNcib.mjs");
var Route$11 = createFileRoute("/checkout/")({
	head: () => ({
		meta: [
			{ title: "Checkout — HOLYCULT" },
			{
				name: "description",
				content: "Secure your pieces."
			},
			{
				name: "robots",
				content: "noindex"
			}
		],
		links: [{
			rel: "canonical",
			href: "/checkout"
		}]
	}),
	component: lazyRouteComponent($$splitComponentImporter$11, "component")
});
objectType({
	email: stringType().trim().email("INVALID EMAIL"),
	name: stringType().trim().min(2, "NAME REQUIRED").max(120),
	phone: stringType().trim().min(6, "PHONE REQUIRED").max(40),
	address: stringType().trim().min(4, "ADDRESS REQUIRED").max(240),
	city: stringType().trim().min(1, "CITY REQUIRED").max(120),
	postal: stringType().trim().min(1, "POSTAL REQUIRED").max(40),
	country: stringType().trim().min(2, "COUNTRY REQUIRED").max(60)
});
var $$splitComponentImporter$10 = () => import("./admin-csSV1GLj.mjs");
var Route$10 = createFileRoute("/_authenticated/admin")({ component: lazyRouteComponent($$splitComponentImporter$10, "component") });
var $$splitComponentImporter$9 = () => import("./account-Cuxzf5dI.mjs");
var Route$9 = createFileRoute("/_authenticated/account")({ component: lazyRouteComponent($$splitComponentImporter$9, "component") });
var $$splitComponentImporter$8 = () => import("./admin.index-Db9NZtHR.mjs");
var Route$8 = createFileRoute("/_authenticated/admin/")({ component: lazyRouteComponent($$splitComponentImporter$8, "component") });
var $$splitComponentImporter$7 = () => import("./account.index-CpLFkxtS.mjs");
var Route$7 = createFileRoute("/_authenticated/account/")({ component: lazyRouteComponent($$splitComponentImporter$7, "component") });
var $$splitComponentImporter$6 = () => import("./admin.size-charts-CqFaoYEg.mjs");
var Route$6 = createFileRoute("/_authenticated/admin/size-charts")({ component: lazyRouteComponent($$splitComponentImporter$6, "component") });
var $$splitComponentImporter$5 = () => import("./admin.products-BvnYqmpb.mjs");
var Route$5 = createFileRoute("/_authenticated/admin/products")({ component: lazyRouteComponent($$splitComponentImporter$5, "component") });
var $$splitComponentImporter$4 = () => import("./admin.orders-DdPv1_N8.mjs");
var Route$4 = createFileRoute("/_authenticated/admin/orders")({ component: lazyRouteComponent($$splitComponentImporter$4, "component") });
var $$splitComponentImporter$3 = () => import("./admin.lookbook-CNT01v7Y.mjs");
var Route$3 = createFileRoute("/_authenticated/admin/lookbook")({ component: lazyRouteComponent($$splitComponentImporter$3, "component") });
var $$splitComponentImporter$2 = () => import("./account.orders-Bd7A9ZVC.mjs");
var Route$2 = createFileRoute("/_authenticated/account/orders")({ component: lazyRouteComponent($$splitComponentImporter$2, "component") });
var $$splitComponentImporter$1 = () => import("./account.addresses-BPs4Frq7.mjs");
var Route$1 = createFileRoute("/_authenticated/account/addresses")({ component: lazyRouteComponent($$splitComponentImporter$1, "component") });
var $$splitComponentImporter = () => import("./admin.products.new-DE1OGgY8.mjs");
var Route = createFileRoute("/_authenticated/admin/products/new")({ component: lazyRouteComponent($$splitComponentImporter, "component") });
var SizeGuideRoute = Route$23.update({
	id: "/size-guide",
	path: "/size-guide",
	getParentRoute: () => Route$24
});
var ShippingReturnsRoute = Route$22.update({
	id: "/shipping-returns",
	path: "/shipping-returns",
	getParentRoute: () => Route$24
});
var LookbookRoute = Route$21.update({
	id: "/lookbook",
	path: "/lookbook",
	getParentRoute: () => Route$24
});
var JournalRoute = Route$20.update({
	id: "/journal",
	path: "/journal",
	getParentRoute: () => Route$24
});
var FaqRoute = Route$19.update({
	id: "/faq",
	path: "/faq",
	getParentRoute: () => Route$24
});
var DropRoute = Route$18.update({
	id: "/drop",
	path: "/drop",
	getParentRoute: () => Route$24
});
var ContactRoute = Route$17.update({
	id: "/contact",
	path: "/contact",
	getParentRoute: () => Route$24
});
var CartRoute = Route$16.update({
	id: "/cart",
	path: "/cart",
	getParentRoute: () => Route$24
});
var AuthRoute = Route$26.update({
	id: "/auth",
	path: "/auth",
	getParentRoute: () => Route$24
});
var ArchiveRoute = Route$15.update({
	id: "/archive",
	path: "/archive",
	getParentRoute: () => Route$24
});
var AboutRoute = Route$14.update({
	id: "/about",
	path: "/about",
	getParentRoute: () => Route$24
});
var AuthenticatedRouteRoute = Route$13.update({
	id: "/_authenticated",
	getParentRoute: () => Route$24
});
var IndexRoute = Route$12.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$24
});
var CheckoutIndexRoute = Route$11.update({
	id: "/checkout/",
	path: "/checkout/",
	getParentRoute: () => Route$24
});
var ReceiptOrderIdRoute = Route$27.update({
	id: "/receipt/$orderId",
	path: "/receipt/$orderId",
	getParentRoute: () => Route$24
});
var AuthenticatedAdminRoute = Route$10.update({
	id: "/admin",
	path: "/admin",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedAccountRoute = Route$9.update({
	id: "/account",
	path: "/account",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedAdminIndexRoute = Route$8.update({
	id: "/",
	path: "/",
	getParentRoute: () => AuthenticatedAdminRoute
});
var AuthenticatedAccountIndexRoute = Route$7.update({
	id: "/",
	path: "/",
	getParentRoute: () => AuthenticatedAccountRoute
});
var AuthenticatedAdminSizeChartsRoute = Route$6.update({
	id: "/size-charts",
	path: "/size-charts",
	getParentRoute: () => AuthenticatedAdminRoute
});
var AuthenticatedAdminProductsRoute = Route$5.update({
	id: "/products",
	path: "/products",
	getParentRoute: () => AuthenticatedAdminRoute
});
var AuthenticatedAdminOrdersRoute = Route$4.update({
	id: "/orders",
	path: "/orders",
	getParentRoute: () => AuthenticatedAdminRoute
});
var AuthenticatedAdminLookbookRoute = Route$3.update({
	id: "/lookbook",
	path: "/lookbook",
	getParentRoute: () => AuthenticatedAdminRoute
});
var AuthenticatedAccountOrdersRoute = Route$2.update({
	id: "/orders",
	path: "/orders",
	getParentRoute: () => AuthenticatedAccountRoute
});
var AuthenticatedAccountAddressesRoute = Route$1.update({
	id: "/addresses",
	path: "/addresses",
	getParentRoute: () => AuthenticatedAccountRoute
});
var AuthenticatedAdminProductsNewRoute = Route.update({
	id: "/new",
	path: "/new",
	getParentRoute: () => AuthenticatedAdminProductsRoute
});
var AuthenticatedAdminProductsIdRoute = Route$25.update({
	id: "/$id",
	path: "/$id",
	getParentRoute: () => AuthenticatedAdminProductsRoute
});
var AuthenticatedAccountRouteChildren = {
	AuthenticatedAccountAddressesRoute,
	AuthenticatedAccountOrdersRoute,
	AuthenticatedAccountIndexRoute
};
var AuthenticatedAccountRouteWithChildren = AuthenticatedAccountRoute._addFileChildren(AuthenticatedAccountRouteChildren);
var AuthenticatedAdminProductsRouteChildren = {
	AuthenticatedAdminProductsIdRoute,
	AuthenticatedAdminProductsNewRoute
};
var AuthenticatedAdminRouteChildren = {
	AuthenticatedAdminLookbookRoute,
	AuthenticatedAdminOrdersRoute,
	AuthenticatedAdminProductsRoute: AuthenticatedAdminProductsRoute._addFileChildren(AuthenticatedAdminProductsRouteChildren),
	AuthenticatedAdminSizeChartsRoute,
	AuthenticatedAdminIndexRoute
};
var AuthenticatedRouteRouteChildren = {
	AuthenticatedAccountRoute: AuthenticatedAccountRouteWithChildren,
	AuthenticatedAdminRoute: AuthenticatedAdminRoute._addFileChildren(AuthenticatedAdminRouteChildren)
};
var rootRouteChildren = {
	IndexRoute,
	AuthenticatedRouteRoute: AuthenticatedRouteRoute._addFileChildren(AuthenticatedRouteRouteChildren),
	AboutRoute,
	ArchiveRoute,
	AuthRoute,
	CartRoute,
	ContactRoute,
	DropRoute,
	FaqRoute,
	JournalRoute,
	LookbookRoute,
	ShippingReturnsRoute,
	SizeGuideRoute,
	ReceiptOrderIdRoute,
	CheckoutIndexRoute
};
var routeTree = Route$24._addFileChildren(rootRouteChildren)._addFileTypes();
var getRouter = () => {
	return createRouter({
		routeTree,
		context: { queryClient: new QueryClient() },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { getRouter };
