import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/lib/cart/store";
import { formatPriceShort } from "@/lib/format";
import { InventoryBar } from "@/components/holycult/InventoryBar";
import type { CatalogProduct } from "@/lib/catalog.functions";
import { toast } from "sonner";
import { SizeChartDialog } from "./SizeChartDialog";

const SIZE_KEY = (id: string) => `hc:size:${id}`;


interface Props { product: CatalogProduct }

const variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

export function ProductCard({ product }: Props) {
  const addLine = useCart((s) => s.addLine);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [sizeError, setSizeError] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [sparkle, setSparkle] = useState(0);

  // Hydrate + persist selected size per product
  useEffect(() => {
    try {
      const saved = localStorage.getItem(SIZE_KEY(product.id));
      if (saved && product.sizes.some((s) => s.label === saved && s.stock_qty > 0)) {
        setSelectedSize(saved);
      }
    } catch {
      /* noop */
    }
  }, [product.id, product.sizes]);

  function pickSize(label: string | null) {
    setSelectedSize(label);
    try {
      if (label) localStorage.setItem(SIZE_KEY(product.id), label);
      else localStorage.removeItem(SIZE_KEY(product.id));
    } catch {
      /* noop */
    }
  }


  const totalStock = product.sizes.reduce((n, s) => n + s.stock_qty, 0);
  const startStock = product.sizes.length * 20;
  const inventoryPct = Math.min(100, Math.round((totalStock / Math.max(1, startStock)) * 100));
  const isLow = inventoryPct < 18 && inventoryPct > 0;
  const isSoldOut = totalStock === 0;

  function onAdd() {
    if (isSoldOut) return;
    if (!selectedSize) {
      setSizeError(true);
      setTimeout(() => setSizeError(false), 500);
      return;
    }
    const size = product.sizes.find((s) => s.label === selectedSize);
    if (!size || size.stock_qty === 0) {
      toast.error(`Size ${selectedSize} sold out`);
      return;
    }
    addLine({
      productId: product.id,
      productName: product.name,
      productRef: product.ref,
      productImage: product.image_url,
      productSlug: product.slug,
      sizeLabel: selectedSize,
      unitPriceCents: product.price_cents,
      currency: product.currency,
    });
    setSparkle((n) => n + 1);
    toast.success(`${product.name} · ${selectedSize} → CART`);
  }

  return (
    <motion.div
      variants={variants}
      className={`card flex flex-col ${isSoldOut ? "opacity-50" : ""}`}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
    >
      <div className="relative aspect-[4/5] bg-hc-bg overflow-hidden">
        <img
          src={product.image_url}
          alt={product.name}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out"
          style={{ transform: hovered ? "scale(1.05)" : "scale(1)", filter: isSoldOut ? "grayscale(0.5)" : "none" }}
        />
        <div className="absolute top-3 left-3">
          <span className="label-xs text-hc-muted bg-hc-surface/90 px-2 py-1">{product.category}</span>
        </div>
        {isSoldOut && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="bg-hc-text text-hc-bg label-xs px-4 py-2">SOLD OUT</span>
          </div>
        )}
      </div>

      <div className="p-4 sm:p-5 flex flex-col flex-1 gap-4">
        <div className="flex flex-col gap-1.5">
          <div className="flex items-baseline justify-between gap-2">
            <div className="font-bold text-[15px] sm:text-base tracking-tight leading-tight truncate min-w-0">{product.name}</div>
            <div className="font-mono text-sm shrink-0 tabular-nums">{formatPriceShort(product.price_cents, product.currency)}</div>
          </div>
          <div className="meta text-hc-muted truncate">{product.fabric}</div>
          <div className="flex items-center justify-between gap-2">
            <span className="ref-code">{product.ref}</span>
            <span className="ref-code inline-flex items-center gap-1">
              <span className="inline-block w-3 h-[6px] tricolor-bar" /> INDIA
            </span>
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-2 gap-2">
            <span className="caption text-hc-muted">SIZE</span>
            <div className="flex items-center gap-3">
              {sizeError && <span className="text-[10px] text-hc-danger font-bold animate-pulse">SELECT SIZE</span>}
              <SizeChartDialog category={product.category} />
            </div>
          </div>
          <div className={`flex flex-wrap gap-x-4 gap-y-1 ${sizeError ? "animate-shake" : ""}`}>
            {product.sizes.map((s) => {
              const out = s.stock_qty === 0;
              return (
                <button
                  key={s.label}
                  type="button"
                  disabled={out || isSoldOut}
                  onClick={() => pickSize(selectedSize === s.label ? null : s.label)}
                  className={`size-tab ${selectedSize === s.label ? "selected" : ""} ${out ? "line-through opacity-40 cursor-not-allowed" : ""}`}
                >
                  {s.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-auto">
          <div className="flex items-center justify-between meta mb-1.5">
            <span className="text-hc-muted flex items-center gap-1.5">
              {!isSoldOut && <span className="inline-block w-1.5 h-1.5 rounded-full bg-hc-neon" />}
              {isSoldOut ? "SOLD OUT" : "INVENTORY"}
            </span>
            <span className={`font-mono tabular-nums ${isLow ? "text-hc-danger" : "text-hc-muted"}`}>
              {isSoldOut ? "0%" : `${inventoryPct}%`}
            </span>
          </div>
          <InventoryBar pct={inventoryPct} />
        </div>

        <button
          disabled={isSoldOut}
          onClick={onAdd}
          className={`cta w-full relative overflow-visible ${isSoldOut ? "cta-outline cursor-not-allowed" : selectedSize ? "cta-neon" : "cta-outline"}`}
        >
          <ShoppingBag size={14} className="mr-2" />
          {isSoldOut ? "SOLD OUT" : selectedSize ? `ADD — ${selectedSize}` : "SELECT SIZE"}
          <AnimatePresence>
            {sparkle > 0 && (
              <motion.span
                key={sparkle}
                initial={{ opacity: 1, y: 0, scale: 1 }}
                animate={{ opacity: 0, y: -60, scale: 1.6 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                className="absolute left-1/2 -translate-x-1/2 -top-1 text-hc-bronze pointer-events-none text-xl"
                style={{ fontFamily: "'Archivo Black', sans-serif" }}
              >
                +1 ☩
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>
    </motion.div>
  );
}
