"use client";

import { useState } from "react";

export default function ContactPage() {
  const [sent, setSent] = useState(false);

  return (
    <div className="mx-auto max-w-xl px-5 py-16">
      <h1 className="font-display text-3xl font-800 text-plum">Contact Us</h1>
      {sent ? (
        <p className="mt-6 text-plum/70">
          Thanks — we&apos;ll get back to you soon.
        </p>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
          }}
          className="mt-6 space-y-4"
        >
          <input
            required
            placeholder="Your name"
            className="w-full rounded-lg border border-plum/20 px-4 py-2 outline-none focus:border-coral"
          />
          <input
            type="email"
            required
            placeholder="Your email"
            className="w-full rounded-lg border border-plum/20 px-4 py-2 outline-none focus:border-coral"
          />
          <textarea
            required
            rows={4}
            placeholder="Message"
            className="w-full rounded-lg border border-plum/20 px-4 py-2 outline-none focus:border-coral"
          />
          <button
            type="submit"
            className="w-full rounded-full bg-plum py-3 font-display font-700 text-cream hoverEffect hover:bg-coral"
          >
            Send Message
          </button>
        </form>
      )}
    </div>
  );
}
