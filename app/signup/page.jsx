"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuthStore } from "@/store/authStore";

export default function SignUpPage() {
  const router = useRouter();
  const signup = useAuthStore((s) => s.signup);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Demo-only: real auth needs a backend + password hashing/storage.
    signup(email, name);
    router.push("/account");
  };

  return (
    <div className="mx-auto max-w-sm px-5 py-20">
      <h1 className="font-display text-2xl font-800 text-plum">
        Create Account
      </h1>
      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <input
          required
          placeholder="Full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded-lg border border-plum/20 px-4 py-2 outline-none focus:border-coral"
        />
        <input
          type="email"
          required
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-lg border border-plum/20 px-4 py-2 outline-none focus:border-coral"
        />
        <input
          type="password"
          required
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded-lg border border-plum/20 px-4 py-2 outline-none focus:border-coral"
        />
        <button
          type="submit"
          className="w-full rounded-full bg-plum py-3 font-display font-700 text-cream hoverEffect hover:bg-coral"
        >
          Create Account
        </button>
      </form>
      <p className="mt-4 text-sm text-plum/60">
        Already have an account?{" "}
        <Link href="/login" className="font-700 text-coral hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  );
}
