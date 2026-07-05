import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface CartLine {
  productId: string;
  productName: string;
  productRef: string;
  productImage: string;
  productSlug: string;
  sizeLabel: string;
  unitPriceCents: number;
  qty: number;
  currency: string;
}

interface CartState {
  lines: CartLine[];
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
  addLine: (line: Omit<CartLine, "qty">, qty?: number) => void;
  removeLine: (productId: string, sizeLabel: string) => void;
  setQty: (productId: string, sizeLabel: string, qty: number) => void;
  clear: () => void;
}

const lineKey = (productId: string, sizeLabel: string) => `${productId}::${sizeLabel}`;

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      lines: [],
      isOpen: false,
      open: () => set({ isOpen: true }),
      close: () => set({ isOpen: false }),
      toggle: () => set((s) => ({ isOpen: !s.isOpen })),
      addLine: (line, qty = 1) =>
        set((s) => {
          const key = lineKey(line.productId, line.sizeLabel);
          const exists = s.lines.find((l) => lineKey(l.productId, l.sizeLabel) === key);
          if (exists) {
            return {
              isOpen: true,
              lines: s.lines.map((l) =>
                lineKey(l.productId, l.sizeLabel) === key ? { ...l, qty: l.qty + qty } : l,
              ),
            };
          }
          return { isOpen: true, lines: [...s.lines, { ...line, qty }] };
        }),
      removeLine: (productId, sizeLabel) =>
        set((s) => ({
          lines: s.lines.filter((l) => lineKey(l.productId, l.sizeLabel) !== lineKey(productId, sizeLabel)),
        })),
      setQty: (productId, sizeLabel, qty) =>
        set((s) => ({
          lines: s.lines
            .map((l) =>
              lineKey(l.productId, l.sizeLabel) === lineKey(productId, sizeLabel)
                ? { ...l, qty: Math.max(0, qty) }
                : l,
            )
            .filter((l) => l.qty > 0),
        })),
      clear: () => set({ lines: [] }),
    }),
    {
      name: "holycult.cart.v1",
      storage: createJSONStorage(() => (typeof window !== "undefined" ? localStorage : (undefined as unknown as Storage))),
      partialize: (s) => ({ lines: s.lines }),
    },
  ),
);

export const cartSelectors = {
  count: (s: CartState) => s.lines.reduce((n, l) => n + l.qty, 0),
  subtotalCents: (s: CartState) => s.lines.reduce((n, l) => n + l.qty * l.unitPriceCents, 0),
};
