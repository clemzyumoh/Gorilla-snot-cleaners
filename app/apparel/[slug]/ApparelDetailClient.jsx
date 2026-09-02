
// "use client";

// import { useState, useEffect } from "react";
// import { useCartStore } from "@/store/cartStore";
// import { useCurrencyStore } from "@/store/currencyStore";
// import { formatPrice } from "@/lib/currency";
// import { getStock } from "@/lib/inventory";

// export default function ApparelDetailClient({ product }) {
//   const [size, setSize] = useState(product.sizes[0]);
//   const [color, setColor] = useState(product.colors[0].name);
//   const [qty, setQty] = useState(1);
//   const [added, setAdded] = useState(false);
//   const [stock, setStock] = useState(null);

//   const addToCart = useCartStore((s) => s.addToCart);
//   const currency = useCurrencyStore((s) => s.currency);

//   useEffect(() => {
//     // Stock is tracked per base product, not per size/color combo —
//     // update this if you want per-variant stock tracking later.
//     getStock(product._id).then(setStock);
//   }, [product._id]);

//   const outOfStock = stock !== null && stock <= 0;

//   const selectedColor = product.colors.find((c) => c.name === color);
//   const displayImage = selectedColor?.image || product.image;

//   const handleAddToCart = () => {
//     // const variant = {
//     //   _id: `${product._id}-${size}-${color}`,
//     //   baseId: product._id,
//     //   name: `${product.name} (${size}, ${color})`,
//     //   price: product.price,
//     //   image: displayImage,
//     //   size,
//     //   color,
//     // };
//     const variant = {
//       _id: `${product._id}-${size}-${color}`,
//       baseId: product._id,
//       name: `${product.name} (${size}, ${color})`,
//       price: product.price,
//       image: displayImage,
//       size,
//       color,
//     };
//     addToCart(variant, qty);
//     setAdded(true);
//     setTimeout(() => setAdded(false), 1500);
//   };

//   return (
//     <div className="mx-auto grid max-w-6xl gap-10 px-5 py-12 md:grid-cols-2">
//       <div className="flex aspect-square items-center justify-center rounded-xl2 bg-cream">
//         <img
//           src={displayImage}
//           alt={`${product.name} — ${color}`}
//           className="h-3/4 w-3/4 object-contain"
//         />
//       </div>

//       <div>
//         <span className="rounded-full bg-grass px-2 py-1 text-xs font-700 text-white">
//           {product.tag}
//         </span>
//         <h1 className="mt-3 font-display text-3xl font-800 text-plum">
//           {product.name}
//         </h1>
//         <p className="mt-2 text-2xl font-700 text-coral">
//           {formatPrice(product.price, currency)}
//         </p>
//         <p className="mt-4 text-plum/70">{product.description}</p>

//         {outOfStock && <p className="mt-4 font-700 text-coral">Out of stock</p>}

//         <div className="mt-6">
//           <p className="text-sm font-700 text-plum">Size</p>
//           <div className="mt-2 flex flex-wrap gap-2">
//             {product.sizes.map((s) => (
//               <button
//                 key={s}
//                 onClick={() => setSize(s)}
//                 className={`rounded-full border px-4 py-2 text-sm font-700 hoverEffect ${
//                   size === s
//                     ? "border-plum bg-plum text-cream"
//                     : "border-plum/20 text-plum hover:border-coral"
//                 }`}>
//                 {s}
//               </button>
//             ))}
//           </div>
//         </div>

//         <div className="mt-6">
//           <p className="text-sm font-700 text-plum">
//             Color: <span className="font-400 text-plum/70">{color}</span>
//           </p>
//           <div className="mt-2 flex gap-2">
//             {product.colors.map((c) => (
//               <button
//                 key={c.name}
//                 onClick={() => setColor(c.name)}
//                 aria-label={c.name}
//                 className={`h-8 w-8 rounded-full border-2 hoverEffect ${
//                   color === c.name ? "border-coral" : "border-plum/20"
//                 }`}
//                 style={{ backgroundColor: c.hex }}
//               />
//             ))}
//           </div>
//         </div>

//         <div className="mt-6 flex items-center gap-3">
//           <div className="flex items-center rounded-full border border-plum/20">
//             <button
//               onClick={() => setQty((q) => Math.max(1, q - 1))}
//               className="px-4 py-2 text-plum">
//               −
//             </button>
//             <span className="px-2 font-700">{qty}</span>
//             <button
//               onClick={() =>
//                 setQty((q) => (stock ? Math.min(stock, q + 1) : q + 1))
//               }
//               className="px-4 py-2 text-plum">
//               +
//             </button>
//           </div>
//           <button
//             onClick={handleAddToCart}
//             disabled={outOfStock}
//             className="flex-1 rounded-full bg-plum py-3 font-display font-700 text-cream hoverEffect hover:bg-coral disabled:cursor-not-allowed disabled:opacity-50">
//             {outOfStock ? "Out of Stock" : added ? "Added ✓" : "Add to Cart"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// "use client";

// import { useState, useEffect } from "react";
// import { useCartStore } from "@/store/cartStore";
// import { useCurrencyStore } from "@/store/currencyStore";
// import { useToastStore } from "@/store/toastStore";
// import { formatPrice } from "@/lib/currency";
// import { getStock } from "@/lib/inventory";
// import Breadcrumbs from "@/components/Breadcrumbs";

// export default function ApparelDetailClient({ product }) {
//   const [size, setSize] = useState(product.sizes[0]);
//   const [color, setColor] = useState(product.colors[0].name);
//   const [qty, setQty] = useState(1);
//   const [stock, setStock] = useState(null);

//   const addToCart = useCartStore((s) => s.addToCart);
//   const currency = useCurrencyStore((s) => s.currency);
//   const showToast = useToastStore((s) => s.showToast);

//   useEffect(() => {
//     getStock(product._id).then(setStock);
//   }, [product._id]);

//   const outOfStock = stock !== null && stock <= 0;
//   const selectedColor = product.colors.find((c) => c.name === color);
//   const displayImage = selectedColor?.image || product.image;

//   const handleAddToCart = () => {
//     const variant = {
//       _id: `${product._id}-${size}-${color}`,
//       baseId: product._id,
//       name: `${product.name} (${size}, ${color})`,
//       price: product.price,
//       image: displayImage,
//       size,
//       color,
//     };
//     addToCart(variant, qty);
//     showToast(`${product.name} added to cart`, "success");
//   };

//   return (
//     <div>
//       <Breadcrumbs
//         items={[
//           { label: "Apparel", href: "/apparel" },
//           { label: product.name },
//         ]}
//       />
//       <div className="mx-auto grid max-w-6xl gap-10 px-5 py-12 md:grid-cols-2">
//         <div className="flex aspect-square items-center justify-center rounded-xl2 bg-cream">
//           <img
//             src={displayImage}
//             alt={`${product.name} — ${color}`}
//             className="h-3/4 w-3/4 object-contain"
//           />
//         </div>

//         <div>
//           <span className="rounded-full bg-grass px-2 py-1 text-xs font-700 text-white">
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
//             outOfStock && (
//               <p className="mt-4 font-700 text-coral">Out of stock</p>
//             )
//           )}

//           <div className="mt-6">
//             <p className="text-sm font-700 text-plum">Size</p>
//             <div className="mt-2 flex flex-wrap gap-2">
//               {product.sizes.map((s) => (
//                 <button
//                   key={s}
//                   onClick={() => setSize(s)}
//                   className={`rounded-full border px-4 py-2 text-sm font-700 hoverEffect ${
//                     size === s
//                       ? "border-plum bg-plum text-cream"
//                       : "border-plum/20 text-plum hover:border-coral"
//                   }`}>
//                   {s}
//                 </button>
//               ))}
//             </div>
//           </div>

//           <div className="mt-6">
//             <p className="text-sm font-700 text-plum">
//               Color: <span className="font-400 text-plum/70">{color}</span>
//             </p>
//             <div className="mt-2 flex gap-2">
//               {product.colors.map((c) => (
//                 <button
//                   key={c.name}
//                   onClick={() => setColor(c.name)}
//                   aria-label={c.name}
//                   className={`h-8 w-8 rounded-full border-2 hoverEffect ${
//                     color === c.name ? "border-coral" : "border-plum/20"
//                   }`}
//                   style={{ backgroundColor: c.hex }}
//                 />
//               ))}
//             </div>
//           </div>

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
//               onClick={handleAddToCart}
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

export default function ApparelDetailClient({ product }) {
  const [size, setSize] = useState(product.sizes[0]);
  const [color, setColor] = useState(product.colors[0].name);
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

  const selectedColor = product.colors.find((c) => c.name === color);
  const displayImage = selectedColor?.image || product.image;

  const handleAddToCart = () => {
    const variant = {
      _id: `${product._id}-${size}-${color}`,
      baseId: product._id,
      name: `${product.name} (${size}, ${color})`,
      price: product.price,
      image: displayImage,
      size,
      color,
    };
    addToCart(variant, qty);
    addToast(`${product.name} added to cart.`, "success");
  };

  return (
    <div className="mx-auto max-w-6xl px-5 pt-8">
      <Breadcrumbs
        items={[
          { label: "Apparel", href: "/apparel" },
          { label: product.name },
        ]}
      />

      <div className="grid gap-10 pb-12 md:grid-cols-2">
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

          {!stockLoaded ? (
            <Skeleton className="mt-4 h-5 w-32" />
          ) : (
            outOfStock && (
              <p className="mt-4 font-700 text-coral">Out of stock</p>
            )
          )}

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
                  }`}>
                  {s}
                </button>
              ))}
            </div>
          </div>

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
