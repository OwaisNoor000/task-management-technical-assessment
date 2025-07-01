// tailwind.config.js
module.exports = {
  purge: [],
  darkMode: false,
  theme: {
    extend: {
      colors: {
        myred: "#3C3C3C",      // <-- FIXED
        mylgray: "#262626",
        mydgray: "#1E1E1E",
        myblue: "#5297FF",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
