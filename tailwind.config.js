/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,vue}'],
  theme: {
    extend: {},
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: '#a991f7',
          secondary: '#f6d860',
          accent: '#37cdbe',
          neutral: '#222222',
          'base-100': '#222222',
        },
      },
    ],
  },
}
