import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/journal")({
  head: () => ({
    meta: [
      { title: "Journal — HOLYCULT" },
      { name: "description", content: "Field notes from the HOLYCULT studio — drops, fabric, process." },
      { property: "og:title", content: "Journal — HOLYCULT" },
      { property: "og:description", content: "Field notes from the studio." },
    ],
    links: [{ rel: "canonical", href: "/journal" }],
  }),
  component: JournalPage,
});

const POSTS = [
  { slug: "the-weight-of-420", date: "2026.06.14", read: "4 MIN", title: "The Weight of 420", excerpt: "Why we don't make light fleece, even when the spreadsheet asks us to.", cover: "/products/void-hoodie.jpg" },
  { slug: "one-run-no-mercy", date: "2026.05.30", read: "6 MIN", title: "One Run, No Mercy", excerpt: "Notes from the cutting floor on drop 026 — what we ordered, what we'll never order again.", cover: "/products/razor-cargo.jpg" },
  { slug: "the-archive-is-a-graveyard", date: "2026.05.02", read: "3 MIN", title: "The Archive Is a Graveyard", excerpt: "A short defense of letting things end.", cover: "/products/phantom-hood.jpg" },
  { slug: "fits-from-the-faithful", date: "2026.04.18", read: "2 MIN", title: "Fits From the Faithful", excerpt: "What the congregation wore this month.", cover: "/products/bone-tee.jpg" },
];

function JournalPage() {
  const [feature, ...rest] = POSTS;
  return (
    <main className="pt-28 pb-24">
      <section className="page-container mb-16">
        <div className="section-num mb-4">/ 006 — JOURNAL</div>
        <h1 className="display-xl">FIELD<br />NOTES.</h1>
      </section>

      <section className="page-container">
        <Link to="/journal" className="group grid md:grid-cols-12 gap-8 mb-20 items-center">
          <img src={feature.cover} alt={feature.title} className="md:col-span-7 w-full aspect-[16/10] object-cover" />
          <div className="md:col-span-5">
            <div className="label-xs text-hc-muted mb-3">{feature.date} · {feature.read}</div>
            <h2 className="display-md mb-3 group-hover:text-hc-bronze transition-colors">{feature.title}</h2>
            <p className="text-hc-muted text-lg leading-relaxed mb-6">{feature.excerpt}</p>
            <span className="label-xs">READ →</span>
          </div>
        </Link>

        <div className="grid md:grid-cols-3 gap-10 border-t border-hc-border pt-12">
          {rest.map((p) => (
            <Link key={p.slug} to="/journal" className="group">
              <img src={p.cover} alt={p.title} className="w-full aspect-[4/5] object-cover mb-4" />
              <div className="label-xs text-hc-muted mb-2">{p.date} · {p.read}</div>
              <h3 className="display-md mb-2 group-hover:text-hc-bronze transition-colors">{p.title}</h3>
              <p className="text-hc-muted meta">{p.excerpt}</p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
