import Link from "next/link";
import { SECONDARY_NAV, FOOTER_DISCLOSURE, SITE, NAV } from "@/data/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-parchment-200 bg-parchment-100">
      <div className="container-page py-12">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <div className="font-serif text-2xl font-semibold text-parchment-900">
              my<span className="text-ocean-600">noosa</span>heads
            </div>
            <p className="mt-3 max-w-sm text-sm text-parchment-700">
              {SITE.editorial}
            </p>
            <p className="mt-4 text-xs text-parchment-500">
              {SITE.region} · {SITE.locale.toUpperCase()} · Built {SITE.established}
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-parchment-900">Explore</h4>
            <ul className="mt-3 space-y-2 text-sm">
              {NAV.slice(0, 8).map((n) => (
                <li key={n.href}>
                  <Link href={n.href} className="text-parchment-700 hover:text-ocean-600">{n.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-parchment-900">About</h4>
            <ul className="mt-3 space-y-2 text-sm">
              {SECONDARY_NAV.map((n) => (
                <li key={n.href}>
                  <Link href={n.href} className="text-parchment-700 hover:text-ocean-600">{n.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-10 rounded-xl border border-parchment-200 bg-parchment-50 p-4 text-xs text-parchment-600">
          <p className="font-semibold text-parchment-700">Affiliate disclosure</p>
          <p className="mt-1">{FOOTER_DISCLOSURE}</p>
        </div>
        <div className="mt-6 flex flex-col items-start justify-between gap-2 text-xs text-parchment-500 md:flex-row md:items-center">
          <span>© {SITE.established} {SITE.domain}. Built honestly. Updated when things change.</span>
          <span>
            Custom domain currently parked at registrar —
            build is production-ready at <a href={SITE.productionUrl} className="link">{SITE.productionUrl}</a>.
          </span>
        </div>
      </div>
    </footer>
  );
}