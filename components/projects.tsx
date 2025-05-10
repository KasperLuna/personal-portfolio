"use client"

import { useRef, useEffect, useState } from "react"
import { motion, useInView } from "framer-motion"
import Image from "next/image"
import { Github, ExternalLink } from "lucide-react"
import useEmblaCarousel from "embla-carousel-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

const projects = [
  {
    title: "Order Uli",
    tag: "Meal Plan System",
    description:
      "Developed complete solution for the Order Uli meal planner system. Utilizing Next.js, Firebase, and Cloudinary to serve a meal plan system for a local business.",
    image: "/images/uli-project.png",
    openLink: "https://orderuli.com/",
    technologies: ["Next.js", "Firebase", "Cloudinary"],
  },
  {
    title: "ZeroTier Monitor",
    tag: "System Monitor",
    description:
      "A simple monitor using the ZeroTier API to track network node statuses. As Zerotier is always enabled in my machines, I can simply identify status in the browser. Built with Next.js.",
    image: "/images/zerotier-project.png",
    gitLink: "https://github.com/KasperLuna/zerotierapi-next",
    technologies: ["Next.js", "ZeroTier API", "TailwindCSS"],
  },
  {
    title: "Funds",
    tag: "Finance Tracker",
    description:
      "A finance tracker PWA utilizing Next.js with Firebase for backend operations and Mantine for styling. Meant to satisfy my own needs for a personal finance tracker",
    image: "/images/funds-project.png",
    gitLink: "https://github.com/KasperLuna/Funds",
    openLink: "https://funds.kasperluna.com/",
    technologies: ["Next.js", "Firebase", "Mantine UI"],
  },
  {
    title: "This Site",
    tag: "Portfolio Site",
    description:
      "An ongoing project currently using TailwindCSS for styling, RadixUI for accessibility, and Next.js. In the past, using ChakraUI and Framer motion.",
    image: "/images/portfolio-project.png",
    gitLink: "https://github.com/KasperLuna/personal-portfolio",
    openLink: "https://kasperluna.com/",
    technologies: ["Next.js", "TailwindCSS", "Framer Motion"],
  },
  {
    title: "Pain Care",
    tag: "Dental Record Management System",
    description:
      "Developed backend processes for the Pain Care System, utilizing Node.js, Express.js, and PostgreSQL to serve templated pages used for dental record management.",
    image: "/images/dental-project.png",
    technologies: ["Node.js", "Express.js", "PostgreSQL"],
  },
  {
    title: "Createev",
    tag: "e-Commerce Concept Site",
    description:
      "Developed backend processes for the Createev e-commerce concept site. Utilizing Node.js, Express.js and a MySQL database to serve templated pages for e-commerce.",
    image: "/images/ecommerce-project.png",
    gitLink: "https://github.com/KasperLuna/Createev-Concept",
    technologies: ["Node.js", "Express.js", "MySQL"],
  },
]

export default function Projects() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: "center", skipSnaps: false, loop: true })
  const [selectedIndex, setSelectedIndex] = useState(0)
  const autoplayRef = useRef<NodeJS.Timeout | null>(null)


  // Embla: keep selectedIndex in sync with Embla's selected snap
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

  // Autoplay every 5 seconds, reset on user navigation
  useEffect(() => {
    if (!emblaApi) return
    if (autoplayRef.current) clearInterval(autoplayRef.current)
    autoplayRef.current = setInterval(() => {
      if (emblaApi) {
        emblaApi.scrollNext()
      }
    }, 5000)
    return () => {
      if (autoplayRef.current) clearInterval(autoplayRef.current)
    }
  }, [emblaApi, selectedIndex])

  const handleSelect = (index: number) => {
    emblaApi?.scrollTo(index)
  }

  return (
    <section id="projects" ref={ref} className="relative overflow-hidden bg-white py-24 dark:bg-slate-900 sm:py-32">
      <div className="absolute inset-0 z-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] dark:bg-[radial-gradient(#1e293b_1px,transparent_1px)]"></div>
      <motion.div
        className="container relative z-10 mx-auto px-6 lg:px-8"
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <div className="mx-auto max-w-4xl text-center">
          <motion.h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-4xl">
            My Projects and Tools
          </motion.h2>
          <motion.p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
            I&apos;ve worked on a few things, feel free to check my repositories!
          </motion.p>
        </div>
        <div className="mt-16">
          <div className="relative flex flex-col items-center">
            {/* Embla Carousel */}
            <div ref={emblaRef} className="embla w-full max-w-full overflow-hidden">
              <div className="embla__container flex" style={{ willChange: 'transform' }}>
                {projects.map((project, index) => (
                  <div
                    key={project.title}
                    className={`embla__slide flex-shrink-0 flex-grow-0 w-[350px] mx-2 transition-all duration-300
                      ${index === selectedIndex ? "opacity-100 scale-100 z-10" : "opacity-50 scale-95 z-0 cursor-pointer"}
                    `}
                    style={{ willChange: 'transform' }}
                    onClick={() => {
                      if (index !== selectedIndex) handleSelect(index)
                    }}
                  >
                    <Card className="group h-full max-w-[350px] mx-auto overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10 dark:bg-slate-800/50 dark:hover:bg-slate-800">
                      <div className="relative h-48 w-full overflow-hidden">
                        <Image
                          src={project.image || "/placeholder.svg?height=200&width=400"}
                          alt={project.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                        <div className="absolute bottom-0 left-0 right-0 flex justify-end gap-2 p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                          {project.gitLink && (
                            <Button size="icon" variant="secondary" asChild>
                              <a
                                href={project.gitLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="GitHub Repository"
                              >
                                <Github className="h-5 w-5" />
                              </a>
                            </Button>
                          )}
                          {project.openLink && (
                            <Button size="icon" variant="secondary" asChild>
                              <a href={project.openLink} target="_blank" rel="noopener noreferrer" aria-label="Live Demo">
                                <ExternalLink className="h-5 w-5" />
                              </a>
                            </Button>
                          )}
                        </div>
                      </div>
                      <CardHeader>
                        <CardTitle>{project.title}</CardTitle>
                        <CardDescription>{project.tag}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-slate-600 dark:text-slate-300">{project.description}</p>
                      </CardContent>
                      <CardFooter>
                        <div className="flex flex-wrap gap-2">
                          {(Array.isArray(project.technologies) ? project.technologies : []).map((tech) => (
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
                  </div>
                ))}
              </div>
            </div>
            {/* Chevrons and Dots below the carousel */}
            <div className="flex flex-col items-center mt-6">
              <div className="flex justify-center space-x-8">
                {/* Left Chevron */}
                <button
                  onClick={() => emblaApi?.scrollPrev()}
                  className="flex items-center justify-center px-2 text-purple-500 hover:text-purple-700 transition-colors"
                  aria-label="Previous project"
                >
                  <svg width="32" height="32" fill="none" viewBox="0 0 24 24">
                    <path d="M15 19l-7-7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                {/* Right Chevron */}
                <button
                  onClick={() => emblaApi?.scrollNext()}
                  className="flex items-center justify-center px-2 text-purple-500 hover:text-purple-700 transition-colors"
                  aria-label="Next project"
                >
                  <svg width="32" height="32" fill="none" viewBox="0 0 24 24">
                    <path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
