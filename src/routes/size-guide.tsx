import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/size-guide")({
  head: () => ({
    meta: [
      { title: "Size Guide — HOLYCULT" },
      { name: "description", content: "HOLYCULT size guide for tops, hoodies, and cargo pants. Measurements in cm and inches." },
      { property: "og:title", content: "Size Guide — HOLYCULT" },
      { property: "og:description", content: "Find your fit." },
    ],
    links: [{ rel: "canonical", href: "/size-guide" }],
  }),
  component: SizeGuide,
});

const TOPS = [
  ["S", "96", "70", "62"],
  ["M", "102", "72", "64"],
  ["L", "108", "74", "66"],
  ["XL", "114", "76", "68"],
];
const BOTTOMS = [
  ["S", "76", "94", "104"],
  ["M", "82", "100", "106"],
  ["L", "88", "106", "108"],
  ["XL", "94", "112", "110"],
];

function Table({ headers, rows }: { headers: string[]; rows: string[][] }) {
  return (
    <div className="overflow-x-auto border border-hc-border">
      <table className="w-full text-sm">
        <thead className="bg-hc-text text-hc-bg">
          <tr>
            {headers.map((h) => <th key={h} className="text-left p-3 label-xs">{h}</th>)}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className="border-t border-hc-border">
              {r.map((c, j) => (
                <td key={j} className={`p-3 ${j === 0 ? "label-xs" : "font-mono text-xs"}`}>{c}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function SizeGuide() {
  return (
    <main className="pt-28 pb-24 page-container">
      <div className="section-num mb-4">/ HELP — SIZE GUIDE</div>
      <h1 className="display-xl mb-12">FIND<br />YOUR<br /><span className="text-hc-bronze">FIT.</span></h1>

      <p className="text-hc-muted text-lg max-w-2xl mb-16 leading-relaxed">
        All HOLYCULT pieces are cut for a relaxed, drop-shoulder fit. If you're between sizes, size
        down for a closer fit, or up for the oversized silhouette pictured in the lookbook.
      </p>

      <section className="mb-16">
        <h2 className="display-md mb-6">TOPS & HOODIES (CM)</h2>
        <Table headers={["SIZE", "CHEST", "LENGTH", "SLEEVE"]} rows={TOPS} />
      </section>

      <section className="mb-16">
        <h2 className="display-md mb-6">BOTTOMS (CM)</h2>
        <Table headers={["SIZE", "WAIST", "HIP", "INSEAM"]} rows={BOTTOMS} />
      </section>

      <section className="border-t border-hc-border pt-12">
        <h2 className="display-md mb-4">HOW TO MEASURE</h2>
        <ul className="space-y-3 text-hc-muted text-lg max-w-2xl leading-relaxed list-disc pl-5">
          <li><span className="text-hc-text">Chest:</span> around the fullest part, under the arms.</li>
          <li><span className="text-hc-text">Length:</span> from highest point of shoulder to hem.</li>
          <li><span className="text-hc-text">Waist:</span> around your natural waistline.</li>
          <li><span className="text-hc-text">Inseam:</span> from crotch seam to bottom of leg.</li>
        </ul>
      </section>
    </main>
  );
}
