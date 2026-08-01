import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        gray: {
          50: 'var(--color-gray-50)',
          100: 'var(--color-gray-100)',
          200: 'var(--color-gray-200)',
          300: 'var(--color-gray-300)',
        },
        primary: {
          DEFAULT: 'var(--color-primary)',
          hover: 'var(--color-primary-hover)',
          light: 'var(--color-primary-light)',
        },
        success: {
          DEFAULT: '#16A34A',
          light: '#F0FDF4',
        },
        warning: {
          DEFAULT: '#D97706',
          light: '#FFFBEB',
        },
        danger: {
          DEFAULT: '#DC2626',
          light: '#FEF2F2',
        },
        /* Core surface colors — driven by CSS variables for dark mode */
        appBg: 'var(--color-app-bg)',
        cardBg: 'var(--color-card-bg)',
        borderClr: 'var(--color-border)',
        hoverBg: 'var(--color-hover-bg)',
        tableHeaderBg: 'var(--color-table-header-bg)',
        txtPrimary: 'var(--color-txt-primary)',
        txtSecondary: 'var(--color-txt-secondary)',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      maxWidth: {
        'page': '1600px',
      },
      height: {
        'topbar': '72px',
      },
    },
  },
  plugins: [],
};
export default config;
