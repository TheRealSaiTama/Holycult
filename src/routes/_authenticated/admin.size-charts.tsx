import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { Plus, Save, Trash2 } from "lucide-react";
import {
  adminListSizeCharts,
  adminUpsertSizeChart,
  adminDeleteSizeChart,
} from "@/lib/admin.functions";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/admin/size-charts")({
  component: SizeChartsAdmin,
});

interface ChartDraft {
  id?: string;
  kind: string;
  title: string;
  unit: string;
  headers: string[];
  rows: string[][];
  note: string;
}

function emptyDraft(): ChartDraft {
  return {
    kind: "",
    title: "",
    unit: "cm",
    headers: ["SIZE", "CHEST", "LENGTH", "SLEEVE"],
    rows: [
      ["S", "", "", ""],
      ["M", "", "", ""],
      ["L", "", "", ""],
    ],
    note: "",
  };
}

function SizeChartsAdmin() {
  const qc = useQueryClient();
  const listFn = useServerFn(adminListSizeCharts);
  const upsertFn = useServerFn(adminUpsertSizeChart);
  const deleteFn = useServerFn(adminDeleteSizeChart);

  const { data: charts = [] } = useQuery({
    queryKey: ["admin", "size-charts"],
    queryFn: () => listFn(),
  });

  const [draft, setDraft] = useState<ChartDraft>(emptyDraft());

  function loadFor(id: string | "new") {
    if (id === "new") return setDraft(emptyDraft());
    const c = charts.find((x) => x.id === id);
    if (!c) return;
    setDraft({
      id: c.id,
      kind: c.kind,
      title: c.title,
      unit: c.unit,
      headers: (c.headers as string[]) ?? [],
      rows: (c.rows as string[][]) ?? [],
      note: c.note ?? "",
    });
  }

  useEffect(() => {
    if (!draft.id && charts.length && !draft.kind) loadFor(charts[0].id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [charts.length]);

  const save = useMutation({
    mutationFn: () =>
      upsertFn({
        data: {
          id: draft.id,
          kind: draft.kind.toLowerCase().trim(),
          title: draft.title,
          unit: draft.unit,
          headers: draft.headers.map((h) => h.trim()).filter(Boolean),
          rows: draft.rows.map((r) => r.map((c) => c.trim())),
          note: draft.note?.trim() ? draft.note.trim() : null,
        },
      }),
    onSuccess: () => {
      toast.success("SAVED");
      qc.invalidateQueries({ queryKey: ["admin", "size-charts"] });
      qc.invalidateQueries({ queryKey: ["size-charts"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const remove = useMutation({
    mutationFn: (id: string) => deleteFn({ data: { id } }),
    onSuccess: () => {
      toast.success("DELETED");
      setDraft(emptyDraft());
      qc.invalidateQueries({ queryKey: ["admin", "size-charts"] });
      qc.invalidateQueries({ queryKey: ["size-charts"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  function setHeader(i: number, v: string) {
    setDraft((d) => ({ ...d, headers: d.headers.map((h, idx) => (idx === i ? v : h)) }));
  }
  function setCell(r: number, c: number, v: string) {
    setDraft((d) => ({
      ...d,
      rows: d.rows.map((row, ri) => (ri === r ? row.map((cell, ci) => (ci === c ? v : cell)) : row)),
    }));
  }
  function addColumn() {
    setDraft((d) => ({
      ...d,
      headers: [...d.headers, ""],
      rows: d.rows.map((r) => [...r, ""]),
    }));
  }
  function removeColumn(i: number) {
    setDraft((d) => ({
      ...d,
      headers: d.headers.filter((_, idx) => idx !== i),
      rows: d.rows.map((r) => r.filter((_, idx) => idx !== i)),
    }));
  }
  function addRow() {
    setDraft((d) => ({ ...d, rows: [...d.rows, d.headers.map(() => "")] }));
  }
  function removeRow(i: number) {
    setDraft((d) => ({ ...d, rows: d.rows.filter((_, idx) => idx !== i) }));
  }

  return (
    <div className="space-y-8 max-w-5xl">
      <div className="flex items-end justify-between gap-4 flex-wrap">
        <div>
          <div className="section-num mb-2">/ CMS</div>
          <h1 className="display-md">SIZE CHARTS</h1>
          <p className="text-hc-muted meta mt-2 max-w-prose">
            Charts are matched to products by <code className="font-mono">kind</code>. Use{" "}
            <code className="font-mono">tops</code> or <code className="font-mono">bottoms</code> —
            categories containing pants / cargo / shorts / bottom / jean auto-route to bottoms.
          </p>
        </div>
        <button onClick={() => loadFor("new")} className="cta cta-outline">
          <Plus size={14} className="mr-1" /> NEW CHART
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-6">
        <aside className="border border-hc-border bg-hc-surface/40">
          {charts.length === 0 && (
            <div className="p-4 meta text-hc-muted">No charts yet.</div>
          )}
          {charts.map((c) => (
            <button
              key={c.id}
              onClick={() => loadFor(c.id)}
              className={`w-full text-left px-4 py-3 border-b border-hc-border block transition-colors ${
                draft.id === c.id ? "bg-hc-text text-hc-bg" : "hover:bg-hc-surface"
              }`}
            >
              <div className="label-xs">{c.kind}</div>
              <div className="meta opacity-70">{c.title}</div>
            </button>
          ))}
        </aside>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            save.mutate();
          }}
          className="border border-hc-border p-5 space-y-5"
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Field label="KIND (slug)">
              <input
                value={draft.kind}
                onChange={(e) => setDraft({ ...draft, kind: e.target.value })}
                placeholder="tops"
                required
                className="border border-hc-border px-3 py-2 bg-hc-surface meta w-full"
              />
            </Field>
            <Field label="TITLE">
              <input
                value={draft.title}
                onChange={(e) => setDraft({ ...draft, title: e.target.value })}
                placeholder="TOPS & HOODIES"
                required
                className="border border-hc-border px-3 py-2 bg-hc-surface meta w-full"
              />
            </Field>
            <Field label="UNIT">
              <input
                value={draft.unit}
                onChange={(e) => setDraft({ ...draft, unit: e.target.value })}
                placeholder="cm"
                required
                className="border border-hc-border px-3 py-2 bg-hc-surface meta w-full"
              />
            </Field>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="label-xs text-hc-muted">TABLE</span>
              <div className="flex gap-2">
                <button type="button" onClick={addColumn} className="cta cta-outline text-[10px] px-3 py-1.5">
                  + COL
                </button>
                <button type="button" onClick={addRow} className="cta cta-outline text-[10px] px-3 py-1.5">
                  + ROW
                </button>
              </div>
            </div>
            <div className="overflow-x-auto border border-hc-border">
              <table className="w-full text-sm">
                <thead className="bg-hc-text text-hc-bg">
                  <tr>
                    {draft.headers.map((h, i) => (
                      <th key={i} className="p-1">
                        <div className="flex items-center gap-1">
                          <input
                            value={h}
                            onChange={(e) => setHeader(i, e.target.value)}
                            className="w-full bg-transparent text-hc-bg label-xs px-1 py-1 outline-none"
                          />
                          {draft.headers.length > 2 && (
                            <button
                              type="button"
                              onClick={() => removeColumn(i)}
                              className="text-hc-bg/60 hover:text-hc-danger"
                              title="Remove column"
                            >
                              <Trash2 size={12} />
                            </button>
                          )}
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {draft.rows.map((row, ri) => (
                    <tr key={ri} className="border-t border-hc-border">
                      {row.map((cell, ci) => (
                        <td key={ci} className="p-1">
                          <input
                            value={cell}
                            onChange={(e) => setCell(ri, ci, e.target.value)}
                            className="w-full bg-transparent font-mono text-xs px-1 py-1 outline-none"
                          />
                        </td>
                      ))}
                      <td className="p-1 w-8">
                        {draft.rows.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeRow(ri)}
                            className="text-hc-muted hover:text-hc-danger"
                            title="Remove row"
                          >
                            <Trash2 size={12} />
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <Field label="NOTE">
            <textarea
              value={draft.note}
              onChange={(e) => setDraft({ ...draft, note: e.target.value })}
              rows={2}
              className="border border-hc-border px-3 py-2 bg-hc-surface meta w-full"
              placeholder="Fit guidance shown under the table"
            />
          </Field>

          <div className="flex items-center justify-between pt-2 border-t border-hc-border">
            <button
              type="button"
              disabled={!draft.id}
              onClick={() => draft.id && confirm("Delete chart?") && remove.mutate(draft.id)}
              className="meta text-hc-muted hover:text-hc-danger disabled:opacity-30 inline-flex items-center gap-2"
            >
              <Trash2 size={12} /> DELETE
            </button>
            <button type="submit" disabled={save.isPending} className="cta cta-neon">
              <Save size={14} className="mr-1" /> {save.isPending ? "SAVING…" : "SAVE CHART"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="label-xs text-hc-muted">{label}</span>
      {children}
    </label>
  );
}
