import { useState } from "react";
import { motion } from "motion/react";
import { useNavigate } from "@tanstack/react-router";
import { Button } from "./Button";
import { InventoryBar } from "./InventoryBar";
import type { Product } from "./data";

const cardVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

export function ProductCard({ product }: { product: Product }) {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(false);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [imgFailed, setImgFailed] = useState(false);
  const [sizeError, setSizeError] = useState(false);
  const isLow = product.inventoryPct < 15;
  const isSoldOut = product.inventoryPct === 0;

  const onSecure = () => {
    if (isSoldOut) return;
    if (!selectedSize) {
      setSizeError(true);
      setTimeout(() => setSizeError(false), 500);
      return;
    }
    navigate({ to: "/checkout/$productId", params: { productId: product.id }, search: { size: selectedSize } });
  };

  return (
    <motion.div
      className={`card flex flex-col ${isSoldOut ? "opacity-40" : ""}`}
      variants={cardVariants}
      onHoverStart={() => !isSoldOut && setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={isSoldOut ? {} : { y: -2 }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
    >
      <div className="relative aspect-[4/5] bg-hc-bg overflow-hidden">
        {imgFailed ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="label-xs text-hc-muted">{product.category}</span>
          </div>
        ) : (
          <img
            src={product.image}
            alt={product.name}
            className="absolute inset-0 w-full h-full object-cover"
            style={{
              transform: hovered ? "scale(1.04)" : "scale(1)",
              transition: "transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)",
              filter: isSoldOut ? "grayscale(0.6)" : "none",
            }}
            onError={() => setImgFailed(true)}
          />
        )}
        <div className="absolute top-3 left-3">
          <span className="label-xs text-hc-muted bg-hc-surface/90 px-2 py-1">{product.category}</span>
        </div>
        {isSoldOut && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="bg-hc-text text-hc-bg label-xs px-4 py-2">SOLD OUT</span>
          </div>
        )}
      </div>

      <div className="pt-4 flex flex-col flex-1">
        <div className="flex items-baseline justify-between gap-3 mb-1">
          <div className="font-bold text-base tracking-tight leading-tight">{product.name}</div>
          <div className="font-mono text-sm shrink-0">${product.price}</div>
        </div>
        <div className="flex items-center justify-between gap-3 mb-4">
          <div className="meta text-hc-muted">{product.fabric}</div>
          <div className="ref-code">{product.ref}</div>
        </div>

        <div className="mb-4">
          <div className="flex justify-between items-baseline mb-2">
            <span className="caption text-hc-muted">SIZE</span>
            {sizeError && <span className="text-[10px] text-hc-danger font-bold animate-pulse">SELECT SIZE</span>}
          </div>
          <div className={`flex flex-wrap gap-x-4 gap-y-1 p-1 -m-1 ${sizeError ? "animate-shake" : ""}`}>
            {product.sizes.map((size) => (
              <button
                key={size}
                type="button"
                disabled={isSoldOut}
                onClick={() => { if (isSoldOut) return; setSelectedSize(selectedSize === size ? null : size); }}
                className={`size-tab ${selectedSize === size ? "selected" : ""} ${isSoldOut ? "cursor-not-allowed" : ""}`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-auto pt-2">
          <div className="flex items-center justify-between meta mb-1.5">
            <span className="text-hc-muted flex items-center gap-1.5">
              {!isSoldOut && <span className="inline-block w-1.5 h-1.5 rounded-full bg-hc-neon" />}
              {isSoldOut ? "SOLD OUT" : "INVENTORY"}
            </span>
            <span className={`font-mono tabular-nums ${isLow ? "text-hc-danger" : "text-hc-text/60"}`}>
              {isSoldOut ? "0%" : `${product.inventoryPct}%`}
            </span>
          </div>
          <InventoryBar pct={product.inventoryPct} />
        </div>

        <Button
          disabled={isSoldOut}
          variant={isSoldOut ? "outline" : isLow ? "danger" : selectedSize ? "neon" : "outline"}
          className={`mt-4 w-full ${isSoldOut ? "opacity-40 cursor-not-allowed" : ""}`}
          onClick={onSecure}
        >
          {isSoldOut ? "SOLD OUT" : selectedSize ? `SECURE — ${selectedSize}` : "SELECT SIZE"}
        </Button>
      </div>
    </motion.div>
  );
}
