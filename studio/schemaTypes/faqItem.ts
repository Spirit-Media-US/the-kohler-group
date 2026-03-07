export default {
  name: 'faqItem',
  title: 'FAQ',
  type: 'document',
  fields: [
    { name: 'question', title: 'Question', type: 'string', validation: (Rule: any) => Rule.required() },
    { name: 'answer', title: 'Answer', type: 'text', validation: (Rule: any) => Rule.required() },
    { name: 'order', title: 'Display Order', type: 'number' },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'General', value: 'general' },
          { title: 'Appointments', value: 'appointments' },
          { title: 'Insurance & Fees', value: 'insurance' },
          { title: 'Intensives', value: 'intensives' },
        ],
      },
    },
  ],
  preview: {
    select: { title: 'question', subtitle: 'category' },
  },
}
