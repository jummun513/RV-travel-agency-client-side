/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#ffb700',
        secondary: '#f2af04',
        accent: '#DFE0DF',
        disabled: '#ffb700',
        highlight: '#402E32',
        neutral: '#006775',
        'base-100': '#ffffff',
        'base-900': '#000000',
        'bg-color': '#FFF8F0'
      },
      screens: {
        xxs: '384px',
        xs: '512px',
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px',
        '3xl': '1792px',
        '4xl': '2048px',
      }
    },
    daisyui: {
      themes: [],
    },
  },
  plugins: [require("daisyui")],
}

