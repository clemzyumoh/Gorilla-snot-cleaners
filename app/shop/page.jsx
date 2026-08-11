

"use client";

import { useState, useMemo, useEffect } from "react";
import ProductCard from "@/components/ProductCard";
import BannerCarousel from "@/components/BannerCarousel";
import { products, occasions } from "@/lib/products";

const PAGE_SIZE = 12;

const categories = [...new Set(products.map((p) => p.category))];

const sortOptions = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "name-asc", label: "Name: A to Z" },
];

export default function ShopPage() {
  const [selectedOccasions, setSelectedOccasions] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [sortBy, setSortBy] = useState("featured");
  const [page, setPage] = useState(1);

  const toggleOccasion = (slug) => {
    setSelectedOccasions((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug],
    );
  };

  const toggleCategory = (cat) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat],
    );
  };

  const clearFilters = () => {
    setSelectedOccasions([]);
    setSelectedCategories([]);
  };

  // Filter + sort
  const filteredSorted = useMemo(() => {
    let result = products.filter((p) => {
      const occasionMatch =
        selectedOccasions.length === 0 ||
        p.occasions.some((o) => selectedOccasions.includes(o));
      const categoryMatch =
        selectedCategories.length === 0 ||
        selectedCategories.includes(p.category);
      return occasionMatch && categoryMatch;
    });

    switch (sortBy) {
      case "price-asc":
        result = [...result].sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result = [...result].sort((a, b) => b.price - a.price);
        break;
      case "name-asc":
        result = [...result].sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        break; // "featured" — keep original order
    }

    return result;
  }, [selectedOccasions, selectedCategories, sortBy]);

  // Reset to page 1 whenever filters or sort change
  useEffect(() => {
    setPage(1);
  }, [selectedOccasions, selectedCategories, sortBy]);

  const totalPages = Math.max(1, Math.ceil(filteredSorted.length / PAGE_SIZE));
  const paginated = filteredSorted.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE,
  );

  return (
    <div className="mx-auto max-w-6xl px-5 py-8">
      {/* TOP BANNER CAROUSEL */}
      <BannerCarousel />

      <div className="mt-10 flex flex-col gap-8 md:flex-row">
        {/* FILTER SIDEBAR */}
        <aside className="shrink-0 md:w-56">
          <div className="flex items-center justify-between">
            <h2 className="font-display font-800 text-plum">Filters</h2>
            {(selectedOccasions.length > 0 ||
              selectedCategories.length > 0) && (
              <button
                onClick={clearFilters}
                className="text-xs font-700 text-coral hover:underline">
                Clear
              </button>
            )}
          </div>

          <div className="mt-4">
            <h3 className="text-sm font-700 text-plum">Occasion</h3>
            <div className="mt-2 space-y-2">
              {occasions.map((o) => (
                <label
                  key={o.slug}
                  className="flex items-center gap-2 text-sm text-plum/80">
                  <input
                    type="checkbox"
                    checked={selectedOccasions.includes(o.slug)}
                    onChange={() => toggleOccasion(o.slug)}
                    className="accent-coral"
                  />
                  {o.label}
                </label>
              ))}
            </div>
          </div>

          <div className="mt-6">
            <h3 className="text-sm font-700 text-plum">Category</h3>
            <div className="mt-2 space-y-2">
              {categories.map((cat) => (
                <label
                  key={cat}
                  className="flex items-center gap-2 text-sm text-plum/80">
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(cat)}
                    onChange={() => toggleCategory(cat)}
                    className="accent-coral"
                  />
                  {cat}
                </label>
              ))}
            </div>
          </div>
        </aside>

        {/* PRODUCTS */}
        <div className="flex-1">
          {/* SORT BAR */}
          <div className="flex items-center justify-between border-b border-plum/10 pb-4">
            <p className="text-sm text-plum/60">
              {filteredSorted.length} product
              {filteredSorted.length !== 1 ? "s" : ""}
            </p>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="rounded-full border border-plum/20 bg-white px-3 py-2 text-sm font-700 text-plum outline-none">
              {sortOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          {/* PRODUCT GRID — 12 per page */}
          {paginated.length === 0 ? (
            <p className="mt-10 text-center text-plum/60">
              No products match these filters.
            </p>
          ) : (
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-5 lg:grid-cols-3">
              {paginated.map((p) => (
                <ProductCard key={p._id} product={p} />
              ))}
            </div>
          )}

          {/* PAGINATION */}
          {totalPages > 1 && (
            <div className="mt-10 flex items-center justify-center gap-2">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="rounded-full border border-plum/20 px-3 py-1 text-sm font-700 text-plum disabled:opacity-40">
                Prev
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`h-8 w-8 rounded-full text-sm font-700 ${
                    p === page
                      ? "bg-plum text-cream"
                      : "text-plum hover:bg-cream"
                  }`}>
                  {p}
                </button>
              ))}
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="rounded-full border border-plum/20 px-3 py-1 text-sm font-700 text-plum disabled:opacity-40">
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
