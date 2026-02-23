"use client"

import { motion } from "framer-motion"
import { Section } from "./section"
import { useI18n } from "@/lib/i18n"
import { GraduationCap, Award, Briefcase } from "lucide-react"

interface TimelineItem {
  year: string
  title: { pt: string; en: string }
  subtitle: { pt: string; en: string }
  description?: { pt: string; en: string }
  status?: { pt: string; en: string }
  icon: typeof GraduationCap
  category: "education" | "certifications" | "experience"
}

const timeline: TimelineItem[] = [
  {
    year: "2024 - 2026",
    title: {
      pt: "Tecnico em Informatica para Internet",
      en: "Internet Computer Technician",
    },
    subtitle: {
      pt: "Instituto Federal de Sao Paulo (IFSP)",
      en: "Federal Institute of Sao Paulo (IFSP)",
    },
    status: {
      pt: "Cursando",
      en: "In Progress",
    },
    icon: GraduationCap,
    category: "education",
  },
  {
    year: "2025",
    title: {
      pt: "Hackathon Inova Caraguá (Turismo)",
      en: "Hackathon Inova Caraguá (Tourism)",
    },
    subtitle: {
      pt: "IFSP & Secretaria de Turismo",
      en: "IFSP & Tourism Department",
    },
    description: {
      pt: "Maratona de 3 dias focada no desenvolvimento de solucoes tecnologicas para o setor publico e turistico local.",
      en: "3-day marathon focused on developing tech solutions for local public and tourism sectors.",
    },
    icon: Award,
    category: "certifications",
  },
  {
    year: "2023",
    title: {
      pt: "Gestao Financeira",
      en: "Financial Management",
    },
    subtitle: {
      pt: "CA",
      en: "CA",
    },
    icon: Award,
    category: "certifications",
  },
  {
    year: "2023",
    title: {
      pt: "Atendimento ao Cliente",
      en: "Customer Service",
    },
    subtitle: {
      pt: "Sebrae",
      en: "Sebrae",
    },
    icon: Award,
    category: "certifications",
  },
  {
    year: "",
    title: {
      pt: "Ciencias da Natureza",
      en: "Natural Sciences",
    },
    subtitle: {
      pt: "Colegio Adventista de Caraguatatuba",
      en: "Adventist School of Caraguatatuba",
    },
    status: {
      pt: "Concluido",
      en: "Completed",
    },
    icon: GraduationCap,
    category: "education",
  },
  {
    year: "",
    title: {
      pt: "Atendente",
      en: "Sales Associate",
    },
    subtitle: {
      pt: "Sol & Neve",
      en: "Sol & Neve",
    },
    description: {
      pt: "Atendimento ao publico, conhecimento de caixa e suporte operacional.",
      en: "Customer service, cashier operations and operational support.",
    },
    icon: Briefcase,
    category: "experience",
  },
  {
    year: "",
    title: {
      pt: "Assistente Administrativo",
      en: "Administrative Assistant",
    },
    subtitle: {
      pt: "Studio de Beleza Claudia",
      en: "Studio de Beleza Claudia",
    },
    description: {
      pt: "Atendimento ao cliente, administracao de agenda e organizacao do ambiente.",
      en: "Customer service, schedule management and workspace organization.",
    },
    icon: Briefcase,
    category: "experience",
  },
]

const categoryIcons = {
  education: GraduationCap,
  certifications: Award,
  experience: Briefcase,
}

export function Journey() {
  const { t, locale } = useI18n()

  const categories = [
    { key: "education" as const, label: t.journey.education },
    { key: "certifications" as const, label: t.journey.certifications },
    { key: "experience" as const, label: t.journey.experience },
  ]

  return (
    <Section id="journey">
      <div className="grid items-start gap-16 lg:grid-cols-[200px_1fr]">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-sm font-medium tracking-widest text-muted-foreground uppercase"
        >
          {t.journey.title}
        </motion.h2>

        <div className="space-y-16">
          {categories.map((category, catIdx) => {
            const items = timeline.filter((item) => item.category === category.key)
            const CategoryIcon = categoryIcons[category.key]

            return (
              <motion.div
                key={category.key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: catIdx * 0.1 }}
              >
                <div className="mb-6 flex items-center gap-2">
                  <CategoryIcon size={14} className="text-accent" />
                  <h3 className="text-xs font-medium tracking-widest text-accent uppercase">
                    {category.label}
                  </h3>
                </div>

                <div className="relative border-l border-border pl-8">
                  {items.map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-30px" }}
                      transition={{ duration: 0.5, delay: i * 0.1 }}
                      className="group relative pb-10 last:pb-0"
                    >
                      <div className="absolute -left-[41px] top-0.5 flex h-6 w-6 items-center justify-center rounded-full border border-border bg-background transition-colors group-hover:border-accent group-hover:bg-accent/10">
                        <item.icon size={12} className="text-muted-foreground transition-colors group-hover:text-accent" />
                      </div>

                      <div className="space-y-1.5">
                        {item.year && (
                          <span className="font-mono text-xs text-accent">
                            {item.year}
                          </span>
                        )}
                        <h4 className="text-base font-medium text-foreground">
                          {item.title[locale]}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          {item.subtitle[locale]}
                        </p>
                        {item.description && (
                          <p className="text-sm leading-relaxed text-muted-foreground/70">
                            {item.description[locale]}
                          </p>
                        )}
                        {item.status && (
                          <span className="mt-2 inline-block rounded-full border border-accent/30 bg-accent/10 px-3 py-0.5 text-xs font-medium text-accent">
                            {item.status[locale]}
                          </span>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </Section>
  )
}
