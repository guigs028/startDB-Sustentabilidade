/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // mudar dps se necessario
        brand: {
          500: '#2E7D32', 
          600: '#1b5e20',
        },
        surface: '#F5F5F5'
      }
    },
  },
  plugins: [],
}