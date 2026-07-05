import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Ruler } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { sizeChartsQuery } from "@/lib/queries";
import type { SizeChart } from "@/lib/catalog.functions";

type Kind = "tops" | "bottoms";

export function inferSizeKind(category?: string | null): Kind {
  const c = (category ?? "").toLowerCase();
  if (c.includes("pant") || c.includes("cargo") || c.includes("short") || c.includes("bottom") || c.includes("jean")) return "bottoms";
  return "tops";
}

const FALLBACK: Record<Kind, SizeChart> = {
  tops: {
    id: "fallback-tops",
    kind: "tops",
    title: "TOPS & HOODIES",
    unit: "cm",
    headers: ["SIZE", "CHEST", "LENGTH", "SLEEVE"],
    rows: [
      ["S", "96", "70", "62"],
      ["M", "102", "72", "64"],
      ["L", "108", "74", "66"],
      ["XL", "114", "76", "68"],
    ],
    note: "Cut for a relaxed, drop-shoulder fit.",
  },
  bottoms: {
    id: "fallback-bottoms",
    kind: "bottoms",
    title: "BOTTOMS",
    unit: "cm",
    headers: ["SIZE", "WAIST", "HIP", "INSEAM"],
    rows: [
      ["S", "76", "94", "104"],
      ["M", "82", "100", "106"],
      ["L", "88", "106", "108"],
      ["XL", "94", "112", "110"],
    ],
    note: "Mid-rise, relaxed leg.",
  },
};

function Table({ headers, rows }: { headers: string[]; rows: string[][] }) {
  return (
    <div className="overflow-x-auto border border-hc-border">
      <table className="w-full text-sm">
        <thead className="bg-hc-text text-hc-bg">
          <tr>{headers.map((h) => <th key={h} className="text-left p-2.5 label-xs whitespace-nowrap">{h}</th>)}</tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className="border-t border-hc-border">
              {r.map((c, j) => (
                <td key={j} className={`p-2.5 whitespace-nowrap ${j === 0 ? "label-xs" : "font-mono text-xs tabular-nums"}`}>{c}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

interface Props {
  category?: string | null;
  trigger?: React.ReactNode;
}

export function SizeChartDialog({ category, trigger }: Props) {
  const kind = inferSizeKind(category);
  const { data: charts } = useQuery(sizeChartsQuery());
  const chart = (charts ?? []).find((c) => c.kind === kind) ?? FALLBACK[kind];

  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger ?? (
          <button
            type="button"
            className="caption text-hc-muted hover:text-hc-text inline-flex items-center gap-1 cursor-pointer transition-colors"
          >
            <Ruler size={10} /> SIZE CHART
          </button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-lg p-0 bg-hc-surface border border-hc-border rounded-none">
        <div className="tricolor-bar h-[3px] w-full" />
        <div className="p-5 sm:p-6">
          <DialogHeader>
            <DialogTitle className="display-md">{chart.title}</DialogTitle>
            <p className="meta text-hc-muted mt-1">MEASUREMENTS IN {chart.unit.toUpperCase()}</p>
          </DialogHeader>
          <div className="mt-5">
            <Table headers={chart.headers} rows={chart.rows} />
          </div>
          {chart.note && (
            <div className="mt-5 text-xs text-hc-muted leading-relaxed">{chart.note}</div>
          )}
          <div className="mt-4 pt-4 border-t border-hc-border flex items-center justify-between gap-3 flex-wrap">
            <span className="caption text-hc-muted">🇮🇳 CUT &amp; SEWN IN INDIA</span>
            <a href="/size-guide" className="caption text-hc-text underline underline-offset-4">FULL GUIDE →</a>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
