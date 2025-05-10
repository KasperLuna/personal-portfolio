import { fetchProjects } from "@/lib/contentful"
import ProjectsCarousel from "./projects-carousel-client"

export const revalidate = 86400 // 24 hours in seconds

export default async function Projects() {
  const projects = await fetchProjects()
  return (
    <section id="projects" className="relative overflow-hidden bg-white py-24 dark:bg-slate-900 sm:py-32">
      <div className="absolute inset-0 z-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] dark:bg-[radial-gradient(#1e293b_1px,transparent_1px)]"></div>
      <div className="container relative z-10 mx-auto px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-4xl">
            My Projects and Tools
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
            I&apos;ve worked on a few things, feel free to check my repositories!
          </p>
        </div>
        <div className="mt-16">
          <ProjectsCarousel projects={projects} />
        </div>
      </div>
    </section>
  )
}
