/**
 * Logo — MyNoosaHeads brand mark + wordmark.
 *
 * FINAL PICK (MSN-2957-LOGO-PICK, Albert 2026-08-27):
 *   mark = "2" (The Headland) — single-line Noosa Headland silhouette
 *   with the lighthouse nub and a single Sunset Coral dot accent.
 *
 * Rationale (per design brief §1, MSN-2956-01):
 *   - The headland IS the most identifiable Noosa landmark — local,
 *     not generic, distinct from the AU-coastal-set wave-mark saturation.
 *   - Two-tone Eucalyptus Green (#2C4A3E / #A6C2AF) gives depth at large
 *     sizes while collapsing to a single-ink silhouette at favicon scale.
 *   - Lighthouse nub adds a story beat without harming small-size legibility.
 *   - Wave candidate was explicitly dropped in the brief (wave-mark
 *     saturation) and reintroduces #1D5A6F ocean blue — outside our
 *     paper/eucalyptus/coral palette and re-tropicalising the register.
 *   - Eucalyptus sprig (mark 1) is calm but generic — could be any
 *     wellness/tea brand; doesn't anchor Noosa.
 *
 * The three candidates are still available for the /styleguide comparison,
 * but mark="2" is the canonical brand mark going forward.
 *
 * File paths:
 *   /public/brand/logo-1.svg (eucalyptus sprig — fallback)
 *   /public/brand/logo-2.svg (headland — FINAL)
 *   /public/brand/logo-3.svg (wave — dropped per brief)
 *
 * Note: the full SVG files in /public/brand/ are the source of truth.
 * Components below render those SVGs via <img src> so there is no
 * markup drift between mocks and shipped components.
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
                verticalAlign: `calc(${px}px * 0.18)`,
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
 * Used on the /styleguide. Candidate 2 is marked as the FINAL PICK per
 * MSN-2957-LOGO-PICK (Albert, 2026-08-27). The other two remain for
 * historical reference; they are NOT used in production.
 */
export function LogoCompare() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {(["1", "2", "3"] as LogoMark[]).map((m) => {
        const isFinal = m === "2";
        return (
          <div
            key={m}
            className={[
              "card-surface flex flex-col items-center text-center",
              isFinal ? "ring-2 ring-coral-500 ring-offset-2 ring-offset-paper-50" : "",
            ].join(" ")}
          >
            <div className="bg-paper-50 rounded-xl border border-paper-200 w-full py-10 flex items-center justify-center">
              <Logo mark={m} size="lg" />
            </div>
            <p className="mt-4 text-eyebrow text-ink-600">
              Candidate {m.toUpperCase()}
              {isFinal ? (
                <span className="ml-2 inline-block align-middle bg-coral-500 text-paper-50 text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded-full">
                  Final pick
                </span>
              ) : null}
            </p>
            <p className="mt-1 text-body-sm text-ink-700">
              {m === "1"
                ? "Eucalyptus Mark — clean sprig silhouette, EU 500 base. Generic botanical — doesn't anchor Noosa."
                : m === "2"
                  ? "The Headland — single-line headland silhouette with lighthouse nub. Noosa-specific, scales 16 → 1920."
                  : "Surf Wave — three-line wave silhouette. Dropped in brief — AU coastal set is saturated with wave marks."}
            </p>
          </div>
        );
      })}
    </div>
  );
}
