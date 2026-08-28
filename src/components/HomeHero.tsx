/**
 * HomeHero — MSN-2973 atmospheric + KUBE Saint-Tropez treatment.
 *
 * Compared to the MSN-2972 version, this version:
 *   - Single poetic headline (no supporting sentence) — the image
 *     dominates the overlay; copy is restrained.
 *   - Lower overlay brightness so the photo's atmosphere carries the
 *     page. Gradient is gentler across most of the frame, anchoring
 *     only at the bottom band where the headline + CTAs sit.
 *   - 88vh, focal-point composition (`object-[center_30%]`), bottom-
 *     left copy positioning.
 *   - Attribution removed (MSN-2973) — full credit at /photo-credits.
 *
 * KUBE Saint-Tropez benchmark: their hero is "single poetic headline
 * + 1 short evocative paragraph, no supporting sentence". We mirror
 * that — one line of atmosphere, no functional description.
 */

import Image from "next/image";
import Link from "next/link";

type Props = {
  src: string;
};

export function HomeHero({ src }: Props) {
  return (
    <section
      aria-label="Noosa Heads — homepage hero"
      className="relative w-full overflow-hidden bg-ink-900 h-[88vh] min-h-[640px] max-h-[1100px]"
    >
      {/* Image — focal point anchored top so the headline at the bottom
       *  sits on the cooler bottom-band of the sunset image. */}
      <Image
        src={src}
        alt="Sunset over Noosa Main Beach — headland silhouette, palm frond, the long beach."
        fill
        sizes="100vw"
        priority
        className="object-cover object-[center_30%]"
      />

      {/* Lighter across-the-frame veil — the image dominates. */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-ink-900/15 via-transparent to-ink-900/25"
        aria-hidden="true"
      />
      {/* Bottom band — gentler than before, anchors the headline. */}
      <div
        className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-ink-900/85 via-ink-900/40 to-transparent"
        aria-hidden="true"
      />

      {/* Foreground — single poetic headline + CTAs. No supporting
       *  sentence; the image carries the atmosphere. */}
      <div className="relative h-full w-full">
        <div className="container-page h-full flex flex-col justify-end pb-20 md:pb-32">
          <h1
            className="font-display text-display-xl md:text-display-xl text-paper-50 text-balance max-w-4xl"
            style={{ textShadow: "0 2px 24px rgba(11,28,28,0.45)" }}
          >
            Where the headland meets the sea.
          </h1>
          <div className="mt-8 flex flex-wrap gap-3">
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
    </section>
  );
}
