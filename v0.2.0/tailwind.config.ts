import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        muted: {
          foreground: "#6B7280",
        },
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      backgroundColor: {
        'nav': 'var(--nav-bg)',
        'dropdown': 'var(--dropdown-bg)'
      }
    },
  },
  plugins: [],
} satisfies Config;
