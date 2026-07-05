import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { adminListOrders, adminUpdateOrderStatus } from "@/lib/admin.functions";
import { formatPriceShort } from "@/lib/format";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/admin/orders")({
  component: AdminOrders,
});

const STATUSES = ["pending", "paid", "fulfilled", "cancelled"] as const;
type Status = (typeof STATUSES)[number];
const FILTERS = ["all", ...STATUSES] as const;

function AdminOrders() {
  const qc = useQueryClient();
  const listFn = useServerFn(adminListOrders);
  const updateFn = useServerFn(adminUpdateOrderStatus);
  const { data: orders = [], isLoading } = useQuery({ queryKey: ["admin", "orders"], queryFn: () => listFn() });
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("all");
  const [q, setQ] = useState("");

  const setStatus = useMutation({
    mutationFn: (vars: { id: string; status: Status }) => updateFn({ data: vars }),
    onSuccess: () => {
      toast.success("UPDATED");
      qc.invalidateQueries({ queryKey: ["admin", "orders"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return orders.filter((o) => {
      if (filter !== "all" && o.status !== filter) return false;
      if (!needle) return true;
      return [o.ref_code, o.email].join(" ").toLowerCase().includes(needle);
    });
  }, [orders, filter, q]);

  return (
    <div className="space-y-6">
      <div>
        <div className="section-num mb-2">/ CMS</div>
        <h1 className="display-md">ORDERS · {orders.length}</h1>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-hc-muted" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="SEARCH BY REF OR EMAIL…"
            className="form-input pl-9 border border-hc-border px-3 py-2 bg-hc-surface"
          />
        </div>
        <div className="flex border border-hc-border bg-hc-surface overflow-x-auto">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-2 label-xs whitespace-nowrap ${filter === f ? "bg-hc-text text-hc-bg" : "text-hc-muted hover:text-hc-text"}`}
            >
              {f.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {isLoading ? (
        <div className="label-xs text-hc-muted">LOADING…</div>
      ) : (
        <div className="border border-hc-border">
          {filtered.length === 0 && <p className="p-6 meta text-hc-muted">No orders match.</p>}
          {filtered.map((o) => {
            type Item = { qty: number; product_name: string; size_label: string };
            const items = ((o as unknown as { order_items: Item[] }).order_items ?? []);
            const totalQty = items.reduce((n, i) => n + i.qty, 0);
            return (
              <div key={o.id} className="p-4 border-b border-hc-border last:border-b-0 hover:bg-hc-surface transition-colors">
                <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_auto_auto] gap-3 md:gap-4 items-start md:items-center">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <span className="font-mono text-xs font-bold">{o.ref_code}</span>
                      <span className={`label-xs px-1.5 py-0.5 ${o.payment_status === "paid" ? "bg-hc-neon" : "bg-hc-surface border border-hc-border text-hc-muted"}`}>
                        {(o.payment_status ?? "unpaid").toUpperCase()}
                      </span>
                    </div>
                    <div className="meta text-hc-muted truncate">{o.email}</div>
                    <div className="meta text-hc-muted">
                      {new Date(o.created_at).toLocaleString()} · {totalQty} ITEM{totalQty !== 1 ? "S" : ""}
                    </div>
                  </div>
                  <span className="font-mono tabular-nums font-bold">{formatPriceShort(o.total_cents, o.currency)}</span>
                  <select
                    value={o.status}
                    onChange={(e) => setStatus.mutate({ id: o.id, status: e.target.value as Status })}
                    className="form-input py-2 text-xs uppercase border border-hc-border px-2 bg-hc-bg"
                  >
                    {STATUSES.map((s) => (
                      <option key={s} value={s}>{s.toUpperCase()}</option>
                    ))}
                  </select>
                  <span className="label-xs text-hc-muted hidden md:inline">{o.status === "fulfilled" ? "✓" : "—"}</span>
                </div>
                {items.length > 0 && (
                  <div className="mt-2 pt-2 border-t border-hc-border meta text-hc-muted">
                    {items.map((i, idx) => (
                      <span key={idx}>{idx > 0 && " · "}{i.product_name} ({i.size_label}×{i.qty})</span>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
