import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { productsQuery, dropsQuery } from "@/lib/queries";

export const Route = createFileRoute("/archive")({
  head: () => ({
    meta: [
      { title: "Archive — Past Drops — HOLYCULT" },
      { name: "description", content: "Past releases. Unit counts. All sold out. No restocks. Ever." },
      { property: "og:title", content: "Archive — Past Drops" },
      { property: "og:description", content: "Past releases. All sold out." },
      { property: "og:url", content: "/archive" },
      { property: "og:image", content: "/products/obsidian-tee.jpg" },
    ],
    links: [{ rel: "canonical", href: "/archive" }],
  }),
  loader: ({ context }) => {
    context.queryClient.ensureQueryData(productsQuery("archived"));
    context.queryClient.ensureQueryData(dropsQuery());
  },
  component: ArchivePage,
});

function ArchivePage() {
  const { data: products } = useSuspenseQuery(productsQuery("archived"));
  const { data: drops } = useSuspenseQuery(dropsQuery());
  const [activeImage, setActiveImage] = useState<string | null>(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  const rows = products.length
    ? products.map((p) => ({ label: `${p.ref} — ${p.name}`, image: p.image_url, sub: p.fabric ?? "" }))
    : drops.map((d) => ({ label: `${d.code} — ${d.title}`, image: "/brand/holycult.png", sub: d.season }));

  return (
    <div className="page-container pt-28 pb-24">
      <div className="section-num mb-2">/ 003 — ARCHIVE</div>
      <h1 className="display-lg mb-3">PAST RELEASES</h1>
      <p className="meta text-hc-muted mb-8 max-w-md">
        Every piece below has sold its full production. None will return.
      </p>
      <div className="rule mb-2" />
      <div className="relative select-none">
        {rows.length === 0 ? (
          <p className="py-12 text-hc-muted meta">The archive is empty — for now.</p>
        ) : (
          rows.map((row, i) => (
            <div key={row.label + i}>
              <div
                onMouseEnter={() => setActiveImage(row.image)}
                onMouseLeave={() => setActiveImage(null)}
                onMouseMove={(e) => setCoords({ x: e.clientX, y: e.clientY })}
                className="flex flex-col sm:flex-row sm:items-center justify-between py-6 gap-2 sm:gap-0 hover:bg-hc-surface/60 px-4 -mx-4 transition-colors cursor-crosshair"
              >
                <span className="font-medium text-base tracking-tight">{row.label}</span>
                <div className="flex items-center gap-6">
                  <span className="meta text-hc-muted">{row.sub}</span>
                  <span className="label-xs text-hc-muted">SOLD OUT</span>
                </div>
              </div>
              {i < rows.length - 1 && <div className="rule" />}
            </div>
          ))
        )}
      </div>
      {activeImage && (
        <img src={activeImage} alt="" className="archive-preview-image no-print" style={{ left: coords.x, top: coords.y }} />
      )}
    </div>
  );
}
