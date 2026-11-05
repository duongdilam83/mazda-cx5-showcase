import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        mazda: {
          red: {
            DEFAULT: "#b71520",
            light: "#dc2626",
            dark: "#820f17",
            glow: "#ff334b",
          },
          dark: {
            950: "#08090a",
            900: "#0f1115",
            850: "#15181e",
            800: "#1d2129",
            700: "#2a2f3a",
          },
          silver: {
            100: "#f5f6f8",
            200: "#e5e7eb",
            300: "#d1d5db",
            400: "#9ca3af",
          },
          gold: "#c5a059",
        },
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
