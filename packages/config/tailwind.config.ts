import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "../../apps/**/*.{js,ts,jsx,tsx}",
    "../../packages/ui/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "hsl(var(--brand-primary))",
        secondary: "hsl(var(--brand-secondary))",
        success: "hsl(var(--status-success))",
        error: "hsl(var(--status-error))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
      },
      borderRadius: {
        default: "var(--radius-default)",
      },
    },
  },
  plugins: [],
};

export default config;
