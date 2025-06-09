/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', 
  content: ["./src/**/*.{js,jsx,ts,tsx}"], 
  theme: {
    extend: {colors: {
        primary: '#002855',
        secondary: '#FFC72C',
      }},
      animation: {
    'fade-in': 'fadeIn 0.5s ease-in-out',
  }, keyframes: {
    fadeIn: {
      '0%': { opacity: 0, transform: 'scale(0.95)' },
      '100%': { opacity: 1, transform: 'scale(1)' },
    },
  },
  },
  plugins: [],
};
