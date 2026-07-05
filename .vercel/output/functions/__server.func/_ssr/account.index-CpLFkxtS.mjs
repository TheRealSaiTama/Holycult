import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { i as useQuery, o as useQueryClient, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as useServerFn } from "./useServerFn-CrZF2pjq.mjs";
import { a as updateMyProfile, n as getMyProfile } from "./account.functions-CpEEcHKd.mjs";
import { o as myProfileQuery } from "./queries-7cnJYuKS.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/account.index-CpLFkxtS.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ProfilePage() {
	const fetchProfile = useServerFn(getMyProfile);
	const updateFn = useServerFn(updateMyProfile);
	const qc = useQueryClient();
	const { data: profile } = useQuery({
		...myProfileQuery(),
		queryFn: () => fetchProfile()
	});
	const [displayName, setDisplayName] = (0, import_react.useState)("");
	const [phone, setPhone] = (0, import_react.useState)("");
	const [avatarUrl, setAvatarUrl] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		if (profile) {
			setDisplayName(profile.display_name ?? "");
			setPhone(profile.phone ?? "");
			setAvatarUrl(profile.avatar_url ?? "");
		}
	}, [profile]);
	const save = useMutation({
		mutationFn: () => updateFn({ data: {
			display_name: displayName,
			phone,
			avatar_url: avatarUrl
		} }),
		onSuccess: () => {
			toast.success("PROFILE UPDATED");
			qc.invalidateQueries({ queryKey: ["account", "profile"] });
		},
		onError: (e) => toast.error(e.message)
	});
	const initial = (displayName || "?").charAt(0).toUpperCase();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-8 max-w-xl",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "section-num mb-1",
				children: "/ 01 — IDENTITY"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "display-md",
				children: "PROFILE"
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-5",
				children: [avatarUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: avatarUrl,
					alt: "",
					className: "w-20 h-20 object-cover bg-hc-surface border border-hc-border"
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "w-20 h-20 bg-hc-text text-hc-bg flex items-center justify-center text-3xl",
					style: { fontFamily: "'Archivo Black', sans-serif" },
					children: initial
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "font-bold text-lg",
					children: displayName || "—"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "meta text-hc-muted",
					children: ["Member · #", (profile?.id ?? "").slice(0, 6).toUpperCase()]
				})] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: (e) => {
					e.preventDefault();
					save.mutate();
				},
				className: "space-y-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "label-xs text-hc-muted block mb-2",
						children: "DISPLAY NAME"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						className: "form-input",
						value: displayName,
						onChange: (e) => setDisplayName(e.target.value),
						maxLength: 80
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "label-xs text-hc-muted block mb-2",
						children: "PHONE"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						className: "form-input",
						value: phone,
						onChange: (e) => setPhone(e.target.value),
						maxLength: 40
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "label-xs text-hc-muted block mb-2",
						children: "AVATAR URL"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						className: "form-input",
						value: avatarUrl,
						onChange: (e) => setAvatarUrl(e.target.value),
						placeholder: "https://…",
						maxLength: 500
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "submit",
						disabled: save.isPending,
						className: "cta cta-primary",
						children: save.isPending ? "SAVING…" : "SAVE CHANGES"
					})
				]
			})
		]
	});
}
//#endregion
export { ProfilePage as component };
