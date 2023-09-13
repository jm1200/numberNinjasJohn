import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        xs: "480px", // or whatever value you want for xs
      },
    },
  },
  plugins: [],
} satisfies Config;
