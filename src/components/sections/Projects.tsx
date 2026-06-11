import { projects } from "@/data"
export default function Projects() {
  return (
    <section id="projects" style={{ padding:"48px", borderBottom:"1px solid var(--border)" }}>
      <h2 style={{ fontSize:"0.75rem", fontWeight:600, letterSpacing:"0.1em", textTransform:"uppercase", color:"var(--accent)", marginBottom:"24px" }}>Projects</h2>
      <div style={{ display:"flex", flexDirection:"column", gap:"16px" }}>
        {projects.map((project) => (
          <div key={project.id} style={{ padding:"24px", borderRadius:"8px", border:"1px solid var(--border)", backgroundColor:"var(--surface)" }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:"8px" }}>
              <h3 style={{ fontSize:"1rem", fontWeight:600, color:"var(--text)", margin:0 }}>{project.title}</h3>
              <div style={{ display:"flex", gap:"8px" }}>
                {project.repoUrl && <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" style={{ fontSize:"0.75rem", color:"var(--accent)", textDecoration:"none" }}>Repo</a>}
                {project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" style={{ fontSize:"0.75rem", color:"var(--accent)", textDecoration:"none" }}>Live</a>}
              </div>
            </div>
            <p style={{ fontSize:"0.875rem", color:"var(--muted)", marginBottom:"12px", lineHeight:1.6 }}>{project.description}</p>
            <div style={{ display:"flex", flexWrap:"wrap", gap:"6px" }}>
              {project.tech.map((t) => (
                <span key={t} style={{ fontSize:"0.7rem", padding:"2px 8px", borderRadius:"4px", backgroundColor:"var(--accent-subtle, #eff6ff)", color:"var(--accent)", fontFamily:"monospace" }}>{t}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
