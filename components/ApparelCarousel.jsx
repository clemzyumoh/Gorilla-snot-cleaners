
"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ApparelCard from "@/components/ApparelCard";
import { FaRegArrowAltCircleLeft } from "react-icons/fa";
import { FaRegArrowAltCircleRight } from "react-icons/fa";
// Every card keeps one persistent identity (same key) the whole time —
// only its x position/scale/opacity change as `index` changes. Framer
// Motion then animates that change smoothly, producing a real slide
// (right -> center -> left) instead of cards fading in/out in place.
const SPACING = 220; // px between each card's position

function circularDiff(i, index, length) {
  let diff = i - index;
  if (diff > length / 2) diff -= length;
  if (diff < -length / 2) diff += length;
  return diff;
}

export default function ApparelCarousel({ items }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((i) => (i + 1) % items.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [items.length]);

  const goTo = (direction) => {
    setIndex((i) => (i + direction + items.length) % items.length);
  };

  return (
    <div className="relative flex items-center justify-center gap-4 py-6">
      <button
        onClick={() => goTo(-1)}
        aria-label="Previous"
        className="z-20 hidden h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-plum shadow-md hoverEffect hover:bg-coral md:flex">
        <FaRegArrowAltCircleLeft />
      </button>

      <div className="relative flex h-96 w-full max-w-3xl items-center justify-center overflow-hidden md:h-[450px]">
        {items.map((item, i) => {
          const diff = circularDiff(i, index, items.length);
          const isCenter = diff === 0;
          const isVisible = Math.abs(diff) <= 1;

          return (
            <motion.div
              key={item._id}
              animate={{
                x: diff * SPACING,
                scale: isCenter ? 1.1 : isVisible ? 0.8 : 0.6,
                opacity: isVisible ? (isCenter ? 1 : 0.6) : 0,
                zIndex: isCenter ? 10 : 1,
              }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="absolute w-52 md:w-64"
              style={{ pointerEvents: isVisible ? "auto" : "none" }}>
              <ApparelCard product={item} />
            </motion.div>
          );
        })}
      </div>

      <button
        onClick={() => goTo(1)}
        aria-label="Next"
        className="z-20 hidden h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-plum shadow-md hoverEffect hover:bg-coral md:flex">
        <FaRegArrowAltCircleRight />
      </button>
    </div>
  );
}


// Here's a categorized list to round out your catalog — a mix of what you already have plus common party-supply staples worth adding:

// ## Party Hats
// - Classic cone hats
// - Pom-pom top hats
// - Number/age hats (e.g. "1st", "18")
// - Foil/metallic hats
// - Character/theme hats (jungle, princess, superhero)

// ## Plates
// - Dinner plates (9")
// - Dessert/snack plates (7")
// - Compostable/eco plates (good upsell option)
// - Themed plate sets (by color or pattern)

// ## Napkins
// - Lunch napkins
// - Beverage/cocktail napkins (smaller, for drinks)
// - Guest towels (for bathroom, nicer events)

// ## Cups & Tableware
// - Plastic cups (solo-style)
// - Paper cups
// - Cutlery sets (fork/knife/spoon)
// - Tablecloths (plastic, paper, or fabric)
// - Table runners

// ## Balloons
// - Latex balloons (solid colors, assorted packs)
// - Foil/mylar balloons (numbers, letters, shapes)
// - Balloon arch kits
// - Confetti-filled balloons

// ## Decorations
// - Streamers (crepe paper, foil)
// - Banners ("Happy Birthday," "Congrats," customizable)
// - Confetti (table scatter, poppers)
// - Backdrops (photo booth style)
// - Hanging paper decorations (fans, lanterns, honeycomb)

// ## Party Favors
// - Favor bags/boxes
// - Small toys/trinkets
// - Candy/treat bags
// - Custom favor tags

// ## Candles & Cake Toppers
// - Number candles
// - Sparkler candles
// - Cake toppers (themed, "Happy Birthday" script)

// ## Tableware Bundles
// - Full party packs (plates + cups + napkins + tablecloth, one bundle — matches your existing "GSC Party Bundle")
// - Themed bundles (by occasion: birthday, baby shower, graduation)

// ## Signage & Extras
// - Photo booth props
// - Guest books
// - Welcome signs

// ---

// **My suggestion for what to prioritize first**, given your current 4-product catalog (hats, plates, napkins, bundle): add **balloons**, **streamers/banners**, and **cups & cutlery** next — those round out a "complete party in one order" feel without overwhelming your boss's actual initial stock (hats/plates/napkins), and match what he mentioned selling.

// Want me to update your `lib/products.js` with a few of these once you decide which ones you're actually stocking?