export default {
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  __experimental_actions: ['update', 'publish'],
  fields: [
    { name: 'practiceName', title: 'Practice Name', type: 'string' },
    { name: 'tagline', title: 'Tagline', type: 'string' },
    { name: 'phone', title: 'Phone Number', type: 'string' },
    { name: 'email', title: 'Email', type: 'string' },
    { name: 'address', title: 'Office Address', type: 'text' },
    { name: 'telehealth', title: 'Telehealth States', type: 'string' },
    { name: 'youtube', title: 'YouTube Channel URL', type: 'url' },
    { name: 'facebook', title: 'Facebook URL', type: 'url' },
    { name: 'instagram', title: 'Instagram URL', type: 'url' },
    { name: 'heroImage', title: 'Hero Image', type: 'image', options: { hotspot: true } },
    { name: 'logo', title: 'Logo', type: 'image' },
  ],
}
