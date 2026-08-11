// // Product catalog for Gorilla Snot Cleaners.
// // Swap the `image` paths for real product photography once available —
// // for now they point to /public/products/placeholder-*.svg

// export const occasions = [
//   { slug: "birthday", label: "Birthday" },
//   { slug: "baby-shower", label: "Baby Shower" },
//   { slug: "graduation", label: "Graduation" },
//   { slug: "holiday", label: "Holiday" },
// ];

// export const products = [
//   {
//     _id: "gsc-hat-001",
//     slug: "party-hats-pack",
//     name: "GSC Party Hats",
//     category: "Party Hats",
//     price: 4.99,
//     image: "/products/hat2.png",
//     tag: "Bestseller",
//     occasions: ["birthday", "graduation"],
//     description:
//       "A pack of bold, cone-shaped party hats with elastic chin straps. Bright colors that show up in every photo.",
//   },
//   {
//     _id: "gsc-plate-001",
//     slug: "branded-plates",
//     name: "GSC Branded Plates",
//     category: "Plates",
//     price: 6.99,
//     image: "/products/plate2.png",
//     tag: "New",
//     occasions: ["birthday", "baby-shower", "graduation", "holiday"],
//     description:
//       "Sturdy paper plates in the Gorilla Snot Cleaners colorway. Set the table right without the cleanup dread.",
//   },
//   {
//     _id: "gsc-napkin-001",
//     slug: "gsc-napkins",
//     name: "GSC Napkins",
//     category: "Napkins",
//     price: 3.49,
//     image: "/products/nap1.png",
//     tag: "Essential",
//     occasions: ["birthday", "baby-shower", "graduation", "holiday"],
//     description:
//       "Soft, absorbent napkins that match the rest of the GSC tableware set.",
//   },
//   {
//     _id: "gsc-bundle-001",
//     slug: "party-balloons",
//     name: "GSC Party Balloons",
//     category: "Balloons",
//     price: 19.99,
//     image: "/products/ballon22.png",
//     tag: "Balloons",
//     occasions: ["birthday", "baby-shower", "graduation", "holiday"],
//     description:
//       "Hats, plates, and napkins in one bundle — everything you need to set up fast.",
//   },
// ];

// export function getProductBySlug(slug) {
//   return products.find((p) => p.slug === slug);
// }

// export function getProductsByOccasion(occasionSlug) {
//   return products.filter((p) => p.occasions.includes(occasionSlug));
// }

// Product catalog for Gorilla Snot Cleaners.
// Swap the `image` paths for real product photography once available —
// for now most point to your uploaded /public/products/*.png files.
//
// NOTE ON NAMES/PRICES: the new items added below (balloons, extra hats,
// cups, decorations, party favors, extra napkins, tableware) use generic
// placeholder names, descriptions, and prices since none were specified —
// update those fields once you have real product details for each.

export const occasions = [
  { slug: "birthday", label: "Birthday" },
  { slug: "baby-shower", label: "Baby Shower" },
  { slug: "graduation", label: "Graduation" },
  { slug: "holiday", label: "Holiday" },
];

const allOccasions = ["birthday", "baby-shower", "graduation", "holiday"];

export const products = [
  // ===== EXISTING PRODUCTS (unchanged) =====
  {
    _id: "gsc-hat-001",
    slug: "party-hats-pack",
    name: "GSC Party Hats",
    category: "Party Hats",
    price: 4.99,
    image: "/products/hat2.png",
    tag: "Bestseller",
    occasions: ["birthday", "graduation"],
    description:
      "A pack of bold, cone-shaped party hats with elastic chin straps. Bright colors that show up in every photo.",
  },
  {
    _id: "gsc-plate-001",
    slug: "branded-plates",
    name: "GSC Branded Plates",
    category: "Plates",
    price: 6.99,
    image: "/products/plate2.png",
    tag: "New",
    occasions: ["birthday", "baby-shower", "graduation", "holiday"],
    description:
      "Sturdy paper plates in the Gorilla Snot Cleaners colorway. Set the table right without the cleanup dread.",
  },
  {
    _id: "gsc-napkin-001",
    slug: "gsc-napkins",
    name: "GSC Napkins",
    category: "Napkins",
    price: 3.49,
    image: "/products/nap1.png",
    tag: "Essential",
    occasions: ["birthday", "baby-shower", "graduation", "holiday"],
    description:
      "Soft, absorbent napkins that match the rest of the GSC tableware set.",
  },
  {
    _id: "gsc-bundle-001",
    slug: "party-balloons",
    name: "GSC Party Balloons",
    category: "Balloons",
    price: 19.99,
    image: "/products/ballon22.png",
    tag: "Balloons",
    occasions: ["birthday", "baby-shower", "graduation", "holiday"],
    description:
      "Hats, plates, and napkins in one bundle — everything you need to set up fast.",
  },

  // ===== NEW: BALLOONS (bal1–3.png) =====
  {
    _id: "gsc-balloon-002",
    slug: "party-balloons-2",
    name: "GSC Balloon Pack — Style 2",
    category: "Balloons",
    price: 9.99,
    image: "/products/bal1.png",
    tag: "New",
    occasions: allOccasions,
    description: "A vibrant pack of GSC balloons, ready to fill a room fast.",
  },
  {
    _id: "gsc-balloon-003",
    slug: "party-balloons-3",
    name: "GSC Balloon Pack — Style 3",
    category: "Balloons",
    price: 9.99,
    image: "/products/bal2.png",
    tag: "New",
    occasions: allOccasions,
    description: "A vibrant pack of GSC balloons, ready to fill a room fast.",
  },
  {
    _id: "gsc-balloon-004",
    slug: "party-balloons-4",
    name: "GSC Balloon Pack — Style 4",
    category: "Balloons",
    price: 9.99,
    image: "/products/bal3.png",
    tag: "New",
    occasions: allOccasions,
    description: "A vibrant pack of GSC balloons, ready to fill a room fast.",
  },

  // ===== NEW: PARTY HATS (hat3–6.png) =====
  {
    _id: "gsc-hat-003",
    slug: "party-hats-style-3",
    name: "GSC Party Hats — Style 3",
    category: "Party Hats",
    price: 4.99,
    image: "/products/hat3.png",
    tag: "New",
    occasions: allOccasions,
    description: "Another bold GSC party hat design for the collection.",
  },
  {
    _id: "gsc-hat-004",
    slug: "party-hats-style-4",
    name: "GSC Party Hats — Style 4",
    category: "Party Hats",
    price: 4.99,
    image: "/products/hat4.png",
    tag: "New",
    occasions: allOccasions,
    description: "Another bold GSC party hat design for the collection.",
  },
  {
    _id: "gsc-hat-005",
    slug: "party-hats-style-5",
    name: "GSC Party Hats — Style 5",
    category: "Party Hats",
    price: 4.99,
    image: "/products/hat5.png",
    tag: "New",
    occasions: allOccasions,
    description: "Another bold GSC party hat design for the collection.",
  },
  {
    _id: "gsc-hat-006",
    slug: "party-hats-style-6",
    name: "GSC Party Hats — Style 6",
    category: "Party Hats",
    price: 4.99,
    image: "/products/hat6.png",
    tag: "New",
    occasions: allOccasions,
    description: "Another bold GSC party hat design for the collection.",
  },

  // ===== NEW: CUPS =====
  {
    _id: "gsc-cup-001",
    slug: "plastic-cups",
    name: "GSC Plastic Cups",
    category: "Cups",
    price: 3.99,
    image: "/products/plastic-cup.png",
    tag: "Essential",
    occasions: allOccasions,
    description: "A pack of sturdy plastic cups in the GSC colorway.",
  },
  {
    _id: "gsc-cup-002",
    slug: "paper-plate-cup-set",
    name: "GSC Paper Plate & Cup Set",
    category: "Tableware",
    price: 8.99,
    image: "/products/paper p&c.png",
    tag: "Bundle-friendly",
    occasions: allOccasions,
    description:
      "Matching paper plates and cups in one set — quick table setup, one less thing to coordinate.",
  },

  // ===== NEW: DECORATIONS (deco1–4.png) =====
  {
    _id: "gsc-deco-001",
    slug: "party-decoration-1",
    name: "GSC Decoration Set 1",
    category: "Decorations",
    price: 6.99,
    image: "/products/deco1.png",
    tag: "New",
    occasions: allOccasions,
    description: "Streamers, banners, and hanging decor for the GSC look.",
  },
  {
    _id: "gsc-deco-002",
    slug: "party-decoration-2",
    name: "GSC Decoration Set 2",
    category: "Decorations",
    price: 6.99,
    image: "/products/deco2.png",
    tag: "New",
    occasions: allOccasions,
    description: "Streamers, banners, and hanging decor for the GSC look.",
  },
  {
    _id: "gsc-deco-003",
    slug: "party-decoration-3",
    name: "GSC Decoration Set 3",
    category: "Decorations",
    price: 6.99,
    image: "/products/deco3.png",
    tag: "New",
    occasions: allOccasions,
    description: "Streamers, banners, and hanging decor for the GSC look.",
  },
  {
    _id: "gsc-deco-004",
    slug: "party-decoration-4",
    name: "GSC Decoration Set 4",
    category: "Decorations",
    price: 6.99,
    image: "/products/deco4.png",
    tag: "New",
    occasions: allOccasions,
    description: "Streamers, banners, and hanging decor for the GSC look.",
  },

  // ===== NEW: PARTY FAVORS (pf1–6.png) =====
  {
    _id: "gsc-favor-001",
    slug: "party-favor-1",
    name: "GSC Party Favor 1",
    category: "Party Favors",
    price: 4.49,
    image: "/products/pf1.png",
    tag: "New",
    occasions: allOccasions,
    description: "A small party favor pack, ready to hand out to guests.",
  },
  {
    _id: "gsc-favor-002",
    slug: "party-favor-2",
    name: "GSC Party Favor 2",
    category: "Party Favors",
    price: 4.49,
    image: "/products/pf2.png",
    tag: "New",
    occasions: allOccasions,
    description: "A small party favor pack, ready to hand out to guests.",
  },
  {
    _id: "gsc-favor-003",
    slug: "party-favor-3",
    name: "GSC Party Favor 3",
    category: "Party Favors",
    price: 4.49,
    image: "/products/pf3.png",
    tag: "New",
    occasions: allOccasions,
    description: "A small party favor pack, ready to hand out to guests.",
  },
  {
    _id: "gsc-favor-004",
    slug: "party-favor-4",
    name: "GSC Party Favor 4",
    category: "Party Favors",
    price: 4.49,
    image: "/products/pf4.png",
    tag: "New",
    occasions: allOccasions,
    description: "A small party favor pack, ready to hand out to guests.",
  },
  {
    _id: "gsc-favor-005",
    slug: "party-favor-5",
    name: "GSC Party Favor 5",
    category: "Party Favors",
    price: 4.49,
    image: "/products/pf5.png",
    tag: "New",
    occasions: allOccasions,
    description: "A small party favor pack, ready to hand out to guests.",
  },
  {
    _id: "gsc-favor-006",
    slug: "party-favor-6",
    name: "GSC Party Favor 6",
    category: "Party Favors",
    price: 4.49,
    image: "/products/pf6.png",
    tag: "New",
    occasions: allOccasions,
    description: "A small party favor pack, ready to hand out to guests.",
  },

  // ===== NEW: NAPKINS (nap3–7.png) =====
  {
    _id: "gsc-napkin-003",
    slug: "gsc-napkins-3",
    name: "GSC Napkins — Style 3",
    category: "Napkins",
    price: 3.49,
    image: "/products/nap3.png",
    tag: "New",
    occasions: allOccasions,
    description: "Soft, absorbent napkins matching the GSC tableware set.",
  },
  {
    _id: "gsc-napkin-004",
    slug: "gsc-napkins-4",
    name: "GSC Napkins — Style 4",
    category: "Napkins",
    price: 3.49,
    image: "/products/nap4.png",
    tag: "New",
    occasions: allOccasions,
    description: "Soft, absorbent napkins matching the GSC tableware set.",
  },
  {
    _id: "gsc-napkin-005",
    slug: "gsc-napkins-5",
    name: "GSC Napkins — Style 5",
    category: "Napkins",
    price: 3.49,
    image: "/products/nap5.png",
    tag: "New",
    occasions: allOccasions,
    description: "Soft, absorbent napkins matching the GSC tableware set.",
  },
  {
    _id: "gsc-napkin-006",
    slug: "gsc-napkins-6",
    name: "GSC Napkins — Style 6",
    category: "Napkins",
    price: 3.49,
    image: "/products/nap6.png",
    tag: "New",
    occasions: allOccasions,
    description: "Soft, absorbent napkins matching the GSC tableware set.",
  },
  {
    _id: "gsc-napkin-007",
    slug: "gsc-napkins-7",
    name: "GSC Napkins — Style 7",
    category: "Napkins",
    price: 3.49,
    image: "/products/nap7.png",
    tag: "New",
    occasions: allOccasions,
    description: "Soft, absorbent napkins matching the GSC tableware set.",
  },

  // ===== NEW: TABLEWARE (tw1–6.png) =====
  {
    _id: "gsc-tableware-001",
    slug: "tableware-1",
    name: "GSC Tableware Set 1",
    category: "Tableware",
    price: 7.99,
    image: "/products/tw1.png",
    tag: "New",
    occasions: allOccasions,
    description: "Forks, spoons, and other tableware in the GSC colorway.",
  },
  {
    _id: "gsc-tableware-002",
    slug: "tableware-2",
    name: "GSC Tableware Set 2",
    category: "Tableware",
    price: 7.99,
    image: "/products/tw2.png",
    tag: "New",
    occasions: allOccasions,
    description: "Forks, spoons, and other tableware in the GSC colorway.",
  },
  {
    _id: "gsc-tableware-003",
    slug: "tableware-3",
    name: "GSC Tableware Set 3",
    category: "Tableware",
    price: 7.99,
    image: "/products/tw3.png",
    tag: "New",
    occasions: allOccasions,
    description: "Forks, spoons, and other tableware in the GSC colorway.",
  },
  {
    _id: "gsc-tableware-004",
    slug: "tableware-4",
    name: "GSC Tableware Set 4",
    category: "Tableware",
    price: 7.99,
    image: "/products/tw4.png",
    tag: "New",
    occasions: allOccasions,
    description: "Forks, spoons, and other tableware in the GSC colorway.",
  },
  {
    _id: "gsc-tableware-005",
    slug: "tableware-5",
    name: "GSC Tableware Set 5",
    category: "Tableware",
    price: 7.99,
    image: "/products/tw5.png",
    tag: "New",
    occasions: allOccasions,
    description: "Forks, spoons, and other tableware in the GSC colorway.",
  },
  {
    _id: "gsc-tableware-006",
    slug: "tableware-6",
    name: "GSC Tableware Set 6",
    category: "Tableware",
    price: 7.99,
    image: "/products/tw6.png",
    tag: "New",
    occasions: allOccasions,
    description: "Forks, spoons, and other tableware in the GSC colorway.",
  },
];

export function getProductBySlug(slug) {
  return products.find((p) => p.slug === slug);
}

export function getProductsByOccasion(occasionSlug) {
  return products.filter((p) => p.occasions.includes(occasionSlug));
}