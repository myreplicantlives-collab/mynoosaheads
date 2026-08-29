import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/ui";
import { SITE } from "@/data/site";
import { SHOPPING_CATEGORIES } from "@/data/shopping";
import { VERIFIED } from "@/data/photos-msn2982";

/**
 * /shopping — MSN-2985 V2 release correction pass.
 *
 * Per chairman mandate 2026-08-29:
 *   - Collapsed from 40 cards (8 categories × 5 places) to 3
 *     verified featured retailers (NFM, Eumundi, NRG)
 *   - Replaced directory-style heading "Eight categories · forty
 *     places" eyebrow with "Three featured retailers"
 *   - Replaced "Practical." H2 with "The market days."
 *
 * KUBE pattern: hero → atmospheric intro → 3 featured retailer
 * cards (image + label + deep-page link) → market-day practical
 * info.
 *
 * Photography: every card uses a verified Noosa photo (Flickr
 * Openverse, no Wikimedia).
 */

export const metadata: Metadata = {
  title: "Shop Noosa · Markets, makers, and one gallery",
  description:
    "Three verified featured retailers: Noosa Farmers Market, The Original Eumundi Markets, Noosa Regional Gallery.",
  alternates: { canonical: "/shopping" },
};

function photoFor(slug: string): { path: string; caption: string } {
  if (slug.includes("farmers")) return { path: VERIFIED.cards.noosaFarmersMarket.path, caption: VERIFIED.cards.noosaFarmersMarket.caption };
  if (slug.includes("eumundi")) return { path: VERIFIED.cards.noosaFarmersMarket.path, caption: VERIFIED.cards.noosaFarmersMarket.caption };
  if (slug.includes("gallery")) return { path: VERIFIED.cards.noosaRegionalGallery.path, caption: VERIFIED.cards.noosaRegionalGallery.caption };
  return { path: VERIFIED.cards.hastingsStreetEast.path, caption: VERIFIED.cards.hastingsStreetEast.caption };
}

export default function ShoppingPage() {
  return (
    <div className="bg-paper-50">
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "TouristDestination",
            "@id": `${SITE.productionUrl}/shopping#destination`,
            name: "Shop Noosa",
            description:
              "Three featured retailers: Noosa Farmers Market, The Original Eumundi Markets, Noosa Regional Gallery.",
            url: `${SITE.productionUrl}/shopping`,
          },
        ]}
      />

      {/* ─── 1. Hero — Noosa Farmers Market (verified) ─── */}
      <section
        aria-label="Shop Noosa"
        className="relative w-full overflow-hidden bg-ink-900 h-[80vh] min-h-[560px] max-h-[1000px]"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/img/cards/noosa-farmers-market.jpg"
          alt="Noosa Farmers Market — Sunday morning on the Noosaville showgrounds."
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
            <p className="eyebrow text-paper-300">SHOP</p>
            <h1
              className="mt-3 font-display text-display-xl md:text-display-xl text-paper-50 text-balance max-w-4xl"
              style={{ textShadow: "0 2px 24px rgba(11,28,28,0.45)" }}
            >
              Shop Noosa.
            </h1>
            <p className="mt-4 lead text-paper-200 max-w-3xl text-pretty">
              Markets, makers, one gallery.
            </p>
          </div>
        </div>
      </section>

      {/* ─── 2. Atmospheric intro ─── */}
      <section
        className="border-y border-paper-200 bg-paper-100"
        aria-labelledby="shop-intro-heading"
      >
        <div className="container-page py-12 md:py-16">
          <p className="eyebrow">Three featured retailers</p>
          <h2
            id="shop-intro-heading"
            className="mt-3 font-display text-display-md md:text-display-lg text-ink-900 text-balance max-w-3xl"
          >
            From the Hastings Street strip to the hinterland markets.
          </h2>
          <p className="mt-5 lead max-w-2xl text-pretty">
            Noosa Farmers Market every Sunday morning. Eumundi on Wednesdays and Saturdays. Noosa Regional Gallery on the river at Tewantin, every day but Monday.
          </p>
        </div>
      </section>

      {/* ─── 3. Featured retailer cards ─── */}
      <section
        className="container-page py-14 md:py-20"
        aria-label="Featured retailers"
      >
        <div className="grid gap-6 md:grid-cols-3">
          {SHOPPING_CATEGORIES.map((cat) => {
            const photo = photoFor(cat.id);
            const place = cat.places[0];
            return (
              <Link
                key={cat.id}
                href={place.linkToMore}
                className="group relative block overflow-hidden rounded-2xl aspect-[4/5] bg-ink-700"
                data-track={`shop_featured_${cat.id}`}
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
                <div className="relative h-full w-full p-6 md:p-7 flex flex-col justify-end">
                  <p className="text-caption uppercase tracking-wider text-paper-300">
                    {cat.eyebrow}
                  </p>
                  <h3 className="mt-2 font-display text-display-md text-paper-50 text-balance">
                    {cat.name}
                  </h3>
                  <p className="mt-2 text-body-sm text-paper-200 text-pretty">
                    {place.where}
                  </p>
                  <p className="mt-4 text-body-sm uppercase tracking-wider text-paper-300">
                    {place.linkLabel ?? "Plan your morning"} <span aria-hidden="true">→</span>
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ─── 4. Market-day practical info ─── */}
      <section
        className="bg-paper-100 border-y border-paper-200"
        aria-labelledby="shop-practical-heading"
      >
        <div className="container-page py-12 md:py-16">
          <h2 id="shop-practical-heading" className="font-display text-display-md text-ink-900 text-balance">
            The market days.
          </h2>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2 text-body-md text-ink-800">
            <li>
              <strong className="text-ink-900">Sunday:</strong> Noosa Farmers Market, Noosaville showgrounds, 7 am–midday. Over 100 stallholders, mostly primary producers from within an hour of Noosa.
            </li>
            <li>
              <strong className="text-ink-900">Wednesday &amp; Saturday:</strong> The Original Eumundi Markets, Memorial Drive, 7:30 am–2 pm. The makers' market — ceramics, textiles, leatherwork, jewellery, body care.
            </li>
            <li>
              <strong className="text-ink-900">Tuesday–Sunday:</strong> Noosa Regional Gallery, Riverside Drive, Tewantin. 10 am–4 pm weekdays, 10 am–3 pm weekends, closed Mondays. Free entry.
            </li>
            <li>
              <strong className="text-ink-900">Dogs:</strong> On-leash at all three locations. Noosa Farmers Market and Eumundi have food samples at stall height — keep dogs close.
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}