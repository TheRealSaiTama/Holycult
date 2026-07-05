export function Rule({ label, sub, className = "" }: { label?: string; sub?: string; className?: string }) {
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      {label && <span className="section-num shrink-0">{label}</span>}
      <div className="flex-1 h-px bg-hc-border" />
      {sub && <span className="label-xs text-hc-muted shrink-0">{sub}</span>}
    </div>
  );
}
