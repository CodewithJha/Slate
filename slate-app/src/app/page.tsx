import Link from "next/link";
import AnalyzeCTA from "./AnalyzeCTA";

const features = [
  {
    title: "Risk scoring",
    desc: "Get a clear Low, Moderate, or High risk rating with plain-language reasoning.",
    icon: "📊",
  },
  {
    title: "Red flag detection",
    desc: "Identifies unpaid full-time roles, vague stipends, bonds, and exploitative patterns.",
    icon: "⚠",
  },
  {
    title: "Questions to ask",
    desc: "Specific questions to clarify gaps before you sign.",
    icon: "❓",
  },
];

const steps = [
  { step: "01", title: "Paste", desc: "Drop in any offer text, JD, or internship message." },
  { step: "02", title: "Analyze", desc: "AI + heuristics score it across 5 dimensions." },
  { step: "03", title: "Decide", desc: "Get red flags, clarity gaps, and questions to ask." },
];

const useCases = [
  "Evaluating an offer letter before accepting",
  "Preparing questions for a founder call",
  "Comparing multiple offers objectively",
  "Learning what red flags look like",
  "Sharing analysis with mentors for feedback",
];

const faqs = [
  {
    q: "Is Slate free?",
    a: "Yes. Slate is free for students and freshers. No sign-up required.",
  },
  {
    q: "Do I need an account?",
    a: "No. You can analyze offers without signing up. Accounts let you save analyses across devices.",
  },
  {
    q: "Can I share my analysis?",
    a: "Yes. Each analysis generates a shareable link for mentors or peers.",
  },
];

export default function HomePage() {
  return (
    <main>
      {/* Hero */}
      <section className="px-4 pt-16 pb-20 sm:pt-24 sm:pb-28 lg:pt-32 lg:pb-36">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="font-serif text-4xl font-bold tracking-tight text-[var(--foreground)] animate-fade-in sm:text-5xl lg:text-6xl">
            Know if an offer is{" "}
            <span className="text-[var(--accent)]">solid, risky, or exploitative</span>
          </h1>
          <p className="mt-6 text-lg text-[var(--muted)] animate-fade-in stagger-1 sm:text-xl">
            Paste any internship or fresher job offer. Get instant, structured
            analysis with red flags, risk scoring, and questions to ask the
            employer.
          </p>
          <div className="mt-10 animate-fade-in stagger-2">
            <Link
              href="/analyze"
              className="inline-flex items-center gap-2 rounded-lg bg-[var(--accent)] px-6 py-3 text-base font-medium text-white transition-opacity hover:opacity-90"
            >
              Analyze an offer
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-t border-[var(--border)] bg-[var(--card-bg)] px-4 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-center font-serif text-2xl font-bold text-[var(--foreground)] sm:text-3xl">
            What you get
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-[var(--muted)]">
            Structured, explainable evaluation—not just a score.
          </p>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f, i) => (
              <div
                key={f.title}
                className={`animate-fade-in stagger-${i + 1} rounded-xl border border-[var(--border)] bg-[var(--background)] p-6 transition-shadow hover:shadow-md`}
              >
                <span className="text-2xl">{f.icon}</span>
                <h3 className="mt-4 font-semibold text-[var(--foreground)]">{f.title}</h3>
                <p className="mt-2 text-sm text-[var(--muted)] leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="px-4 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-serif text-2xl font-bold text-[var(--foreground)] sm:text-3xl">
            How it works
          </h2>
          <p className="mt-4 text-[var(--muted)]">
            Three steps to clarity.
          </p>
          <div className="mt-12 grid gap-8 sm:grid-cols-3">
            {steps.map((s, i) => (
              <div key={s.step} className={`animate-fade-in stagger-${i + 1}`}>
                <span className="text-xs font-mono text-[var(--accent)]">{s.step}</span>
                <h3 className="mt-2 text-lg font-semibold text-[var(--foreground)]">{s.title}</h3>
                <p className="mt-2 text-sm text-[var(--muted)] leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use cases */}
      <section className="border-t border-[var(--border)] bg-[var(--card-bg)] px-4 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-serif text-2xl font-bold text-[var(--foreground)] sm:text-3xl">
            Use cases
          </h2>
          <p className="mt-4 text-[var(--muted)]">
            When Slate helps most.
          </p>
          <ul className="mt-8 space-y-4">
            {useCases.map((uc, i) => (
              <li
                key={uc}
                className={`animate-fade-in stagger-${Math.min(i + 1, 5)} flex items-start gap-3`}
              >
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]" />
                <span className="text-[var(--muted)]">{uc}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-4 py-16 sm:py-20">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-serif text-2xl font-bold text-[var(--foreground)] sm:text-3xl">
            Frequently asked questions
          </h2>
          <dl className="mt-10 space-y-8">
            {faqs.map((faq, i) => (
              <div key={faq.q} className={`animate-fade-in stagger-${Math.min(i + 1, 5)}`}>
                <dt className="font-semibold text-[var(--foreground)]">{faq.q}</dt>
                <dd className="mt-2 text-[var(--muted)]">{faq.a}</dd>
              </div>
            ))}
          </dl>
          <Link
            href="/docs#faq"
            className="mt-8 inline-block text-sm font-medium text-[var(--accent)] hover:underline"
          >
            More in documentation →
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-[var(--border)] bg-[var(--accent)]/5 px-4 py-16 sm:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-serif text-2xl font-bold text-[var(--foreground)] sm:text-3xl">
            Ready to analyze?
          </h2>
          <p className="mt-4 text-[var(--muted)]">
            Paste your offer and get clarity in seconds.
          </p>
          <AnalyzeCTA />
        </div>
      </section>
    </main>
  );
}
