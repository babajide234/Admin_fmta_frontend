/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line no-undef
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        lightPrimary: "#19B8ED",
        secondary: "#001973",
      },
    },
  },
  plugins: [],
};
