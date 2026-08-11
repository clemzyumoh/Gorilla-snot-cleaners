

"use client";

import Link from "next/link";
import { useState } from "react";
import { useCartStore } from "@/store/cartStore";
import { useAuthStore } from "@/store/authStore";
import CurrencySwitcher from "@/components/CurrencySwitcher";

import { FaSearchengin } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import { GiRoyalLove } from "react-icons/gi";
import { VscAccount } from "react-icons/vsc";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useFavoritesStore } from "@/store/favoritesStore";
import { GiPartyHat } from "react-icons/gi";
import { products } from "@/lib/products";
import { apparel } from "@/lib/apparel";


const searchIndex = [
  ...products.map((p) => ({ ...p, href: `/products/${p.slug}` })),
  ...apparel.map((p) => ({ ...p, href: `/apparel/${p.slug}` })),
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const totalItems = useCartStore((s) => s.totalItems());
  const user = useAuthStore((s) => s.user);
  const pathname = usePathname();
  const totalFavorites = useFavoritesStore((s) => s.items.length);


const results =
  query.trim().length > 0
    ? searchIndex
        .filter((p) => p.name.toLowerCase().includes(query.toLowerCase()))
        .slice(0, 6)
    : [];
  
  return (
    <header className="sticky top-0 z-50 border-b border-plum/10 bg-cream/95 backdrop-blur ">
      {/* ================= LAP VIEW (md and up) ================= */}
      {/* Row 1: Logo | Search bar (centered) | Icons */}
      <div className="mx-auto hidden max-w-6xl items-center justify-between gap-4 px-5 py-4 lg:flex">
        <Link
          href="/"
          className="shrink-0 font-display flex justify-center items-end text-xl font-800 text-plum">
          <Image
            src="/products/gsc.png"
            alt="Party Hat"
            width={50}
            height={50}
          />
          <span className="text-coral"> Snot</span> Cleaners
        </Link>

        {/* <div className="hidden justify-center gap-6 border- border-plum/10 py-2 md:flex">
          {occasions.map((o) => {
            const href = `/shop/${o.slug}`;
            const active = pathname === href;
            return (
              <Link
                key={o.slug}
                href={href}
                className={`font-display text-sm font-600 hoverEffect hover:text-coral ${
                  active
                    ? "text-coral underline underline-offset-4"
                    : "text-plum/80"
                }`}>
                {o.label}
              </Link>
            );
          })}
          <Link
            href="/shop"
            className={`font-display text-sm font-600 hoverEffect hover:text-coral ${
              pathname === "/shop"
                ? "text-coral underline underline-offset-4"
                : "text-plum/80"
            }`}>
            All Products
          </Link>
          <Link
            href="/apparel"
            className={`font-display text-sm font-600 hoverEffect hover:text-coral ${
              pathname === "/apparel"
                ? "text-coral underline underline-offset-4"
                : "text-plum/80"
            }`}>
            Apparel
          </Link>
        </div> */}
        <div className="hidden justify-center gap-6 border- border-plum/10 py-2 md:flex">
          {[
            { href: "/", label: "Home" },
            { href: "/shop", label: "All Products" },
            { href: "/apparel", label: "Apparel" },
            { href: "/about", label: "About" },
            { href: "/contact", label: "Contact" },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`font-display text-sm font-600 hoverEffect hover:text-coral ${
                pathname === link.href
                  ? "text-coral underline underline-offset-4"
                  : "text-plum/80"
              }`}>
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex shrink-0 items-center gap-4">
          <button
            aria-label="Search"
            onClick={() => setMobileSearchOpen((v) => !v)}
            className="text-plum hoverEffect hover:text-coral">
            <FaSearchengin className="text-2xl" />
          </button>
          <CurrencySwitcher />
          <Link
            href="/favorites"
            aria-label="Favorites"
            className="relative text-plum hoverEffect hover:text-coral">
            <GiRoyalLove className="text-2xl" />

            {totalFavorites > 0 && (
              <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-coral text-xs font-700 text-white">
                {totalFavorites}
              </span>
            )}
          </Link>
          {/* <Link
            href="/favorites"
            aria-label="Favorites"
            className="text-plum hoverEffect hover:text-coral">
            <GiRoyalLove className="text-2xl" />
          </Link> */}
          <Link
            href={user ? "/account" : "/login"}
            aria-label="Account"
            className="text-plum hoverEffect hover:text-coral">
            <VscAccount className="text-2xl" />
          </Link>
          <Link
            href="/cart"
            aria-label="Cart"
            className="relative text-plum hoverEffect hover:text-coral">
            <FaShoppingCart className="text-2xl" />
            {totalItems > 0 && (
              <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-coral text-xs font-700 text-white">
                {totalItems}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* Row 2 (lap view only): occasion nav links, unchanged from original placement */}

      {/* ================= MOB VIEW (below md) ================= */}
      {/* Row 1: Logo | Menu icon */}
      <div className="flex items-center justify-between px-5 py-4 lg:hidden">
        <Link
          href="/"
          className="font-display flex justify-center items-end text-xl font-800 text-plum">
          <Image
            src="/products/gsc.png"
            alt="Party Hat"
            width={50}
            height={50}
          />
          <span className="text-coral"> Snot</span> Cleaners
        </Link>
        <button
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMenuOpen((v) => !v)}
          className="text-2xl text-plum">
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Row 2: currency, search icon, favorite, cart */}
      <div className="flex items-center justify-center gap-6 border-t border-plum/10 py-2 lg:hidden">
        <CurrencySwitcher />
        <button
          aria-label="Search"
          onClick={() => setMobileSearchOpen((v) => !v)}
          className="text-plum hoverEffect hover:text-coral">
          <FaSearchengin className="text-2xl" />
        </button>
        <Link
          href="/favorites"
          aria-label="Favorites"
          className="relative text-plum hoverEffect hover:text-coral">
          <GiRoyalLove className="text-2xl" />

          {totalFavorites > 0 && (
            <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-coral text-xs font-700 text-white">
              {totalFavorites}
            </span>
          )}
        </Link>
        {/* <Link
          href="/favorites"
          aria-label="Favorites"
          className="text-plum hoverEffect hover:text-coral">
          <GiRoyalLove className="text-2xl" />
        </Link> */}
        <Link
          href="/cart"
          aria-label="Cart"
          className="relative text-plum hoverEffect hover:text-coral">
          <FaShoppingCart className="text-2xl" />
          {totalItems > 0 && (
            <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-coral text-xs font-700 text-white">
              {totalItems}
            </span>
          )}
        </Link>
      </div>

      
      {mobileSearchOpen && (
        <div className="relative border-t border-plum/10 bg-cream px-5 text-center  py-3 md:hidde">
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search party hats, plates, napkins..."
            className="w-[80vw] lg:w-[60vw] rounded-full border border-plum/20 bg-white px-4 py-2 text-sm outline-none focus:border-coral"
          />
          {results.length > 0 && (
            <div className="absolute lg:w-[60vw] md:w-[80vw] w-[90vw] left-  lg:left-72 md:left-20 top-full z-50 mt-2 rounded-xl border border-plum/10 bg-white shadow-lg">
              {results.map((r) => (
                <Link
                  key={r._id}
                  href={r.href}
                  onClick={() => {
                    setQuery("");
                    setMobileSearchOpen(false);
                  }}
                  className="flex items-center justify-between gap-3 px-4 py-2 border border-b-2 text-sm text-plum hover:bg-cream">
                  <img
                    src={r.image}
                    alt=""
                    className="h-20 w-20 object-contain"
                  />
                  <div className="text-left w-[50vw]">
                    <h3 className="font-bold">{r.name}</h3>
                    <p className="text-xs hidden md:flex text-plum/70">{r.description}</p>
                    <p className="text-xs md:hidden text-plum/70">{r.description.slice(0, 50)}....</p>
                    <p className="text-sm text-coral">Price:{r.price}</p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      )}

      {menuOpen && (
        <>
          <div
            onClick={() => setMenuOpen(false)}
            className="fixed inset-0 z-30  lg:hidden "
          />

          <div className="absolute inset-x-0 top-full z-40 h-[100vh] flex flex-col gap-1 border-t border-plum/10 bg-white  p-6 shadow-lg lg:hidden">
            {/* {occasions.map((o) => {
              const href = `/shop/${o.slug}`;
              const active = pathname === href;
              return (
                <Link
                  key={o.slug}
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  className={`rounded-lg px-2 py-3 font-display hoverEffect hover:bg-cream hover:text-coral ${
                    active
                      ? "text-coral underline underline-offset-4"
                      : "text-plum"
                  }`}>
                  {o.label}
                </Link>
              );
            })}
            <Link
              href="/shop"
              onClick={() => setMenuOpen(false)}
              className={`rounded-lg px-2 py-3 font-display hoverEffect hover:bg-cream hover:text-coral ${
                pathname === "/shop"
                  ? "text-coral underline underline-offset-4"
                  : "text-plum"
              }`}>
              All Products
            </Link>
            <Link
              href="/apparel"
              className={`font-display text-sm font-600 hoverEffect hover:text-coral ${
                pathname === "/apparel"
                  ? "text-coral underline underline-offset-4"
                  : "text-plum/80"
              }`}>
              Apparel
            </Link> */}
            {[
              { href: "/", label: "Home" },
              { href: "/shop", label: "All Products" },
              { href: "/apparel", label: "Apparel" },
              { href: "/about", label: "About" },
              { href: "/contact", label: "Contact" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`rounded-lg px-2 py-3 font-display hoverEffect hover:bg-cream hover:text-coral ${
                  pathname === link.href
                    ? "text-coral underline underline-offset-4"
                    : "text-plum"
                }`}>
                {link.label}
              </Link>
            ))}
            <div className="my-3 border-t border-plum/10" />
            <Link
              href={user ? "/account" : "/login"}
              onClick={() => setMenuOpen(false)}
              className="rounded-lg px-2 py-3 font-display text-plum hoverEffect hover:bg-cream hover:text-coral">
              {user ? "My Account" : "Sign In"}
            </Link>
            <div className="flex w-full justify-center items-center">
              <Image
                src="/products/gsc.png"
                alt="Party Hat"
                width={100}
                height={100}
                className="mx-20"
              />
              {/* <GiPartyHat className="text-4xl text-coral absolute -top-6 left-[120px] " /> */}
            </div>
          </div>
        </>
      )}
    </header>
  );
}


