/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Dark theme (default)
        dark: {
          background: '#000000',
          text: '#ffffff',
          primary: '#ff4655',
          secondary: '#b0a695',
          accent: '#0e1822',
        },
        // Dim theme
        dim: {
          background: '#15202B',
          text: '#F7F9F9',
          primary: '#1DA1F2',
          secondary: '#8899A6',
          accent: '#192734',
        },
        // Light theme
        light: {
          background: '#F7F9F9',
          text: '#0F1419',
          primary: '#1DA1F2',
          secondary: '#536471',
          accent: '#E1E8ED',
        },
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        roboto: ['Roboto', 'sans-serif'],
        dosis: ['Dosis', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

