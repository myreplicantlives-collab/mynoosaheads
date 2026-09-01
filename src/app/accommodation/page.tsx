import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/ui";
import { SITE } from "@/data/site";
import { ACCOMMODATION_DATA, CURATED_PROPERTIES } from "@/data/accommodation";
import { VERIFIED } from "@/data/photos-msn2982";
import { AffiliateBadge } from "@/components/ui/AffiliateBadge";
import {
  buildPartnerLink,
  isAffiliateCommercial,
  type ProgrammeId,
} from "@/lib/affiliates";

/**
 * /accommodation — MSN-2985 V2 release correction pass.
 *
 * Per chairman mandate 2026-08-29:
 *   - Property grid: 10 → 3 (Netanya, South Pacific, Sunshine Beach)
 *   - Area grid: 5 → 4 (Hastings, Noosaville, Sunshine, Peregian)
 *     — Noosa Sound removed for lack of a verified Noosa-Sound photo
 *   - H2 cuts: "By area." → "Hastings for the beach. Noosaville for
 *     the river. Sunshine for the surf."; "The ten." → "Three we
 *     can verify."; "Practical." → "A few things worth knowing."
 *   - Removed: "Booking engine: We do not take inventory..." +
 *     "Disclosure: ... ACCC Schedule 2 statement." (methodology/
 *     compliance language; footer + legal pages carry the ACCC
 *     statement; CTA disclosure on /stay/[slug] per ACCC Sch 2)
 *   - Each property card: image + label + descriptor (≤18 words)
 *   - Each card links to operator-direct URL or property-name
 *     search (no generic Noosa searches)
 *
 * KUBE progression: hero → atmospheric intro → area cards →
 * property cards → practical info.
 *
 * Word budget: 350 words.
 */

export const metadata: Metadata = {
  title: "Where to stay in Noosa",
  description:
    "Three verified properties across four Noosa areas — direct booking links to operators.",
  alternates: { canonical: "/accommodation" },
};

// MSN-3057 (Workstream 1): centralise booking-engine configuration.
// Every outbound commercial link is now routed through
// `buildPartnerLink()` in src/lib/affiliates.ts so the partner ID,
// placement label and disclosure gate live in one place.
//
// Until a programme is `enabled && verified` in src/lib/affiliates.ts,
// `buildPartnerLink` returns an untracked URL and `isAffiliateCommercial`
// returns false — so the AffiliateBadge will NOT render, even on
// routes that previously declared themselves as "affiliate". This is
// per the MSN-2964 directive B: do not claim affiliate participation
// until it is verified.
//
// `rel="sponsored"` is now gated on `isAffiliateCommercial(programme)`,
// not on a hardcoded map. Operator-direct URLs keep `rel="noopener"`.
//
// MSN-3044 — Item 6.5 fix preserved: property-name searches (never
// generic homepage links) when no operator-direct URL exists.
type PropertyLink = {
  url: string;
  programme: ProgrammeId | "operator-direct";
  label: string;
};

const PROPERTY_LINKS: Record<string, PropertyLink> = {
  "Netanya Noosa": {
    url: "https://www.netanyanoosa.com.au/",
    programme: "operator-direct",
    label: "Book direct with Netanya Noosa",
  },
  "South Pacific Resort & Spa Noosa": {
    url: "https://www.southpacificresort.com.au/",
    programme: "operator-direct",
    label: "Book direct with South Pacific Resort & Spa Noosa",
  },
  "Sunshine Beach Resort": {
    url: "https://www.booking.com/searchresults.html?ss=Sunshine+Beach+Resort+Noosa",
    programme: "booking",
    label: "Check availability on Booking.com",
  },
  "Noosa-area holiday houses": {
    url: "https://www.stayz.com.au/holiday-rental-search?query=Noosa+Heads+holiday+house+pet+friendly",
    programme: "stayz",
    label: "Browse holiday houses on Stayz",
  },
};

function propertyHref(name: string): string {
  const link = PROPERTY_LINKS[name];
  if (!link) {
    // Safe fallback — never produce a broken URL. Plain search, untracked.
    return buildPartnerLink(
      "booking",
      "https://www.booking.com/searchresults.html?ss=Noosa+Heads",
      `accommodation-${name.toLowerCase().replace(/\s+/g, "-")}`,
    );
  }
  if (link.programme === "operator-direct") {
    return link.url;
  }
  return buildPartnerLink(
    link.programme,
    link.url,
    `accommodation-${name.toLowerCase().replace(/\s+/g, "-")}`,
  );
}

/** ProgrammeId → display name for the AffiliateBadge label. */
function programmeToDisplay(programme: ProgrammeId): string {
  switch (programme) {
    case "booking":
      return "Booking.com";
    case "stayz":
      return "Stayz";
    case "expedia":
      return "Expedia";
    case "airbnb":
      return "Airbnb";
    case "getyourguide":
      return "GetYourGuide";
    case "viator":
      return "Viator";
    case "klook":
      return "Klook";
  }
}

// Per-property card photos — only KEEP-listed verified photos
// (per MSN-2985 PHOTO_AUDIT.md).
const PHOTO_BY_PROPERTY: Record<string, { path: string; caption: string }> = {
  "Netanya Noosa": { path: VERIFIED.cards.netanyaApartments.path, caption: VERIFIED.cards.netanyaApartments.caption },
  "South Pacific Resort & Spa Noosa": { path: VERIFIED.cards.southPacificResort.path, caption: VERIFIED.cards.southPacificResort.caption },
  "Sunshine Beach Resort": { path: VERIFIED.cards.sunshineBeach.path, caption: VERIFIED.cards.sunshineBeach.caption },
  "Noosa-area holiday houses": { path: VERIFIED.cards.hastingsStreetWest.path, caption: VERIFIED.cards.hastingsStreetWest.caption },
};

// Per-area card photos.
function photoForArea(areaId: string): { path: string; caption: string } {
  if (areaId === "hastings") return { path: VERIFIED.cards.hastingsStreetWest.path, caption: VERIFIED.cards.hastingsStreetWest.caption };
  return { path: VERIFIED.cards.noosaRiver.path, caption: VERIFIED.cards.noosaRiver.caption };
}

export default function AccommodationPage() {
  const { areas } = ACCOMMODATION_DATA;

  return (
    <div className="bg-paper-50">
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "TouristDestination",
            "@id": `${SITE.productionUrl}/accommodation#destination`,
            name: "Noosa Heads",
            description:
              "Three verified properties across four Noosa areas — Hastings Street, Noosaville, Sunshine Beach and Peregian.",
            url: `${SITE.productionUrl}/accommodation`,
            touristType: ["Family", "Couple", "Group", "Long-stay"],
            address: {
              "@type": "PostalAddress",
              addressRegion: "Queensland",
              addressCountry: "AU",
              addressLocality: "Noosa Heads",
            },
          },
        ]}
      />

      {/* ─── 1. Hero — Hastings Street looking west (verified) ─── */}
      <section
        aria-label="Accommodation in Noosa"
        className="relative w-full overflow-hidden bg-ink-900 h-[80vh] min-h-[560px] max-h-[1000px]"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/img/heroes/hastings-street-west-1920w.jpg"
          alt="Hastings Street, Noosa — looking west over Main Beach toward Noosa Woods."
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
            <p className="eyebrow text-paper-300">STAY</p>
            <h1
              className="mt-3 font-display text-display-xl md:text-display-xl text-paper-50 text-balance max-w-4xl"
              style={{ textShadow: "0 2px 24px rgba(11,28,28,0.45)" }}
            >
              Where to stay.
            </h1>
            <p className="mt-4 lead text-paper-200 max-w-3xl text-pretty">
              Three properties, four areas. Direct booking links.
            </p>
          </div>
        </div>
      </section>

      {/* ─── 2. Atmospheric intro ─── */}
      <section
        className="border-y border-paper-200 bg-paper-100"
        aria-labelledby="accomm-intro-heading"
      >
        <div className="container-page py-12 md:py-16">
          <p className="eyebrow">Three properties · four areas</p>
          <h2
            id="accomm-intro-heading"
            className="mt-3 font-display text-display-md md:text-display-lg text-ink-900 text-balance max-w-3xl"
          >
            Pick the precinct, then the property.
          </h2>
          <p className="mt-5 lead max-w-2xl text-pretty">
            Hastings Street for beachfront. Noosaville for the river.
            Sunshine for the surf. Peregian for the village. Each
            property links to its operator&apos;s booking page.
          </p>
        </div>
      </section>

      {/* ─── 3. Area cards (verified Noosa atmospheric photos) ─── */}
      <section
        className="container-page py-14 md:py-20"
        aria-labelledby="accomm-areas-heading"
      >
        <h2 id="accomm-areas-heading" className="font-display text-display-md md:text-display-lg text-ink-900 text-balance mb-8">
          Hastings for the beach. Noosaville for the river. Sunshine for the surf.
        </h2>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {areas.map((a) => {
            const photo = photoForArea(a.id);
            return (
              <Link
                key={a.id}
                href={`/areas/${a.id}`}
                className="group relative block overflow-hidden rounded-xl aspect-[4/3] bg-ink-700"
                data-track={`accomm_area_${a.id}`}
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
                  <h3 className="font-display text-display-sm text-paper-50 text-balance">
                    {a.name}
                  </h3>
                  <p className="mt-1 text-body-sm text-paper-200 text-pretty">
                    {a.bestFor}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ─── 4. Curated properties (image + label + direct booking link) ─── */}
      <section
        className="bg-paper-100 border-y border-paper-200"
        aria-labelledby="accomm-picks-heading"
      >
        <div className="container-page py-14 md:py-20">
          <h2 id="accomm-picks-heading" className="font-display text-display-md md:text-display-lg text-ink-900 text-balance">
            Three we can verify.
          </h2>
          <p className="mt-4 text-body-md text-ink-800 max-w-2xl text-pretty">
            South Pacific on the Noosaville river. Netanya on Hastings Street. Sunshine Beach across from the patrolled sand.
          </p>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {CURATED_PROPERTIES.map((p) => {
              const photoSrc = PHOTO_BY_PROPERTY[p.name] ?? VERIFIED.cards.hastingsStreetWest;
              const link = PROPERTY_LINKS[p.name];
              const programme =
                link && link.programme !== "operator-direct"
                  ? link.programme
                  : null;
              // MSN-2964 / MSN-3057: an Affiliate badge only renders when
              // the programme is BOTH enabled AND verified in the
              // central config. Until then the link is treated as a
              // safe, ordinary outbound link.
              const isAffiliate = programme ? isAffiliateCommercial(programme) : false;
              const rel = isAffiliate
                ? "sponsored noopener noreferrer"
                : "noopener noreferrer";
              const cta = isAffiliate ? "Check availability" : link?.programme === "operator-direct" ? "Book direct" : "View listing";
              const trackKey = p.name.toLowerCase().replace(/\s+/g, "-");
              return (
                <a
                  key={p.name}
                  href={propertyHref(p.name)}
                  target="_blank"
                  rel={rel}
                  aria-label={link?.label ?? `Open ${p.name} booking page`}
                  className="group relative block overflow-hidden rounded-xl aspect-[4/5] bg-ink-700"
                  data-track={`accomm_property_${trackKey}`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={photoSrc.path}
                    alt={photoSrc.caption}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-ink-900/85 via-ink-900/30 to-transparent"
                    aria-hidden="true"
                  />
                  <div className="relative h-full w-full p-5 md:p-6 flex flex-col justify-end">
                    <h3 className="font-display text-display-sm text-paper-50 text-balance">
                      {p.name}
                    </h3>
                    <p className="mt-1 text-body-sm text-paper-200 text-pretty">
                      {p.descriptor}
                    </p>
                    <div className="mt-3 flex items-center gap-2 flex-wrap">
                      <span className="text-body-sm uppercase tracking-wider text-paper-300">
                        {cta}
                        <span aria-hidden="true">→</span>
                      </span>
                      {isAffiliate && programme ? (
                        <AffiliateBadge programme={programmeToDisplay(programme)} mode="compact" />
                      ) : null}
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── 4b. Per-property detail (Item 7.4 fix) — surfaced below the
       *  curated picks so each entry gets a "Why we chose it",
       *  "Trade-off" and "Last verified" block. The grid above stays
       *  image-dominant per KUBE; the detail sits in a calmer text
       *  register. ─── */}
      <section
        className="container-page py-12 md:py-16"
        aria-labelledby="accomm-detail-heading"
      >
        <h2 id="accomm-detail-heading" className="font-display text-display-md text-ink-900 text-balance">
          Why each one.
        </h2>
        <p className="mt-4 text-body-md text-ink-800 max-w-2xl text-pretty">
          Brief rationale, an honest trade-off, and the date we last checked the operator or booking engine.
        </p>
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {CURATED_PROPERTIES.map((p) => (
            <div
              key={p.name}
              className="rounded-xl bg-paper-50 p-6 ring-1 ring-paper-200"
            >
              <h3 className="font-display text-headline-md text-ink-900">{p.name}</h3>
              <dl className="mt-4 space-y-3 text-body-sm text-ink-800">
                {p.whyChosen ? (
                  <div>
                    <dt className="eyebrow text-ink-600">Why we chose it</dt>
                    <dd className="mt-1 text-pretty">{p.whyChosen}</dd>
                  </div>
                ) : null}
                {p.tradeOff ? (
                  <div>
                    <dt className="eyebrow text-ink-600">Trade-off</dt>
                    <dd className="mt-1 text-pretty">{p.tradeOff}</dd>
                  </div>
                ) : null}
                {p.lastVerified ? (
                  <div>
                    <dt className="eyebrow text-ink-600">Last verified</dt>
                    <dd className="mt-1 text-pretty">
                      <time dateTime={p.lastVerified}>{p.lastVerified}</time>
                      {" "}
                      <span className="text-caption text-ink-600">
                        against {p.engine === "direct" ? "operator site" : `${p.engine} listing`}
                      </span>
                    </dd>
                  </div>
                ) : null}
              </dl>
            </div>
          ))}
        </div>
      </section>

      {/* ─── 5. Practical info (visitor-helpful content, no methodology) ─── */}
      <section
        className="container-page py-12 md:py-16"
        aria-labelledby="accomm-practical-heading"
      >
        <h2 id="accomm-practical-heading" className="font-display text-display-md text-ink-900 text-balance">
          A few things worth knowing.
        </h2>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2 text-body-md text-ink-800">
          <li>
            <strong className="text-ink-900">School holidays:</strong> September, Easter, and Christmas book out by August. May and August are quieter and still warm enough to swim.
          </li>
          <li>
            <strong className="text-ink-900">Dogs:</strong> Most Noosa apartments don&apos;t allow pets. Sunshine Beach Resort has dog-friendly units on request — confirm with the operator before booking.
          </li>
          <li>
            <strong className="text-ink-900">Parking:</strong> Hastings Street paid parking fills by 11 am in summer. Noosa Drive is the overflow. Netanya and South Pacific have on-site parking.
          </li>
          <li>
            <strong className="text-ink-900">When to book:</strong> Easter, school holidays, and the Noosa Festival of Surfing (March) book out two-to-three months ahead. Shoulder months (May, August, early November) are easier.
          </li>
        </ul>
      </section>
    </div>
  );
}