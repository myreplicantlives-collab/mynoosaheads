"use client";

import { useState, type FormEvent } from "react";
import { LEAD_MAGNETS, subscribe, type LeadMagnetId, type SubscribeResult } from "@/lib/email-capture";

/**
 * EmailCaptureForm — provider-agnostic inline email form.
 *
 * MSN-3057 M3 Workstream 5: shared between /surf-and-weather,
 * accommodation hub, and itinerary pages. Renders an explicit-consent
 * form with a disabled-until-validated submit button. Posts to the
 * `subscribe` function in @/lib/email-capture, which routes through
 * the active provider adapter (noop on dev).
 *
 * The component lives in its own file so each parent page stays a
 * Server Component and can export `metadata`.
 */

type Props = {
  /** Page slug for analytics + consent record. */
  source: string;
  /** Which lead magnet to attach the subscription to. */
  leadMagnet?: LeadMagnetId;
  /** Visual variant — inline fits inside a content column; panel is a wider card. */
  variant?: "inline" | "panel";
  /** Optional headline override (defaults to the lead-magnet title). */
  title?: string;
};

export function EmailCaptureForm({
  source,
  leadMagnet = "weekly-dispatch",
  variant = "inline",
  title,
}: Props) {
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [result, setResult] = useState<SubscribeResult | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const magnet = LEAD_MAGNETS[leadMagnet];
  const headline = title ?? magnet.title;

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!consent || submitting) return;
    setSubmitting(true);
    setResult(null);
    const r = await subscribe({
      email: email.trim(),
      source,
      leadMagnet,
      consent: true,
      submittedAt: new Date().toISOString(),
    });
    setResult(r);
    setSubmitting(false);
    if (r.ok) {
      setEmail("");
      setConsent(false);
    }
  }

  const containerClass =
    variant === "panel"
      ? "rounded-2xl bg-paper-100 ring-1 ring-paper-200 p-6 md:p-8"
      : "rounded-xl bg-paper-100 ring-1 ring-paper-200 p-5";

  return (
    <section
      aria-labelledby={`email-capture-${source}`}
      className={containerClass}
      data-track="email_form_view"
      data-lead-magnet={leadMagnet}
    >
      <h3
        id={`email-capture-${source}`}
        className="font-display text-display-sm text-ink-900 text-balance"
      >
        {headline}
      </h3>
      <p className="mt-3 text-body-md text-ink-700 text-pretty">{magnet.blurb}</p>

      <form onSubmit={handleSubmit} className="mt-5 space-y-4" noValidate>
        <div>
          <label htmlFor={`email-${source}`} className="block text-body-sm text-ink-900">
            Email address
          </label>
          <input
            id={`email-${source}`}
            type="email"
            inputMode="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="mt-1 block w-full rounded-md border-paper-300 bg-paper-50 px-3 py-2 text-body-md text-ink-900 placeholder:text-ink-400 focus:border-ocean-600 focus:outline-none focus:ring-2 focus:ring-ocean-600/30"
            disabled={submitting}
          />
        </div>

        <label className="flex items-start gap-3 text-body-sm text-ink-800 cursor-pointer">
          <input
            type="checkbox"
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            className="mt-0.5 h-4 w-4 rounded border-paper-400 text-ocean-700 focus:ring-ocean-600"
            required
            aria-required="true"
            aria-describedby={`consent-help-${source}`}
          />
          <span id={`consent-help-${source}`}>
            Yes, send me the MyNoosaHeads weekly dispatch. I understand
            I can unsubscribe in one click from any email, and that my
            email address is held under the{" "}
            <a href="/privacy" className="link">
              privacy policy
            </a>
            . (Australian Privacy Principles + Spam Act 2003.)
          </span>
        </label>

        <button
          type="submit"
          disabled={!consent || submitting || !email.trim()}
          className="btn btn-primary disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting ? "Subscribing…" : "Subscribe"}
        </button>

        {result && !result.ok && (
          <p
            role="alert"
            className="text-body-sm text-amber-700"
          >
            {result.reason === "consent-missing"
              ? "Please tick the consent box before subscribing."
              : result.reason === "invalid-email"
                ? "That email address doesn’t look right. Please check and try again."
                : result.reason === "duplicate"
                  ? "You’re already on the list. Thanks for subscribing."
                  : "Something went wrong on our end. Please try again in a few minutes."}
          </p>
        )}
        {result && result.ok && (
          <p role="status" className="text-body-sm text-ocean-800">
            Subscribed — check your inbox for the first message.
          </p>
        )}
      </form>
    </section>
  );
}
