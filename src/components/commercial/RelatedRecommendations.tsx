/**
 * RelatedRecommendations — list of internal-link recommendations.
 *
 * MSN-3057 (Workstream 3 — Reusable conversion components):
 *   "related recommendations"
 *
 * Used at the foot of every commercial page. Each recommendation is
 * a small card with an editorial label, a short pitch, and a link to
 * the recommended page. Tracks clicks via data-track so Plausible
 * can attribute navigation patterns.
 */

import Link from "next/link";

export type RelatedRecommendation = {
  label: string;
  href: string;
  pitch: string;
  /** Optional eyebrow / category label (e.g. "STAY", "WALK", "EAT"). */
  category?: string;
};

export type RelatedRecommendationsProps = {
  heading?: string;
  items: RelatedRecommendation[];
  className?: string;
};

export function RelatedRecommendations({
  heading = "Related guides",
  items,
  className,
}: RelatedRecommendationsProps) {
  if (items.length === 0) return null;
  return (
    <nav
      aria-label="Related guides"
      className={className}
      data-track="related_recommendations"
    >
      <h2 className="font-display text-display-sm md:text-headline-lg text-ink-900 text-balance">
        {heading}
      </h2>
      <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item, i) => {
          const trackKey = `related_${item.href.split("/").filter(Boolean).join("_") || "page"}`;
          return (
            <li key={i}>
              <Link
                href={item.href}
                className="block rounded-lg bg-paper-50 ring-1 ring-paper-200 p-4 hover:bg-paper-100 transition"
                data-track={trackKey}
              >
                {item.category ? (
                  <p className="eyebrow text-eucalyptus-700">{item.category}</p>
                ) : null}
                <p className="mt-1 font-display text-headline-md text-ink-900 text-balance">
                  {item.label}
                </p>
                <p className="mt-1 text-body-sm text-ink-700 text-pretty">
                  {item.pitch}
                </p>
                <p className="mt-2 text-caption text-ocean-700">
                  Read more <span aria-hidden="true">→</span>
                </p>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
