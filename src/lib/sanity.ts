import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

// Default useCdn=false (always fresh — protects against the ~60s stale-CDN
// race that can ship a build missing a just-published doc). Set
// SANITY_USE_CDN=true to opt into the CDN for faster builds when freshness
// isn't time-critical. deploy-live.sh sets SANITY_USE_CDN=false explicitly,
// so prod deploys are always safe regardless of this default.
const USE_CDN = process.env.SANITY_USE_CDN === 'true';

export const sanityClient = createClient({
	projectId: '2bom5gqg',
	dataset: 'production',
	useCdn: USE_CDN,
	apiVersion: '2024-01-01',
});

const builder = imageUrlBuilder(sanityClient);
export function urlFor(source: any) {
	return builder.image(source);
}

// Media tracks for education/media page
export async function getMediaTracks() {
	return sanityClient.fetch(
		`*[_type=="mediaTrack"] | order(order asc) { title, audioUrl, description, order }`,
	);
}

// Intensive stages — healing, awareness, or preparation items for a given page
export async function getIntensiveStages(page: string, stageType: string) {
	return sanityClient.fetch(
		`*[_type=="intensiveStage" && page==$page && stageType==$stageType] | order(number asc) { number, title, body }`,
		{ page, stageType },
	);
}

// Day schedules for individual or marriage intensives
export async function getIntensiveDaySchedules(page: string) {
	return sanityClient.fetch(
		`*[_type=="intensiveDaySchedule" && page==$page] | order(dayOrder asc, sessionOrder asc) { dayLabel, dayOrder, sessionLabel, sessionOrder, listStartNumber, items, note, prose }`,
		{ page },
	);
}
