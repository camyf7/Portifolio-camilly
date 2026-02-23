"use client"

import { motion } from "framer-motion"
import { Section } from "./section"
import { useI18n } from "@/lib/i18n"

const categories = [
  {
    key: "frontend" as const,
    skills: [
      "React",
      "TypeScript",
      "JavaScript",
      "Next.js",
      "HTML5",
      "CSS3",
      "Tailwind CSS",
      "Styled Components",
      "Framer Motion",
      "Responsive Design",
    ],
  },
  {
    key: "backend" as const,
    skills: ["Node.js", "Express", "REST APIs", "Firebase"],
  },
  {
    key: "tools" as const,
    skills: ["Git", "GitHub", "Figma", "Vite", "VS Code", "Postman"],
  },
  {
    key: "design" as const,
    skills: [
      "Wireframing",
      "Prototyping",
      "UX Design",
      "Accessibility",
      "Design Systems",
    ],
  },
]

function SkillPill({ name, delay }: { name: string; delay: number }) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.4, delay }}
      whileHover={{
        scale: 1.08,
        backgroundColor: "var(--accent)",
        color: "var(--accent-foreground)",
      }}
      className="cursor-default rounded-full border border-border px-4 py-2 text-sm text-foreground transition-colors"
    >
      {name}
    </motion.span>
  )
}

export function Skills() {
  const { t } = useI18n()

  return (
    <Section id="skills">
      <div className="grid items-start gap-16 lg:grid-cols-[200px_1fr]">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-sm font-medium tracking-widest text-muted-foreground uppercase"
        >
          {t.skills.title}
        </motion.h2>

        <div className="space-y-12">
          {categories.map((category, catIndex) => (
            <motion.div
              key={category.key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: catIndex * 0.1 }}
            >
              <h3 className="mb-4 text-xs font-medium tracking-widest text-accent uppercase">
                {t.skills[category.key]}
              </h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, skillIndex) => (
                  <SkillPill
                    key={skill}
                    name={skill}
                    delay={catIndex * 0.05 + skillIndex * 0.03}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  )
}
