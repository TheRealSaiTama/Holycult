import { createFileRoute, Link } from "@tanstack/react-router";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useCart, cartSelectors } from "@/lib/cart/store";
import { formatPriceShort } from "@/lib/format";
import { SHIPPING_FLAT_CENTS } from "@/lib/site";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Cart — HOLYCULT" },
      { name: "description", content: "Review your acquisition." },
      { name: "robots", content: "noindex" },
    ],
    links: [{ rel: "canonical", href: "/cart" }],
  }),
  component: CartPage,
});

function CartPage() {
  const lines = useCart((s) => s.lines);
  const setQty = useCart((s) => s.setQty);
  const removeLine = useCart((s) => s.removeLine);
  const subtotal = useCart(cartSelectors.subtotalCents);
  const shipping = lines.length ? SHIPPING_FLAT_CENTS : 0;
  const total = subtotal + shipping;

  return (
    <main className="pt-28 pb-24 page-container">
      <div className="section-num mb-2">/ 04 — CART</div>
      <h1 className="display-xl mb-12">YOUR<br />ACQUISITION.</h1>

      {lines.length === 0 ? (
        <div className="border border-hc-border p-12 text-center">
          <div className="text-5xl text-hc-bronze/40 mb-4">☩</div>
          <h2 className="display-md mb-3">EMPTY VESSEL.</h2>
          <p className="text-hc-muted meta mb-8">No pieces secured yet.</p>
          <Link to="/drop" className="cta cta-primary">ENTER THE DROP</Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-10 items-start">
          <div className="md:col-span-2 border-t border-hc-text">
            {lines.map((l) => (
              <div key={`${l.productId}-${l.sizeLabel}`} className="grid grid-cols-[88px_minmax(0,1fr)_auto] gap-4 sm:gap-6 py-6 border-b border-hc-border items-center">
                <img src={l.productImage} alt={l.productName} className="w-22 h-28 object-cover bg-hc-surface" />
                <div className="min-w-0">
                  <div className="font-bold tracking-tight truncate">{l.productName}</div>
                  <div className="ref-code mt-0.5">{l.productRef}</div>
                  <div className="meta text-hc-muted mt-1">SIZE {l.sizeLabel}</div>
                  <div className="mt-3 flex items-center gap-3">
                    <div className="flex items-center border border-hc-border">
                      <button onClick={() => setQty(l.productId, l.sizeLabel, l.qty - 1)} className="p-2 hover:bg-hc-surface"><Minus size={12} /></button>
                      <span className="px-3 font-mono text-xs tabular-nums">{l.qty}</span>
                      <button onClick={() => setQty(l.productId, l.sizeLabel, l.qty + 1)} className="p-2 hover:bg-hc-surface"><Plus size={12} /></button>
                    </div>
                    <button onClick={() => removeLine(l.productId, l.sizeLabel)} className="text-hc-muted hover:text-hc-danger label-xs flex items-center gap-1.5">
                      <Trash2 size={12} /> REMOVE
                    </button>
                  </div>
                </div>
                <div className="text-right font-mono tabular-nums">{formatPriceShort(l.unitPriceCents * l.qty)}</div>
              </div>
            ))}
          </div>

          <aside className="md:sticky md:top-24 border border-hc-border p-6 space-y-4">
            <div className="label-xs text-hc-muted">SUMMARY</div>
            <div className="space-y-2 font-mono text-sm">
              <div className="flex justify-between"><span className="text-hc-muted">SUBTOTAL</span><span>{formatPriceShort(subtotal)}</span></div>
              <div className="flex justify-between"><span className="text-hc-muted">SHIPPING</span><span>{formatPriceShort(shipping)}</span></div>
              <div className="rule my-3" />
              <div className="flex justify-between font-bold text-base"><span>TOTAL</span><span>{formatPriceShort(total)}</span></div>
            </div>
            <Link to="/checkout" className="cta cta-primary w-full">CHECKOUT</Link>
            <Link to="/drop" className="cta cta-outline w-full">KEEP BROWSING</Link>
          </aside>
        </div>
      )}
    </main>
  );
}
