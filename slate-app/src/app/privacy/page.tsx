import Link from "next/link";

export const metadata = {
  title: "Privacy — Slate",
  description: "Privacy policy for Slate.",
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen">
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="font-serif text-4xl font-bold text-[var(--foreground)]">
          Privacy Policy
        </h1>
        <p className="mt-4 text-[var(--muted)]">
          Last updated: {new Date().toLocaleDateString("en-US")}
        </p>

        <div className="mt-12 space-y-8 text-[var(--muted)]">
          <section>
            <h2 className="font-serif text-xl font-semibold text-[var(--foreground)]">
              Data we collect
            </h2>
            <p className="mt-4 leading-relaxed">
              When you use Slate to analyze an offer, we store the text you
              paste and the resulting analysis to generate shareable links. We
              do not sell or share your data with third parties.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-semibold text-[var(--foreground)]">
              Account data
            </h2>
            <p className="mt-4 leading-relaxed">
              If you create an account, we store your email and authentication
              data. This is used solely to manage your account and provide
              access to saved analyses.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-semibold text-[var(--foreground)]">
              Contact
            </h2>
            <p className="mt-4 leading-relaxed">
              For questions about this policy, please contact us through the
              website.
            </p>
          </section>
        </div>

        <Link
          href="/"
          className="mt-12 inline-block text-sm text-[var(--accent)] hover:underline"
        >
          ← Back to Slate
        </Link>
      </div>
    </main>
  );
}
