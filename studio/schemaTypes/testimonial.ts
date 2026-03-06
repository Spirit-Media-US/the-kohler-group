export default {
  name: 'testimonial',
  title: 'Testimonials',
  type: 'document',
  fields: [
    { name: 'quote', title: 'Quote', type: 'text', validation: (Rule: any) => Rule.required() },
    { name: 'clientName', title: 'Client Name or Initials', type: 'string' },
    { name: 'photo', title: 'Photo', type: 'image', options: { hotspot: true } },
    { name: 'order', title: 'Display Order', type: 'number' },
  ],
  preview: {
    select: { title: 'clientName', subtitle: 'quote' },
  },
}
