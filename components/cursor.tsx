"use client"

import { useState, useEffect } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"

export default function Cursor() {
  const [isVisible, setIsVisible] = useState(false)
  const [isPointer, setIsPointer] = useState(false)

  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)

  const springConfig = { damping: 25, stiffness: 700 }
  const cursorXSpring = useSpring(cursorX, springConfig)
  const cursorYSpring = useSpring(cursorY, springConfig)

  useEffect(() => {
    // Don't show custom cursor on touch devices
    if ("ontouchstart" in window) return

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
      setIsVisible(true)
    }

    const handlePointerOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const isClickable =
        target.tagName.toLowerCase() === "a" ||
        target.tagName.toLowerCase() === "button" ||
        target.closest("a") ||
        target.closest("button") ||
        target.classList.contains("cursor-pointer") ||
        window.getComputedStyle(target).cursor === "pointer"

      setIsPointer(isClickable)
    }

    const handleMouseLeave = () => {
      setIsVisible(false)
    }

    window.addEventListener("mousemove", moveCursor)
    window.addEventListener("mouseover", handlePointerOver)
    document.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      window.removeEventListener("mousemove", moveCursor)
      window.removeEventListener("mouseover", handlePointerOver)
      document.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [cursorX, cursorY])

  if ("ontouchstart" in window) return null

  return (
    <>
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[100] h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-500/30 mix-blend-difference"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          opacity: isVisible ? 1 : 0,
          scale: isPointer ? 1.5 : 1,
        }}
      />
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[100] h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white mix-blend-difference"
        style={{
          x: cursorX,
          y: cursorY,
          opacity: isVisible ? 1 : 0,
          scale: isPointer ? 0.5 : 1,
        }}
      />
    </>
  )
}
