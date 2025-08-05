module.exports = {
      content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // залежно від типу проєкту
  ],
  theme: {
    extend: {
      backgroundImage: {
        'mobile-bg': "url('/my-react-app/public/bg-mobile.png')",
        'tablet-bg': "url('/my-react-app/public/bg-tablet.png')",
        'desktop-bg': "url('/my-react-app/public/bg-desktop.png')",
      },
    },
  },
   plugins: [],
};