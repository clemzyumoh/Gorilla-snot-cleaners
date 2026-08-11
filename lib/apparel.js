// Apparel catalog for Gorilla Snot Cleaners.
// Unlike party supplies, apparel needs a size and color chosen before
// it can be added to the cart — see ApparelDetailClient.jsx.
//
// Each color now carries its own `image` — the product photo swaps to
// match whichever color is selected on the product page (see
// ApparelDetailClient.jsx). `image` on the product itself is just the
// fallback/default shown on cards (used before a color is picked, and
// as the ApparelCard thumbnail) — it's set to the first color's image.
//
// IMAGE FILE NAMES: update the paths below to match your actual files
// in /public/products/ if they're named differently than assumed here.

export const apparel = [
  {
    _id: "gsc-tee-001",
    slug: "logo-tee",
    name: "GSC Logo Tee",
    category: "T-Shirt",
    price: 22,
    image: "/products/T-white.png",
    tag: "Bestseller",
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "White", hex: "#FFFFFF", image: "/products/T-white.png" },
      { name: "Purple", hex: "#3D1F47", image: "/products/T-purple.png" },
      { name: "Blue", hex: "#2563EB", image: "/products/T-blue.png" },
    ],
    description:
      "The core GSC logo tee. Soft cotton, relaxed fit, built for a full day of party setup.",
  },
  {
    _id: "gsc-hoodie-001",
    slug: "party-crew-hoodie",
    name: "Party Crew Hoodie",
    category: "Hoodie",
    price: 42,
    image: "/products/hoody1.jfif",
    tag: "New",
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Red", hex: "#DC2626", image: "/products/hoody1.jfif" },
      { name: "Green", hex: "#5FAD56", image: "/products/hoody2.jfif" },
      { name: "Blue", hex: "#2563EB", image: "/products/hoody3.jfif" },
    ],
    description:
      "Heavyweight hoodie with the Party Crew graphic on the back. Made for the after-cleanup hang.",
  },
  {
    _id: "gsc-cap-001",
    slug: "gsc-cap",
    name: "GSC Cap",
    category: "Cap",
    price: 18,
    image: "/products/cap-blue.jfif",
    tag: "Essential",
    sizes: ["One Size"],
    colors: [
      { name: "Blue", hex: "#2563EB", image: "/products/cap-blue.jfif" },
      { name: "White", hex: "#FFFFFF", image: "/products/cap-white.jfif" },
      { name: "Yellow", hex: "#FFD23F", image: "/products/cap-yellow.jfif" },
    ],
    description: "Adjustable strapback cap with an embroidered gorilla mark.",
  },
  {
    _id: "gsc-tote-001",
    slug: "party-favor-tote",
    name: "Party Favor Tote",
    category: "Tote",
    price: 15,
    image: "/products/tote-white.png",
    tag: "Bundle-friendly",
    sizes: ["One Size"],
    colors: [
      { name: "Natural", hex: "#FFF8ED", image: "/products/tote-red.png" },
      { name: "Black", hex: "#3D1F47", image: "/products/tote-blue.png" },
    ],
    description:
      "Canvas tote big enough to double as a party favor bag. Doubles up nicely with the party bundle.",
  },
];

export function getApparelBySlug(slug) {
  return apparel.find((p) => p.slug === slug);
}
