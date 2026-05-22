/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class', '[data-theme="dark"]'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'monospace'],
      },
      colors: {
        background: 'rgb(var(--color-background) / <alpha-value>)',
        surface: 'rgb(var(--color-surface) / <alpha-value>)',
        'surface-raised': 'rgb(var(--color-surface-raised) / <alpha-value>)',
        border: 'rgb(var(--color-border) / <alpha-value>)',
        'text-primary': 'rgb(var(--color-text-primary) / <alpha-value>)',
        'text-secondary': 'rgb(var(--color-text-secondary) / <alpha-value>)',
        'text-muted': 'rgb(var(--color-text-muted) / <alpha-value>)',
        accent: 'rgb(var(--color-accent) / <alpha-value>)',
      },
      animation: {
        'fade-in': 'fadeIn 0.2s ease-in-out',
        'fade-in-down': 'fadeInDown 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInDown: {
          '0%': { opacity: '0', transform: 'translateY(-2px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            color: 'rgb(var(--color-text-primary))',
            a: {
              color: 'rgb(var(--color-accent))',
              '&:hover': {
                opacity: '0.8',
              },
            },
            headings: {
              color: 'rgb(var(--color-text-primary))',
            },
            'h1, h2, h3, h4, h5, h6': {
              fontWeight: '600',
            },
            code: {
              color: 'rgb(var(--color-text-primary))',
              backgroundColor: 'rgb(var(--color-surface-raised))',
              padding: '0.25rem 0.5rem',
              borderRadius: '0.375rem',
            },
            'code::before': {
              content: '""',
            },
            'code::after': {
              content: '""',
            },
            pre: {
              backgroundColor: 'rgb(var(--color-surface-raised))',
              color: 'rgb(var(--color-text-primary))',
            },
            table: {
              borderColor: 'rgb(var(--color-border))',
            },
            th: {
              backgroundColor: 'rgb(var(--color-surface-raised))',
              color: 'rgb(var(--color-text-primary))',
              borderColor: 'rgb(var(--color-border))',
            },
            td: {
              borderColor: 'rgb(var(--color-border))',
            },
          },
        },
        invert: {
          css: {
            color: 'rgb(var(--color-text-primary))',
            a: {
              color: 'rgb(var(--color-accent))',
            },
          },
        },
      }),
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
