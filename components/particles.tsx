"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { useTheme } from "next-themes"

interface Dot {
  x: number
  y: number
  baseOpacity: number
  currentOpacity: number
  targetOpacity: number
}

export function GridBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const mouseRef = useRef({ x: -1000, y: -1000 })
  const dotsRef = useRef<Dot[]>([])
  const themeRef = useRef(resolvedTheme)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    themeRef.current = resolvedTheme
  }, [resolvedTheme])

  const initDots = useCallback((width: number, height: number) => {
    const spacing = 40
    const dots: Dot[] = []
    for (let x = 0; x < width; x += spacing) {
      for (let y = 0; y < height; y += spacing) {
        dots.push({
          x,
          y,
          baseOpacity: 0.08 + Math.random() * 0.04,
          currentOpacity: 0.08,
          targetOpacity: 0.08,
        })
      }
    }
    dotsRef.current = dots
  }, [])

  useEffect(() => {
    if (!mounted) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationId: number

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      initDots(canvas.width, canvas.height)
    }
    resize()
    window.addEventListener("resize", resize)

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }
    window.addEventListener("mousemove", handleMouseMove)

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const isDark = themeRef.current === "dark"
      const dotColor = isDark ? "255,255,255" : "0,0,0"
      const mouse = mouseRef.current
      const radius = 200

      for (const dot of dotsRef.current) {
        const dx = mouse.x - dot.x
        const dy = mouse.y - dot.y
        const dist = Math.sqrt(dx * dx + dy * dy)

        if (dist < radius) {
          const proximity = 1 - dist / radius
          dot.targetOpacity = dot.baseOpacity + proximity * 0.35
        } else {
          dot.targetOpacity = dot.baseOpacity
        }

        dot.currentOpacity += (dot.targetOpacity - dot.currentOpacity) * 0.08

        ctx.beginPath()
        ctx.arc(dot.x, dot.y, 1, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${dotColor}, ${dot.currentOpacity})`
        ctx.fill()
      }

      animationId = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener("resize", resize)
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [mounted, initDots])

  if (!mounted) return null

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0"
      aria-hidden="true"
    />
  )
}
