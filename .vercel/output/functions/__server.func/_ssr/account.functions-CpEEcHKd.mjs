import { l as createServerFn } from "./esm-Dova13aH.mjs";
import { t as createSsrRpc } from "./createSsrRpc-C-VrtN-k.mjs";
import { t as requireSupabaseAuth } from "./auth-middleware-Bv5cWBD8.mjs";
import { a as objectType, n as booleanType, o as stringType } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/account.functions-CpEEcHKd.js
var getMyProfile = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).handler(createSsrRpc("7137c45c66e2762097026ceecb6dd952f95d83288f96d03621061209a6008b8a"));
var profileSchema = objectType({
	display_name: stringType().trim().max(80).nullable().optional(),
	avatar_url: stringType().trim().max(500).nullable().optional(),
	phone: stringType().trim().max(40).nullable().optional()
});
var updateMyProfile = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((i) => profileSchema.parse(i)).handler(createSsrRpc("a9a93b35b4fca3d47286ae52b9b8e588b5785c8c5eb7ec53518c1d73941bb2b9"));
var listMyAddresses = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).handler(createSsrRpc("36156f957255edf85097a9039385b2833c0df4f37e3a900c5f03f62866aaaf59"));
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
var upsertMyAddress = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((i) => addressSchema.parse(i)).handler(createSsrRpc("2bb568d46783859680b9440e3d1197c4d02b927dbcb1c7b95b02d8b0e1b4dda6"));
var deleteMyAddress = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((i) => objectType({ id: stringType().uuid() }).parse(i)).handler(createSsrRpc("046d28e315bffa3521177507137e3d8b9b8ecef004f94b0e179b20c8ee7b46ff"));
var listMyOrders = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).handler(createSsrRpc("84ec78f1e78877e1e554f4e54eedb484f3b2f7d654ae30043f0b9621a1920045"));
//#endregion
export { updateMyProfile as a, listMyOrders as i, getMyProfile as n, upsertMyAddress as o, listMyAddresses as r, deleteMyAddress as t };
