import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/ui";
import { SITE } from "@/data/site";
import { VENUES, VENUES_BY_AREA } from "@/data/venues";
import { VERIFIED } from "@/data/photos-msn2982";

/**
 * /eat-and-drink — MSN-2982 chairman-mandated rework.
 *
 * KUBE pattern: hero → atmospheric intro → six venue cards (image +
 * label only — body copy lives on /eat-and-drink/[slug]) → by-precinct
 * list → cross-sell.
 *
 * Photography: every card uses the MSN-2982 verified photo set. No
 * off-topic Unsplash placeholders.
 *
 * No specific word budget — KUBE restraint applies.
 */

export const metadata: Metadata = {
  title: "Where to eat in Noosa",
  description:
    "Three anchor venues across Hastings Street, Noosaville, and Peregian Beach.",
  alternates: { canonical: "/eat-and-drink" },
};

function photoFor(slug: string): { path: string; caption: string } {
  if (slug.includes("aroma")) return { path: VERIFIED.cards.aromaHastings.path, caption: VERIFIED.cards.aromaHastings.caption };
  if (slug.includes("riverdeck")) return { path: VERIFIED.cards.morningRiver.path, caption: VERIFIED.cards.morningRiver.caption };
  if (slug.includes("peregian")) return { path: VERIFIED.cards.hastingsStreetEast.path, caption: VERIFIED.cards.hastingsStreetEast.caption };
  return { path: VERIFIED.cards.hastingsStreetEast.path, caption: VERIFIED.cards.hastingsStreetEast.caption };
}

export default function EatAndDrinkPage() {
  return (
    <div className="bg-paper-50">
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "FoodEstablishment",
            "@id": `${SITE.productionUrl}/eat-and-drink#directory`,
            name: "Eat & drink in Noosa",
            description:
              "Three anchor venues across Hastings Street, Noosaville, and Peregian Beach.",
            url: `${SITE.productionUrl}/eat-and-drink`,
            address: {
              "@type": "PostalAddress",
              addressRegion: "Queensland",
              addressCountry: "AU",
              addressLocality: "Noosa Heads",
            },
          },
        ]}
      />

      {/* ─── 1. Hero — Aroma, Hastings Street (verified Noosa photograph) ─── */}
      <section
        aria-label="Eat and drink in Noosa"
        className="relative w-full overflow-hidden bg-ink-900 h-[80vh] min-h-[560px] max-h-[1000px]"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={VERIFIED.cards.aromaHastings.path}
          alt={VERIFIED.cards.aromaHastings.caption}
          decoding="async"
          fetchPriority="high"
          className="absolute inset-0 h-full w-full object-cover object-[center_30%]"
        />
        <div
          className="absolute inset-0 bg-gradient-to-br from-ink-900/15 via-transparent to-ink-900/25"
          aria-hidden="true"
        />
        <div
          className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-ink-900/85 via-ink-900/40 to-transparent"
          aria-hidden="true"
        />
        <div className="relative h-full w-full">
          <div className="container-page h-full flex flex-col justify-end pb-16 md:pb-24">
            <p className="eyebrow text-paper-300">EAT &amp; DRINK</p>
            <h1
              className="mt-3 font-display text-display-xl md:text-display-xl text-paper-50 text-balance max-w-4xl"
              style={{ textShadow: "0 2px 24px rgba(11,28,28,0.45)" }}
            >
              Where Noosa eats.
            </h1>
            <p className="mt-4 lead text-paper-200 max-w-3xl text-pretty">
              Six anchor venues across the three precincts.
            </p>
          </div>
        </div>
      </section>

      {/* ─── 2. Atmospheric intro ─── */}
      <section
        className="border-y border-paper-200 bg-paper-100"
        aria-labelledby="eat-intro-heading"
      >
        <div className="container-page py-12 md:py-16">
          <p className="eyebrow">Three venues · three precincts</p>
          <h2
            id="eat-intro-heading"
            className="mt-3 font-display text-display-md md:text-display-lg text-ink-900 text-balance max-w-3xl"
          >
            Hastings morning coffee, Noosaville river-edge, Peregian village-square — six anchor venues across three precincts.
          </h2>
          <p className="mt-5 lead max-w-2xl text-pretty">
            Each card opens the operator&apos;s reservation page.
          </p>
        </div>
      </section>

      {/* ─── 3. Three anchor venue cards (image + label only) ─── */}
      <section
        className="container-page py-14 md:py-20"
        aria-labelledby="eat-venues-heading"
      >
        <h2 id="eat-venues-heading" className="sr-only">Anchor venues</h2>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {VENUES.map((v) => {
            const photo = photoFor(v.slug);
            return (
              <Link
                key={v.slug}
                href={`/eat-and-drink/${v.slug}`}
                className="group relative block overflow-hidden rounded-xl aspect-[4/5] bg-ink-700"
                data-track={`eat_card_${v.slug}`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={photo.path}
                  alt={photo.caption}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-ink-900/85 via-ink-900/30 to-transparent"
                  aria-hidden="true"
                />
                <div className="relative h-full w-full p-5 md:p-6 flex flex-col justify-end">
                  <p className="text-body-sm uppercase tracking-wider text-paper-300">
                    {v.cuisine}
                  </p>
                  <h3 className="mt-1 font-display text-display-sm text-paper-50 text-balance">
                    {v.name}
                  </h3>
                  <p className="mt-1 text-body-sm text-paper-200 text-pretty">
                    {v.bestFor}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ─── 4. By-area index ─── */}
      <section className="bg-paper-100 border-y border-paper-200">
        <div className="container-page py-14 md:py-20 space-y-12">
          <h2 className="font-display text-display-md md:text-display-lg text-ink-900 text-balance">
            Hastings morning coffee, Noosaville river-edge, Peregian village-square.
          </h2>
          {([
            { id: "hastings", label: "Hastings Street", tagline: "Morning coffee and people-watching under the fig trees." },
            { id: "noosaville", label: "Noosaville", tagline: "River-edge long lunches and gardens on Gympie Terrace." },
            { id: "peregian", label: "Peregian Beach", tagline: "Village square, beer garden, ten minutes south." },
          ] as const).map((area) => {
            const venuesInArea = VENUES_BY_AREA[area.id] ?? [];
            if (venuesInArea.length === 0) return null;
            return (
              <div key={area.id} id={area.id}>
                <p className="eyebrow">{area.label}</p>
                <h3 className="mt-2 font-display text-display-sm text-ink-900 text-balance">
                  {area.tagline}
                </h3>
                <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {venuesInArea.map((v) => (
                    <li key={v.slug}>
                      <Link
                        href={`/eat-and-drink/${v.slug}`}
                        className="group flex items-center gap-4 rounded-lg bg-paper-50 p-4 ring-1 ring-paper-200 hover:ring-ocean-300 transition"
                        data-track={`eat_byarea_${v.slug}`}
                      >
                        <span className="font-display text-headline-md text-eucalyptus-700 shrink-0 w-10 text-right">
                          {String(venuesInArea.indexOf(v) + 1).padStart(2, "0")}
                        </span>
                        <span className="flex-1">
                          <span className="block font-display text-headline-sm text-ink-900 text-balance">
                            {v.name}
                          </span>
                          <span className="block text-body-sm text-ink-700 mt-0.5">
                            {v.cuisine} · {v.bestFor}
                          </span>
                        </span>
                        <span aria-hidden="true" className="text-ink-700 group-hover:text-ocean-800 transition">
                          →
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </section>

      {/* ─── 5. Cross-sell row ─── */}
      <section className="container-page py-14 md:py-20">
        <h2 className="font-display text-display-sm md:text-display-md text-ink-900 text-balance">
          Pair dinner with the day.
        </h2>
        <div className="mt-8 grid gap-5 sm:grid-cols-3">
          {[
            { href: "/things-to-do/spend-a-day-on-the-river", title: "Day on the river", body: "Calm water, ferry rides." },
            { href: "/noosa-national-park", title: "Headland at sunset", body: "Granite, tallowwoods, koalas." },
            { href: "/surf-and-weather", title: "Today in Noosa", body: "Live surf, weather, UV." },
          ].map((c) => (
            <Link
              key={c.href}
              href={c.href}
              className="group block rounded-lg bg-paper-50 p-5 ring-1 ring-paper-200 hover:ring-ocean-300 transition"
              data-track={`eat_xsell_${c.href.split("/").pop()}`}
            >
              <p className="eyebrow">Pair with</p>
              <h3 className="mt-2 font-display text-headline-md text-ink-900 text-balance">
                {c.title}
              </h3>
              <p className="mt-1 text-body-sm text-ink-700 text-pretty">{c.body}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
