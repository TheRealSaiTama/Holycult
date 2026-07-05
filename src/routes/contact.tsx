import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — HOLYCULT" },
      { name: "description", content: "Get in touch with HOLYCULT — orders, press, wholesale, fit help." },
      { property: "og:title", content: "Contact — HOLYCULT" },
      { property: "og:description", content: "Reach the HOLYCULT studio." },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [sent, setSent] = useState(false);

  return (
    <main className="pt-28 pb-24">
      <section className="page-container">
        <div className="section-num mb-4">/ 005 — TRANSMISSION</div>
        <h1 className="display-xl mb-16">GET IN<br />TOUCH.</h1>

        <div className="grid md:grid-cols-12 gap-12">
          <div className="md:col-span-5 space-y-10">
            <div>
              <div className="label-xs text-hc-muted mb-2">STUDIO</div>
              <p className="text-lg">Bandra West, Mumbai 400050<br />India</p>
            </div>
            <div>
              <div className="label-xs text-hc-muted mb-2">EMAIL</div>
              <a href="mailto:hello@holycult.shop" className="text-lg hover:text-hc-bronze">hello@holycult.shop</a>
            </div>
            <div>
              <div className="label-xs text-hc-muted mb-2">PRESS</div>
              <a href="mailto:press@holycult.shop" className="text-lg hover:text-hc-bronze">press@holycult.shop</a>
            </div>
            <div>
              <div className="label-xs text-hc-muted mb-2">WHOLESALE</div>
              <a href="mailto:trade@holycult.shop" className="text-lg hover:text-hc-bronze">trade@holycult.shop</a>
            </div>
            <div>
              <div className="label-xs text-hc-muted mb-2">SOCIAL</div>
              <div className="flex gap-5 text-lg">
                <a href="https://instagram.com" className="hover:text-hc-bronze">Instagram</a>
                <a href="https://tiktok.com" className="hover:text-hc-bronze">TikTok</a>
              </div>
            </div>
          </div>

          <form
            className="md:col-span-7 border border-hc-border p-8 md:p-10 bg-hc-surface"
            onSubmit={(e) => { e.preventDefault(); setSent(true); }}
          >
            {sent ? (
              <div className="py-24 text-center">
                <div className="label-xs text-hc-neon mb-3">TRANSMISSION RECEIVED</div>
                <h2 className="display-md mb-3">WE'LL BE IN TOUCH.</h2>
                <p className="text-hc-muted meta">Usually within 48 hours.</p>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <input className="form-input" placeholder="NAME" required />
                  <input className="form-input" placeholder="EMAIL" type="email" required />
                </div>
                <select className="form-input" defaultValue="">
                  <option value="" disabled>SUBJECT</option>
                  <option>Order Help</option>
                  <option>Fit & Sizing</option>
                  <option>Press</option>
                  <option>Wholesale</option>
                  <option>Other</option>
                </select>
                <textarea className="form-input min-h-[160px] resize-y" placeholder="MESSAGE" required />
                <button className="cta cta-primary w-full sm:w-auto">SEND TRANSMISSION</button>
              </div>
            )}
          </form>
        </div>
      </section>
    </main>
  );
}
