// "use client";

// import { useState, useEffect, useCallback } from "react";
// import { useRouter } from "next/navigation";
// import { useAuthStore } from "@/store/authStore";
// import { supabase } from "@/lib/supabaseClient";

// export default function AddressesPage() {
//   const router = useRouter();
//   const user = useAuthStore((s) => s.user);
//   const loading = useAuthStore((s) => s.loading);

//   const [addresses, setAddresses] = useState([]);
//   const [fetching, setFetching] = useState(true);
//   const [form, setForm] = useState({
//     full_name: "",
//     address_line: "",
//     city: "",
//     phone: "",
//   });
//   const [saving, setSaving] = useState(false);

//   const loadAddresses = useCallback(async () => {
//     if (!user) return;
//     setFetching(true);
//     const { data } = await supabase
//       .from("addresses")
//       .select("*")
//       .order("is_default", { ascending: false })
//       .order("created_at", { ascending: false });
//     setAddresses(data || []);
//     setFetching(false);
//   }, [user]);

//   useEffect(() => {
//     if (!loading && !user) router.push("/login?redirect=/account/addresses");
//   }, [user, loading, router]);

//   useEffect(() => {
//     loadAddresses();
//   }, [loadAddresses]);

//   const handleAdd = async (e) => {
//     e.preventDefault();
//     setSaving(true);
//     await supabase.from("addresses").insert({
//       user_id: user.id,
//       ...form,
//       is_default: addresses.length === 0, // first address becomes default automatically
//     });
//     setForm({ full_name: "", address_line: "", city: "", phone: "" });
//     setSaving(false);
//     loadAddresses();
//   };

//   const handleDelete = async (id) => {
//     await supabase.from("addresses").delete().eq("id", id);
//     loadAddresses();
//   };

//   const handleSetDefault = async (id) => {
//     // Clear default on all, then set it on the chosen one
//     await supabase
//       .from("addresses")
//       .update({ is_default: false })
//       .eq("user_id", user.id);
//     await supabase.from("addresses").update({ is_default: true }).eq("id", id);
//     loadAddresses();
//   };

//   if (loading || !user) return null;

//   return (
//     <div className="mx-auto max-w-2xl px-5 py-12">
//       <h1 className="font-display text-2xl font-800 text-plum">
//         Saved Addresses
//       </h1>

//       {fetching ? (
//         <p className="mt-6 text-plum/60">Loading...</p>
//       ) : addresses.length === 0 ? (
//         <p className="mt-6 text-plum/60">No saved addresses yet.</p>
//       ) : (
//         <div className="mt-6 space-y-3">
//           {addresses.map((a) => (
//             <div
//               key={a.id}
//               className="rounded-xl2 border border-plum/10 bg-white p-4">
//               <div className="flex items-start justify-between">
//                 <div>
//                   <p className="font-700 text-plum">
//                     {a.full_name}{" "}
//                     {a.is_default && (
//                       <span className="ml-2 rounded-full bg-sunshine px-2 py-0.5 text-xs font-700 text-plum">
//                         Default
//                       </span>
//                     )}
//                   </p>
//                   <p className="text-sm text-plum/70">
//                     {a.address_line}
//                     {a.city ? `, ${a.city}` : ""}
//                   </p>
//                   <p className="text-sm text-plum/70">{a.phone}</p>
//                 </div>
//                 <div className="flex shrink-0 gap-3 text-sm">
//                   {!a.is_default && (
//                     <button
//                       onClick={() => handleSetDefault(a.id)}
//                       className="text-coral hover:underline">
//                       Set default
//                     </button>
//                   )}
//                   <button
//                     onClick={() => handleDelete(a.id)}
//                     className="text-plum/50 hover:text-coral">
//                     Delete
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}

//       <h2 className="mt-10 font-display text-lg font-800 text-plum">
//         Add New Address
//       </h2>
//       <form onSubmit={handleAdd} className="mt-4 space-y-4">
//         <input
//           required
//           placeholder="Full name"
//           value={form.full_name}
//           onChange={(e) => setForm({ ...form, full_name: e.target.value })}
//           className="w-full rounded-lg border border-plum/20 px-4 py-2 outline-none focus:border-coral"
//         />
//         <input
//           required
//           placeholder="Address"
//           value={form.address_line}
//           onChange={(e) => setForm({ ...form, address_line: e.target.value })}
//           className="w-full rounded-lg border border-plum/20 px-4 py-2 outline-none focus:border-coral"
//         />
//         <input
//           placeholder="City"
//           value={form.city}
//           onChange={(e) => setForm({ ...form, city: e.target.value })}
//           className="w-full rounded-lg border border-plum/20 px-4 py-2 outline-none focus:border-coral"
//         />
//         <input
//           required
//           placeholder="Phone"
//           value={form.phone}
//           onChange={(e) => setForm({ ...form, phone: e.target.value })}
//           className="w-full rounded-lg border border-plum/20 px-4 py-2 outline-none focus:border-coral"
//         />
//         <button
//           type="submit"
//           disabled={saving}
//           className="rounded-full bg-plum px-6 py-3 font-display font-700 text-cream hoverEffect hover:bg-coral disabled:opacity-60">
//           {saving ? "Saving..." : "Save Address"}
//         </button>
//       </form>
//     </div>
//   );
// }

"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import { supabase } from "@/lib/supabaseClient";
import ConfirmDialog from "@/components/ConfirmDialog";
import Skeleton from "@/components/Skeleton";
import { useToastStore } from "@/store/toastStore";

export default function AddressesPage() {
  const router = useRouter();
  const user = useAuthStore((s) => s.user);
  const loading = useAuthStore((s) => s.loading);
  const addToast = useToastStore((s) => s.addToast);

  const [addresses, setAddresses] = useState([]);
  const [fetching, setFetching] = useState(true);
  const [form, setForm] = useState({
    full_name: "",
    address_line: "",
    city: "",
    phone: "",
  });
  const [saving, setSaving] = useState(false);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

  const loadAddresses = useCallback(async () => {
    if (!user) return;
    setFetching(true);
    const { data } = await supabase
      .from("addresses")
      .select("*")
      .order("is_default", { ascending: false })
      .order("created_at", { ascending: false });
    setAddresses(data || []);
    setFetching(false);
  }, [user]);

  useEffect(() => {
    if (!loading && !user) router.push("/login?redirect=/account/addresses");
  }, [user, loading, router]);

  useEffect(() => {
    loadAddresses();
  }, [loadAddresses]);

  const handleAdd = async (e) => {
    e.preventDefault();
    setSaving(true);
    await supabase.from("addresses").insert({
      user_id: user.id,
      ...form,
      is_default: addresses.length === 0,
    });
    setForm({ full_name: "", address_line: "", city: "", phone: "" });
    setSaving(false);
    addToast("Address saved.", "success");
    loadAddresses();
  };

  const handleDelete = async (id) => {
    await supabase.from("addresses").delete().eq("id", id);
    setConfirmDeleteId(null);
    addToast("Address removed.", "success");
    loadAddresses();
  };

  const handleSetDefault = async (id) => {
    await supabase
      .from("addresses")
      .update({ is_default: false })
      .eq("user_id", user.id);
    await supabase.from("addresses").update({ is_default: true }).eq("id", id);
    loadAddresses();
  };

  if (loading || !user) return null;

  return (
    <div className="mx-auto max-w-2xl px-5 py-12">
      <h1 className="font-display text-2xl font-800 text-plum">
        Saved Addresses
      </h1>

      {fetching ? (
        <div className="mt-6 space-y-3">
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-20 w-full" />
        </div>
      ) : addresses.length === 0 ? (
        <p className="mt-6 text-plum/60">No saved addresses yet.</p>
      ) : (
        <div className="mt-6 space-y-3">
          {addresses.map((a) => (
            <div
              key={a.id}
              className="rounded-xl2 border border-plum/10 bg-white p-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-700 text-plum">
                    {a.full_name}{" "}
                    {a.is_default && (
                      <span className="ml-2 rounded-full bg-sunshine px-2 py-0.5 text-xs font-700 text-plum">
                        Default
                      </span>
                    )}
                  </p>
                  <p className="text-sm text-plum/70">
                    {a.address_line}
                    {a.city ? `, ${a.city}` : ""}
                  </p>
                  <p className="text-sm text-plum/70">{a.phone}</p>
                </div>
                <div className="flex shrink-0 gap-3 text-sm">
                  {!a.is_default && (
                    <button
                      onClick={() => handleSetDefault(a.id)}
                      className="text-coral hover:underline">
                      Set default
                    </button>
                  )}
                  <button
                    onClick={() => setConfirmDeleteId(a.id)}
                    className="text-plum/50 hover:text-coral">
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <h2 className="mt-10 font-display text-lg font-800 text-plum">
        Add New Address
      </h2>
      <form onSubmit={handleAdd} className="mt-4 space-y-4">
        <input
          required
          placeholder="Full name"
          value={form.full_name}
          onChange={(e) => setForm({ ...form, full_name: e.target.value })}
          className="w-full rounded-lg border border-plum/20 px-4 py-2 outline-none focus:border-coral"
        />
        <input
          required
          placeholder="Address"
          value={form.address_line}
          onChange={(e) => setForm({ ...form, address_line: e.target.value })}
          className="w-full rounded-lg border border-plum/20 px-4 py-2 outline-none focus:border-coral"
        />
        <input
          placeholder="City"
          value={form.city}
          onChange={(e) => setForm({ ...form, city: e.target.value })}
          className="w-full rounded-lg border border-plum/20 px-4 py-2 outline-none focus:border-coral"
        />
        <input
          required
          placeholder="Phone"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          className="w-full rounded-lg border border-plum/20 px-4 py-2 outline-none focus:border-coral"
        />
        <button
          type="submit"
          disabled={saving}
          className="rounded-full bg-plum px-6 py-3 font-display font-700 text-cream hoverEffect hover:bg-coral disabled:opacity-60">
          {saving ? "Saving..." : "Save Address"}
        </button>
      </form>

      <ConfirmDialog
        open={!!confirmDeleteId}
        message="Delete this address? This can't be undone."
        onConfirm={() => handleDelete(confirmDeleteId)}
        onCancel={() => setConfirmDeleteId(null)}
      />
    </div>
  );
}
