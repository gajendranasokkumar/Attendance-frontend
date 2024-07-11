/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        moveUp: {
          '0%': { transform: 'translateY(100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      animation: {
        'moveUp': 'moveUp 0.1s forwards',
        'spin-slow': 'spin 8s linear infinite',
      },
      screens: {
        'xs': '320px',  // Extra small devices
        'sm': '640px',  // Small devices
        'md': '968px',  // Medium devices
        'lg': '1024px', // Large devices
        'xl': '1280px', // Extra large devices
        '2xl': '1536px' // 2x large devices
      }
    },
    colors:{
      bgGreen: "#006769",
      lightGreen: "#40A578",
      paleGreen: "#9DDE8B",
      yellow: "#E6FF94",
      white: "#ffffff",
      whiteSmoke: "#f5f5f5",
      red: "#f23737",
      grey: "#9EA5B1",
      lightGrey: "#78787886",
      shadeWhite: "#e4e6eb",
      loginBack: "#b5b6b7",
      selectedBlue: "#C2E7FF",
      lightBlack: "#1f1f1f",
      deepLightBlack: "#303030",
      inputBorder: "rgba(66, 66, 66, 0.537)",
      black:"#000000",
      bgLGreen: "#CCFBF1",
      txtLGreen: "#0F766E",
      bgLRed :"#FFD9D9",
      txtLRed: "#E41300",
      bgLYellow: "#FEF3C7",
      txtLYellow: "#B45309",
      bgLBlue: '#ceeaff',
      txtLBlue: "#287DBE",
      optionsHover: "#ebebeb",
      success: "#23C552",
      failure: "#F84F31"
    },
    boxShadow: {
      allBox: '0px 0px 7px rgba(55, 54, 54, 0.637)',
      lightBox: '0px 0px 3px rgba(55, 54, 54, 0.637)',
      goodShadow: '2px 2px 10px -1px rgba(0,0,0,0.33)'
    },
    backgroundImage: {
    }
  },
  plugins: [],
}

