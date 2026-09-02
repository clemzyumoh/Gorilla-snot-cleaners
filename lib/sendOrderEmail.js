import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendOrderConfirmationEmail({
  to,
  orderId,
  items,
  total,
}) {
  if (!to || !process.env.RESEND_API_KEY) {
    console.warn("Skipping confirmation email — missing recipient or API key.");
    return;
  }

  const itemsHtml = items
    .map(
      (item) =>
        `<tr>
          <td style="padding:8px 0;">${item.name}${item.size ? ` (${item.size}${item.color ? ", " + item.color : ""})` : ""} × ${item.quantity}</td>
          <td style="padding:8px 0; text-align:right;">$${(item.price * item.quantity).toFixed(2)}</td>
        </tr>`,
    )
    .join("");

  try {
    await resend.emails.send({
      from: "Gorilla Snot Cleaners <clemzyumoh@gmail.com>", // must be a verified domain in Resend
      to,
      subject: `Order Confirmed — #${orderId.slice(0, 8)}`,
      html: `
        <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto;">
          <h1 style="color:#3D1F47;">Thanks for your order!</h1>
          <p>Order #${orderId.slice(0, 8)} is confirmed.</p>
          <table style="width:100%; border-collapse: collapse; margin-top: 16px;">
            ${itemsHtml}
          </table>
          <p style="margin-top:16px; font-weight:bold;">Total: $${total.toFixed(2)}</p>
        </div>
      `,
    });
  } catch (err) {
    console.error("Failed to send confirmation email:", err);
  }
}
