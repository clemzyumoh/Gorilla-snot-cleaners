

import Link from "next/link";
import Image from "next/image";
import {
  FaInstagram,
  FaTiktok,
  FaFacebookF,
  FaCcVisa,
  FaCcMastercard,
  FaCcPaypal,
  FaCcStripe,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="border-t border-plum/10 text-center bg-plum text-cream">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-12 lg:grid-cols-4">
        {/* Brand — logo + about */}
        <div>
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/products/gsc.png"
              alt="Gorilla Snot Cleaners"
              width={40}
              height={40}
            />
            <span className="font-display text-lg font-800">
              Gorilla Snot Cleaners
            </span>
          </Link>
          <p className="mt-3 text-sm text-cream/70">
            Party supplies with real personality. Hats, plates, napkins,
            bundles, and apparel — bold, bright, built for people who go all
            out.
          </p>
        </div>

        {/* Shop */}
        <div>
          <h4 className="font-display font-700">Shop</h4>
          <ul className="mt-3 space-y-2 text-sm text-cream/70">
            <li>
              <Link href="/shop" className="hover:text-sunshine">
                All Products
              </Link>
            </li>
            <li>
              <Link href="/apparel" className="hover:text-sunshine">
                Apparel
              </Link>
            </li>
            <li>
              <Link href="/cart" className="hover:text-sunshine">
                Cart
              </Link>
            </li>
          </ul>
        </div>

        {/* More Info */}
        <div>
          <h4 className="font-display font-700">More Info</h4>
          <ul className="mt-3 space-y-2 text-sm text-cream/70">
            <li>
              <Link href="/about" className="hover:text-sunshine">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-sunshine">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Social */}
        <div className="flex justify-start items-center flex-col"> 
          <h4 className="font-display font-700">Follow</h4>
          <div className="mt-3 flex gap-4 text-center text-xl text-cream/70">
            <a href="#" aria-label="Instagram" className="hover:text-sunshine">
              <FaInstagram />
            </a>
            <a href="#" aria-label="TikTok" className="hover:text-sunshine">
              <FaTiktok />
            </a>
            <a href="#" aria-label="Facebook" className="hover:text-sunshine">
              <FaFacebookF />
            </a>
          </div>
        </div>
      </div>

      {/* Payment options */}
      <div className="border-t border-cream/10 px-5 py-6">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-xs font-700 uppercase tracking-widest text-cream/50">
            Secure Payment
          </p>
          <div className="flex gap-4 text-3xl text-cream/70">
            <FaCcVisa aria-label="Visa" />
            <FaCcMastercard aria-label="Mastercard" />
            <FaCcPaypal aria-label="PayPal" />
            <FaCcStripe aria-label="Stripe" />
          </div>
        </div>
      </div>

      {/* Copyright — unchanged */}
      <div className="border-t border-cream/10 px-5 py-4 text-center text-xs text-cream/50">
        © {new Date().getFullYear()} Gorilla Snot Cleaners. All rights reserved.
      </div>
    </footer>
  );
}