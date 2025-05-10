"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Tooltip } from "@/components/ui/tooltip"

// Import skill icons from Lucide or other icon libraries
import {
  Heading5Icon as Html5,
  CodepenIcon as Css3,
  CodepenIcon as ReactLogo,
  Figma,
  Database,
  Server,
  Github,
  GitBranch,
  Cloud,
  Code2,
  Layers,
  Cpu,
} from "lucide-react"

const skillCategories = [
  {
    title: "Frontend",
    skills: [
      { name: "HTML5", icon: Html5, color: "text-orange-500" },
      { name: "CSS3", icon: Css3, color: "text-blue-500" },
      { name: "React.js", icon: ReactLogo, color: "text-cyan-400" },
      { name: "Next.js", icon: Layers, color: "text-black dark:text-white" },
      { name: "Tailwind CSS", icon: Code2, color: "text-sky-500" },
      { name: "Figma", icon: Figma, color: "text-purple-500" },
    ],
  },
  {
    title: "Backend",
    skills: [
      { name: "Node.js", icon: Server, color: "text-green-500" },
      { name: "Express.js", icon: Code2, color: "text-gray-500" },
      { name: "PostgreSQL", icon: Database, color: "text-blue-700" },
      { name: "MySQL", icon: Database, color: "text-orange-600" },
      { name: "Firebase", icon: Cloud, color: "text-yellow-500" },
      { name: "Redis", icon: Database, color: "text-red-500" },
    ],
  },
  {
    title: "DevOps & Tools",
    skills: [
      { name: "Git", icon: GitBranch, color: "text-red-500" },
      { name: "GitHub", icon: Github, color: "text-black dark:text-white" },
      { name: "Docker", icon: Cpu, color: "text-blue-500" },
      { name: "Vercel", icon: Cloud, color: "text-black dark:text-white" },
      { name: "Google Cloud", icon: Cloud, color: "text-blue-400" },
      { name: "Netlify", icon: Cloud, color: "text-teal-500" },
    ],
  },
]

export default function Skills() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

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

        <div className="mx-auto mt-16 max-w-7xl">
          {skillCategories.map((category) => (
            <motion.div key={category.title} className="mb-16" variants={itemVariants}>
              <h3 className="mb-8 text-2xl font-semibold text-purple-600 dark:text-purple-400">{category.title}</h3>
              <div className="grid grid-cols-3 gap-6 sm:grid-cols-4 md:grid-cols-6">
                {category.skills.map((skill) => (
                  <Tooltip key={skill.name} text={skill.name}>

                    <motion.div
                      className="flex flex-col items-center justify-center"
                      variants={itemVariants}
                      whileHover={{ scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-lg dark:bg-slate-800">
                        <skill.icon className={`h-8 w-8 ${skill.color}`} />
                      </div>
                      <span className="mt-2 text-sm font-medium text-slate-700 dark:text-slate-300">
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
