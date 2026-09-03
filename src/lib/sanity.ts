import { createClient } from '@sanity/client';
import { createImageUrlBuilder } from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url';

export const projectId = import.meta.env.SANITY_PROJECT_ID;
export const dataset = import.meta.env.SANITY_DATASET || 'production';
const apiVersion = import.meta.env.SANITY_API_VERSION || '2024-01-01';

export const sanityConfigured = Boolean(projectId);

export const sanityClient = createClient({
  projectId: projectId || 'placeholder',
  dataset,
  apiVersion,
  useCdn: true,
});

const builder = createImageUrlBuilder(sanityClient);

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}
