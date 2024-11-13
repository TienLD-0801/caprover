/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './app.vue',
    './error.vue',
  ],

  theme: {
    container: {
      center: true,
      screens: {
        default: '400px',
        sm: '552px',
        md: '652px',
        lg: '752px',
        xl: '952px',
      },
    },
    extend: {
      colors: {
        main: 'var(--color-main)',
        primary: 'var(--color-primary)',
        error: 'var(--color-error)',
        grey: 'var(--color-grey)',
        body: 'var(--color-body)',
        black: 'var(--color-black)',
        white: 'var(--color-white)',
        C01: 'var(--color-C01)',
        C02: 'var(--color-C02)',
        C03: 'var(--color-C03)',
        C04: 'var(--color-C04)'
      },
      boxShadow: {
        box_shadow: 'var(--box-shadow)',
        box_shadow_1: 'var(--box-shadow_1)',
        box_shadow_2: 'var(--box-shadow_2)',
      },
    },
    fontSize: {
      sm: '16px',
      md: '20px',
      lg: '22px',
      xl: '24px',
      xxl: '26px',
    },
  },

  plugins: [],
};
