import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { t as supabase } from "./client-DDfIBccA.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/use-auth-user-DOTs8fqw.js
var import_react = /* @__PURE__ */ __toESM(require_react());
function useAuthUser() {
	const [user, setUser] = (0, import_react.useState)(null);
	const [loading, setLoading] = (0, import_react.useState)(true);
	(0, import_react.useEffect)(() => {
		let mounted = true;
		supabase.auth.getUser().then(({ data }) => {
			if (!mounted) return;
			setUser(data.user ?? null);
			setLoading(false);
		});
		const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
			if (!mounted) return;
			setUser(session?.user ?? null);
		});
		return () => {
			mounted = false;
			sub.subscription.unsubscribe();
		};
	}, []);
	return {
		user,
		loading
	};
}
//#endregion
export { useAuthUser as t };
