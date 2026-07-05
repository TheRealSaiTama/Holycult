import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useState } from "react";
import { ProductCard } from "@/components/storefront/ProductCard";
import { productsQuery, currentDropQuery } from "@/lib/queries";
import { Rule } from "@/components/decor/Rule";

export const Route = createFileRoute("/drop")({
  head: () => ({
    meta: [
      { title: "Current Drop — SS26 / FIRST LIGHT — HOLYCULT" },
      { name: "description", content: "Heavyweight pieces. One production run. Live inventory. Select a size and SECURE." },
      { property: "og:title", content: "Current Drop — SS26 / FIRST LIGHT" },
      { property: "og:description", content: "Heavyweight pieces. One production run. Live inventory." },
      { property: "og:url", content: "/drop" },
      { property: "og:image", content: "/products/void-hoodie.jpg" },
    ],
    links: [{ rel: "canonical", href: "/drop" }],
  }),
  loader: ({ context }) => {
    context.queryClient.ensureQueryData(productsQuery("live"));
    context.queryClient.ensureQueryData(currentDropQuery());
  },
  component: DropPage,
});

const container = { hidden: {}, visible: { transition: { staggerChildren: 0.06 } } };

function DropPage() {
  const { data: products } = useSuspenseQuery(productsQuery("live"));
  const { data: drop } = useSuspenseQuery(currentDropQuery());
  const [activeWall, setActiveWall] = useState<"MENS" | "WOMENS">("MENS");

  const filtered = products.filter((p) => p.gender === activeWall);

  return (
    <div className="page-container pt-28 pb-24">
      <Rule label={`/ ${drop?.code ?? "DROP"}`} sub="INVENTORY LIVE" className="mb-6" />
      <div className="flex flex-col gap-2 mb-12">
        <h1 className="display-lg">{drop?.season ?? "SS26"} — {drop?.title ?? "FIRST LIGHT"}</h1>
        <p className="meta text-hc-muted max-w-lg">
          Six pieces. One production run. When stock hits zero the piece is archived forever.
        </p>
      </div>

      {/* Wall Switcher */}
      <div className="flex gap-4 border-b border-hc-border mb-10">
        {(["MENS", "WOMENS"] as const).map((gender) => (
          <button
            key={gender}
            type="button"
            onClick={() => setActiveWall(gender)}
            className={`px-8 py-3.5 label-xs font-mono tracking-widest transition-colors duration-200 border border-b-0 -mb-px ${
              activeWall === gender
                ? "bg-hc-text text-hc-bg border-hc-text"
                : "text-hc-muted hover:text-hc-text border-transparent"
            }`}
          >
            {gender} WALL
          </button>
        ))}
      </div>

      <motion.div
        className="product-grid"
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
      >
        {filtered.map((p) => <ProductCard key={p.id} product={p} />)}
      </motion.div>
    </div>
  );
}

