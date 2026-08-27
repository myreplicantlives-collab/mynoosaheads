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
};

export default function PrivacyPage() {
  return (
    <div className="bg-paper-50">
      <Hero
        eyebrow="Privacy Act 1988 (Cth) compliant"
        title="Privacy policy"
        subtitle="MyNoosaHeads does not collect your email address, does not operate a login, and does not run analytics beyond the host-level metrics that come with hosting on Vercel. This page sets out what that means under the Privacy Act 1988 (Cth) and the Australian Privacy Principles."
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
            <a href="/contact" className="link text-ocean-700">contact page</a>,
            we hold your email for as long as it takes to reply and then
            archive it with the correspondence.
          </p>

          <h2>What our host collects (Vercel)</h2>
          <p>
            Our hosting provider, Vercel, collects the standard set of
            access logs (request IP, user agent, URL, response code) for the
            purpose of operating the platform. Vercel publishes its own
            privacy policy; you can read it at{" "}
            <a
              href="https://vercel.com/legal/privacy-policy"
              className="link text-ocean-700"
              rel="noopener noreferrer"
              target="_blank"
            >
              vercel.com/legal/privacy-policy
            </a>
            . We do not have visibility into your specific log entries;
            we only see aggregate traffic in the Vercel dashboard.
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
            Meteorology, QPWS, or Booking.com — you leave our site. The
            operator of that destination is responsible for any data they
            collect under their own privacy policy. We link to operators
            that publish a clear policy; if you spot one that doesn’t,{" "}
            <a href="/contact" className="link text-ocean-700">
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
            conversion for our account. The major programmes we
            participate in publish their own cookie and privacy statements
            (Booking.com, Stayz, Expedia, Airbnb).
          </p>

          <h2 id="spam-act-2003">Spam Act 2003</h2>
          <p>
            We do not send commercial electronic messages. There is no
            newsletter, no marketing SMS, no push notifications. The Spam
            Act 2003 (Cth) does not apply to the publication because we do
            not solicit contact with you.
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
              className="link text-ocean-700"
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
              className="link text-ocean-700"
            >
              hello@mynoosaheads.com
            </a>{" "}
            first. If you are not satisfied with our response, you can
            complain to the Office of the Australian Information
            Commissioner (OAIC) at{" "}
            <a
              href="https://www.oaic.gov.au/"
              className="link text-ocean-700"
              rel="noopener noreferrer"
              target="_blank"
            >
              oaic.gov.au
            </a>
            .
          </p>

          <h2>Changes to this policy</h2>
          <p>
            We will update this policy if our practices change. The current
            version is dated{" "}
            <time dateTime="2026-08-27">27 August 2026</time>. Material
            changes will be noted at the top of this page for at least 30
            days.
          </p>
        </div>
      </section>
    </div>
  );
}
