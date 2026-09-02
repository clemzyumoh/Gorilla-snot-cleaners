
// "use client";

// import { create } from "zustand";
// import { supabase } from "@/lib/supabaseClient";

// // Real authentication via Supabase — replaces the old demo/localStorage
// // auth store. `user` reflects the actual logged-in Supabase session.
// export const useAuthStore = create((set) => ({
//   user: null,
//   loading: true,

//   // Call once, e.g. in a top-level layout/provider, to load the current
//   // session on page load and keep `user` in sync as it changes.
//   init: () => {
//     supabase.auth.getSession().then(({ data: { session } }) => {
//       set({ user: session?.user ?? null, loading: false });
//     });

//     supabase.auth.onAuthStateChange((_event, session) => {
//       set({ user: session?.user ?? null, loading: false });
//     });
//   },

//   login: async (email, password) => {
//     const { data, error } = await supabase.auth.signInWithPassword({
//       email,
//       password,
//     });
//     if (error) throw error;
//     set({ user: data.user });
//   },

//   signup: async (email, password) => {
//     const { data, error } = await supabase.auth.signUp({ email, password });
//     if (error) throw error;
//     set({ user: data.user });
//   },

//   logout: async () => {
//     await supabase.auth.signOut();
//     set({ user: null });
//   },
// }));

"use client";

import { create } from "zustand";
import { supabase } from "@/lib/supabaseClient";

async function fetchProfile(userId) {
  const { data } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();
  return data;
}

export const useAuthStore = create((set, get) => ({
  user: null,
  profile: null,
  loading: true,

  init: () => {
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      const user = session?.user ?? null;
      const profile = user ? await fetchProfile(user.id) : null;
      set({ user, profile, loading: false });
    });

    supabase.auth.onAuthStateChange(async (_event, session) => {
      const user = session?.user ?? null;
      const profile = user ? await fetchProfile(user.id) : null;
      set({ user, profile, loading: false });
    });
  },

  login: async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    const profile = await fetchProfile(data.user.id);
    set({ user: data.user, profile });
  },

  signup: async (email, password) => {
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) throw error;
    set({ user: data.user });
  },

  logout: async () => {
    await supabase.auth.signOut();
    set({ user: null, profile: null });
  },

  // Call after editing the profile so the header/account page reflect
  // the change immediately without a full page reload.
  refreshProfile: async () => {
    const user = get().user;
    if (!user) return;
    const profile = await fetchProfile(user.id);
    set({ profile });
  },
}));
