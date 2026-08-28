/**
 * HomeHero — MSN-2972 premium hero.
 *
 * Single full-bleed sunset photo with the proposition, eyebrow, two CTAs
 * overlaid. Compared to the MSN-2965 version, this version:
 *   - Drops the "By the headland, by the bar" flourish (encyclopedic
 *     pattern, see D5 §6.4)
 *   - Replaces the encyclopedic lead paragraph with the D1 subhead
 *     ("Beautiful beaches, unforgettable stays and everything you need
 *     to plan the perfect Noosa holiday.")
 *   - Re-orders CTAs: Primary = "Find a place to stay" (commercial
 *     anchor, /accommodation); Secondary = "Explore things to do"
 *     (discovery anchor, /things-to-do)
 *   - Tightens the gradient for legibility on the new sunset photo
 *
 * Conversion tracking: the two CTAs carry `data-track` so the layout
 * Plausible wrapper picks up the click.
 */

import Image from "next/image";
import Link from "next/link";

type Props = {
  src: string;
  caption: string;
  photographer: string;
  licence: string;
  commonsPage: string;
};

export function HomeHero({
  src,
  caption,
  photographer,
  licence,
  commonsPage,
}: Props) {
  return (
    <section
      aria-label="Noosa Heads — homepage hero"
      className="relative w-full overflow-hidden bg-eucalyptus-900 h-[78vh] min-h-[560px] max-h-[920px]"
    >
      <Image
        src={src}
        alt={caption}
        fill
        sizes="100vw"
        className="object-cover"
        priority
      />
      {/* Multi-stop gradient — heavier at bottom-left where the
       *  proposition sits; subtle across the rest of the photo. */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-ink-900/30 via-ink-900/15 to-ink-900/60"
        aria-hidden="true"
      />
      <div
        className="absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-t from-ink-900/90 via-ink-900/45 to-transparent"
        aria-hidden="true"
      />

      {/* Foreground content */}
      <div className="relative h-full w-full">
        <div className="container-page h-full flex flex-col justify-end pb-14 md:pb-24">
          <p className="eyebrow text-paper-200">
            Noosa, Queensland
          </p>
          <h1
            className="mt-3 font-display text-display-xl md:text-display-xl text-paper-50 text-balance max-w-4xl"
            style={{ textShadow: "0 2px 24px rgba(11,28,28,0.5)" }}
          >
            Discover Noosa
          </h1>
          <p
            className="mt-5 lead text-paper-100 max-w-2xl text-pretty"
            style={{ textShadow: "0 2px 12px rgba(11,28,28,0.5)" }}
          >
            Beautiful beaches, unforgettable stays and everything you need
            to plan the perfect Noosa holiday.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              href="/accommodation"
              className="btn-primary btn-lg"
              data-track="home_hero_to_stay"
            >
              Find a place to stay
            </Link>
            <Link
              href="/things-to-do"
              className="btn-outline btn-lg border-paper-50 text-paper-50 hover:bg-paper-50 hover:text-ink-900"
              data-track="home_hero_to_things"
            >
              Explore things to do
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Photo caption + attribution — small, bottom-right, never
       *  competes with the proposition. */}
      <div className="absolute right-0 bottom-0 pointer-events-auto">
        <figure className="m-0 p-3 md:p-5 max-w-md text-right">
          <figcaption className="text-caption text-paper-100 text-pretty">
            <span className="block">{caption}</span>
            <a
              href={commonsPage}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 block opacity-80 hover:opacity-100"
            >
              Photo: {photographer} / Wikimedia Commons · {licence}
            </a>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
