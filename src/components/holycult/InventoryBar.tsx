export function InventoryBar({ pct }: { pct: number }) {
  return (
    <div className={`inventory-bar ${pct < 15 ? "inventory-low" : ""}`}>
      <div className="inventory-fill" style={{ width: `${Math.max(pct, 3)}%` }} />
    </div>
  );
}
