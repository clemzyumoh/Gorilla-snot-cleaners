"use client";

import { create } from "zustand";

let idCounter = 0;

// Simple global toast queue — call useToastStore.getState().addToast(...)
// from anywhere (including outside React components, like API error
// handlers) instead of using alert().
export const useToastStore = create((set, get) => ({
  toasts: [],

  addToast: (message, type = "info") => {
    const id = ++idCounter;
    set({ toasts: [...get().toasts, { id, message, type }] });
    setTimeout(() => {
      set({ toasts: get().toasts.filter((t) => t.id !== id) });
    }, 3500);
  },

  removeToast: (id) => {
    set({ toasts: get().toasts.filter((t) => t.id !== id) });
  },
}));
