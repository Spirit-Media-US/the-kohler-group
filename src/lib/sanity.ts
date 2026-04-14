import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const sanityClient = createClient({
	projectId: '2bom5gqg',
	dataset: 'production',
	useCdn: false,
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
