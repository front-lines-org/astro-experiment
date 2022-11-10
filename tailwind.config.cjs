/** @type {import('tailwindcss').Config} */
module.exports = {
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#f472b6",
          secondary: "#34d399",
          accent: "#60a5fa",
          neutral: "#191D24",
          "base-100": "#ffffff",
          info: "#95B8F9",
          success: "#34d399",
          warning: "#DFBD11",
          error: "#F64C79",
        },
      },
    ],
  },
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
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
};
