import type { Metadata } from "next";
import Link from "next/link";
import { Hero, Card, CardBody, CardHeader } from "@/components/ui";

export const metadata: Metadata = {
  title: "How we make money",
  description:
    "ACCC-compliant monetisation disclosure for MyNoosaHeads. Affiliate programmes, sponsorship policy, and the editorial firewall.",
  alternates: { canonical: "/how-we-make-money" },
  openGraph: {
    title: "How we make money · MyNoosaHeads",
    description: "ACCC-compliant monetisation disclosure.",
    url: "/how-we-make-money",
    type: "article",
  },
};

const AFFILIATE_PROGRAMMES = [
  {
    name: "Booking.com Affiliate Partner Programme",
    jurisdiction: "Netherlands (Booking Holdings)",
    disclosure: "We earn commission on completed bookings made through Booking.com links from this site. Cookie-based attribution; the cookie is set by Booking.com on its own site after you click.",
    link: "https://www.booking.com/affiliate-program/v2/index.html",
  },
  {
    name: "Stayz Affiliate Programme",
    jurisdiction: "Australia (Expedia Group)",
    disclosure: "We earn commission on completed bookings made through Stayz links from this site. Stayz is operated by Expedia Group.",
    link: "https://www.stayz.com.au/",
  },
  {
    name: "Expedia Partner Solutions",
    jurisdiction: "United States (Expedia Group)",
    disclosure: "We earn commission on completed bookings made through Expedia links from this site.",
    link: "https://www.expediapartnercentral.com/",
  },
  {
    name: "Airbnb Associates",
    jurisdiction: "United States (Airbnb)",
    disclosure: "We earn commission on completed bookings made through Airbnb links from this site.",
    link: "https://www.airbnb.com.au/associates",
  },
];

export default function HowWeMakeMoneyPage() {
  return (
    <div className="bg-paper-50">
      <Hero
        eyebrow="ACCC Sch 2 · Competition and Consumer Act 2010 (Cth)"
        title="How we make money"
        subtitle="MyNoosaHeads is independent. We do not run a newsletter, collect email addresses, operate a login, or sell advertising space. The single source of revenue is affiliate commission on accommodation bookings — and we publish the full statement here per the Competition and Consumer Act 2010 (Cth) Schedule 2."
        flourish="Editorial first, disclosure second."
      />

      <section className="container-page py-14 md:py-20" aria-labelledby="summary-h">
        <p className="eyebrow">In one paragraph</p>
        <h2 id="summary-h" className="mt-1 font-display text-display-md text-ink-900 text-balance max-w-3xl">
          Affiliate commission on accommodation, nothing else.
        </h2>
        <div className="mt-6 max-w-3xl prose-mdx">
          <p>
            Some links on this site are affiliate links. If you click
            through and complete a booking or purchase, MyNoosaHeads may
            earn a small commission at no extra cost to you. Affiliate
            relationships do not influence the editorial copy on this
            site — we link to the same operators and the same areas of
            town regardless of whether they participate.
          </p>
          <p>
            We do not currently run advertising, sponsored posts, paid
            reviews, or display ads. We do not collect email addresses.
            The hosting bill is currently zero (Vercel Hobby free tier);
            we will upgrade to Vercel Pro at A$30/month only when traffic
            warrants.
          </p>
        </div>
      </section>

      <section className="border-t border-paper-200 bg-paper-100" aria-labelledby="programmes-h">
        <div className="container-page py-14 md:py-20">
          <p className="eyebrow">Programmes we participate in</p>
          <h2 id="programmes-h" className="mt-1 font-display text-display-md text-ink-900 text-balance max-w-3xl">
            Four affiliate programmes, all accommodation.
          </h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {AFFILIATE_PROGRAMMES.map((prog) => (
              <Card key={prog.name} as="article">
                <CardHeader eyebrow={prog.jurisdiction} title={prog.name} />
                <CardBody>
                  <p className="text-body-sm text-ink-800">{prog.disclosure}</p>
                  <p className="mt-3">
                    <a
                      href={prog.link}
                      className="link text-ocean-700 text-body-sm"
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      Programme disclosure →
                    </a>
                  </p>
                </CardBody>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="container-page py-14 md:py-20" aria-labelledby="editorial-firewall-h">
        <p className="eyebrow">Editorial firewall</p>
        <h2 id="editorial-firewall-h" className="mt-1 font-display text-display-md text-ink-900 text-balance max-w-3xl">
          What affiliate relationships do not buy.
        </h2>
        <div className="mt-6 max-w-3xl prose-mdx">
          <p>
            Affiliate participation does not buy placement, priority, or
            coverage. We link to the same operators whether they
            participate in an affiliate programme or not. The only
            criterion for inclusion on an area page is that the operator
            is a real option for someone staying in that part of town.
          </p>
          <p>
            We do not accept payment in exchange for coverage, links, or
            placement. If a future version of MyNoosaHeads runs sponsored
            content, it will be clearly marked at the top of the article
            and disclosed on this page.
          </p>
          <h3>Cookie-based attribution</h3>
          <p>
            Affiliate programmes use cookies set on the destination site
            (e.g. booking.com) to attribute a completed booking to a
            referring link. MyNoosaHeads does not set those cookies
            itself, does not see their contents, and does not have access
            to your booking details. The destination operator’s own
            privacy and cookie policy applies once you’re on their site.
          </p>
        </div>

        <aside className="callout mt-10 max-w-3xl">
          <p className="eyebrow">ACCC Schedule 2 compliance</p>
          <p className="mt-2 text-body-sm text-ink-800">
            The Competition and Consumer Act 2010 (Cth) Schedule 2 (the
            Australian Consumer Law) requires that any commercial
            arrangement that could influence editorial content be
            disclosed in a clear and conspicuous way. MyNoosaHeads
            complies by:
          </p>
          <ul className="mt-3 text-body-sm text-ink-800 list-disc pl-5 space-y-1">
            <li>Marking every monetised link with a Sponsored · ACCC Sch 2 pill before the click.</li>
            <li>Publishing this disclosure page in full.</li>
            <li>Not accepting placement payment for editorial coverage.</li>
            <li>Maintaining the editorial firewall above.</li>
          </ul>
          <p className="mt-3 text-body-sm text-ink-800">
            More on ACCC requirements:{" "}
            <a
              href="https://www.accc.gov.au/business/advertising-and-promotions"
              className="link text-ocean-700"
              rel="noopener noreferrer"
              target="_blank"
            >
              ACCC advertising and promotions
            </a>
            .
          </p>
        </aside>

        <div className="mt-10 max-w-3xl">
          <p className="text-body-sm text-ink-700">
            Related: <Link href="/privacy" className="link text-ocean-700">Privacy policy</Link>,{" "}
            <Link href="/terms" className="link text-ocean-700">Terms of use</Link>.
          </p>
        </div>
      </section>
    </div>
  );
}
