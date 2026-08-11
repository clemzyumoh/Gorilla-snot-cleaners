"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import { useCartStore } from "@/store/cartStore";
import { useCurrencyStore } from "@/store/currencyStore";
import { formatPrice } from "@/lib/currency";

export default function CheckoutPage() {
  const router = useRouter();
  const user = useAuthStore((s) => s.user);
  const items = useCartStore((s) => s.items);
  const totalPrice = useCartStore((s) => s.totalPrice());
  const currency = useCurrencyStore((s) => s.currency);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", address: "", phone: "" });

  useEffect(() => {
    // Login-before-checkout gate: send unauthenticated users to /login
    // and bring them straight back here afterward.
    if (!user) {
      router.push("/login?redirect=/checkout");
    }
  }, [user, router]);

  if (!user) return null;

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-xl px-5 py-20 text-center">
        <p className="text-plum/70">Your cart is empty.</p>
      </div>
    );
  }

  const handleCheckout = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items, customer: form, email: user.email }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert("Something went wrong starting checkout. Please try again.");
        setLoading(false);
      }
    } catch (err) {
      alert("Could not reach payment server. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-xl px-5 py-12">
      <h1 className="font-display text-3xl font-800 text-plum">Checkout</h1>
      <p className="mt-2 text-sm text-plum/60">
        Signed in as {user.email}
      </p>

      <form onSubmit={handleCheckout} className="mt-8 space-y-4">
        <div>
          <label className="text-sm font-700 text-plum">Full Name</label>
          <input
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="mt-1 w-full rounded-lg border border-plum/20 px-4 py-2 outline-none focus:border-coral"
          />
        </div>
        <div>
          <label className="text-sm font-700 text-plum">Shipping Address</label>
          <textarea
            required
            value={form.address}
            onChange={(e) => setForm({ ...form, address: e.target.value })}
            className="mt-1 w-full rounded-lg border border-plum/20 px-4 py-2 outline-none focus:border-coral"
            rows={3}
          />
        </div>
        <div>
          <label className="text-sm font-700 text-plum">Phone</label>
          <input
            required
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className="mt-1 w-full rounded-lg border border-plum/20 px-4 py-2 outline-none focus:border-coral"
          />
        </div>

        <div className="flex items-center justify-between border-t border-plum/10 pt-4">
          <span className="font-display text-lg font-800 text-plum">
            Total: {formatPrice(totalPrice, currency)}
          </span>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-full bg-plum py-3 font-display font-700 text-cream hoverEffect hover:bg-coral disabled:opacity-60"
        >
          {loading ? "Redirecting to payment..." : "Pay with Stripe"}
        </button>
      </form>
    </div>
  );
}
