/* eslint-disable quote-props */
// tailwind.config.js

module.exports = {
  purge: {
    content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
    options: {
      safelist: [
        'bg-chicken',
        'bg-beef',
        'bg-turkey',
        'bg-lamb',
        'bg-kibble-chicken',
        'bg-kibble-turkey+salmon',
        'bg-kibble-duck',
        'w-1/5',
        'w-2/5',
        'w-3/5',
        'w-4/5',
        'w-5/5',
      ],
    },
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      textColor: {
        primary: '#239C6D',
        secondary: '#124E37',
        charcoal: '#414141',
        lightGrey: '#525252',
        fadeGrey: '#2a3c49',
      },
      backgroundColor: {
        container: '#F2F5F4',
        primary: '#239C6D',
        account: '#F2F5F4',
        promptYellow: '#FFF5E7',
        recipeGray: '#F2F5F4',
        skinColor: '#fff5e8',
        chicken: '#FF9C63',
        beef: '#239C6D',
        turkey: '#875D45',
        lamb: '#9EC694',
        kibble: {
          chicken: '#eebd5e',
          'turkey+salmon': '#FE766D',
          duck: '#91CEB6',
        },
        label: '#2F3D33',
        deliveryStepper:'#FBFBFB'
      },
      borderWidth: {
        '3': '1.72532px',
      },
      borderColor: {
        green: '#239C6D',
        chicken: '#FF9C63',
        beef: '#239C6D',
        turkey: '#875D45',
        lamb: '#9EC694',
        kibble: {
          chicken: '#FECD6D',
          'turkey+salmon': '#FE766D',
          duck: '#91CEB6',
        },
        label: '#2F3D33',
      },
      borderWidth: {
        '3': '1.72532px',
      },
      borderColor: {
        green: '#239C6D',
        chicken: '#FF9C63',
        beef: '#239C6D',
        turkey: '#875D45',
        lamb: '#9EC694',
        kibble: {
          chicken: '#FECD6D',
          'turkey+salmon': '#FE766D',
          duck: '#91CEB6',
        },
      },
      borderRadius: {
        '1lg': '0.625rem',
        '2lg': '0.9rem',
        '5md': '5.75108px',
        '6md': '9px',
      },
      margin: {
        1.3: '0.312rem',
        4.5: '1.125rem',
        5.5: '1.375rem',
      },
      padding: {
        4.5: '1.125rem',
      },
      boxShadow: {
        modal: '0px 8px 40px rgb(0 0 0 / 20%)',
        green: 'inset 0px 0px 0px 3px #239C6D',
        tableBoxShadow: '0px 4px 28px rgba(0, 0, 0, 0.04)',
        light: '0px 4px 28px rgba(0, 0, 0, 0.04)',
      },
      width: {
        7.3: '1.875rem',
        13: '3.25rem',
      },
      maxWidth: {
        23: '23rem',
      },
    },
    fontFamily: {
      messina: ['Messinasans, sans-serif'],
      cooper: ['Cooper', 'sans-serif'],
      sofiaPro: ['sofia-pro'],
      mackinac: ['p22-mackinac-pro'],
      recoleta: ['Recoleta', 'sans-serif'],
    },
    container: {
      center: true,
      screens: {
        xl: '1280px',
      },
    },
    gridTemplateColumns: {
      // Simple 16 column grid
      '6/4': '55fr 45fr',
      '1': 'repeat(1, minmax(0, 1fr))',
      '2': 'repeat(2, minmax(0, 1fr))',
      '3': 'repeat(3, minmax(0, 1fr))',
      '4': 'repeat(4, minmax(0, 1fr))',
      '5': 'repeat(5, minmax(0, 1fr))',
      '6': 'repeat(6, minmax(0, 1fr))',
      '7': 'repeat(7, minmax(0, 1fr))',
      '8': 'repeat(8, minmax(0, 1fr))',
      '9': 'repeat(9, minmax(0, 1fr))',
      '10': 'repeat(10, minmax(0, 1fr))',
      '11': 'repeat(11, minmax(0, 1fr))',
      '12': 'repeat(12, minmax(0, 1fr))',
      none: 'none',
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
