
"use client";

import { useState, useRef, useEffect } from "react";
import { useCurrencyStore } from "@/store/currencyStore";
import { currencies } from "@/lib/currency";
import { IoMdArrowDropdown } from "react-icons/io";

// Flag images from flagcdn.com (free, no API key needed).
// Country codes: US, Nigeria, UK, and "eu" for the EU flag.
const flagCodes = {
  USD: "us",
  NGN: "ng",
  GBP: "gb",
  EUR: "eu",
};

export default function CurrencySwitcher() {
  const currency = useCurrencyStore((s) => s.currency);
  const setCurrency = useCurrencyStore((s) => s.setCurrency);
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label="Currency"
        className="flex items-center gap-2 rounded-full border border-plum/20 bg-white pl-3 pr-4 py-2 text-xs font-700 text-plum">
        <img
          src={`https://flagcdn.com/24x18/${flagCodes[currency]}.png`}
          alt={currency}
          className="h-3 w-4 rounded-sm object-cover"
        />
        {currency}
        <span className="text-plum/60">
          <IoMdArrowDropdown className="text-xl" />
        </span>
      </button>

      {open && (
        <div className="absolute right-0 top-full z-50 mt-2 w-32 overflow-hidden rounded-xl border border-plum/10 bg-white shadow-lg">
          {Object.keys(currencies).map((code) => (
            <button
              key={code}
              type="button"
              onClick={() => {
                setCurrency(code);
                setOpen(false);
              }}
              className="flex w-full items-center gap-2 px-3 py-2 text-left text-xs font-700 text-plum hover:bg-cream">
              <img
                src={`https://flagcdn.com/24x18/${flagCodes[code]}.png`}
                alt={code}
                className="h-3 w-4 rounded-sm object-cover"
              />
              {code}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}