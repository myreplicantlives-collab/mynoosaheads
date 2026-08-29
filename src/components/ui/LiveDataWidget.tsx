/**
 * LiveDataWidget — placeholder slot for Sprint 2/3 data feeds.
 *
 * Per Albert's brief, live data is first-class on every page (surf, wind,
 * tide, UV, sun-moon, park alerts, webcams). Sprint 1.2 ships the
 * presentation + accessibility shell; Sprint 1.3 (TSK-2957-03) wires the
 * real data feeds (BOM marine, Open-Meteo, QPWS alerts).
 *
 * Each widget exposes:
 *   - kind      : "surf" | "wind" | "tide" | "uv" | "sun-moon" | "alerts" | "webcam"
 *   - state     : "fresh" | "stale" | "unavailable"
 *   - title     : short caption (e.g. "Surf — First Bay")
 *   - value     : primary metric (e.g. "1.4 m")
 *   - secondary : supporting metric (e.g. "period 9 s, SSE")
 *   - source    : attribution (e.g. "BOM Southeast Coast")
 *   - asOf      : ISO timestamp of last refresh
 *   - on        : load this widget lazily? (true once data lands)
 */

import type { ReactNode } from "react";
import { Icons } from "./Icon";

export type LiveDataKind =
  | "surf"
  | "wind"
  | "tide"
  | "uv"
  | "sun-moon"
  | "alerts"
  | "webcam";

export type LiveDataState = "fresh" | "stale" | "unavailable";

export type LiveDataWidgetProps = {
  kind: LiveDataKind;
  title: string;
  value?: string;
  secondary?: string;
  source?: string;
  asOf?: string;
  state?: LiveDataState;
  href?: string;
  /** Render an explicit slot for the upcoming data-feed integration. */
  upcomingSlot?: ReactNode;
};

const KIND_ICON: Record<LiveDataKind, ReactNode> = {
  surf: <Icons.Wave size={18} />,
  wind: <Icons.WindArrow size={18} />,
  tide: <Icons.TideArrow size={18} />,
  uv: <Icons.Sun size={18} />,
  "sun-moon": <Icons.Moon size={18} />,
  alerts: <Icons.Alert size={18} />,
  webcam: <Icons.Camera size={18} />,
};

const STATE_CLASS: Record<LiveDataState, string> = {
  fresh: "border-rainforest-300 bg-rainforest-50/50 text-ink-900",
  stale: "border-paper-300 bg-paper-50 text-ink-700",
  unavailable: "border-ocean-300 bg-ocean-50/50 text-ink-800",
};

const STATE_BADGE: Record<LiveDataState, { text: string; cls: string }> = {
  fresh: { text: "Live", cls: "chip-rainforest" },
  stale: { text: "Stale", cls: "chip" },
  unavailable: { text: "Unavailable", cls: "chip-ocean" },
};

export function LiveDataWidget({
  kind,
  title,
  value,
  secondary,
  source,
  asOf,
  state = "fresh",
  href,
  upcomingSlot,
}: LiveDataWidgetProps) {
  const badge = STATE_BADGE[state];
  const Wrapper = href ? "a" : "div";
  const wrapperProps = href
    ? {
        href,
        className:
          "block group focus:outline-none focus-visible:ring-2 focus-visible:ring-ocean-500 rounded-xl",
      }
    : { className: "block" };

  return (
    <Wrapper {...(wrapperProps as object)}>
      <article
        className={[
          "rounded-xl border p-4 transition shadow-sm",
          STATE_CLASS[state],
          href ? "group-hover:shadow-md" : "",
        ].join(" ")}
        aria-label={`${title} live data widget`}
      >
        <header className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="text-eucalyptus-600" aria-hidden="true">
              {KIND_ICON[kind]}
            </span>
            <span className="text-eyebrow text-ink-600">{title}</span>
          </div>
          <span className={badge.cls}>
            <span
              className={[
                "inline-block h-1.5 w-1.5 rounded-full",
                state === "fresh"
                  ? "bg-rainforest-500"
                  : state === "stale"
                    ? "bg-paper-500"
                    : "bg-ocean-500",
              ].join(" ")}
              aria-hidden="true"
            />
            {badge.text}
          </span>
        </header>

        <div className="mt-3">
          {value ? (
            <p className="font-display text-display-sm text-ink-900 text-balance">
              {value}
            </p>
          ) : (
            <p className="font-display text-display-sm text-ink-500 text-balance italic">
              awaiting feed
            </p>
          )}
          {secondary ? (
            <p className="mt-1 text-body-sm text-ink-700">{secondary}</p>
          ) : null}
        </div>

        {upcomingSlot ? (
          <div className="mt-3 text-caption text-ink-500">
            {upcomingSlot}
          </div>
        ) : null}

        {(source || asOf) && (
          <footer className="mt-3 flex items-center justify-between gap-2 text-caption text-ink-500">
            {source ? <span>{source}</span> : <span />}
            {asOf ? (
              <time dateTime={asOf}>as of {asOf}</time>
            ) : null}
          </footer>
        )}
      </article>
    </Wrapper>
  );
}

/**
 * LiveDataGrid — responsive 3×2 grid (stacked mobile) for surf/wind/tide/UV/etc.
 */
export function LiveDataGrid({ children }: { children: ReactNode }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
      {children}
    </div>
  );
}
