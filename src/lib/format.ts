const SYMBOL: Record<string, string> = { USD: "$", INR: "₹", EUR: "€", GBP: "£" };

export function currencySymbol(currency = "INR") {
  return SYMBOL[currency.toUpperCase()] ?? currency.toUpperCase() + " ";
}

export function formatPrice(cents: number, currency = "INR"): string {
  try {
    return new Intl.NumberFormat(currency === "INR" ? "en-IN" : "en-US", {
      style: "currency",
      currency,
      minimumFractionDigits: cents % 100 === 0 ? 0 : 2,
      maximumFractionDigits: 2,
    }).format(cents / 100);
  } catch {
    return `${currencySymbol(currency)}${(cents / 100).toFixed(cents % 100 === 0 ? 0 : 2)}`;
  }
}

export function formatPriceShort(cents: number, currency = "INR"): string {
  const v = (cents / 100).toFixed(cents % 100 === 0 ? 0 : 2);
  const withCommas = currency === "INR"
    ? Number(v).toLocaleString("en-IN", { maximumFractionDigits: 2, minimumFractionDigits: cents % 100 === 0 ? 0 : 2 })
    : v;
  return `${currencySymbol(currency)}${withCommas}`;
}

export function generateRefCode(): string {
  const stamp = Date.now().toString(36).toUpperCase().slice(-6);
  const rand = Math.random().toString(36).toUpperCase().slice(2, 6);
  return `HC-TX-${stamp}${rand}`;
}
