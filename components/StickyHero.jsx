
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import LogoReveal from "@/components/LogoReveal";
import Image from "next/image";


// Swap these for your real product photos once you have them (drop the
// files in /public/products/ and update the paths).
const images = [
  "/products/D1.png",
  "/products/D2.png",
  "/products/D3.png",
  "/products/D4.png",
  "/products/D5.png",
  "/products/D6.png",
];

// Distance of each image from the center of the circle, in px.
// Increase for a wider circle, decrease for a tighter one.
const RADIUS = 160;


export default function StickyHero() {
  const [angleOffset, setAngleOffset] = useState(0);
const [radius, setRadius] = useState(160);

useEffect(() => {
  const updateRadius = () => setRadius(window.innerWidth < 768 ? 90 : 160);
  updateRadius();
  window.addEventListener("resize", updateRadius);
  return () => window.removeEventListener("resize", updateRadius);
}, []);
    
  useEffect(() => {
    const interval = setInterval(() => {
      // Rotate by one slot (360 / number of images) every 1 second.
      setAngleOffset((prev) => prev + 360 / images.length);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="bg-gradient-to-b from-sunshine/30 to-cream px-5 py-16">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-12 lg:flex-row md:justify-between">
        {/* Write-up — left side */}

        <div className="text-center lg:w-1/2 lg:text-left md:mt-8 ml-5">
          <div className=" md:flex w-full text-left hidden ">
            <Link
              href="/"
              className="shrink-0 font-display flex justify-center items-end text-5xl font-800 text-plum">
              <Image
                src="/products/gsc.png"
                alt="Party Hat"
                width={150}
                height={150}
              />
              orilla {}
              <span className="text-coral"> Snot</span> Cleaners
            </Link>
            {/* <LogoReveal /> */}
          </div>
          <div className=" flex w-full text-left md:hidden ">
            <Link
              href="/"
              className="shrink-0 font-display flex justify-center items-end text-xl font-800 text-plum ">
              <Image
                src="/products/gsc.png"
                alt="Party Hat"
                width={100}
                height={100}
              />
              orilla {}
              <span className="text-coral"> Snot</span> Cleaners
            </Link>
            {/* <LogoReveal /> */}
          </div>
          <p className="font-display text-sm font-700 uppercase tracking-widest text-coral">
            The Party Starts Here
          </p>
          <h1 className="mt-3 font-display text-4xl font-800 text-plum md:text-6xl">
            Party made perfect.
          </h1>
          <p className="mx-auto mt-4 max-w-md text-plum/70 lg:mx-0">
            Bold party hats, plates, and napkins for birthdays, showers,
            graduations, and everything worth celebrating.
          </p>
          <div className="mt-6 flex justify-center gap-3 lg:justify-start">
            <Link
              href="/shop"
              className="rounded-full bg-coral px-6 py-3 font-display font-700 text-white hoverEffect hover:bg-plum">
              Shop All Supplies
            </Link>
          </div>
        </div>

        {/* Circle of images — right side, logo fixed in the center */}
        <div className="relative mr-20 h-80 w-80 shrink-0 md:h-96 md:w-96">
          <div className="absolute left-1/2 top-1/2 z-10 md:translate-x-16 translate-x-8 translate-y-10 md:translate-y-16">
            <Image
              src="/products/gsc.png"
              alt="Party Hat"
              width={50}
              height={50}
            />
          </div>

          {images.map((src, i) => {
            const angle = (360 / images.length) * i + angleOffset;
            const radians = (angle * Math.PI) / 180;
            const x = radius * Math.cos(radians);
            const y = radius * Math.sin(radians);

            return (
              <motion.div
                key={i}
                className="absolute left-1/2 top-1/2 h-28 w-28 -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-cream p-2 shadow-lg md:h-48 md:w-48"
                animate={{ x, y }}
                transition={{ duration: 0.8, ease: "easeInOut" }}>
                <img
                  src={src}
                  alt=""
                  className="h-full w-full object-contain"
                />
                {/* <Image src={src} alt="" width={50} height={50} className="h-full w-full object-contain"/> */}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}






