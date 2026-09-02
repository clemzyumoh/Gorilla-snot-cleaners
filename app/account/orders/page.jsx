// "use client";

// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { useAuthStore } from "@/store/authStore";
// import { supabase } from "@/lib/supabaseClient";

// export default function OrdersPage() {
//   const router = useRouter();
//   const user = useAuthStore((s) => s.user);
//   const loading = useAuthStore((s) => s.loading);

//   const [orders, setOrders] = useState([]);
//   const [fetching, setFetching] = useState(true);

//   useEffect(() => {
//     if (!loading && !user) router.push("/login?redirect=/account/orders");
//   }, [user, loading, router]);

//   useEffect(() => {
//     async function loadOrders() {
//       if (!user) return;
//       setFetching(true);
//       // order_items is nested via the foreign key relationship set up in
//       // schema.sql — Supabase resolves it automatically here.
//       const { data } = await supabase
//         .from("orders")
//         .select("*, order_items(*)")
//         .order("created_at", { ascending: false });
//       setOrders(data || []);
//       setFetching(false);
//     }
//     loadOrders();
//   }, [user]);

//   if (loading || !user) return null;

//   return (
//     <div className="mx-auto max-w-3xl px-5 py-12">
//       <h1 className="font-display text-2xl font-800 text-plum">
//         Order History
//       </h1>

//       {fetching ? (
//         <p className="mt-6 text-plum/60">Loading...</p>
//       ) : orders.length === 0 ? (
//         <p className="mt-6 text-plum/60">
//           No orders yet — once checkout is live, your past orders will show up
//           here.
//         </p>
//       ) : (
//         <div className="mt-6 space-y-5">
//           {orders.map((order) => (
//             <div
//               key={order.id}
//               className="rounded-xl2 border border-plum/10 bg-white p-5">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="font-700 text-plum">
//                     Order #{order.id.slice(0, 8)}
//                   </p>
//                   <p className="text-xs text-plum/50">
//                     {new Date(order.created_at).toLocaleDateString()}
//                   </p>
//                 </div>
//                 <span className="rounded-full bg-cream px-3 py-1 text-xs font-700 capitalize text-plum">
//                   {order.status}
//                 </span>
//               </div>

//               <div className="mt-4 space-y-2">
//                 {order.order_items.map((item) => (
//                   <div
//                     key={item.id}
//                     className="flex items-center justify-between text-sm text-plum/70">
//                     <span>
//                       {item.name} × {item.quantity}
//                     </span>
//                     <span>${(item.price * item.quantity).toFixed(2)}</span>
//                   </div>
//                 ))}
//               </div>

//               <div className="mt-4 border-t border-plum/10 pt-3 text-right font-700 text-plum">
//                 Total: ${order.total.toFixed(2)}
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import { useCartStore } from "@/store/cartStore";
import { supabase } from "@/lib/supabaseClient";
import { useToastStore } from "@/store/toastStore";
import Skeleton from "@/components/Skeleton";

export default function OrdersPage() {
  const router = useRouter();
  const user = useAuthStore((s) => s.user);
  const loading = useAuthStore((s) => s.loading);
  const addToCart = useCartStore((s) => s.addToCart);
  const addToast = useToastStore((s) => s.addToast);

  const [orders, setOrders] = useState([]);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    if (!loading && !user) router.push("/login?redirect=/account/orders");
  }, [user, loading, router]);

  useEffect(() => {
    async function loadOrders() {
      if (!user) return;
      setFetching(true);
      const { data } = await supabase
        .from("orders")
        .select("*, order_items(*)")
        .order("created_at", { ascending: false });
      setOrders(data || []);
      setFetching(false);
    }
    loadOrders();
  }, [user]);

  const handleReorder = (order) => {
    order.order_items.forEach((item) => {
      addToCart(
        {
          _id: item.product_id,
          name: item.name,
          price: item.price,
          image: item.image,
        },
        item.quantity,
      );
    });
    addToast("Items added to your cart.", "success");
  };

  if (loading || !user) return null;

  return (
    <div className="mx-auto max-w-3xl px-5 py-12">
      <h1 className="font-display text-2xl font-800 text-plum">
        Order History
      </h1>

      {fetching ? (
        <div className="mt-6 space-y-4">
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-32 w-full" />
        </div>
      ) : orders.length === 0 ? (
        <p className="mt-6 text-plum/60">
          No orders yet — once checkout is live, your past orders will show up
          here.
        </p>
      ) : (
        <div className="mt-6 space-y-5">
          {orders.map((order) => (
            <div
              key={order.id}
              className="rounded-xl2 border border-plum/10 bg-white p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-700 text-plum">
                    Order #{order.id.slice(0, 8)}
                  </p>
                  <p className="text-xs text-plum/50">
                    {new Date(order.created_at).toLocaleDateString()}
                  </p>
                </div>
                <span className="rounded-full bg-cream px-3 py-1 text-xs font-700 capitalize text-plum">
                  {order.status}
                </span>
              </div>

              <div className="mt-4 space-y-2">
                {order.order_items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between text-sm text-plum/70">
                    <span>
                      {item.name} × {item.quantity}
                    </span>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className="mt-4 flex items-center justify-between border-t border-plum/10 pt-3">
                <button
                  onClick={() => handleReorder(order)}
                  className="rounded-full border border-plum/20 px-4 py-2 text-sm font-700 text-plum hover:border-coral hover:text-coral">
                  Reorder
                </button>
                <span className="font-700 text-plum">
                  Total: ${order.total.toFixed(2)}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
