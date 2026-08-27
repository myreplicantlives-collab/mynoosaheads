import Link from "next/link";
import { NAV, SITE } from "@/data/site";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-parchment-200 bg-parchment-50/95 backdrop-blur">
      <div className="container-page flex h-16 items-center justify-between gap-6">
        <Link href="/" className="flex items-baseline gap-1">
          <span className="font-serif text-xl font-semibold tracking-tight text-parchment-900">
            my<span className="text-ocean-600">noosa</span>heads
          </span>
        </Link>
        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-5 text-sm font-medium text-parchment-700">
            {NAV.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-ocean-600 transition">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center gap-2">
          <Link href="/where-to-stay" className="btn btn-primary hidden md:inline-flex text-xs px-4 py-2">
            Where to stay
          </Link>
          <details className="lg:hidden relative">
            <summary className="btn btn-ghost cursor-pointer" aria-label="Menu">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </summary>
            <nav className="absolute right-0 top-12 w-64 rounded-xl border border-parchment-200 bg-white p-3 shadow-lg" aria-label="Mobile">
              <ul className="flex flex-col gap-1 text-sm">
                {NAV.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="block rounded-md px-3 py-2 hover:bg-parchment-50">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </details>
        </div>
      </div>
    </header>
  );
}