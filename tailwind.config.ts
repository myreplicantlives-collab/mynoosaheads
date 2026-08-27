import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

/**
 * Sprint 1.2 — Design system tokens (per Albert's MSN-2956-01 design brief).
 *
 * Three-tier architecture:
 *   1. CSS custom properties (src/app/globals.css) — source of truth at runtime.
 *   2. Tailwind tokens below — bind utility classes (bg-paper-50, text-ink-900)
 *      to those CSS vars so component code stays declarative.
 *   3. Components (src/components/ui/*) — consume Tailwind utilities.
 *
 * Palette: 7 brand colours × 11 shades (50–950) = 77 ramps. The 50/100/200
 * bands are the "paper/surface" cream tones; the 600/700/800 are the deep
 * brand colours (eucalyptus green, sunset coral, ocean blue); 900/950 are
 * ink for body copy.
 *
 * Typography: 3 fonts — Fraunces (display serif), Inter (body sans),
 * Caveat (accent handwritten). All SIL OFL 1.1, loaded via next/font in
 * src/app/layout.tsx. Tokens below assume the CSS variables `--font-display`,
 * `--font-body`, `--font-accent` are set globally.
 */

const config: Config = {
  content: [
    "./src/**/*.{ts,tsx,mdx}",
    "./content/**/*.{md,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // ────────────────────────────────────────────────────────────
        // Paper & surface — warm parchment / cream (Sprint 1.1 base)
        // ────────────────────────────────────────────────────────────
        paper: {
          50: "var(--paper-50)",
          100: "var(--paper-100)",
          200: "var(--paper-200)",
          300: "var(--paper-300)",
          400: "var(--paper-400)",
          500: "var(--paper-500)",
          600: "var(--paper-600)",
          700: "var(--paper-700)",
          800: "var(--paper-800)",
          900: "var(--paper-900)",
          950: "var(--paper-950)",
        },
        // ────────────────────────────────────────────────────────────
        // Ink — body text (warm dark, not pure black)
        // ────────────────────────────────────────────────────────────
        ink: {
          50: "var(--ink-50)",
          100: "var(--ink-100)",
          200: "var(--ink-200)",
          300: "var(--ink-300)",
          400: "var(--ink-400)",
          500: "var(--ink-500)",
          600: "var(--ink-600)",
          700: "var(--ink-700)",
          800: "var(--ink-800)",
          900: "var(--ink-900)",
          950: "var(--ink-950)",
        },
        // ────────────────────────────────────────────────────────────
        // Eucalyptus — primary brand (replaces teal/ocean in Sprint 1.1)
        // ────────────────────────────────────────────────────────────
        eucalyptus: {
          50: "var(--eucalyptus-50)",
          100: "var(--eucalyptus-100)",
          200: "var(--eucalyptus-200)",
          300: "var(--eucalyptus-300)",
          400: "var(--eucalyptus-400)",
          500: "var(--eucalyptus-500)",
          600: "var(--eucalyptus-600)",
          700: "var(--eucalyptus-700)",
          800: "var(--eucalyptus-800)",
          900: "var(--eucalyptus-900)",
          950: "var(--eucalyptus-950)",
        },
        // ────────────────────────────────────────────────────────────
        // Ocean — secondary brand (deep water blue, hyperlink + accent)
        // ────────────────────────────────────────────────────────────
        ocean: {
          50: "var(--ocean-50)",
          100: "var(--ocean-100)",
          200: "var(--ocean-200)",
          300: "var(--ocean-300)",
          400: "var(--ocean-400)",
          500: "var(--ocean-500)",
          600: "var(--ocean-600)",
          700: "var(--ocean-700)",
          800: "var(--ocean-800)",
          900: "var(--ocean-900)",
          950: "var(--ocean-950)",
        },
        // ────────────────────────────────────────────────────────────
        // Rainforest — accent green (park alerts, calm seas)
        // ────────────────────────────────────────────────────────────
        rainforest: {
          50: "var(--rainforest-50)",
          100: "var(--rainforest-100)",
          200: "var(--rainforest-200)",
          300: "var(--rainforest-300)",
          400: "var(--rainforest-400)",
          500: "var(--rainforest-500)",
          600: "var(--rainforest-600)",
          700: "var(--rainforest-700)",
          800: "var(--rainforest-800)",
          900: "var(--rainforest-900)",
          950: "var(--rainforest-950)",
        },
        // ────────────────────────────────────────────────────────────
        // Coral — accent (sunset dot, alerts, road closures)
        // ────────────────────────────────────────────────────────────
        coral: {
          50: "var(--coral-50)",
          100: "var(--coral-100)",
          200: "var(--coral-200)",
          300: "var(--coral-300)",
          400: "var(--coral-400)",
          500: "var(--coral-500)",
          600: "var(--coral-600)",
          700: "var(--coral-700)",
          800: "var(--coral-800)",
          900: "var(--coral-900)",
          950: "var(--coral-950)",
        },
        // ────────────────────────────────────────────────────────────
        // Sand — sun/UV warm tone (subtle bands)
        // ────────────────────────────────────────────────────────────
        sand: {
          50: "var(--sand-50)",
          100: "var(--sand-100)",
          200: "var(--sand-200)",
          300: "var(--sand-300)",
          400: "var(--sand-400)",
          500: "var(--sand-500)",
          600: "var(--sand-600)",
          700: "var(--sand-700)",
          800: "var(--sand-800)",
          900: "var(--sand-900)",
          950: "var(--sand-950)",
        },
        // ────────────────────────────────────────────────────────────
        // Backwards-compat aliases (Sprint 1.1 → Sprint 1.2 migration)
        // bg, surface, text, text-muted, ocean, rainforest, coral keep
        // working so we don't break existing utilities during the upgrade.
        // ────────────────────────────────────────────────────────────
        bg: "var(--color-bg)",
        surface: "var(--color-surface)",
        text: "var(--color-text)",
        "text-muted": "var(--color-text-muted)",
      },
      fontFamily: {
        // `display` is the editorial serif (Fraunces).
        // `body` is the workhorse sans (Inter).
        // `accent` is the handwritten note (Caveat) — use sparingly.
        display: ['var(--font-display)', "ui-serif", "Georgia", "serif"],
        body: ['var(--font-body)', "ui-sans-serif", "system-ui", "sans-serif"],
        accent: ['var(--font-accent)', "cursive"],
        mono: ["ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
      },
      fontSize: {
        // Type scale — Sprint 1.5 (MSN-2958, Albert brief).
        // Chair feedback (2026-08-27 14:46 BST): font too large.
        // Composite headline drop ~18 %. Display pieces top out at 40 px
        // (down from 48 px). Body anchored at 16 px (down from 18 px).
        // The fluid clamps live in CSS custom properties (globals.css)
        // — Tailwind utilities just bind to them.
        "display-xl": [
          "var(--text-display-xl)",
          { lineHeight: "1.18", letterSpacing: "-0.02em", fontWeight: "600" },
        ],
        "display-lg": [
          "var(--text-display-lg)",
          { lineHeight: "1.18", letterSpacing: "-0.02em", fontWeight: "600" },
        ],
        "display-md": [
          "var(--text-display-md)",
          { lineHeight: "1.18", letterSpacing: "-0.02em", fontWeight: "600" },
        ],
        "display-sm": [
          "var(--text-display-sm)",
          { lineHeight: "1.28", letterSpacing: "-0.015em", fontWeight: "500" },
        ],
        "headline-lg": [
          "var(--text-headline-lg)",
          { lineHeight: "1.28", letterSpacing: "-0.012em", fontWeight: "500" },
        ],
        "headline-md": [
          "var(--text-headline-md)",
          { lineHeight: "1.28", letterSpacing: "-0.01em", fontWeight: "500" },
        ],
        "headline-sm": [
          "var(--text-headline-sm)",
          { lineHeight: "1.3", letterSpacing: "-0.008em", fontWeight: "500" },
        ],
        "body-lg": [
          "var(--text-body-lg)",
          { lineHeight: "1.6", letterSpacing: "0", fontWeight: "400" },
        ],
        body: [
          "var(--text-body-md)",
          { lineHeight: "1.6", letterSpacing: "0", fontWeight: "400" },
        ],
        "body-sm": [
          "var(--text-body-sm)",
          { lineHeight: "1.55", letterSpacing: "0", fontWeight: "400" },
        ],
        caption: [
          "var(--text-caption)",
          { lineHeight: "1.45", letterSpacing: "0.01em", fontWeight: "500" },
        ],
        eyebrow: [
          "var(--text-eyebrow)",
          // Sprint 1.5: tighter tracking on uppercase labels (0.08em → 0.12em
          // is in CSS, the Tailwind utility stays at the same base 12 px).
          { lineHeight: "1.3", letterSpacing: "0.12em", fontWeight: "600" },
        ],
        code: [
          "var(--text-code)",
          { lineHeight: "1.5", letterSpacing: "0", fontWeight: "400" },
        ],
        "accent-lg": [
          "var(--text-accent-lg)",
          { lineHeight: "1.2", letterSpacing: "0.005em", fontWeight: "500" },
        ],
        "accent-md": [
          "var(--text-accent-md)",
          { lineHeight: "1.25", letterSpacing: "0.005em", fontWeight: "500" },
        ],
      },
      borderRadius: {
        sm: "4px",
        DEFAULT: "8px",
        md: "10px",
        lg: "14px",
        xl: "20px",
        "2xl": "28px",
        pill: "999px",
      },
      boxShadow: {
        // Soft, warm shadows that read as paper-on-paper, not chrome-on-glass.
        sm: "0 1px 2px rgba(37, 31, 23, 0.04)",
        DEFAULT: "0 2px 6px rgba(37, 31, 23, 0.06), 0 1px 2px rgba(37, 31, 23, 0.04)",
        md: "0 6px 14px rgba(37, 31, 23, 0.07), 0 2px 4px rgba(37, 31, 23, 0.05)",
        lg: "0 14px 30px rgba(37, 31, 23, 0.10), 0 4px 8px rgba(37, 31, 23, 0.05)",
        xl: "0 24px 50px rgba(37, 31, 23, 0.14), 0 8px 16px rgba(37, 31, 23, 0.06)",
        // Glow ring (used by live-data tiles + cards with attention state).
        ring: "0 0 0 3px rgba(31, 90, 111, 0.18)",
      },
      maxWidth: {
        prose: "68ch",
        "container-7xl": "80rem",
        "container-6xl": "72rem",
      },
      spacing: {
        // Editorial spacing scale (8-pt grid with 4-pt half-steps for fine work).
        "10": "2.5rem",
        "14": "3.5rem",
        "18": "4.5rem",
        "22": "5.5rem",
        "30": "7.5rem",
      },
      transitionDuration: {
        DEFAULT: "180ms",
      },
      keyframes: {
        "fade-in": {
          from: { opacity: "0", transform: "translateY(4px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-in": "fade-in 220ms ease-out both",
      },
    },
  },
  plugins: [typography],
};

export default config;
