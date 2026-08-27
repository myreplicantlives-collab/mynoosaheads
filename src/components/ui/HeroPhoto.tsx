/**
 * HeroPhoto — full-bleed category-page hero with caption overlay.
 *
 * Sprint 1.5 (MSN-2958 / TSK-2958-02). Per Albert's visual_audit.md §1,
 * category hero images should occupy ~60vh on desktop with the
 * headline + sub overlaid in the lower-left.
 *
 * The headline is rendered above the image (not on top of it) to avoid
 * the legibility problems of overlay-on-photo. The image carries a
 * gentle dark gradient at the foot so the headline drop still has
 * contrast on bright photos.
 */

import Image from "next/image";

export type HeroPhotoProps = {
  src: string;
  alt: string;
  credit: string;
  /** Caption shown on the photo (default = alt text). */
  caption?: string;
  /** Optional aspect ratio / height override. Defaults to ~60vh on
   * desktop and ~50vh on mobile (responsive). */
  height?: {
    mobile?: string; // tailwind height class, e.g. "h-[55vh]"
    desktop?: string; // tailwind height class, e.g. "md:h-[60vh]"
  };
  /** Tiny inline base64 placeholder (1×1 or 4×4 px). */
  blurDataURL?: string;
};

export function HeroPhoto({
  src,
  alt,
  credit,
  caption,
  height = { mobile: "h-[55vh]", desktop: "md:h-[60vh]" },
  blurDataURL,
}: HeroPhotoProps) {
  return (
    <figure className="relative w-full">
      <div
        className={`relative w-full overflow-hidden bg-eucalyptus-900 ${height.mobile ?? "h-[55vh]"} ${height.desktop ?? "md:h-[60vh]"}`}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes="100vw"
          className="object-cover"
          placeholder={blurDataURL ? "blur" : "empty"}
          blurDataURL={blurDataURL}
          priority
          // MSN-2959 / TSK-2959-POLISH-B: route through Vercel image
          // optimisation pipeline (AVIF/WebP) — previously bypassed
          // which dropped Lighthouse Best Practices & Mobile Perf.
        />
        {/* Caption + credit on the photo (lower-left). */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute bottom-0 left-0 right-0 p-5 md:p-10 hero-overlay pointer-events-auto">
            <p className="font-display text-paper-50 text-display-sm md:text-display-md text-balance max-w-3xl">
              {caption ?? alt}
            </p>
            <p className="mt-2 text-caption text-paper-100">{credit}</p>
          </div>
        </div>
      </div>
    </figure>
  );
}
