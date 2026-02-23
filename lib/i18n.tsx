"use client"

import { createContext, useContext, useState, useCallback, type ReactNode } from "react"

type Locale = "pt" | "en"


const translations = {
  pt: {
    nav: {
      about: "Sobre",
      journey: "Jornada",
      skills: "Skills",
      projects: "Projetos",
      contact: "Contato",
    },
    hero: {
      greeting: "Ola, eu sou",
      name: "Camilly Ferreira",
      role: "Desenvolvedora Front-End",
      description:
        "Construo experiencias web modernas, responsivas e interativas com React e TypeScript.",
      viewProjects: "Ver Projetos",
      downloadCV: "Download CV",
    },
    about: {
      title: "Sobre mim",
      p1: "Sou estudante de Tecnico em Informatica para Internet no IFSP, tenho 18 anos e sou apaixonada por construir interfaces web que unem design e tecnologia.",
      p2: "Proativa e organizada, busco aplicar meus conhecimentos em desenvolvimento front-end para criar experiencias digitais acessiveis e de alta qualidade.",
      p3: "Meu foco esta em React, TypeScript e Tailwind CSS, sempre explorando novas tecnologias para entregar projetos com excelencia.",
    },
    journey: {
      title: "Jornada",
      education: "Formacao",
      certifications: "Certificacoes",
      experience: "Experiencia",
    },
    skills: {
      title: "Habilidades",
      frontend: "Front-End",
      backend: "Back-End",
      tools: "Ferramentas",
      design: "UI/UX",
    },
    projects: {
      title: "Projetos selecionados",
      viewProject: "Ver Projeto",
      viewCode: "Codigo",
    },
    contact: {
      title: "Contato",
      subtitle: "Quer conversar sobre um projeto ou apenas dizer oi? Estou sempre aberta para novas oportunidades.",
      cta: "Vamos conversar",
    },
    footer: {
      rights: "Todos os direitos reservados.",
      madeWith: "Feito com",
    },
  },
  en: {
    nav: {
      about: "About",
      journey: "Journey",
      skills: "Skills",
      projects: "Projects",
      contact: "Contact",
    },
    hero: {
      greeting: "Hey, I'm",
      name: "Camilly Ferreira",
      role: "Front-End Developer",
      description:
        "I build modern, responsive and interactive web experiences using React and TypeScript.",
      viewProjects: "View Projects",
      downloadCV: "Download CV",
    },
    about: {
      title: "About me",
      p1: "I'm a Computer Science for Internet student at IFSP, 18 years old, passionate about building web interfaces that merge design and technology.",
      p2: "Proactive and organized, I apply my front-end development knowledge to create accessible, high-quality digital experiences.",
      p3: "My focus is on React, TypeScript and Tailwind CSS, always exploring new technologies to deliver projects with excellence.",
    },
    journey: {
      title: "Journey",
      education: "Education",
      certifications: "Certifications",
      experience: "Experience",
    },
    skills: {
      title: "Skills",
      frontend: "Front-End",
      backend: "Back-End",
      tools: "Tools",
      design: "UI/UX",
    },
    projects: {
      title: "Selected projects",
      viewProject: "View Project",
      viewCode: "Source",
    },
    contact: {
      title: "Contact",
      subtitle: "Want to discuss a project or just say hi? I'm always open to new opportunities.",
      cta: "Let's talk",
    },
    footer: {
      rights: "All rights reserved.",
      madeWith: "Made with",
    },
  },
} as const

type Translations = typeof translations.en

interface I18nContextType {
  locale: Locale
  t: Translations
  toggleLocale: () => void
}

const I18nContext = createContext<I18nContextType | null>(null)

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>("pt")

  const toggleLocale = useCallback(() => {
    setLocale((prev) => (prev === "pt" ? "en" : "pt"))
  }, [])

  const t = translations[locale]

  return (
    <I18nContext.Provider value={{ locale, t, toggleLocale }}>
      {children}
    </I18nContext.Provider>
  )
}

export function useI18n() {
  const context = useContext(I18nContext)
  if (!context) throw new Error("useI18n must be used within I18nProvider")
  return context
}
