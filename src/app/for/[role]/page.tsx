import type { Metadata } from "next"
import { notFound } from "next/navigation"
import HomeContent from "@/components/HomeContent"
import { personal } from "@/data"
import { getRole, roles } from "@/data/roles"

type Props = { params: Promise<{ role: string }> }

export const dynamicParams = false

export function generateStaticParams() {
  return roles.map((r) => ({ role: r.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const role = getRole((await params).role)
  if (!role) return {}
  const title = `${personal.name} - ${role.headline.split(" · ")[0]}`
  return {
    title,
    // Shared privately per application; search engines should list only the main page.
    robots: { index: false, follow: true },
    alternates: { canonical: "/" },
    openGraph: { title, url: `/for/${role.slug}` },
    twitter: { title },
  }
}

export default async function RolePage({ params }: Props) {
  const role = getRole((await params).role)
  if (!role) notFound()
  return <HomeContent role={role} />
}
