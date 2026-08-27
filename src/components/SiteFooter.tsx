import Link from "next/link";
import { SITE } from "@/data/site";

// Sprint 1.1 — placeholder footer.
// TSK-2957-02 (design system) will replace this with the proper nav, disclosures,
// and editorial-policy links.
export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-parchment-200 bg-parchment-100">
      <div className="container-page py-10">
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <div>
            <div className="font-serif text-lg font-semibold text-parchment-900">
              My <span className="text-ocean-600">Noosa Heads</span>
            </div>
            <p className="mt-1 text-sm text-parchment-700">
              {SITE.region} · {SITE.locale.toUpperCase()} · Built {SITE.established}
            </p>
          </div>
          <div className="text-xs text-parchment-500">
            © {year} {SITE.domain}. Built honestly. Coming soon.
          </div>
        </div>
      </div>
    </footer>
  );
}