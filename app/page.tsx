"use client"

import { AnimatePresence } from "framer-motion"
// import { useTheme } from "next-themes"
import dynamic from "next/dynamic"

import Navbar from "@/components/navbar"
import Hero from "@/components/hero"
import About from "@/components/about"
import Skills from "@/components/skills"
import Projects from "@/components/projects"
import Contact from "@/components/contact"
import LoadingScreen from "@/components/loading-screen"
import { ScrollProgress } from "@/components/scroll-progress"

// Dynamically import the 3D background to avoid SSR issues
const BackgroundScene = dynamic(() => import("@/components/background-scene"), {
  ssr: false,
  loading: () => (
    <div className="fixed inset-0 bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-950" />
  ),
})

export default function HomePage() {
  // const [isLoading, setIsLoading] = useState(true)
  // const { resolvedTheme } = useTheme()
  // const isDark = resolvedTheme === "dark"

  // useEffect(() => {
  //   // Simulate loading time
  //   const timer = setTimeout(() => {
  //     setIsLoading(false)
  //   }, 2000)

  //   return () => clearTimeout(timer)
  // }, [])

  return (
    <main className="relative min-h-screen bg-slate-50 text-slate-900 antialiased selection:bg-purple-500/30 dark:bg-slate-950 dark:text-slate-50">
      <AnimatePresence mode="wait">
        {false ? (
          <LoadingScreen key="loading" />
        ) : (
          <>
            {/* <Cursor /> */}
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
          </>
        )}
      </AnimatePresence>
    </main>
  )
}
