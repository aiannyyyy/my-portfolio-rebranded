import PortfolioLayout from "@/components/layout/PortfolioLayout"
import Hero from "@/components/sections/Hero"
import About from "@/components/sections/About"
import Skills from "@/components/sections/Skills"
import Projects from "@/components/sections/Projects"
import Experience from "@/components/sections/Experience"
import Education from "@/components/sections/Education"
import Certifications from "@/components/sections/Certifications"
import ChatWidget from "@/components/ChatWidget"
import { personal } from "@/data"

// Lets search engines show a profile card for searches on my name.
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: personal.name,
  jobTitle: "Full-Stack Developer",
  url: personal.siteUrl,
  image: personal.siteUrl + personal.avatarUrl,
  email: "mailto:" + personal.email,
  address: { "@type": "PostalAddress", addressLocality: "Batangas", addressCountry: "PH" },
  sameAs: [personal.github, personal.linkedin],
  knowsAbout: ["React", "Next.js", "Node.js", "TypeScript", "PostgreSQL", "MySQL", "Oracle DB"],
}

export default function Home() {
  return (
    <PortfolioLayout>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c") }} />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Education />
      <Certifications />
      <ChatWidget />
    </PortfolioLayout>
  )
}
