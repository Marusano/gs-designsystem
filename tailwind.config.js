/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        roboto: ['Roboto', 'sans-serif'],
      },
      fontSize: {
        'btn': ['14px', { lineHeight: '16px', fontWeight: '500' }],
      },
      borderRadius: {
        'btn': '4px',
      },
      // GSFleet design token palette
      colors: {
        // Primitives
        'grey': {
          '00': '#ffffff',
          '05': '#f7f7f8',
          '10': '#f1f1f2',
          '20': '#e6e6e7',
          '30': '#d8d8da',
          '40': '#c3c5c9',
          '50': '#b0b2b7',
          '60': '#8c8f96',
          '70': '#5d6065',
          '80': '#4a4c4f',
          '90': '#36383b',
          '100': '#1f2124',
        },
        'blue': {
          '10': '#e8f5ff',
          '20': '#b3e1f7',
          '30': '#61bde9',
          '40': '#39ade3',
          '50': '#138bc3',
          '60': '#0369a1',
          '80': '#013b57',
        },
        'red': {
          '10': '#fef2f2',
          '20': '#fca5a5',
          '30': '#f87171',
          '40': '#f94144',
          '50': '#dc2626',
          '60': '#b91c1c',
        },
        // Semantic button tokens
        'btn-primary': {
          bg:             '#010028',
          hover:          '#5d6065',
          focus:          '#5d6065',
          active:         '#5d6065',
          'disabled-bg':  '#f1f1f2',
          'ring-focus':   '#b3e1f7',
          'ring-active':  '#61bde9',
        },
        'btn-secondary': {
          bg:            '#ffffff',
          hover:         '#f1f1f2',
          focus:         '#f1f1f2',
          active:        '#f1f1f2',
          text:          '#36383b',
          border:        '#5d6065',
          'border-hover':'#36383b',
          'ring-focus':  '#b3e1f7',
          'ring-active': '#61bde9',
          'disabled-border': '#e6e6e7',
        },
        'btn-disabled': {
          bg:   '#f1f1f2',
          text: '#b0b2b7',
        },
      },
    },
  },
  plugins: [],
}
