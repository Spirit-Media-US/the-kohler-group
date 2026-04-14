// Shared schema for both Healing Stages and Awareness Stages across all intensives pages.
// The `stageType` field distinguishes healing vs awareness.
// The `page` field determines which page(s) show this item.

export default {
	name: 'intensiveStage',
	title: 'Intensive Stages',
	type: 'document',
	fields: [
		{
			name: 'stageType',
			title: 'Stage Type',
			type: 'string',
			options: {
				list: [
					{ title: 'Healing Stage', value: 'healing' },
					{ title: 'Awareness Stage', value: 'awareness' },
					{ title: 'Preparation Item (While You Are Here)', value: 'preparation' },
				],
				layout: 'radio',
			},
			validation: (Rule: any) => Rule.required(),
		},
		{
			name: 'page',
			title: 'Page',
			type: 'string',
			options: {
				list: [
					{ title: 'Individual Intensives', value: 'individual' },
					{ title: 'Marriage Intensives', value: 'marriage' },
					{ title: 'About Intensives', value: 'about' },
				],
				layout: 'radio',
			},
			validation: (Rule: any) => Rule.required(),
		},
		{
			name: 'number',
			title: 'Number',
			type: 'number',
			description: 'Display number (1, 2, 3…)',
			validation: (Rule: any) => Rule.required(),
		},
		{
			name: 'title',
			title: 'Title',
			type: 'string',
			description: 'Stage title (not used for preparation items)',
		},
		{
			name: 'body',
			title: 'Body',
			type: 'text',
			rows: 4,
			validation: (Rule: any) => Rule.required(),
		},
	],
	orderings: [
		{
			title: 'Page, Type, then Number',
			name: 'pageTypeNumber',
			by: [
				{ field: 'page', direction: 'asc' },
				{ field: 'stageType', direction: 'asc' },
				{ field: 'number', direction: 'asc' },
			],
		},
	],
	preview: {
		select: { stageType: 'stageType', page: 'page', number: 'number', title: 'title' },
		prepare(selection: any) {
			const labels: Record<string, string> = {
				healing: 'Healing',
				awareness: 'Awareness',
				preparation: 'Prep',
			};
			return {
				title: selection.title || `Item ${selection.number}`,
				subtitle: `${labels[selection.stageType] || selection.stageType} · ${selection.page} · #${selection.number}`,
			};
		},
	},
};
