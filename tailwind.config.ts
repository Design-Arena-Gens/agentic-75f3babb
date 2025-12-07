import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"]
      },
      colors: {
        midnight: {
          50: "#f4f6ff",
          100: "#e7ebff",
          200: "#cfd7ff",
          300: "#a5b4ff",
          400: "#7586ff",
          500: "#4957ff",
          600: "#333ce6",
          700: "#242bb4",
          800: "#1f2490",
          900: "#1f246f",
          950: "#11143f"
        }
      }
    }
  },
  plugins: []
};

export default config;
