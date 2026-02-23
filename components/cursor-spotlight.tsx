"use client"

import { useEffect, useState } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"
import { useTheme } from "next-themes"

export function CursorSpotlight() {
  const [visible, setVisible] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { resolvedTheme } = useTheme()
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)

  const springConfig = { damping: 25, stiffness: 200 }
  const x = useSpring(cursorX, springConfig)
  const y = useSpring(cursorY, springConfig)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    const handleMove = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
      if (!visible) setVisible(true)
    }

    const handleLeave = () => setVisible(false)
    const handleEnter = () => setVisible(true)

    window.addEventListener("mousemove", handleMove)
    document.addEventListener("mouseleave", handleLeave)
    document.addEventListener("mouseenter", handleEnter)

    return () => {
      window.removeEventListener("mousemove", handleMove)
      document.removeEventListener("mouseleave", handleLeave)
      document.removeEventListener("mouseenter", handleEnter)
    }
  }, [cursorX, cursorY, visible, mounted])

  if (!mounted) return null

  if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
    return null
  }

  const gradient =
    resolvedTheme === "dark"
      ? "radial-gradient(circle, rgba(167,139,250,0.06) 0%, transparent 70%)"
      : "radial-gradient(circle, rgba(167,139,250,0.08) 0%, transparent 70%)"

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-50"
      style={{ opacity: visible ? 1 : 0 }}
    >
      <motion.div
        className="absolute h-[600px] w-[600px] rounded-full"
        style={{
          x,
          y,
          translateX: "-50%",
          translateY: "-50%",
          background: gradient,
        }}
      />
    </motion.div>
  )
}
