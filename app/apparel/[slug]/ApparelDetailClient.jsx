

"use client";

import { useState } from "react";
import { useCartStore } from "@/store/cartStore";
import { useCurrencyStore } from "@/store/currencyStore";
import { formatPrice } from "@/lib/currency";

export default function ApparelDetailClient({ product }) {
  const [size, setSize] = useState(product.sizes[0]);
  const [color, setColor] = useState(product.colors[0].name);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const addToCart = useCartStore((s) => s.addToCart);
  const currency = useCurrencyStore((s) => s.currency);

  // The photo shown (and saved to the cart) matches whichever color is
  // currently selected — falls back to the product's default image if
  // that color somehow has no image set.
  const selectedColor = product.colors.find((c) => c.name === color);
  const displayImage = selectedColor?.image || product.image;

  const handleAddToCart = () => {
    // Each size/color combo is treated as its own cart line item —
    // the _id is made unique per variant so quantity updates and removals
    // in the cart only affect that specific size/color.
    const variant = {
      _id: `${product._id}-${size}-${color}`,
      name: `${product.name} (${size}, ${color})`,
      price: product.price,
      image: displayImage,
      size,
      color,
    };
    addToCart(variant, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="mx-auto grid max-w-6xl gap-10 px-5 py-12 md:grid-cols-2">
      <div className="flex aspect-square items-center justify-center rounded-xl2 bg-cream">
        <img
          src={displayImage}
          alt={`${product.name} — ${color}`}
          className="h-3/4 w-3/4 object-contain"
        />
      </div>

      <div>
        <span className="rounded-full bg-grass px-2 py-1 text-xs font-700 text-white">
          {product.tag}
        </span>
        <h1 className="mt-3 font-display text-3xl font-800 text-plum">
          {product.name}
        </h1>
        <p className="mt-2 text-2xl font-700 text-coral">
          {formatPrice(product.price, currency)}
        </p>
        <p className="mt-4 text-plum/70">{product.description}</p>

        {/* Size selector */}
        <div className="mt-6">
          <p className="text-sm font-700 text-plum">Size</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {product.sizes.map((s) => (
              <button
                key={s}
                onClick={() => setSize(s)}
                className={`rounded-full border px-4 py-2 text-sm font-700 hoverEffect ${
                  size === s
                    ? "border-plum bg-plum text-cream"
                    : "border-plum/20 text-plum hover:border-coral"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Color selector */}
        <div className="mt-6">
          <p className="text-sm font-700 text-plum">
            Color: <span className="font-400 text-plum/70">{color}</span>
          </p>
          <div className="mt-2 flex gap-2">
            {product.colors.map((c) => (
              <button
                key={c.name}
                onClick={() => setColor(c.name)}
                aria-label={c.name}
                className={`h-8 w-8 rounded-full border-2 hoverEffect ${
                  color === c.name ? "border-coral" : "border-plum/20"
                }`}
                style={{ backgroundColor: c.hex }}
              />
            ))}
          </div>
        </div>

        {/* Quantity + Add to cart */}
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
            onClick={handleAddToCart}
            className="flex-1 rounded-full bg-plum py-3 font-display font-700 text-cream hoverEffect hover:bg-coral"
          >
            {added ? "Added ✓" : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
}
