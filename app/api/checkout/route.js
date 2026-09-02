
// import { NextResponse } from "next/server";

// // ============================================================
// // ACTIVE PROVIDER: PAYSTACK
// // To switch to Stripe later: comment out the PAYSTACK block below,
// // uncomment the STRIPE block at the bottom of this file, and update
// // your .env(.local) with Stripe keys instead of Paystack keys.
// // Your checkout page (app/checkout/page.jsx) does NOT need to change —
// // both providers return { url }, which the frontend redirects to.
// // ============================================================

// export async function POST(req) {
//   try {
//     const { items, email } = await req.json();

//     if (!process.env.PAYSTACK_SECRET_KEY) {
//       return NextResponse.json(
//         { error: "Paystack secret key is not configured on the server." },
//         { status: 500 }
//       );
//     }

//     // NOTE: this trusts the price sent from the browser for now — real
//     // server-side price validation (looking up prices from lib/products.js
//     // / lib/apparel.js instead of trusting the client) is still on the
//     // to-do list before this goes live with real money.
//     const totalUSD = items.reduce(
//       (sum, item) => sum + item.price * item.quantity,
//       0
//     );

//     // Paystack (for Nigerian merchants) charges in NGN, in kobo (the
//     // smallest unit — like cents). Using the same USD->NGN rate as the
//     // currency switcher (lib/currency.js) to convert.
//     const NGN_RATE = 1550;
//     const totalNGN = totalUSD * NGN_RATE;
//     const amountInKobo = Math.round(totalNGN * 100);

//     const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

//     const response = await fetch("https://api.paystack.co/transaction/initialize", {
//       method: "POST",
//       headers: {
//         Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         email,
//         amount: amountInKobo,
//         currency: "NGN",
//         callback_url: `${siteUrl}/order-success`,
//       }),
//     });

//     const data = await response.json();

//     if (!data.status) {
//       console.error("Paystack init error:", data.message);
//       return NextResponse.json(
//         { error: data.message || "Failed to start checkout." },
//         { status: 500 }
//       );
//     }

//     return NextResponse.json({ url: data.data.authorization_url });
//   } catch (err) {
//     console.error("Checkout error:", err);
//     return NextResponse.json(
//       { error: "Failed to create checkout session." },
//       { status: 500 }
//     );
//   }
// }

// // ============================================================
// // STRIPE VERSION — commented out. Uncomment this whole block (and
// // comment out/delete the Paystack POST function above) to switch back
// // to Stripe once a real Stripe account is available.
// // ============================================================
// /*
// import Stripe from "stripe";

// export async function POST(req) {
//   try {
//     const { items, email } = await req.json();

//     if (!process.env.STRIPE_SECRET_KEY) {
//       return NextResponse.json(
//         { error: "Stripe secret key is not configured on the server." },
//         { status: 500 }
//       );
//     }

//     const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

//     const line_items = items.map((item) => ({
//       price_data: {
//         currency: "usd",
//         product_data: { name: item.name },
//         unit_amount: Math.round(item.price * 100),
//       },
//       quantity: item.quantity,
//     }));

//     const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

//     const session = await stripe.checkout.sessions.create({
//       mode: "payment",
//       payment_method_types: ["card"],
//       customer_email: email,
//       line_items,
//       success_url: `${siteUrl}/order-success?session_id={CHECKOUT_SESSION_ID}`,
//       cancel_url: `${siteUrl}/cart`,
//     });

//     return NextResponse.json({ url: session.url });
//   } catch (err) {
//     console.error("Stripe checkout error:", err);
//     return NextResponse.json(
//       { error: "Failed to create checkout session." },
//       { status: 500 }
//     );
//   }
// }
// */


import { NextResponse } from "next/server";
import { getRealPrice } from "@/lib/catalog";

// ============================================================
// ACTIVE PROVIDER: PAYSTACK — see route comments from before for how
// to switch to Stripe later.
// ============================================================

export async function POST(req) {
  try {
    const { items, email, customer, userId } = await req.json();

    if (!process.env.PAYSTACK_SECRET_KEY) {
      return NextResponse.json(
        { error: "Paystack secret key is not configured on the server." },
        { status: 500 },
      );
    }

    // ===== SERVER-SIDE PRICE VALIDATION =====
    // Never trust the price sent from the browser — look up the real
    // price for each item from the actual product catalog. `baseId` is
    // the underlying product id (apparel variants carry this separately
    // from their variant-specific `_id` — see ApparelDetailClient.jsx).
    let totalUSD = 0;
    const validatedItems = [];

    for (const item of items) {
      const baseId = item.baseId || item._id;
      const realPrice = getRealPrice(baseId);

      if (realPrice === null) {
        return NextResponse.json(
          { error: `Unknown product: ${baseId}` },
          { status: 400 },
        );
      }

      totalUSD += realPrice * item.quantity;
      validatedItems.push({
        product_id: baseId,
        name: item.name,
        price: realPrice, // the REAL price, not whatever the client sent
        quantity: item.quantity,
        image: item.image,
        size: item.size || null,
        color: item.color || null,
      });
    }

    const NGN_RATE = 1550;
    const totalNGN = totalUSD * NGN_RATE;
    const amountInKobo = Math.round(totalNGN * 100);

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

    const response = await fetch(
      "https://api.paystack.co/transaction/initialize",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          amount: amountInKobo,
          currency: "NGN",
          callback_url: `${siteUrl}/order-success`,
          // Metadata is echoed back in the webhook payload — this is how
          // the webhook knows what was actually purchased and by whom.
          metadata: {
            user_id: userId,
            items: validatedItems,
            shipping: customer,
            total_usd: totalUSD,
          },
        }),
      },
    );

    const data = await response.json();

    if (!data.status) {
      console.error("Paystack init error:", data.message);
      return NextResponse.json(
        { error: data.message || "Failed to start checkout." },
        { status: 500 },
      );
    }

    return NextResponse.json({ url: data.data.authorization_url });
  } catch (err) {
    console.error("Checkout error:", err);
    return NextResponse.json(
      { error: "Failed to create checkout session." },
      { status: 500 },
    );
  }
}
