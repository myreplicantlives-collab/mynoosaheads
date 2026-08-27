/**
 * Logo — three SVG candidates (1, 2, 3) for Albert to choose from.
 *
 * Per the design brief:
 *   - Lockup = "MyNoosaHeads" wordmark in Fraunces 600 italic + Sunset Coral dot.
 *   - Logo 1 (Eucalyptus Mark) — clean eucalyptus sprig silhouette.
 *   - Logo 2 (The Headland)    — single-line headland silhouette (CONFIRMED primary).
 *   - Logo 3 (Surf Wave)       — three-line wave silhouette + dot.
 *
 * Each logo is self-contained SVG (`<svg>`) so consumers can pass className
 * for sizing/colour. The `mark` prop selects which candidate to render.
 *
 * File paths:
 *   /public/brand/logo-1.svg (eucalyptus)
 *   /public/brand/logo-2.svg (headland)
 *   /public/brand/logo-3.svg (wave)
 *
 * Note: the full SVG files in /public/brand/ are the canonical Albert-facing
 * mocks. The components below render those SVGs inline (via <img src>) so
 * the Pubic/brand SVGs are the single source of truth, no markup drift.
 */

import type { CSSProperties } from "react";

export type LogoMark = "1" | "2" | "3";

export type LogoProps = {
  mark?: LogoMark;
  /** Wordmark text — defaults to "MyNoosaHeads". */
  wordmark?: string;
  /** Whether to render the wordmark. */
  showWordmark?: boolean;
  /** Whether to render the closing Coral dot. */
  showDot?: boolean;
  /** Overall scale factor (multiplies the inline SVG height). */
  size?: "xs" | "sm" | "md" | "lg";
  className?: string;
  style?: CSSProperties;
};

const SIZE_PX: Record<NonNullable<LogoProps["size"]>, number> = {
  xs: 18,
  sm: 22,
  md: 28,
  lg: 40,
};

export function Logo({
  mark = "2",
  wordmark = "MyNoosaHeads",
  showWordmark = true,
  showDot = true,
  size = "md",
  className,
  style,
}: LogoProps) {
  const px = SIZE_PX[size];
  return (
    <span
      className={[
        "inline-flex items-center gap-2 align-middle",
        className ?? "",
      ].join(" ")}
      style={style}
      aria-label={showWordmark ? undefined : `${wordmark} logo`}
    >
      <img
        src={`/brand/logo-${mark}.svg`}
        alt=""
        aria-hidden="true"
        height={px}
        width={px}
        style={{ display: "block" }}
      />
      {showWordmark ? (
        <span
          className="font-display italic font-semibold tracking-tight text-ink-900"
          style={{ fontSize: `calc(${px}px * 0.95)`, lineHeight: 1 }}
        >
          {wordmark}
          {showDot ? (
            <span
              aria-hidden="true"
              className="ml-0.5 inline-block bg-coral-500 rounded-full"
              style={{
                width: `calc(${px}px * 0.18)`,
                height: `calc(${px}px * 0.18)`,
                verticalAlign: "calc(${px}px * 0.18)",
              }}
            />
          ) : null}
        </span>
      ) : null}
    </span>
  );
}

/**
 * LogoCompare — side-by-side comparison of all three candidate marks.
 * Used on the /styleguide and a logo-decision page.
 */
export function LogoCompare() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {(["1", "2", "3"] as LogoMark[]).map((m) => (
        <div
          key={m}
          className="card-surface flex flex-col items-center text-center"
        >
          <div className="bg-paper-50 rounded-xl border border-paper-200 w-full py-10 flex items-center justify-center">
            <Logo mark={m} size="lg" />
          </div>
          <p className="mt-4 text-eyebrow text-ink-600">Candidate {m.toUpperCase()}</p>
          <p className="mt-1 text-body-sm text-ink-700">
            {m === "1"
              ? "Eucalyptus Mark — clean sprig silhouette, EU 500 base."
              : m === "2"
                ? "The Headland — single-line headland silhouette (brief’s primary pick)."
                : "Surf Wave — three-line wave silhouette, falls back if Albert prefers a more wave-led mark."}
          </p>
        </div>
      ))}
    </div>
  );
}
