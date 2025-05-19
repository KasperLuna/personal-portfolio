// Utility to fetch event data from Contentful
import { createClient } from "contentful";

const SPACE_ID = process.env.CONTENTFUL_SPACE_ID;
const ACCESS_TOKEN = process.env.CONTENTFUL_ACCESS_TOKEN;
const ENVIRONMENT = process.env.CONTENTFUL_ENVIRONMENT || "master";

if (!SPACE_ID || !ACCESS_TOKEN) {
  throw new Error("Contentful environment variables are not set.");
}

export const contentfulClient = createClient({
  space: SPACE_ID,
  accessToken: ACCESS_TOKEN,
  environment: ENVIRONMENT,
});

export type Event = {
  eventTitle: string;
  eventDescription: string;
  eventDate: Date;
  eventLocation: string;
  eventExpectations: string;
  eventMapSrc: string;
};

export async function getEventBySlug(
  slug: string,
  contentType = "event",
): Promise<Event | null> {
  const entries = await contentfulClient.getEntries({
    content_type: contentType,
    "fields.slug": slug,
    limit: 1,
  });

  const item = entries.items[0];
  if (!item) return null;

  if (item.fields.slug !== slug) return null;

  const fields = item.fields as unknown as Event;
  return {
    eventTitle: fields.eventTitle,
    eventDescription: fields.eventDescription,
    eventDate: new Date(fields.eventDate),
    eventLocation: fields.eventLocation,
    eventExpectations: fields.eventExpectations,
    eventMapSrc: fields.eventMapSrc,
  };
}
