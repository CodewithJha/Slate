"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const EXAMPLE_OFFER = `We are looking for a driven Marketing Intern to join our fast-growing startup. This is an unpaid position but offers great exposure and a certificate of completion. The internship is full-time (9am-6pm, Mon-Sat) for 6 months. A performance-based stipend may be provided after 3 months based on management review. You will be required to sign a 1-year non-compete agreement. Responsibilities include managing all social media, creating marketing strategies, handling client calls, and building our brand from scratch.`;

export default function AnalyzePage() {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleAnalyze() {
    const trimmed = text.trim();
    if (!trimmed) {
      setError("Please paste an offer or job description first.");
      return;
    }
    if (trimmed.length < 30) {
      setError("Please provide more detail — at least a few sentences.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: trimmed }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Analysis failed. Please try again.");
      }

      const data = await res.json();
      if (typeof window !== "undefined") {
        sessionStorage.setItem(
          `slate-fallback-${data.id}`,
          JSON.stringify({
            id: data.id,
            input_text: trimmed,
            result: data.result,
            created_at: new Date().toISOString(),
          })
        );
      }
      router.push(`/result/${data.id}`);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen flex flex-col items-center px-4 pt-12 pb-16 sm:pt-16">
      <div className="w-full max-w-2xl animate-fade-in">
        <h1 className="font-serif text-3xl font-bold tracking-tight text-[var(--foreground)] sm:text-4xl">
          Analyze Offer
        </h1>
        <p className="mt-3 text-base text-[var(--muted)] sm:text-lg">
          Paste any internship or job offer. Get instant clarity on whether
          it&apos;s solid, risky, or exploitative.
        </p>
      </div>

      <div className="w-full max-w-2xl mt-10 animate-fade-in stagger-1">
        <textarea
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            if (error) setError("");
          }}
          placeholder="Paste your offer letter, internship message, or job description here..."
          className="w-full h-56 sm:h-64 p-5 text-base leading-relaxed rounded-xl border border-[var(--border)] bg-[var(--card-bg)] text-[var(--foreground)] placeholder:text-[var(--muted)]/60 resize-none focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/30 focus:border-[var(--accent)]/50 transition-all"
        />

        {error && (
          <p className="mt-2 text-sm text-[var(--risk-high)]">{error}</p>
        )}

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mt-4">
          <button
            onClick={() => {
              setText(EXAMPLE_OFFER);
              setError("");
            }}
            className="text-sm text-[var(--muted)] hover:text-[var(--foreground)] transition-colors underline underline-offset-4 decoration-[var(--border)] hover:decoration-[var(--foreground)]"
          >
            Try an example
          </button>

          <button
            onClick={handleAnalyze}
            disabled={loading}
            className="px-6 py-2.5 rounded-lg bg-[var(--accent)] text-white text-sm font-medium hover:bg-[var(--accent)]/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Analyzing...
              </>
            ) : (
              "Analyze Offer"
            )}
          </button>
        </div>
      </div>

      <div className="w-full max-w-2xl mt-12 animate-fade-in stagger-2">
        <h2 className="text-sm font-medium uppercase tracking-widest text-[var(--muted)] mb-4">
          What you&apos;ll get
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { title: "Risk score", desc: "Low, Moderate, or High" },
            { title: "Red flags", desc: "Specific concerns detected" },
            { title: "Questions to ask", desc: "Clarify before signing" },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-xl border border-[var(--border)] bg-[var(--card-bg)] p-4"
            >
              <h3 className="text-sm font-semibold text-[var(--foreground)]">
                {item.title}
              </h3>
              <p className="mt-1 text-xs text-[var(--muted)]">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
