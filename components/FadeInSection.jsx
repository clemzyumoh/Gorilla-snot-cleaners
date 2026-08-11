"use client";

import { motion } from "framer-motion";

// Generic wrapper: fades/slides in when scrolled into view, and fades
// back out if you scroll past it (out of view) since once: false.
export default function FadeInSection({ children, className = "" }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 40 }}
      viewport={{ once: false, amount: 0.2 }}
      transition={{ duration: 1.0, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
