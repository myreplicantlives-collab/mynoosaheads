/**
 * ActivityCard — tour / activity card.
 *
 * MSN-3057 (Workstream 3 — Reusable conversion components):
 *   "activity cards"
 *
 * Sister to AccommodationCard. Designed for tour + activity cards:
 *   - image slot
 *   - operator name + descriptor + duration / cost band
 *   - "Best for" badge
 *   - primary CTA (via CheckAvailabilityCTA or ViewTourOptionsCTA)
 *   - data-track on the clickable region
 *
 * Operator-direct links never carry `rel="sponsored"`. Network
 * affiliate links render with `rel="sponsored"` only when the
 * programme is enabled AND verified.
 */

import { CheckAvailabilityCTA } from "./CheckAvailabilityCTA";
import { ViewTourOptionsCTA } from "./ViewTourOptionsCTA";
import { BestForBadge } from "./BestForBadge";

export type ActivityCardProps = {
  operator: string;
  descriptor: string;
  bestFor?: string;
  /** Optional duration band — e.g. "2 hours", "Half day". */
  duration?: string;
  /** Optional price band — qualitative only, no fabricated numbers. */
  priceBand?: string;
  /** Booking URL — already built by the caller (operator-direct or network). */
  href: string;
  /** Stable placement key for data-track — e.g. "surf-lessons-noosa-longboards". */
  placement: string;
  /** Photo slot. */
  image: {
    src: string;
    alt: string;
    srcSet?: string;
  };
  /** When true, renders the "View tour options" CTA (ocean emphasis);
   *  when false, renders the "Check availability" CTA. */
  useTourCTA?: boolean;
  /** Optional CTA label override. */
  ctaLabel?: string;
  className?: string;
};

export function ActivityCard({
  operator,
  descriptor,
  bestFor,
  duration,
  priceBand,
  href,
  placement,
  image,
  useTourCTA = true,
  ctaLabel,
  className,
}: ActivityCardProps) {
  const CTA = useTourCTA ? ViewTourOptionsCTA : CheckAvailabilityCTA;
  return (
    <article
      className={
        "rounded-xl bg-paper-50 ring-1 ring-paper-200 overflow-hidden flex flex-col " +
        (className ?? "")
      }
      data-track={`activity_card_${placement}`}
    >
      <div className="relative aspect-[16/10] bg-ink-700">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={image.src}
          srcSet={image.srcSet}
          alt={image.alt}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>
      <div className="flex-1 p-5 md:p-6 flex flex-col">
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <h3 className="font-display text-headline-md text-ink-900 text-balance">
            {operator}
          </h3>
          {bestFor ? <BestForBadge label={bestFor} mode="compact" /> : null}
        </div>
        <p className="mt-2 text-body-sm text-ink-800 text-pretty flex-1">
          {descriptor}
        </p>
        {(duration || priceBand) && (
          <dl className="mt-3 grid grid-cols-2 gap-3 text-caption text-ink-700">
            {duration ? (
              <div>
                <dt className="eyebrow text-ink-600">Duration</dt>
                <dd>{duration}</dd>
              </div>
            ) : null}
            {priceBand ? (
              <div>
                <dt className="eyebrow text-ink-600">Cost band</dt>
                <dd>{priceBand}</dd>
              </div>
            ) : null}
          </dl>
        )}
        <div className="mt-5">
          <CTA
            href={href}
            placement={placement}
            label={ctaLabel}
            size="compact"
          />
        </div>
      </div>
    </article>
  );
}
