import type { Config } from "tailwindcss";
const {nextui} = require("@nextui-org/react");


export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        backgroundColors:{
          1:"#DCDCDC1A",
          2:"#DCDCDC4D"
        },
        main:{
          1:"#113378",
          2:"#DCDCDC",
        },
        text:{
          1:"#949494",
          2:"#113378"
        },
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [nextui()],
} satisfies Config;


