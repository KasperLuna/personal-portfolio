"use client"

import Image from "next/image"
import { useRef, useMemo } from "react"
import { motion, useInView } from "framer-motion"
import { Tooltip } from "@/components/ui/tooltip"
import { type Skill } from "@/lib/contentful"

interface SkillsClientProps {
    skills: Skill[]
}

export default function SkillsClient({ skills }: SkillsClientProps) {
    const ref = useRef<HTMLDivElement>(null)
    const isInView = useInView(ref, { once: true, amount: 0.2 })
    // Use useMemo for grouping to avoid unnecessary state/effect
    const groupedSkills = useMemo(() => {
        return skills.reduce((acc, skill) => {
            if (!acc[skill.category]) {
                acc[skill.category] = []
            }
            acc[skill.category].push(skill)
            return acc
        }, {} as Record<string, Skill[]>)
    }, [skills])

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    }

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.5,
            },
        },
    }

    return (
        <section id="skills" ref={ref} className="relative overflow-hidden bg-slate-50 py-24 dark:bg-slate-950 sm:py-32">
            <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px]"></div>
            <motion.div
                className="container relative z-10 mx-auto px-6 lg:px-8"
                variants={containerVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
            >
                <div className="mx-auto max-w-4xl text-center">
                    <motion.h2
                        className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-4xl"
                        variants={itemVariants}
                    >
                        Technical Skills
                    </motion.h2>
                    <motion.p className="mt-4 text-lg text-gray-600 dark:text-gray-400" variants={itemVariants}>
                        Here&apos;s some of the tricks I&apos;ve picked up along the way.
                    </motion.p>
                </div>
                <div className="mx-auto mt-16 max-w-7xl items-center justify-center flex flex-col gap-16 px-4 sm:px-6 lg:px-8">
                    {Object.entries(groupedSkills).map(([category, skills]) => (
                        <motion.div key={category} variants={itemVariants}>
                            <h3 className="mb-4 text-2xl font-semibold text-purple-600 dark:text-purple-400">{category}</h3>
                            <div className="flex flex-wrap gap-5 justify-center">
                                {skills.map((skill) => (
                                    <Tooltip key={skill.name} text={skill.name}>
                                        <motion.div
                                            className="flex flex-col items-center justify-center group relative cursor-pointer"
                                            variants={itemVariants}
                                            whileHover={{ scale: 1.12, rotate: 4 }}
                                            whileTap={{ scale: 0.98, rotate: -2 }}
                                            transition={{ type: "spring", stiffness: 400, damping: 18 }}
                                            tabIndex={0}
                                        >
                                            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-md dark:bg-slate-500 z-10 border border-slate-200 dark:border-slate-700 group-hover:border-purple-400 group-focus:border-purple-400 transition-all duration-200">
                                                {skill.icon ? (
                                                    <Image
                                                        src={skill.icon}
                                                        alt={skill.name}
                                                        width={48}
                                                        height={48}
                                                        className="h-12 w-12 object-contain drop-shadow group-hover:scale-110 group-hover:drop-shadow-lg transition-transform duration-200"
                                                        sizes="48px"
                                                        loading="lazy"
                                                        style={{
                                                            filter: skill.iconColor
                                                                ? `drop-shadow(0 0 5px ${skill.iconColor}) saturate(1.5) brightness(1.08)`
                                                                : undefined,
                                                        }}
                                                    />
                                                ) : (
                                                    <span className="h-12 w-12" />
                                                )}
                                            </div>
                                            {/* Skill Name (below icon, always visible) */}
                                            <span className="mt-2 text-sm font-medium text-slate-700 dark:text-slate-300 truncate w-20 text-center">
                                                {skill.name}
                                            </span>
                                        </motion.div>
                                    </Tooltip>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </section>
    )
}
