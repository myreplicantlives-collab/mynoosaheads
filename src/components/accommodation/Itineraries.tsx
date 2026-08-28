/**
 * Itineraries — 3-day / 5-day / 7-day suggestions (MSN-2965).
 *
 * Server-rendered. Each itinerary is a tablist of nights; the active
 * itinerary is expanded. Kept readable as both tabs and a stacked list
 * on mobile.
 *
 * Client island because of active-tab state. Each "go to area" link
 * fires `data-track="accommodation_itinerary_<itineraryId>_<night>_<areaId>"`
 * for funnel analytics.
 */

"use client";

import { useState } from "react";
import type { Area, AreaId, Itinerary } from "@/data/accommodation";

type Props = {
  itineraries: Itinerary[];
  areas: Area[];
};

const AREA_NAME: Record<AreaId, string> = {
  hastings: "Hastings Street",
  noosaville: "Noosaville",
  "noosa-sound": "Noosa Sound",
  sunshine: "Sunshine Beach",
  peregian: "Peregian",
};

export function Itineraries({ itineraries, areas }: Props) {
  const [activeId, setActiveId] = useState<Itinerary["id"]>(itineraries[0].id);
  const active = itineraries.find((i) => i.id === activeId) ?? itineraries[0];

  return (
    <div>
      {/* ─── Tabs ─── */}
      <div className="flex flex-wrap gap-2" role="tablist" aria-label="Itinerary length">
        {itineraries.map((i) => (
          <button
            key={i.id}
            type="button"
            onClick={() => setActiveId(i.id)}
            aria-pressed={activeId === i.id}
            className={[
              "rounded-full border px-4 py-2 text-body-sm font-medium transition-colors",
              activeId === i.id
                ? "border-eucalyptus-700 bg-eucalyptus-700 text-paper-50"
                : "border-paper-300 bg-paper-50 text-ink-700 hover:border-eucalyptus-500",
            ].join(" ")}
          >
            {i.title}
          </button>
        ))}
      </div>

      {/* ─── Active itinerary ─── */}
      <div className="mt-6 rounded-2xl border border-paper-200 bg-paper-50 p-6 md:p-8">
        <p className="eyebrow">Why this shape</p>
        <p className="mt-2 lead max-w-3xl">{active.description}</p>
        <p className="mt-2 text-caption text-ink-700">
          Best for: <strong>{active.bestFor}</strong>
        </p>

        <ol className="mt-8 space-y-4">
          {active.nights.map((n) => {
            const area = areas.find((a) => a.id === n.areaId);
            if (!area) return null;
            return (
              <li
                key={n.night}
                className="flex flex-col gap-2 rounded-xl border border-paper-200 bg-paper-50 p-4 md:flex-row md:items-start md:gap-4"
              >
                <div className="md:w-24 shrink-0">
                  <p className="font-display text-headline-lg text-eucalyptus-700">
                    Night {n.night}
                  </p>
                  <a
                    href={`#${area.anchor}` as `#${string}`}
                    className="mt-1 text-body-sm font-medium text-ocean-700 underline-offset-2 hover:underline"
                    data-track={`accommodation_itinerary_${active.id}_${n.night}_${n.areaId}`}
                  >
                    {AREA_NAME[n.areaId]}
                  </a>
                </div>
                <p className="text-body-sm text-ink-800 text-pretty">{n.rationale}</p>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}
