/**
 * HomeHero — MSN-2973 cinematic hero.
 *
 * KUBE-style treatment: full-bleed image, brief overlay copy,
 * generous whitespace within the imagery, restrained typography.
 * Compared to the MSN-2972 version, this version:
 *   - Taller hero (78vh → ~88vh) — the KUBE benchmark uses very tall
 *     full-bleed imagery with the headline at the bottom-left.
 *   - Stronger gradient: a near-opaque bottom band so the headline
 *     sits on a dark surface regardless of the photo's local luminance.
 *   - Image positioned with focal-point composition — the sunset
 *     photo is anchored top-right so the silhouette / headland sits
 *     in the upper third while the overlay copy lives in the lower
 *     left.
 *   - Caption is present but the photographer credit is removed
 *     (per MSN-2973 directive — full attribution lives on /photo-credits).
 *
 * Conversion tracking: the two CTAs carry `data-track` so the layout
 * Plausible wrapper picks up the click.
 */

import Image from "next/image";
import Link from "next/link";

type Props = {
  src: string;
  caption: string;
};

export function HomeHero({ src, caption }: Props) {
  return (
    <section
      aria-label="Noosa Heads — homepage hero"
      className="relative w-full overflow-hidden bg-ink-900 h-[88vh] min-h-[640px] max-h-[1100px]"
    >
      {/* Image — focal point anchored top so the headline at the bottom
       *  sits on the cooler bottom-band of the sunset image. */}
      <Image
        src={src}
        alt={caption}
        fill
        sizes="100vw"
        priority
        className="object-cover object-[center_30%]"
      />

      {/* Subtle across-the-frame veil for image unification. */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-ink-900/25 via-ink-900/10 to-ink-900/45"
        aria-hidden="true"
      />
      {/* Stronger bottom band — the headline lives on this. */}
      <div
        className="absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-t from-ink-900/95 via-ink-900/55 to-transparent"
        aria-hidden="true"
      />

      {/* Foreground content — bottom-left positioning, restrained type. */}
      <div className="relative h-full w-full">
        <div className="container-page h-full flex flex-col justify-end pb-16 md:pb-28">
          <p className="eyebrow text-paper-200">Noosa, Queensland</p>
          <h1
            className="mt-3 font-display text-display-xl md:text-display-xl text-paper-50 text-balance max-w-4xl"
            style={{ textShadow: "0 2px 24px rgba(11,28,28,0.6)" }}
          >
            Discover Noosa
          </h1>
          <p
            className="mt-5 lead text-paper-100 max-w-2xl text-pretty"
            style={{ textShadow: "0 2px 12px rgba(11,28,28,0.6)" }}
          >
            A coastline, a river, a national park — and a hundred small
            decisions about where to stay, eat and swim. We link to the
            booking engines and the public sources so you can decide in
            your own time.
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

      {/* Photo caption removed in MSN-2973 to keep the homepage word
       *  count under the ≤250 visitor-facing budget. The photo is the
       *  hero; the imagery speaks. Full attribution lives at
       *  /photo-credits. */}
    </section>
  );
}
