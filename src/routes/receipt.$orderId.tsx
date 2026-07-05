import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Barcode } from "@/components/holycult/Barcode";
import { orderQuery } from "@/lib/queries";
import { formatPriceShort } from "@/lib/format";

export const Route = createFileRoute("/receipt/$orderId")({
  head: ({ params }) => ({
    meta: [
      { title: `Order ${params.orderId.slice(0, 8)} — HOLYCULT` },
      { name: "description", content: "Acquisition document. Committed. No restocks. Ever." },
      { property: "og:url", content: `/receipt/${params.orderId}` },
      { name: "robots", content: "noindex" },
    ],
    links: [{ rel: "canonical", href: `/receipt/${params.orderId}` }],
  }),
  loader: ({ context, params }) => {
    context.queryClient.ensureQueryData(orderQuery(params.orderId));
  },
  errorComponent: () => (
    <div className="page-container pt-28 pb-24 text-center">
      <div className="section-num mb-4">FAULT</div>
      <h1 className="display-md mb-6">ORDER UNAVAILABLE</h1>
      <Link to="/drop" className="cta cta-primary">STOREFRONT</Link>
    </div>
  ),
  notFoundComponent: () => (
    <div className="page-container pt-28 pb-24 text-center">
      <div className="section-num mb-4">404</div>
      <h1 className="display-md mb-6">ORDER NOT FOUND</h1>
      <Link to="/drop" className="cta cta-primary">STOREFRONT</Link>
    </div>
  ),
  component: ReceiptPage,
});

function ReceiptPage() {
  const { orderId } = Route.useParams();
  const { data: order } = useSuspenseQuery(orderQuery(orderId));

  if (!order) {
    return (
      <div className="min-h-screen pt-28 pb-24 page-container text-center">
        <div className="section-num mb-4">404</div>
        <h1 className="display-md mb-6">ORDER NOT FOUND</h1>
        <Link to="/drop" className="cta cta-primary">STOREFRONT</Link>
      </div>
    );
  }

  const date = new Date(order.created_at).toLocaleString();

  return (
    <div className="min-h-screen pt-24 pb-24 flex items-center justify-center p-6">
      <div className="printable-receipt max-w-sm w-full bg-hc-surface p-8 flex flex-col items-center relative">
        <div className="receipt-jagged absolute top-0 left-0 right-0 no-print" />
        <img src="/logo/logo.jpeg" alt="HC" className="h-12 w-auto mb-4 mt-4 object-contain" />
        <div className="text-center font-black tracking-[0.2em] text-base mb-1">HOLYCULT</div>
        <div className="label-xs text-hc-muted mb-6">ACQUISITION DOCUMENT</div>

        <div className="w-full rule mb-4" />
        <div className="w-full space-y-2 font-mono text-[10px] leading-relaxed">
          <div className="flex justify-between"><span className="text-hc-muted">SERIAL:</span><span className="font-bold">{order.ref_code}</span></div>
          <div className="flex justify-between"><span className="text-hc-muted">TIME:</span><span className="font-bold">{date}</span></div>
          <div className="flex justify-between"><span className="text-hc-muted">EMAIL:</span><span className="font-bold truncate ml-2">{order.email}</span></div>
          <div className="flex justify-between"><span className="text-hc-muted">STATUS:</span><span className="text-hc-text bg-hc-neon px-1.5 py-0.5 font-bold tracking-wider text-[9px]">{order.status.toUpperCase()}</span></div>
        </div>

        <div className="w-full rule my-4" />
        <div className="w-full space-y-3 font-mono text-[10px]">
          {order.items.map((it) => (
            <div key={it.id}>
              <div className="flex justify-between font-bold"><span className="truncate">{it.product_name}</span><span className="shrink-0">{formatPriceShort(it.unit_price_cents * it.qty, order.currency)}</span></div>
              <div className="flex justify-between text-hc-muted pl-3"><span>SIZE {it.size_label} · ×{it.qty}</span><span>{it.product_ref}</span></div>
            </div>
          ))}
          <div className="rule my-3" />
          <div className="flex justify-between text-hc-muted"><span>SUBTOTAL</span><span>{formatPriceShort(order.subtotal_cents, order.currency)}</span></div>
          <div className="flex justify-between text-hc-muted"><span>SHIPPING</span><span>{formatPriceShort(order.shipping_cents, order.currency)}</span></div>
          <div className="rule my-3" />
          <div className="flex justify-between font-bold text-xs"><span>TOTAL</span><span>{formatPriceShort(order.total_cents, order.currency)} {order.currency}</span></div>
        </div>

        <div className="w-full rule my-4" />
        <div className="w-full space-y-1 font-mono text-[9px] text-hc-muted leading-relaxed">
          <div className="font-bold text-hc-text uppercase">SHIPS TO</div>
          <div>{order.shipping.name}</div>
          <div>{order.shipping.address}</div>
          <div>{order.shipping.city} {order.shipping.postal}</div>
          <div>{order.shipping.country}</div>
        </div>

        <div className="w-full rule my-4" />
        <div className="text-[9px] font-mono text-center text-hc-muted max-w-[240px] leading-normal mb-5 uppercase">
          PROOF OF SECURED MERCHANDISE. NO RESTOCKS. EVER.
        </div>
        <div className="w-full mb-2"><Barcode /></div>
        <div className="font-mono text-[8px] tracking-[0.25em] text-center text-hc-muted mb-6">*{order.ref_code}*</div>

        <div className="receipt-jagged-bottom absolute bottom-0 left-0 right-0 no-print" />
        <div className="w-full space-y-2 mt-4 no-print">
          <button onClick={() => window.print()} className="cta cta-primary w-full">PRINT RECEIPT</button>
          <Link to="/drop" className="cta cta-outline w-full">RETURN TO STOREFRONT</Link>
        </div>
      </div>
    </div>
  );
}
