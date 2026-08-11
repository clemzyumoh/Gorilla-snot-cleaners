"use client";

// NOTE: This is a lightweight DEMO auth store so the login-before-checkout
// flow works end to end during development and for showing your boss.
// It stores a fake "session" in localStorage — there is no real password
// checking or user database yet. Before going live, swap this for real
// authentication (e.g. Auth.js / NextAuth with a database, or Supabase Auth).

import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,

      login: (email) => {
        set({ user: { email } });
      },

      signup: (email, name) => {
        set({ user: { email, name } });
      },

      logout: () => set({ user: null }),
    }),
    { name: "gsc-auth" }
  )
);
