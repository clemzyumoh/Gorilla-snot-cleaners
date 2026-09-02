"use client";

import { useCurrencyStore } from "@/store/currencyStore";

// Small disclaimer shown wherever a converted price total appears —
// makes it clear the displayed currency is an estimate, since the actual
// Stripe charge always runs in USD until real multi-currency billing is
// built on the backend.
export default function CurrencyDisclaimer() {
  const currency = useCurrencyStore((s) => s.currency);

  if (currency === "USD") return null;

  return (
    <p className="mt-2 text-xs text-plum/50">
      Prices shown in {currency} are estimates. You&apos;ll be charged in USD at
      checkout.
    </p>
  );
}
