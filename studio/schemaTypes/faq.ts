export default {
  name: 'faq',
  title: 'FAQs',
  type: 'document',
  fields: [
    { name: 'question', title: 'Question', type: 'string', validation: (Rule: any) => Rule.required() },
    { name: 'answer', title: 'Answer', type: 'array', of: [{ type: 'block' }] },
    { name: 'order', title: 'Display Order', type: 'number' },
  ],
  preview: {
    select: { title: 'question' },
  },
}
