/** @type {import('tailwindcss').Config} */
import scrollbarPlugin from 'tailwind-scrollbar';
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
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
        profileColor:'#f5fdff'
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
