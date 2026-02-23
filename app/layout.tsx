import type { Metadata, Viewport } from "next"
import { Inter, Fira_Code } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css"

const _inter = Inter({ subsets: ["latin"] })
const _firaCode = Fira_Code({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Camilly Ferreira | Front-End Developer",
  description:
    "Portfolio of Camilly Ferreira - Front-End Developer crafting modern, responsive and interactive web experiences with React and TypeScript.",
  keywords: [
    "Front-End Developer",
    "React",
    "TypeScript",
    "Portfolio",
    "Camilly Ferreira",
    "Web Developer",
  ],
  authors: [{ name: "Camilly Ferreira" }],
  openGraph: {
    title: "Camilly Ferreira | Front-End Developer",
    description:
      "Crafting modern, responsive and interactive web experiences with React and TypeScript.",
    type: "website",
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafaf9" },
    { media: "(prefers-color-scheme: dark)", color: "#0c0a09" },
  ],
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className="font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
        >
          {children}
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
