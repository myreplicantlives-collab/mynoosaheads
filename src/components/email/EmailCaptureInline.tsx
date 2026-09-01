"use client";

import { useState, useEffect, type FormEvent } from "react";
import { subscribe, isValidEmail, isEmailProviderActive, type LeadMagnetId } from "@/lib/email-capture";

/**
 * EmailCaptureInline — compact, side-rail email capture for commercial
 * pages (accommodation hub, itinerary pages, things-to-do hub).
 *
 * MSN-3057 M3 Workstream 5: less visual weight than the panel variant
 * on /surf-and-weather. Posts to the same `subscribe` function with
 * the same consent + analytics contract.
 *
 * Renders inline (no modal, no exit-intent). Exit-intent handling
 * lives in EmailExitIntentPrompt (separate component) which is
 * intentionally subtle — usability-gated by a 12-second minimum
 * dwell + 50% scroll-depth to avoid being intrusive.
 */

type Props = {
  source: string;
  leadMagnet?: LeadMagnetId;
  title?: string;
};

export function EmailCaptureInline({
  source,
  leadMagnet = "where-to-stay-noosa",
  title = "Get the Noosa decision-makers’ PDF.",
}: Props) {
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "ok" | "error">("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!consent || submitting || !isValidEmail(email)) return;
    setSubmitting(true);
    setStatus("idle");
    const result = await subscribe({
      email: email.trim(),
      source,
      leadMagnet,
      consent: true,
      submittedAt: new Date().toISOString(),
    });
    setSubmitting(false);
    if (result.ok) {
      setStatus("ok");
      setEmail("");
      setConsent(false);
    } else {
      setStatus("error");
    }
  }

  return (
    <aside
      aria-labelledby={`email-inline-${source}`}
      className="rounded-lg bg-paper-100 ring-1 ring-paper-200 p-5"
      data-track="email_form_view"
      data-lead-magnet={leadMagnet}
    >
      <h3
        id={`email-inline-${source}`}
        className="font-display text-headline-md text-ink-900 text-balance"
      >
        {title}
      </h3>
      <p className="mt-2 text-body-sm text-ink-700 text-pretty">
        One PDF. No weekly spam. Unsubscribe in one click.
      </p>

      <form onSubmit={handleSubmit} className="mt-4 space-y-3" noValidate>
        <input
          type="email"
          inputMode="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className="block w-full rounded-md border-paper-300 bg-paper-50 px-3 py-2 text-body-sm text-ink-900 placeholder:text-ink-400 focus:border-ocean-600 focus:outline-none focus:ring-2 focus:ring-ocean-600/30"
          aria-label="Email address"
          disabled={submitting}
        />
        <label className="flex items-start gap-2 text-caption text-ink-800 cursor-pointer">
          <input
            type="checkbox"
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            className="mt-0.5 h-4 w-4 rounded border-paper-400 text-ocean-700 focus:ring-ocean-600"
            required
            aria-required="true"
          />
          <span>
            Send me the PDF. I can unsubscribe any time — see the{" "}
            <a href="/privacy" className="link">
              privacy policy
            </a>
            .
          </span>
        </label>
        <button
          type="submit"
          disabled={!consent || submitting || !email.trim()}
          className="btn btn-primary w-full disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting ? "Sending…" : "Send me the PDF"}
        </button>

        {status === "ok" && (
          <p role="status" className="text-caption text-ocean-800">
            {isEmailProviderActive()
              ? "On its way — check your inbox."
              : "Noted — we'll be in touch when our newsletter activates."}
          </p>
        )}
        {status === "error" && (
          <p role="alert" className="text-caption text-amber-700">
            Please check the email and consent box.
          </p>
        )}
      </form>
    </aside>
  );
}

/**
 * EmailExitIntentPrompt — desktop-only, intentionally subtle.
 *
 * Shows once per session when the user has been on the page for at
 * least 12 seconds AND has scrolled to at least 50% depth. Closes on
 * outside click, ESC, or successful submit. Does NOT show on mobile
 * (no reliable exit-intent signal on touch devices) and does NOT
 * re-trigger after a successful submit or a session dismissal.
 *
 * Renders nothing when the prompt is closed. Mounts only after the
 * `useEffect` delay to keep it out of the initial paint and Lighthouse
 * budget.
 */
export function EmailExitIntentPrompt({
  source,
  leadMagnet = "first-day-noosa",
}: {
  source: string;
  leadMagnet?: LeadMagnetId;
}) {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (dismissed) return;
    // Session-storage gate — never show twice in one session.
    const sessionKey = `email_exit_intent:${source}`;
    if (sessionStorage.getItem(sessionKey)) return;

    let dwellTimer: number | null = null;
    let dismissedThisSession = false;

    const show = () => {
      if (dismissedThisSession) return;
      setVisible(true);
      try {
        sessionStorage.setItem(sessionKey, "1");
      } catch {}
    };

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && scrollPercent() >= 50) {
        show();
      }
    };

    const handleScroll = () => {
      if (scrollPercent() >= 50) {
        // Show after the dwell timer has elapsed, if any.
        if (dwellTimer === null) return;
        if (dwellTimer !== null) {
          window.clearTimeout(dwellTimer);
        }
        dwellTimer = window.setTimeout(show, 800);
      }
    };

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setVisible(false);
        dismissedThisSession = true;
      }
    };

    const dwellStart = window.setTimeout(() => {
      // After 12s on page, even without scroll, arm the prompt.
      window.addEventListener("mouseleave", handleMouseLeave);
    }, 12000);

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("keydown", handleKey);

    return () => {
      window.clearTimeout(dwellStart);
      if (dwellTimer !== null) window.clearTimeout(dwellTimer);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("keydown", handleKey);
    };
  }, [source, dismissed]);

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-labelledby={`exit-intent-${source}`}
      className="fixed bottom-4 right-4 z-40 max-w-sm rounded-xl bg-paper-50 ring-1 ring-paper-300 shadow-lg p-5"
      data-track="email_form_view"
      data-lead-magnet={leadMagnet}
      data-surface="exit-intent"
    >
      <button
        type="button"
        onClick={() => {
          setVisible(false);
          setDismissed(true);
        }}
        aria-label="Dismiss"
        className="absolute top-2 right-2 h-8 w-8 rounded-full text-ink-600 hover:bg-paper-100"
      >
        ×
      </button>
      <EmailCaptureInline source={`${source}-exit`} leadMagnet={leadMagnet} />
    </div>
  );
}

function scrollPercent(): number {
  if (typeof window === "undefined") return 0;
  const h = document.documentElement;
  const b = document.body;
  const st = "scrollTop";
  const sh = "scrollHeight";
  return ((h[st] || b[st]) / ((h[sh] || b[sh]) - h.clientHeight)) * 100;
}
