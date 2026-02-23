"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"

interface SectionProps {
  id?: string
  children: React.ReactNode
  className?: string
}

export function Section({ id, children, className = "" }: SectionProps) {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <motion.section
      id={id}
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.7, ease: [0.25, 0.4, 0, 1] }}
      className={`px-6 py-24 md:py-32 ${className}`}
    >
      <div className="mx-auto max-w-5xl">{children}</div>
    </motion.section>
  )
}
