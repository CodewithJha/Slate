import Link from "next/link";

export const metadata = {
  title: "Documentation — Slate",
  description:
    "Learn what Slate is, how it works, use cases, and how it helps students and freshers evaluate job offers.",
};

const navItems = [
  { id: "what-is-slate", label: "What is Slate?" },
  { id: "why-slate", label: "Why Slate exists" },
  { id: "how-it-works", label: "How it works" },
  { id: "risk-dimensions", label: "The 5 risk dimensions" },
  { id: "use-cases", label: "Use cases" },
  { id: "how-it-helps", label: "How it helps you" },
  { id: "getting-started", label: "Getting started" },
  { id: "understanding-results", label: "Understanding results" },
  { id: "best-practices", label: "Best practices" },
  { id: "faq", label: "FAQ" },
];

export default function DocsPage() {
  return (
    <main className="min-h-screen">
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:max-w-4xl lg:px-8">
        <h1 className="font-serif text-4xl font-bold tracking-tight text-[var(--foreground)] animate-fade-in sm:text-5xl">
          Documentation
        </h1>
        <p className="mt-4 text-lg text-[var(--muted)] animate-fade-in stagger-1">
          Everything you need to know about Slate—what it is, how it works, and how it helps you make better career decisions.
        </p>

        <nav className="mt-12 border-b border-[var(--border)] pb-6 animate-fade-in stagger-2">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">
            On this page
          </h2>
          <ul className="mt-3 grid gap-2 sm:grid-cols-2">
            {navItems.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className="text-sm text-[var(--muted)] transition-colors hover:text-[var(--accent)]"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <article className="mt-12 max-w-none">
          {/* What is Slate */}
          <section id="what-is-slate" className="scroll-mt-24 animate-fade-in stagger-1">
            <h2 className="font-serif text-2xl font-bold text-[var(--foreground)]">
              What is Slate?
            </h2>
            <p className="mt-4 text-[var(--muted)] leading-relaxed">
              Slate is a smart internship and fresher job offer analyzer built for early-career professionals. When you receive an offer letter, internship message, or job description, you can paste it into Slate and get a structured, AI-powered analysis within seconds.
            </p>
            <p className="mt-4 text-[var(--muted)] leading-relaxed">
              Slate tells you whether an opportunity is <strong className="text-[var(--foreground)]">solid</strong>, <strong className="text-[var(--foreground)]">risky</strong>, or <strong className="text-[var(--foreground)]">exploitative</strong>—with clear reasoning, red flags, missing clarity points, and suggested questions to ask the employer before you sign.
            </p>
            <p className="mt-4 text-[var(--muted)] leading-relaxed">
              Slate is free for students and freshers. No sign-up is required to use the analyzer—though creating an account lets you save and access your analyses across devices.
            </p>
          </section>

          {/* Why Slate exists */}
          <section id="why-slate" className="mt-16 scroll-mt-24">
            <h2 className="font-serif text-2xl font-bold text-[var(--foreground)]">
              Why Slate exists
            </h2>
            <p className="mt-4 text-[var(--muted)] leading-relaxed">
              Early-career job seekers often face unclear offers: vague stipends, unpaid full-time roles, bonds without exit clarity, and high expectations with little compensation. Many students and freshers lack the experience to spot these red flags and end up in exploitative situations.
            </p>
            <p className="mt-4 text-[var(--muted)] leading-relaxed">
              Slate was built to level the playing field. It combines AI analysis with rule-based heuristics trained on common exploitation patterns, so you get an objective second opinion before you commit. You deserve to know what you&apos;re signing up for.
            </p>
          </section>

          {/* How it works */}
          <section id="how-it-works" className="mt-16 scroll-mt-24">
            <h2 className="font-serif text-2xl font-bold text-[var(--foreground)]">
              How it works
            </h2>
            <p className="mt-4 text-[var(--muted)] leading-relaxed">
              Slate uses a combination of AI (Google Gemini) and rule-based heuristics to evaluate offers. Here&apos;s the flow:
            </p>
            <ol className="mt-6 list-decimal space-y-6 pl-6 text-[var(--muted)]">
              <li>
                <strong className="text-[var(--foreground)]">Paste:</strong> You paste your offer text, job description, or internship message into the analyzer. The more complete the text, the better the analysis.
              </li>
              <li>
                <strong className="text-[var(--foreground)]">Analyze:</strong> Slate processes the text and evaluates it across five dimensions: compensation clarity, role clarity, legal clarity, growth potential, and risk signals. Each dimension gets a risk score (Low, Moderate, or High).
              </li>
              <li>
                <strong className="text-[var(--foreground)]">Output:</strong> You receive an overall risk score, a plain-language summary, red flags, missing clarity points, and specific questions to ask the employer. Each section includes detailed observations.
              </li>
              <li>
                <strong className="text-[var(--foreground)]">Save & share:</strong> You can save the analysis (with an account) or share it via a link with mentors, advisors, or peers for feedback.
              </li>
            </ol>
          </section>

          {/* The 5 risk dimensions */}
          <section id="risk-dimensions" className="mt-16 scroll-mt-24">
            <h2 className="font-serif text-2xl font-bold text-[var(--foreground)]">
              The 5 risk dimensions
            </h2>
            <p className="mt-4 text-[var(--muted)] leading-relaxed">
              Slate evaluates every offer across five dimensions. In each dimension, <strong className="text-[var(--foreground)]">Low</strong> = good/safe, <strong className="text-[var(--foreground)]">Moderate</strong> = needs clarification, <strong className="text-[var(--foreground)]">High</strong> = concerning or exploitative.
            </p>
            <div className="mt-8 space-y-8">
              <div className="rounded-xl border border-[var(--border)] bg-[var(--card-bg)] p-6 transition-shadow hover:shadow-md">
                <h3 className="font-semibold text-[var(--foreground)]">1. Compensation clarity</h3>
                <p className="mt-2 text-sm text-[var(--muted)] leading-relaxed">
                  Is pay clearly stated? Are there vague stipends, &quot;performance-based&quot; terms without metrics, or unpaid full-time roles? Slate flags undefined compensation, equity-only offers for interns, and stipends that depend on unclear criteria.
                </p>
              </div>
              <div className="rounded-xl border border-[var(--border)] bg-[var(--card-bg)] p-6 transition-shadow hover:shadow-md">
                <h3 className="font-semibold text-[var(--foreground)]">2. Role clarity</h3>
                <p className="mt-2 text-sm text-[var(--muted)] leading-relaxed">
                  Is the scope defined? Are expectations realistic for the level? Slate looks for vague job descriptions with high responsibility, unclear hours, or roles that blur intern vs. full-time work.
                </p>
              </div>
              <div className="rounded-xl border border-[var(--border)] bg-[var(--card-bg)] p-6 transition-shadow hover:shadow-md">
                <h3 className="font-semibold text-[var(--foreground)]">3. Legal clarity</h3>
                <p className="mt-2 text-sm text-[var(--muted)] leading-relaxed">
                  Are there bonds, non-compete clauses, or unclear agreements? Slate flags bonds without compensation clarity, lock-in periods without exit terms, and missing written agreements.
                </p>
              </div>
              <div className="rounded-xl border border-[var(--border)] bg-[var(--card-bg)] p-6 transition-shadow hover:shadow-md">
                <h3 className="font-semibold text-[var(--foreground)]">4. Growth potential</h3>
                <p className="mt-2 text-sm text-[var(--muted)] leading-relaxed">
                  Does the offer suggest learning opportunities, mentorship, or skill development? Slate evaluates whether the role offers genuine growth or is primarily low-value work.
                </p>
              </div>
              <div className="rounded-xl border border-[var(--border)] bg-[var(--card-bg)] p-6 transition-shadow hover:shadow-md">
                <h3 className="font-semibold text-[var(--foreground)]">5. Risk signals</h3>
                <p className="mt-2 text-sm text-[var(--muted)] leading-relaxed">
                  Overall patterns that suggest exploitation or unfair terms. This includes combinations of red flags, industry-specific concerns, and structural issues in the offer.
                </p>
              </div>
            </div>
          </section>

          {/* Use cases */}
          <section id="use-cases" className="mt-16 scroll-mt-24">
            <h2 className="font-serif text-2xl font-bold text-[var(--foreground)]">
              Use cases
            </h2>
            <p className="mt-4 text-[var(--muted)] leading-relaxed">
              Slate helps in many situations. Here are the most common:
            </p>
            <ul className="mt-6 space-y-4 text-[var(--muted)]">
              <li className="flex items-start gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]" />
                <span><strong className="text-[var(--foreground)]">Evaluating an offer letter:</strong> You received an offer and want to know if the terms are fair before accepting.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]" />
                <span><strong className="text-[var(--foreground)]">Preparing for a founder call:</strong> You have a call scheduled and want to identify key questions about compensation, role scope, and legal terms.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]" />
                <span><strong className="text-[var(--foreground)]">Comparing multiple offers:</strong> You have several offers and want to compare them objectively across the same dimensions.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]" />
                <span><strong className="text-[var(--foreground)]">Learning what to look for:</strong> You&apos;re new to job offers and want to understand what red flags and clarity gaps look like.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]" />
                <span><strong className="text-[var(--foreground)]">Sharing with mentors:</strong> You want a second opinion and need a shareable analysis to send to a mentor or advisor.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]" />
                <span><strong className="text-[var(--foreground)]">Negotiating:</strong> You want to know what&apos;s missing so you can ask for it before signing.</span>
              </li>
            </ul>
          </section>

          {/* How it helps */}
          <section id="how-it-helps" className="mt-16 scroll-mt-24">
            <h2 className="font-serif text-2xl font-bold text-[var(--foreground)]">
              How it helps you
            </h2>
            <p className="mt-4 text-[var(--muted)] leading-relaxed">
              Slate helps you make informed decisions instead of relying on gut feeling or random advice. It provides:
            </p>
            <ul className="mt-6 space-y-4 text-[var(--muted)]">
              <li>
                <strong className="text-[var(--foreground)]">Explainable scoring:</strong> Not just a number—you get clear reasons like &quot;High risk because compensation structure is undefined&quot; or &quot;Bond clause present without exit clarity.&quot;
              </li>
              <li>
                <strong className="text-[var(--foreground)]">Red flag detection:</strong> Slate identifies patterns like unpaid full-time roles, performance-based stipends without clear metrics, bonds without compensation clarity, and vague descriptions with high responsibilities.
              </li>
              <li>
                <strong className="text-[var(--foreground)]">Questions to ask:</strong> Specific questions to clarify gaps before you sign, so you can have a productive conversation with the employer.
              </li>
              <li>
                <strong className="text-[var(--foreground)]">Shareable links:</strong> Save and share your analysis for feedback from mentors or peers.
              </li>
              <li>
                <strong className="text-[var(--foreground)]">Consistency:</strong> Every offer is evaluated across the same five dimensions, so you can compare apples to apples.
              </li>
            </ul>
          </section>

          {/* Getting started */}
          <section id="getting-started" className="mt-16 scroll-mt-24">
            <h2 className="font-serif text-2xl font-bold text-[var(--foreground)]">
              Getting started
            </h2>
            <p className="mt-4 text-[var(--muted)] leading-relaxed">
              Using Slate is simple:
            </p>
            <ol className="mt-6 list-decimal space-y-4 pl-6 text-[var(--muted)]">
              <li>Go to the <Link href="/analyze" className="font-medium text-[var(--accent)] hover:underline">Analyze</Link> page.</li>
              <li>Paste your offer text, job description, or internship message into the text area.</li>
              <li>Click &quot;Analyze offer&quot; and wait a few seconds.</li>
              <li>Review your results: overall risk, summary, red flags, missing clarity, and questions to ask.</li>
              <li>Optionally save or share the analysis via the generated link.</li>
            </ol>
            <p className="mt-6 text-[var(--muted)] leading-relaxed">
              No account is required. You can analyze offers immediately. Creating an account lets you save analyses and access them from any device.
            </p>
          </section>

          {/* Understanding results */}
          <section id="understanding-results" className="mt-16 scroll-mt-24">
            <h2 className="font-serif text-2xl font-bold text-[var(--foreground)]">
              Understanding your results
            </h2>
            <p className="mt-4 text-[var(--muted)] leading-relaxed">
              Each analysis includes:
            </p>
            <ul className="mt-6 space-y-4 text-[var(--muted)]">
              <li><strong className="text-[var(--foreground)]">Overall risk:</strong> Low, Moderate, or High. This is a synthesis of all five dimensions.</li>
              <li><strong className="text-[var(--foreground)]">Summary:</strong> A 2–3 sentence plain-language overview of the offer quality.</li>
              <li><strong className="text-[var(--foreground)]">Red flags:</strong> Specific concerns detected in the offer. Each is tied to the actual text.</li>
              <li><strong className="text-[var(--foreground)]">Missing clarity:</strong> Things that are unclear or absent—e.g., compensation not stated, role scope vague.</li>
              <li><strong className="text-[var(--foreground)]">Questions to ask:</strong> Specific questions you can use in a call or email to clarify gaps.</li>
              <li><strong className="text-[var(--foreground)]">Section breakdown:</strong> Each of the five dimensions with its own score and observations.</li>
            </ul>
            <p className="mt-6 text-[var(--muted)] leading-relaxed">
              Slate is a tool to help you think—not a replacement for your judgment. Use it as a starting point and always verify with trusted advisors when in doubt.
            </p>
          </section>

          {/* Best practices */}
          <section id="best-practices" className="mt-16 scroll-mt-24">
            <h2 className="font-serif text-2xl font-bold text-[var(--foreground)]">
              Best practices
            </h2>
            <ul className="mt-6 space-y-4 text-[var(--muted)]">
              <li><strong className="text-[var(--foreground)]">Paste the full text:</strong> The more complete the offer, the better the analysis. Include email threads, PDF content, or any written terms you have.</li>
              <li><strong className="text-[var(--foreground)]">Use the questions:</strong> The &quot;Questions to ask&quot; section is designed to be used in real conversations. Don&apos;t hesitate to ask.</li>
              <li><strong className="text-[var(--foreground)]">Share for feedback:</strong> If you&apos;re unsure, share the analysis link with a mentor or advisor.</li>
              <li><strong className="text-[var(--foreground)]">Compare offers:</strong> Run multiple offers through Slate and compare the dimension scores side by side.</li>
              <li><strong className="text-[var(--foreground)]">Trust but verify:</strong> Slate catches common patterns, but every situation is unique. Use it as input, not the final word.</li>
            </ul>
          </section>

          {/* FAQ */}
          <section id="faq" className="mt-16 scroll-mt-24">
            <h2 className="font-serif text-2xl font-bold text-[var(--foreground)]">
              FAQ
            </h2>
            <dl className="mt-6 space-y-8">
              <div>
                <dt className="font-semibold text-[var(--foreground)]">Is Slate free?</dt>
                <dd className="mt-2 text-[var(--muted)]">
                  Yes. Slate is free for students and freshers. No sign-up required to use the analyzer.
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-[var(--foreground)]">Do I need to create an account?</dt>
                <dd className="mt-2 text-[var(--muted)]">
                  No. You can analyze offers without signing up. Creating an account lets you save and access your analyses across devices.
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-[var(--foreground)]">Is my data private?</dt>
                <dd className="mt-2 text-[var(--muted)]">
                  Your offer text and analysis are stored to generate shareable links. We do not share your data with third parties. See our <Link href="/privacy" className="text-[var(--accent)] hover:underline">Privacy Policy</Link> for details.
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-[var(--foreground)]">Can I share my analysis?</dt>
                <dd className="mt-2 text-[var(--muted)]">
                  Yes. Each analysis generates a shareable link. You can send it to mentors, advisors, or post it for feedback.
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-[var(--foreground)]">What if the analysis is wrong?</dt>
                <dd className="mt-2 text-[var(--muted)]">
                  Slate is a tool to help you think—not a replacement for your judgment. Use it as a starting point and always verify with trusted advisors when in doubt.
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-[var(--foreground)]">What formats can I paste?</dt>
                <dd className="mt-2 text-[var(--muted)]">
                  Any text: offer letters, job descriptions, emails, WhatsApp messages, or copied content from PDFs. Plain text works best.
                </dd>
              </div>
            </dl>
          </section>
        </article>

        <div className="mt-16 animate-fade-in rounded-xl border border-[var(--border)] bg-[var(--card-bg)] p-6 transition-shadow hover:shadow-md">
          <p className="text-[var(--muted)]">
            Ready to analyze an offer?{" "}
            <Link
              href="/analyze"
              className="font-medium text-[var(--accent)] hover:underline"
            >
              Go to the analyzer →
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
