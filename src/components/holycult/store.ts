import { useSyncExternalStore } from "react";
import { DROPS, type Product } from "./data";

let products: Product[] = DROPS.map((p) => ({ ...p }));
const listeners = new Set<() => void>();

function emit() { listeners.forEach((l) => l()); }

export function getProducts(): Product[] { return products; }
export function getProduct(id: string): Product | undefined { return products.find((p) => p.id === id); }

export function decrementInventory(id: string, by = 3) {
  products = products.map((p) => p.id === id ? { ...p, inventoryPct: Math.max(p.inventoryPct - by, 0) } : p);
  emit();
}

export function tickRandomInventory() {
  const available = products.map((p, i) => p.inventoryPct > 0 ? i : -1).filter((i) => i !== -1);
  if (!available.length) return;
  const idx = available[Math.floor(Math.random() * available.length)];
  products = products.map((p, i) => i === idx ? { ...p, inventoryPct: Math.max(p.inventoryPct - (Math.floor(Math.random() * 3) + 1), 0) } : p);
  emit();
}

function subscribe(cb: () => void) { listeners.add(cb); return () => { listeners.delete(cb); }; }

export function useProducts() {
  return useSyncExternalStore(subscribe, getProducts, getProducts);
}

/* Orders — sessionStorage backed so receipt route can hydrate on refresh */
export interface Order {
  id: string;
  productId: string;
  productName: string;
  productRef: string;
  productImage: string;
  size: string;
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  timestamp: string;
}

const ORDER_KEY = (id: string) => `holycult.order.${id}`;

export function saveOrder(order: Order) {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(ORDER_KEY(order.id), JSON.stringify(order));
}

export function loadOrder(id: string): Order | null {
  if (typeof window === "undefined") return null;
  const raw = sessionStorage.getItem(ORDER_KEY(id));
  return raw ? (JSON.parse(raw) as Order) : null;
}
