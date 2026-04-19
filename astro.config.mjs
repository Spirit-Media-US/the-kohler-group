import sitemap from '@astrojs/sitemap';
import inline from '@playform/inline';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
	output: 'static',

	site: 'https://thekohlergroup.net',

	server: { port: 4325, host: true },

	build: {
		inlineStylesheets: 'auto',
	},

	integrations: [
		sitemap({
			serialize(item) {
				const url = item.url;
				// Homepage — highest priority
				if (url === 'https://thekohlergroup.net/' || url === 'https://thekohlergroup.net') {
					return { ...item, changefreq: 'weekly', priority: 1.0, lastmod: new Date().toISOString() };
				}
				// Blog posts — high priority, weekly refresh
				if (url.includes('/blog/') && !url.endsWith('/blog/')) {
					return { ...item, changefreq: 'weekly', priority: 0.9, lastmod: new Date().toISOString() };
				}
				// Blog index
				if (url.endsWith('/blog') || url.endsWith('/blog/')) {
					return { ...item, changefreq: 'weekly', priority: 0.8, lastmod: new Date().toISOString() };
				}
				// Core service pages
				if (url.includes('/intensives/')) {
					return { ...item, changefreq: 'weekly', priority: 0.9, lastmod: new Date().toISOString() };
				}
				// Key content pages
				if (url.includes('/our-therapists') || url.includes('/about') || url.includes('/testimonials')) {
					return { ...item, changefreq: 'weekly', priority: 0.8, lastmod: new Date().toISOString() };
				}
				// Education / FAQ
				if (url.includes('/education/') || url.includes('/faq')) {
					return { ...item, changefreq: 'monthly', priority: 0.7, lastmod: new Date().toISOString() };
				}
				// Legal / policy pages
				if (url.includes('/privacy') || url.includes('/nondiscrimination') || url.includes('/public-health')) {
					return { ...item, changefreq: 'yearly', priority: 0.3, lastmod: new Date().toISOString() };
				}
				// Default
				return { ...item, changefreq: 'monthly', priority: 0.6, lastmod: new Date().toISOString() };
			},
		}),
		inline(),
	],

	vite: {
		server: { allowedHosts: true },
		plugins: [tailwindcss()],
	},
});
