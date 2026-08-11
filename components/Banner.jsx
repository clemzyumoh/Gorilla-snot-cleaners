"use client";

import Link from "next/link";

// Reusable banner slide — pass EITHER `image` OR `gradient`, not both.
// - image: renders as a full-bleed background photo with a dark overlay
//   baked in (so text stays readable over any photo).
// - gradient: renders the current colored-background style, no overlay.
export default function Banner({ title, subtitle, cta, href, image, gradient }) {
  return (
    <div
      className="relative flex h-full w-full flex-col items-center justify-center px-6 text-center text-white"
      style={
        image
          ? {
              backgroundImage: `url(${image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }
          : { background: gradient }
      }
    >
      {/* Dark overlay — only needed (and only rendered) for photo banners,
          so text stays readable regardless of what's in the photo. */}
      {image && <div className="absolute inset-0 bg-black/45" />}

      <div className="relative z-10">
        <h2 className="font-display text-2xl font-800 md:text-4xl">{title}</h2>
        <p className="mt-2 max-w-md text-sm text-white/90 md:text-base">
          {subtitle}
        </p>
        <Link
          href={href}
          className="mt-4 inline-block rounded-full bg-white px-5 py-2 font-display text-sm font-700 text-plum hoverEffect hover:bg-cream"
        >
          {cta}
        </Link>
      </div>
    </div>
  );
}
