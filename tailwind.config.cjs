/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        turquoise: '#14B8A6',
        charcoal: '#0f172a',
        mist: '#f8fafc'
      },
      fontFamily: {
        display: ['"Plus Jakarta Sans"', 'ui-sans-serif', 'system-ui'],
        body: ['"Plus Jakarta Sans"', 'ui-sans-serif', 'system-ui']
      },
      boxShadow: {
        soft: '0 10px 35px rgba(20, 184, 166, 0.15)'
      }
    }
  },
  plugins: [require('@tailwindcss/forms')]
};
