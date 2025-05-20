import EventForm from "@/components/EventForm";
import { type Event, getEventBySlug } from "@/lib/contentful";
import { notFound } from "next/navigation";

export const revalidate = 60;

// Simple in-memory cache for the current request
const eventCache = new Map<string, Promise<Event | null>>();

async function fetchEvent(slug: string): Promise<Event | null> {
    if (!eventCache.has(slug)) {
        eventCache.set(slug, getEventBySlug(slug));
    }
    return await eventCache.get(slug) || Promise.resolve(null);
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<{ title: string; description: string }> {
    const { slug } = params;
    const event = await fetchEvent(slug);
    return {
        title: event?.eventTitle || "Event Title",
        description: event?.eventDescription || "",
    };
}

export default async function EventRSVP({ params }: { params: { slug: string } }): Promise<JSX.Element> {
    const { slug } = params;
    const event = await fetchEvent(slug);
    if (!event) notFound();

    const eventDetails = {
        title: event.eventTitle || "Event Title",
        description: event.eventDescription || "Event Description",
        date: event.eventDate,
        location: event.eventLocation,
        expectations: event.eventExpectations,
        mapSrc: event.eventMapSrc,
    };

    return <EventForm {...eventDetails} />;
}
