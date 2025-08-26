/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Duolingo-style emerald greens (brighter and more vibrant)
        emerald: {
          50: '#f0fdf4',   // Very light green background
          100: '#dcfce7',  // Light green
          200: '#bbf7d0',  // Light green for cards
          300: '#86efac',  // Medium light green
          400: '#4ade80',  // Bright green for active states
          500: '#22c55e',  // Main bright green for header/buttons
          600: '#16a34a',  // Darker green for active buttons
          700: '#15803d',  // Dark green for text
          800: '#166534',  // Very dark green
          900: '#14532d',  // Darkest green
          950: '#052e16',
        },
        lime: {
          50: '#f7fee7',
          100: '#ecfccb', 
          200: '#d9f99d',
          300: '#bef264',
          400: '#a3e635',
          500: '#84cc16',  // Bright lime accent
          600: '#65a30d',
          700: '#4d7c0f',
          800: '#3f6212',
          900: '#365314',
        },
        sky: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',  // Blue for type badges
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        }
      },
    },
  },
  plugins: [],
};