import { createClient } from "@supabase/supabase-js";

// Browser/client-side Supabase client — safe to use in "use client"
// components. Uses the public anon key, which is meant to be exposed
// (row-level security policies in schema.sql control what it can access).
export const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY,
);
