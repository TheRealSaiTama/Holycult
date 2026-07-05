import { n as persist, r as create, t as createJSONStorage } from "../_libs/zustand.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/store-BOQEfw_w.js
var lineKey = (productId, sizeLabel) => `${productId}::${sizeLabel}`;
var useCart = create()(persist((set) => ({
	lines: [],
	isOpen: false,
	open: () => set({ isOpen: true }),
	close: () => set({ isOpen: false }),
	toggle: () => set((s) => ({ isOpen: !s.isOpen })),
	addLine: (line, qty = 1) => set((s) => {
		const key = lineKey(line.productId, line.sizeLabel);
		if (s.lines.find((l) => lineKey(l.productId, l.sizeLabel) === key)) return {
			isOpen: true,
			lines: s.lines.map((l) => lineKey(l.productId, l.sizeLabel) === key ? {
				...l,
				qty: l.qty + qty
			} : l)
		};
		return {
			isOpen: true,
			lines: [...s.lines, {
				...line,
				qty
			}]
		};
	}),
	removeLine: (productId, sizeLabel) => set((s) => ({ lines: s.lines.filter((l) => lineKey(l.productId, l.sizeLabel) !== lineKey(productId, sizeLabel)) })),
	setQty: (productId, sizeLabel, qty) => set((s) => ({ lines: s.lines.map((l) => lineKey(l.productId, l.sizeLabel) === lineKey(productId, sizeLabel) ? {
		...l,
		qty: Math.max(0, qty)
	} : l).filter((l) => l.qty > 0) })),
	clear: () => set({ lines: [] })
}), {
	name: "holycult.cart.v1",
	storage: createJSONStorage(() => typeof window !== "undefined" ? localStorage : void 0),
	partialize: (s) => ({ lines: s.lines })
}));
var cartSelectors = {
	count: (s) => s.lines.reduce((n, l) => n + l.qty, 0),
	subtotalCents: (s) => s.lines.reduce((n, l) => n + l.qty * l.unitPriceCents, 0)
};
//#endregion
export { useCart as n, cartSelectors as t };
