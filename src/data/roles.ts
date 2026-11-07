// Tailored versions of the home page, one per job type, served at /for/<slug>.
// They only change the headline and the order of projects and skill groups;
// every fact still comes from the other data files.
export type Role = {
  slug: string
  label: string
  headline: string
  /** Project ids to show first, in this order; the rest follow in their usual order. */
  projectOrder: string[]
  /** Skill group names to show first, in this order. */
  skillOrder: string[]
}

export const roles: Role[] = [
  {
    slug: "full-stack",
    label: "Full-Stack",
    headline: "Full-Stack Developer · React, Next.js, Node.js",
    projectOrder: ["p0", "p4", "p1", "p3", "p2"],
    skillOrder: ["Languages", "Frontend", "Backend", "Cloud & DevOps", "Testing"],
  },
  {
    slug: "frontend",
    label: "Frontend",
    headline: "Frontend Developer · React, Next.js, TypeScript",
    projectOrder: ["p0", "p3", "p1", "p2", "p5", "p4"],
    skillOrder: ["Frontend", "Languages", "Testing", "Backend"],
  },
  {
    slug: "backend",
    label: "Backend",
    headline: "Backend Developer · Node.js, PostgreSQL, Oracle, MySQL",
    projectOrder: ["p0", "p3", "p4", "p1"],
    skillOrder: ["Backend", "Languages", "Cloud & DevOps", "Testing"],
  },
  {
    slug: "dotnet",
    label: "Desktop / .NET",
    headline: "Software Developer · VB.NET, C#, .NET Framework",
    projectOrder: ["p8", "p6", "p7", "p3", "p0"],
    skillOrder: ["Desktop & Other", "Languages", "Backend"],
  },
]

export const getRole = (slug: string) => roles.find((r) => r.slug === slug)

/** Puts the items named in `first` at the top, in that order, and keeps the rest as they were. */
export function orderBy<T>(items: T[], first: string[] | undefined, key: (item: T) => string): T[] {
  if (!first?.length) return items
  const rank = (item: T) => {
    const i = first.indexOf(key(item))
    return i === -1 ? first.length : i
  }
  return items.map((item, i) => ({ item, i })).sort((a, b) => rank(a.item) - rank(b.item) || a.i - b.i).map(({ item }) => item)
}
