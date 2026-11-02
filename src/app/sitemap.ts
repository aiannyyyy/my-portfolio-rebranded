import type { MetadataRoute } from "next"
import { caseStudies, personal } from "@/data"

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: personal.siteUrl, changeFrequency: "monthly", priority: 1 },
    ...caseStudies.map((c) => ({ url: `${personal.siteUrl}/projects/${c.slug}`, changeFrequency: "monthly" as const, priority: 0.8 })),
  ]
}
