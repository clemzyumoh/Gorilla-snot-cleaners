import { createClient } from "@supabase/supabase-js";

// SERVER-ONLY client using the service_role key — this bypasses Row
// Level Security, so it must NEVER be imported into any "use client"
// component or exposed to the browser. Only used inside API routes
// (like the webhook) that run on the server.
export const supabaseAdmin = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
);
