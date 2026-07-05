import { queryOptions } from "@tanstack/react-query";
import { listProducts, getProductBySlug, listLookbook, listArchivedDrops, getCurrentDrop, listSizeCharts } from "./catalog.functions";
import { getOrder } from "./orders.functions";
import { getMyProfile, listMyAddresses, listMyOrders } from "./account.functions";

export const productsQuery = (status: "live" | "archived" = "live") =>
  queryOptions({ queryKey: ["products", status], queryFn: () => listProducts({ data: { status } }) });

export const productBySlugQuery = (slug: string) =>
  queryOptions({ queryKey: ["product", slug], queryFn: () => getProductBySlug({ data: { slug } }) });

export const lookbookQuery = () => queryOptions({ queryKey: ["lookbook"], queryFn: () => listLookbook() });
export const dropsQuery = () => queryOptions({ queryKey: ["drops"], queryFn: () => listArchivedDrops() });
export const currentDropQuery = () => queryOptions({ queryKey: ["drop", "current"], queryFn: () => getCurrentDrop() });
export const sizeChartsQuery = () => queryOptions({ queryKey: ["size-charts"], queryFn: () => listSizeCharts(), staleTime: 60_000 });


export const orderQuery = (orderId: string) =>
  queryOptions({ queryKey: ["order", orderId], queryFn: () => getOrder({ data: { orderId } }) });

export const myProfileQuery = () => queryOptions({ queryKey: ["account", "profile"], queryFn: () => getMyProfile() });
export const myAddressesQuery = () => queryOptions({ queryKey: ["account", "addresses"], queryFn: () => listMyAddresses() });
export const myOrdersQuery = () => queryOptions({ queryKey: ["account", "orders"], queryFn: () => listMyOrders() });
