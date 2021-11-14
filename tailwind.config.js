module.exports = {
  purge: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      sans: ["Roboto"],
    },
    extend: {
      typography: {
        DEFAULT: {
          css: {
            strong: {
              fontWeight: "700",
            },
            h1: {
              fontWeight: "700",
            },
          },
        },
      },
    },
    container: {
      center: true,
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/typography")],
};
