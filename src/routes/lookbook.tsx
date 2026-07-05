import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { lookbookQuery } from "@/lib/queries";

export const Route = createFileRoute("/lookbook")({
  head: () => ({
    meta: [
      { title: "Lookbook — HOLYCULT SS26" },
      { name: "description", content: "SS26 / FIRST LIGHT lookbook. Heavyweight uniform, photographed in low light." },
      { property: "og:title", content: "Lookbook — HOLYCULT SS26" },
      { property: "og:description", content: "SS26 / FIRST LIGHT lookbook." },
      { property: "og:image", content: "/brand/holycult.png" },
    ],
    links: [{ rel: "canonical", href: "/lookbook" }],
  }),
  loader: ({ context }) => {
    context.queryClient.ensureQueryData(lookbookQuery());
  },
  component: LookbookPage,
});

function LookbookPage() {
  const { data: images } = useSuspenseQuery(lookbookQuery());
  const [active, setActive] = useState<number | null>(null);

  const open = (i: number) => setActive(i);
  const close = () => setActive(null);
  const next = () => setActive((i) => (i === null ? null : (i + 1) % images.length));
  const prev = () => setActive((i) => (i === null ? null : (i - 1 + images.length) % images.length));

  return (
    <main className="pt-28 pb-24">
      <section className="page-container mb-12">
        <div className="section-num mb-4">/ 004 — LOOKBOOK</div>
        <h1 className="display-xl">FIRST<br />LIGHT.</h1>
        <p className="meta text-hc-muted max-w-md mt-6">
          Tap any image to enlarge. {images.length} frames.
        </p>
      </section>

      <section className="page-container">
        <div className="gap-2 sm:gap-3 md:gap-4 [column-fill:_balance] columns-2 md:columns-3 lg:columns-4">
          {images.map((img, i) => (
            <motion.button
              key={img.id}
              onClick={() => open(i)}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: (i % 4) * 0.05 }}
              className="block w-full mb-2 sm:mb-3 md:mb-4 break-inside-avoid relative group overflow-hidden bg-hc-surface"
            >
              <img
                src={img.image_url}
                alt={img.caption ?? "lookbook"}
                loading="lazy"
                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {img.caption && (
                <div className="absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="label-xs text-white">{img.caption}</span>
                </div>
              )}
            </motion.button>
          ))}
        </div>
      </section>

      <section className="text-center py-24">
        <Link to="/drop" className="cta cta-primary">SHOP THE DROP</Link>
      </section>

      <AnimatePresence>
        {active !== null && images[active] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] bg-black/90 flex items-center justify-center no-print"
            onClick={close}
          >
            <button onClick={close} className="absolute top-5 right-5 text-white p-3" aria-label="Close">
              <X size={24} />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); prev(); }}
              className="absolute left-3 sm:left-8 text-white p-3"
              aria-label="Previous"
            >
              <ChevronLeft size={28} />
            </button>
            <motion.img
              key={images[active].id}
              src={images[active].image_url}
              alt={images[active].caption ?? "lookbook"}
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="max-w-[92vw] max-h-[88vh] object-contain"
              onClick={(e) => e.stopPropagation()}
            />
            <button
              onClick={(e) => { e.stopPropagation(); next(); }}
              className="absolute right-3 sm:right-8 text-white p-3"
              aria-label="Next"
            >
              <ChevronRight size={28} />
            </button>
            {images[active].caption && (
              <div className="absolute bottom-6 inset-x-0 text-center text-white label-xs">
                {images[active].caption}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
