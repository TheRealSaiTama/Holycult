import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useMemo, useState } from "react";
import { Plus, Trash2, Search } from "lucide-react";
import { adminListProducts, adminDeleteProduct } from "@/lib/admin.functions";
import { formatPriceShort } from "@/lib/format";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/admin/products")({
  component: ProductsList,
});

const STATUS_FILTERS = ["all", "live", "draft", "archived"] as const;
type StatusFilter = (typeof STATUS_FILTERS)[number];

function ProductsList() {
  const listFn = useServerFn(adminListProducts);
  const deleteFn = useServerFn(adminDeleteProduct);
  const qc = useQueryClient();
  const { data: products = [], isLoading } = useQuery({ queryKey: ["admin", "products"], queryFn: () => listFn() });

  const [q, setQ] = useState("");
  const [status, setStatus] = useState<StatusFilter>("all");

  const remove = useMutation({
    mutationFn: (id: string) => deleteFn({ data: { id } }),
    onSuccess: () => {
      toast.success("DELETED");
      qc.invalidateQueries({ queryKey: ["admin", "products"] });
      qc.invalidateQueries({ queryKey: ["products"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return products.filter((p) => {
      if (status !== "all" && p.status !== status) return false;
      if (!needle) return true;
      return [p.name, p.ref, p.category].join(" ").toLowerCase().includes(needle);
    });
  }, [products, q, status]);

  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between gap-4 flex-wrap">
        <div>
          <div className="section-num mb-2">/ CMS</div>
          <h1 className="display-md">PRODUCTS · {products.length}</h1>
        </div>
        <Link to="/admin/products/new" className="cta cta-primary">
          <Plus size={14} className="mr-2" /> NEW
        </Link>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
        <div className="relative flex-1">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-hc-muted" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="SEARCH NAME, REF, CATEGORY…"
            className="form-input pl-9 border border-hc-border px-3 py-2 bg-hc-surface"
          />
        </div>
        <div className="flex gap-1 border border-hc-border bg-hc-surface">
          {STATUS_FILTERS.map((s) => (
            <button
              key={s}
              onClick={() => setStatus(s)}
              className={`px-3 py-2 label-xs transition-colors ${status === s ? "bg-hc-text text-hc-bg" : "text-hc-muted hover:text-hc-text"}`}
            >
              {s.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {isLoading ? (
        <div className="label-xs text-hc-muted">LOADING…</div>
      ) : (
        <div className="border border-hc-border">
          {filtered.length === 0 && <p className="p-6 meta text-hc-muted">No products match.</p>}
          {filtered.map((p) => {
            const total = (p.product_sizes ?? []).reduce((n, s: { stock_qty: number }) => n + s.stock_qty, 0);
            const low = total > 0 && total < 10;
            const out = total === 0;
            return (
              <div key={p.id} className="grid grid-cols-[64px_minmax(0,1fr)_auto_auto_auto] items-center gap-4 p-4 border-b border-hc-border last:border-b-0 hover:bg-hc-surface transition-colors">
                <img src={p.image_url} alt={p.name} className="w-16 h-20 object-cover bg-hc-surface" />
                <div className="min-w-0">
                  <div className="font-bold tracking-tight truncate">{p.name}</div>
                  <div className="ref-code">{p.ref}</div>
                  <div className="meta text-hc-muted mt-1 flex items-center gap-2 flex-wrap">
                    <span>{p.category}</span>
                    <span>·</span>
                    <span className={out ? "text-hc-danger" : low ? "text-hc-bronze" : ""}>{total} IN STOCK</span>
                    <span>·</span>
                    <span className={`px-1.5 py-0.5 text-[9px] ${p.status === "live" ? "bg-hc-neon" : p.status === "draft" ? "bg-hc-surface border border-hc-border" : "bg-hc-text text-hc-bg"}`}>
                      {p.status.toUpperCase()}
                    </span>
                  </div>
                </div>
                <span className="font-mono text-sm tabular-nums">{formatPriceShort(p.price_cents)}</span>
                <Link to="/admin/products/$id" params={{ id: p.id }} className="label-xs hover:text-hc-bronze">EDIT →</Link>
                <button
                  onClick={() => { if (confirm(`Delete ${p.name}?`)) remove.mutate(p.id); }}
                  className="text-hc-muted hover:text-hc-danger p-2"
                  aria-label="Delete product"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
