import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4">
      <div className="max-w-md text-center space-y-6">
        <h1 className="text-2xl font-bold text-[var(--foreground)]">
          Page not found
        </h1>
        <p className="text-[var(--muted)]">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-block px-5 py-2.5 rounded-lg bg-[var(--accent)] text-white text-sm font-medium hover:bg-[var(--accent)]/90 transition-colors"
        >
          Back to Slate
        </Link>
      </div>
    </main>
  );
}
