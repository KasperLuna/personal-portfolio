"use client"

import { useRef, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowDown } from "lucide-react"
import dynamic from "next/dynamic"
import { BannerHero, StackHero } from "./KasperLunaLogo"
import { cn } from "@/lib/utils"
import { useTheme } from "next-themes"

// Dynamically import the 3D model to avoid SSR issues
const HeroModel = dynamic(() => import("@/components/hero-model"), {
  ssr: false,
})

export default function Hero() {
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === "dark"
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8])
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 100])

  // 3D effect state and handlers
  const [bannerTransform, setBannerTransform] = useState<string>("");
  const [stackTransform, setStackTransform] = useState<string>("");

  // 3D tilt relative to the whole hero section
  function handleSectionMouseMove(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    const section = ref.current;
    if (!section) return;
    const rect = section.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const maxTilt = 18;
    const rotateY = ((x - centerX) / centerX) * maxTilt;
    const rotateX = -((y - centerY) / centerY) * maxTilt;
    const transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    setBannerTransform(transform);
    setStackTransform(transform);
  }
  function handleSectionMouseLeave() {
    const reset = "perspective(800px) rotateX(0deg) rotateY(0deg)";
    setBannerTransform(reset);
    setStackTransform(reset);
  }

  return (
    <motion.section
      ref={ref}
      id="home"
      className="relative flex h-screen w-full items-center justify-center overflow-hidden"
      style={{ opacity, scale, y }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      onMouseMove={handleSectionMouseMove}
      onMouseLeave={handleSectionMouseLeave}
    >
      <div className="absolute inset-0 z-0">
        <HeroModel />
      </div>

      <div className="container relative z-10 mx-auto flex flex-col items-center justify-center px-4 text-center">
        <motion.div
          className="flex flex-grow mb-4 flex-shrink-0 w-full max-w-3xl"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <svg height={0}>
            <defs>
              <linearGradient id="Gradient">
                <stop offset="70%" stopColor="#ffffff" />
                <stop offset="95%" stopColor="#c5c7c7" />
              </linearGradient>
              <linearGradient id="GradientLight">
                <stop offset="50%" stopColor="#0f0f0f0" />
                <stop offset="95%" stopColor="#000000" />
              </linearGradient>
            </defs>
          </svg>
          {/* BannerHero 3D wrapper */}
          <div
            className={cn("hidden min-w-0 w-full h-full flex-shrink-0 stroke-black xs:hidden sm:flex lg:flex", { "stroke-white": isDark })}
            style={{ perspective: "800px", transformStyle: "preserve-3d", transform: bannerTransform, transition: "transform 0.2s cubic-bezier(.25,.8,.25,1)" }}
          >
            <BannerHero />
          </div>
          {/* StackHero 3D wrapper */}
          <div
            className={cn("stroke-black min-w-0 w-full flex-shrink-0 flex sm:hidden lg:hidden", { "stroke-white": isDark })}
            style={{ perspective: "800px", transformStyle: "preserve-3d", transform: stackTransform, transition: "transform 0.2s cubic-bezier(.25,.8,.25,1)" }}
          >
            <StackHero />
          </div>
        </motion.div>
        {/*  hide bannerhero when screen is smaller than md */}


        <motion.p
          className="mb-8 max-w-2xl text-lg text-slate-700 dark:text-slate-300 sm:text-xl"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <span className="font-semibold">Software Engineer</span> Experienced in Frontend & Backend System Design,
          Project Management, and Development
        </motion.p>

        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <a
            href="#about"
            className="group flex items-center justify-center gap-2 rounded-full bg-purple-600 px-6 py-3 font-medium text-white transition-all hover:bg-purple-700 hover:shadow-lg hover:shadow-purple-500/20"
          >
            Learn More
            <ArrowDown className="h-4 w-4 animate-bounce" />
          </a>
        </motion.div>
      </div>
    </motion.section>
  )
}
