export default {
      content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", 
  ],
  theme: {
    extend: {
      backgroundImage: {
        'mobile-bg': "url('/bg-mobile.png')",
        'tablet-bg': "url('/bg-tablet.png')",
        'desktop-bg': "url('/bg-desktop.png')",
      },
    },
  },
   plugins: [],
};