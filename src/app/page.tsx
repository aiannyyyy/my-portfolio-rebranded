import HomeContent from "@/components/HomeContent"
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
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c") }} />
      <HomeContent />
    </>
  )
}
