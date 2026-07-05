import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/shipping-returns")({
  head: () => ({
    meta: [
      { title: "Shipping & Returns — HOLYCULT" },
      { name: "description", content: "How HOLYCULT ships worldwide and handles returns and exchanges." },
      { property: "og:title", content: "Shipping & Returns — HOLYCULT" },
      { property: "og:description", content: "Worldwide shipping. Honest returns." },
    ],
    links: [{ rel: "canonical", href: "/shipping-returns" }],
  }),
  component: Page,
});

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="border-t border-hc-border py-10">
      <h2 className="display-md mb-4">{title}</h2>
      <div className="text-hc-muted text-lg leading-relaxed max-w-3xl space-y-4">{children}</div>
    </section>
  );
}

function Page() {
  return (
    <main className="pt-28 pb-24 page-container">
      <div className="section-num mb-4">/ HELP — SHIPPING & RETURNS</div>
      <h1 className="display-xl mb-12">SHIPPED<br />WITH<br /><span className="text-hc-bronze">CARE.</span></h1>

      <Block title="DISPATCH">
        <p>All orders are packed and shipped from our Mumbai studio within 2 business days of drop close.</p>
        <p>You'll receive a tracking number by email the moment your acquisition document is sealed.</p>
      </Block>

      <Block title="DELIVERY">
        <ul className="list-disc pl-5 space-y-2">
          <li><span className="text-hc-text">India:</span> 3–5 business days · ₹0 over ₹6,000</li>
          <li><span className="text-hc-text">Asia / Middle East:</span> 5–8 business days · $18 flat</li>
          <li><span className="text-hc-text">Europe / UK:</span> 6–10 business days · $32 flat</li>
          <li><span className="text-hc-text">North America:</span> 6–10 business days · $36 flat</li>
          <li><span className="text-hc-text">Rest of world:</span> 8–14 business days · $42 flat</li>
        </ul>
      </Block>

      <Block title="DUTIES & TAXES">
        <p>Orders ship DDU. Import duties and taxes are the responsibility of the recipient and are not included in the price shown at checkout.</p>
      </Block>

      <Block title="RETURNS">
        <p>We accept returns of unworn, unwashed pieces within 14 days of delivery. Pieces must be returned in original packaging with all tags attached.</p>
        <p>To start a return, email <a className="text-hc-text underline" href="mailto:returns@holycult.shop">returns@holycult.shop</a> with your order number.</p>
      </Block>

      <Block title="EXCHANGES">
        <p>Because every drop is a single production run, we cannot guarantee exchanges. If your size is still live in the drop, we'll do everything we can.</p>
      </Block>

      <Block title="FAULTY ITEMS">
        <p>If a piece arrives faulty, contact us within 7 days at <a className="text-hc-text underline" href="mailto:hello@holycult.shop">hello@holycult.shop</a> with photos. We'll make it right.</p>
      </Block>
    </main>
  );
}
