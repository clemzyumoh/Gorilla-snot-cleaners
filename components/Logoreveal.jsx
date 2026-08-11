// "use client";

// import { motion } from "framer-motion";
// import { useState, useEffect } from "react";
// import Image from "next/image";
// import { GiGorilla } from "react-icons/gi";

// // Stages:
// // "approach" -> the "G" and the gorilla icon sit near each other
// // "collide"  -> they slide together and both vanish
// // "logo"     -> the real gsc.png logo image pops in (this replaces "Gorilla" entirely)
// // "letters"  -> " Snot Cleaners" falls into place right after the logo image
// // "done"     -> final state — matches your target markup exactly
// export default function LogoReveal() {
//   const [stage, setStage] = useState("approach");

//   useEffect(() => {
//     const timers = [
//       setTimeout(() => setStage("collide"), 700),
//       setTimeout(() => setStage("logo"), 1100),
//       setTimeout(() => setStage("letters"), 1600),
//       setTimeout(() => setStage("done"), 2800),
//     ];
//     return () => timers.forEach(clearTimeout);
//   }, []);

//   const collided = stage !== "approach";
//   const logoVisible =
//     stage === "logo" || stage === "letters" || stage === "done";
//   const lettersVisible = stage === "letters" || stage === "done";

//   // Matches your target exactly: coral "Snot", then plain " Cleaners"
//   const coralText = " Snot";
//   const plumText = " Cleaners";

//   return (
//     <div className="relative flex h-24 items-end justify-center select-none">
//       {/* G and gorilla icon — visible only before collision */}
//       {!logoVisible && (
//         <div className="flex items-end justify-center">
//           <motion.span
//             className="text-5xl font-black tracking-tighter text-plum"
//             initial={{ x: -30, opacity: 1 }}
//             animate={
//               collided
//                 ? { x: 0, opacity: 0, scale: 0.6 }
//                 : { x: 0, opacity: 1, scale: 1 }
//             }
//             transition={{ duration: 0.4, ease: "easeIn" }}>
//             G
//           </motion.span>

//           <motion.div
//             initial={{ x: 30, opacity: 1, scale: 1 }}
//             animate={
//               collided
//                 ? { x: -10, opacity: 0, scale: 0.6, rotate: -15 }
//                 : { x: 0, opacity: 1, scale: 1 }
//             }
//             transition={{ duration: 0.4, ease: "easeIn" }}>
//             <GiGorilla className="h-10 w-10 text-emerald-500" />
//           </motion.div>
//         </div>
//       )}

//       {/* Final logo state — image + falling text, matches your target markup */}
//       {logoVisible && (
//         <div className="flex items-end justify-center font-display text-xl font-800 text-plum">
//           <motion.div
//             initial={{ scale: 0, opacity: 0 }}
//             animate={{ scale: 1, opacity: 1 }}
//             transition={{ duration: 0.35, ease: "backOut" }}>
//             <Image
//               src="/products/gsc.png"
//               alt="Party Hat"
//               width={50}
//               height={50}
//             />
//           </motion.div>

//           <span className="flex">
//             {coralText.split("").map((letter, i) => (
//               <motion.span
//                 key={`coral-${i}`}
//                 className="inline-block text-coral"
//                 initial={{ y: -60, opacity: 0 }}
//                 animate={
//                   lettersVisible ? { y: 0, opacity: 1 } : { y: -60, opacity: 0 }
//                 }
//                 transition={{
//                   duration: 0.4,
//                   delay: i * 0.04,
//                   ease: [0.22, 1, 0.36, 1],
//                 }}>
//                 {letter === " " ? "\u00A0" : letter}
//               </motion.span>
//             ))}
//             {plumText.split("").map((letter, i) => (
//               <motion.span
//                 key={`plum-${i}`}
//                 className="inline-block text-plum"
//                 initial={{ y: -60, opacity: 0 }}
//                 animate={
//                   lettersVisible ? { y: 0, opacity: 1 } : { y: -60, opacity: 0 }
//                 }
//                 transition={{
//                   duration: 0.4,
//                   delay: (coralText.length + i) * 0.04,
//                   ease: [0.22, 1, 0.36, 1],
//                 }}>
//                 {letter === " " ? "\u00A0" : letter}
//               </motion.span>
//             ))}
//           </span>
//         </div>
//       )}
//     </div>
//   );
// }

"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function LogoReveal() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="shrink-0 font-display flex justify-center items-end text-xl font-800 text-plum">
      <Image src="/products/gsc.png" alt="Party Hat" width={50} height={50} />
      <span className="text-coral text-6xl"> Snot</span> Cleaners
    </motion.div>
  );
}
