"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    try {
      const { error } = await supabase.auth.signUp({ email, password });

      if (error) {
        setError(error.message);
        return;
      }

      setMessage("Check your email to confirm your account.");
      router.push("/");
      router.refresh();
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 py-16">
      <div className="w-full max-w-sm animate-fade-in">
        <h1 className="font-serif text-2xl font-bold text-[var(--foreground)] sm:text-3xl">
          Sign up
        </h1>
        <p className="mt-2 text-sm text-[var(--muted)]">
          Create an account to save and access your analyses.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-[var(--foreground)]"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-2 w-full rounded-lg border border-[var(--border)] bg-[var(--card-bg)] px-4 py-2.5 text-[var(--foreground)] placeholder:text-[var(--muted)]/60 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/30"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-[var(--foreground)]"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              className="mt-2 w-full rounded-lg border border-[var(--border)] bg-[var(--card-bg)] px-4 py-2.5 text-[var(--foreground)] placeholder:text-[var(--muted)]/60 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/30"
              placeholder="At least 6 characters"
            />
          </div>

          {error && (
            <p className="text-sm text-[var(--risk-high)]">{error}</p>
          )}
          {message && (
            <p className="text-sm text-[var(--risk-low)]">{message}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-[var(--accent)] py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-50"
          >
            {loading ? "Creating account..." : "Sign up"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-[var(--muted)]">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-medium text-[var(--accent)] hover:underline"
          >
            Log in
          </Link>
        </p>
      </div>
    </main>
  );
}
