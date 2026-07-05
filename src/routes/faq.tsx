import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ — HOLYCULT" },
      { name: "description", content: "Answers about drops, sizing, restocks, shipping, returns, and the cult." },
      { property: "og:title", content: "FAQ — HOLYCULT" },
      { property: "og:description", content: "Everything you'd ask before joining the cult." },
    ],
    links: [{ rel: "canonical", href: "/faq" }],
  }),
  component: FAQPage,
});

const FAQS = [
  { q: "Will this piece be restocked?", a: "No. Every HOLYCULT drop is a single, numbered production run. When it's gone, it's gone — permanently archived." },
  { q: "How does sizing run?", a: "Relaxed, drop-shoulder. If you're between sizes, size down for closer fit, up for the lookbook silhouette. See the size guide for measurements." },
  { q: "When does the next drop go live?", a: "Drops are announced 7 days in advance by email to the congregation. Subscribe at the bottom of any page." },
  { q: "How long until my order ships?", a: "Within 2 business days of drop close. You'll receive tracking by email." },
  { q: "Do you ship worldwide?", a: "Yes. See Shipping & Returns for rates and timing. Duties are paid on delivery." },
  { q: "Can I return or exchange?", a: "Returns within 14 days, unworn with tags. Exchanges are not guaranteed because every piece is finite." },
  { q: "How do I care for heavyweight fleece?", a: "Cold wash inside-out, hang dry. No tumble dry. The piece will soften and improve over the first ten washes." },
  { q: "Is HOLYCULT vegan?", a: "All current pieces are 100% cotton or cotton-blend. No animal materials." },
  { q: "Wholesale or press?", a: "Email trade@holycult.shop or press@holycult.shop respectively." },
];

function FAQPage() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <main className="pt-28 pb-24 page-container">
      <div className="section-num mb-4">/ HELP — FAQ</div>
      <h1 className="display-xl mb-16">ASK.<br /><span className="text-hc-bronze">RECEIVE.</span></h1>

      <ul className="border-t border-hc-text">
        {FAQS.map((f, i) => {
          const isOpen = open === i;
          return (
            <li key={i} className="border-b border-hc-border">
              <button
                onClick={() => setOpen(isOpen ? null : i)}
                className="w-full flex items-center justify-between py-6 text-left gap-6"
              >
                <span className="display-md">{f.q}</span>
                <span className="text-2xl font-mono shrink-0">{isOpen ? "−" : "+"}</span>
              </button>
              <div
                className="overflow-hidden transition-[max-height] duration-500 ease-out"
                style={{ maxHeight: isOpen ? 400 : 0 }}
              >
                <p className="pb-6 text-lg text-hc-muted leading-relaxed max-w-3xl">{f.a}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </main>
  );
}
