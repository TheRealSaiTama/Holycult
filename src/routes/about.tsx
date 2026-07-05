import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — HOLYCULT" },
      { name: "description", content: "HOLYCULT is a congregation, not a brand. Numbered drops, heavyweight fabric, no restocks." },
      { property: "og:title", content: "About — HOLYCULT" },
      { property: "og:description", content: "HOLYCULT is a congregation, not a brand." },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <main className="pt-28 pb-24">
      <section className="page-container">
        <div className="section-num mb-4">/ 001 — DOCTRINE</div>
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="display-xl mb-10"
        >
          UNIFORM<br />
          FOR THE<br />
          <span className="text-hc-bronze">FAITHFUL.</span>
        </motion.h1>
        <div className="grid md:grid-cols-12 gap-10 mt-16">
          <div className="md:col-span-5">
            <img src="/brand/holycult2.png" alt="HOLYCULT studio" className="w-full" />
          </div>
          <div className="md:col-span-7 space-y-6 text-lg leading-relaxed text-hc-muted">
            <p>
              HOLYCULT was born in a small studio in Mumbai with a stubborn idea: clothing should be
              made like a ritual, not a refill. Every season we cut one production run. When it's
              gone, it's gone — archived forever.
            </p>
            <p className="text-hc-text">
              We obsess over fabric weight, stitch density, and the way a hem falls after a hundred
              washes. Then we put a number on it. That number is yours.
            </p>
            <p>
              No celebrity drops. No restocks. No discount codes. Just heavyweight uniform for the
              congregation.
            </p>
          </div>
        </div>
      </section>

      <section className="border-y border-hc-border mt-24 py-20">
        <div className="page-container grid md:grid-cols-3 gap-12">
          {[
            { n: "01", t: "FABRIC FIRST", d: "420gsm fleece, 280gsm cotton, heavyweight twill. Sourced, never substituted." },
            { n: "02", t: "ONE RUN", d: "We cut what we cut. Numbered, sealed, sent. Then the archive closes." },
            { n: "03", t: "NO RESTOCKS", d: "If you missed it, you missed it. Scarcity is respect — for the piece and the holder." },
          ].map((b) => (
            <div key={b.n}>
              <div className="section-num mb-4">/ {b.n}</div>
              <h3 className="display-md mb-3">{b.t}</h3>
              <p className="text-hc-muted leading-relaxed">{b.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="page-container py-20 text-center">
        <h2 className="display-lg mb-8">JOIN THE CONGREGATION.</h2>
        <Link to="/drop" className="cta cta-primary">ENTER THE DROP</Link>
      </section>
    </main>
  );
}
