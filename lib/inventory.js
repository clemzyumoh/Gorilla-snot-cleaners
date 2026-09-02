import { supabase } from "@/lib/supabaseClient";

// Fetches stock counts for every product in one call — call this once
// (e.g. on a shop/apparel listing page) rather than one query per card.
export async function getAllStock() {
  const { data, error } = await supabase
    .from("inventory")
    .select("product_id, stock_count");
  if (error) {
    console.error("Failed to load inventory:", error.message);
    return {};
  }
  // Return as a lookup object: { "gsc-hat-001": 50, ... }
  return Object.fromEntries(
    data.map((row) => [row.product_id, row.stock_count]),
  );
}

// Fetches stock for a single product — use this on product detail pages.
export async function getStock(productId) {
  const { data, error } = await supabase
    .from("inventory")
    .select("stock_count")
    .eq("product_id", productId)
    .single();
  if (error) {
    console.error("Failed to load stock:", error.message);
    return null;
  }
  return data.stock_count;
}
