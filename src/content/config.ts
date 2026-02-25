import { defineCollection, z } from 'astro:content';

const therapists = defineCollection({
	type: 'content',
	schema: z.object({
		name: z.string(),
		credentials: z.string(),
		role: z.string().optional(),
		// Wix CDN URLs for now — download and move to public/images/therapists/ before launch
		headshot: z.string().optional(),
		order: z.number(),
	}),
});

export const collections = { therapists };
