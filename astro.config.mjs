import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  output: 'static',

  // Update this to your production URL
  site: 'https://thekohlergroup.com',

  integrations: [
    sitemap(),
  ],

  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
});
