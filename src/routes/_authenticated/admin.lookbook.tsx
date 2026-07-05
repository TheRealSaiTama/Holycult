import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { Plus, Trash2 } from "lucide-react";
import { adminListLookbook, adminUpsertLookbook, adminDeleteLookbook } from "@/lib/admin.functions";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/admin/lookbook")({
  component: LookbookAdmin,
});

function LookbookAdmin() {
  const qc = useQueryClient();
  const listFn = useServerFn(adminListLookbook);
  const upsertFn = useServerFn(adminUpsertLookbook);
  const deleteFn = useServerFn(adminDeleteLookbook);
  const { data: images = [] } = useQuery({ queryKey: ["admin", "lookbook"], queryFn: () => listFn() });

  const [draft, setDraft] = useState({ image_url: "", caption: "" });

  const create = useMutation({
    mutationFn: () =>
      upsertFn({
        data: {
          image_url: draft.image_url,
          caption: draft.caption || null,
          sort_order: images.length + 1,
        },
      }),
    onSuccess: () => {
      toast.success("ADDED");
      setDraft({ image_url: "", caption: "" });
      qc.invalidateQueries({ queryKey: ["admin", "lookbook"] });
      qc.invalidateQueries({ queryKey: ["lookbook"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const remove = useMutation({
    mutationFn: (id: string) => deleteFn({ data: { id } }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin", "lookbook"] });
      qc.invalidateQueries({ queryKey: ["lookbook"] });
    },
  });

  return (
    <div className="space-y-8">
      <div>
        <div className="section-num mb-2">/ CMS</div>
        <h1 className="display-md">LOOKBOOK</h1>
      </div>

      <form
        onSubmit={(e) => { e.preventDefault(); if (draft.image_url) create.mutate(); }}
        className="border border-hc-border p-5 space-y-4"
      >
        <div className="label-xs text-hc-muted">ADD IMAGE</div>
        <input
          className="form-input"
          placeholder="IMAGE URL (e.g. /products/void-hoodie.jpg)"
          value={draft.image_url}
          onChange={(e) => setDraft((d) => ({ ...d, image_url: e.target.value }))}
          required
        />
        <input
          className="form-input"
          placeholder="CAPTION (optional)"
          value={draft.caption}
          onChange={(e) => setDraft((d) => ({ ...d, caption: e.target.value }))}
        />
        <button type="submit" disabled={create.isPending} className="cta cta-primary">
          <Plus size={14} className="mr-2" /> {create.isPending ? "ADDING…" : "ADD IMAGE"}
        </button>
      </form>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((img) => (
          <div key={img.id} className="relative group">
            <img src={img.image_url} alt={img.caption ?? ""} className="w-full aspect-[4/5] object-cover bg-hc-surface" />
            {img.caption && <div className="meta text-hc-muted mt-2 truncate">{img.caption}</div>}
            <button
              onClick={() => { if (confirm("Delete this image?")) remove.mutate(img.id); }}
              className="absolute top-2 right-2 bg-hc-bg/90 p-2 opacity-0 group-hover:opacity-100 transition-opacity"
              aria-label="Delete image"
            >
              <Trash2 size={14} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
