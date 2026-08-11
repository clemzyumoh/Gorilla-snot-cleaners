// "use client";

// import { useState, useEffect } from "react";
// import { AnimatePresence, motion } from "framer-motion";
// import Link from "next/link";

// // Full-width slideshow — one banner visible at a time, slides out to the
// // left while the next slides in from the right, loops back to the first
// // after the last. Swap the `banners` content/gradients for real campaign
// // art whenever you have it.
// const banners = [
//   {
//     title: "Birthday Bundles, Sorted",
//     subtitle: "Everything you need in one bundle — hats, plates, napkins.",
//     cta: "Shop Bundles",
//     href: "/shop",
//     gradient: "linear-gradient(135deg, #FFD23F, #FF5D5D)",
//   },
//   {
//     title: "New: Baby Shower Range",
//     subtitle: "Soft colors, same bold energy.",
//     cta: "Shop Baby Shower",
//     href: "/shop",
//     gradient: "linear-gradient(135deg, #5FAD56, #FFD23F)",
//   },
//   {
//     title: "Wear the Brand",
//     subtitle: "Tees, hoodies, and caps built for party day.",
//     cta: "Shop Apparel",
//     href: "/apparel",
//     gradient: "linear-gradient(135deg, #3D1F47, #FF5D5D)",
//   },
// ];

// export default function BannerCarousel() {
//   const [current, setCurrent] = useState(0);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrent((c) => (c + 1) % banners.length);
//     }, 4000);
//     return () => clearInterval(interval);
//   }, []);

//   const banner = banners[current];

//   return (
//     <div className="relative h-56 overflow-hidden rounded-xl2 md:h-72">
//       <AnimatePresence mode="wait">
//         <motion.div
//           key={current}
//           initial={{ x: "100%", opacity: 0 }}
//           animate={{ x: 0, opacity: 1 }}
//           exit={{ x: "-100%", opacity: 0 }}
//           transition={{ duration: 0.6, ease: "easeInOut" }}
//           className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center text-white"
//           style={{ background: banner.gradient }}
//         >
//           <h2 className="font-display text-2xl font-800 md:text-4xl">
//             {banner.title}
//           </h2>
//           <p className="mt-2 max-w-md text-sm text-white/90 md:text-base">
//             {banner.subtitle}
//           </p>
//           <Link
//             href={banner.href}
//             className="mt-4 rounded-full bg-white px-5 py-2 font-display text-sm font-700 text-plum hoverEffect hover:bg-cream"
//           >
//             {banner.cta}
//           </Link>
//         </motion.div>
//       </AnimatePresence>

//       {/* Dots */}
//       <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-2">
//         {banners.map((_, i) => (
//           <button
//             key={i}
//             onClick={() => setCurrent(i)}
//             aria-label={`Go to banner ${i + 1}`}
//             className={`h-2 w-2 rounded-full ${
//               i === current ? "bg-white" : "bg-white/40"
//             }`}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }


"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Banner from "@/components/Banner";

// Each entry uses EITHER `image` (real photo) OR `gradient` (color
// background) — see Banner.jsx. Mix and match freely.
const banners = [
  {
    title: "Birthday Bundles, Sorted",
    subtitle: "Everything you need in one bundle — hats, plates, napkins.",
    cta: "Shop Bundles",
    href: "/shop",
     image: "/products/D4.png",
    // gradient: "linear-gradient(135deg, #FFD23F, #FF5D5D)",
    // image: "/products/banner-birthday.jpg", // swap to this once you have a real photo
  },
  {
    title: "New: Baby Shower Range",
    subtitle: "Soft colors, same bold energy.",
    cta: "Shop Baby Shower",
    href: "/shop",
     image: "/products/occ4.png",
    // gradient: "linear-gradient(135deg, #5FAD56, #FFD23F)",
  },
  {
    title: "Wear the Brand",
    subtitle: "Tees, hoodies, and caps built for party day.",
    cta: "Shop Apparel",
    href: "/apparel",
     image: "/products/D2.png",
    // gradient: "linear-gradient(135deg, #3D1F47, #FF5D5D)",
  },
];

export default function BannerCarousel() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((c) => (c + 1) % banners.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-56 overflow-hidden rounded-xl2 md:h-72">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ x: "100%", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: "-100%", opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="absolute inset-0">
          <Banner {...banners[current]} />
        </motion.div>
      </AnimatePresence>

      {/* Dots */}
      <div className="absolute bottom-3 left-1/2 z-20 flex -translate-x-1/2 gap-2">
        {banners.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={`Go to banner ${i + 1}`}
            className={`h-2 w-2 rounded-full ${
              i === current ? "bg-white" : "bg-white/40"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
