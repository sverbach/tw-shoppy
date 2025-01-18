import * as tokens from './figma.tokens.json';

function mapTokens(tokens) {
  const mappedTokens = {
    borderRadius: {},
    fontSize: {},
    colors: {
      primary: {},
      secondary: {},
      accent: {},
      shadows: {},
      border: {},
    },
  };

  // Map borderRadius
  if (tokens.core.borderRadius) {
    for (const key in tokens.core.borderRadius) {
      mappedTokens.borderRadius[key] = `${tokens.core.borderRadius[key].$value}px`;
    }
  }

  // Map fontSizes
  if (tokens.core.fontSizes) {
    for (const key in tokens.core.fontSizes) {
      mappedTokens.fontSize[key] = `${tokens.core.fontSizes[key].$value}px`;
    }
  }

  // Map colors
  if (tokens.light) {
    for (const key in tokens.light) {
      for (const subkey in tokens.light[key]) {
        mappedTokens.colors[key][subkey] = tokens.light[key][subkey].$value;
      }
    }
  }

  return mappedTokens;
}

const mappedTokens = mapTokens(tokens);

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    ...mappedTokens,
    extend: {
      dropShadow: {
        xs: '4px 4px 0 rgba(0, 0, 0, 1)',
        sm: '6px 6px 0 rgba(0, 0, 0, 1)',
        md: '10px 12px 0 rgba(0, 0, 0, 1)',
        lg: '16px 20px 0 rgba(0, 0, 0, 1)',
      },
      fontFamily: {
        sans: ['Space Grotesk', 'sans'],
      },
    },
  },
  plugins: [require('@tailwindcss/aspect-ratio')],
};
