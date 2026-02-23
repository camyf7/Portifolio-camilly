"use client"

import { motion } from "framer-motion"
import { Section } from "./section"
import { useI18n } from "@/lib/i18n"
import { MapPin, GraduationCap, Calendar } from "lucide-react"

export function About() {
  const { t, locale } = useI18n()

  const details = [
    {
      icon: MapPin,
      text: "Caraguatatuba, SP",
    },
    {
      icon: GraduationCap,
      text: locale === "pt" ? "IFSP - Tec. Informatica para Internet" : "IFSP - Internet Computer Technician",
    },
    {
      icon: Calendar,
      text: "18 anos",
    },
  ]

  return (
    <Section id="about">
      <div className="grid items-start gap-16 lg:grid-cols-[200px_1fr]">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-sm font-medium tracking-widest text-muted-foreground uppercase"
        >
          {t.about.title}
        </motion.h2>

        <div>
          <div className="space-y-6">
            {[t.about.p1, t.about.p2, t.about.p3].map((paragraph, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className="text-lg leading-relaxed text-muted-foreground"
              >
                {paragraph}
              </motion.p>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-10 flex flex-wrap gap-6"
          >
            {details.map((detail, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.6 + i * 0.1 }}
                className="flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm text-muted-foreground transition-colors hover:border-accent/50 hover:text-foreground"
              >
                <detail.icon size={14} className="text-accent" />
                {detail.text}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </Section>
  )
}
