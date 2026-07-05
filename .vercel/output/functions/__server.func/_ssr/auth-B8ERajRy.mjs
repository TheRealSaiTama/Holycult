import { m as createFileRoute, p as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as objectType, o as stringType } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/auth-B8ERajRy.js
var $$splitComponentImporter = () => import("./auth-HCO-7Lss.mjs");
var searchSchema = objectType({ redirect: stringType().optional() });
var Route = createFileRoute("/auth")({
	validateSearch: searchSchema,
	head: () => ({ meta: [{ title: "Sign In — HOLYCULT" }, {
		name: "robots",
		content: "noindex"
	}] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
