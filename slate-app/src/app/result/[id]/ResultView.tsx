"use client";

import { useState } from "react";
import Link from "next/link";
import type { AnalysisResult, RiskLevel } from "@/lib/types";

interface ResultViewProps {
  id: string;
  result: AnalysisResult;
  inputText: string;
  createdAt: string;
}

function riskColor(level: RiskLevel) {
  switch (level) {
    case "Low":
      return {
        text: "text-[var(--risk-low)]",
        bg: "bg-[var(--risk-low-bg)]",
        border: "border-[var(--risk-low)]/20",
        label: "Low Risk",
      };
    case "Moderate":
      return {
        text: "text-[var(--risk-moderate)]",
        bg: "bg-[var(--risk-moderate-bg)]",
        border: "border-[var(--risk-moderate)]/20",
        label: "Moderate Risk",
      };
    case "High":
      return {
        text: "text-[var(--risk-high)]",
        bg: "bg-[var(--risk-high-bg)]",
        border: "border-[var(--risk-high)]/20",
        label: "High Risk",
      };
    default:
      return {
        text: "text-[var(--muted)]",
        bg: "bg-gray-50",
        border: "border-gray-200",
        label: "Unknown",
      };
  }
}

function RiskBadge({ level, size = "sm" }: { level: RiskLevel; size?: "sm" | "lg" }) {
  const colors = riskColor(level);
  const sizeClass = size === "lg" ? "text-sm px-3 py-1.5" : "text-xs px-2 py-1";
  return (
    <span
      className={`inline-flex items-center rounded-full font-medium ${sizeClass} ${colors.bg} ${colors.text} ${colors.border} border`}
    >
      {colors.label}
    </span>
  );
}

function SectionCard({
  label,
  score,
  points,
  index,
}: {
  label: string;
  score: RiskLevel;
  points: string[];
  index: number;
}) {
  return (
    <div
      className={`animate-fade-in stagger-${index + 1} rounded-xl border border-[var(--border)] bg-[var(--card-bg)] p-5`}
    >
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-[var(--foreground)] uppercase tracking-wide">
          {label}
        </h3>
        <RiskBadge level={score} />
      </div>
      <ul className="space-y-2">
        {points.map((point, i) => (
          <li
            key={i}
            className="text-sm text-[var(--muted)] leading-relaxed flex gap-2"
          >
            <span className="text-[var(--border)] mt-1 shrink-0">•</span>
            <span>{point}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function ResultView({ id, result, inputText, createdAt }: ResultViewProps) {
  const [copied, setCopied] = useState(false);
  const [showOriginal, setShowOriginal] = useState(false);

  const shareUrl = typeof window !== "undefined" ? `${window.location.origin}/result/${id}` : "";

  function handleCopyLink() {
    navigator.clipboard.writeText(shareUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  const overallColors = riskColor(result.overallRisk);
  const sections = [
    result.sections.compensation,
    result.sections.roleClarity,
    result.sections.legalClarity,
    result.sections.growthPotential,
    result.sections.riskSignals,
  ];

  return (
    <main className="min-h-screen flex flex-col items-center px-4 pt-12 pb-16">
      {/* Back + Share */}
      <div className="w-full max-w-2xl flex items-center justify-between mb-8 animate-fade-in">
        <Link
          href="/"
          className="text-sm text-[var(--muted)] hover:text-[var(--foreground)] transition-colors flex items-center gap-1"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="opacity-60">
            <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Analyze another
        </Link>
        <button
          onClick={handleCopyLink}
          className="text-sm text-[var(--accent)] hover:text-[var(--accent)]/80 transition-colors flex items-center gap-1.5"
        >
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <rect x="5" y="5" width="9" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M11 5V3.5A1.5 1.5 0 009.5 2H3.5A1.5 1.5 0 002 3.5V9.5A1.5 1.5 0 003.5 11H5" stroke="currentColor" strokeWidth="1.5"/>
          </svg>
          {copied ? "Copied!" : "Copy share link"}
        </button>
      </div>

      {/* Overall Risk Header */}
      <div className="w-full max-w-2xl animate-fade-in">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-[var(--foreground)]">
              Offer Analysis
            </h1>
            <p className="mt-1 text-xs text-[var(--muted)]">
              {new Date(createdAt).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </p>
          </div>
          <RiskBadge level={result.overallRisk} size="lg" />
        </div>

        {/* Summary */}
        <div className={`mt-6 p-5 rounded-xl border ${overallColors.border} ${overallColors.bg}`}>
          <p className={`text-base leading-relaxed ${overallColors.text}`}>
            {result.summary}
          </p>
        </div>
      </div>

      {/* Red Flags */}
      {result.redFlags.length > 0 && (
        <div className="w-full max-w-2xl mt-10 animate-fade-in stagger-1">
          <h2 className="text-sm font-medium uppercase tracking-widest text-[var(--risk-high)] mb-4">
            Red Flags
          </h2>
          <div className="space-y-2">
            {result.redFlags.map((flag, i) => (
              <div
                key={i}
                className="flex gap-3 p-3 rounded-lg bg-[var(--risk-high-bg)] border border-[var(--risk-high)]/10"
              >
                <span className="text-[var(--risk-high)] shrink-0 mt-0.5">⚠</span>
                <p className="text-sm text-[var(--risk-high)] leading-relaxed">{flag}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Missing Clarity */}
      {result.missingClarity.length > 0 && (
        <div className="w-full max-w-2xl mt-10 animate-fade-in stagger-2">
          <h2 className="text-sm font-medium uppercase tracking-widest text-[var(--risk-moderate)] mb-4">
            Missing Clarity
          </h2>
          <ul className="space-y-2">
            {result.missingClarity.map((item, i) => (
              <li key={i} className="flex gap-3 text-sm text-[var(--muted)] leading-relaxed">
                <span className="text-[var(--risk-moderate)] shrink-0">?</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Sections */}
      <div className="w-full max-w-2xl mt-10 space-y-4">
        <h2 className="text-sm font-medium uppercase tracking-widest text-[var(--muted)] mb-2 animate-fade-in stagger-2">
          Detailed Breakdown
        </h2>
        {sections.map((section, i) => (
          <SectionCard
            key={section.label}
            label={section.label}
            score={section.score}
            points={section.points}
            index={i}
          />
        ))}
      </div>

      {/* Questions to Ask */}
      {result.questionsToAsk.length > 0 && (
        <div className="w-full max-w-2xl mt-10 animate-fade-in stagger-3">
          <h2 className="text-sm font-medium uppercase tracking-widest text-[var(--accent)] mb-4">
            Questions to Ask the Employer
          </h2>
          <div className="rounded-xl border border-[var(--accent)]/15 bg-[var(--accent)]/5 p-5">
            <ol className="space-y-3">
              {result.questionsToAsk.map((q, i) => (
                <li key={i} className="flex gap-3 text-sm leading-relaxed">
                  <span className="text-[var(--accent)] font-mono text-xs mt-0.5 shrink-0">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[var(--foreground)]">{q}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      )}

      {/* Show Original Text */}
      <div className="w-full max-w-2xl mt-10 animate-fade-in stagger-4">
        <button
          onClick={() => setShowOriginal(!showOriginal)}
          className="text-sm text-[var(--muted)] hover:text-[var(--foreground)] transition-colors underline underline-offset-4 decoration-[var(--border)]"
        >
          {showOriginal ? "Hide original text" : "Show original text"}
        </button>
        {showOriginal && (
          <div className="mt-4 p-5 rounded-xl border border-[var(--border)] bg-[var(--card-bg)]">
            <p className="text-sm text-[var(--muted)] leading-relaxed whitespace-pre-wrap">
              {inputText}
            </p>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="w-full max-w-2xl mt-16 pt-8 border-t border-[var(--border)]">
        <div className="flex items-center justify-between">
          <p className="text-xs text-[var(--muted)]">
            Analyzed by{" "}
            <Link href="/" className="text-[var(--foreground)] font-medium hover:text-[var(--accent)] transition-colors">
              Slate
            </Link>
          </p>
          <Link
            href="/"
            className="text-xs text-[var(--accent)] hover:text-[var(--accent)]/80 transition-colors"
          >
            Analyze another offer →
          </Link>
        </div>
      </div>
    </main>
  );
}
