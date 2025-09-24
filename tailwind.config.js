/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Montserrat", "sans-serif"],
      },
      colors: {
        teal: {
          DEFAULT: "#008080",
          light: "#20B2AA",
          dark: "#006666",
        },
      },
    },
  },
  plugins: [],
};
