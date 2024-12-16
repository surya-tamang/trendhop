/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.jsx"],
  theme: {
    extend: {
      colors: {
        white: "#ffffff",
        black: "#050300",
        red: "#e11e20",
        green: "#018c0e",
        light: "#e4e6e4",
        primary: "#203d50",
        secondary: "#e2340f",
      },
    },
  },
  plugins: [],
};
