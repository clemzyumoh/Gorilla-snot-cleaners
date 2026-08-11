"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useCartStore } from "@/store/cartStore";

export default function OrderSuccessPage() {
  const clearCart = useCartStore((s) => s.clearCart);

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <div className="mx-auto max-w-xl px-5 py-24 text-center">
      <div className="text-5xl">🎉</div>
      <h1 className="mt-4 font-display text-3xl font-800 text-plum">
        Order confirmed!
      </h1>
      <p className="mt-3 text-plum/70">
        Thanks for shopping with Gorilla Snot Cleaners. A confirmation has
        been sent to your email.
      </p>
      <Link
        href="/shop"
        className="mt-8 inline-block rounded-full bg-coral px-6 py-3 font-display font-700 text-white hoverEffect hover:bg-plum"
      >
        Continue Shopping
      </Link>
    </div>
  );
}
