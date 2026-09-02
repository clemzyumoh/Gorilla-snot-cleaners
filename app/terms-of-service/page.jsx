export const metadata = { title: "Terms of Service | Gorilla Snot Cleaners" };

export default function TermsOfServicePage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-16">
      <h1 className="font-display text-3xl font-800 text-plum">
        Terms of Service
      </h1>
      <p className="mt-2 text-sm text-plum/50">
        Last updated: [DATE — fill this in before publishing]
      </p>

      <div className="mt-8 space-y-6 text-plum/80">
        <section>
          <h2 className="font-display text-lg font-700 text-plum">
            Using Our Site
          </h2>
          <p className="mt-2">
            By using Gorilla Snot Cleaners, you agree to use the site lawfully
            and not to misuse, disrupt, or attempt to gain unauthorized access
            to any part of it.
          </p>
        </section>

        <section>
          <h2 className="font-display text-lg font-700 text-plum">
            Orders &amp; Payment
          </h2>
          <p className="mt-2">
            All orders are subject to product availability. Prices are listed in
            USD unless otherwise noted, and payment is processed securely
            through Stripe. We reserve the right to refuse or cancel any order
            at our discretion.
          </p>
        </section>

        <section>
          <h2 className="font-display text-lg font-700 text-plum">
            Account Responsibility
          </h2>
          <p className="mt-2">
            You are responsible for maintaining the confidentiality of your
            account credentials and for all activity under your account.
          </p>
        </section>

        <section>
          <h2 className="font-display text-lg font-700 text-plum">
            Intellectual Property
          </h2>
          <p className="mt-2">
            All content on this site — including the Gorilla Snot Cleaners name,
            logo, and product designs — is our property and may not be
            reproduced without permission.
          </p>
        </section>

        <section>
          <h2 className="font-display text-lg font-700 text-plum">
            Limitation of Liability
          </h2>
          <p className="mt-2">
            Gorilla Snot Cleaners is not liable for indirect or consequential
            damages arising from use of this site or our products.
          </p>
        </section>

        <section>
          <h2 className="font-display text-lg font-700 text-plum">
            Changes to These Terms
          </h2>
          <p className="mt-2">
            We may update these terms from time to time. Continued use of the
            site after changes means you accept the updated terms.
          </p>
        </section>

        <section>
          <h2 className="font-display text-lg font-700 text-plum">
            Contact Us
          </h2>
          <p className="mt-2">
            Questions about these terms? Reach out via our{" "}
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
