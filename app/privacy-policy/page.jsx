export const metadata = { title: "Privacy Policy | Gorilla Snot Cleaners" };

export default function PrivacyPolicyPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-16">
      <h1 className="font-display text-3xl font-800 text-plum">
        Privacy Policy
      </h1>
      <p className="mt-2 text-sm text-plum/50">
        Last updated: [DATE — fill this in before publishing]
      </p>

      <div className="mt-8 space-y-6 text-plum/80">
        <section>
          <h2 className="font-display text-lg font-700 text-plum">
            Information We Collect
          </h2>
          <p className="mt-2">
            When you create an account, place an order, or contact us, we
            collect information such as your name, email address, shipping
            address, and phone number. Payment details are processed securely by
            our payment provider (Stripe) — we do not store your card
            information ourselves.
          </p>
        </section>

        <section>
          <h2 className="font-display text-lg font-700 text-plum">
            How We Use Your Information
          </h2>
          <p className="mt-2">
            We use your information to process orders, communicate with you
            about your purchases, and improve our products and services. We do
            not sell your personal information to third parties.
          </p>
        </section>

        <section>
          <h2 className="font-display text-lg font-700 text-plum">
            Cookies &amp; Local Storage
          </h2>
          <p className="mt-2">
            We use browser storage to remember your cart, favorites, and
            currency preference so you don&apos;t have to reset them every
            visit.
          </p>
        </section>

        <section>
          <h2 className="font-display text-lg font-700 text-plum">
            Your Rights
          </h2>
          <p className="mt-2">
            You may request access to, correction of, or deletion of your
            personal information at any time by contacting us.
          </p>
        </section>

        <section>
          <h2 className="font-display text-lg font-700 text-plum">
            Contact Us
          </h2>
          <p className="mt-2">
            Questions about this policy? Reach out via our{" "}
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
