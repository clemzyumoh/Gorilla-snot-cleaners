


// "use client";

// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import { useAuthStore } from "@/store/authStore";
// import { useCartStore } from "@/store/cartStore";
// import { useCurrencyStore } from "@/store/currencyStore";
// import { formatPrice } from "@/lib/currency";
// import { supabase } from "@/lib/supabaseClient";
//    import { useToastStore } from "@/store/toastStore";

// export default function CheckoutPage() {
//   const router = useRouter();
//   const user = useAuthStore((s) => s.user);
//   const items = useCartStore((s) => s.items);
//   const totalPrice = useCartStore((s) => s.totalPrice());
//   const currency = useCurrencyStore((s) => s.currency);

//   const [loading, setLoading] = useState(false);
//   const [form, setForm] = useState({ name: "", address: "", phone: "" });
// const addToast = useToastStore((s) => s.addToast);

//   const [savedAddresses, setSavedAddresses] = useState([]);
//   const [selectedAddressId, setSelectedAddressId] = useState(null); // null = "use new address" form
//   const [addressesLoading, setAddressesLoading] = useState(true);
//   const [saveThisAddress, setSaveThisAddress] = useState(true);

//   useEffect(() => {
//     if (!user) {
//       router.push("/login?redirect=/checkout");
//     }
//   }, [user, router]);

//   // Load saved addresses once logged in, and pre-select the default one
//   useEffect(() => {
//     async function loadAddresses() {
//       if (!user) return;
//       const { data } = await supabase
//         .from("addresses")
//         .select("*")
//         .order("is_default", { ascending: false })
//         .order("created_at", { ascending: false });

//       setSavedAddresses(data || []);
//       if (data && data.length > 0) {
//         setSelectedAddressId(data[0].id); // default (or most recent) pre-selected
//       }
//       setAddressesLoading(false);
//     }
//     loadAddresses();
//   }, [user]);

//   if (!user) return null;

//   if (items.length === 0) {
//     return (
//       <div className="mx-auto max-w-xl px-5 py-20 text-center">
//         <p className="text-plum/70">Your cart is empty.</p>
//       </div>
//     );
//   }

//   const usingNewAddress = selectedAddressId === null;

//   const handleCheckout = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     // Figure out which shipping details to actually send — either the
//     // selected saved address, or whatever was typed in the new-address form.
//     let shipping;
//     if (usingNewAddress) {
//       shipping = { name: form.name, address: form.address, phone: form.phone };

//       // Save it to the address book if the user opted in
//       if (saveThisAddress) {
//         await supabase.from("addresses").insert({
//           user_id: user.id,
//           full_name: form.name,
//           address_line: form.address,
//           phone: form.phone,
//           is_default: savedAddresses.length === 0, // first address becomes default
//         });
//       }
//     } else {
//       const selected = savedAddresses.find((a) => a.id === selectedAddressId);
//       shipping = {
//         name: selected.full_name,
//         address: selected.address_line,
//         phone: selected.phone,
//       };
//     }

//     try {
//       const res = await fetch("/api/checkout", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           items,
//           customer: shipping,
//           email: user.email,
//           userId: user.id,
//         }),
//       });
//       const data = await res.json();
//       if (data.url) {
//         window.location.href = data.url;
//       } else {
//        // alert("Something went wrong starting checkout. Please try again.");
//           addToast(
//             "Something went wrong starting checkout. Please try again.",
//             "error",
//           );
//         setLoading(false);
//       }
//     } catch (err) {
//       // alert("Could not reach payment server. Please try again.");
//       addToast("Could not reach payment server. Please try again.", "error");
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="mx-auto max-w-xl px-5 py-12">
//       <h1 className="font-display text-3xl font-800 text-plum">Checkout</h1>
//       <p className="mt-2 text-sm text-plum/60">Signed in as {user.email}</p>

//       <form onSubmit={handleCheckout} className="mt-8 space-y-6">
//         {/* SAVED ADDRESSES */}
//         {!addressesLoading && savedAddresses.length > 0 && (
//           <div className="space-y-2">
//             <p className="text-sm font-700 text-plum">Shipping Address</p>
//             {savedAddresses.map((a) => (
//               <label
//                 key={a.id}
//                 className={`flex cursor-pointer items-start gap-3 rounded-xl2 border p-4 ${
//                   selectedAddressId === a.id
//                     ? "border-coral bg-coral/5"
//                     : "border-plum/20"
//                 }`}
//               >
//                 <input
//                   type="radio"
//                   name="address"
//                   checked={selectedAddressId === a.id}
//                   onChange={() => setSelectedAddressId(a.id)}
//                   className="mt-1 accent-coral"
//                 />
//                 <div>
//                   <p className="font-700 text-plum">
//                     {a.full_name}{" "}
//                     {a.is_default && (
//                       <span className="ml-1 rounded-full bg-sunshine px-2 py-0.5 text-xs font-700 text-plum">
//                         Default
//                       </span>
//                     )}
//                   </p>
//                   <p className="text-sm text-plum/70">{a.address_line}</p>
//                   <p className="text-sm text-plum/70">{a.phone}</p>
//                 </div>
//               </label>
//             ))}

//             <label
//               className={`flex cursor-pointer items-center gap-3 rounded-xl2 border p-4 ${
//                 usingNewAddress ? "border-coral bg-coral/5" : "border-plum/20"
//               }`}
//             >
//               <input
//                 type="radio"
//                 name="address"
//                 checked={usingNewAddress}
//                 onChange={() => setSelectedAddressId(null)}
//                 className="accent-coral"
//               />
//               <span className="font-700 text-plum">Use a new address</span>
//             </label>
//           </div>
//         )}

//         {/* NEW ADDRESS FORM — shown if no saved addresses yet, or "new address" is picked */}
//         {(addressesLoading || savedAddresses.length === 0 || usingNewAddress) && (
//           <div className="space-y-4">
//             <div>
//               <label className="text-sm font-700 text-plum">Full Name</label>
//               <input
//                 required={usingNewAddress}
//                 value={form.name}
//                 onChange={(e) => setForm({ ...form, name: e.target.value })}
//                 className="mt-1 w-full rounded-lg border border-plum/20 px-4 py-2 outline-none focus:border-coral"
//               />
//             </div>
//             <div>
//               <label className="text-sm font-700 text-plum">Shipping Address</label>
//               <textarea
//                 required={usingNewAddress}
//                 value={form.address}
//                 onChange={(e) => setForm({ ...form, address: e.target.value })}
//                 className="mt-1 w-full rounded-lg border border-plum/20 px-4 py-2 outline-none focus:border-coral"
//                 rows={3}
//               />
//             </div>
//             <div>
//               <label className="text-sm font-700 text-plum">Phone</label>
//               <input
//                 required={usingNewAddress}
//                 value={form.phone}
//                 onChange={(e) => setForm({ ...form, phone: e.target.value })}
//                 className="mt-1 w-full rounded-lg border border-plum/20 px-4 py-2 outline-none focus:border-coral"
//               />
//             </div>
//             <label className="flex items-center gap-2 text-sm text-plum/70">
//               <input
//                 type="checkbox"
//                 checked={saveThisAddress}
//                 onChange={(e) => setSaveThisAddress(e.target.checked)}
//                 className="accent-coral"
//               />
//               Save this address for next time
//             </label>
//           </div>
//         )}

//         <div className="flex items-center justify-between border-t border-plum/10 pt-4">
//           <span className="font-display text-lg font-800 text-plum">
//             Total: {formatPrice(totalPrice, currency)}
//           </span>
//         </div>

//         <button
//           type="submit"
//           disabled={loading}
//           className="w-full rounded-full bg-plum py-3 font-display font-700 text-cream hoverEffect hover:bg-coral disabled:opacity-60"
//         >
//           {loading ? "Redirecting to payment..." : "Pay Now"}
//         </button>
//       </form>
//     </div>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import { useCartStore } from "@/store/cartStore";
import { useCurrencyStore } from "@/store/currencyStore";
import { useToastStore } from "@/store/toastStore";
import { formatPrice } from "@/lib/currency";
import { supabase } from "@/lib/supabaseClient";

export default function CheckoutPage() {
  const router = useRouter();
  const user = useAuthStore((s) => s.user);
  const items = useCartStore((s) => s.items);
  const totalPrice = useCartStore((s) => s.totalPrice());
  const currency = useCurrencyStore((s) => s.currency);
  const showToast = useToastStore((s) => s.showToast);

  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", address: "", phone: "" });

  const [savedAddresses, setSavedAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [addressesLoading, setAddressesLoading] = useState(true);
  const [saveThisAddress, setSaveThisAddress] = useState(true);

  useEffect(() => {
    if (!user) {
      router.push("/login?redirect=/checkout");
    }
  }, [user, router]);

  useEffect(() => {
    async function loadAddresses() {
      if (!user) return;
      const { data } = await supabase
        .from("addresses")
        .select("*")
        .order("is_default", { ascending: false })
        .order("created_at", { ascending: false });

      setSavedAddresses(data || []);
      if (data && data.length > 0) {
        setSelectedAddressId(data[0].id);
      }
      setAddressesLoading(false);
    }
    loadAddresses();
  }, [user]);

  if (!user) return null;

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-xl px-5 py-20 text-center">
        <p className="text-plum/70">Your cart is empty.</p>
      </div>
    );
  }

  const usingNewAddress = selectedAddressId === null;

  // Simple skeleton shown while the saved-addresses fetch is in flight
  if (addressesLoading) {
    return (
      <div className="mx-auto max-w-xl px-5 py-12">
        <h1 className="font-display text-3xl font-800 text-plum">Checkout</h1>
        <div className="mt-8 animate-pulse space-y-3">
          <div className="h-20 rounded-xl2 bg-plum/5" />
          <div className="h-20 rounded-xl2 bg-plum/5" />
        </div>
      </div>
    );
  }

  const handleCheckout = async (e) => {
    e.preventDefault();
    setLoading(true);

    let shipping;
    if (usingNewAddress) {
      shipping = { name: form.name, address: form.address, phone: form.phone };
      if (saveThisAddress) {
        await supabase.from("addresses").insert({
          user_id: user.id,
          full_name: form.name,
          address_line: form.address,
          phone: form.phone,
          is_default: savedAddresses.length === 0,
        });
      }
    } else {
      const selected = savedAddresses.find((a) => a.id === selectedAddressId);
      shipping = {
        name: selected.full_name,
        address: selected.address_line,
        phone: selected.phone,
      };
    }

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items,
          customer: shipping,
          email: user.email,
          userId: user.id,
        }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        showToast(
          "Something went wrong starting checkout. Please try again.",
          "error",
        );
        setLoading(false);
      }
    } catch (err) {
      showToast("Could not reach payment server. Please try again.", "error");
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-xl px-5 py-12">
      <h1 className="font-display text-3xl font-800 text-plum">Checkout</h1>
      <p className="mt-2 text-sm text-plum/60">Signed in as {user.email}</p>

      <form onSubmit={handleCheckout} className="mt-8 space-y-6">
        {savedAddresses.length > 0 && (
          <div className="space-y-2">
            <p className="text-sm font-700 text-plum">Shipping Address</p>
            {savedAddresses.map((a) => (
              <label
                key={a.id}
                className={`flex cursor-pointer items-start gap-3 rounded-xl2 border p-4 ${
                  selectedAddressId === a.id
                    ? "border-coral bg-coral/5"
                    : "border-plum/20"
                }`}>
                <input
                  type="radio"
                  name="address"
                  checked={selectedAddressId === a.id}
                  onChange={() => setSelectedAddressId(a.id)}
                  className="mt-1 accent-coral"
                />
                <div>
                  <p className="font-700 text-plum">
                    {a.full_name}{" "}
                    {a.is_default && (
                      <span className="ml-1 rounded-full bg-sunshine px-2 py-0.5 text-xs font-700 text-plum">
                        Default
                      </span>
                    )}
                  </p>
                  <p className="text-sm text-plum/70">{a.address_line}</p>
                  <p className="text-sm text-plum/70">{a.phone}</p>
                </div>
              </label>
            ))}

            <label
              className={`flex cursor-pointer items-center gap-3 rounded-xl2 border p-4 ${
                usingNewAddress ? "border-coral bg-coral/5" : "border-plum/20"
              }`}>
              <input
                type="radio"
                name="address"
                checked={usingNewAddress}
                onChange={() => setSelectedAddressId(null)}
                className="accent-coral"
              />
              <span className="font-700 text-plum">Use a new address</span>
            </label>
          </div>
        )}

        {(savedAddresses.length === 0 || usingNewAddress) && (
          <div className="space-y-4">
            <div>
              <label className="text-sm font-700 text-plum">Full Name</label>
              <input
                required={usingNewAddress}
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="mt-1 w-full rounded-lg border border-plum/20 px-4 py-2 outline-none focus:border-coral"
              />
            </div>
            <div>
              <label className="text-sm font-700 text-plum">
                Shipping Address
              </label>
              <textarea
                required={usingNewAddress}
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
                className="mt-1 w-full rounded-lg border border-plum/20 px-4 py-2 outline-none focus:border-coral"
                rows={3}
              />
            </div>
            <div>
              <label className="text-sm font-700 text-plum">Phone</label>
              <input
                required={usingNewAddress}
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="mt-1 w-full rounded-lg border border-plum/20 px-4 py-2 outline-none focus:border-coral"
              />
            </div>
            <label className="flex items-center gap-2 text-sm text-plum/70">
              <input
                type="checkbox"
                checked={saveThisAddress}
                onChange={(e) => setSaveThisAddress(e.target.checked)}
                className="accent-coral"
              />
              Save this address for next time
            </label>
          </div>
        )}

        <div className="flex items-center justify-between border-t border-plum/10 pt-4">
          <span className="font-display text-lg font-800 text-plum">
            Total: {formatPrice(totalPrice, currency)}
          </span>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-full bg-plum py-3 font-display font-700 text-cream hoverEffect hover:bg-coral disabled:opacity-60">
          {loading ? "Redirecting to payment..." : "Pay Now"}
        </button>
      </form>
    </div>
  );
}
