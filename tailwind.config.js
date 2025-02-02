const withMT = require("@material-tailwind/react/utils/withMT");
 
module.exports = withMT({
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        goldDark: '#62522B',
        gold: '#D4AF37',
        grayCustom: '#232323'
      },
      backgroundImage: {
        "gold-gradient": "linear-gradient(to right, #62522B, #D4AF37, #62522B)",
      },
    },
  },
  plugins: [],
});