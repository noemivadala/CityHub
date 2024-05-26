/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#e5e7eb',
        secondary: '#1f2937',
      },
    },
    fontFamily: {
      'body': ['"Open Sans"'],
    }
  },
  plugins: [require("daisyui")],
}

