/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {},
    fontFamily: {
      'body': ['"Open Sans"'],
    }
  },
  plugins: [require("daisyui")],
}

