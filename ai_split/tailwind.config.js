/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'roboto': ['"Roboto"', 'sans-serif'],
      },
      colors: {
        'bg-black':'#0F1010',
        'smokewhite':'#F4F4F4',
        'dark-green':'#0D7342',
        'light-green':'#4ECD9D',
        'red':'#B52727'
      },
    },
  },
  plugins: [],
}

