import type { Config } from "tailwindcss";
import { withUt } from "uploadthing/tw";


export default withUt({
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        'base': '#FFF8E8',
        'accent': '#D5734E'
      },
      fontFamily: {
        rubik: ['var(--font-rubik)'],
        radley: ['var(--font-radley)'],
        roboto: ['var(--font-roboto)'],
        poppins: ['var(--font-poppins)']
      },
    },
  },
  plugins: [],
});

