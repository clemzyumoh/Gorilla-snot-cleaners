import { products } from "@/lib/products";
import { apparel } from "@/lib/apparel";
import { occasions } from "@/lib/products";

const BASE_URL = "https://gorilla-snot-cleaners.vercel.app";

export default function sitemap() {
  const staticRoutes = [
    "",
    "/shop",
    "/apparel",
    "/about",
    "/contact",
    "/privacy-policy",
    "/terms-of-service",
    "/refund-policy",
  ].map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
  }));

  const occasionRoutes = occasions.map((o) => ({
    url: `${BASE_URL}/shop/${o.slug}`,
    lastModified: new Date(),
  }));

  const productRoutes = products.map((p) => ({
    url: `${BASE_URL}/products/${p.slug}`,
    lastModified: new Date(),
  }));

  const apparelRoutes = apparel.map((p) => ({
    url: `${BASE_URL}/apparel/${p.slug}`,
    lastModified: new Date(),
  }));

  return [
    ...staticRoutes,
    ...occasionRoutes,
    ...productRoutes,
    ...apparelRoutes,
  ];
}
