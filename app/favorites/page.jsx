// export const metadata = { title: "Favorites | Gorilla Snot Cleaners" };

// export default function FavoritesPage() {
//   return (
//     <div className="mx-auto max-w-xl px-5 py-20 text-center">
//       <h1 className="font-display text-2xl font-800 text-plum">Favorites</h1>
//       <p className="mt-3 text-plum/70">
//         You haven&apos;t saved any products yet. Browse the shop and tap the
//         heart icon on a product to save it here.
//       </p>
//     </div>
//   );
// }


"use client";

import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { useFavoritesStore } from "@/store/favoritesStore";

export default function FavoritesPage() {
  const items = useFavoritesStore((s) => s.items);

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-xl px-5 py-20 text-center">
        <h1 className="font-display text-2xl font-800 text-plum">Favorites</h1>
        <p className="mt-3 text-plum/70">
          You haven&apos;t saved any products yet. Tap the heart icon on a
          product to save it here.
        </p>
        <Link
          href="/shop"
          className="mt-6 inline-block rounded-full bg-coral px-6 py-3 font-display font-700 text-white hoverEffect hover:bg-plum">
          Shop Party Supplies
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-5 py-12">
      <h1 className="font-display text-3xl font-800 text-plum">Favorites</h1>
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-5 lg:grid-cols-4">
        {items.map((p) => (
          <ProductCard key={p._id} product={p} />
        ))}
      </div>
    </div>
  );
}
