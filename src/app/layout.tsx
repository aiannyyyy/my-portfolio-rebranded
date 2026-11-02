import type { Metadata } from "next"
import { ThemeProvider } from "next-themes"
import { personal } from "@/data"
import "./globals.css"

const description = `${personal.headline}. ${personal.availability} Live demos, case studies and CV.`

export const metadata: Metadata = {
  metadataBase: new URL(personal.siteUrl),
  title: "John Adrian Ticatic - Software Engineer",
  description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    url: "/",
    siteName: personal.name,
    title: `${personal.name} - Full-Stack Developer`,
    description,
  },
  twitter: { card: "summary_large_image", title: `${personal.name} - Full-Stack Developer`, description },
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
