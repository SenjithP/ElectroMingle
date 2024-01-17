/** @type {import('tailwindcss').Config} */
import scrollbarPlugin from 'tailwind-scrollbar';
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        shake: {
          '0%, 100%': { transform: 'rotate(0deg)' },
          '10%, 30%, 50%, 70%, 90%': { transform: 'rotate(-5deg)' },
          '20%, 40%, 60%, 80%': { transform: 'rotate(5deg)' },
          '100%': { transform: 'rotate(0deg)' },
        },
      },
      animation: {
        shake: 'shake 0.8s ease-in-out infinite',
      },

      height: {
        'full': '100%',
        'screen': '100vh',
      },
      maxHeight: {
        'halfscreen': '90.5vh',
      },
      fontFamily: {
        custom: ['Holtwood One SC', 'sans'],
      },
      colors: {
        primaryColor: "#0067FF",
        darkGrayColor: "#3B3B3B",
        lightGrayColor: "#E9E7E7",
        mediumGrayColor: "#D9D9D9",
        buttonColor: "#DF6951",
        normalTextColor: "#ffffff",
        backgroundGray: "#E7E7E7",
        profileColor:'#f5fdff',
        descColor:'#374151'
      },
     
      boxShadow:{
        panelShadow:"rgba(17,12,46,0.15) 0px 48px 100px 0px",
      }
    },
  },
  plugins: [
    scrollbarPlugin(),
  ],
}
