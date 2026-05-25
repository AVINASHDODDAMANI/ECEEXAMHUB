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
        portal: {
          50: "#f4f8ff",
          100: "#eaf2fb",
          200: "#d4e3f3",
          300: "#aac4df",
          400: "#759dc6",
          500: "#4779ab",
          600: "#255d91",
          700: "#1f4b75",
          800: "#1d3e60",
          900: "#18324f",
        },
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
        panel: "0 14px 34px rgba(31, 50, 75, 0.07)",
        portal: "0 10px 24px rgba(31, 75, 117, 0.07)",
      },
      backgroundImage: {
        mesh:
          "radial-gradient(circle at top left, rgba(245, 158, 11, 0.18), transparent 35%), radial-gradient(circle at bottom right, rgba(101, 125, 183, 0.2), transparent 30%)",
        "app-shell":
          "linear-gradient(180deg, rgba(248, 250, 252, 0.92) 0%, rgba(241, 245, 249, 0.94) 100%)",
        "hero-glow":
          "radial-gradient(circle at center, rgba(148, 163, 184, 0.2), rgba(255, 255, 255, 0))",
      },
    },
  },
  plugins: [],
};
