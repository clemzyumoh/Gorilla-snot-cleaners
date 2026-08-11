
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import OccasionTiles from "@/components/OccasionTiles";
import StickyHero from "@/components/StickyHero";
import { products } from "@/lib/products";
import ApparelCard from "@/components/ApparelCard";
import { apparel } from "@/lib/apparel";
import FadeInSection from "@/components/FadeInSection";
import ApparelCarousel from "@/components/ApparelCarousel";


export default function Home() {
  const featured = products.slice(0, 4);
const featuredApparel = apparel.slice(0, 4);
  return (
    <div>
      {/* HERO */}
      <StickyHero />

      {/* SHOP BY OCCASION */}
      <FadeInSection className="mx-auto max-w-6xl px-5 py-16">
        <h2 className="mb-6 font-display text-2xl font-800 text-plum">
          Shop by Occasion
        </h2>
        <OccasionTiles />
      </FadeInSection>

      {/* FEATURED PRODUCTS */}
      <FadeInSection className="mx-auto max-w-6xl px-5 py-16">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="font-display text-2xl font-800 text-plum">
            Bestsellers
          </h2>
          <Link
            href="/shop"
            className="font-display text-sm font-700 text-coral hover:underline">
            View All
          </Link>
        </div>
        <div className="grid grid-cols-1  md:grid-cols-2 gap-5 lg:grid-cols-4">
          {featured.map((p) => (
            <ProductCard key={p._id} product={p} />
          ))}
        </div>
      </FadeInSection>

      {/* FEATURED PRODUCTS */}
      <section className="mx-auto max-w-6xl px-5 py-16">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="font-display text-2xl font-800 text-plum">
            APPARELS
          </h2>
          <Link
            href="/apparel"
            className="font-display text-sm font-700 text-coral hover:underline">
            View All
          </Link>
        </div>
        {/* <div className="grid grid-cols-1  md:grid-cols-2 gap-5 lg:grid-cols-4">
          {featuredApparel.map((p) => (
            <ApparelCard key={p._id} product={p} />
          ))}
        </div> */}
        <ApparelCarousel items={featuredApparel} />
      </section>
    </div>
  );
}