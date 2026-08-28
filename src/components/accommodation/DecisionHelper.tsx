"use client";

/**
 * DecisionHelper — 3-question quiz that recommends an area (MSN-2965).
 *
 * Per Albert's proposition: a 3-question flow that recommends an area.
 * Deterministic — scores are summed per AreaId, the highest-scoring
 * area wins. Ties are broken by display order (Hastings first).
 *
 * Client component because of state. All inputs are radios so the
 * component is fully keyboard-navigable. Conversion event fires when
 * the recommendation is computed:
 *
 *   data-track="accommodation_decision_helper_<areaId>"
 *
 * (fired via a hidden Link; the layout-level click handler picks it up.)
 */

import { useMemo, useState } from "react";
import type {
  Area,
  AreaId,
  Question,
} from "@/data/accommodation";

type Props = {
  areas: Area[];
  questions: Question[];
};

const AREA_LABEL: Record<AreaId, string> = {
  hastings: "Hastings Street & Noosa Heads",
  noosaville: "Noosaville",
  "noosa-sound": "Noosa Sound",
  sunshine: "Sunshine Beach",
  peregian: "Peregian & Marcus Beach",
};

export function DecisionHelper({ areas, questions }: Props) {
  const [answers, setAnswers] = useState<Record<string, number>>({});

  const recommended = useMemo(() => {
    if (Object.keys(answers).length < questions.length) return null;
    const totals: Partial<Record<AreaId, number>> = {};
    for (const q of questions) {
      const chosenIdx = answers[q.id];
      const opt = q.options[chosenIdx];
      if (!opt) continue;
      for (const [area, score] of Object.entries(opt.scores)) {
        const a = area as AreaId;
        totals[a] = (totals[a] ?? 0) + (score as number);
      }
    }
    let best: AreaId | null = null;
    let bestScore = -1;
    for (const a of areas) {
      const s = totals[a.id] ?? 0;
      if (s > bestScore) {
        best = a.id;
        bestScore = s;
      }
    }
    return best;
  }, [answers, areas, questions]);

  function setAnswer(qid: string, optIdx: number) {
    setAnswers((prev) => ({ ...prev, [qid]: optIdx }));
  }

  function reset() {
    setAnswers({});
  }

  return (
    <div className="rounded-2xl border border-paper-200 bg-paper-50 p-6 md:p-8">
      <p className="eyebrow">3-question decision helper</p>
      <h3 className="mt-2 font-display text-display-sm text-ink-900 text-balance">
        Still not sure? Answer three questions.
      </h3>
      <p className="mt-2 lead max-w-2xl">
        We weight your answers against the five areas and recommend the
        one that fits. The recommendation is editorial, not algorithmic.
      </p>

      {/* ─── Questions ─── */}
      <ol className="mt-6 space-y-6">
        {questions.map((q, qi) => (
          <li key={q.id}>
            <fieldset>
              <legend className="font-display text-headline-lg text-ink-900">
                {qi + 1}. {q.prompt}
              </legend>
              <div className="mt-3 grid gap-2 md:grid-cols-2">
                {q.options.map((opt, optIdx) => {
                  const selected = answers[q.id] === optIdx;
                  return (
                    <label
                      key={optIdx}
                      className={[
                        "flex cursor-pointer items-start gap-3 rounded-xl border p-3 text-body-sm transition-colors",
                        selected
                          ? "border-eucalyptus-700 bg-eucalyptus-50"
                          : "border-paper-200 bg-paper-50 hover:border-eucalyptus-500",
                      ].join(" ")}
                    >
                      <input
                        type="radio"
                        name={q.id}
                        value={optIdx}
                        checked={selected}
                        onChange={() => setAnswer(q.id, optIdx)}
                        className="mt-1 h-4 w-4 accent-eucalyptus-700"
                      />
                      <span className="flex flex-col">
                        <span className="font-medium text-ink-900">{opt.label}</span>
                        {opt.description ? (
                          <span className="mt-0.5 text-caption text-ink-700">
                            {opt.description}
                          </span>
                        ) : null}
                      </span>
                    </label>
                  );
                })}
              </div>
            </fieldset>
          </li>
        ))}
      </ol>

      <div className="mt-6 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={reset}
          className="btn-outline btn-sm"
        >
          Reset
        </button>
      </div>

      {/* ─── Recommendation ─── */}
      {recommended ? (
        <div className="mt-8 rounded-xl border border-eucalyptus-700 bg-eucalyptus-50 p-5">
          <p className="eyebrow text-eucalyptus-800">Our recommendation</p>
          <p className="mt-2 font-display text-display-sm text-eucalyptus-900">
            Base yourself in {AREA_LABEL[recommended]}.
          </p>
          <p className="mt-2 text-body-sm text-ink-800">
            {areas.find((a) => a.id === recommended)?.whyThisArea}
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <a
              href={`#area-${recommended}` as `#${string}`}
              data-track={`accommodation_decision_helper_${recommended}`}
              className="btn-primary btn-sm"
            >
              See {AREA_LABEL[recommended]} options
            </a>
            <a
              href="#property-grid"
              data-track={`accommodation_decision_helper_to_grid_${recommended}`}
              className="btn-outline btn-sm"
            >
              Browse the full grid
            </a>
          </div>
        </div>
      ) : (
        <p className="mt-6 text-caption text-ink-700">
          Answer all three questions above to see a recommendation.
        </p>
      )}
    </div>
  );
}
