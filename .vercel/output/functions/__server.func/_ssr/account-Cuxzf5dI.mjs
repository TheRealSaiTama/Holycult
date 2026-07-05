import { F as useNavigate, f as Outlet, g as Link, l as useRouterState } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { t as ACCOUNT_NAV } from "./site-DdWOgeii.mjs";
import { t as supabase } from "./client-DDfIBccA.mjs";
import { o as useQueryClient } from "../_libs/tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { f as LogOut } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/account-Cuxzf5dI.js
var import_jsx_runtime = require_jsx_runtime();
function AccountLayout() {
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const navigate = useNavigate();
	const qc = useQueryClient();
	async function signOut() {
		await qc.cancelQueries();
		qc.clear();
		await supabase.auth.signOut();
		toast.success("SIGNED OUT");
		navigate({
			to: "/",
			replace: true
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "pt-24 pb-20 page-container min-h-screen",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-10",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "section-num mb-2",
				children: "/ ACCOUNT · 026"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "display-lg",
				children: "YOUR CULT"
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid grid-cols-1 md:grid-cols-[200px_1fr] gap-8 md:gap-12",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("aside", {
				className: "md:border-r md:border-hc-border md:pr-8",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
					className: "flex md:flex-col gap-1 overflow-x-auto",
					children: [ACCOUNT_NAV.map((l) => {
						const active = l.to === "/account" ? pathname === l.to : pathname.startsWith(l.to);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: l.to,
							className: `px-3 py-2.5 label-xs border-l-2 transition-colors whitespace-nowrap ${active ? "border-hc-neon text-hc-text bg-hc-surface" : "border-transparent text-hc-muted hover:text-hc-text"}`,
							children: l.label
						}, l.to);
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: signOut,
						className: "px-3 py-2.5 label-xs text-hc-muted hover:text-hc-danger text-left flex items-center gap-2 mt-2 md:mt-8 border-l-2 border-transparent",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { size: 12 }), " SIGN OUT"]
					})]
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "min-w-0",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})
			})]
		})]
	});
}
//#endregion
export { AccountLayout as component };
