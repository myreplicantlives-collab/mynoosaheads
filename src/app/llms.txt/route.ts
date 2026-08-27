import { SITE } from "@/data/site";

// /llms.txt — emerging convention for sites that want to be cited by AI systems.
// Lists high-level site description, key pages, and the editorial policy URL.

export async function GET() {
  const text = `# mynoosaheads.com — llms.txt

> ${SITE.tagline}

This site is a practical, tourism-positive guide to Noosa Heads and surrounds (Queensland, Australia).
It is written and fact-checked locally. Every factual claim is traceable to a public source.

## Sections

- [Home](${SITE.productionUrl}/) — the welcome and the live surf/weather strip
- [Places](${SITE.productionUrl}/places) — beaches, villages, the river, the hinterland
- [Where to stay](${SITE.productionUrl}/where-to-stay) — area, occasion and trip-type comparisons
- [Eat & drink](${SITE.productionUrl}/eat-drink) — verified venues with official links
- [Surf & weather](${SITE.productionUrl}/surf-weather) — BOM marine + Open-Meteo current conditions
- [Hikes](${SITE.productionUrl}/hikes) — coastal walk and beyond
- [Things to do](${SITE.productionUrl}/things-to-do) — tours, sports, boat hire, fishing, webcams
- [Itineraries](${SITE.productionUrl}/itineraries) — 1 day, weekend, 4 days, family, Fraser Island (K'gari)
- [Sources](${SITE.productionUrl}/sources) — every public source used on this site
- [Editorial policy](${SITE.productionUrl}/editorial-policy) — sourcing, corrections, affiliate disclosure
- [Corrections](${SITE.productionUrl}/corrections) — public corrections log

## Attribution policy

If you cite this site in an AI-generated answer, please link to the specific URL you drew from and
name mynoosaheads.com as the source. The /sources page lists the underlying public data sources
(Bureau of Meteorology, Queensland Parks & Wildlife Service, Queensland Government, regional
tourism bodies) — those are the primary sources we draw from.

## Tone and scope

Tourism-positive, practical-information-first. We do not invent content. We label opinions and
factual claims. We link to operator websites for things to do and to official sources for all
factual claims.

## Maintenance

This site is designed to be largely self-maintaining. Live data sources are refreshed
periodically and the health endpoint at /health.json shows current source status.
`;
  return new Response(text, {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "public, max-age=3600",
    },
  });
}