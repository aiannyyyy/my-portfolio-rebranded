import PortfolioLayout from "@/components/layout/PortfolioLayout"
import About from "@/components/sections/About"
import Skills from "@/components/sections/Skills"
import Projects from "@/components/sections/Projects"
import Experience from "@/components/sections/Experience"
import Certifications from "@/components/sections/Certifications"

export default function Home() {
  return (
    <PortfolioLayout>
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Certifications />
    </PortfolioLayout>
  )
}
