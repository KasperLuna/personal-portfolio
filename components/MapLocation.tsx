import { MapPin } from "lucide-react";

export default function MapLocation({ eventMapSrc }: { eventMapSrc: string }) {
    return (
        <div className="w-full mt-4">
            <h3 className="font-medium mb-2 flex items-center gap-1.5">
                <MapPin className="h-4 w-4 text-purple-500" />
                Map Location
            </h3>
            <div className="rounded-lg overflow-hidden border border-slate-200 shadow-sm">
                <iframe
                    src={eventMapSrc}
                    width="100%"
                    height="250"
                    style={{ border: 0 }}
                    allowFullScreen={false}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Party Location"
                    className="w-full"
                ></iframe>
            </div>
            <p className="text-xs text-slate-500 mt-1.5 italic">Click on the map to get directions to the party location</p>
        </div>
    )
}