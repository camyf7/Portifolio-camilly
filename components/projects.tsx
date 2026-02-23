"use client"

import { useEffect, useState, useRef } from "react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { ExternalLink, Github, Star, GitFork, ArrowUpRight } from "lucide-react"
import { Section } from "./section"
import { useI18n } from "@/lib/i18n"

interface Repo {
  id: number
  name: string
  description: string
  html_url: string
  homepage: string | null
  stargazers_count: number
  forks_count: number
  language: string
  topics: string[]
}

// Seus projetos em destaque
const featuredProjects: Repo[] = [
  {
    id: 1,
    name: "Sol e Neve",
    description: "Site institucional para a sorveteria Sol & Neve, desenvolvido com Next.js e TypeScript. Exclusivo para Caraguatatuba, apresenta sabores, benefícios e a história da marca mineira no litoral paulista.",
    html_url: "https://github.com/camyf7/Soleneve",
    homepage: "https://soleneve.netlify.app",
    stargazers_count: 1,
    forks_count: 1,
    language: "TypeScript",
    topics: ["nextjs", "typescript", "tailwindcss", "netlify"],
  },
  {
    id: 2,
    name: "EchoMusic",
    description: "Rede social musical com comunidades, salas de bate-papo ao vivo e sistema CRUD completo. Permite criar conta, comentar e deletar perfil. Projeto desenvolvido para o 2º módulo do curso de TI no IFSP Caraguatatuba.",
    html_url: "https://github.com/camyf7/echomusic",
    homepage: "https://camyf7.github.io/echomusic",
    stargazers_count: 1,
    forks_count: 0,
    language: "JavaScript",
    topics: ["javascript", "css", "firebase", "social-network"],
  },
  {
    id: 3,
    name: "Mar em Alerta",
    description: "Sistema de alerta comunitário para eventos costeiros em Caraguatatuba e região. Aplicação web para informar e prevenir a comunidade sobre riscos relacionados ao mar e condições costeiras.",
    html_url: "https://github.com/camyf7/mar-em-alerta",
    homepage: "https://camyf7.github.io/mar-em-alerta/",
    stargazers_count: 0,
    forks_count: 0,
    language: "HTML",
    topics: ["html", "css", "javascript", "community"],
  },
  {
    id: 4,
    name: "Kailani Salon Website",
    description: "Site responsivo para salão de beleza com foco em tranças afro e nail art. Oferece suporte a múltiplos idiomas (PT/EN/AL), seleção de serviços, complementos e agendamento de horários.",
    html_url: "https://github.com/camyf7/kailani-salon-website",
    homepage: "https://camyf7.github.io/kailani-salon-website/",
    stargazers_count: 0,
    forks_count: 0,
    language: "JavaScript",
    topics: ["javascript", "html", "css", "multilanguage"],
  },
  
].slice(0, 5) // Garante que apenas 5 projetos sejam mostrados

// Mapeamento de cores por linguagem
const languageColors: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  HTML: "#e34c26",
  CSS: "#563d7c",
}

function ProjectCard({ repo, index }: { repo: Repo; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [6, -6]), {
    damping: 20,
    stiffness: 150,
  })
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-6, 6]), {
    damping: 20,
    stiffness: 150,
  })

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5)
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  const { t } = useI18n()

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 1200,
      }}
      className="group relative rounded-xl border border-border bg-card p-6 transition-colors hover:border-accent/40"
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3 text-muted-foreground">
          {repo.stargazers_count > 0 && (
            <span className="flex items-center gap-1 text-xs">
              <Star size={12} />
              {repo.stargazers_count}
            </span>
          )}
          {repo.forks_count > 0 && (
            <span className="flex items-center gap-1 text-xs">
              <GitFork size={12} />
              {repo.forks_count}
            </span>
          )}
        </div>
        <ArrowUpRight
          size={16}
          className="text-muted-foreground transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
        />
      </div>

      <h3 className="mt-4 text-lg font-semibold text-foreground">
        {repo.name}
      </h3>

      <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
        {repo.description}
      </p>

      <div className="mt-5 flex flex-wrap gap-2">
        {repo.language && (
          <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <span
              className="h-2 w-2 rounded-full"
              style={{
                backgroundColor: languageColors[repo.language] || "#a78bfa",
              }}
            />
            {repo.language}
          </span>
        )}
        {repo.topics.slice(0, 3).map((topic) => (
          <span
            key={topic}
            className="rounded-full bg-muted px-2.5 py-0.5 text-xs text-muted-foreground"
          >
            {topic}
          </span>
        ))}
      </div>

      <div className="mt-6 flex items-center gap-4 border-t border-border pt-4">
        <a
          href={repo.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
        >
          <Github size={13} />
          {t.projects.viewCode}
        </a>
        {repo.homepage && (
          <a
            href={repo.homepage}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
          >
            <ExternalLink size={13} />
            {t.projects.viewProject}
          </a>
        )}
      </div>
    </motion.div>
  )
}

export function Projects() {
  const [repos, setRepos] = useState<Repo[]>(featuredProjects)
  const { t } = useI18n()

  // Força o uso dos projetos em destaque, sem buscar da API
  useEffect(() => {
    setRepos(featuredProjects)
  }, [])

  return (
    <Section id="projects">
      <div className="grid items-start gap-16 lg:grid-cols-[200px_1fr]">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-sm font-medium tracking-widest text-muted-foreground uppercase"
        >
          {t.projects.title}
        </motion.h2>

        <div>
          <div className="grid gap-4 sm:grid-cols-2">
            {repos.map((repo, i) => (
              <ProjectCard key={`${repo.id}-${i}`} repo={repo} index={i} />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-8"
          >
            <a
              href="https://github.com/camyf7"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <Github size={16} />
              <span className="border-b border-transparent group-hover:border-foreground">
                Ver todos no GitHub
              </span>
              <ArrowUpRight size={14} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </motion.div>
        </div>
      </div>
    </Section>
  )
}