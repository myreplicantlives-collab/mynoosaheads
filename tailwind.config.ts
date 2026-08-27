import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{ts,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Brand palette: warm parchment + coastal blue + rainforest green + sunset coral
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
        ocean: {
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
        rainforest: {
          400: "#5C8062",
          500: "#476651",
          600: "#3A5240",
          700: "#2C3D31",
        },
        coral: {
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
  plugins: [],
};

export default config;