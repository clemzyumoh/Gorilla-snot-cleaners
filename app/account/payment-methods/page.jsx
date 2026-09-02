"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import { supabase } from "@/lib/supabaseClient";

export default function PaymentMethodsPage() {
  const router = useRouter();
  const user = useAuthStore((s) => s.user);
  const loading = useAuthStore((s) => s.loading);
  const [methods, setMethods] = useState([]);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    if (!loading && !user)
      router.push("/login?redirect=/account/payment-methods");
  }, [user, loading, router]);

  useEffect(() => {
    async function load() {
      if (!user) return;
      const { data } = await supabase
        .from("payment_methods")
        .select("*")
        .order("created_at", { ascending: false });
      setMethods(data || []);
      setFetching(false);
    }
    load();
  }, [user]);

  if (loading || !user) return null;

  return (
    <div className="mx-auto max-w-xl px-5 py-16">
      <h1 className="font-display text-2xl font-800 text-plum">
        Payment Methods
      </h1>
      <p className="mt-2 text-sm text-plum/60">
        Cards used on past orders. These are for reference only — checkout still
        requires entering card details each time.
      </p>

      {fetching ? (
        <p className="mt-6 text-plum/60">Loading...</p>
      ) : methods.length === 0 ? (
        <p className="mt-6 text-plum/60">
          No saved payment methods yet — this fills in automatically after your
          first order.
        </p>
      ) : (
        <div className="mt-6 space-y-3">
          {methods.map((m) => (
            <div
              key={m.id}
              className="flex items-center justify-between rounded-xl2 border border-plum/10 bg-white p-4">
              <div>
                <p className="font-700 text-plum capitalize">
                  {m.card_type} •••• {m.card_last4}
                </p>
                <p className="text-xs text-plum/50">{m.bank}</p>
              </div>
              <p className="text-xs text-plum/40">
                {new Date(m.created_at).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
