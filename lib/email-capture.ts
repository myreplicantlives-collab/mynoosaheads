/**
 * email-capture — MSN-3057 M3 Workstream 5.
 *
 * Provider-agnostic email-capture framework for MyNoosaHeads.
 *
 * Constraints:
 *   - Built but NOT activated on the dev URL. Provider activation is
 *     gated on Tim's explicit approval (see privacy policy §"email
 *     capture").
 *   - Australian Privacy Principles + Spam Act 2003 compliance:
 *     explicit opt-in consent checkbox, unsubscribe header on every
 *     email, data-minimisation (email + submission page only).
 *   - Provider swap = change the adapter here, not the forms on
 *     every page. The form components below post to a single
 *     function (`subscribe`) which routes through the active
 *     adapter.
 *   - No analytics calls to third parties on the form.
 *   - Form events fire on Plausible via the existing
 *     `window.plausible(...)` global (no-op when the tracker is
 *     absent on the dev build).
 */

export type SubscribeInput = {
  /** Subscriber email address. */
  email: string;
  /** The page the form was submitted from (analytics + consent record). */
  source: string;
  /** Lead magnet the subscriber opted in for. */
  leadMagnet: LeadMagnetId;
  /** Subscriber consent stamp — must be true to submit. */
  consent: true;
  /** UTC ISO timestamp captured at form-submit time. */
  submittedAt: string;
};

export type LeadMagnetId =
  | "first-day-noosa"
  | "where-to-stay-noosa"
  | "weekly-dispatch";

/** Adapter contract — every provider implements this. */
export type EmailProviderAdapter = {
  /** Provider identifier (for logging + future multi-region). */
  readonly id: "buttondown" | "convertkit" | "mailchimp" | "beehiiv" | "noop";
  /** Subscribe — returns a result code, never throws to the caller. */
  subscribe(input: SubscribeInput): Promise<SubscribeResult>;
};

export type SubscribeResult =
  | { ok: true; provider: EmailProviderAdapter["id"]; leadMagnet: LeadMagnetId }
  | { ok: false; reason: "consent-missing" | "invalid-email" | "duplicate" | "provider-error"; detail?: string };

/**
 * MSN-3057 M4 — conditional activation flag.
 *
 * The provider layer is plumbed end-to-end (forms render, validation
 * runs, Plausible events fire), but the active provider is gated by an
 * environment-controlled boolean. The default is `false` so the dev
 * build is silent. Activation happens in three steps:
 *
 *   1. Tim approves a provider (Buttondown / ConvertKit / Mailchimp /
 *      Beehiiv) and supplies the credentials in the deployment config.
 *   2. The adapter implementation is added to `lib/email-capture.ts`
 *      with its environment-specific config (api key, list ID).
 *   3. `EMAIL_PROVIDER_ENABLED=true` is set on the production build.
 *      The provider swap is then a single-line `setEmailProvider(...)`
 *      in the module init (no per-page rebuild needed).
 *
 * Reading the flag: `emailProviderEnabled()` returns the boolean. The
 * form components use this to gate the success-toast copy so the dev
 * build never promises a "check your inbox" message that won't arrive.
 */

function emailProviderEnabled(): boolean {
  // The flag can come from either a build-time env or a runtime
  // injection (the latter is useful for staged rollouts). Both default
  // to off so the dev build is silent.
  const build = process.env.EMAIL_PROVIDER_ENABLED;
  if (build === "true") return true;
  if (typeof window !== "undefined") {
    const runtime = (window as unknown as { __EMAIL_PROVIDER_ENABLED?: boolean })
      .__EMAIL_PROVIDER_ENABLED;
    if (runtime === true) return true;
  }
  return false;
}

/** The active adapter — defaults to noop so the dev build is silent. */
let activeAdapter: EmailProviderAdapter = {
  id: "noop",
  async subscribe(): Promise<SubscribeResult> {
    // Even when the provider is disabled, the form should still report
    // a soft success so the visitor isn't confused. The conversion
    // event is fired with `provider_disabled=true` so analytics can
    // segment "interested visitors without provider" from real
    // conversions. This is the activation-gate contract: the form
    // works, but no third-party call happens until Tim green-lights.
    firePlausible("email_form_conversion", { provider_disabled: "true" });
    return { ok: true, provider: "noop", leadMagnet: "weekly-dispatch" };
  },
};

/** Swap the active provider. Production-only — guard with env check. */
export function setEmailProvider(adapter: EmailProviderAdapter): void {
  if (!emailProviderEnabled()) {
    // Safe-by-default: refuse to swap in a real provider unless the
    // env flag is set. This prevents accidental activation if a future
    // code path calls `setEmailProvider` without checking the gate.
    if (typeof console !== "undefined") {
      console.warn(
        "[email-capture] setEmailProvider called but EMAIL_PROVIDER_ENABLED is not true. Keeping noop adapter. Set the env var on the production build to activate.",
      );
    }
    return;
  }
  activeAdapter = adapter;
}

/** Public read-only accessor — UI components can adapt copy to the gate. */
export function isEmailProviderActive(): boolean {
  return emailProviderEnabled() && activeAdapter.id !== "noop";
}

/**
 * Public subscribe entry point — called by every EmailForm on every page.
 * Performs validation, fires Plausible events, and routes to the active
 * adapter. Returns a stable result shape for the form to render against.
 */
export async function subscribe(input: SubscribeInput): Promise<SubscribeResult> {
  if (input.consent !== true) {
    return { ok: false, reason: "consent-missing" };
  }
  if (!isValidEmail(input.email)) {
    return { ok: false, reason: "invalid-email" };
  }
  firePlausible("email_form_submit", { lead_magnet: input.leadMagnet, source: input.source });
  try {
    const result = await activeAdapter.subscribe(input);
    if (result.ok) {
      firePlausible("email_form_conversion", { lead_magnet: input.leadMagnet });
    }
    return result;
  } catch (err) {
    return { ok: false, reason: "provider-error", detail: String(err) };
  }
}

/** Light client-side tracker — no-op when Plausible is absent. */
function firePlausible(event: string, props: Record<string, string>): void {
  if (typeof window === "undefined") return;
  const w = window as unknown as { plausible?: (e: string, o?: { props: Record<string, string> }) => void };
  if (typeof w.plausible === "function") {
    w.plausible(event, { props });
  }
}

/** RFC-5322-lite email validation — sufficient for client-side gating. */
export function isValidEmail(email: string): boolean {
  if (!email || email.length > 254) return false;
  // Reject whitespace, require local-part + "@" + domain with a dot.
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/** Lead-magnet copy — referenced by the form and the welcome sequence. */
export const LEAD_MAGNETS: Record<LeadMagnetId, { title: string; blurb: string }> = {
  "first-day-noosa": {
    title: "Your first day in Noosa",
    blurb:
      "A 5-page PDF on how to spend your first 24 hours in Noosa Heads — surf window timing, Hastings Street walk, lunch and a sunset plan.",
  },
  "where-to-stay-noosa": {
    title: "Where to stay in Noosa",
    blurb:
      "A 5-page PDF that compares Hastings Street, Noosaville, and Sunshine Beach on walkability, value, and family fit.",
  },
  "weekly-dispatch": {
    title: "The weekly Noosa dispatch",
    blurb:
      "Every Wednesday. Conditions, the things to book, and one local story from the shire. Unsubscribe in one click.",
  },
};
