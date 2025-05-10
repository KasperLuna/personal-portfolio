"use client"

import { useScroll, motion, useSpring } from "framer-motion"

export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  return (
    <motion.div
      className="fixed left-0 right-0 top-0 z-50 h-1 origin-left bg-purple-600 dark:bg-purple-500"
      style={{ scaleX }}
    />
  )
}
