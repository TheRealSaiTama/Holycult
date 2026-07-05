import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Plus, Trash2, Star } from "lucide-react";
import { toast } from "sonner";
import { myAddressesQuery } from "@/lib/queries";
import { listMyAddresses, upsertMyAddress, deleteMyAddress } from "@/lib/account.functions";

export const Route = createFileRoute("/_authenticated/account/addresses")({
  component: AddressesPage,
});

interface AddressForm {
  id?: string;
  label: string;
  name: string;
  phone: string;
  address: string;
  city: string;
  postal: string;
  country: string;
  is_default: boolean;
}

const empty: AddressForm = {
  label: "", name: "", phone: "", address: "", city: "", postal: "", country: "India", is_default: false,
};

function AddressesPage() {
  const listFn = useServerFn(listMyAddresses);
  const upsertFn = useServerFn(upsertMyAddress);
  const deleteFn = useServerFn(deleteMyAddress);
  const qc = useQueryClient();
  const { data: addresses = [] } = useQuery({ ...myAddressesQuery(), queryFn: () => listFn() });
  const [editing, setEditing] = useState<AddressForm | null>(null);

  const save = useMutation({
    mutationFn: (vals: AddressForm) =>
      upsertFn({
        data: {
          id: vals.id,
          label: vals.label || null,
          name: vals.name,
          phone: vals.phone || null,
          address: vals.address,
          city: vals.city,
          postal: vals.postal,
          country: vals.country,
          is_default: vals.is_default,
        },
      }),
    onSuccess: () => {
      toast.success("ADDRESS SAVED");
      qc.invalidateQueries({ queryKey: ["account", "addresses"] });
      setEditing(null);
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const remove = useMutation({
    mutationFn: (id: string) => deleteFn({ data: { id } }),
    onSuccess: () => {
      toast.success("ADDRESS REMOVED");
      qc.invalidateQueries({ queryKey: ["account", "addresses"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  return (
    <div className="space-y-8">
      <header className="flex items-end justify-between gap-4">
        <div>
          <div className="section-num mb-1">/ 02 — SHIP-TO</div>
          <h2 className="display-md">ADDRESSES</h2>
        </div>
        <button onClick={() => setEditing(empty)} className="cta cta-primary">
          <Plus size={14} className="mr-2" /> ADD
        </button>
      </header>

      {addresses.length === 0 && !editing && (
        <div className="border border-dashed border-hc-border p-10 text-center">
          <div className="text-5xl text-hc-bronze/40 mb-3">☩</div>
          <p className="meta text-hc-muted mb-4">No saved addresses yet.</p>
          <button onClick={() => setEditing(empty)} className="cta cta-outline">ADD YOUR FIRST</button>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <AnimatePresence>
          {addresses.map((a) => (
            <motion.div
              key={a.id}
              layout
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="border border-hc-border p-5 relative bg-hc-surface group"
            >
              {a.is_default && (
                <span className="absolute -top-2 left-3 bg-hc-neon px-2 py-0.5 label-xs flex items-center gap-1">
                  <Star size={9} fill="currentColor" /> DEFAULT
                </span>
              )}
              <div className="font-bold text-sm uppercase tracking-tight mb-1">{a.label || a.name}</div>
              <div className="meta text-hc-muted leading-relaxed">
                {a.name}<br />
                {a.address}<br />
                {a.city} {a.postal}<br />
                {a.country}
                {a.phone && <><br />☎ {a.phone}</>}
              </div>
              <div className="flex gap-2 mt-4 pt-3 border-t border-hc-border">
                <button
                  onClick={() => setEditing({ ...a, label: a.label ?? "", phone: a.phone ?? "" } as AddressForm)}
                  className="label-xs hover:text-hc-bronze"
                >
                  EDIT
                </button>
                <button
                  onClick={() => { if (confirm("Delete this address?")) remove.mutate(a.id); }}
                  className="label-xs text-hc-muted hover:text-hc-danger ml-auto"
                >
                  <Trash2 size={12} className="inline mr-1" /> DELETE
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {editing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] bg-black/50 flex items-end sm:items-center justify-center p-0 sm:p-6"
            onClick={() => setEditing(null)}
          >
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 30, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-hc-bg w-full sm:max-w-lg border border-hc-border p-6 sm:p-8 space-y-5 max-h-[92vh] overflow-y-auto"
            >
              <div>
                <div className="section-num mb-1">/ {editing.id ? "EDIT" : "NEW"} ADDRESS</div>
                <h3 className="display-md">{editing.id ? "UPDATE" : "ADD ADDRESS"}</h3>
              </div>
              <form
                onSubmit={(e) => { e.preventDefault(); save.mutate(editing); }}
                className="space-y-4"
              >
                <input className="form-input" placeholder="LABEL (HOME, OFFICE...)" value={editing.label} onChange={(e) => setEditing({ ...editing, label: e.target.value })} />
                <input className="form-input" placeholder="FULL NAME" required value={editing.name} onChange={(e) => setEditing({ ...editing, name: e.target.value })} />
                <input className="form-input" placeholder="PHONE" value={editing.phone} onChange={(e) => setEditing({ ...editing, phone: e.target.value })} />
                <input className="form-input" placeholder="STREET ADDRESS" required value={editing.address} onChange={(e) => setEditing({ ...editing, address: e.target.value })} />
                <div className="grid grid-cols-2 gap-4">
                  <input className="form-input" placeholder="CITY" required value={editing.city} onChange={(e) => setEditing({ ...editing, city: e.target.value })} />
                  <input className="form-input" placeholder="POSTAL" required value={editing.postal} onChange={(e) => setEditing({ ...editing, postal: e.target.value })} />
                </div>
                <input className="form-input" placeholder="COUNTRY" required value={editing.country} onChange={(e) => setEditing({ ...editing, country: e.target.value })} />
                <label className="flex items-center gap-2 label-xs cursor-pointer">
                  <input type="checkbox" checked={editing.is_default} onChange={(e) => setEditing({ ...editing, is_default: e.target.checked })} />
                  SET AS DEFAULT
                </label>
                <div className="flex gap-3 pt-2">
                  <button type="submit" disabled={save.isPending} className="cta cta-primary flex-1">{save.isPending ? "SAVING…" : "SAVE"}</button>
                  <button type="button" onClick={() => setEditing(null)} className="cta cta-outline">CANCEL</button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
