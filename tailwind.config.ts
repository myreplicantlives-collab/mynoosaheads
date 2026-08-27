import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

// Sprint 1.1 — 7-token coastal palette (per Albert's design brief).
// Implemented as CSS custom properties in globals.css; Tailwind tokens here
// reference those variables so the runtime palette can be re-themed without
// touching the Tailwind config.
//
// Tokens:
//   1. --color-bg          (warm parchment)   page background
//   2. --color-surface     (light parchment)  card / panel surface
//   3. --color-text        (dark parchment)    primary text
//   4. --color-text-muted  (mid parchment)    secondary text
//   5. --color-ocean       (deep ocean blue)  primary brand
//   6. --color-rainforest  (rainforest green) secondary brand
//   7. --color-coral       (sunset coral)     accent
//
// TSK-2957-02 (design system) will extend these into full scales (50–900)
// once the typography + component library is finalised.

const config: Config = {
  content: [
    "./src/**/*.{ts,tsx,mdx}",
    "./content/**/*.{md,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "var(--color-bg)",
        surface: "var(--color-surface)",
        text: "var(--color-text)",
        "text-muted": "var(--color-text-muted)",
        ocean: "var(--color-ocean)",
        rainforest: "var(--color-rainforest)",
        coral: "var(--color-coral)",
        // Legacy brand scales retained so existing utilities (e.g. `bg-parchment-50`)
        // resolve during the foundation scaffold. TSK-2957-02 will deprecate.
        parchment: {
          50: "#FBF7F0",
          100: "#F5EFE3",
          200: "#E8DFCB",
          300: "#D4C7A8",
          400: "#B5A582",
          500: "#8A7A5C",
          600: "#6E6048",
          700: "#54483A",
          800: "#3B3327",
          900: "#251F17",
        },
        "ocean-scale": {
          50: "#EEF6F8",
          100: "#D6E9EF",
          200: "#A8CFD9",
          300: "#73B0C0",
          400: "#4590A8",
          500: "#28748C",
          600: "#1D5A6F",
          700: "#164456",
          800: "#0F2F3C",
          900: "#081C24",
        },
        "rainforest-scale": {
          400: "#5C8062",
          500: "#476651",
          600: "#3A5240",
          700: "#2C3D31",
        },
        "coral-scale": {
          400: "#E58A6E",
          500: "#D26A4C",
          600: "#B4503A",
        },
        sand: {
          50: "#FAF4E8",
          100: "#F4E9D2",
          200: "#E8D7B5",
        },
      },
      fontFamily: {
        serif: ['"Source Serif 4"', "ui-serif", "Georgia", "serif"],
        sans: ['"Inter"', "ui-sans-serif", "system-ui", "sans-serif"],
      },
      maxWidth: {
        prose: "68ch",
        "container-7xl": "80rem",
      },
    },
  },
  plugins: [typography],
};

export default config;