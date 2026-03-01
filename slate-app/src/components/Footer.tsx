import Link from "next/link";

const footerLinks = {
  product: [
    { href: "/analyze", label: "Analyze Offer" },
    { href: "/docs", label: "Documentation" },
    { href: "/docs#how-it-works", label: "How it works" },
  ],
  company: [
    { href: "/docs#about", label: "About" },
    { href: "/docs#use-cases", label: "Use cases" },
    { href: "/docs#faq", label: "FAQ" },
  ],
  legal: [
    { href: "/privacy", label: "Privacy" },
    { href: "/terms", label: "Terms" },
  ],
};

export default function Footer() {
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--card-bg)]">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link
              href="/"
              className="font-serif text-lg font-bold text-[var(--foreground)]"
            >
              Slate
            </Link>
            <p className="mt-3 text-sm text-[var(--muted)]">
              Smart internship and fresher job offer analyzer. Know if an
              opportunity is solid, risky, or exploitative.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-[var(--muted)]">
              Product
            </h4>
            <ul className="mt-4 space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[var(--muted)] transition-colors hover:text-[var(--foreground)]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-[var(--muted)]">
              Resources
            </h4>
            <ul className="mt-4 space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[var(--muted)] transition-colors hover:text-[var(--foreground)]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-[var(--muted)]">
              Legal
            </h4>
            <ul className="mt-4 space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[var(--muted)] transition-colors hover:text-[var(--foreground)]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-[var(--border)] pt-8">
          <p className="text-center text-xs text-[var(--muted)]">
            © {new Date().getFullYear()} Slate. Free for students & freshers.
          </p>
        </div>
      </div>
    </footer>
  );
}
