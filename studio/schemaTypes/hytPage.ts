// "Heal Your Trauma" landing page (/heal-your-trauma) — editable text content.
// Layout, quiz, video, SEO/JSON-LD, and the stylized gold-italic section titles
// stay in code. Every field is optional: when blank the page falls back to its
// built-in copy, so an empty document renders identically to the original page.
export default {
	name: 'hytPage',
	title: 'Heal Your Trauma — Page',
	type: 'document',
	groups: [
		{ name: 'hero', title: 'Hero' },
		{ name: 'cost', title: 'Cost of Waiting' },
		{ name: 'pillars', title: 'Six Pillars' },
		{ name: 'who', title: 'Who This Is For' },
		{ name: 'investment', title: 'Investment' },
		{ name: 'bio', title: 'Bio / Environment' },
		{ name: 'misc', title: 'Testimonials / Contact / Quiz / Footer' },
	],
	fields: [
		// ---- Hero ----
		{ name: 'heroEyebrow', title: 'Hero Eyebrow', type: 'string', group: 'hero' },
		{ name: 'heroSub', title: 'Hero Subtitle Paragraph', type: 'text', rows: 4, group: 'hero' },
		{ name: 'heroCreds', title: 'Hero Credentials Line', type: 'string', group: 'hero' },
		{ name: 'heroVideoLabel', title: 'Hero Video Label', type: 'string', group: 'hero' },
		{
			name: 'scripture1Quote',
			title: 'Scripture Strip 1 — Quote',
			type: 'text',
			rows: 2,
			group: 'hero',
		},
		{
			name: 'scripture1Cite',
			title: 'Scripture Strip 1 — Citation',
			type: 'string',
			group: 'hero',
		},

		// ---- Cost of Waiting ----
		{ name: 'costLabel', title: 'Section Label', type: 'string', group: 'cost' },
		{ name: 'costBody', title: 'Section Intro Paragraph', type: 'text', rows: 3, group: 'cost' },
		{
			name: 'costCards',
			title: 'Cost Cards',
			type: 'array',
			group: 'cost',
			of: [
				{
					type: 'object',
					fields: [
						{ name: 'title', title: 'Title', type: 'string' },
						{ name: 'body', title: 'Body', type: 'text', rows: 3 },
					],
					preview: { select: { title: 'title' } },
				},
			],
		},
		{ name: 'pullQuote', title: 'Pull Quote', type: 'text', rows: 3, group: 'cost' },
		{ name: 'pullCite', title: 'Pull Quote — Attribution', type: 'string', group: 'cost' },

		// ---- Six Pillars ----
		{ name: 'pillarsLabel', title: 'Section Label', type: 'string', group: 'pillars' },
		{
			name: 'pillarsBody',
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
						{ name: 'number', title: 'Number Label (e.g. "Pillar 01")', type: 'string' },
						{ name: 'title', title: 'Title', type: 'string' },
						{ name: 'body', title: 'Body (blank line = new paragraph)', type: 'text', rows: 5 },
					],
					preview: { select: { title: 'title', subtitle: 'number' } },
				},
			],
		},
		{
			name: 'scripture2Quote',
			title: 'Scripture Strip 2 — Quote',
			type: 'text',
			rows: 2,
			group: 'pillars',
		},
		{
			name: 'scripture2Cite',
			title: 'Scripture Strip 2 — Citation',
			type: 'string',
			group: 'pillars',
		},

		// ---- Who This Is For ----
		{ name: 'whoLabel', title: 'Section Label', type: 'string', group: 'who' },
		{
			name: 'whoItems',
			title: 'Audience Cards',
			type: 'array',
			group: 'who',
			of: [
				{
					type: 'object',
					fields: [
						{ name: 'title', title: 'Title', type: 'string' },
						{ name: 'body', title: 'Body', type: 'text', rows: 3 },
					],
					preview: { select: { title: 'title' } },
				},
			],
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
					],
					preview: { select: { title: 'number', subtitle: 'label' } },
				},
			],
		},

		// ---- Investment ----
		{ name: 'investmentLabel', title: 'Section Label', type: 'string', group: 'investment' },
		{
			name: 'investmentBody',
			title: 'Section Intro Paragraph',
			type: 'text',
			rows: 4,
			group: 'investment',
		},
		{ name: 'investmentDuration', title: 'Duration Line', type: 'string', group: 'investment' },
		{
			name: 'investmentExtendedNote',
			title: 'Extended Intensive Note',
			type: 'text',
			rows: 2,
			group: 'investment',
		},
		{
			name: 'investmentIncludes',
			title: 'Includes Chips',
			type: 'array',
			of: [{ type: 'string' }],
			group: 'investment',
		},
		{ name: 'investmentNote', title: 'Aftercare Note', type: 'text', rows: 2, group: 'investment' },
		{ name: 'investmentCtaLabel', title: 'CTA Button Label', type: 'string', group: 'investment' },

		// ---- Bio / Environment ----
		{ name: 'envLabel', title: 'Environment — Label', type: 'string', group: 'bio' },
		{
			name: 'envBody',
			title: 'Environment — Intro Paragraph',
			type: 'text',
			rows: 3,
			group: 'bio',
		},
		{ name: 'bioLabel', title: 'Bio — Label', type: 'string', group: 'bio' },
		{
			name: 'bioParagraphs',
			title: 'Bio Paragraphs',
			type: 'array',
			of: [{ type: 'text', rows: 4 }],
			group: 'bio',
			description: 'The "Visit thekohlergroup.net" button is kept in code.',
		},

		// ---- Testimonials / Contact / Quiz / Footer ----
		{ name: 'testimonialsLabel', title: 'Testimonials — Label', type: 'string', group: 'misc' },
		{ name: 'testimonialsHeading', title: 'Testimonials — Heading', type: 'string', group: 'misc' },
		{ name: 'contactLabel', title: 'Contact — Label', type: 'string', group: 'misc' },
		{
			name: 'contactBody',
			title: 'Contact — Intro Paragraph',
			type: 'text',
			rows: 3,
			group: 'misc',
		},
		{ name: 'screenerLabel', title: 'Quiz — Label', type: 'string', group: 'misc' },
		{ name: 'screenerBody', title: 'Quiz — Intro Paragraph', type: 'text', rows: 3, group: 'misc' },
		{ name: 'footerLegal', title: 'Footer Legal Disclaimer', type: 'text', rows: 4, group: 'misc' },
	],
	preview: { prepare: () => ({ title: 'Heal Your Trauma — Page' }) },
};
