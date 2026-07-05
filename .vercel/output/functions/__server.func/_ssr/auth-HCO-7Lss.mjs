import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { F as useNavigate, I as useRouter, g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { t as motion } from "../_libs/motion.mjs";
import { t as supabase } from "./client-DDfIBccA.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as Route } from "./auth-B8ERajRy.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/auth-HCO-7Lss.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AuthPage() {
	const navigate = useNavigate();
	const router = useRouter();
	const { redirect } = Route.useSearch();
	const dest = redirect && redirect.startsWith("/") ? redirect : "/account";
	const [mode, setMode] = (0, import_react.useState)("signin");
	const [email, setEmail] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [name, setName] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [googleBusy, setGoogleBusy] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		supabase.auth.getSession().then(({ data }) => {
			if (data.session) navigate({ to: dest });
		});
	}, [navigate, dest]);
	async function submit(e) {
		e.preventDefault();
		setBusy(true);
		try {
			if (mode === "signin") {
				const { error } = await supabase.auth.signInWithPassword({
					email,
					password
				});
				if (error) throw error;
				toast.success("WELCOME BACK");
			} else {
				const { error } = await supabase.auth.signUp({
					email,
					password,
					options: {
						emailRedirectTo: `${window.location.origin}${dest}`,
						data: { full_name: name }
					}
				});
				if (error) throw error;
				toast.success("ACCOUNT CREATED");
			}
			router.invalidate();
			navigate({ to: dest });
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "AUTH FAILED");
		} finally {
			setBusy(false);
		}
	}
	async function withGoogle() {
		setGoogleBusy(true);
		try {
			const { error } = await supabase.auth.signInWithOAuth({
				provider: "google",
				options: { redirectTo: `${window.location.origin}/auth` }
			});
			if (error) throw error;
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "GOOGLE SIGN-IN FAILED");
			setGoogleBusy(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "min-h-screen flex items-center justify-center pt-24 pb-12 px-6 relative overflow-hidden",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "absolute inset-0 pointer-events-none opacity-[0.04]",
			style: {
				backgroundImage: "linear-gradient(var(--hc-text) 1px, transparent 1px), linear-gradient(90deg, var(--hc-text) 1px, transparent 1px)",
				backgroundSize: "60px 60px"
			}
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
			initial: {
				opacity: 0,
				y: 16
			},
			animate: {
				opacity: 1,
				y: 0
			},
			transition: { duration: .5 },
			className: "w-full max-w-md border border-hc-border bg-hc-surface p-8 sm:p-10 relative",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "absolute -top-3 left-6 bg-hc-bg px-2 section-num",
					children: "/ ACCESS · 026"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "display-md mb-2",
					children: mode === "signin" ? "ENTER THE CULT" : "JOIN THE CULT"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "meta text-hc-muted mb-8",
					children: mode === "signin" ? "Sign in to continue." : "Create your account in seconds."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: withGoogle,
					disabled: googleBusy,
					className: "w-full border border-hc-border bg-hc-bg hover:bg-hc-text hover:text-hc-bg transition-colors py-3 flex items-center justify-center gap-3 label-xs",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GoogleGlyph, {}), googleBusy ? "..." : "CONTINUE WITH GOOGLE"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3 my-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "flex-1 h-px bg-hc-border" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "label-xs text-hc-muted",
							children: "OR"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "flex-1 h-px bg-hc-border" })
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: submit,
					className: "space-y-6",
					children: [
						mode === "signup" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							className: "form-input",
							type: "text",
							placeholder: "FULL NAME",
							value: name,
							onChange: (e) => setName(e.target.value)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							className: "form-input",
							type: "email",
							placeholder: "EMAIL",
							required: true,
							value: email,
							onChange: (e) => setEmail(e.target.value)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							className: "form-input",
							type: "password",
							placeholder: "PASSWORD",
							required: true,
							minLength: 6,
							value: password,
							onChange: (e) => setPassword(e.target.value)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "submit",
							disabled: busy,
							className: "cta cta-primary w-full",
							children: busy ? "..." : mode === "signin" ? "ENTER" : "CREATE ACCOUNT"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => setMode((m) => m === "signin" ? "signup" : "signin"),
					className: "mt-6 label-xs text-hc-muted hover:text-hc-text w-full text-center",
					children: mode === "signin" ? "NEW HERE? CREATE AN ACCOUNT →" : "← BACK TO SIGN IN"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-8 text-center",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "label-xs text-hc-muted hover:text-hc-text",
						children: "← RETURN TO STOREFRONT"
					})
				})
			]
		})]
	});
}
function GoogleGlyph() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		width: "14",
		height: "14",
		viewBox: "0 0 24 24",
		"aria-hidden": true,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				fill: "#4285F4",
				d: "M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				fill: "#34A853",
				d: "M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.99.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23z"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				fill: "#FBBC05",
				d: "M5.84 14.1A6.6 6.6 0 0 1 5.5 12c0-.73.13-1.44.34-2.1V7.07H2.18A11 11 0 0 0 1 12c0 1.77.42 3.45 1.18 4.93l3.66-2.83z"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				fill: "#EA4335",
				d: "M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.83C6.71 7.31 9.14 5.38 12 5.38z"
			})
		]
	});
}
//#endregion
export { AuthPage as component };
