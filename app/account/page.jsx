// "use client";

// import { useRouter } from "next/navigation";
// import { useEffect } from "react";
// import { useAuthStore } from "@/store/authStore";

// export default function AccountPage() {
//   const router = useRouter();
//   const user = useAuthStore((s) => s.user);
//   const logout = useAuthStore((s) => s.logout);

//   useEffect(() => {
//     if (!user) router.push("/login");
//   }, [user, router]);

//   if (!user) return null;

//   return (
//     <div className="mx-auto max-w-xl px-5 py-16">
//       <h1 className="font-display text-2xl font-800 text-plum">My Account</h1>
//       <p className="mt-2 text-plum/70">Signed in as {user.email}</p>
//       <button
//         onClick={() => {
//           logout();
//           router.push("/");
//         }}
//         className="mt-6 rounded-full border border-plum/20 px-6 py-2 font-700 text-plum hover:border-coral hover:text-coral"
//       >
//         Sign Out
//       </button>
//     </div>
//   );
// }

"use client";
import Link from "next/link";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuthStore } from "@/store/authStore";

export default function AccountPage() {
  const router = useRouter();
  const user = useAuthStore((s) => s.user);
  const loading = useAuthStore((s) => s.loading);
  const logout = useAuthStore((s) => s.logout);

  useEffect(() => {
    if (!loading && !user) router.push("/login");
  }, [user, loading, router]);

  if (loading || !user) return null;

  return (
    <div className="mx-auto max-w-xl px-5 py-16">
      <h1 className="font-display text-2xl font-800 text-plum">My Account</h1>
      <p className="mt-2 text-plum/70">Signed in as {user.email}</p>
      <div className="mt-4 flex gap-4 text-sm font-700 text-coral">
        <Link href="/account/orders" className="hover:underline">
          Order History
        </Link>
        <Link href="/account/addresses" className="hover:underline">
          Saved Addresses
        </Link>
      </div>
      <button
        onClick={async () => {
          await logout();
          router.push("/");
        }}
        className="mt-6 rounded-full border border-plum/20 px-6 py-2 font-700 text-plum hover:border-coral hover:text-coral">
        Sign Out
      </button>
    </div>
  );
}
