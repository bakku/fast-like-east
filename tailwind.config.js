/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  safelist: [
    {
      pattern: /bg-.*/,
    },
    {
      pattern: /border-.*/,
    },
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
