import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { F as useNavigate, g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { i as AnimatePresence } from "../_libs/framer-motion.mjs";
import { t as motion } from "../_libs/motion.mjs";
import { i as SHIPPING_FLAT_CENTS, o as formatPriceShort } from "./site-DdWOgeii.mjs";
import { i as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as useServerFn } from "./useServerFn-CrZF2pjq.mjs";
import { l as createServerFn } from "./esm-Dova13aH.mjs";
import { t as createSsrRpc } from "./createSsrRpc-_t2hXfty.mjs";
import { a as objectType, i as numberType, o as stringType, t as arrayType } from "../_libs/zod.mjs";
import { r as listMyAddresses } from "./account.functions-DDbr4uhZ.mjs";
import { n as useCart, t as cartSelectors } from "./store-BOQEfw_w.mjs";
import { t as useAuthUser } from "./use-auth-user-DOTs8fqw.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/checkout.index-B0sMmtuQ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
createServerFn({ method: "GET" }).handler(createSsrRpc("8021b06e43030dd8809c4eae6e5f48603276a689f66cb131d259ebe736a5dc56"));
var shippingSchema = objectType({
	name: stringType().trim().min(2).max(120),
	phone: stringType().trim().max(40).optional().nullable(),
	address: stringType().trim().min(4).max(240),
	city: stringType().trim().min(1).max(120),
	postal: stringType().trim().min(1).max(40),
	country: stringType().trim().min(2).max(60)
});
var lineSchema = objectType({
	productId: stringType().uuid(),
	sizeLabel: stringType().min(1).max(12),
	qty: numberType().int().positive().max(10)
});
var initSchema = objectType({
	email: stringType().email().max(255),
	shipping: shippingSchema,
	lines: arrayType(lineSchema).min(1).max(20),
	userId: stringType().uuid().optional().nullable()
});
var initRazorpayCheckout = createServerFn({ method: "POST" }).inputValidator((i) => initSchema.parse(i)).handler(createSsrRpc("e1560354334364e68896556f3b50366b649b8fac3942074b6a17138c4dc487a4"));
var verifySchema = objectType({
	orderId: stringType().uuid(),
	razorpay_order_id: stringType().min(4),
	razorpay_payment_id: stringType().min(4),
	razorpay_signature: stringType().min(4)
});
var verifyRazorpayPayment = createServerFn({ method: "POST" }).inputValidator((i) => verifySchema.parse(i)).handler(createSsrRpc("5e2c6a85ce8b9f3a92cd9b0a9b4d8f015d9ec2fa0b30eb31f8605ecef9f67199"));
var formSchema = objectType({
	email: stringType().trim().email("INVALID EMAIL"),
	name: stringType().trim().min(2, "NAME REQUIRED").max(120),
	phone: stringType().trim().min(6, "PHONE REQUIRED").max(40),
	address: stringType().trim().min(4, "ADDRESS REQUIRED").max(240),
	city: stringType().trim().min(1, "CITY REQUIRED").max(120),
	postal: stringType().trim().min(1, "POSTAL REQUIRED").max(40),
	country: stringType().trim().min(2, "COUNTRY REQUIRED").max(60)
});
function loadRazorpay() {
	return new Promise((resolve) => {
		if (typeof window === "undefined") return resolve(false);
		if (window.Razorpay) return resolve(true);
		const s = document.createElement("script");
		s.src = "https://checkout.razorpay.com/v1/checkout.js";
		s.onload = () => resolve(true);
		s.onerror = () => resolve(false);
		document.body.appendChild(s);
	});
}
function CheckoutPage() {
	const lines = useCart((s) => s.lines);
	const subtotal = useCart(cartSelectors.subtotalCents);
	const clearCart = useCart((s) => s.clear);
	const navigate = useNavigate();
	const { user } = useAuthUser();
	const initFn = useServerFn(initRazorpayCheckout);
	const verifyFn = useServerFn(verifyRazorpayPayment);
	const addressesFn = useServerFn(listMyAddresses);
	const currency = lines[0]?.currency ?? "INR";
	const { data: savedAddresses = [] } = useQuery({
		queryKey: ["account", "addresses"],
		queryFn: () => addressesFn(),
		enabled: !!user
	});
	const [values, setValues] = (0, import_react.useState)({
		email: "",
		name: "",
		phone: "",
		address: "",
		city: "",
		postal: "",
		country: "India"
	});
	const [errors, setErrors] = (0, import_react.useState)({});
	const [selectedAddressId, setSelectedAddressId] = (0, import_react.useState)("new");
	const [processing, setProcessing] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (user?.email && !values.email) setValues((v) => ({
			...v,
			email: user.email
		}));
	}, [user, values.email]);
	(0, import_react.useEffect)(() => {
		if (!savedAddresses.length) return;
		const def = savedAddresses.find((a) => a.is_default) ?? savedAddresses[0];
		if (def && selectedAddressId === "new") {
			setSelectedAddressId(def.id);
			setValues((v) => ({
				...v,
				name: def.name,
				phone: def.phone ?? "",
				address: def.address,
				city: def.city,
				postal: def.postal,
				country: def.country
			}));
		}
	}, [savedAddresses.length]);
	function pickAddress(id) {
		setSelectedAddressId(id);
		if (id === "new") {
			setValues((v) => ({
				...v,
				name: "",
				phone: "",
				address: "",
				city: "",
				postal: "",
				country: "India"
			}));
			return;
		}
		const a = savedAddresses.find((x) => x.id === id);
		if (a) setValues((v) => ({
			...v,
			name: a.name,
			phone: a.phone ?? "",
			address: a.address,
			city: a.city,
			postal: a.postal,
			country: a.country
		}));
	}
	const shipping = lines.length ? SHIPPING_FLAT_CENTS : 0;
	const total = subtotal + shipping;
	const pay = useMutation({
		mutationFn: async (data) => {
			const init = await initFn({ data: {
				email: data.email,
				userId: user?.id ?? null,
				shipping: {
					name: data.name,
					phone: data.phone,
					address: data.address,
					city: data.city,
					postal: data.postal,
					country: data.country
				},
				lines: lines.map((l) => ({
					productId: l.productId,
					sizeLabel: l.sizeLabel,
					qty: l.qty
				}))
			} });
			if (!await loadRazorpay() || !window.Razorpay) throw new Error("Could not load Razorpay");
			return await new Promise((resolve, reject) => {
				new window.Razorpay({
					key: init.keyId,
					amount: init.amount,
					currency: init.currency,
					name: "HOLYCULT",
					description: `Order ${init.refCode}`,
					order_id: init.razorpayOrderId,
					prefill: {
						name: data.name,
						email: data.email,
						contact: data.phone
					},
					theme: { color: "#1C1A18" },
					handler: async (resp) => {
						try {
							await verifyFn({ data: {
								orderId: init.orderId,
								razorpay_order_id: resp.razorpay_order_id,
								razorpay_payment_id: resp.razorpay_payment_id,
								razorpay_signature: resp.razorpay_signature
							} });
							resolve({ orderId: init.orderId });
						} catch (err) {
							reject(err);
						}
					},
					modal: { ondismiss: () => reject(/* @__PURE__ */ new Error("Payment cancelled")) }
				}).open();
			});
		},
		onMutate: () => setProcessing(true),
		onSuccess: ({ orderId }) => {
			clearCart();
			navigate({
				to: "/receipt/$orderId",
				params: { orderId }
			});
		},
		onError: (err) => {
			toast.error(err.message);
			setProcessing(false);
		},
		onSettled: () => setProcessing(false)
	});
	function submit(e) {
		e.preventDefault();
		const result = formSchema.safeParse(values);
		if (!result.success) {
			const flat = {};
			for (const issue of result.error.issues) flat[issue.path[0]] = issue.message;
			setErrors(flat);
			const first = Object.values(flat)[0];
			if (first) toast.error(first);
			return;
		}
		setErrors({});
		pay.mutate(result.data);
	}
	const bind = (k) => ({
		value: values[k],
		onChange: (e) => setValues((v) => ({
			...v,
			[k]: e.target.value
		}))
	});
	const stockOk = (0, import_react.useMemo)(() => lines.every((l) => l.qty > 0), [lines]);
	if (lines.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "pt-28 pb-24 page-container text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "section-num mb-4",
				children: "/ 05 — CHECKOUT"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-6xl text-hc-bronze/40 mb-4",
				children: "☩"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "display-md mb-4",
				children: "YOUR CART IS EMPTY."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/drop",
				className: "cta cta-primary",
				children: "ENTER THE DROP"
			})
		]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "pt-28 pb-24 page-container no-print",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-10 flex items-end justify-between gap-4 flex-wrap",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "section-num mb-2",
					children: "/ 05 — SECURE"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "display-md",
					children: "CHECKOUT"
				})] }), !user && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/auth",
					search: { redirect: "/checkout" },
					className: "label-xs text-hc-muted hover:text-hc-text",
					children: "HAVE AN ACCOUNT? SIGN IN →"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-start",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: submit,
					className: "space-y-10",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
							className: "space-y-6",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "label-xs text-hc-muted",
								children: "IDENTIFICATION"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								placeholder: "EMAIL ADDRESS",
								type: "email",
								...bind("email"),
								error: errors.email
							})]
						}),
						user && savedAddresses.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
							className: "space-y-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "label-xs text-hc-muted",
								children: "SAVED ADDRESSES"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-1 sm:grid-cols-2 gap-3",
								children: [savedAddresses.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: () => pickAddress(a.id),
									className: `text-left p-3 border transition-all ${selectedAddressId === a.id ? "border-hc-text bg-hc-text/[0.04]" : "border-hc-border hover:border-hc-text"}`,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "label-xs mb-1 flex items-center gap-2",
										children: [
											a.label || "ADDRESS",
											" ",
											a.is_default && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "bg-hc-neon px-1 text-[9px]",
												children: "DEFAULT"
											})
										]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "meta text-hc-muted leading-snug",
										children: [
											a.name,
											", ",
											a.city,
											", ",
											a.postal
										]
									})]
								}, a.id)), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: () => pickAddress("new"),
									className: `text-left p-3 border-dashed border transition-all ${selectedAddressId === "new" ? "border-hc-text bg-hc-text/[0.04]" : "border-hc-border hover:border-hc-text"}`,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "label-xs mb-1",
										children: "＋ USE NEW"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "meta text-hc-muted",
										children: "Enter a different shipping address."
									})]
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
							className: "space-y-6",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "label-xs text-hc-muted",
									children: "SHIPPING"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									placeholder: "FULL NAME",
									...bind("name"),
									error: errors.name
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									placeholder: "PHONE",
									...bind("phone"),
									error: errors.phone
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									placeholder: "STREET ADDRESS",
									...bind("address"),
									error: errors.address
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid grid-cols-2 gap-6",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
										placeholder: "CITY",
										...bind("city"),
										error: errors.city
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
										placeholder: "POSTAL",
										...bind("postal"),
										error: errors.postal
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									placeholder: "COUNTRY",
									...bind("country"),
									error: errors.country
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "submit",
							disabled: processing || !stockOk,
							className: "cta cta-neon w-full",
							children: processing ? "OPENING PAYMENT…" : `PAY — ${formatPriceShort(total, currency)}`
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-center gap-2 meta text-hc-muted",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "inline-block w-1.5 h-1.5 bg-hc-neon rounded-full" }), "SECURED BY RAZORPAY · UPI · CARDS · NETBANKING · WALLETS"]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
					className: "md:sticky md:top-24 border border-hc-border p-6 space-y-5 bg-hc-surface",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "label-xs text-hc-muted",
								children: [
									"ORDER · ",
									lines.length,
									" ITEM",
									lines.length !== 1 ? "S" : ""
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-hc-bronze",
								children: "☩"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "space-y-4",
							children: lines.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
								layout: true,
								className: "flex gap-3 items-center",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										src: l.productImage,
										alt: l.productName,
										className: "w-14 h-16 object-cover bg-hc-bg shrink-0"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex-1 min-w-0",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-sm font-bold truncate",
											children: l.productName
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "meta text-hc-muted",
											children: [
												"SIZE ",
												l.sizeLabel,
												" · QTY ",
												l.qty
											]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "font-mono text-sm tabular-nums",
										children: formatPriceShort(l.unitPriceCents * l.qty, currency)
									})
								]
							}, `${l.productId}-${l.sizeLabel}`))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "rule" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2 font-mono text-xs",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-hc-muted",
										children: "SUBTOTAL"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: formatPriceShort(subtotal, currency) })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-hc-muted",
										children: "SHIPPING"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: formatPriceShort(shipping, currency) })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "rule my-2" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between text-sm font-bold",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "TOTAL" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: formatPriceShort(total, currency) })]
								})
							]
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: processing && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
				initial: { opacity: 0 },
				animate: { opacity: 1 },
				exit: { opacity: 0 },
				className: "fixed inset-0 bg-hc-bg/85 backdrop-blur-md z-[200] flex items-center justify-center p-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "max-w-sm w-full text-center space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
							animate: { rotate: 360 },
							transition: {
								duration: 4,
								repeat: Infinity,
								ease: "linear"
							},
							className: "text-7xl text-hc-bronze",
							children: "☩"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "section-num",
							children: "OPENING SECURE PAYMENT"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "meta text-hc-muted",
							children: "Do not close this window."
						})
					]
				})
			}) })
		]
	});
}
function Field({ placeholder, type = "text", value, onChange, error }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		className: "form-input",
		placeholder,
		type,
		value,
		onChange
	}), error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "text-[10px] text-hc-danger mt-1 font-bold",
		children: error
	})] });
}
//#endregion
export { CheckoutPage as component };
