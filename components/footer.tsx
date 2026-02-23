"use client"

import { Github, Linkedin, MessageCircle, Instagram, Heart } from "lucide-react"
import { useI18n } from "@/lib/i18n"

const links = [
  { icon: Github, href: "https://github.com/camyf7", label: "GitHub" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/camillydev/", label: "LinkedIn" },
  { icon: Instagram, href: "https://www.instagram.com/camy.f7/", label: "Instagram" },
  { icon: MessageCircle, href: "https://wa.me/5512983121860", label: "WhatsApp" },
]

export function Footer() {
  const { t } = useI18n()

  return (
    <footer className="border-t border-border px-6 py-8">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 sm:flex-row">
        <p className="flex items-center gap-1 text-xs text-muted-foreground">
          {`\u00A9 ${new Date().getFullYear()} Camilly Ferreira.`}
          {" "}
          {t.footer.madeWith}
          {" "}
          <Heart size={12} className="text-accent" />
        </p>
        <div className="flex items-center gap-4">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground transition-colors hover:text-foreground"
              aria-label={link.label}
            >
              <link.icon size={16} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
