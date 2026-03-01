"use client";

import Link from "next/link";

export default function AnalyzeCTA() {
  return (
    <Link
      href="/analyze"
      className="mt-8 inline-flex items-center gap-2 rounded-lg bg-[var(--accent)] px-6 py-3 text-base font-medium text-white transition-opacity hover:opacity-90"
    >
      Analyze an offer
      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
      </svg>
    </Link>
  );
}
