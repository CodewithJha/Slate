"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import ResultView from "./ResultView";
import type { AnalysisResult } from "@/lib/types";

const STORAGE_KEY_PREFIX = "slate-fallback-";

interface StoredAnalysis {
  id: string;
  input_text: string;
  result: AnalysisResult;
  created_at: string;
}

export default function ResultPageClient() {
  const params = useParams();
  const id = params?.id as string | undefined;
  const [data, setData] = useState<StoredAnalysis | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [fromFallback, setFromFallback] = useState(false);

  useEffect(() => {
    if (!id) {
      setNotFound(true);
      setLoading(false);
      return;
    }

    async function load() {
      try {
        // Check sessionStorage first (instant for same-session results)
        if (typeof window !== "undefined") {
          const stored = sessionStorage.getItem(`${STORAGE_KEY_PREFIX}${id}`);
          if (stored) {
            try {
              const parsed = JSON.parse(stored) as StoredAnalysis;
              setData(parsed);
              setFromFallback(true);
              setLoading(false);
              return;
            } catch {
              // Fall through to fetch
            }
          }
        }

        // Fetch from API with timeout (API can hang if Supabase not configured)
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000);

        const res = await fetch(`/api/result/${id}`, {
          signal: controller.signal,
        });
        clearTimeout(timeoutId);

        if (res.ok) {
          const json = await res.json();
          setData(json);
          setLoading(false);
          return;
        }

        // 404: check sessionStorage fallback (e.g. when Supabase save failed)
        if (typeof window !== "undefined") {
          const stored = sessionStorage.getItem(`${STORAGE_KEY_PREFIX}${id}`);
          if (stored) {
            try {
              const parsed = JSON.parse(stored) as StoredAnalysis;
              setData(parsed);
              setFromFallback(true);
            } catch {
              setNotFound(true);
            }
          } else {
            setNotFound(true);
          }
        } else {
          setNotFound(true);
        }
      } catch (err) {
        // On timeout/network error, try sessionStorage (e.g. just-analyzed offer)
        if (typeof window !== "undefined") {
          const stored = sessionStorage.getItem(`${STORAGE_KEY_PREFIX}${id}`);
          if (stored) {
            try {
              const parsed = JSON.parse(stored) as StoredAnalysis;
              setData(parsed);
              setFromFallback(true);
            } catch {
              setNotFound(true);
            }
          } else {
            setNotFound(true);
          }
        } else {
          setNotFound(true);
        }
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [id]);

  if (loading) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center px-4">
        <div className="flex flex-col items-center gap-4">
          <span className="inline-block w-8 h-8 border-2 border-[var(--accent)]/30 border-t-[var(--accent)] rounded-full animate-spin" />
          <p className="text-sm text-[var(--muted)]">Loading analysis...</p>
        </div>
      </main>
    );
  }

  if (notFound || !data) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center px-4">
        <div className="max-w-md text-center space-y-6">
          <h1 className="text-2xl font-bold text-[var(--foreground)]">
            Analysis not found
          </h1>
          <p className="text-[var(--muted)]">
            This analysis may have expired or the link is invalid.
          </p>
          <Link
            href="/"
            className="inline-block px-5 py-2.5 rounded-lg bg-[var(--accent)] text-white text-sm font-medium hover:bg-[var(--accent)]/90 transition-colors"
          >
            Analyze an offer
          </Link>
        </div>
      </main>
    );
  }

  return (
    <>
      {fromFallback && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-lg bg-[var(--risk-moderate-bg)] border border-[var(--risk-moderate)]/30 text-sm text-[var(--risk-moderate)]">
          Saved locally — could not save to cloud. Share link may not work for others.
        </div>
      )}
      <ResultView
        id={data.id}
        result={data.result}
        inputText={data.input_text}
        createdAt={data.created_at}
      />
    </>
  );
}
