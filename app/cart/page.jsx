
// "use client";

// import { useState } from "react";
// import Link from "next/link";
// import { useCartStore } from "@/store/cartStore";
// import { useCurrencyStore } from "@/store/currencyStore";
// import { formatPrice } from "@/lib/currency";
// import ConfirmDialog from "@/components/ConfirmDialog";
// import CurrencyDisclaimer from "@/components/CurrencyDisclaimer";

// export default function CartPage() {
//   const items = useCartStore((s) => s.items);
//   const increaseQuantity = useCartStore((s) => s.increaseQuantity);
//   const decreaseQuantity = useCartStore((s) => s.decreaseQuantity);
//   const removeItem = useCartStore((s) => s.removeItem);
//   const totalPrice = useCartStore((s) => s.totalPrice());
//   const currency = useCurrencyStore((s) => s.currency);

//   const [confirmRemoveId, setConfirmRemoveId] = useState(null);

//   if (items.length === 0) {
//     return (
//       <div className="mx-auto max-w-2xl px-5 py-20 text-center">
//         <h1 className="font-display text-2xl font-800 text-plum">
//           Your cart is empty
//         </h1>
//         <Link
//           href="/shop"
//           className="mt-6 inline-block rounded-full bg-coral px-6 py-3 font-display font-700 text-white hoverEffect hover:bg-plum">
//           Shop Party Supplies
//         </Link>
//       </div>
//     );
//   }

//   return (
//     <div className="mx-auto max-w-4xl px-5 py-12">
//       <h1 className="font-display text-3xl font-800 text-plum">Your Cart</h1>

//       <div className="mt-8 flex flex-col gap-4">
//         {items.map((item) => (
//           <div
//             key={item._id}
//             className="flex flex-col gap-4 rounded-xl2 border border-plum/10 bg-white p-4 md:flex-row md:items-center">
//             <img
//               src={item.image}
//               alt={item.name}
//               className="h-20 w-20 shrink-0 object-contain"
//             />
//             <div className="flex-1">
//               <h3 className="font-display font-700 text-plum">{item.name}</h3>
//               <p className="text-sm text-coral">
//                 {formatPrice(item.price, currency)}
//               </p>
//             </div>
//             <div className="flex items-center justify-between gap-4 md:justify-end">
//               <div className="flex items-center rounded-full border border-plum/20">
//                 <button
//                   onClick={() => decreaseQuantity(item._id)}
//                   className="px-3 py-1 text-plum">
//                   −
//                 </button>
//                 <span className="px-2 font-700">{item.quantity}</span>
//                 <button
//                   onClick={() => increaseQuantity(item._id)}
//                   className="px-3 py-1 text-plum">
//                   +
//                 </button>
//               </div>
//               <button
//                 onClick={() => setConfirmRemoveId(item._id)}
//                 className="text-sm text-plum/50 hover:text-coral">
//                 Remove
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>

//       <div className="mt-8 flex flex-col gap-4 border-t border-plum/10 pt-6 md:flex-row md:items-center md:justify-between">
//         <div>
//           <span className="font-display text-xl font-800 text-plum">
//             Total: {formatPrice(totalPrice, currency)}
//           </span>
//           <CurrencyDisclaimer />
//         </div>
//         <Link
//           href="/checkout"
//           className="rounded-full bg-plum px-8 py-3 text-center font-display font-700 text-cream hoverEffect hover:bg-coral">
//           Checkout
//         </Link>
//       </div>

//       <ConfirmDialog
//         open={!!confirmRemoveId}
//         message="Remove this item from your cart?"
//         onConfirm={() => {
//           removeItem(confirmRemoveId);
//           setConfirmRemoveId(null);
//         }}
//         onCancel={() => setConfirmRemoveId(null)}
//       />
//     </div>
//   );
// }

"use client";

import { useState } from "react";
import Link from "next/link";
import { useCartStore } from "@/store/cartStore";
import { useCurrencyStore } from "@/store/currencyStore";
import { formatPrice } from "@/lib/currency";
import ConfirmDialog from "@/components/ConfirmDialog";
import CurrencyDisclaimer from "@/components/CurrencyDisclaimer";

export default function CartPage() {
  const items = useCartStore((s) => s.items);
  const increaseQuantity = useCartStore((s) => s.increaseQuantity);
  const decreaseQuantity = useCartStore((s) => s.decreaseQuantity);
  const removeItem = useCartStore((s) => s.removeItem);
  const totalPrice = useCartStore((s) => s.totalPrice());
  const currency = useCurrencyStore((s) => s.currency);

  const [confirmRemoveId, setConfirmRemoveId] = useState(null);

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-5 py-20 text-center">
        <h1 className="font-display text-2xl font-800 text-plum">
          Your cart is empty
        </h1>
        <Link
          href="/shop"
          className="mt-6 inline-block rounded-full bg-coral px-6 py-3 font-display font-700 text-white hoverEffect hover:bg-plum">
          Shop Party Supplies
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-5 py-12">
      <h1 className="font-display text-3xl font-800 text-plum">Your Cart</h1>

      <div className="mt-8 flex flex-col gap-4">
        {items.map((item) => (
          <div
            key={item._id}
            className="flex flex-col gap-4 rounded-xl2 border border-plum/10 bg-white p-4 md:flex-row md:items-center">
            <img
              src={item.image}
              alt={item.name}
              className="h-20 w-20 shrink-0 object-contain"
            />
            <div className="flex-1">
              <h3 className="font-display font-700 text-plum">{item.name}</h3>
              <p className="text-sm text-coral">
                {formatPrice(item.price, currency)}
              </p>
            </div>
            <div className="flex items-center justify-between gap-4 md:justify-end">
              <div className="flex items-center rounded-full border border-plum/20">
                <button
                  onClick={() => decreaseQuantity(item._id)}
                  className="px-3 py-1 text-plum">
                  −
                </button>
                <span className="px-2 font-700">{item.quantity}</span>
                <button
                  onClick={() => increaseQuantity(item._id)}
                  className="px-3 py-1 text-plum">
                  +
                </button>
              </div>
              <button
                onClick={() => setConfirmRemoveId(item._id)}
                className="text-sm text-plum/50 hover:text-coral">
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 flex flex-col gap-4 border-t border-plum/10 pt-6 md:flex-row md:items-center md:justify-between">
        <div>
          <span className="font-display text-xl font-800 text-plum">
            Total: {formatPrice(totalPrice, currency)}
          </span>
          <CurrencyDisclaimer />
        </div>
        <Link
          href="/checkout"
          className="rounded-full bg-plum px-8 py-3 text-center font-display font-700 text-cream hoverEffect hover:bg-coral">
          Checkout
        </Link>
      </div>

      <ConfirmDialog
        open={!!confirmRemoveId}
        message="Remove this item from your cart?"
        onConfirm={() => {
          removeItem(confirmRemoveId);
          setConfirmRemoveId(null);
        }}
        onCancel={() => setConfirmRemoveId(null)}
      />
    </div>
  );
}
