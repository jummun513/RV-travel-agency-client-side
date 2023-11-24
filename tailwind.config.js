/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'login-back': "url('https://ik.imagekit.io/kkfhvwmzt/01.%20RV%20Project/all%20background/login-background.jpg?updatedAt=1698410626986')",
        'login-front': "url('https://ik.imagekit.io/kkfhvwmzt/01.%20RV%20Project/all%20background/login-foreground.jpg?updatedAt=1698410625446')",
        'worldExploreBg': "url('https://ik.imagekit.io/kkfhvwmzt/01.%20RV%20Project/all%20background/world-explore-bg.jpg?updatedAt=1698410626724')",
        'privacy&policy': "url('/src/assets/images/privacy&policy.png')",
        'chairmanLarge': "url('/src/assets/images/chairman.png')",
        'chairmanSmall': "url('/src/assets/images/chairman-small.png')",
        'directorLarge': "url('/src/assets/images/director.png')",
        'directorSmall': "url('/src/assets/images/director-small.png')",
      },
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
      aspectRatio: {
        '4/3': '4 / 3',
        '16/9': '16 / 9',
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

