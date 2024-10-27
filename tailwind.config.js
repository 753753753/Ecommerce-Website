/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        secondary: 'rgba(219, 68, 68, 1)',
      },
      textColor: {
        secondary: 'rgba(219, 68, 68, 1)',
      },
      
    },
    },
  plugins: [],
}

