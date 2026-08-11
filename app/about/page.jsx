// export const metadata = { title: "About | Gorilla Snot Cleaners" };

// export default function AboutPage() {
//   return (
//     <div className="mx-auto max-w-2xl px-5 py-16">
//       <h1 className="font-display text-3xl font-800 text-plum">
//         We Don&apos;t Do Boring Parties
//       </h1>
//       <p className="mt-4 text-plum/70">
//         Gorilla Snot Cleaners is a party supply brand built for people who go
//         all out. From hats to plates to napkins, we supply the energy — you
//         supply the guest list.
//       </p>
//     </div>
//   );
// }

import Link from "next/link";
import FadeInSection from "@/components/FadeInSection";
import ValueCards from "@/components/ValueCards";

export const metadata = { title: "About | Gorilla Snot Cleaners" };

export default function AboutPage() {
  return (
    <div>
      {/* HERO */}
      <FadeInSection className="bg-gradient-to-b from-sunshine/30 to-cream px-5 py-16 text-center">
        <p className="font-display text-sm font-700 uppercase tracking-widest text-coral">
          Our Story
        </p>
        <h1 className="mx-auto mt-3 max-w-2xl font-display text-4xl font-800 text-plum md:text-6xl">
          We Don&apos;t Do Boring Parties
        </h1>
        <p className="mx-auto mt-4 max-w-md text-plum/70">
          Gorilla Snot Cleaners is a party supply brand built for people who go
          all out.
        </p>
      </FadeInSection>

      {/* STORY — image + text */}
      <FadeInSection className="mx-auto grid max-w-6xl gap-10 px-5 py-16 md:grid-cols-2 md:items-center">
        <div className="flex items-center justify-center rounded-xl2 bg-cream p-10">
          <img
            src="/products/gsc.png"
            alt="Gorilla Snot Cleaners mascot"
            className="h-48 w-48 object-contain"
          />
        </div>
        <div>
          <h2 className="font-display text-2xl font-800 text-plum">
            From hats to plates to napkins
          </h2>
          <p className="mt-4 text-plum/70">
            We supply the energy — you supply the guest list. Every product we
            make is built for people who want their party to actually feel like
            a party: bold colors, no boring beige, no "fine, I guess" tableware.
          </p>
          <p className="mt-4 text-plum/70">
            Whether it&apos;s a birthday, a baby shower, or just because —
            Gorilla Snot Cleaners is here to make sure the setup looks as good
            as the celebration deserves.
          </p>
        </div>
      </FadeInSection>

      {/* VALUES — staggered cards */}
      <section className="mx-auto max-w-6xl px-5 py-16">
        <h2 className="mb-6 text-center font-display text-2xl font-800 text-plum">
          What We Stand For
        </h2>
        <ValueCards />
      </section>

      {/* CTA */}
      <FadeInSection className="bg-plum px-5 py-16 text-center">
        <h2 className="font-display text-2xl font-800 text-cream md:text-3xl">
          Ready to party?
        </h2>
        <Link
          href="/shop"
          className="mt-6 inline-block rounded-full bg-coral px-6 py-3 font-display font-700 text-white hoverEffect hover:bg-sunshine hover:text-plum">
          Shop the Collection
        </Link>
      </FadeInSection>
    </div>
  );
}
