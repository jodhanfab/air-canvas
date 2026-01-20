import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      animation: {
        'float': 'float 4s ease-in-out infinite',
        'bounce-slow': 'bounce-slow 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': {
            transform: 'translateY(0) translateX(0)',
            opacity: '0.2',
          },
          '50%': {
            transform: 'translateY(-20px) translateX(10px)',
            opacity: '0.8',
          },
        },
        'bounce-slow': {
          '0%, 100%': {
            transform: 'translateY(0)',
          },
          '50%': {
            transform: 'translateY(-10px)',
          },
        },
      },
    },
  },
  plugins: [],
};
export default config;
