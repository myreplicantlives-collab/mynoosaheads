/**
 * AreaDetail — per-area expandable block (MSN-2965).
 *
 * Server-rendered. Each block has:
 *   - Area name (anchor target — the URL hash from selector cards)
 *   - Photo + "why this area" copy
 *   - Internal links for IA discovery (surf/weather, national park, etc.)
 *   - Other-options link-out to area-wide booking engines
 *
 * Properties within each area render separately on the unified grid
 * (PropertyGrid). The detail block is for context + internal links.
 */

import Image from "next/image";
import Link from "next/link";
import { Button, Icons } from "@/components/ui";
import type { Area, BookingEngine } from "@/data/accommodation";

type Props = {
  area: Area;
  index: number;
};

const ENGINE_LABEL: Record<BookingEngine, string> = {
  booking: "Booking.com",
  stayz: "Stayz",
  expedia: "Expedia",
  airbnb: "Airbnb",
  direct: "Operator direct",
};

export function AreaDetail({ area, index }: Props) {
  return (
    <section
      id={`area-${area.id}`}
      className="container-page py-14 md:py-20"
      aria-labelledby={`${area.id}-h`}
    >
      <div className="grid gap-8 md:grid-cols-2 md:items-start">
        {/* ─── Photo ─── */}
        <div className={index % 2 === 1 ? "md:order-2" : ""}>
          <figure className="overflow-hidden rounded-2xl border border-paper-200 bg-paper-100">
            <div className="relative aspect-[4/3] w-full">
              <Image
                src={area.photo.url}
                alt={area.photo.caption}
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover"
                loading="lazy"
                decoding="async"
              />
            </div>
            <figcaption className="px-4 py-3 text-caption text-ink-600">
              <span className="font-medium text-ink-700">{area.photo.caption}</span>
              <br />
              Photo: {area.photo.author} / Wikimedia Commons · {area.photo.licence}
            </figcaption>
          </figure>
        </div>

        {/* ─── Copy ─── */}
        <div>
          <p className="eyebrow">Area detail</p>
          <h3
            id={`${area.id}-h`}
            className="mt-1 font-display text-display-md text-ink-900 text-balance"
          >
            {area.name}
          </h3>
          <p className="mt-3 lead text-pretty">{area.pitch}</p>
          <p className="mt-1 text-caption text-ink-700">
            <span className="font-semibold text-ink-900">Best for:</span> {area.bestFor}
          </p>
          {area.priceCompass ? (
            <p className="mt-2 text-caption text-ink-700">
              <span className="font-semibold text-ink-900">Price compass (peak):</span>{" "}
              {area.priceCompass}
              <span className="ml-1 text-ink-600">
                Verify against live listings before booking.
              </span>
            </p>
          ) : null}
          <p className="mt-5 text-body-sm text-ink-800 text-pretty">
            {area.whyThisArea}
          </p>

          {/* ─── Internal links for IA discovery ─── */}
          <div className="mt-6">
            <p className="eyebrow">Related on this site</p>
            <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
              {area.internalLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="link text-ocean-700 text-body-sm font-medium"
                    data-track={`accommodation_area_internal_${area.id}`}
                  >
                    {l.label} →
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ─── Other options ─── */}
          {area.otherOptions && area.otherOptions.length > 0 ? (
            <div className="mt-6">
              <p className="eyebrow">Other options in this area</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {area.otherOptions.map((o) => (
                  <a
                    key={o.href}
                    href={o.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-outline btn-sm"
                    data-track={`accommodation_area_other_${area.id}_${o.engine}`}
                  >
                    {o.label}
                    <Icons.External size={12} />
                  </a>
                ))}
              </div>
            </div>
          ) : null}

          {/* ─── Jumping to properties ─── */}
          <div className="mt-6">
            <Button
              href="#property-grid"
              variant="primary"
              size="sm"
              trailingIcon={
                <span className="rotate-90 inline-block" aria-hidden="true">
                  <Icons.ChevronRight size={14} />
                </span>
              }
              data-track={`accommodation_area_to_grid_${area.id}`}
            >
              See {area.name.split("&")[0].trim()} properties in the grid
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
