import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { n as useScroll, t as useTransform } from "../_libs/framer-motion.mjs";
import { t as motion } from "../_libs/motion.mjs";
import { r as useSuspenseQuery } from "../_libs/tanstack__react-query.mjs";
import { c as productsQuery } from "./queries-7cnJYuKS.mjs";
import { n as Rule, t as ProductCard } from "./Rule-CMPgm2gI.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-vNottOaX.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function MarqueeStrip({ items, speed = 32, tone = "dark" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: `relative overflow-hidden py-5 border-y ${tone === "dark" ? "bg-hc-text text-hc-bg border-hc-text" : "bg-hc-bg text-hc-text border-hc-border"}`,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
			className: "flex gap-12 whitespace-nowrap",
			animate: { x: ["0%", "-50%"] },
			transition: {
				duration: speed,
				repeat: Infinity,
				ease: "linear"
			},
			children: [
				...items,
				...items,
				...items,
				...items
			].map((t, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "uppercase tracking-tight text-xl md:text-3xl flex items-center gap-10",
				style: { fontFamily: "'Archivo Black', sans-serif" },
				children: [t, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-hc-bronze",
					children: "☩"
				})]
			}, i))
		})
	});
}
function BronzeAura({ className = "", intensity = .35 }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
		animate: {
			scale: [
				1,
				1.06,
				1
			],
			opacity: [
				.55,
				.9,
				.55
			]
		},
		transition: {
			duration: 7,
			repeat: Infinity,
			ease: "easeInOut"
		},
		"aria-hidden": true,
		className: `pointer-events-none absolute rounded-full ${className}`,
		style: {
			background: `radial-gradient(circle, rgba(166,124,82,${intensity}) 0%, transparent 65%)`,
			filter: "blur(60px)"
		}
	});
}
function Crosshair({ className = "", size = 16 }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: `relative pointer-events-none ${className}`,
		style: {
			width: size,
			height: size
		},
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-y-0 left-1/2 w-px bg-current opacity-40" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-x-0 top-1/2 h-px bg-current opacity-40" })]
	});
}
var TICKER = [
	"SS26 / FIRST LIGHT",
	"ONE RUN. NO RESTOCKS.",
	"HEAVYWEIGHT 420GSM",
	"CULT NUMBER ☩ 0026",
	"SHIPPING WORLDWIDE",
	"JOIN THE CONGREGATION"
];
function Home() {
	const { data: products } = useSuspenseQuery(productsQuery("live"));
	const [activeWall, setActiveWall] = (0, import_react.useState)("MENS");
	const heroRef = (0, import_react.useRef)(null);
	const { scrollYProgress } = useScroll({
		target: heroRef,
		offset: ["start start", "end start"]
	});
	const titleY = useTransform(scrollYProgress, [0, 1], [0, -120]);
	const fade = useTransform(scrollYProgress, [0, .7], [1, 0]);
	const featured = products.filter((p) => p.gender === activeWall).slice(0, 3);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative bg-hc-bg text-hc-text overflow-x-hidden",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				ref: heroRef,
				className: "relative min-h-[100dvh] w-full flex items-center justify-center overflow-hidden pt-16",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "absolute inset-0 z-0 pointer-events-none select-none overflow-hidden flex items-center justify-center",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: "/images/model_bg.png",
							alt: "HOLYCULT Model",
							className: "w-full h-full object-cover opacity-25 mix-blend-multiply scale-105",
							style: { filter: "grayscale(1) contrast(1.15)" }
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "absolute inset-0 flex items-center justify-center pointer-events-none select-none opacity-[0.04]",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "leading-none uppercase tracking-tighter text-hc-text",
							style: {
								fontFamily: "'Archivo Black', sans-serif",
								fontSize: "min(38vw, 720px)"
							},
							children: "HOLY"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "absolute inset-0 pointer-events-none opacity-[0.05]",
						style: {
							backgroundImage: "linear-gradient(var(--hc-text) 1px, transparent 1px), linear-gradient(90deg, var(--hc-text) 1px, transparent 1px)",
							backgroundSize: "72px 72px"
						}
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BronzeAura, { className: "w-[80vw] h-[80vw] max-w-[820px] max-h-[820px]" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
						animate: { rotate: 360 },
						transition: {
							duration: 60,
							repeat: Infinity,
							ease: "linear"
						},
						className: "absolute rounded-full border border-hc-text/10 pointer-events-none",
						style: {
							width: "min(82vw, 800px)",
							height: "min(82vw, 800px)"
						}
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
						animate: { rotate: -360 },
						transition: {
							duration: 90,
							repeat: Infinity,
							ease: "linear"
						},
						className: "absolute rounded-full border border-hc-bronze/25 pointer-events-none",
						style: {
							width: "min(68vw, 680px)",
							height: "min(68vw, 680px)"
						}
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
						initial: {
							opacity: 0,
							scale: .6
						},
						animate: {
							opacity: 1,
							scale: 1
						},
						transition: {
							duration: 1.4,
							ease: [
								.22,
								1,
								.36,
								1
							]
						},
						className: "absolute z-10 text-hc-bronze/60 leading-none select-none",
						style: {
							fontFamily: "'Archivo Black', sans-serif",
							fontSize: "min(22vw, 220px)"
						},
						children: "☩"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
						style: {
							y: titleY,
							opacity: fade
						},
						className: "absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-30 px-4 sm:px-8",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.h1, {
							initial: {
								opacity: 0,
								y: -30,
								clipPath: "inset(0 0 100% 0)"
							},
							animate: {
								opacity: 1,
								y: 0,
								clipPath: "inset(0 0 0% 0)"
							},
							transition: {
								duration: 1,
								ease: [
									.22,
									1,
									.36,
									1
								]
							},
							className: "uppercase tracking-tighter text-hc-text text-center w-full",
							style: {
								fontFamily: "'Archivo Black', sans-serif",
								fontSize: "clamp(4rem, 18vw, 16rem)",
								lineHeight: .82,
								textShadow: "0 12px 40px rgba(0,0,0,0.08)"
							},
							children: "HOLY"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.h1, {
							initial: {
								opacity: 0,
								y: 30,
								clipPath: "inset(100% 0 0 0)"
							},
							animate: {
								opacity: 1,
								y: 0,
								clipPath: "inset(0% 0 0 0)"
							},
							transition: {
								duration: 1,
								delay: .15,
								ease: [
									.22,
									1,
									.36,
									1
								]
							},
							className: "uppercase tracking-tighter text-center w-full",
							style: {
								fontFamily: "'Archivo Black', sans-serif",
								fontSize: "clamp(4rem, 18vw, 16rem)",
								lineHeight: .82,
								color: "transparent",
								WebkitTextStroke: "1.5px rgba(28,26,24,0.55)",
								paddingRight: "0.08em"
							},
							children: "CULT"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Crosshair, { className: "absolute top-20 left-6 md:left-12" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Crosshair, { className: "absolute top-20 right-6 md:right-12" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Crosshair, { className: "absolute bottom-6 left-6 md:left-12" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Crosshair, { className: "absolute bottom-6 right-6 md:right-12" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
						initial: {
							opacity: 0,
							y: 12
						},
						animate: {
							opacity: 1,
							y: 0
						},
						transition: {
							delay: 1.1,
							duration: .6
						},
						className: "absolute bottom-10 left-6 md:left-16 max-w-[320px] hidden lg:block z-20",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col gap-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
										animate: { opacity: [
											1,
											.3,
											1
										] },
										transition: {
											duration: 1.6,
											repeat: Infinity
										},
										className: "w-2 h-2 rounded-full bg-hc-neon"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "label-xs text-hc-muted",
										children: "LIVE DROP / TRANSMISSION 026"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "meta text-hc-muted leading-relaxed",
									children: "Heavyweight fabrics. Drop-based releases. One production run. No restocks. Ever."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-10 h-px bg-hc-bronze" })
							]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
						initial: {
							opacity: 0,
							y: 12
						},
						animate: {
							opacity: 1,
							y: 0
						},
						transition: {
							delay: 1.2,
							duration: .6
						},
						className: "absolute bottom-10 right-6 md:right-16 flex flex-col items-end gap-4 z-20",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/drop",
							className: "cta cta-primary",
							children: "ENTER THE DROP"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/archive",
							className: "label-xs text-hc-muted hover:text-hc-text transition-colors",
							children: "→ ARCHIVE"
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MarqueeStrip, { items: TICKER }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "py-24 md:py-32",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "page-container grid grid-cols-1 md:grid-cols-12 gap-8",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "md:col-span-3 section-num",
						children: "/ 002 — ETHOS"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
						initial: {
							opacity: 0,
							y: 30
						},
						whileInView: {
							opacity: 1,
							y: 0
						},
						viewport: {
							once: true,
							margin: "-100px"
						},
						transition: {
							duration: .9,
							ease: [
								.22,
								1,
								.36,
								1
							]
						},
						className: "md:col-span-9",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
							className: "uppercase leading-[0.9] mb-10",
							style: {
								fontFamily: "'Archivo Black', sans-serif",
								fontSize: "clamp(2.5rem, 7vw, 6rem)",
								letterSpacing: "-0.03em"
							},
							children: [
								"Not a brand.",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
								"A ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-hc-bronze",
									children: "congregation"
								}),
								"."
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-lg md:text-xl max-w-[55ch] leading-relaxed text-hc-muted",
							children: [
								"Every piece is numbered. Every run is finite. When it's gone, it's gone — pressed into the archive, never to return. This isn't scarcity as marketing. It's scarcity as",
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", {
									className: "not-italic text-hc-text",
									children: "respect"
								}),
								"."
							]
						})]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "border-y border-hc-border py-20",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "page-container",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rule, {
							label: "/ 003 — IN THE DROP",
							sub: "FIRST LIGHT",
							className: "mb-8"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between mb-12 gap-4 flex-wrap",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "display-lg",
									children: "PIECES"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex gap-2 border border-hc-border p-1 bg-hc-surface",
									children: ["MENS", "WOMENS"].map((gender) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => setActiveWall(gender),
										className: `px-4 py-2 label-xs font-mono tracking-widest transition-colors duration-200 ${activeWall === gender ? "bg-hc-text text-hc-bg" : "text-hc-muted hover:text-hc-text"}`,
										children: gender
									}, gender))
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/drop",
									className: "label-xs hover:text-hc-bronze transition-colors",
									children: "VIEW ALL →"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "product-grid",
							children: featured.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductCard, { product: p }, p.id))
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "border-b border-hc-border",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "page-container grid grid-cols-2 md:grid-cols-4",
					children: [
						{
							k: "420",
							l: "GSM HEAVYWEIGHT"
						},
						{
							k: "01",
							l: "PRODUCTION RUN"
						},
						{
							k: "00",
							l: "RESTOCKS EVER"
						},
						{
							k: "26",
							l: "CULT NUMBER"
						}
					].map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
						initial: {
							opacity: 0,
							y: 20
						},
						whileInView: {
							opacity: 1,
							y: 0
						},
						viewport: { once: true },
						transition: {
							duration: .5,
							delay: i * .08
						},
						className: "py-12 px-4 md:px-8 border-l border-hc-border first:border-l-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mb-3 uppercase",
							style: {
								fontFamily: "'Archivo Black', sans-serif",
								fontSize: "clamp(2rem, 4vw, 3rem)",
								letterSpacing: "-0.03em"
							},
							children: s.k
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "label-xs text-hc-muted",
							children: s.l
						})]
					}, s.l))
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "relative py-32 text-center overflow-hidden",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "absolute inset-0 pointer-events-none",
					style: { background: "radial-gradient(circle at center, rgba(166,124,82,0.18) 0%, transparent 60%)" }
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative z-10 page-container",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.h2, {
						initial: {
							opacity: 0,
							y: 40
						},
						whileInView: {
							opacity: 1,
							y: 0
						},
						viewport: { once: true },
						transition: { duration: .9 },
						className: "uppercase mb-12",
						style: {
							fontFamily: "'Archivo Black', sans-serif",
							fontSize: "clamp(4rem, 14vw, 14rem)",
							lineHeight: .85,
							letterSpacing: "-0.05em"
						},
						children: [
							"DROP",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								style: {
									color: "transparent",
									WebkitTextStroke: "2px var(--hc-bronze)"
								},
								children: "026"
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/drop",
						className: "cta cta-primary",
						children: "SECURE YOUR PIECE"
					})]
				})]
			})
		]
	});
}
//#endregion
export { Home as component };
