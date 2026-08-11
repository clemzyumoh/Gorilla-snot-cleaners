"use client";

import { useState } from "react";
import { useCartStore } from "@/store/cartStore";
import { useCurrencyStore } from "@/store/currencyStore";
import { formatPrice } from "@/lib/currency";

export default function ProductDetailClient({ product }) {
  const [qty, setQty] = useState(1);
  const addToCart = useCartStore((s) => s.addToCart);
  const currency = useCurrencyStore((s) => s.currency);

  return (
    <div className="mx-auto grid grid-cols-1 max-w-6xl  gap-10 px-5 py-12 md:grid-cols-2">
      <div className="flex aspect-square items-center justify-center rounded-xl2 bg-cream">
        <img src={product.image} alt={product.name} className="h-3/4 w-3/4 object-contain" />
      </div>
      <div>
        <span className="rounded-full bg-sunshine px-2 py-1 text-xs font-700 text-plum">
          {product.tag}
        </span>
        <h1 className="mt-3 font-display text-3xl font-800 text-plum">
          {product.name}
        </h1>
        <p className="mt-2 text-2xl font-700 text-coral">
          {formatPrice(product.price, currency)}
        </p>
        <p className="mt-4 text-plum/70">{product.description}</p>

        <div className="mt-6 flex items-center gap-3">
          <div className="flex items-center rounded-full border border-plum/20">
            <button
              onClick={() => setQty((q) => Math.max(1, q - 1))}
              className="px-4 py-2 text-plum"
            >
              −
            </button>
            <span className="px-2 font-700">{qty}</span>
            <button
              onClick={() => setQty((q) => q + 1)}
              className="px-4 py-2 text-plum"
            >
              +
            </button>
          </div>
          <button
            onClick={() => addToCart(product, qty)}
            className="flex-1 rounded-full bg-plum py-3 font-display font-700 text-cream hoverEffect hover:bg-coral"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
