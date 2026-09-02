"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import { supabase } from "@/lib/supabaseClient";

export default function ProfilePage() {
  const router = useRouter();
  const user = useAuthStore((s) => s.user);
  const profile = useAuthStore((s) => s.profile);
  const loading = useAuthStore((s) => s.loading);
  const refreshProfile = useAuthStore((s) => s.refreshProfile);

  const [fullName, setFullName] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!loading && !user) router.push("/login?redirect=/account/profile");
  }, [user, loading, router]);

  useEffect(() => {
    if (profile?.full_name) setFullName(profile.full_name);
  }, [profile]);

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    await supabase
      .from("profiles")
      .update({ full_name: fullName })
      .eq("id", user.id);
    await refreshProfile();
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  if (loading || !user) return null;

  return (
    <div className="mx-auto max-w-md px-5 py-16">
      <h1 className="font-display text-2xl font-800 text-plum">Edit Profile</h1>

      <form onSubmit={handleSave} className="mt-6 space-y-4">
        <div>
          <label className="text-sm font-700 text-plum">Email</label>
          <input
            disabled
            value={user.email}
            className="mt-1 w-full rounded-lg border border-plum/10 bg-cream px-4 py-2 text-plum/60"
          />
        </div>
        <div>
          <label className="text-sm font-700 text-plum">Full Name</label>
          <input
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Your name"
            className="mt-1 w-full rounded-lg border border-plum/20 px-4 py-2 outline-none focus:border-coral"
          />
        </div>
        <button
          type="submit"
          disabled={saving}
          className="rounded-full bg-plum px-6 py-3 font-display font-700 text-cream hoverEffect hover:bg-coral disabled:opacity-60">
          {saving ? "Saving..." : saved ? "Saved ✓" : "Save Changes"}
        </button>
      </form>
    </div>
  );
}
