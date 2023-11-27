/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        '3xl': ' rgba(255, 75, 41) 0px 22px 70px 4px  ;',
      }
    },
  },
  plugins: [],
}