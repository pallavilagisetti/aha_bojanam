/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'restaurant-red': '#DC2626',
        'restaurant-dark': '#1F2937',
      },
    },
  },
  plugins: [],
}


