/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        idbiTeal: "#00836C",
        idbiTealDark: "#006657",
        idbiTealDeep: "#073F37",
        idbiTealLight: "#E7F5F2",

        idbiOrange: "#F37021",
        idbiOrangeDark: "#D95E14",
        idbiOrangeLight: "#FFF0E6",

        pageBackground: "#F5F8F7",
        surface: "#FFFFFF",
        surfaceMuted: "#F8FAF9",
        border: "#DCE7E4",

        textPrimary: "#162522",
        textSecondary: "#5B6B67",
        textMuted: "#81908C",

        success: "#2E7D32",
        successLight: "#EAF6EB",

        amber: "#D98B00",
        amberLight: "#FFF7E3",

        danger: "#C93B37",
        dangerLight: "#FDEDEC",

        information: "#2767A7",
        informationLight: "#EAF3FB"
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}

