import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        canvas:  "#ffffff",
        surface: "#f6f8fa",
        border:  "#d0d7de",
        text:    "#1f2328",
        muted:   "#636c76",
        accent:  "#2563eb",
        "accent-hover": "#1d4ed8",
        "accent-subtle": "#eff6ff",
      },
      fontFamily: {
        sans: ["-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"],
        mono: ["JetBrains Mono", "Fira Code", "monospace"],
      },
    },
  },
  plugins: [],
}

export default config