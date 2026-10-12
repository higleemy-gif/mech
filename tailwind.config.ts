import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: "var(--navy)",
        "navy-dark": "var(--navy-dark)",
        gold: "var(--gold)",
        "gold-light": "var(--gold-light)",
        slate: "var(--slate)",
        bg: "var(--bg)",
        "bg-soft": "var(--bg-soft)",
      },
      fontFamily: {
        heading: ["var(--font-heading)"],
        body: ["var(--font-body)"],
      },
      keyframes: {
        "logo-scroll": {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
      },
      animation: {
        "logo-scroll": "logo-scroll 45s linear infinite",
      },
    },
  },
  plugins: [],
} satisfies Config;
