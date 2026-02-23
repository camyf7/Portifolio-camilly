"use client"

import { motion } from "framer-motion"
import { Section } from "./section"
import { useI18n } from "@/lib/i18n"
import { Github, Linkedin, MessageCircle, Instagram, ArrowUpRight, Download } from "lucide-react"

const socials = [
  {
    icon: MessageCircle,
    label: "WhatsApp",
    href: "https://wa.me/5512983121860",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/camillydev/",
  },
  {
    icon: Github,
    label: "GitHub",
    href: "https://github.com/camyf7",
  },
  {
    icon: Instagram,
    label: "Instagram",
    href: "https://www.instagram.com/camy.f7/",
  },
]

export function Contact() {
  const { t } = useI18n()

  return (
    <Section id="contact">
      <div className="grid items-start gap-16 lg:grid-cols-[200px_1fr]">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-sm font-medium tracking-widest text-muted-foreground uppercase"
        >
          {t.contact.title}
        </motion.h2>

        <div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-lg text-lg leading-relaxed text-muted-foreground"
          >
            {t.contact.subtitle}
          </motion.p>

          <motion.a
            href="https://wa.me/5512983121860"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            whileHover={{ gap: "12px" }}
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-foreground px-7 py-3 text-sm font-medium text-background transition-all"
          >
            {t.contact.cta}
            <ArrowUpRight size={14} />
          </motion.a>

          <div className="mt-12 flex flex-col gap-3">
            {socials.map((social, i) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.1 + i * 0.08 }}
                className="group flex items-center justify-between border-b border-border py-4 transition-colors hover:border-accent"
              >
                <span className="flex items-center gap-3 text-sm text-muted-foreground transition-colors group-hover:text-foreground">
                  <social.icon size={16} />
                  {social.label}
                </span>
                <ArrowUpRight
                  size={14}
                  className="text-muted-foreground transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                />
              </motion.a>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-10"
          >
            <a
              href="/CamillyFerreira-CV.pdf"
              download
              className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm text-foreground transition-colors hover:border-accent hover:text-accent"
            >
              <Download size={14} />
              Download CV
            </a>
          </motion.div>
        </div>
      </div>
    </Section>
  )
}
