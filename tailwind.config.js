/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

export default {
  content: ["./src/**/*.{html,js,jsx,ts,tsx,mdx}"],
  theme: {
    screens: {
      xs: "275px",
      ...defaultTheme.screens,
    },
    extend: {},
  },
  plugins: [],
};
