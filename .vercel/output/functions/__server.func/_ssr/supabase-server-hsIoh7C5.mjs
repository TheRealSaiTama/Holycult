import { t as createClient } from "../_libs/supabase__supabase-js.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/supabase-server-hsIoh7C5.js
function createPublishableServerClient() {
	const url = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL || "https://ocvjvwaleotpogyiwshb.supabase.co";
	const key = process.env.SUPABASE_PUBLISHABLE_KEY || process.env.VITE_SUPABASE_PUBLISHABLE_KEY || "sb_publishable_HH7Q3gJdJRJfqkXhzrNywg_-p9E8y-F";
	if (!url || !key) {
		const missing = [...!url ? ["SUPABASE_URL or VITE_SUPABASE_URL"] : [], ...!key ? ["SUPABASE_PUBLISHABLE_KEY or VITE_SUPABASE_PUBLISHABLE_KEY"] : []];
		throw new Error(`Missing Supabase environment variable(s): ${missing.join(", ")}`);
	}
	return createClient(url, key, { auth: {
		storage: void 0,
		persistSession: false,
		autoRefreshToken: false
	} });
}
//#endregion
export { createPublishableServerClient as t };
