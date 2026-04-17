/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./lib/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        slatebrand: {
          50: "#f6f7fb",
          100: "#eceff8",
          200: "#d7def0",
          300: "#b4c1e3",
          400: "#889bcd",
          500: "#657db7",
          600: "#4d6297",
          700: "#3e4d78",
          800: "#29324f",
          900: "#151a2a",
        },
        accent: {
          100: "#fff1db",
          300: "#ffcf7d",
          500: "#f59e0b",
          700: "#b86c00",
        },
      },
      boxShadow: {
        panel: "0 20px 45px rgba(15, 23, 42, 0.08)",
      },
      backgroundImage: {
        mesh:
          "radial-gradient(circle at top left, rgba(245, 158, 11, 0.18), transparent 35%), radial-gradient(circle at bottom right, rgba(101, 125, 183, 0.2), transparent 30%)",
      },
    },
  },
  plugins: [],
};
