// import ApparelCard from "@/components/ApparelCard";
// import { apparel } from "@/lib/apparel";

// export const metadata = { title: "Apparel | Gorilla Snot Cleaners" };

// export default function ApparelPage() {
//   return (
//     <div className="mx-auto max-w-6xl px-5 py-12">
//       <h1 className="font-display text-3xl font-800 text-plum">
//         Branded Apparel
//       </h1>
//       <p className="mt-2 text-plum/70">
//         Wear the brand. Tees, hoodies, caps, and totes.
//       </p>
//       <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-5 lg:grid-cols-4">
//         {apparel.map((p) => (
//           <ApparelCard key={p._id} product={p} />
//         ))}
//       </div>
//     </div>
//   );
// }

"use client";

import { useState, useMemo, useEffect } from "react";
import ApparelCard from "@/components/ApparelCard";
import BannerCarousel from "@/components/BannerCarousel";
import { apparel } from "@/lib/apparel";

const PAGE_SIZE = 12;

const categories = [...new Set(apparel.map((p) => p.category))];
const allSizes = [...new Set(apparel.flatMap((p) => p.sizes))];
const allColors = [
  ...new Set(apparel.flatMap((p) => p.colors.map((c) => c.name))),
];

const sortOptions = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "name-asc", label: "Name: A to Z" },
];

export default function ApparelPage() {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [sortBy, setSortBy] = useState("featured");
  const [page, setPage] = useState(1);

  const toggleCategory = (cat) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat],
    );
  };

  const toggleSize = (size) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size],
    );
  };

  const toggleColor = (color) => {
    setSelectedColors((prev) =>
      prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color],
    );
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedSizes([]);
    setSelectedColors([]);
  };

  // Filter + sort
  const filteredSorted = useMemo(() => {
    let result = apparel.filter((p) => {
      const categoryMatch =
        selectedCategories.length === 0 ||
        selectedCategories.includes(p.category);
      const sizeMatch =
        selectedSizes.length === 0 ||
        p.sizes.some((s) => selectedSizes.includes(s));
      const colorMatch =
        selectedColors.length === 0 ||
        p.colors.some((c) => selectedColors.includes(c.name));
      return categoryMatch && sizeMatch && colorMatch;
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
  }, [selectedCategories, selectedSizes, selectedColors, sortBy]);

  // Reset to page 1 whenever filters or sort change
  useEffect(() => {
    setPage(1);
  }, [selectedCategories, selectedSizes, selectedColors, sortBy]);

  const totalPages = Math.max(1, Math.ceil(filteredSorted.length / PAGE_SIZE));
  const paginated = filteredSorted.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE,
  );

  const hasActiveFilters =
    selectedCategories.length > 0 ||
    selectedSizes.length > 0 ||
    selectedColors.length > 0;

  return (
    <div className="mx-auto max-w-6xl px-5 py-8">
      {/* TOP BANNER CAROUSEL */}
      <BannerCarousel />

      <div className="mt-10 flex flex-col gap-8 md:flex-row">
        {/* FILTER SIDEBAR */}
        <aside className="shrink-0 md:w-56">
          <div className="flex items-center justify-between">
            <h2 className="font-display font-800 text-plum">Filters</h2>
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="text-xs font-700 text-coral hover:underline">
                Clear
              </button>
            )}
          </div>

          <div className="mt-4">
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

          <div className="mt-6">
            <h3 className="text-sm font-700 text-plum">Size</h3>
            <div className="mt-2 flex flex-wrap gap-2">
              {allSizes.map((size) => (
                <button
                  key={size}
                  onClick={() => toggleSize(size)}
                  className={`rounded-full border px-3 py-1 text-xs font-700 hoverEffect ${
                    selectedSizes.includes(size)
                      ? "border-plum bg-plum text-cream"
                      : "border-plum/20 text-plum hover:border-coral"
                  }`}>
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6">
            <h3 className="text-sm font-700 text-plum">Color</h3>
            <div className="mt-2 space-y-2">
              {allColors.map((color) => (
                <label
                  key={color}
                  className="flex items-center gap-2 text-sm text-plum/80">
                  <input
                    type="checkbox"
                    checked={selectedColors.includes(color)}
                    onChange={() => toggleColor(color)}
                    className="accent-coral"
                  />
                  {color}
                </label>
              ))}
            </div>
          </div>
        </aside>

        {/* APPAREL */}
        <div className="flex-1">
          {/* SORT BAR */}
          <div className="flex items-center justify-between border-b border-plum/10 pb-4">
            <p className="text-sm text-plum/60">
              {filteredSorted.length} item
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

          {/* APPAREL GRID — 12 per page */}
          {paginated.length === 0 ? (
            <p className="mt-10 text-center text-plum/60">
              No items match these filters.
            </p>
          ) : (
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-5 lg:grid-cols-3">
              {paginated.map((p) => (
                <ApparelCard key={p._id} product={p} />
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