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
	// Keep TKG on its own project assets. The Spirit Media org has the shared
	// org-level Media Library enabled (bound to the Arts By Justin project), and
	// TKG editors (project admins, but without an org media-library role) hit a
	// "request access from Arts by Justin" wall when an image field reaches for it.
	// Opt this Studio out so image/file fields use only the project's own assets.
	mediaLibrary: { enabled: false },
	form: {
		image: {
			assetSources: (prev: any[]) =>
				prev.filter((s) => s.name !== 'sanity-media-library' && s.name !== 'media-library'),
		},
		file: {
			assetSources: (prev: any[]) =>
				prev.filter((s) => s.name !== 'sanity-media-library' && s.name !== 'media-library'),
		},
	},
});
