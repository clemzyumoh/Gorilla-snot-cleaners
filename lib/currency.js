// Simple display-currency conversion.
// Prices in lib/products.js are stored in USD (the Stripe charge currency).
// This only affects what's *displayed* — the actual Stripe charge stays in USD
// unless you wire up real multi-currency Stripe sessions later.

export const currencies = {
  USD: { symbol: "$", rate: 1 },
  NGN: { symbol: "₦", rate: 1550 },
  GBP: { symbol: "£", rate: 0.78 },
  EUR: { symbol: "€", rate: 0.92 },
};

export function formatPrice(usdAmount, currencyCode = "USD") {
  const c = currencies[currencyCode] || currencies.USD;
  const converted = usdAmount * c.rate;
  return `${c.symbol}${converted.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

// Best-effort guess at the visitor's currency from browser locale.
// This is a fallback for when you don't want to call an IP-geolocation API.
// For real IP-based detection, call a service like ipapi.co from a server
// route and set the result in a cookie.
export function guessCurrencyFromLocale() {
  if (typeof navigator === "undefined") return "USD";
  const locale = navigator.language || "en-US";
  if (locale.includes("NG")) return "NGN";
  if (locale.includes("GB")) return "GBP";
  if (locale.startsWith("de") || locale.startsWith("fr") || locale.includes("EU"))
    return "EUR";
  return "USD";
}
