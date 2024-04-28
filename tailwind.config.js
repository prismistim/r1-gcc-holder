/** @type {import('tailwindcss').Config} */
import daisyui from 'daisyui'

export default {
  content: ['./index.html', './src/**/*.{js,ts,vue}'],
  theme: {
    extend: {},
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        'gcch_light': {
          primary: '#f43f5e',
          'primary-content': '#262626',
          secondary: '#ddd',
          accent: '#2dd4bf',
          neutral: '#e5e7eb',
          'base-100': '#f3f4f6',
          info: '#38bdf8',
          success: '#4ade80',
          warning: '#fbbf24',
          error: '#ef4444',
          white: '#ffffff'
        },
      },
      'black',
    ],
  },
}
