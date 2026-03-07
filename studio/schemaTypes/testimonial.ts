export default {
  name: 'testimonial',
  title: 'Testimonials',
  type: 'document',
  fields: [
    { name: 'quote', title: 'Quote', type: 'text', validation: (Rule: any) => Rule.required() },
    { name: 'clientName', title: 'Client Name or Initials', type: 'string' },
    {
      name: 'service',
      title: 'Service Type',
      type: 'string',
      options: {
        list: [
          { title: 'Individual Therapy', value: 'Individual Therapy' },
          { title: 'Individual Intensive', value: 'Individual Intensive' },
          { title: 'Marriage Intensive', value: 'Marriage Intensive' },
          { title: 'Marriage Therapy', value: 'Marriage Therapy' },
        ],
      },
    },
    { name: 'photo', title: 'Photo', type: 'image', options: { hotspot: true } },
    { name: 'order', title: 'Display Order', type: 'number' },
  ],
  preview: {
    select: { title: 'service', subtitle: 'quote', media: 'photo' },
  },
}
