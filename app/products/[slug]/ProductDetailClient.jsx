
// "use client";

// import { useState, useEffect } from "react";
// import { useCartStore } from "@/store/cartStore";
// import { useCurrencyStore } from "@/store/currencyStore";
// import { useToastStore } from "@/store/toastStore";
// import { formatPrice } from "@/lib/currency";
// import { getStock } from "@/lib/inventory";
// import Breadcrumbs from "@/components/Breadcrumbs";

// export default function ProductDetailClient({ product }) {
//   const [qty, setQty] = useState(1);
//   const [stock, setStock] = useState(null);
//   const addToCart = useCartStore((s) => s.addToCart);
//   const currency = useCurrencyStore((s) => s.currency);
//   const showToast = useToastStore((s) => s.showToast);

//   useEffect(() => {
//     getStock(product._id).then(setStock);
//   }, [product._id]);

//   const outOfStock = stock !== null && stock <= 0;
//   const lowStock = stock !== null && stock > 0 && stock <= 5;

//   const handleAdd = () => {
//     addToCart(product, qty);
//     showToast(`${product.name} added to cart`, "success");
//   };

//   return (
//     <div>
//       <Breadcrumbs
//         items={[
//           { label: "All Products", href: "/shop" },
//           { label: product.name },
//         ]}
//       />
//       <div className="mx-auto grid max-w-6xl gap-10 px-5 py-12 md:grid-cols-2">
//         <div className="flex aspect-square items-center justify-center rounded-xl2 bg-cream">
//           <img
//             src={product.image}
//             alt={product.name}
//             className="h-3/4 w-3/4 object-contain"
//           />
//         </div>
//         <div>
//           <span className="rounded-full bg-sunshine px-2 py-1 text-xs font-700 text-plum">
//             {product.tag}
//           </span>
//           <h1 className="mt-3 font-display text-3xl font-800 text-plum">
//             {product.name}
//           </h1>
//           <p className="mt-2 text-2xl font-700 text-coral">
//             {formatPrice(product.price, currency)}
//           </p>
//           <p className="mt-4 text-plum/70">{product.description}</p>

//           {stock === null ? (
//             <div className="mt-4 h-4 w-32 animate-pulse rounded bg-plum/10" />
//           ) : (
//             <>
//               {outOfStock && (
//                 <p className="mt-4 font-700 text-coral">Out of stock</p>
//               )}
//               {lowStock && (
//                 <p className="mt-4 text-sm font-700 text-coral">
//                   Only {stock} left in stock
//                 </p>
//               )}
//             </>
//           )}

//           <div className="mt-6 flex items-center gap-3">
//             <div className="flex items-center rounded-full border border-plum/20">
//               <button
//                 onClick={() => setQty((q) => Math.max(1, q - 1))}
//                 className="px-4 py-2 text-plum">
//                 −
//               </button>
//               <span className="px-2 font-700">{qty}</span>
//               <button
//                 onClick={() =>
//                   setQty((q) => (stock ? Math.min(stock, q + 1) : q + 1))
//                 }
//                 className="px-4 py-2 text-plum">
//                 +
//               </button>
//             </div>
//             <button
//               onClick={handleAdd}
//               disabled={outOfStock}
//               className="flex-1 rounded-full bg-plum py-3 font-display font-700 text-cream hoverEffect hover:bg-coral disabled:cursor-not-allowed disabled:opacity-50">
//               {outOfStock ? "Out of Stock" : "Add to Cart"}
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import { useState, useEffect } from "react";
import { useCartStore } from "@/store/cartStore";
import { useCurrencyStore } from "@/store/currencyStore";
import { formatPrice } from "@/lib/currency";
import { getStock } from "@/lib/inventory";
import { useToastStore } from "@/store/toastStore";
import Breadcrumbs from "@/components/Breadcrumbs";
import Skeleton from "@/components/Skeleton";

export default function ProductDetailClient({ product }) {
  const [qty, setQty] = useState(1);
  const [stock, setStock] = useState(null);
  const addToCart = useCartStore((s) => s.addToCart);
  const currency = useCurrencyStore((s) => s.currency);
  const addToast = useToastStore((s) => s.addToast);

  useEffect(() => {
    getStock(product._id).then(setStock);
  }, [product._id]);

  const stockLoaded = stock !== null;
  const outOfStock = stockLoaded && stock <= 0;
  const lowStock = stockLoaded && stock > 0 && stock <= 5;

  const handleAddToCart = () => {
    addToCart(product, qty);
    addToast(`${product.name} added to cart.`, "success");
  };

  return (
    <div className="mx-auto max-w-6xl px-5 pt-8">
      <Breadcrumbs
        items={[
          { label: "All Products", href: "/shop" },
          { label: product.name },
        ]}
      />

      <div className="grid gap-10 pb-12 md:grid-cols-2">
        <div className="flex aspect-square items-center justify-center rounded-xl2 bg-cream">
          <img
            src={product.image}
            alt={product.name}
            className="h-3/4 w-3/4 object-contain"
          />
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

          {!stockLoaded ? (
            <Skeleton className="mt-4 h-5 w-32" />
          ) : (
            <>
              {outOfStock && (
                <p className="mt-4 font-700 text-coral">Out of stock</p>
              )}
              {lowStock && (
                <p className="mt-4 text-sm font-700 text-coral">
                  Only {stock} left in stock
                </p>
              )}
            </>
          )}

          <div className="mt-6 flex items-center gap-3">
            <div className="flex items-center rounded-full border border-plum/20">
              <button
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="px-4 py-2 text-plum">
                −
              </button>
              <span className="px-2 font-700">{qty}</span>
              <button
                onClick={() =>
                  setQty((q) => (stock ? Math.min(stock, q + 1) : q + 1))
                }
                className="px-4 py-2 text-plum">
                +
              </button>
            </div>
            <button
              onClick={handleAddToCart}
              disabled={outOfStock}
              className="flex-1 rounded-full bg-plum py-3 font-display font-700 text-cream hoverEffect hover:bg-coral disabled:cursor-not-allowed disabled:opacity-50">
              {outOfStock ? "Out of Stock" : "Add to Cart"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
