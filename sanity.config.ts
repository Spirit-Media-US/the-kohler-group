import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { media } from 'sanity-plugin-media'
import { schemaTypes } from './studio/schemaTypes'

export default defineConfig({
  name: 'the-kohler-group',
  title: 'The Kohler Group',
  projectId: '2bom5gqg',
  dataset: 'production',
  plugins: [structureTool(), visionTool(), media()],
  schema: { types: schemaTypes },
})
