const colors = require("tailwindcss/colors");

module.exports = {
  mode: "jit",
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        amber: colors.amber,
        orange: colors.orange,
      },
    },
  },
  corePlugins: {
    flexWrap: true,
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/typography")],
};
