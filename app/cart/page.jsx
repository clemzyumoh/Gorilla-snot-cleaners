"use client";

import Link from "next/link";
import { useCartStore } from "@/store/cartStore";
import { useCurrencyStore } from "@/store/currencyStore";
import { formatPrice } from "@/lib/currency";

export default function CartPage() {
  const items = useCartStore((s) => s.items);
  const increaseQuantity = useCartStore((s) => s.increaseQuantity);
  const decreaseQuantity = useCartStore((s) => s.decreaseQuantity);
  const removeItem = useCartStore((s) => s.removeItem);
  const totalPrice = useCartStore((s) => s.totalPrice());
  const currency = useCurrencyStore((s) => s.currency);

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-5 py-20 text-center">
        <h1 className="font-display text-2xl font-800 text-plum">
          Your cart is empty
        </h1>
        <Link
          href="/shop"
          className="mt-6 inline-block rounded-full bg-coral px-6 py-3 font-display font-700 text-white hoverEffect hover:bg-plum"
        >
          Shop Party Supplies
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-5 py-12">
      <h1 className="font-display text-3xl font-800 text-plum">Your Cart</h1>

      <div className="mt-8 hidden md:flex flex-col space-y-4">
        {items.map((item) => (
          <div
            key={item._id}
            className="flex items-center gap-4 rounded-xl2 border border-plum/10 bg-white p-4">
            <img
              src={item.image}
              alt={item.name}
              className="h-28 w-28 object-contain"
            />
            <div className="flex-1">
              <h3 className="font-display font-70 text-plum">{item.name}</h3>
              <p className="text-sm text-coral">
                {formatPrice(item.price, currency)}
              </p>
            </div>
            <div className="flex items-center rounded-full border border-plum/20">
              <button
                onClick={() => decreaseQuantity(item._id)}
                className="px-3 py-1 text-plum">
                −
              </button>
              <span className="px-2 font-700">{item.quantity}</span>
              <button
                onClick={() => increaseQuantity(item._id)}
                className="px-3 py-1 text-plum">
                +
              </button>
            </div>
            <button
              onClick={() => removeItem(item._id)}
              className="text-sm text-plum/50 hover:text-coral">
              Remove
            </button>
          </div>
        ))}
      </div>
      <div className="mt-8 md:hidden flex flex-col w-full space-y-4">
        {items.map((item) => (
          <div
            key={item._id}
            className=" flex justify-center items-center w-full gap-4 flex-col rounded-xl2 border border-plum/10 bg-white p-4">
            <div className="flex justify-between gap-8  w-full items-center">
              <img
                src={item.image}
                alt={item.name}
                className="h-24 w-24 object-cover"
              />
              <div className="flex-1">
                <h3 className="font-display font-70  text-plum">{item.name}</h3>
                <p className="text-sm text-coral">
                  {formatPrice(item.price, currency)}
                </p>
              </div>
            </div>
            <div className="flex justify-between w-full gap-8 items-center ">
              <div className="flex w-full items-center rounded-full border border-plum/20">
                <button
                  onClick={() => decreaseQuantity(item._id)}
                  className="px-3 py-1 text-plum">
                  −
                </button>
                <span className="px-2 font-700">{item.quantity}</span>
                <button
                  onClick={() => increaseQuantity(item._id)}
                  className="px-3 py-1 text-plum">
                  +
                </button>
              </div>
              <button
                onClick={() => removeItem(item._id)}
                className="text-sm  flex w-full text-plum/50 hover:text-coral">
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 flex items-center justify-between border-t border-plum/10 pt-6">
        <span className="font-display text-xl font-800 text-plum">
          Total: {formatPrice(totalPrice, currency)}
        </span>
        <Link
          href="/checkout"
          className="rounded-full bg-plum px-8 py-3 font-display font-700 text-cream hoverEffect hover:bg-coral">
          Checkout
        </Link>
      </div>
    </div>
  );
}
