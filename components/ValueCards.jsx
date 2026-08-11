"use client";

import { motion } from "framer-motion";

const values = [
  { title: "Bold", text: "No pastel-and-quiet party supplies here. Everything is made to be seen." },
  { title: "Fun First", text: "If it's not fun to use, we don't sell it." },
  { title: "No Boring Parties", text: "We build supplies for the party you actually want to throw." },
  { title: "Built to Last the Night", text: "Sturdy enough to survive the whole event, not just the photos." },
];

// Cards fade/slide in one after another as the section scrolls into view,
// using staggerChildren on the parent container.
export default function ValueCards() {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.2 }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: 0.15 } },
      }}
      className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-4"
    >
      {values.map((v) => (
        <motion.div
          key={v.title}
          variants={{
            hidden: { opacity: 0, y: 30 },
            show: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="rounded-xl2 border border-plum/10 bg-white p-6"
        >
          <h3 className="font-display font-800 text-plum">{v.title}</h3>
          <p className="mt-2 text-sm text-plum/70">{v.text}</p>
        </motion.div>
      ))}
    </motion.div>
  );
}
