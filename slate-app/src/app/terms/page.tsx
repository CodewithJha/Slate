import Link from "next/link";

export const metadata = {
  title: "Terms — Slate",
  description: "Terms of service for Slate.",
};

export default function TermsPage() {
  return (
    <main className="min-h-screen">
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="font-serif text-4xl font-bold text-[var(--foreground)]">
          Terms of Service
        </h1>
        <p className="mt-4 text-[var(--muted)]">
          Last updated: {new Date().toLocaleDateString("en-US")}
        </p>

        <div className="mt-12 space-y-8 text-[var(--muted)]">
          <section>
            <h2 className="font-serif text-xl font-semibold text-[var(--foreground)]">
              Use of service
            </h2>
            <p className="mt-4 leading-relaxed">
              Slate is a tool to help you evaluate internship and job offers.
              It is not a substitute for professional legal or career advice.
              Use the analysis as a starting point and verify with trusted
              advisors when making decisions.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-semibold text-[var(--foreground)]">
              Acceptable use
            </h2>
            <p className="mt-4 leading-relaxed">
              You agree to use Slate only for lawful purposes. Do not paste
              content that violates others&apos; privacy or intellectual
              property rights.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-semibold text-[var(--foreground)]">
              Contact
            </h2>
            <p className="mt-4 leading-relaxed">
              For questions about these terms, please contact us through the
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
