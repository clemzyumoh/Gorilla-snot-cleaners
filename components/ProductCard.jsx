"use client";

import Link from "next/link";
import { useCartStore } from "@/store/cartStore";
import { useCurrencyStore } from "@/store/currencyStore";
import { formatPrice } from "@/lib/currency";
import { useFavoritesStore } from "@/store/favoritesStore";
import { GiRoyalLove } from "react-icons/gi";

export default function ProductCard({ product }) {
  const addToCart = useCartStore((s) => s.addToCart);
  const currency = useCurrencyStore((s) => s.currency);
  const toggleFavorite = useFavoritesStore((s) => s.toggleFavorite);
  const isFavorite = useFavoritesStore((s) => s.isFavorite(product._id));

  return (
    <div className="group rounded-xl2 border relative border-plum/10 bg-white p-4 hoverEffect hover:-translate-y-1 hover:shadow-lg">
      <Link href={`/products/${product.slug}`}>
        <div className="relative flex aspect-square  items-center justify-center rounded-xl bg-cream">
          <span className="absolute left-3  top-3 rounded-full bg-sunshine px-2 py-1 text-xs font-700 text-plum">
            {product.tag}
          </span>
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full rounded-xl object-cover"
          />
        </div>
      </Link>

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
        <Link href={`/products/${product.slug}`}>
          <h3 className="font-display font-700 text-plum hover:text-coral">
            {product.name}
          </h3>
        </Link>
        <p className="mt-1 text-sm font-700 text-coral">
          {formatPrice(product.price, currency)}
        </p>
        <button
          onClick={() => addToCart(product, 1)}
          className="mt-3 w-full rounded-full bg-plum py-2 text-sm font-700 text-cream hoverEffect hover:bg-coral">
          Add to Cart
        </button>
      </div>
    </div>
  );
}

// "use client";

// import Link from "next/link";
// import { useCartStore } from "@/store/cartStore";
// import { useCurrencyStore } from "@/store/currencyStore";
// import { useFavoritesStore } from "@/store/favoritesStore";
// import { formatPrice } from "@/lib/currency";

// export default function ProductCard({ product }) {
//   const addToCart = useCartStore((s) => s.addToCart);
//   const currency = useCurrencyStore((s) => s.currency);
//   const isFavorite = useFavoritesStore((s) => s.isFavorite(product._id));
//   const toggleFavorite = useFavoritesStore((s) => s.toggleFavorite);

//   return (
//     <div className="group relative rounded-xl2 border border-plum/10 bg-white p-4 hoverEffect hover:-translate-y-1 hover:shadow-lg">
//       <Link href={`/products/${product.slug}`}>
//         <div className="relative flex aspect-square items-center justify-center rounded-xl bg-cream">
//           <span className="absolute left-3 top-3 rounded-full bg-sunshine px-2 py-1 text-xs font-700 text-plum">
//             {product.tag}
//           </span>
//           <img
//             src={product.image}
//             alt={product.name}
//             className="h-3/4 w-3/4 object-contain"
//           />
//         </div>
//       </Link>

//       {/* Favorite (heart) button — toggles this product in/out of favorites */}
//       <button
//         onClick={(e) => {
//           e.preventDefault();
//           toggleFavorite(product);
//         }}
//         aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
//         className={`absolute right-6 top-6 text-xl hoverEffect ${
//           isFavorite ? "text-coral" : "text-plum/30 hover:text-coral"
//         }`}
//       >
//         {isFavorite ? "♥" : "♡"}
//       </button>

//       <div className="mt-3">
//         <Link href={`/products/${product.slug}`}>
//           <h3 className="font-display font-700 text-plum hover:text-coral">
//             {product.name}
//           </h3>
//         </Link>
//         <p className="mt-1 text-sm font-700 text-coral">
//           {formatPrice(product.price, currency)}
//         </p>
//         <button
//           onClick={() => addToCart(product, 1)}
//           className="mt-3 w-full rounded-full bg-plum py-2 text-sm font-700 text-cream hoverEffect hover:bg-coral"
//         >
//           Add to Cart
//         </button>
//       </div>
//     </div>
//   );
// }
