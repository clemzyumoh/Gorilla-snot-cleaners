import { NextResponse } from "next/server";
import crypto from "crypto";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { sendOrderConfirmationEmail } from "@/lib/sendOrderEmail";

// Paystack calls this URL automatically after a payment completes.
// Set this up in the Paystack dashboard: Settings -> API Keys & Webhooks
// -> Webhook URL -> https://yourdomain.com/api/webhooks/paystack
export async function POST(req) {
  const rawBody = await req.text();

  // ===== VERIFY THE WEBHOOK IS REALLY FROM PAYSTACK =====
  // Without this, anyone could POST a fake "payment successful" request
  // and get free orders written to your database.
  const signature = req.headers.get("x-paystack-signature");
  const expectedSignature = crypto
    .createHmac("sha512", process.env.PAYSTACK_SECRET_KEY)
    .update(rawBody)
    .digest("hex");

  if (signature !== expectedSignature) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  const event = JSON.parse(rawBody);

  if (event.event !== "charge.success") {
    // Ignore other event types (failed charges, etc.)
    return NextResponse.json({ received: true });
  }

  const { metadata, reference, authorization, amount } = event.data;
  const { user_id, items, shipping, total_usd } = metadata;

  try {
    // ===== 1. WRITE THE ORDER =====
    const { data: order, error: orderError } = await supabaseAdmin
      .from("orders")
      .insert({
        user_id,
        status: "paid",
        total: total_usd,
        shipping_name: shipping?.name,
        shipping_address: shipping?.address,
        shipping_phone: shipping?.phone,
        stripe_session_id: reference, // reused column name, holds the Paystack reference
      })
      .select()
      .single();

    if (orderError) throw orderError;

    // ===== 2. WRITE THE ORDER ITEMS =====
    const orderItems = items.map((item) => ({
      order_id: order.id,
      product_id: item.product_id,
      name: item.name,
      price: item.price,
      quantity: item.quantity,
      image: item.image,
      size: item.size,
      color: item.color,
    }));

    const { error: itemsError } = await supabaseAdmin
      .from("order_items")
      .insert(orderItems);

    if (itemsError) throw itemsError;

    // ===== 3. DECREMENT INVENTORY =====
    for (const item of items) {
      await supabaseAdmin.rpc("decrement_stock", {
        p_product_id: item.product_id,
        p_quantity: item.quantity,
      });
    }

    // ===== 4. SAVE THE PAYMENT METHOD (card details for display later) =====
    if (authorization?.authorization_code) {
      await supabaseAdmin.from("payment_methods").insert({
        user_id,
        authorization_code: authorization.authorization_code,
        card_last4: authorization.last4,
        card_type: authorization.card_type,
        bank: authorization.bank,
      });
    }

    // ===== 5. SEND CONFIRMATION EMAIL =====
    await sendOrderConfirmationEmail({
      to: shipping?.email || metadata.email,
      orderId: order.id,
      items,
      total: total_usd,
    });

    return NextResponse.json({ received: true });
  } catch (err) {
    console.error("Webhook processing error:", err);
    // Still return 200 so Paystack doesn't endlessly retry a request
    // that failed for a reason retrying won't fix (e.g. bad data) —
    // but log it loudly so you notice and can investigate.
    return NextResponse.json({ received: true, error: err.message });
  }
}
