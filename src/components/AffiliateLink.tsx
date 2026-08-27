import { affiliateUrl } from "@/data/affiliate";

type Props = {
  partner: "booking" | "agoda" | "getyourguide" | "viator" | "klook";
  href?: string;          // override destination; if absent, falls back to official search URL
  className?: string;
  children: React.ReactNode;
  label?: string;         // aria-label override
  showDisclosure?: boolean;
};

// Server component — the disclosure and monetisation status are computed at render time.
// When the affiliate env var is unset, the link is the official search URL and we display
// a "Not yet monetised" disclosure badge instead of an affiliate badge.

export function AffiliateLink({ partner, href, className, children, label, showDisclosure = true }: Props) {
  // We need the partner config; this is duplicated lightly to keep server-side simple.
  const result = affiliateUrl(partner, href || "");
  return (
    <a
      href={result.url}
      target="_blank"
      rel="sponsored noopener noreferrer"
      aria-label={label || (typeof children === "string" ? children : undefined)}
      className={className}
    >
      {children}
      {showDisclosure && (
        <span className="pill-disclosure ml-2 align-middle">
          {result.monetised ? "Affiliate link" : "Partner · not yet monetised"}
        </span>
      )}
    </a>
  );
}