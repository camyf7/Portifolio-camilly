"use client"

import { motion } from "framer-motion"
import { ArrowDown, Download } from "lucide-react"
import { useI18n } from "@/lib/i18n"

function AnimatedText({ text, delay = 0 }: { text: string; delay?: number }) {
  return (
    <span className="inline-flex overflow-hidden">
      {text.split("").map((char, i) => (
        <motion.span
          key={`${char}-${i}`}
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          transition={{
            duration: 0.5,
            delay: delay + i * 0.03,
            ease: [0.25, 0.4, 0, 1],
          }}
          className="inline-block"
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </span>
  )
}

export function Hero() {
  const { t } = useI18n()

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center justify-center px-6"
    >
      <div className="relative z-10 mx-auto max-w-5xl">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-6 font-mono text-sm text-accent"
        >
          {t.hero.greeting}
        </motion.p>

        <h1 className="text-balance text-5xl font-bold leading-[1.05] tracking-tight text-foreground md:text-7xl lg:text-8xl">
          <AnimatedText text={t.hero.name} delay={0.4} />
        </h1>

        <div className="mt-3 overflow-hidden">
          <motion.h2
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6, delay: 1.2, ease: [0.25, 0.4, 0, 1] }}
            className="text-3xl font-medium text-muted-foreground md:text-5xl lg:text-6xl"
          >
            {t.hero.role}
          </motion.h2>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.6 }}
          className="mt-8 max-w-lg text-pretty text-lg leading-relaxed text-muted-foreground"
        >
          {t.hero.description}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 2 }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <a
            href="#projects"
            className="group inline-flex items-center gap-2 rounded-full bg-foreground px-7 py-3 text-sm font-medium text-background transition-all hover:gap-3"
          >
            {t.hero.viewProjects}
            <ArrowDown size={14} className="transition-transform group-hover:translate-y-0.5" />
          </a>
          <a
            href="/CamillyFerreira-CV.pdf"
            download
            className="inline-flex items-center gap-2 rounded-full border border-border px-7 py-3 text-sm font-medium text-foreground transition-all hover:border-accent hover:text-accent"
          >
            <Download size={14} />
            {t.hero.downloadCV}
          </a>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown size={16} className="text-muted-foreground" />
        </motion.div>
      </motion.div>
    </section>
  )
}
