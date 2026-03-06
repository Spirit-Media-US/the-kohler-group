export default {
  name: 'therapist',
  title: 'Therapists',
  type: 'document',
  fields: [
    { name: 'name', title: 'Full Name', type: 'string', validation: (Rule: any) => Rule.required() },
    { name: 'credentials', title: 'Credentials', type: 'string' },
    { name: 'role', title: 'Role / Location', type: 'string' },
    { name: 'headshot', title: 'Headshot', type: 'image', options: { hotspot: true } },
    { name: 'intro', title: 'Short Introduction', type: 'text' },
    { name: 'bio', title: 'Full Bio', type: 'array', of: [{ type: 'block' }] },
    {
      name: 'specializations',
      title: 'Treatment Specializations',
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      name: 'modalities',
      title: 'Treatment Modalities',
      type: 'array',
      of: [{ type: 'string' }],
    },
    { name: 'order', title: 'Display Order', type: 'number' },
    { name: 'active', title: 'Currently Active', type: 'boolean', initialValue: true },
  ],
  preview: {
    select: { title: 'name', subtitle: 'credentials', media: 'headshot' },
  },
}
