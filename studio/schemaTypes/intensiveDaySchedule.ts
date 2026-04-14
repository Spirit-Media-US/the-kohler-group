// Daily schedule entries for intensive pages.
// Each document = one session block (e.g. "Day 1 — Morning Session").

export default {
	name: 'intensiveDaySchedule',
	title: 'Intensive Day Schedules',
	type: 'document',
	fields: [
		{
			name: 'page',
			title: 'Page',
			type: 'string',
			options: {
				list: [
					{ title: 'Individual Intensives', value: 'individual' },
					{ title: 'Marriage Intensives', value: 'marriage' },
				],
				layout: 'radio',
			},
			validation: (Rule: any) => Rule.required(),
		},
		{
			name: 'dayLabel',
			title: 'Day Label',
			type: 'string',
			description: 'e.g. "Day One", "Day 2", "Days Three to Five"',
			validation: (Rule: any) => Rule.required(),
		},
		{
			name: 'dayOrder',
			title: 'Day Order',
			type: 'number',
			description: 'Numeric sort key (1, 2, 3…). Use 3.1 for "Days Three to Five" if after Day 3.',
		},
		{
			name: 'sessionLabel',
			title: 'Session Label',
			type: 'string',
			description:
				'e.g. "Morning Session", "Afternoon Session", "Morning and Afternoon Sessions". Leave blank if no sub-label.',
		},
		{
			name: 'sessionOrder',
			title: 'Session Order Within Day',
			type: 'number',
			description: '1 = morning, 2 = afternoon, etc.',
			initialValue: 1,
		},
		{
			name: 'listStartNumber',
			title: 'List Start Number',
			type: 'number',
			description:
				'The starting number for the ordered list (usually 1, but use 8 if continuing a previous list).',
			initialValue: 1,
		},
		{
			name: 'items',
			title: 'Items',
			type: 'array',
			of: [{ type: 'text', rows: 3 }],
			description: 'Ordered list items for this session block.',
		},
		{
			name: 'note',
			title: 'Note (italic, after list)',
			type: 'text',
			rows: 3,
			description:
				'Optional italic note that appears after the list (e.g. the "Optional — for NC and SC clients" note).',
		},
		{
			name: 'prose',
			title: 'Prose (paragraph instead of list)',
			type: 'text',
			rows: 4,
			description:
				'Use this instead of items when the session block is a prose paragraph rather than a numbered list.',
		},
	],
	orderings: [
		{
			title: 'Page, Day, Session',
			name: 'pageDaySession',
			by: [
				{ field: 'page', direction: 'asc' },
				{ field: 'dayOrder', direction: 'asc' },
				{ field: 'sessionOrder', direction: 'asc' },
			],
		},
	],
	preview: {
		select: { page: 'page', dayLabel: 'dayLabel', sessionLabel: 'sessionLabel' },
		prepare(selection: any) {
			return {
				title: `${selection.dayLabel}${selection.sessionLabel ? ' — ' + selection.sessionLabel : ''}`,
				subtitle: selection.page,
			};
		},
	},
};
