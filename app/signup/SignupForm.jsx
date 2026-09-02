"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useAuthStore } from "@/store/authStore";
import { useEffect } from "react";

export default function SignupForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/account";

  const signup = useAuthStore((s) => s.signup);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [checkEmail, setCheckEmail] = useState(false);


  const user = useAuthStore((s) => s.user);

useEffect(() => {
  if (user) router.push(redirect);
}, [user, redirect, router]);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await signup(email, password);
      setCheckEmail(true);
    } catch (err) {
      setError(err.message || "Could not create account.");
    } finally {
      setLoading(false);
    }
  };

  if (checkEmail) {
    return (
      <div className="mx-auto max-w-sm px-5 py-20 text-center">
        <h1 className="font-display text-2xl font-800 text-plum">
          Check your email
        </h1>
        <p className="mt-3 text-plum/70">
          We sent a confirmation link to {email}. Confirm it, then sign in.
        </p>
        <Link
          href={`/login?redirect=${encodeURIComponent(redirect)}`}
          className="mt-6 inline-block rounded-full bg-plum px-6 py-3 font-display font-700 text-cream hoverEffect hover:bg-coral">
          Go to Sign In
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-sm px-5 py-20">
      <h1 className="font-display text-2xl font-800 text-plum">
        Create Account
      </h1>
      {error && (
        <p className="mt-4 rounded-lg bg-coral/10 px-3 py-2 text-sm text-coral">
          {error}
        </p>
      )}
      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
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
          minLength={6}
          placeholder="Password (min 6 characters)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded-lg border border-plum/20 px-4 py-2 outline-none focus:border-coral"
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-full bg-plum py-3 font-display font-700 text-cream hoverEffect hover:bg-coral disabled:opacity-60">
          {loading ? "Creating account..." : "Create Account"}
        </button>
      </form>
      <p className="mt-4 text-sm text-plum/60">
        Already have an account?{" "}
        <Link
          href={`/login?redirect=${encodeURIComponent(redirect)}`}
          className="font-700 text-coral hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  );
}
