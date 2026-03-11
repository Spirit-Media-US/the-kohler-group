import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
	output: 'static',

	site: 'https://thekohlergroup.com',

	integrations: [sitemap()],

	vite: {
		server: { allowedHosts: true },
		plugins: [tailwindcss()],
	},
});
