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
        background: 'var(--color-background)',
        surface: 'var(--color-surface)',
        'surface-raised': 'var(--color-surface-raised)',
        border: 'var(--color-border)',
        'text-primary': 'var(--color-text-primary)',
        'text-secondary': 'var(--color-text-secondary)',
        'text-muted': 'var(--color-text-muted)',
        accent: 'var(--color-accent)',
      },
      animation: {
        'fade-in': 'fadeIn 0.2s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
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
