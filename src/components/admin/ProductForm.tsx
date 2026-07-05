import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useNavigate } from "@tanstack/react-router";
import { Plus, Trash2 } from "lucide-react";
import { adminUpsertProduct } from "@/lib/admin.functions";
import { toast } from "sonner";

export interface ProductFormValues {
  id?: string;
  ref: string;
  slug: string;
  name: string;
  description: string;
  price_cents: number;
  category: string;
  fabric: string;
  image_url: string;
  status: "draft" | "live" | "archived";
  sort_order: number;
  sizes: { label: string; stock_qty: number; sort_order: number }[];
}

const emptyValues: ProductFormValues = {
  ref: "",
  slug: "",
  name: "",
  description: "",
  price_cents: 0,
  category: "TEE",
  fabric: "",
  image_url: "",
  status: "draft",
  sort_order: 0,
  sizes: [
    { label: "S", stock_qty: 10, sort_order: 1 },
    { label: "M", stock_qty: 10, sort_order: 2 },
    { label: "L", stock_qty: 10, sort_order: 3 },
    { label: "XL", stock_qty: 10, sort_order: 4 },
  ],
};

export function ProductForm({ initial }: { initial?: ProductFormValues }) {
  const navigate = useNavigate();
  const qc = useQueryClient();
  const upsert = useServerFn(adminUpsertProduct);
  const [values, setValues] = useState<ProductFormValues>(initial ?? emptyValues);
  const [priceInput, setPriceInput] = useState((initial?.price_cents ?? 0) / 100 + "");

  const save = useMutation({
    mutationFn: () =>
      upsert({
        data: {
          ...values,
          description: values.description || null,
          fabric: values.fabric || null,
          price_cents: Math.round((parseFloat(priceInput) || 0) * 100),
        },
      }),
    onSuccess: () => {
      toast.success("SAVED");
      qc.invalidateQueries({ queryKey: ["admin", "products"] });
      qc.invalidateQueries({ queryKey: ["products"] });
      navigate({ to: "/admin/products" });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  function field<K extends keyof ProductFormValues>(key: K, value: ProductFormValues[K]) {
    setValues((v) => ({ ...v, [key]: value }));
  }

  function updateSize(i: number, patch: Partial<ProductFormValues["sizes"][number]>) {
    setValues((v) => ({ ...v, sizes: v.sizes.map((s, idx) => (idx === i ? { ...s, ...patch } : s)) }));
  }

  function addSize() {
    setValues((v) => ({ ...v, sizes: [...v.sizes, { label: "", stock_qty: 0, sort_order: v.sizes.length + 1 }] }));
  }

  function removeSize(i: number) {
    setValues((v) => ({ ...v, sizes: v.sizes.filter((_, idx) => idx !== i) }));
  }

  return (
    <form onSubmit={(e) => { e.preventDefault(); save.mutate(); }} className="space-y-10 max-w-3xl">
      <section className="space-y-5">
        <div className="label-xs text-hc-muted">BASIC</div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Field label="NAME" required value={values.name} onChange={(v) => field("name", v)} />
          <Field label="REF (e.g. HC-SS26-...)" required value={values.ref} onChange={(v) => field("ref", v.toUpperCase())} />
          <Field label="SLUG (kebab-case)" required value={values.slug} onChange={(v) => field("slug", v.toLowerCase().replace(/[^a-z0-9-]/g, "-"))} />
          <Field label="CATEGORY" required value={values.category} onChange={(v) => field("category", v.toUpperCase())} />
          <Field label="PRICE (INR)" required type="number" value={priceInput} onChange={setPriceInput} />
          <Field label="SORT ORDER" type="number" value={values.sort_order + ""} onChange={(v) => field("sort_order", parseInt(v) || 0)} />
        </div>
        <Field label="FABRIC" value={values.fabric} onChange={(v) => field("fabric", v)} />
        <Field label="IMAGE URL" required value={values.image_url} onChange={(v) => field("image_url", v)} />
        <div>
          <label className="label-xs text-hc-muted block mb-2">DESCRIPTION</label>
          <textarea
            className="form-input min-h-[120px] resize-y"
            value={values.description}
            onChange={(e) => field("description", e.target.value)}
          />
        </div>
        <div>
          <label className="label-xs text-hc-muted block mb-2">STATUS</label>
          <select
            className="form-input"
            value={values.status}
            onChange={(e) => field("status", e.target.value as ProductFormValues["status"])}
          >
            <option value="draft">DRAFT (hidden)</option>
            <option value="live">LIVE</option>
            <option value="archived">ARCHIVED</option>
          </select>
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="label-xs text-hc-muted">SIZES & STOCK</div>
          <button type="button" onClick={addSize} className="label-xs hover:text-hc-bronze flex items-center gap-1.5">
            <Plus size={12} /> ADD SIZE
          </button>
        </div>
        <div className="border border-hc-border">
          {values.sizes.map((s, i) => (
            <div key={i} className="grid grid-cols-[1fr_1fr_1fr_auto] gap-3 p-3 border-b border-hc-border last:border-b-0 items-center">
              <input className="form-input py-2" placeholder="LABEL" value={s.label} onChange={(e) => updateSize(i, { label: e.target.value.toUpperCase() })} />
              <input className="form-input py-2" type="number" placeholder="STOCK" value={s.stock_qty} onChange={(e) => updateSize(i, { stock_qty: parseInt(e.target.value) || 0 })} />
              <input className="form-input py-2" type="number" placeholder="ORDER" value={s.sort_order} onChange={(e) => updateSize(i, { sort_order: parseInt(e.target.value) || 0 })} />
              <button type="button" onClick={() => removeSize(i)} className="text-hc-muted hover:text-hc-danger p-2" aria-label="Remove size">
                <Trash2 size={14} />
              </button>
            </div>
          ))}
        </div>
      </section>

      <div className="flex gap-3">
        <button type="submit" disabled={save.isPending} className="cta cta-primary">
          {save.isPending ? "SAVING…" : initial?.id ? "UPDATE PRODUCT" : "CREATE PRODUCT"}
        </button>
        <button type="button" onClick={() => navigate({ to: "/admin/products" })} className="cta cta-outline">CANCEL</button>
      </div>
    </form>
  );
}

function Field({ label, value, onChange, type = "text", required }: { label: string; value: string; onChange: (v: string) => void; type?: string; required?: boolean }) {
  return (
    <div>
      <label className="label-xs text-hc-muted block mb-2">{label}</label>
      <input
        className="form-input"
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
