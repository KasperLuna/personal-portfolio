export default function EventPage({ params }: { params: { slug: string[] } }) {
    return (
        <main>
            <h1>Event: {params.slug.join(' / ')}</h1>
            <p>Details about the event will go here.</p>
        </main>
    );
}