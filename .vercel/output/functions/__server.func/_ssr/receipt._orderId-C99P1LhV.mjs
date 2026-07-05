import { m as createFileRoute, p as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
import { s as orderQuery } from "./queries-7cnJYuKS.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/receipt._orderId-C99P1LhV.js
var $$splitComponentImporter = () => import("./receipt._orderId-DOzh7Qkm.mjs");
var $$splitNotFoundComponentImporter = () => import("./receipt._orderId-Bza_yh6D.mjs");
var $$splitErrorComponentImporter = () => import("./receipt._orderId-BO0mi_AT.mjs");
var Route = createFileRoute("/receipt/$orderId")({
	head: ({ params }) => ({
		meta: [
			{ title: `Order ${params.orderId.slice(0, 8)} — HOLYCULT` },
			{
				name: "description",
				content: "Acquisition document. Committed. No restocks. Ever."
			},
			{
				property: "og:url",
				content: `/receipt/${params.orderId}`
			},
			{
				name: "robots",
				content: "noindex"
			}
		],
		links: [{
			rel: "canonical",
			href: `/receipt/${params.orderId}`
		}]
	}),
	loader: ({ context, params }) => {
		context.queryClient.ensureQueryData(orderQuery(params.orderId));
	},
	errorComponent: lazyRouteComponent($$splitErrorComponentImporter, "errorComponent"),
	notFoundComponent: lazyRouteComponent($$splitNotFoundComponentImporter, "notFoundComponent"),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
