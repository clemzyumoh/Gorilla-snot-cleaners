import ProductCard from "@/components/ProductCard";
import { occasions, getProductsByOccasion } from "@/lib/products";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return occasions.map((o) => ({ occasion: o.slug }));
}

export default function OccasionShopPage({ params }) {
  const occasion = occasions.find((o) => o.slug === params.occasion);
  if (!occasion) return notFound();

  const items = getProductsByOccasion(occasion.slug);

  return (
    <div className="mx-auto max-w-6xl px-5 py-12">
      <h1 className="font-display text-3xl font-800 text-plum">
        {occasion.label} Supplies
      </h1>
      <p className="mt-2 text-plum/70">
        Everything you need to set up for a {occasion.label.toLowerCase()}.
      </p>
      {items.length === 0 ? (
        <p className="mt-8 text-plum/60">
          No products tagged for this occasion yet — check back soon.
        </p>
      ) : (
        <div className="mt-8 grid grid-cols-2 gap-5 md:grid-cols-4">
          {items.map((p) => (
            <ProductCard key={p._id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
