// "use client";

// import { useState } from "react";
// import { useRouter, useSearchParams } from "next/navigation";
// import Link from "next/link";
// import { useAuthStore } from "@/store/authStore";

// export default function LoginForm() {
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const login = useAuthStore((s) => s.login);
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Demo-only: real auth needs a backend + password check.
//     login(email);
//     const redirect = searchParams.get("redirect") || "/account";
//     router.push(redirect);
//   };

//   return (
//     <div className="mx-auto max-w-sm px-5 py-20">
//       <h1 className="font-display text-2xl font-800 text-plum">Sign In</h1>
//       <p className="mt-2 text-sm text-plum/60">
//         Sign in to complete your order.
//       </p>
//       <form onSubmit={handleSubmit} className="mt-6 space-y-4">
//         <input
//           type="email"
//           required
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           className="w-full rounded-lg border border-plum/20 px-4 py-2 outline-none focus:border-coral"
//         />
//         <input
//           type="password"
//           required
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           className="w-full rounded-lg border border-plum/20 px-4 py-2 outline-none focus:border-coral"
//         />
//         <button
//           type="submit"
//           className="w-full rounded-full bg-plum py-3 font-display font-700 text-cream hoverEffect hover:bg-coral"
//         >
//           Sign In
//         </button>
//       </form>
//       <p className="mt-4 text-sm text-plum/60">
//         No account?{" "}
//         <Link href="/signup" className="font-700 text-coral hover:underline">
//           Sign up
//         </Link>
//       </p>
//     </div>
//   );
// }
"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useAuthStore } from "@/store/authStore";
import { useEffect } from "react";

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/account"; 
  const login = useAuthStore((s) => s.login);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

const user = useAuthStore((s) => s.user);

useEffect(() => {
  if (user) router.push(redirect);
}, [user, redirect, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(email, password);
     // const redirect = searchParams.get("redirect") || "/account";
      router.push(redirect);
    } catch (err) {
      setError(
        err.message || "Could not sign in. Check your email and password.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-sm px-5 py-20">
      <h1 className="font-display text-2xl font-800 text-plum">Sign In</h1>
      <p className="mt-2 text-sm text-plum/60">
        Sign in to complete your order.
      </p>
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
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded-lg border border-plum/20 px-4 py-2 outline-none focus:border-coral"
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-full bg-plum py-3 font-display font-700 text-cream hoverEffect hover:bg-coral disabled:opacity-60">
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </form>
      <p className="mt-4 text-sm text-plum/60">
        No account?{" "}
        {/* <Link href="/signup" className="font-700 text-coral hover:underline">
          Sign up
        </Link> */}
        <Link
          href={`/signup?redirect=${encodeURIComponent(redirect)}`}
          className="font-700 text-coral hover:underline">
          Sign up
        </Link>
      </p>
    </div>
  );
}
