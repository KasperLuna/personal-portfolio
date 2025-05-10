"use client"

import { useRef } from "react"
import Image from "next/image"
import { motion, useInView } from "framer-motion"
import { SquareStackIcon as StackIcon, HardHatIcon as HatIcon, UsersIcon as PeopleIcon } from "lucide-react"

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
    <section id="about" ref={ref} className="relative overflow-hidden bg-white py-24 dark:bg-slate-900 sm:py-32">
      <div className="absolute inset-0 z-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] dark:bg-[radial-gradient(#1e293b_1px,transparent_1px)]"></div>

      <motion.div
        className="container relative z-10 mx-auto px-6 lg:px-8"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <div className="mx-auto flex max-w-7xl flex-col-reverse justify-center gap-12 lg:flex-row lg:items-center">
          <motion.div className="lg:max-w-lg" variants={itemVariants}>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-4xl">
              Hi, I&apos;m Kasper.
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-400">
              I&apos;m a full stack software engineer based in Manila, and an honors graduate of B.S. Information
              Systems at the University of Santo Tomas.
            </p>
            <dl className="mt-10 max-w-xl space-y-8 text-base leading-7 text-gray-600 lg:max-w-none">
              {(Array.isArray(features) ? features : []).map((feature) => (
                <motion.div key={feature.name} className="relative pl-12" variants={itemVariants}>
                  <dt className="inline font-semibold text-gray-900 dark:text-gray-300">
                    <feature.icon className="absolute left-0 top-1 h-6 w-6 text-purple-600" aria-hidden="true" />
                    {feature.name}{" "}
                  </dt>
                  <dd className="inline text-slate-500 dark:text-slate-400">{feature.description}</dd>
                </motion.div>
              ))}
            </dl>
          </motion.div>

          <motion.div
            className="relative mx-auto lg:mx-0"
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="relative h-[400px] w-[350px] overflow-hidden rounded-2xl bg-white shadow-xl dark:bg-slate-800 sm:h-[500px] sm:w-[400px]">
              <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-purple-600 to-blue-600 opacity-75 blur"></div>
              <div className="relative h-full w-full rounded-2xl">
                <Image
                  src="/face.webp"
                  alt="Kasper Luna's Graduation Photo"
                  fill
                  className="rounded-2xl object-cover"
                  sizes="(max-width: 768px) 350px, 400px"
                  priority
                />
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
