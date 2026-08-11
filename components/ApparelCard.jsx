"use client";

import Link from "next/link";
import { useCurrencyStore } from "@/store/currencyStore";
import { formatPrice } from "@/lib/currency";
import { useFavoritesStore } from "@/store/favoritesStore";
import { GiRoyalLove } from "react-icons/gi";

// Apparel needs a size/color chosen before it can go in the cart, so this
// card links to the product page instead of adding to cart directly
// (unlike ProductCard, which adds party supplies straight from the grid).
export default function ApparelCard({ product }) {
  const currency = useCurrencyStore((s) => s.currency);
const toggleFavorite = useFavoritesStore((s) => s.toggleFavorite);
const isFavorite = useFavoritesStore((s) => s.isFavorite(product._id));
  return (
    <Link
      href={`/apparel/${product.slug}`}
      className="group block rounded-xl2 border relative border-plum/10 bg-white p-4 hoverEffect hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="relative flex aspect-square items-center justify-center rounded-xl bg-cream">
        <span className="absolute left-3 top-3 rounded-full bg-grass px-2 py-1 text-xs font-700 text-white">
          {product.tag}
        </span>
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full aspect-square object-cover"
        />
      </div>

         {/* Favorite (heart) button — toggles this product in/out of favorites */}
            <button
              onClick={(e) => {
                e.preventDefault();
                toggleFavorite(product);
              }}
              aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
              className={`absolute right-6 bottom-20 text-xl hoverEffect ${
                isFavorite ? "text-coral" : "text-plum hover:text-coral"
              }`}>
              {isFavorite ? (
                <GiRoyalLove className="text-2xl text-coral" />
              ) : (
                <GiRoyalLove className="text-2xl" />
              )}
            </button>
      <div className="mt-3">
        <h3 className="font-display font-700 text-plum group-hover:text-coral">
          {product.name}
        </h3>
        <p className="mt-1 text-sm font-700 text-coral">
          {formatPrice(product.price, currency)}
        </p>
        <span className="mt-3 block w-full rounded-full bg-plum py-2 text-center text-sm font-700 text-cream hoverEffect group-hover:bg-coral">
          Shop Now
        </span>
      </div>
    </Link>
  );
}
