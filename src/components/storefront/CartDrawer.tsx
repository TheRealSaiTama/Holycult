import { Link } from "@tanstack/react-router";
import { X, Minus, Plus, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useCart, cartSelectors } from "@/lib/cart/store";
import { formatPriceShort } from "@/lib/format";

export function CartDrawer() {
  const isOpen = useCart((s) => s.isOpen);
  const close = useCart((s) => s.close);
  const lines = useCart((s) => s.lines);
  const setQty = useCart((s) => s.setQty);
  const removeLine = useCart((s) => s.removeLine);
  const subtotal = useCart(cartSelectors.subtotalCents);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={close}
            className="fixed inset-0 bg-black/40 z-[60] no-print"
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 380, damping: 40 }}
            className="fixed top-0 right-0 bottom-0 z-[61] w-full sm:max-w-md bg-hc-bg flex flex-col no-print"
          >
            <header className="flex items-center justify-between p-5 border-b border-hc-border">
              <div>
                <div className="section-num">/ CART</div>
                <div className="display-md mt-1">{lines.length} {lines.length === 1 ? "ITEM" : "ITEMS"}</div>
              </div>
              <button onClick={close} className="p-2 hover:text-hc-bronze transition-colors" aria-label="Close cart">
                <X size={20} />
              </button>
            </header>

            {lines.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center p-8 text-center gap-4">
                <div className="text-6xl text-hc-bronze/40">☩</div>
                <div className="display-md">EMPTY VESSEL.</div>
                <p className="meta text-hc-muted max-w-xs">Add a piece from the current drop. Pieces won't return once gone.</p>
                <Link to="/drop" onClick={close} className="cta cta-primary mt-2">
                  ENTER THE DROP
                </Link>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto p-5 space-y-5">
                  {lines.map((l) => (
                    <div key={`${l.productId}-${l.sizeLabel}`} className="flex gap-4">
                      <img src={l.productImage} alt={l.productName} className="w-20 h-24 object-cover bg-hc-surface shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-baseline justify-between gap-2">
                          <span className="font-bold text-sm tracking-tight truncate">{l.productName}</span>
                          <span className="font-mono text-sm tabular-nums shrink-0">
                            {formatPriceShort(l.unitPriceCents * l.qty)}
                          </span>
                        </div>
                        <div className="ref-code mt-0.5">{l.productRef}</div>
                        <div className="meta text-hc-muted mt-1">SIZE {l.sizeLabel}</div>
                        <div className="mt-3 flex items-center justify-between">
                          <div className="flex items-center border border-hc-border">
                            <button
                              onClick={() => setQty(l.productId, l.sizeLabel, l.qty - 1)}
                              className="p-2 hover:bg-hc-surface"
                              aria-label="Decrease quantity"
                            >
                              <Minus size={12} />
                            </button>
                            <span className="px-3 font-mono text-xs tabular-nums">{l.qty}</span>
                            <button
                              onClick={() => setQty(l.productId, l.sizeLabel, l.qty + 1)}
                              className="p-2 hover:bg-hc-surface"
                              aria-label="Increase quantity"
                            >
                              <Plus size={12} />
                            </button>
                          </div>
                          <button
                            onClick={() => removeLine(l.productId, l.sizeLabel)}
                            className="text-hc-muted hover:text-hc-danger p-2"
                            aria-label="Remove item"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <footer className="p-5 border-t border-hc-border space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="label-xs text-hc-muted">SUBTOTAL</span>
                    <span className="font-mono text-lg tabular-nums">{formatPriceShort(subtotal)}</span>
                  </div>
                  <p className="meta text-hc-muted">Shipping calculated at checkout.</p>
                  <Link to="/checkout" onClick={close} className="cta cta-primary w-full">
                    CHECKOUT
                  </Link>
                  <Link to="/cart" onClick={close} className="cta cta-outline w-full">
                    VIEW CART
                  </Link>
                </footer>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
