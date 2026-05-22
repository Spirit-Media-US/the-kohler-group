export default {
	name: 'siteSettings',
	title: 'Site Settings',
	type: 'document',
	__experimental_actions: ['update', 'publish'],
	fields: [
		{ name: 'practiceName', title: 'Practice Name', type: 'string' },
		{ name: 'tagline', title: 'Tagline', type: 'string' },
		{ name: 'phone', title: 'Phone Number', type: 'string' },
		{ name: 'email', title: 'General Email', type: 'string' },
		{ name: 'barbaraEmail', title: 'Barbara Email', type: 'string' },
		{ name: 'officeEmail', title: 'Office Email', type: 'string' },
		{ name: 'bookingUrl', title: 'Booking / Scheduling URL', type: 'url' },
		{ name: 'address', title: 'Office Address', type: 'text' },
		{ name: 'telehealth', title: 'Telehealth States', type: 'string' },
		{ name: 'youtube', title: 'YouTube Channel URL', type: 'url' },
		{ name: 'facebook', title: 'Facebook URL', type: 'url' },
		{ name: 'instagram', title: 'Instagram URL', type: 'url' },
		{ name: 'logo', title: 'Logo', type: 'image' },
		{ name: 'heroImage', title: 'Home Hero Image', type: 'image', options: { hotspot: true } },
		{
			name: 'aboutHeroImage',
			title: 'About Hero Image',
			type: 'image',
			options: { hotspot: true },
		},
		{
			name: 'defaultHeroImage',
			title: 'Default Interior Hero Image',
			type: 'image',
			options: { hotspot: true },
		},
		{
			name: 'galleryImages',
			title: 'Testimonials Gallery Images',
			type: 'array',
			of: [
				{
					type: 'image',
					options: { hotspot: true },
					fields: [{ name: 'alt', title: 'Alt Text', type: 'string' }],
				},
			],
			description: 'Gallery images displayed on the testimonials page',
		},
		// ---------------- Save Our Marriage landing page ----------------
		{
			name: 'somVideoUrl',
			title: 'SOM — Barbara Video URL',
			type: 'url',
			description:
				'YouTube embed URL for "A Message from Barbara" on /save-my-marriage. Leave blank to show the placeholder.',
		},
		{
			name: 'somHeroBackground',
			title: 'SOM — Hero Background Image (optional)',
			type: 'image',
			options: { hotspot: true },
			description:
				'Optional background image for the /save-my-marriage hero. A navy overlay sits on top automatically.',
		},
		{
			name: 'somBarbaraPhoto',
			title: 'SOM — Barbara Bio Photo',
			type: 'image',
			options: { hotspot: true },
			description:
				'Portrait used in the bio section of /save-my-marriage. Defaults to the existing intensive portrait if blank.',
		},
		{
			name: 'somPrice',
			title: 'SOM — Marriage Intensive Price',
			type: 'string',
			description: 'Displayed price on /save-my-marriage. Default: $15,000',
		},
		// ---------------- Heal Your Trauma landing page ----------------
		{
			name: 'hytVideoUrl',
			title: 'HYT — Barbara Video URL',
			type: 'url',
			description:
				'YouTube embed URL for "Hear From Barbara" on /heal-your-trauma. Leave blank to show the placeholder.',
		},
		{
			name: 'hytHeroBackground',
			title: 'HYT — Hero Background Image (optional)',
			type: 'image',
			options: { hotspot: true },
			description:
				'Optional background image for the /heal-your-trauma hero. A navy overlay sits on top automatically.',
		},
		{
			name: 'hytBarbaraPhoto',
			title: 'HYT — Barbara Bio Photo',
			type: 'image',
			options: { hotspot: true },
			description:
				'Portrait used in the bio section of /heal-your-trauma. Defaults to the SOM portrait if blank.',
		},
		{
			name: 'hytPrice',
			title: 'HYT — Trauma Intensive Price',
			type: 'string',
			description: 'Displayed price on /heal-your-trauma. Default: $9,400',
		},
		{
			name: 'hytEnvironmentImages',
			title: 'HYT — Environment Image Grid (4 photos)',
			type: 'array',
			of: [
				{
					type: 'image',
					options: { hotspot: true },
					fields: [{ name: 'alt', title: 'Alt Text', type: 'string' }],
				},
			],
			validation: (Rule: any) => Rule.max(4),
			description:
				'Four photos of the Daetwyler Plaza environment. Grid hides if fewer than 4 are uploaded.',
		},
	],
};
