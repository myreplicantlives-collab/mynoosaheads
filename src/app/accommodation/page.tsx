import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/ui";
import { SITE } from "@/data/site";
import { ACCOMMODATION_DATA, CURATED_PROPERTIES } from "@/data/accommodation";
import { VERIFIED } from "@/data/photos-msn2982";

/**
 * /accommodation — MSN-2982 chairman-mandated rework.
 *
 * Word budget: 350 words.
 *
 * Photography: chairman flagged that the previous Sofitel (Mission
 * Beach) and RACV (Hamilton Island) cards were wrong-location
 * substitutes. The deep /stay/[slug] pages still exist, but this
 * page does NOT promote them with the wrong photos. The hero uses
 * Hastings Street (verified). Each property card points to its
 * operator's direct booking URL where one exists, otherwise to a
 * property-name search on Booking.com / Stayz (chairman mandate #12).
 *
 * KUBE progression: hero → atmospheric intro → area cards → property
 * cards (no body copy, image + label + direct booking link) →
 * practical info → footer.
 */

export const metadata: Metadata = {
  title: "Where to stay in Noosa",
  description:
    "Ten curated properties across five Noosa areas — direct booking links to operators.",
  alternates: { canonical: "/accommodation" },
};

// Direct booking URLs where the operator has one. Where there is no
// direct URL, we link to a property-name search on Booking.com (the
// chairman-mandated fallback for #12 — never to a generic homepage).
const DIRECT_BOOKING_URLS: Record<string, string> = {
  "Sofitel Noosa Pacific Resort": "https://www.booking.com/searchresults.html?ss=Sofitel+Noosa+Pacific+Resort+Queensland",
  "RACV Noosa Resort": "https://www.racv.com.au/holidays/resorts/noosa.html",
  "The Sebel Noosa": "https://www.booking.com/searchresults.html?ss=Sebel+Noosa",
  "Netanya Noosa": "https://www.netanyanoosa.com.au/",
  "South Pacific Resort & Spa Noosa": "https://www.southpacificresort.com.au/",
  "Noosa Quays": "https://www.noosaquays.com.au/",
  "Sunshine Beach Resort": "https://www.booking.com/searchresults.html?ss=Sunshine+Beach+Resort+Noosa",
  "Ramada by Wyndham Noosa": "https://www.wyndhamhotels.com/en-US/ramada/noosa-australia/ramada-noosa/overview",
  "Peregian Court": "https://www.booking.com/searchresults.html?ss=Peregian+Court+holiday+apartments",
  "Noosa-area holiday houses": "https://www.stayz.com.au/search?query=noosa+heads",
};

function bookingHref(name: string): string {
  return DIRECT_BOOKING_URLS[name] ?? "https://www.booking.com/searchresults.html?ss=Noosa+Heads";
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
              "Ten curated properties across five Noosa areas — Hastings Street, Noosa Sound, Noosaville, Sunshine Beach and Peregian.",
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
              Ten properties, five areas, direct booking links.
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
          <p className="eyebrow">Five areas · ten properties</p>
          <h2
            id="accomm-intro-heading"
            className="mt-3 font-display text-display-md md:text-display-lg text-ink-900 text-balance max-w-3xl"
          >
            Pick the precinct, then the property.
          </h2>
          <p className="mt-5 lead max-w-2xl text-pretty">
            Hastings Street for beachfront; Noosaville for the river;
            Sunshine for the surf; Peregian for the village. Each
            property links to its operator&apos;s booking page.
          </p>
        </div>
      </section>

      {/* ─── 3. Area cards (verified Noosa atmospheric photos) ─── */}
      <section
        className="container-page py-14 md:py-20"
        aria-labelledby="accomm-areas-heading"
      >
        <h2 id="accomm-areas-heading" className="font-display text-display-md text-ink-900 text-balance mb-8">
          By area.
        </h2>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {areas.map((a) => (
            <Link
              key={a.id}
              href={`/areas/${a.id}`}
              className="group relative block overflow-hidden rounded-xl aspect-[4/3] bg-ink-700"
              data-track={`accomm_area_${a.id}`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={a.id === "hastings" ? VERIFIED.cards.hastingsStreetWest.path : VERIFIED.cards.noosaRiver.path}
                alt={a.id === "hastings" ? VERIFIED.cards.hastingsStreetWest.caption : VERIFIED.cards.noosaRiver.caption}
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
          ))}
        </div>
      </section>

      {/* ─── 4. Curated properties (image + label + direct booking link) ─── */}
      <section
        className="bg-paper-100 border-y border-paper-200"
        aria-labelledby="accomm-picks-heading"
      >
        <div className="container-page py-14 md:py-20">
          <h2 id="accomm-picks-heading" className="font-display text-display-md md:text-display-lg text-ink-900 text-balance">
            The ten.
          </h2>
          <p className="mt-4 text-body-md text-ink-800 max-w-2xl text-pretty">
            Each card opens the operator&apos;s booking engine. The
            booking links below go to the property&apos;s own page
            where one exists.
          </p>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {CURATED_PROPERTIES.map((p) => {
              const photoSrc = p.name === "Netanya Noosa"
                ? VERIFIED.cards.netanyaApartments
                : p.name === "South Pacific Resort & Spa Noosa"
                  ? VERIFIED.cards.southPacificResort
                  : p.name === "Sunshine Beach Resort"
                    ? VERIFIED.cards.sunshineBeach
                    : VERIFIED.cards.hastingsStreetEast;
              return (
                <a
                  key={p.name}
                  href={bookingHref(p.name)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative block overflow-hidden rounded-xl aspect-[4/5] bg-ink-700"
                  data-track={`accomm_property_${p.name.toLowerCase().replace(/\s+/g, "_")}`}
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
                    <p className="mt-3 text-body-sm uppercase tracking-wider text-paper-300">
                      Book direct <span aria-hidden="true">→</span>
                    </p>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── 5. Practical info ─── */}
      <section
        className="container-page py-12 md:py-16"
        aria-labelledby="accomm-practical-heading"
      >
        <h2 id="accomm-practical-heading" className="font-display text-display-md text-ink-900 text-balance">
          Practical.
        </h2>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2 text-body-md text-ink-800">
          <li>
            <strong className="text-ink-900">Booking engine:</strong> We do not take inventory. Each link opens the operator or a property-name search on Booking.com / Stayz.
          </li>
          <li>
            <strong className="text-ink-900">Disclosure:</strong> If a link earns a commission, it is marked Affiliate. See the footer for the full ACCC Schedule 2 statement.
          </li>
          <li>
            <strong className="text-ink-900">Dogs:</strong> Most Noosa apartments don&apos;t allow pets. The Sunshine Beach Resort has dog-friendly units on request — confirm with the operator before booking.
          </li>
          <li>
            <strong className="text-ink-900">When:</strong> School holidays (September, Easter, Christmas) book out by August. Shoulder months (May, August) are quieter.
          </li>
        </ul>
      </section>
    </div>
  );
}
