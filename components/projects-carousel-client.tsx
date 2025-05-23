"use client"

import { useRef, useEffect, useState, useCallback } from "react"
import { motion, useInView } from "framer-motion"
import Image from "next/image"
import { Github, ExternalLink } from "lucide-react"
import useEmblaCarousel from "embla-carousel-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useTheme } from "next-themes"

interface Project {
    title: string;
    description: string;
    displayImage: string;
    projectUrl: string;
    codeUrl: string;
    techStack: string[];
    isMonochrome?: boolean; // Add this property
}

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
}

export default function ProjectsCarousel({ projects }: { projects: Project[] }) {
    const ref = useRef<HTMLDivElement>(null)
    const isInView = useInView(ref, { once: true, amount: 0.1 })
    const [emblaRef, emblaApi] = useEmblaCarousel({ align: "center", skipSnaps: false, loop: true })
    const [selectedIndex, setSelectedIndex] = useState(0)


    // Memoize handleSelect
    const handleSelect = useCallback((index: number) => {
        emblaApi?.scrollTo(index)
    }, [emblaApi])

    useEffect(() => {
        if (!emblaApi) return
        const onSelect = () => {
            setSelectedIndex(emblaApi.selectedScrollSnap())
        }
        emblaApi.on("select", onSelect)
        onSelect()
        return () => {
            emblaApi.off("select", onSelect)
        }
    }, [emblaApi])

    // Autoplay every 7 seconds
    useEffect(() => {
        if (!emblaApi) return
        const interval = setInterval(() => {
            emblaApi.scrollNext()
        }, 7000)
        return () => clearInterval(interval)
    }, [emblaApi])

    return (
        <motion.div
            ref={ref}
            className="container relative z-10 mx-auto px-6 lg:px-8"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
        >
            <div className="relative h-full">
                {/* Left Blur Overlay */}
                <div className="pointer-events-none absolute left-0 top-0 h-full w-0 sm:w-40 z-20 bg-gradient-to-r from-white/90 dark:from-slate-900/90 to-transparent" />
                {/* Right Blur Overlay */}
                <div className="pointer-events-none absolute right-0 top-0 h-full w-0 sm:w-40 z-20 bg-gradient-to-l from-white/90 dark:from-slate-900/90 to-transparent" />
                {/* Embla Carousel */}
                <div ref={emblaRef} className="overflow-hidden">
                    <div className="flex h-full">
                        {projects.map((project, index) => (
                            <div
                                key={project.title}
                                className="flex-shrink-0 h-full w-[350px]"
                            >
                                <ProjectCard
                                    project={project}
                                    index={index}
                                    selectedIndex={selectedIndex}
                                    handleSelect={handleSelect}
                                />
                            </div>
                        ))}
                    </div>
                </div>
                {/* Chevrons and Dots below the carousel */}
                <div className="flex flex-col items-center mt-6">
                    <div className="flex justify-center space-x-8">
                        {/* Left Chevron */}
                        <button
                            onClick={useCallback(() => emblaApi?.scrollPrev(), [emblaApi])}
                            className="flex items-center justify-center px-2 text-purple-500 hover:text-purple-700 transition-colors"
                            aria-label="Previous project"
                        >
                            <svg width="32" height="32" fill="none" viewBox="0 0 24 24">
                                <path d="M15 19l-7-7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                        {/* Right Chevron */}
                        <button
                            onClick={useCallback(() => emblaApi?.scrollNext(), [emblaApi])}
                            className="flex items-center justify-center px-2 text-purple-500 hover:text-purple-700 transition-colors"
                            aria-label="Next project"
                        >
                            <svg width="32" height="32" fill="none" viewBox="0 0 24 24">
                                <path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                    </div>
                    {/* Dots */}
                    <div className="flex justify-center mt-4 space-x-2">
                        {projects.map((project, idx) => (
                            <button
                                key={`dot-${project.title}`}
                                className={`h-2 w-2 rounded-full transition-all duration-300 ${idx === selectedIndex
                                    ? "bg-purple-500 scale-125"
                                    : "bg-purple-200 dark:bg-purple-900"
                                    }`}
                                onClick={() => handleSelect(idx)}
                                aria-label={`Go to project ${project.title}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </motion.div>
    )
}

const ProjectCard = ({ project, index, selectedIndex, handleSelect }: { project: Project; index: number; selectedIndex: number; handleSelect: (idx: number) => void; }) => {
    const { resolvedTheme } = useTheme()
    const isDark = resolvedTheme === "dark"

    return (
        <div
            className={`h-full w-full transition-all duration-300
                ${index === selectedIndex ? "opacity-100 scale-100 z-10" : "opacity-50 scale-95 z-0 cursor-pointer"}
            `}
            style={{ willChange: 'transform' }}
            onClick={() => {
                if (index !== selectedIndex) handleSelect(index)
            }}
        >
            <Card className="group h-full min-h-[450px] max-h-[450px] max-w-[450px] mx-auto overflow-hidden flex flex-col transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10 dark:bg-slate-800/50 dark:hover:bg-slate-800">
                <div className="relative w-full aspect-[7/4] overflow-hidden">
                    <Image
                        src={project.displayImage || "/placeholder.svg?height=200&width=400"}
                        alt={project.title}
                        fill
                        className="p-4 object-contain transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 350px) 100vw, 350px"
                        priority={index === 0}
                        style={isDark && project.isMonochrome ? { filter: "brightness(0) saturate(100%) invert(1)" } : undefined}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                    <div className="absolute bottom-0 left-0 right-0 flex justify-end gap-2 p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                        {project.codeUrl && (
                            <Button size="icon" variant="secondary" asChild>
                                <a
                                    href={project.codeUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="GitHub Repository"
                                >
                                    <Github className="h-5 w-5" />
                                </a>
                            </Button>
                        )}
                        {project.projectUrl && (
                            <Button size="icon" variant="secondary" asChild>
                                <a href={project.projectUrl} target="_blank" rel="noopener noreferrer" aria-label="Live Demo">
                                    <ExternalLink className="h-5 w-5" />
                                </a>
                            </Button>
                        )}
                    </div>
                </div>
                <CardHeader>
                    <CardTitle>{project.title}</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-slate-600 dark:text-slate-300">{project.description}</p>
                </CardContent>
                <CardFooter>
                    <div className="flex flex-wrap gap-2">
                        {(Array.isArray(project.techStack) ? project.techStack : []).map((tech: string) => (
                            <span
                                key={tech}
                                className="rounded-full bg-purple-100 px-2.5 py-0.5 text-xs font-medium text-purple-800 dark:bg-purple-900/30 dark:text-purple-300"
                            >
                                {tech}
                            </span>
                        ))}
                    </div>
                </CardFooter>
            </Card>
        </div >
    )
}