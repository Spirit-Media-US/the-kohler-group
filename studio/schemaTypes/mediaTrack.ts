export default {
	name: 'mediaTrack',
	title: 'Media Tracks',
	type: 'document',
	fields: [
		{
			name: 'title',
			title: 'Title',
			type: 'string',
			validation: (Rule: any) => Rule.required(),
		},
		{
			name: 'audioUrl',
			title: 'Audio URL',
			type: 'url',
			description: 'R2 URL for the audio file (e.g. https://pub-....r2.dev/audio/...mp3)',
			validation: (Rule: any) => Rule.required(),
		},
		{
			name: 'description',
			title: 'Description',
			type: 'text',
			rows: 3,
		},
		{
			name: 'order',
			title: 'Order',
			type: 'number',
			description: 'Display order (1 = first)',
		},
	],
	orderings: [
		{
			title: 'Display Order',
			name: 'orderAsc',
			by: [{ field: 'order', direction: 'asc' }],
		},
	],
	preview: {
		select: { title: 'title', order: 'order' },
		prepare(selection: any) {
			return {
				title: selection.title,
				subtitle: `Track ${selection.order}`,
			};
		},
	},
};
