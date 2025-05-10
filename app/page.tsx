

import Navbar from "@/components/navbar"
import Hero from "@/components/hero"
import About from "@/components/about"
import Skills from "@/components/skills"
import Projects from "@/components/projects"
import Contact from "@/components/contact"
import { ScrollProgress } from "@/components/scroll-progress"
import BackgroundScene from "@/components/background-scene"

export default function HomePage() {
  return (
    <main className="relative min-h-screen bg-slate-50 text-slate-900 antialiased selection:bg-purple-500/30 dark:bg-slate-950 dark:text-slate-50">
      <BackgroundScene />
      <ScrollProgress />
      <div className="relative z-10">
        <Navbar />
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </div>
    </main>
  )
}
