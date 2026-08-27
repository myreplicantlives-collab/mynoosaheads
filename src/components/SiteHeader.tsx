import Link from "next/link";
import { SITE } from "@/data/site";

// Sprint 1.1 — placeholder header.
// TSK-2957-02 (design system) will replace this with the proper nav, logo,
// and accessibility features.
export function SiteHeader() {
  return (
    <header className="border-b border-parchment-200 bg-parchment-50">
      <div className="container-page flex h-16 items-center justify-between">
        <Link href="/" className="flex items-baseline gap-1">
          <span className="font-serif text-xl font-semibold tracking-tight text-parchment-900">
            My <span className="text-ocean-600">Noosa Heads</span>
          </span>
        </Link>
        <span className="text-xs uppercase tracking-[0.16em] text-parchment-500">
          Foundation scaffold
        </span>
      </div>
    </header>
  );
}