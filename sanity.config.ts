import { visionTool } from '@sanity/vision';
import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { media } from 'sanity-plugin-media';
import { schemaTypes } from './studio/schemaTypes';

export default defineConfig({
	name: 'the-kohler-group',
	title: 'The Kohler Group',
	projectId: '2bom5gqg',
	dataset: 'production',
	basePath: '/studio',
	plugins: [structureTool(), visionTool(), media()],
	schema: { types: schemaTypes },
});
