import { F as useNavigate, f as Outlet, g as Link, l as useRouterState } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { t as supabase } from "./client-DDfIBccA.mjs";
import { i as useQuery, o as useQueryClient } from "../_libs/tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { f as LogOut } from "../_libs/lucide-react.mjs";
import { t as useServerFn } from "./useServerFn-CrZF2pjq.mjs";
import { t as adminCheckRole } from "./admin.functions-BLBuRbc3.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin-BR8kt2Ch.js
var import_jsx_runtime = require_jsx_runtime();
var ADMIN_NAV = [
	{
		to: "/admin",
		label: "DASHBOARD",
		exact: true
	},
	{
		to: "/admin/products",
		label: "PRODUCTS"
	},
	{
		to: "/admin/lookbook",
		label: "LOOKBOOK"
	},
	{
		to: "/admin/size-charts",
		label: "SIZE CHARTS"
	},
	{
		to: "/admin/orders",
		label: "ORDERS"
	}
];
function AdminShell({ children }) {
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	async function signOut() {
		await queryClient.cancelQueries();
		queryClient.clear();
		await supabase.auth.signOut();
		toast.success("SIGNED OUT");
		navigate({
			to: "/auth",
			replace: true
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "pt-20 min-h-screen flex flex-col md:flex-row",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
			className: "md:w-60 md:min-h-screen border-b md:border-b-0 md:border-r border-hc-border bg-hc-surface/40",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "p-6 border-b border-hc-border",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "section-num mb-1",
					children: "/ ADMIN"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "display-md leading-none",
					children: "CMS"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
				className: "flex md:flex-col overflow-x-auto md:overflow-visible",
				children: [ADMIN_NAV.map((item) => {
					const active = item.exact ? pathname === item.to : pathname.startsWith(item.to);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: item.to,
						className: `px-6 py-4 label-xs border-b border-hc-border whitespace-nowrap transition-colors ${active ? "bg-hc-text text-hc-bg" : "hover:bg-hc-surface"}`,
						children: item.label
					}, item.to);
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: signOut,
					className: "px-6 py-4 label-xs hover:bg-hc-surface text-left flex items-center gap-2 mt-auto md:mt-12 text-hc-muted hover:text-hc-danger",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { size: 12 }), " SIGN OUT"]
				})]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
			className: "flex-1 p-6 md:p-10 min-w-0",
			children
		})]
	});
}
function AdminLayout() {
	const check = useServerFn(adminCheckRole);
	const { data, isLoading, error } = useQuery({
		queryKey: ["admin", "role"],
		queryFn: () => check(),
		retry: false
	});
	if (isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "pt-32 page-container",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "label-xs text-hc-muted",
			children: "VERIFYING ACCESS…"
		})
	});
	if (error || !data?.isAdmin) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "pt-32 page-container max-w-md",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "section-num mb-4",
				children: "/ 403"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "display-md mb-3",
				children: "NOT ADMIN."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-hc-muted meta mb-8",
				children: [
					"Your account is signed in but doesn't have admin access. Ask an existing admin to grant you the",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
						className: "font-mono",
						children: " admin "
					}),
					" role."
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/",
				className: "cta cta-primary",
				children: "RETURN"
			})
		]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) });
}
//#endregion
export { AdminLayout as component };
