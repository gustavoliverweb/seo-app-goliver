import type { Config } from "tailwindcss";

// bg-prymary-button-500
const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontSize: {
      base: "1.125rem",
      title: "1.75rem",
    },
    extend: {
      gridTemplateColumns: {
        "13": "repeat(13, minmax(0, 1fr))",
      },

      colors: {
        blue: {
          400: "#2589FE",
          500: "#0070F3",
          600: "#2F6FEB",
        },
        "primary-button": {
          500: "#794BD8",
        },
        "primary-text": {
          500: "#101010",
        },
        "secondary-green": {
          500: "#4CD88A",
        },
        "text-opacity": {
          500: "#757575",
        },
        "border-opacity": {
          500: "D0D5DD",
        },
        errors: {
          "success-dark": "#124B14",
          "success-light": "#A4E5A6",
          "error-dark": "#6F1313",
          "error-light": "#D78282",
          "warning-light": "#F4CF6D",
          "warning-dark": "#3D300E",
        },
      },
    },
    keyframes: {
      shimmer: {
        "100%": {
          transform: "translateX(100%)",
        },
      },
    },
  },

  plugins: [require("@tailwindcss/forms")],
};
export default config;
