"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuthStore } from "@/store/authStore";

export default function AccountPage() {
  const router = useRouter();
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);

  useEffect(() => {
    if (!user) router.push("/login");
  }, [user, router]);

  if (!user) return null;

  return (
    <div className="mx-auto max-w-xl px-5 py-16">
      <h1 className="font-display text-2xl font-800 text-plum">My Account</h1>
      <p className="mt-2 text-plum/70">Signed in as {user.email}</p>
      <button
        onClick={() => {
          logout();
          router.push("/");
        }}
        className="mt-6 rounded-full border border-plum/20 px-6 py-2 font-700 text-plum hover:border-coral hover:text-coral"
      >
        Sign Out
      </button>
    </div>
  );
}
