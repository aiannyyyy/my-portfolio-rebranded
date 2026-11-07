"use client"
import { SKILL_FILTER_EVENT, skillHasProjects } from "@/data/projectFilters"

const chip = { fontSize:"0.75rem", padding:"4px 10px", borderRadius:"9999px", border:"1px solid var(--border)", color:"var(--text)", backgroundColor:"var(--surface)" }

// Skills used in a listed project jump to Projects filtered by that skill; the rest are plain labels.
export default function SkillChip({ skill }: { skill: string }) {
  if (!skillHasProjects(skill)) return <span style={chip}>{skill}</span>

  const showProjects = () => {
    window.dispatchEvent(new CustomEvent(SKILL_FILTER_EVENT, { detail: skill }))
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  return (
    <button onClick={showProjects} title={`Show projects using ${skill}`} style={{ ...chip, cursor:"pointer", borderColor:"var(--accent)", color:"var(--accent)" }}>
      {skill}
    </button>
  )
}
