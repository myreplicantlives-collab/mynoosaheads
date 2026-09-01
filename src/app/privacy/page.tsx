import type { Metadata } from "next";
import { Hero } from "@/components/ui";

export const metadata: Metadata = {
  title: "Privacy policy",
  description:
    "Privacy Act 1988 (Cth) compliant privacy policy for MyNoosaHeads. No email capture, no third-party tracking beyond host-level metrics.",
  alternates: { canonical: "/privacy" },
  openGraph: {
    title: "Privacy policy · MyNoosaHeads",
    description: "Privacy Act 1988 (Cth) compliant policy.",
    url: "/privacy",
    type: "article",
  },
  twitter: {
    card: "summary",
    title: "Privacy policy · MyNoosaHeads",
    description: "Privacy Act 1988 (Cth) compliant policy.",
  },
};

export default function PrivacyPage() {
  return (
    <div className="bg-paper-50">
      <Hero
        eyebrow="Privacy Act 1988 (Cth) compliant"
        title="Privacy policy"
        subtitle="MyNoosaHeads does not collect your email address, does not operate a login, and does not run analytics beyond the host-level metrics that come with hosting on Cloudflare Workers. This page sets out what that means under the Privacy Act 1988 (Cth) and the Australian Privacy Principles."
        flourish="Less data is better data."
      />

      <section className="container-page py-14 md:py-20" aria-labelledby="privacy-h">
        <div className="prose-mdx max-w-3xl">
          <h2 id="privacy-h">What we collect</h2>
          <p>
            <strong>Nothing directly.</strong> MyNoosaHeads does not run a
            newsletter, does not operate a login, and does not have a
            contact form that stores submissions. If you email us directly
            at the address on the{" "}
            <a href="/contact" className="link text-ocean-800">contact page</a>,
            we hold your email for as long as it takes to reply and then
            archive it with the correspondence.
          </p>

          <h2>What our host collects (Cloudflare Workers)</h2>
          <p>
            Our hosting provider, Cloudflare, collects the standard set of
            access logs (request IP, user agent, URL, response code) for the
            purpose of operating the platform. Cloudflare publishes its own
            privacy policy; you can read it at{" "}
            <a
              href="https://www.cloudflare.com/privacypolicy/"
              className="link text-ocean-800"
              rel="noopener noreferrer"
              target="_blank"
            >
              cloudflare.com/privacypolicy/
            </a>
            . We do not have visibility into your specific log entries;
            we only see aggregate traffic in the Cloudflare dashboard.
          </p>

          <h2>Cookies</h2>
          <p>
            We do not set any first-party analytics or advertising cookies.
            Our host may set strictly-necessary cookies (e.g. for routing
            and CDN pinning). We do not use Google Analytics, Facebook
            Pixel, or any third-party tracking pixels.
          </p>

          <h2>Third-party services we link to</h2>
          <p>
            When you click an outbound link — for example, to the Bureau of
            Meteorology, QPWS, or a third-party booking engine — you leave
            our site. The operator of that destination is responsible for
            any data they collect under their own privacy policy. We link
            to operators that publish a clear policy; if you spot one that
            doesn’t,{" "}
            <a href="/contact" className="link text-ocean-800">
              please tell us
            </a>
            .
          </p>

          <h2>Affiliate programmes</h2>
          <p>
            Some links on the site are affiliate links (see the
            footer for the full disclosure). Affiliate programmes may set
            their own cookies on the
            destination site when you click through; we do not see the
            contents of those cookies, only whether a click resulted in a
            conversion for our account. We do not currently name
            individual programme partners in this disclosure. Where
            participation in a specific affiliate programme has been
            verified, the link is marked Affiliate before you click; where
            it has not been verified, no badge appears. The full
            statement — including the verified programme list — sits in
            the Legal column of the footer, per the Competition and
            Consumer Act 2010 (Cth) Schedule 2.
          </p>

          <h2 id="spam-act-2003">Spam Act 2003</h2>
          <p>
            MyNoosaHeads may offer an opt-in email update for readers
            who want a weekly editorial dispatch on Noosa conditions
            and operator updates. The opt-in is a positive action —
            ticking a consent checkbox before the form will accept a
            submission — and every email we send carries a working
            unsubscribe link that removes you from the list within
            one business day. We never buy, sell, or share the email
            list with a third party. The provider that stores the
            list is named in the{" "}
            <a href="#email-capture" className="link text-ocean-800">
              email-capture
            </a>{" "}
            section below.
          </p>
          <p className="mt-3">
            We do not send marketing SMS, push notifications, or any
            other class of commercial electronic message outside the
            opt-in channel above.
          </p>

          <h2>Access and correction</h2>
          <p>
            Under the Australian Privacy Principles, you have a right to
            ask what personal information we hold about you and to correct
            it if it is wrong. In practice, we hold only the email
            correspondence you choose to send us. To make a request,
            email{" "}
            <a
              href="mailto:hello@mynoosaheads.com"
              className="link text-ocean-800"
            >
              hello@mynoosaheads.com
            </a>{" "}
            and we will respond within 30 days.
          </p>

          <h2>Complaints</h2>
          <p>
            If you have a privacy complaint, please email{" "}
            <a
              href="mailto:hello@mynoosaheads.com"
              className="link text-ocean-800"
            >
              hello@mynoosaheads.com
            </a>{" "}
            first. If you are not satisfied with our response, you can
            complain to the Office of the Australian Information
            Commissioner (OAIC) at{" "}
            <a
              href="https://www.oaic.gov.au/"
              className="link text-ocean-800"
              rel="noopener noreferrer"
              target="_blank"
            >
              oaic.gov.au
            </a>
            .
          </p>

          <h2 id="email-capture">Email capture (when enabled)</h2>
          <p>
            The site’s email-capture framework is built but not active
            on the development build. When the framework is activated
            for production (after Tim’s explicit approval, with a
            named provider) the following rules apply:
          </p>
          <ul>
            <li>
              <strong>Consent is explicit.</strong> No pre-checked
              boxes. The submit button is disabled until the consent
              checkbox is ticked, and the consent text names the
              purpose (weekly Noosa dispatch), the sender (MyNoosaHeads),
              and how to unsubscribe.
            </li>
            <li>
              <strong>Unsubscribe works.</strong> Every email carries
              a one-click unsubscribe link. Removal is processed
              within one business day.
            </li>
            <li>
              <strong>Data minimisation.</strong> We collect the email
              address and the page the form was submitted from. We do
              not collect name, location, or any other identifier.
            </li>
            <li>
              <strong>No resale.</strong> The subscriber list is never
              sold, shared, or used for any purpose other than the
              dispatch the reader opted in to.
            </li>
            <li>
              <strong>Provider change is cheap.</strong> The form posts
              to a single internal endpoint; swapping providers means
              swapping the adapter at that endpoint, not rebuilding
              the form on every page.
            </li>
            <li>
              <strong>Australian Privacy Principles + Spam Act
              2003.</strong> The framework is designed to be
              compliant with both. The provider, retention period,
              and data-residency region will be added here before
              the framework is activated.
            </li>
          </ul>

          <h2>Changes to this policy</h2>
          <p>
            We will update this policy if our practices change. The current
            version is dated{" "}
            <time dateTime="2026-09-01">1 September 2026</time>. Material
            changes will be noted at the top of this page for at least 30
            days.
          </p>
        </div>
      </section>
    </div>
  );
}
