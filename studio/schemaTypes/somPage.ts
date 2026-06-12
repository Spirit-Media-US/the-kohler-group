// "Save My Marriage" landing page (/save-my-marriage) — editable text content.
// Layout, quiz, video, SEO/JSON-LD, and the stylized gold-italic section titles
// stay in code (the titles use hand-tuned line breaks + accent styling). Every
// field here is optional: when blank the page falls back to its built-in copy,
// so an empty document renders identically to the original page.
export default {
	name: 'somPage',
	title: 'Save My Marriage — Page',
	type: 'document',
	groups: [
		{ name: 'hero', title: 'Hero' },
		{ name: 'pillars', title: 'Why This Works' },
		{ name: 'who', title: 'Who This Is For' },
		{ name: 'bio', title: 'Barbara Bio' },
		{ name: 'investment', title: 'Investment' },
		{ name: 'misc', title: 'Testimonials / Quiz / Footer' },
	],
	fields: [
		// ---- Hero ----
		{ name: 'heroEyebrow', title: 'Hero Eyebrow', type: 'string', group: 'hero' },
		{ name: 'heroSubtitle', title: 'Hero Subtitle', type: 'string', group: 'hero' },
		{ name: 'heroBody', title: 'Hero Body Paragraph', type: 'text', rows: 3, group: 'hero' },
		{ name: 'heroCtaLabel', title: 'Hero Button Label', type: 'string', group: 'hero' },
		{
			name: 'scriptureQuote',
			title: 'Scripture Strip — Quote',
			type: 'text',
			rows: 2,
			group: 'hero',
		},
		{ name: 'scriptureCite', title: 'Scripture Strip — Citation', type: 'string', group: 'hero' },

		// ---- Why This Works (pillars) ----
		{ name: 'pillarsLabel', title: 'Section Label', type: 'string', group: 'pillars' },
		{
			name: 'pillarsIntro',
			title: 'Section Intro Paragraph',
			type: 'text',
			rows: 3,
			group: 'pillars',
		},
		{
			name: 'pillars',
			title: 'Pillars',
			type: 'array',
			group: 'pillars',
			of: [
				{
					type: 'object',
					fields: [
						{ name: 'title', title: 'Title', type: 'string' },
						{ name: 'body', title: 'Body', type: 'text', rows: 4 },
					],
					preview: { select: { title: 'title' } },
				},
			],
		},

		// ---- Who This Is For ----
		{ name: 'whoLabel', title: 'Section Label', type: 'string', group: 'who' },
		{ name: 'whoIntro', title: 'Section Intro Paragraph', type: 'text', rows: 3, group: 'who' },
		{
			name: 'whoItems',
			title: 'Checklist Items',
			type: 'array',
			of: [{ type: 'text', rows: 2 }],
			group: 'who',
		},
		{
			name: 'statBoxes',
			title: 'Stat Boxes',
			type: 'array',
			group: 'who',
			of: [
				{
					type: 'object',
					fields: [
						{ name: 'number', title: 'Big Number', type: 'string' },
						{ name: 'label', title: 'Label', type: 'string' },
						{ name: 'caption', title: 'Caption', type: 'text', rows: 3 },
					],
					preview: { select: { title: 'number', subtitle: 'label' } },
				},
			],
		},

		// ---- Bio ----
		{ name: 'bioLabel', title: 'Section Label', type: 'string', group: 'bio' },
		{
			name: 'bioParagraphs',
			title: 'Bio Paragraphs',
			type: 'array',
			of: [{ type: 'text', rows: 4 }],
			group: 'bio',
			description:
				'The final paragraph with the in-page link is kept in code; these replace the plain bio paragraphs above it.',
		},

		// ---- Investment ----
		{ name: 'investmentLabel', title: 'Section Label', type: 'string', group: 'investment' },
		{
			name: 'investmentBody',
			title: 'Section Intro Paragraph',
			type: 'text',
			rows: 3,
			group: 'investment',
		},
		{
			name: 'investmentNotes',
			title: 'Notes Under Price',
			type: 'array',
			of: [{ type: 'string' }],
			group: 'investment',
			description: 'Each line shown under the price (e.g. "Five Consecutive Days").',
		},
		{
			name: 'investmentIncludes',
			title: 'Includes Chips',
			type: 'array',
			of: [{ type: 'string' }],
			group: 'investment',
		},

		// ---- Testimonials / Quiz / Footer ----
		{ name: 'testimonialsLabel', title: 'Testimonials — Label', type: 'string', group: 'misc' },
		{
			name: 'testimonialsBody',
			title: 'Testimonials — Intro Paragraph',
			type: 'text',
			rows: 3,
			group: 'misc',
		},
		{ name: 'screenerLabel', title: 'Quiz — Label', type: 'string', group: 'misc' },
		{ name: 'screenerBody', title: 'Quiz — Intro Paragraph', type: 'text', rows: 3, group: 'misc' },
		{ name: 'footerLegal', title: 'Footer Legal Disclaimer', type: 'text', rows: 5, group: 'misc' },
	],
	preview: { prepare: () => ({ title: 'Save My Marriage — Page' }) },
};
