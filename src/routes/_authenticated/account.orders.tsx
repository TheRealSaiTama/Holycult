import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { myOrdersQuery } from "@/lib/queries";
import { listMyOrders } from "@/lib/account.functions";
import { formatPriceShort } from "@/lib/format";

export const Route = createFileRoute("/_authenticated/account/orders")({
  component: OrdersPage,
});

function OrdersPage() {
  const fn = useServerFn(listMyOrders);
  const { data: orders = [], isLoading } = useQuery({ ...myOrdersQuery(), queryFn: () => fn() });

  return (
    <div className="space-y-8">
      <header>
        <div className="section-num mb-1">/ 03 — RECORD</div>
        <h2 className="display-md">ORDERS</h2>
      </header>

      {isLoading && <div className="label-xs text-hc-muted">LOADING…</div>}

      {!isLoading && orders.length === 0 && (
        <div className="border border-dashed border-hc-border p-10 text-center">
          <div className="text-5xl text-hc-bronze/40 mb-3">☩</div>
          <p className="meta text-hc-muted mb-4">No orders yet.</p>
          <Link to="/drop" className="cta cta-primary">ENTER THE DROP</Link>
        </div>
      )}

      <div className="space-y-3">
        {orders.map((o) => {
          type ItemPreview = { qty: number; product_name: string; size_label: string };
          const items = (o as unknown as { order_items: ItemPreview[] }).order_items ?? [];
          const totalQty = items.reduce((n, i) => n + i.qty, 0);
          return (
            <Link
              key={o.id}
              to="/receipt/$orderId"
              params={{ orderId: o.id }}
              className="block border border-hc-border p-5 hover:border-hc-text transition-colors bg-hc-surface"
            >
              <div className="flex items-start justify-between gap-4 mb-2">
                <div>
                  <div className="font-mono text-xs">{o.ref_code}</div>
                  <div className="meta text-hc-muted">{new Date(o.created_at).toLocaleString()}</div>
                </div>
                <div className="text-right">
                  <div className="font-mono tabular-nums font-bold">{formatPriceShort(o.total_cents, o.currency)}</div>
                  <div className="label-xs mt-1">
                    <span className={`px-1.5 py-0.5 ${o.status === "paid" || o.status === "fulfilled" ? "bg-hc-neon" : o.status === "cancelled" ? "bg-hc-danger text-hc-bg" : "bg-hc-surface border border-hc-border"}`}>
                      {o.status.toUpperCase()}
                    </span>
                  </div>
                </div>
              </div>
              <div className="meta text-hc-muted">
                {totalQty} ITEM{totalQty !== 1 ? "S" : ""}
                {items.slice(0, 2).map((i) => ` · ${i.product_name} (${i.size_label})`).join("")}
                {items.length > 2 && ` · +${items.length - 2} more`}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
