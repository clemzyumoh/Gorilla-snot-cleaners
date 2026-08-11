"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCurrencyStore = create(
  persist(
    (set) => ({
      currency: "USD",
      setCurrency: (code) => set({ currency: code }),
    }),
    { name: "gsc-currency" }
  )
);
