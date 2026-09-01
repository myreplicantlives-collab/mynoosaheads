/**
 * AccommodationCard — image-dominant card with verified-photo slot.
 *
 * MSN-3057 (Workstream 3 — Reusable conversion components):
 *   "accommodation cards"
 *
 * Mirrors the visual treatment of the existing /accommodation page
 * property cards so the M2 commercial cluster shares one consistent
 * design language. Each card has:
 *   - image slot (caller owns the source + caption)
 *   - property name + descriptor
 *   - "Best for" badge
 *   - primary CTA (via CheckAvailabilityCTA)
 *   - data-track on the clickable region
 *
 * If the programme is `enabled && verified` in the central config,
 * the CTA renders with `rel="sponsored"` and the AffiliateBadge is
 * visible. Otherwise the CTA is a normal outbound link and no badge
 * renders.
 */

import Link from "next/link";
import { CheckAvailabilityCTA } from "./CheckAvailabilityCTA";
import { BestForBadge } from "./BestForBadge";
import {
  isAffiliateCommercial,
  type ProgrammeId,
} from "@/lib/affiliates";

export type AccommodationCardProps = {
  name: string;
  descriptor: string;
  bestFor: string;
  /** Programme whose URL we render — null = operator-direct. */
  programme: ProgrammeId | "operator-direct";
  /** Booking URL — already built via buildPartnerLink() by the caller. */
  href: string;
  /** Stable placement key for data-track — e.g. "luxury-card-netanya-noosa". */
  placement: string;
  /** Photo slot — caller owns source + caption. */
  image: {
    src: string;
    alt: string;
    /** Optional srcset string (already built by the photo registry). */
    srcSet?: string;
  };
  /** Optional secondary line shown under the descriptor. */
  location?: string;
  className?: string;
};

export function AccommodationCard({
  name,
  descriptor,
  bestFor,
  programme,
  href,
  placement,
  image,
  location,
  className,
}: AccommodationCardProps) {
  const isAffiliate =
    programme !== "operator-direct" && isAffiliateCommercial(programme);
  const rel = isAffiliate ? "sponsored noopener noreferrer" : "noopener noreferrer";
  const ctaLabel =
    programme === "operator-direct" ? "Book direct" : "Check availability";
  return (
    <article
      className={
        "group relative overflow-hidden rounded-xl aspect-[4/5] bg-ink-700 " +
        (className ?? "")
      }
      data-track={`accomm_card_${placement}`}
    >
      <a
        href={href}
        target="_blank"
        rel={rel}
        aria-label={`${ctaLabel} — ${name}`}
        className="absolute inset-0 z-10"
      >
        <span className="sr-only">{ctaLabel}</span>
      </a>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={image.src}
        srcSet={image.srcSet}
        alt={image.alt}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-ink-900/85 via-ink-900/30 to-transparent"
        aria-hidden="true"
      />
      <div className="relative h-full w-full p-5 md:p-6 flex flex-col justify-end pointer-events-none">
        <div className="pointer-events-auto">
          <BestForBadge label={bestFor} mode="compact" />
          <h3 className="mt-2 font-display text-display-sm text-paper-50 text-balance">
            {name}
          </h3>
          <p className="mt-1 text-body-sm text-paper-200 text-pretty">
            {descriptor}
          </p>
          {location ? (
            <p className="mt-1 text-caption text-paper-300 text-pretty">
              {location}
            </p>
          ) : null}
        </div>
      </div>
    </article>
  );
}
