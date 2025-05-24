/* eslint-disable @typescript-eslint/no-misused-promises */
"use client";

import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { PartyPopper, Calendar, MapPin, Cake, User, Trash2, Plus, Sun, Moon } from "lucide-react";
import { useState } from "react";
import { Toaster } from "sonner";
import { Button } from "./ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "./ui/card";
import { Input } from "./ui/input";
import MapLocation from "./MapLocation";
import CountdownTimer from "./CountdownTimer";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Spinner } from "./ui/Spinner";
import { Separator } from "./ui/separator";
import { Label } from "./ui/label";
import { useTheme } from "next-themes";

type Attendee = {
    id: string;
    name: string;
    attending: "yes" | "no" | "maybe";
};

type FormValues = {
    attendees: Attendee[];
};

type EventDetails = {
    title?: string;
    description?: string;
    date?: Date;
    location?: string;
    expectations?: string;
    mapSrc?: string;
};

export default function EventForm({ title, description, date, location, expectations, mapSrc }: EventDetails) {
    const { toast } = useToast();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const { resolvedTheme, setTheme } = useTheme();
    const isDark = resolvedTheme === "dark";

    const {
        control,
        register,
        handleSubmit,
        getValues,
        formState: { errors },
    } = useForm<FormValues>({
        disabled: isSubmitting || isSubmitted,
        defaultValues: {
            attendees: [
                {
                    id: "1",
                    name: "",
                    attending: "yes",
                },
            ],
        },
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "attendees",
    });

    const partyDate = date ? new Date(date) : new Date();

    const onSubmit = async (data: FormValues) => {
        try {
            setIsSubmitting(true);
            if (data.attendees.some((a) => !a.name.trim())) {
                toast({
                    title: "Missing information",
                    description: "Please provide names for all attendees",
                    variant: "destructive",
                });
                throw new Error("Missing names");
            }

            const response = await fetch("/api/event-form", {
                method: "POST",
                body: JSON.stringify(data.attendees),
            });

            if (!response?.ok) {
                toast({
                    title: "Error submitting form",
                    description: "Please try submitting again.",
                    variant: "destructive",
                });
                throw new Error("Error submitting form");
            }

            toast({
                title: "RSVP Submitted!",
                description: "Thanks for responding. Can't wait to see you!",
            });
            setIsSubmitted(true);
        } catch {
            setIsSubmitting(false);
        } finally {
            setIsSubmitting(false);
        }
    };

    const areButtonsDisabled = isSubmitting || isSubmitted;
    // const EVENT_DATE_FORMATTED = date || '';

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 relative overflow-hidden">
            {/* SVG Background Pattern */}
            <div className="absolute inset-0 z-0 opacity-10 dark:opacity-5">
                <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <pattern id="confetti" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                            <path d="M10,10 L15,10 L15,15 L10,15 Z" fill="#FF5252" />
                            <path d="M20,20 L25,20 L25,25 L20,25 Z" fill="#4CAF50" />
                            <path d="M30,10 L35,10 L35,15 L30,15 Z" fill="#2196F3" />
                            <path d="M10,30 L15,30 L15,35 L10,35 Z" fill="#FFC107" />
                            <path d="M30,30 L35,30 L35,35 L30,35 Z" fill="#9C27B0" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#confetti)" />
                </svg>
            </div>

            <div className="container max-w-4xl mx-auto px-4 py-12 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-8"
                >
                    <p className="text-lg font-semibold text-purple-600 dark:text-purple-400 mb-2">You're invited to...</p>
                    <h1 className="text-4xl md:text-6xl font-extrabold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 tracking-tight">
                        {title}
                    </h1>
                    <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 italic">
                        {description}
                    </p>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <Card className="mb-8 shadow-lg border-0 bg-white/80 dark:bg-slate-800/70 backdrop-blur-sm">
                        <CardHeader className="pb-4">
                            <CardTitle className="flex items-center gap-2 text-2xl text-slate-900 dark:text-slate-50">
                                <PartyPopper className="h-6 w-6 text-purple-500 dark:text-purple-400" />
                                Event Details
                            </CardTitle>
                            <CardDescription className="text-slate-500 dark:text-slate-400">All the important info you need to know</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-start gap-3">
                                <Calendar className="h-5 w-5 text-slate-500 dark:text-slate-400 mt-0.5 flex-shrink-0" />
                                <div>
                                    <h3 className="font-medium text-slate-800 dark:text-slate-200">Date & Time</h3>
                                    <p className="text-slate-600 dark:text-slate-300">{
                                        partyDate.toLocaleDateString("en-US", {
                                            weekday: "long",
                                            year: "numeric",
                                            month: "long",
                                            day: "numeric",
                                        })}{" "}
                                        {partyDate.toLocaleTimeString("en-US", {
                                            hour: "2-digit",
                                            minute: "2-digit",
                                            hour12: true,
                                        })}
                                    </p>
                                </div>
                            </div>
                            {location && (
                                <div className="flex items-start gap-3">
                                    <MapPin className="h-5 w-5 text-slate-500 dark:text-slate-400 mt-0.5 flex-shrink-0" />
                                    <div>
                                        <h3 className="font-medium text-slate-800 dark:text-slate-200">Location</h3>
                                        <p className="text-slate-600 dark:text-slate-300">{location}</p>
                                    </div>
                                </div>
                            )}

                            <div className="flex items-start gap-3">
                                <Cake className="h-5 w-5 text-slate-500 dark:text-slate-400 mt-0.5 flex-shrink-0" />
                                <div>
                                    <h3 className="font-medium text-slate-800 dark:text-slate-200">What to Expect</h3>
                                    <p className="text-slate-600 dark:text-slate-300">
                                        {expectations}
                                    </p>
                                </div>
                            </div>

                            <Separator className="my-4 bg-slate-200 dark:bg-slate-700" />
                            <CountdownTimer targetDate={partyDate} />
                            <Separator className="my-4 bg-slate-200 dark:bg-slate-700" />
                            <MapLocation eventMapSrc={mapSrc ?? ""} />
                        </CardContent>
                    </Card>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        {!isSubmitted ? (
                            <Card className="shadow-lg border-0 bg-white/80 dark:bg-slate-800/70 backdrop-blur-sm">
                                <CardHeader>
                                    <CardTitle className="text-2xl flex items-center gap-2 text-slate-900 dark:text-slate-50">
                                        <User className="h-6 w-6 text-purple-500 dark:text-purple-400" />
                                        RSVP
                                    </CardTitle>
                                    <CardDescription className="text-slate-500 dark:text-slate-400">
                                        Let me know if you can make it! You can RSVP for multiple attendees.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    {fields.map((field: Attendee, index) => (
                                        <div key={field?.id} className="space-y-4">
                                            {index > 0 && <Separator className="my-6 bg-slate-200 dark:bg-slate-700" />}

                                            <div className="flex justify-between items-center">
                                                <h3 className={cn("font-medium text-lg", index === 0
                                                    ? "text-purple-600 dark:text-purple-400"
                                                    : "text-slate-700 dark:text-slate-300")}>
                                                    {index === 0 ? "Your Information" : `Additional Attendee ${index}`}
                                                </h3>

                                                {index > 0 && (
                                                    <Button
                                                        type="button"
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => remove(index)}
                                                        disabled={isSubmitting}
                                                        className="text-red-500 hover:text-red-700 hover:bg-red-50 dark:text-red-400 dark:hover:text-red-300 dark:hover:bg-red-950/30"
                                                    >
                                                        <Trash2 className="h-4 w-4 mr-1" />
                                                        Remove
                                                    </Button>
                                                )}
                                            </div>

                                            <div className="grid gap-4">
                                                <div className="grid gap-2">
                                                    <Label htmlFor={`name-${field.id}`} className="text-slate-700 dark:text-slate-300">Name</Label>
                                                    <Input
                                                        id={`name-${field.id}`}
                                                        {...register(`attendees.${index}.name`, { required: true })}
                                                        placeholder={index === 0 ? "Your name" : "Additional Attendee's name"}
                                                        className="bg-white dark:bg-slate-700 border-slate-200 dark:border-slate-600 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500"
                                                    />
                                                    {errors.attendees?.[index]?.name && (
                                                        <p className="text-red-500 dark:text-red-400 text-sm">Name is required</p>
                                                    )}
                                                </div>

                                                <div className="grid gap-2">
                                                    <Label className="text-slate-700 dark:text-slate-300">Attending?</Label>
                                                    <Controller
                                                        name={`attendees.${index}.attending`}
                                                        control={control}
                                                        disabled={areButtonsDisabled}
                                                        render={({ field }) => (
                                                            <RadioGroup
                                                                value={field.value}
                                                                onValueChange={field.onChange}
                                                                className="flex flex-col space-y-1"
                                                            >
                                                                <div className="flex items-center space-x-2">
                                                                    <RadioGroupItem value="yes" id={`yes-${field.value}`} disabled={areButtonsDisabled} />
                                                                    <Label htmlFor={`yes-${field.value}`} className="font-normal text-slate-700 dark:text-slate-300">
                                                                        Yes, wouldn&apos;t miss it!
                                                                    </Label>
                                                                </div>
                                                                <div className="flex items-center space-x-2">
                                                                    <RadioGroupItem value="no" id={`no-${field.value}`} disabled={areButtonsDisabled} />
                                                                    <Label htmlFor={`no-${field.value}`} className="font-normal text-slate-700 dark:text-slate-300">
                                                                        No, unfortunately can&apos;t make it
                                                                    </Label>
                                                                </div>
                                                                <div className="flex items-center space-x-2">
                                                                    <RadioGroupItem value="maybe" id={`maybe-${field.value}`} disabled={areButtonsDisabled} />
                                                                    <Label htmlFor={`maybe-${field.value}`} className="font-normal text-slate-700 dark:text-slate-300">
                                                                        Maybe, still deciding
                                                                    </Label>
                                                                </div>
                                                            </RadioGroup>
                                                        )}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    ))}

                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() =>
                                            append({
                                                id: Math.random().toString(36).substring(2, 9),
                                                name: "",
                                                attending: "yes",
                                            })
                                        }
                                        disabled={areButtonsDisabled}
                                        className="w-full mt-4 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
                                    >
                                        <Plus className="h-4 w-4 mr-2" />
                                        Add Another Attendee
                                    </Button>
                                </CardContent>
                                <CardFooter className="flex flex-col space-y-4">
                                    <Button
                                        type="submit"
                                        disabled={areButtonsDisabled}
                                        className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white"
                                    >
                                        {isSubmitting ? (<Spinner className="animate-spin" />) : ("Submit RSVP")}
                                    </Button>
                                    <p className="text-xs text-center text-slate-500 dark:text-slate-400">
                                        By submitting, you agree to potentially be in awkward photos.
                                    </p>
                                </CardFooter>
                            </Card>
                        ) : (
                            <Card className="shadow-lg border-0 bg-white/80 dark:bg-slate-800/70 backdrop-blur-sm">
                                <CardHeader>
                                    <CardTitle className="text-2xl flex items-center gap-2 text-slate-900 dark:text-slate-50">
                                        <PartyPopper className="h-6 w-6 text-purple-500 dark:text-purple-400" />
                                        See you soon!
                                    </CardTitle>
                                    <CardDescription className="text-slate-500 dark:text-slate-400">
                                        Your RSVP has been submitted successfully. Here&apos;s what you shared:
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    {getValues()?.attendees.map((field: Attendee, index) => (
                                        <div key={field?.id} className="space-y-2">
                                            <h3 className={cn("font-medium text-lg", index === 0
                                                ? "text-purple-600 dark:text-purple-400"
                                                : "text-slate-700 dark:text-slate-300")}>
                                                {index === 0 ? "Your Information" : `Additional Attendee ${index}`}
                                            </h3>
                                            <p className="text-slate-700 dark:text-slate-300">
                                                <span className="font-medium">Name:</span> {field.name || "N/A"}
                                            </p>
                                            <p className="text-slate-700 dark:text-slate-300">
                                                <span className="font-medium">Attending:</span> {field.attending || "N/A"}
                                            </p>
                                        </div>
                                    ))}
                                </CardContent>
                                <CardFooter className="text-center">
                                    <p className="text-sm text-slate-500 dark:text-slate-400">
                                        Looking forward to celebrating with you! 🎉
                                    </p>
                                </CardFooter>
                            </Card>
                        )}
                    </form>
                </motion.div>
                <div className="fixed bottom-4 right-4 z-50">
                    <button
                        onClick={() => setTheme(isDark ? "light" : "dark")}
                        aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
                        className="p-2 rounded-full bg-gray-200 dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all"
                    >
                        {isDark ? <Sun className="h-6 w-6 text-yellow-500" /> : <Moon className="h-6 w-6 text-gray-700" />}
                    </button>
                </div>
                <footer className="mt-12 text-center text-sm text-slate-500 dark:text-slate-400">
                    <p>© {new Date().getFullYear()} Kasper Luna</p>
                    <p className="mt-1">This site was created with love, humor, and a touch of professional flair.</p>
                </footer>
            </div>
            <Toaster />
        </div>
    );
}