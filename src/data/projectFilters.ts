import { projects } from "./projects"

type Project = (typeof projects)[number]

export const projectTabs = ["All", "Web", "Desktop", "Live demo"] as const
export type ProjectTab = (typeof projectTabs)[number]

const isDesktop = (p: Project) => p.tech.includes("WinForms")

export function inTab(p: Project, tab: ProjectTab): boolean {
  if (tab === "Web") return !isDesktop(p)
  if (tab === "Desktop") return isDesktop(p)
  if (tab === "Live demo") return !!p.liveUrl
  return true
}

/** True when a skill chip (e.g. "C# / VB.NET" or "MongoDB") names one of the project's tech tags. */
export function usesSkill(p: Project, skill: string): boolean {
  const names = skill.toLowerCase().split(" / ")
  return p.tech.some((t) => {
    const tech = t.toLowerCase()
    return names.some((n) => tech === n || tech.startsWith(n + " "))
  })
}

export const skillHasProjects = (skill: string) => projects.some((p) => usesSkill(p, skill))

// A skill chip tells the Projects section which skill to filter by.
export const SKILL_FILTER_EVENT = "portfolio:filter-skill"
