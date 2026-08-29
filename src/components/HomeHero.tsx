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
 *
 * MSN-2975 perf chunk 2: the underlying <img> now points at the
 * self-hosted WebP variants under /photos/. src + srcSet are passed
 * in by the homepage (HomeHero is the only consumer). The browser
 * picks the best width from the srcSet matching sizes="100vw" (640w
 * on phones, 1080w on tablets, 1920w on laptops, 3840w on 4K).
 *
 * Implementation note: we use a native <img> with the React 18.3
 * fetchPriority prop instead of next/image. next/image computes its
 * own srcSet via the image optimizer, and the optimizer is disabled
 * on Cloudflare Pages (`images.unoptimized = true`) — so passing
 * srcSet to next/image would be deleted by `delete rest.srcSet`
 * (see get-img-props.js). Native <img> with explicit width/height
 * (or fill + sized parent) gives CLS = 0 on both Vercel and
 * Cloudflare without any extra /_next/image hops.
 */

import Link from "next/link";

type Props = {
  src: string;
  /** Optional responsive srcSet (the 4 self-hosted WebP widths). */
  srcSet?: string;
};

export function HomeHero({ src, srcSet }: Props) {
  return (
    <section
      aria-label="Noosa Heads — homepage hero"
      className="relative w-full overflow-hidden bg-ink-900 h-[88vh] min-h-[640px] max-h-[1100px]"
    >
      {/* Image — focal point anchored top so the headline at the bottom
       *  sits on the cooler bottom-band of the sunset image.
       *  absolute inset-0 + object-cover inside an h-[88vh] parent =
       *  CLS = 0 on both Vercel and Cloudflare. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        srcSet={srcSet ?? undefined}
        sizes="100vw"
        alt="Sunset over Noosa Main Beach — headland silhouette, palm frond, the long beach."
        decoding="async"
        fetchPriority="high"
        // React 18.3 emits the lowercase `fetchpriority` HTML attribute.
        // `loading="eager"` is implicit because the browser doesn't apply
        // lazy-loading to images that are already above the fold and
        // haven't declared `loading="lazy"`.
        className="absolute inset-0 h-full w-full object-cover object-[center_30%]"
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
