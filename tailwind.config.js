/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: { 950: '#061527', 900: '#0A2240', 800: '#10305A', 700: '#1A4275', 600: '#28568F' },
        aqua: { 700: '#0B7F95', 600: '#0E97B0', 500: '#14AFCB', 400: '#4CC6DC', 100: '#D9F3F8' },
        sky: { 50: '#F4FAFD', 100: '#E8F4FB', 200: '#D3EAF7', 300: '#B5DBF0' },
        ink: { 900: '#0E1B2C', 700: '#334155', 500: '#5B6B80', 300: '#A7B3C2' },
      },
      fontFamily: {
        display: ['"Fraunces"', 'Georgia', 'serif'],
        sans: ['"Manrope"', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
      },
      boxShadow: {
        card: '0 1px 2px rgba(10,34,64,.04), 0 8px 24px -12px rgba(10,34,64,.12)',
        lift: '0 2px 4px rgba(10,34,64,.05), 0 20px 40px -18px rgba(10,34,64,.25)',
      },
      maxWidth: { site: '1200px' },
    },
  },
  plugins: [],
};
