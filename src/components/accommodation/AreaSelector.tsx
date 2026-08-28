/**
 * AreaSelector — top-of-page clickable cards for the 5 accommodation
 * areas (MSN-2965).
 *
 * Server-rendered. Each card is an anchor link (a tag, not a button)
 * pointing to the per-area detail section further down the page. The
 * card renders the area's photo (Wikimedia Commons) with a short
 * overlay caption and the "best for" line.
 *
 * Each link fires `data-track="accommodation_area_selector_<areaId>"`
 * for funnel analytics.
 */

import Image from "next/image";
import type { Area } from "@/data/accommodation";

type Props = {
  areas: Area[];
};

export function AreaSelector({ areas }: Props) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {areas.map((a) => (
        <a
          key={a.id}
          href={`#${a.anchor}` as `#${string}`}
          data-track={`accommodation_area_selector_${a.id}`}
          className="group block overflow-hidden rounded-2xl border border-paper-200 bg-paper-50 transition-transform hover:scale-[1.01] focus:outline-none focus-visible:ring-2 focus-visible:ring-eucalyptus-700"
        >
          <div className="relative aspect-[4/3] w-full bg-eucalyptus-900">
            <Image
              src={a.photo.url}
              alt={a.photo.caption}
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover"
              loading="lazy"
              decoding="async"
            />
            <div
              className="absolute inset-0 bg-gradient-to-t from-ink-900/70 via-ink-900/20 to-transparent"
              aria-hidden="true"
            />
            <div className="absolute bottom-0 left-0 right-0 p-4 text-paper-50">
              <p className="font-display text-headline-lg text-paper-50 text-balance">
                {a.name}
              </p>
              <p className="mt-1 text-caption text-paper-100 line-clamp-3">
                {a.pitch}
              </p>
            </div>
          </div>
          <div className="p-4">
            <p className="text-body-sm text-ink-700">
              <span className="font-semibold text-ink-900">Best for:</span>{" "}
              {a.bestFor}
            </p>
            <p className="mt-3 text-body-sm font-medium text-eucalyptus-700 group-hover:underline">
              See {a.properties.length} {a.properties.length === 1 ? "property" : "properties"} →
            </p>
          </div>
          <p className="px-4 pb-3 text-caption text-ink-600">
            Photo: {a.photo.author} / Wikimedia Commons · {a.photo.licence}
          </p>
        </a>
      ))}
    </div>
  );
}
