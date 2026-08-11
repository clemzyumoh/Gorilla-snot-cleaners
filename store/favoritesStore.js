"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useFavoritesStore = create(
  persist(
    (set, get) => ({
      items: [],

      isFavorite: (id) => get().items.some((i) => i._id === id),

      toggleFavorite: (product) => {
        const items = get().items;
        const exists = items.some((i) => i._id === product._id);
        if (exists) {
          set({ items: items.filter((i) => i._id !== product._id) });
        } else {
          set({ items: [...items, product] });
        }
      },
    }),
    { name: "gsc-favorites" },
  ),
);
