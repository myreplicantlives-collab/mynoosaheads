/**
 * AreaComparison — fit-matrix for the 5 areas (MSN-2965).
 *
 * Server-rendered. Albert's proposition §"Page structure" — a small
 * grid showing ★ = strong fit for that trip profile.
 */

import type { Area } from "@/data/accommodation";

type Props = {
  areas: Area[];
};

const PROFILES: { key: keyof Area["matrix"]; label: string }[] = [
  { key: "beachfront", label: "Beachfront" },
  { key: "family", label: "Family" },
  { key: "luxury", label: "Luxury" },
  { key: "budget", label: "Budget" },
  { key: "longStay", label: "Long stay" },
  { key: "surfAccess", label: "Surf access" },
];

function Glyph(value: 0 | 1 | 2) {
  if (value >= 2) {
    return (
      <span aria-label="strong fit" className="text-eucalyptus-700">
        ★★
      </span>
    );
  }
  if (value === 1) {
    return (
      <span aria-label="partial fit" className="text-amber-700">
        ★
      </span>
    );
  }
  return (
    <span aria-label="not the call" className="text-ink-400">
      —
    </span>
  );
}

export function AreaComparison({ areas }: Props) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[640px] table-fixed border-collapse">
        <caption className="sr-only">
          Area fit matrix — two stars is a strong fit, one star is a
          partial fit, an em-dash is not the call.
        </caption>
        <thead>
          <tr className="border-b-2 border-ink-900">
            <th scope="col" className="py-3 pr-3 text-left font-display text-body-sm text-ink-900">
              Area
            </th>
            {PROFILES.map((p) => (
              <th
                key={p.key}
                scope="col"
                className="px-2 py-3 text-left font-display text-body-sm text-ink-900"
              >
                {p.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {areas.map((a) => (
            <tr key={a.id} className="border-b border-paper-200">
              <th scope="row" className="py-3 pr-3 text-left font-display text-body-sm text-ink-900">
                <a
                  href={`#${a.anchor}` as `#${string}`}
                  className="link text-ocean-700"
                  data-track={`accommodation_matrix_link_${a.id}`}
                >
                  {a.name}
                </a>
              </th>
              {PROFILES.map((p) => (
                <td key={p.key} className="px-2 py-3 text-body-sm text-ink-800">
                  {Glyph(a.matrix[p.key])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <p className="mt-3 text-caption text-ink-600">
        ★★ = strong fit · ★ = partial fit · — = not the call. Click an
        area name to jump to its detail.
      </p>
    </div>
  );
}
