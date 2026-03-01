"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@/lib/auth-context";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/analyze", label: "Analyze" },
  { href: "/docs", label: "Docs" },
];

export default function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, loading, signOut } = useAuth();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[var(--border)] bg-[var(--background)]/95 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="font-serif text-xl font-bold text-[var(--foreground)] transition-opacity hover:opacity-80"
        >
          Slate
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors ${
                pathname === link.href
                  ? "text-[var(--accent)]"
                  : "text-[var(--muted)] hover:text-[var(--foreground)]"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Auth buttons - Desktop */}
        <div className="hidden items-center gap-3 md:flex">
          {!loading && (
            user ? (
              <div className="flex items-center gap-3">
                <span className="max-w-[140px] truncate text-sm text-[var(--muted)]">
                  {user.email}
                </span>
                <button
                  onClick={() => signOut()}
                  className="text-sm font-medium text-[var(--muted)] transition-colors hover:text-[var(--foreground)]"
                >
                  Sign out
                </button>
              </div>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-sm font-medium text-[var(--muted)] transition-colors hover:text-[var(--foreground)]"
                >
                  Log in
                </Link>
                <Link
                  href="/signup"
                  className="rounded-lg bg-[var(--accent)] px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
                >
                  Sign up
                </Link>
              </>
            )
          )}
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="rounded-lg p-2 text-[var(--muted)] hover:bg-[var(--border)]/50 md:hidden"
          aria-label="Toggle menu"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {mobileMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="animate-fade-in border-t border-[var(--border)] bg-[var(--background)] px-4 py-4 md:hidden">
          <nav className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`text-sm font-medium ${
                  pathname === link.href
                    ? "text-[var(--accent)]"
                    : "text-[var(--muted)]"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="flex flex-col gap-2 pt-4">
              {user ? (
                <>
                  <span className="truncate text-sm text-[var(--muted)]">
                    {user.email}
                  </span>
                  <button
                    onClick={() => {
                      signOut();
                      setMobileMenuOpen(false);
                    }}
                    className="text-sm font-medium text-[var(--muted)]"
                  >
                    Sign out
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-sm font-medium text-[var(--muted)]"
                  >
                    Log in
                  </Link>
                  <Link
                    href="/signup"
                    onClick={() => setMobileMenuOpen(false)}
                    className="rounded-lg bg-[var(--accent)] px-4 py-2 text-center text-sm font-medium text-white"
                  >
                    Sign up
                  </Link>
                </>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
