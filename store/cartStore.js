"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],

      addToCart: (product, quantity = 1) => {
        const items = get().items;
        const existing = items.find((i) => i._id === product._id);
        if (existing) {
          set({
            items: items.map((i) =>
              i._id === product._id
                ? { ...i, quantity: i.quantity + quantity }
                : i
            ),
          });
        } else {
          set({ items: [...items, { ...product, quantity }] });
        }
      },

      increaseQuantity: (id) => {
        set({
          items: get().items.map((i) =>
            i._id === id ? { ...i, quantity: i.quantity + 1 } : i
          ),
        });
      },

      decreaseQuantity: (id) => {
        set({
          items: get().items.map((i) =>
            i._id === id
              ? { ...i, quantity: Math.max(1, i.quantity - 1) }
              : i
          ),
        });
      },

      removeItem: (id) => {
        set({ items: get().items.filter((i) => i._id !== id) });
      },

      clearCart: () => set({ items: [] }),

      totalItems: () =>
        get().items.reduce((sum, i) => sum + i.quantity, 0),

      totalPrice: () =>
        get().items.reduce((sum, i) => sum + i.quantity * i.price, 0),
    }),
    { name: "gsc-cart" }
  )
);
