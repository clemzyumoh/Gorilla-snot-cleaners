"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/store/authStore";

// Kicks off the Supabase session check once when the app mounts.
// Rendered once in the root layout — renders nothing itself.
export default function AuthInitializer() {
  const init = useAuthStore((s) => s.init);

  useEffect(() => {
    init();
  }, [init]);

  return null;
}
