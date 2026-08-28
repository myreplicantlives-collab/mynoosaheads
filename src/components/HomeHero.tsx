/**
 * HomeHero — MSN-2965 aspirational homepage hero.
 *
 * Single full-bleed photo with the H1, sub, flourish, and CTAs overlaid.
 * The previous version (HeroPhoto + Hero stacked) separated the photo
 * and the headline; the new treatment puts the headline ON the photo
 * with a stronger gradient and bigger headline.
 *
 * Accessible: the H1 is the first heading-level element on the page;
 * the photo caption is rendered as a smaller subline above the
 *  attribution (Photographer / Wikimedia Commons · licence).
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
      className="relative w-full overflow-hidden bg-eucalyptus-900 h-[80vh] min-h-[560px] max-h-[920px]"
    >
      <Image
        src={src}
        alt={caption}
        fill
        sizes="100vw"
        className="object-cover"
        priority
      />
      {/* Multi-stop gradient: more dramatic dark at the bottom-left for
       *  the headline legibility. */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-ink-900/40 via-ink-900/30 to-ink-900/80"
        aria-hidden="true"
      />
      <div
        className="absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-t from-ink-900/85 via-ink-900/40 to-transparent"
        aria-hidden="true"
      />

      {/* Foreground content */}
      <div className="relative h-full w-full">
        <div className="container-page h-full flex flex-col justify-end pb-12 md:pb-20">
          <p className="eyebrow text-paper-200">
            Queensland, Australia · independent editorial
          </p>
          <h1
            className="mt-4 font-display text-display-xl md:text-display-xl text-paper-50 text-balance max-w-4xl"
            style={{ textShadow: "0 2px 24px rgba(11,28,28,0.45)" }}
          >
            By the headland, by the bar.
          </h1>
          <p
            className="mt-5 lead text-paper-100 max-w-2xl text-pretty"
            style={{ textShadow: "0 2px 12px rgba(11,28,28,0.45)" }}
          >
            An independent, sourced guide to Noosa Heads on the Sunshine
            Coast. Surf and weather from BOM Southeast Coast and
            Open-Meteo, national-park alerts from QPWS, and clear local
            rules so you spend less time researching and more time on the
            coast.
          </p>
          <p className="mt-4 accent-flourish text-accent-md text-amber-200">
            Plan your Noosa trip well.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              href="/surf-and-weather"
              className="btn-primary btn-lg"
              data-track="home_hero_to_surf"
            >
              Today&rsquo;s surf &amp; weather
            </Link>
            <Link
              href="/noosa-national-park"
              className="btn-outline btn-lg border-paper-50 text-paper-50 hover:bg-paper-50 hover:text-ink-900"
              data-track="home_hero_to_park"
            >
              National Park alerts
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Photo caption + attribution — small, bottom-right, never
       *  competes with the headline. */}
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
