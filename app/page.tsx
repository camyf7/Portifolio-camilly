"use client"

import { I18nProvider } from "@/lib/i18n"
import { GridBackground } from "@/components/particles"
import { CursorSpotlight } from "@/components/cursor-spotlight"
import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { About } from "@/components/about"
import { Journey } from "@/components/journey"
import { Skills } from "@/components/skills"
import { Projects } from "@/components/projects"
import { Contact } from "@/components/contact"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <I18nProvider>
      <GridBackground />
      <CursorSpotlight />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Journey />
        <Skills />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </I18nProvider>
  )
}
