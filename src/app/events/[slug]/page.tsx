import { getEventBySlug } from "~/lib/contentful";
import { notFound } from "next/navigation";
import EventForm from "~/components/EventForm";
export default async function EventRSVP({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const event = await getEventBySlug(slug);

    if (!event) {
        notFound();
    }

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