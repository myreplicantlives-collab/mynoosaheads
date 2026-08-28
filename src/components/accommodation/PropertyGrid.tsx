"use client";

/**
 * PropertyGrid — client-side filterable grid for the accommodation page
 * (MSN-2965).
 *
 * Why client: the area filter and "Booking engine" filter need state
 * for instant updates; the rest of the page remains server-rendered.
 *
 * Conversion tracking: every property CTA carries `data-track` so the
 * layout-level Plausible wrapper (see `src/app/layout.tsx`) fires a
 * custom event when the visitor clicks. The convention is:
 *
 *   data-track={`accommodation_${engine}_${areaId}_${propSlug}`}
 *
 * where engine ∈ {booking,stayz,expedia,airbnb,direct}.
 */

import { useMemo, useState } from "react";
import Link from "next/link";
import { Icons } from "@/components/ui";
import type { Area, AreaId, BookingEngine, Property } from "@/data/accommodation";

type Props = {
  areas: Area[];
};

type Filter = "all" | AreaId;

const ENGINE_LABEL: Record<BookingEngine, string> = {
  booking: "Booking.com",
  stayz: "Stayz",
  expedia: "Expedia",
  airbnb: "Airbnb",
  direct: "Direct",
};

function priceBandTone(band: Property["priceBand"]): string {
  switch (band) {
    case "Budget":
      return "bg-eucalyptus-50 text-eucalyptus-800";
    case "Mid":
      return "bg-ocean-50 text-ocean-900";
    case "Upper mid":
      return "bg-paper-200 text-ink-800";
    case "Luxury":
      return "bg-amber-50 text-amber-900";
  }
}

function propSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/['']/g, "")
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_|_$/g, "");
}

export function PropertyGrid({ areas }: Props) {
  const [filter, setFilter] = useState<Filter>("all");
  const [engineFilter, setEngineFilter] = useState<"all" | BookingEngine>("all");

  const allProperties = useMemo(() => {
    return areas.flatMap((a) =>
      a.properties.map((p) => ({
        ...p,
        areaId: a.id,
        areaName: a.name,
        internalLinks: a.internalLinks,
        anchor: a.anchor,
      })),
    );
  }, [areas]);

  const filtered = useMemo(() => {
    return allProperties.filter(
      (p) =>
        (filter === "all" || p.areaId === filter) &&
        (engineFilter === "all" || p.engine === engineFilter),
    );
  }, [allProperties, filter, engineFilter]);

  return (
    <div>
      {/* ─── Filter bar ─── */}
      <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter by area">
          <button
            type="button"
            onClick={() => setFilter("all")}
            aria-pressed={filter === "all"}
            className={[
              "rounded-full border px-3 py-1.5 text-caption font-medium transition-colors",
              filter === "all"
                ? "border-eucalyptus-700 bg-eucalyptus-700 text-paper-50"
                : "border-paper-300 bg-paper-50 text-ink-700 hover:border-eucalyptus-500",
            ].join(" ")}
          >
            All areas
          </button>
          {areas.map((a) => (
            <button
              key={a.id}
              type="button"
              onClick={() => setFilter(a.id)}
              aria-pressed={filter === a.id}
              className={[
                "rounded-full border px-3 py-1.5 text-caption font-medium transition-colors",
                filter === a.id
                  ? "border-eucalyptus-700 bg-eucalyptus-700 text-paper-50"
                  : "border-paper-300 bg-paper-50 text-ink-700 hover:border-eucalyptus-500",
              ].join(" ")}
            >
              {a.name.split("&")[0].trim()}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter by booking engine">
          <button
            type="button"
            onClick={() => setEngineFilter("all")}
            aria-pressed={engineFilter === "all"}
            className={[
              "rounded-full border px-3 py-1.5 text-caption font-medium transition-colors",
              engineFilter === "all"
                ? "border-ocean-700 bg-ocean-700 text-paper-50"
                : "border-paper-300 bg-paper-50 text-ink-700 hover:border-ocean-500",
            ].join(" ")}
          >
            All booking engines
          </button>
          {(["booking", "stayz", "expedia", "airbnb", "direct"] as BookingEngine[]).map(
            (e) => (
              <button
                key={e}
                type="button"
                onClick={() => setEngineFilter(e)}
                aria-pressed={engineFilter === e}
                className={[
                  "rounded-full border px-3 py-1.5 text-caption font-medium transition-colors",
                  engineFilter === e
                    ? "border-ocean-700 bg-ocean-700 text-paper-50"
                    : "border-paper-300 bg-paper-50 text-ink-700 hover:border-ocean-500",
                ].join(" ")}
              >
                {ENGINE_LABEL[e]}
              </button>
            ),
          )}
        </div>
      </div>

      {/* ─── Result count ─── */}
      <p className="mb-4 text-caption text-ink-700">
        Showing <strong>{filtered.length}</strong> {filtered.length === 1 ? "property" : "properties"}
        {filter !== "all" ? ` in ${areas.find((a) => a.id === filter)?.name}` : ""}
        {engineFilter !== "all" ? ` on ${ENGINE_LABEL[engineFilter]}` : ""}.
      </p>

      {/* ─── Grid ─── */}
      <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((p) => (
          <li
            key={`${p.areaId}-${propSlug(p.name)}`}
            className="card h-full"
            id={`prop-${propSlug(p.name)}`}
          >
            <div className="card-body flex h-full flex-col">
              <div className="flex items-start justify-between gap-2">
                <p className="eyebrow">{p.areaName}</p>
                <span
                  className={[
                    "shrink-0 rounded-full px-2 py-0.5 text-caption font-medium",
                    priceBandTone(p.priceBand),
                  ].join(" ")}
                  title="Indicative AU$ price band"
                >
                  {p.priceBand}
                </span>
              </div>
              <h3 className="mt-2 font-display text-headline-lg text-ink-900">
                {p.name}
              </h3>
              <p className="mt-1 text-body-sm text-ink-700">{p.descriptor}</p>
              <p className="mt-3 text-body-sm text-ink-800 text-pretty">{p.rationale}</p>
              <div className="mt-4 flex flex-wrap items-center gap-2 text-caption text-ink-700">
                <span className="rounded bg-paper-100 px-2 py-0.5 text-ink-800">
                  {p.type}
                </span>
                <span aria-hidden="true">·</span>
                <span>via {ENGINE_LABEL[p.engine]}</span>
                {!p.verified ? (
                  <span
                    className="rounded bg-paper-100 px-2 py-0.5 text-ink-700"
                    title="We list this property name but have not verified the operator link. Click goes to an area-wide engine search."
                  >
                    Listing pending verification
                  </span>
                ) : null}
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                <a
                  href={p.bookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-track={`accommodation_${p.engine}_${p.areaId}_${propSlug(p.name)}`}
                  className="btn-primary btn-sm"
                >
                  Check availability
                  <Icons.External size={12} />
                </a>
                <Link
                  href={`#area-${p.areaId}` as `#${string}`}
                  className="btn-outline btn-sm"
                  data-track={`accommodation_area_link_${p.areaId}`}
                >
                  About {p.areaName.split("&")[0].trim()}
                </Link>
              </div>
            </div>
          </li>
        ))}
      </ul>

      {filtered.length === 0 ? (
        <p className="mt-8 text-center text-body-sm text-ink-700">
          No properties match the current filter. Try a wider filter above.
        </p>
      ) : null}
    </div>
  );
}
