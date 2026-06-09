import type { Config } from "tailwindcss";

export default {
  darkMode: "media",
  content: ["./app/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui"],
        mono: ["JetBrains Mono", "ui-monospace", "monospace"],
      },
      keyframes: {
        "select-in": {
          from: { opacity: "0", transform: "translateY(-4px) scale(.98)" },
          to: { opacity: "1", transform: "translateY(0) scale(1)" },
        },
      },
      animation: {
        "select-in": "select-in .16s ease-out",
      },
    },
  },
  plugins: [],
} satisfies Config;
