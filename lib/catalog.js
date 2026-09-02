// Server-side product lookup — combines products + apparel into one
// index so the checkout route can validate prices against real data
// instead of trusting whatever price the browser sends.
import { products } from "@/lib/products";
import { apparel } from "@/lib/apparel";

const catalog = [...products, ...apparel];

export function getRealPrice(baseProductId) {
  const item = catalog.find((p) => p._id === baseProductId);
  return item ? item.price : null;
}
