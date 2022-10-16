/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    primary: "#f9a1bc",
    secondary: "#ecc94b",
    extend: {},
    fontFamily: {
      sans: ["'Libre Franklin', sans-serif"],
      serif: ["'Libre Franklin', sans-serif"],
      mono: ["ui-monospace"],
      display: ["'Libre Franklin', sans-serif"],
      body: ["'Libre Franklin', sans-serif"],
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
