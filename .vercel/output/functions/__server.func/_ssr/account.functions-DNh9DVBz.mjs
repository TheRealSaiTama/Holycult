import { l as createServerFn } from "./esm-Dova13aH.mjs";
import { t as requireSupabaseAuth } from "./auth-middleware-Bv5cWBD8.mjs";
import { a as objectType, n as booleanType, o as stringType } from "../_libs/zod.mjs";
import { t as createServerRpc } from "./createServerRpc-WJgk8O8C.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/account.functions-DNh9DVBz.js
var getMyProfile_createServerFn_handler = createServerRpc({
	id: "7137c45c66e2762097026ceecb6dd952f95d83288f96d03621061209a6008b8a",
	name: "getMyProfile",
	filename: "src/lib/account.functions.ts"
}, (opts) => getMyProfile.__executeServer(opts));
var getMyProfile = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).handler(getMyProfile_createServerFn_handler, async ({ context }) => {
	const { data, error } = await context.supabase.from("profiles").select("id, display_name, avatar_url, phone, created_at").eq("id", context.userId).maybeSingle();
	if (error) throw new Error(error.message);
	return data;
});
var profileSchema = objectType({
	display_name: stringType().trim().max(80).nullable().optional(),
	avatar_url: stringType().trim().max(500).nullable().optional(),
	phone: stringType().trim().max(40).nullable().optional()
});
var updateMyProfile_createServerFn_handler = createServerRpc({
	id: "a9a93b35b4fca3d47286ae52b9b8e588b5785c8c5eb7ec53518c1d73941bb2b9",
	name: "updateMyProfile",
	filename: "src/lib/account.functions.ts"
}, (opts) => updateMyProfile.__executeServer(opts));
var updateMyProfile = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((i) => profileSchema.parse(i)).handler(updateMyProfile_createServerFn_handler, async ({ data, context }) => {
	const { error } = await context.supabase.from("profiles").upsert({
		id: context.userId,
		...data
	}, { onConflict: "id" });
	if (error) throw new Error(error.message);
	return { ok: true };
});
var listMyAddresses_createServerFn_handler = createServerRpc({
	id: "36156f957255edf85097a9039385b2833c0df4f37e3a900c5f03f62866aaaf59",
	name: "listMyAddresses",
	filename: "src/lib/account.functions.ts"
}, (opts) => listMyAddresses.__executeServer(opts));
var listMyAddresses = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).handler(listMyAddresses_createServerFn_handler, async ({ context }) => {
	const { data, error } = await context.supabase.from("addresses").select("id, label, name, phone, address, city, postal, country, is_default, created_at").order("is_default", { ascending: false }).order("created_at", { ascending: false });
	if (error) throw new Error(error.message);
	return data ?? [];
});
var addressSchema = objectType({
	id: stringType().uuid().optional(),
	label: stringType().trim().max(40).nullable().optional(),
	name: stringType().trim().min(2).max(120),
	phone: stringType().trim().max(40).nullable().optional(),
	address: stringType().trim().min(4).max(240),
	city: stringType().trim().min(1).max(120),
	postal: stringType().trim().min(1).max(40),
	country: stringType().trim().min(2).max(60),
	is_default: booleanType().optional()
});
var upsertMyAddress_createServerFn_handler = createServerRpc({
	id: "2bb568d46783859680b9440e3d1197c4d02b927dbcb1c7b95b02d8b0e1b4dda6",
	name: "upsertMyAddress",
	filename: "src/lib/account.functions.ts"
}, (opts) => upsertMyAddress.__executeServer(opts));
var upsertMyAddress = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((i) => addressSchema.parse(i)).handler(upsertMyAddress_createServerFn_handler, async ({ data, context }) => {
	const { id, is_default, ...rest } = data;
	if (is_default) await context.supabase.from("addresses").update({ is_default: false }).eq("user_id", context.userId);
	const payload = {
		...rest,
		is_default: !!is_default,
		user_id: context.userId
	};
	const { data: saved, error } = id ? await context.supabase.from("addresses").update(payload).eq("id", id).eq("user_id", context.userId).select("id").single() : await context.supabase.from("addresses").insert(payload).select("id").single();
	if (error || !saved) throw new Error(error?.message ?? "Save failed");
	return { id: saved.id };
});
var deleteMyAddress_createServerFn_handler = createServerRpc({
	id: "046d28e315bffa3521177507137e3d8b9b8ecef004f94b0e179b20c8ee7b46ff",
	name: "deleteMyAddress",
	filename: "src/lib/account.functions.ts"
}, (opts) => deleteMyAddress.__executeServer(opts));
var deleteMyAddress = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((i) => objectType({ id: stringType().uuid() }).parse(i)).handler(deleteMyAddress_createServerFn_handler, async ({ data, context }) => {
	const { error } = await context.supabase.from("addresses").delete().eq("id", data.id).eq("user_id", context.userId);
	if (error) throw new Error(error.message);
	return { ok: true };
});
var listMyOrders_createServerFn_handler = createServerRpc({
	id: "84ec78f1e78877e1e554f4e54eedb484f3b2f7d654ae30043f0b9621a1920045",
	name: "listMyOrders",
	filename: "src/lib/account.functions.ts"
}, (opts) => listMyOrders.__executeServer(opts));
var listMyOrders = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).handler(listMyOrders_createServerFn_handler, async ({ context }) => {
	const { data, error } = await context.supabase.from("orders").select("id, ref_code, total_cents, currency, status, payment_status, created_at, order_items(qty, product_name, size_label)").eq("user_id", context.userId).order("created_at", { ascending: false }).limit(50);
	if (error) throw new Error(error.message);
	return data ?? [];
});
//#endregion
export { deleteMyAddress_createServerFn_handler, getMyProfile_createServerFn_handler, listMyAddresses_createServerFn_handler, listMyOrders_createServerFn_handler, updateMyProfile_createServerFn_handler, upsertMyAddress_createServerFn_handler };
