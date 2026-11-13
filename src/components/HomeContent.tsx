import PortfolioLayout from "@/components/layout/PortfolioLayout"
import Hero from "@/components/sections/Hero"
import About from "@/components/sections/About"
import Skills from "@/components/sections/Skills"
import Projects from "@/components/sections/Projects"
import Notes from "@/components/sections/Notes"
import Experience from "@/components/sections/Experience"
import Education from "@/components/sections/Education"
import Certifications from "@/components/sections/Certifications"
import ChatWidget from "@/components/ChatWidget"
import type { Role } from "@/data/roles"
import { getDemoCheckDate } from "@/lib/demoStatus"

// The home page sections; a role only changes the headline and the order of projects and skills.
export default async function HomeContent({ role }: { role?: Role }) {
  const demoCheckDate = await getDemoCheckDate()
  return (
    <PortfolioLayout>
      <Hero headline={role?.headline} demoCheckDate={demoCheckDate} />
      <About />
      <Skills order={role?.skillOrder} />
      <Projects order={role?.projectOrder} />
      <Notes />
      <Experience />
      <Education />
      <Certifications />
      <ChatWidget />
    </PortfolioLayout>
  )
}
