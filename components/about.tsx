"use client"

import { useRef } from "react"
import dynamic from "next/dynamic"
import { motion, useInView } from "framer-motion"
import { SquareStackIcon as StackIcon, HardHatIcon as HatIcon, UsersIcon as PeopleIcon } from "lucide-react"

const SplatViewer = dynamic(() => import("./SplatViewer"), { ssr: false })

const features = [
  {
    name: "Full Stack Developer",
    description:
      "With a particular focus on Frontend Development, I've utilized React.js (Next.js), PostgreSQL, Express.js, and Node.js to full effect.",
    icon: StackIcon,
  },
  {
    name: "Project Management",
    description:
      "I've handled my teams to push projects forward from conceptualization all the way through development and delivery.",
    icon: HatIcon,
  },
  {
    name: "Team Oriented",
    description:
      "I firmly believe that learning and working closely with others is the surefire way to become a better worker. I love building things!",
    icon: PeopleIcon,
  },
]

export default function About() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })
  const sectionMouseRef = useRef({ x: 0.5, y: 0.5 })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
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
    <section
      id="about"
      ref={ref}
      className="relative overflow-hidden bg-slate-900 py-24 sm:py-32"
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect()
        sectionMouseRef.current = {
          x: (e.clientX - rect.left) / rect.width,
          y: (e.clientY - rect.top) / rect.height,
        }
      }}
      onMouseLeave={() => {
        sectionMouseRef.current = { x: 0.75, y: 0.5 }
      }}
    >
      {/* Full-section splat background */}
      <div className="absolute inset-0 z-0">
        <SplatViewer mouseRef={sectionMouseRef} />
      </div>

      <motion.div
        className="container relative z-10 mx-auto px-6 lg:px-8"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <div className="mx-auto flex max-w-7xl justify-center lg:justify-start">
          <motion.div
            className="w-full rounded-2xl bg-white/10 p-8 backdrop-blur-md lg:max-w-lg"
            variants={itemVariants}
          >
            <h2 className="text-3xl font-bold tracking-tight text-slate-100 sm:text-4xl">
              Hi, I&apos;m Kasper.
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-300">
              I&apos;m a full stack software engineer based in Metro Manila, passionate about creating exceptional
              digital experiences and leading teams to deliver innovative solutions.
            </p>
            <dl className="mt-10 max-w-xl space-y-8 text-base leading-7 text-gray-300 lg:max-w-none">
              {(Array.isArray(features) ? features : []).map((feature) => (
                <motion.div key={feature.name} className="relative pl-12" variants={itemVariants}>
                  <dt className="inline font-semibold text-gray-100">
                    <feature.icon className="absolute left-0 top-1 h-6 w-6 text-blue-400" aria-hidden="true" />
                    {feature.name}{" "}
                  </dt>
                  <dd className="inline text-slate-400">{feature.description}</dd>
                </motion.div>
              ))}
            </dl>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
