const BARS = [3, 1, 2, 4, 1, 3, 2, 1, 4, 2, 1, 3, 1, 2, 4, 1, 2, 3, 4, 1, 1, 3, 2, 4, 1, 3];

export function Barcode() {
  return (
    <div className="barcode-strip">
      {BARS.map((w, i) => <div key={i} className="barcode-bar" style={{ width: w }} />)}
    </div>
  );
}
