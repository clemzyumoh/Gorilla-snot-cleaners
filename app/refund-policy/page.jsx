export const metadata = {
  title: "Shipping & Refund Policy | Gorilla Snot Cleaners",
};

export default function RefundPolicyPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-16">
      <h1 className="font-display text-3xl font-800 text-plum">
        Shipping &amp; Refund Policy
      </h1>
      <p className="mt-2 text-sm text-plum/50">
        Last updated: [DATE — fill this in before publishing]
      </p>

      <div className="mt-8 space-y-6 text-plum/80">
        <section>
          <h2 className="font-display text-lg font-700 text-plum">Shipping</h2>
          <p className="mt-2">
            [Fill in: processing time, shipping regions, estimated delivery
            windows, and shipping cost details once finalized.]
          </p>
        </section>

        <section>
          <h2 className="font-display text-lg font-700 text-plum">Returns</h2>
          <p className="mt-2">
            [Fill in: return window (e.g. 14/30 days), condition items must be
            in, and any non-returnable categories.]
          </p>
        </section>

        <section>
          <h2 className="font-display text-lg font-700 text-plum">Refunds</h2>
          <p className="mt-2">
            [Fill in: how refunds are issued (original payment method via
            Stripe), how long they take to process, and whether shipping costs
            are refundable.]
          </p>
        </section>

        <section>
          <h2 className="font-display text-lg font-700 text-plum">
            Damaged or Incorrect Items
          </h2>
          <p className="mt-2">
            If your order arrives damaged or incorrect, contact us within [X]
            days of delivery with photos of the issue, and we&apos;ll make it
            right.
          </p>
        </section>

        <section>
          <h2 className="font-display text-lg font-700 text-plum">
            Contact Us
          </h2>
          <p className="mt-2">
            For any shipping or return questions, reach out via our{" "}
            <a href="/contact" className="text-coral hover:underline">
              Contact page
            </a>
            .
          </p>
        </section>
      </div>
    </div>
  );
}
