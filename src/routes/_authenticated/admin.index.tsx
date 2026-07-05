import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { adminListOrders, adminListProducts } from "@/lib/admin.functions";
import { formatPriceShort } from "@/lib/format";

export const Route = createFileRoute("/_authenticated/admin/")({
  component: AdminDashboard,
});

function AdminDashboard() {
  const ordersFn = useServerFn(adminListOrders);
  const productsFn = useServerFn(adminListProducts);
  const { data: orders = [] } = useQuery({ queryKey: ["admin", "orders"], queryFn: () => ordersFn() });
  const { data: products = [] } = useQuery({ queryKey: ["admin", "products"], queryFn: () => productsFn() });

  const revenue = orders.reduce((n, o) => n + (o.status === "paid" || o.status === "fulfilled" ? o.total_cents : 0), 0);
  const lowStock = products.filter((p) => {
    const total = (p.product_sizes ?? []).reduce((n, s: { stock_qty: number }) => n + s.stock_qty, 0);
    return total > 0 && total < 10;
  });
  const liveProducts = products.filter((p) => p.status === "live").length;

  const stats = [
    { k: orders.length.toString(), l: "ORDERS" },
    { k: formatPriceShort(revenue), l: "REVENUE" },
    { k: liveProducts.toString(), l: "LIVE PRODUCTS" },
    { k: lowStock.length.toString(), l: "LOW STOCK" },
  ];

  return (
    <div className="space-y-10">
      <header>
        <div className="section-num mb-2">/ OVERVIEW</div>
        <h1 className="display-md">DASHBOARD</h1>
      </header>

      <div className="grid grid-cols-2 md:grid-cols-4 border border-hc-border">
        {stats.map((s, i) => (
          <div key={s.l} className={`p-6 ${i > 0 ? "border-l border-hc-border" : ""}`}>
            <div className="display-md mb-2 tabular-nums">{s.k}</div>
            <div className="label-xs text-hc-muted">{s.l}</div>
          </div>
        ))}
      </div>

      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="display-md">RECENT ORDERS</h2>
          <Link to="/admin/orders" className="label-xs hover:text-hc-bronze">VIEW ALL →</Link>
        </div>
        <div className="border border-hc-border">
          {orders.slice(0, 5).length === 0 ? (
            <p className="p-6 meta text-hc-muted">No orders yet.</p>
          ) : (
            orders.slice(0, 5).map((o) => (
              <div key={o.id} className="grid grid-cols-[1fr_auto_auto] gap-4 items-center p-4 border-b border-hc-border last:border-b-0">
                <div>
                  <div className="font-mono text-xs">{o.ref_code}</div>
                  <div className="meta text-hc-muted truncate">{o.email}</div>
                </div>
                <span className="label-xs">{o.status.toUpperCase()}</span>
                <span className="font-mono tabular-nums text-sm">{formatPriceShort(o.total_cents)}</span>
              </div>
            ))
          )}
        </div>
      </section>

      {lowStock.length > 0 && (
        <section>
          <h2 className="display-md mb-4">LOW STOCK</h2>
          <div className="border border-hc-border">
            {lowStock.map((p) => {
              const total = (p.product_sizes ?? []).reduce((n, s: { stock_qty: number }) => n + s.stock_qty, 0);
              return (
                <div key={p.id} className="flex items-center justify-between p-4 border-b border-hc-border last:border-b-0">
                  <div className="flex items-center gap-3">
                    <img src={p.image_url} alt={p.name} className="w-10 h-12 object-cover" />
                    <div>
                      <div className="font-bold text-sm">{p.name}</div>
                      <div className="ref-code">{p.ref}</div>
                    </div>
                  </div>
                  <span className="label-xs text-hc-danger">{total} LEFT</span>
                </div>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
}
