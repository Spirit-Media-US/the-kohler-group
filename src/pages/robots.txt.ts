import type { APIRoute } from 'astro';

export const GET: APIRoute = ({ site }) => {
	const siteURL = site ?? new URL('http://localhost:4321');
	const sitemapURL = new URL('sitemap-index.xml', siteURL).href;

	const content = ['User-agent: *', 'Allow: /', '', `Sitemap: ${sitemapURL}`, ''].join('\n');

	return new Response(content, {
		headers: { 'Content-Type': 'text/plain; charset=utf-8' },
	});
};
