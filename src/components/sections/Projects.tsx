"use client"
import { useState } from "react"
import { projects } from "@/data"
import ImageLightbox from "@/components/ImageLightbox"

export default function Projects() {
  const [expanded, setExpanded] = useState<string | null>(null)
  const [gallery, setGallery] = useState<{ title: string; images: string[] } | null>(null)

  return (
    <section id="projects" style={{ padding:"32px 24px", borderBottom:"1px solid var(--border)" }}>
      <h2 style={{ fontSize:"0.75rem", fontWeight:600, letterSpacing:"0.1em", textTransform:"uppercase", color:"var(--accent)", marginBottom:"24px" }}>Projects</h2>
      <div style={{ display:"flex", flexDirection:"column", gap:"16px" }}>
        {projects.map((project) => (
          <div key={project.id} style={{ padding:"24px", borderRadius:"8px", border:"1px solid var(--border)", backgroundColor:"var(--surface)" }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:"8px", flexWrap:"wrap", gap:"8px" }}>
              <div style={{ display:"flex", alignItems:"center", gap:"8px" }}>
                <h3 style={{ fontSize:"0.95rem", fontWeight:600, color:"var(--text)", margin:0 }}>{project.title}</h3>
              </div>
              <div style={{ display:"flex", gap:"8px", alignItems:"center" }}>
                {project.caseStudyUrl && <a href={project.caseStudyUrl} style={{ fontSize:"0.75rem", padding:"4px 10px", borderRadius:"6px", border:"1px solid var(--border)", color:"var(--accent)", textDecoration:"none" }}>Case study</a>}
                {project.repoUrl && <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" style={{ fontSize:"0.75rem", padding:"4px 10px", borderRadius:"6px", border:"1px solid var(--border)", color:"var(--accent)", textDecoration:"none" }}>Repo</a>}
                {project.images && project.images.length > 0 && (
                  <button
                    onClick={() => setGallery({ title: project.title, images: project.images! })}
                    style={{ fontSize:"0.75rem", padding:"4px 10px", borderRadius:"6px", backgroundColor:"var(--accent)", color:"#ffffff", border:"none", cursor:"pointer" }}
                  >
                    View Screenshot
                  </button>
                )}
                {project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" style={{ fontSize:"0.75rem", padding:"4px 10px", borderRadius:"6px", backgroundColor:"var(--accent)", color:"#ffffff", textDecoration:"none" }}>Live</a>}
              </div>
            </div>
            <p style={{ fontSize:"0.875rem", color:"var(--muted)", marginBottom:"12px", lineHeight:1.6 }}>{project.description}</p>
            {expanded === project.id && (
              <p style={{ fontSize:"0.825rem", color:"var(--text)", marginBottom:"12px", lineHeight:1.7, padding:"12px", borderRadius:"6px", backgroundColor:"var(--canvas)", border:"1px solid var(--border)" }}>
                {project.explanation}
              </p>
            )}
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:"8px" }}>
              <div style={{ display:"flex", flexWrap:"wrap", gap:"6px" }}>
                {project.tech.map((t) => (
                  <span key={t} style={{ fontSize:"0.7rem", padding:"2px 8px", borderRadius:"4px", backgroundColor:"var(--canvas)", border:"1px solid var(--border)", color:"var(--accent)", fontFamily:"monospace" }}>{t}</span>
                ))}
              </div>
              <button onClick={() => setExpanded(expanded === project.id ? null : project.id)} style={{ fontSize:"0.75rem", color:"var(--muted)", background:"none", border:"none", cursor:"pointer", padding:"0", textDecoration:"underline" }}>
                {expanded === project.id ? "Show less" : "Show more"}
              </button>
            </div>
          </div>
        ))}
      </div>

      {gallery && (
        <ImageLightbox images={gallery.images} label={gallery.title} onClose={() => setGallery(null)} />
      )}
    </section>
  )
}