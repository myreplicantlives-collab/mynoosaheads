import Link from "next/link";
import { Breadcrumb } from "@/components/Breadcrumb";
import { BreadcrumbLd } from "@/components/JsonLd";
import { SITE } from "@/data/site";
import { affiliateUrl } from "@/data/affiliate";

export const metadata = {
  title: "Current Noosa offers and partner promotions",
  description:
    "Seasonal offers from accommodation and tour partners. Real destinations, clear disclosure, no invented discounts.",
};

export const dynamic = "force-static";

const offers = [
  {
    title: "Hastings Street accommodation — early-bird rates",
    partner: "Booking.com (partner programme)",
    body: "Booking.com's 'Early 2026 Deals' filter surfaces accommodation partners with advance-purchase rates. Compare on Booking.com — we earn a small commission on completed bookings.",
    expires: "Ongoing — varies by property",
    ctaPartner: "booking" as const,
    ctaUrl: "https://www.booking.com/searchresults.html?ss=Noosa+Heads&group_adults=2&checkin=2026-10-01&checkout=2026-10-08",
    ctaLabel: "Compare Booking.com rates",
  },
  {
    title: "GetYourGuide — Noosa tour credit",
    partner: "GetYourGuide (partner programme)",
    body: "GetYourGuide runs seasonal credits on selected Noosa tours (Everglades, K'gari day trip, Australia Zoo). Compare current options on the operator page.",
    expires: "Ongoing — varies by tour",
    ctaPartner: "getyourguide" as const,
    ctaUrl: "https://www.getyourguide.com/noosa-l322/",
    ctaLabel: "Browse GetYourGuide tours",
  },
  {
    title: "Viator — K'gari day trips",
    partner: "Viator (partner programme)",
    body: "Viator's K'gari (Fraser Island) day-trip inventory from Noosa operators. Includes the ferry crossing, Lake McKenzie and the Maheno shipwreck.",
    expires: "Year-round",
    ctaPartner: "viator" as const,
    ctaUrl: "https://www.viator.com/Noosa/d6169-ttd",
    ctaLabel: "Browse Viator day trips",
  },
];

export default function OffersPage() {
  const baseUrl = SITE.productionUrl;
  return (
    <>
      <BreadcrumbLd
        items={[
          { name: "Home", url: baseUrl },
          { name: "Offers", url: `${baseUrl}/offers` },
        ]}
      />
      <main className="bg-parchment-50">
        <div className="container-page">
          <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Offers" }]} />
          <header className="pb-8 pt-2">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-ocean-700">Offers</p>
            <h1 className="mt-2 font-serif text-4xl text-parchment-900 sm:text-5xl">Current partner offers</h1>
            <p className="mt-4 max-w-3xl text-lg leading-relaxed text-parchment-700">
              Seasonal offers from our accommodation and tour partners. Every offer links to a real
              partner page; we don't invent discount codes. When we have an approved partner ID set
              as an environment variable, the link earns us a small commission.
            </p>
            <p className="mt-3 rounded-xl border border-coral-400 bg-coral-400/10 p-3 text-sm text-parchment-800">
              <strong>Honesty note:</strong> offers here are not "limited time" fakes. They're real,
              recurring promotions. We mark "ongoing" where the offer is a partner's standing
              programme rather than a date-specific campaign.
            </p>
          </header>

          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {offers.map((o) => {
              const link = affiliateUrl(o.ctaPartner, o.ctaUrl).url;
              return (
                <article key={o.title} className="card">
                  <p className="text-xs uppercase tracking-wider text-parchment-500">{o.partner}</p>
                  <h2 className="mt-2 font-serif text-2xl text-parchment-900">{o.title}</h2>
                  <p className="mt-3 text-sm leading-relaxed text-parchment-700">{o.body}</p>
                  <p className="mt-3 text-xs text-parchment-500">Status: {o.expires}</p>
                  <p className="mt-4">
                    <a href={link} target="_blank" rel="sponsored noopener noreferrer" className="btn btn-primary">
                      {o.ctaLabel}
                    </a>
                    <span className="pill-disclosure ml-2">Affiliate link</span>
                  </p>
                </article>
              );
            })}
          </div>

          <section className="mt-12 rounded-2xl bg-parchment-100 p-6">
            <h2 className="font-serif text-2xl text-parchment-900">How we handle offers</h2>
            <ul className="mt-3 space-y-2 text-sm text-parchment-700">
              <li>· We never invent discount codes. If we don't have a partner-supplied code, we don't list one.</li>
              <li>· We don't claim a deal is "limited time" if it's not. "Ongoing" means it's a standing partner programme.</li>
              <li>· Affiliate links are clearly disclosed per ACMA rules.</li>
              <li>· We update this page when offers change. The date we last checked each offer is in the evidence ledger.</li>
            </ul>
          </section>
        </div>
      </main>
    </>
  );
}
