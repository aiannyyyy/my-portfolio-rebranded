"use client"
import { useState } from "react"
import { projects } from "@/data"

export default function Projects() {
  const [expanded, setExpanded] = useState<string | null>(null)
  const [galleryImages, setGalleryImages] = useState<string[] | null>(null)
  const [galleryIndex, setGalleryIndex] = useState(0)

  const openGallery = (images: string[]) => {
    setGalleryImages(images)
    setGalleryIndex(0)
  }

  const closeGallery = () => {
    setGalleryImages(null)
  }

  const nextImage = () => {
    if (!galleryImages) return
    setGalleryIndex((i) => (i + 1) % galleryImages.length)
  }

  const prevImage = () => {
    if (!galleryImages) return
    setGalleryIndex((i) => (i - 1 + galleryImages.length) % galleryImages.length)
  }

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
                {project.repoUrl && <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" style={{ fontSize:"0.75rem", padding:"4px 10px", borderRadius:"6px", border:"1px solid var(--border)", color:"var(--accent)", textDecoration:"none" }}>Repo</a>}
                {project.images && project.images.length > 0 && (
                  <button
                    onClick={() => openGallery(project.images!)}
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

      {galleryImages && (
        <div
          onClick={closeGallery}
          style={{ position:"fixed", inset:0, backgroundColor:"rgba(0,0,0,0.5)", display:"flex", alignItems:"center", justifyContent:"center", zIndex:1000, padding:"24px" }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor:"var(--surface)",
              border:"1px solid var(--border)",
              borderRadius:"12px",
              width:"100%",
              maxWidth:"640px",
              maxHeight:"85vh",
              display:"flex",
              flexDirection:"column",
              overflow:"hidden",
              boxShadow:"0 12px 40px rgba(0,0,0,0.25)",
            }}
          >
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"14px 18px", borderBottom:"1px solid var(--border)" }}>
              <span style={{ fontSize:"0.8rem", fontWeight:600, color:"var(--text)" }}>
                Screenshot{galleryImages.length > 1 ? ` (${galleryIndex + 1}/${galleryImages.length})` : ""}
              </span>
              <button
                onClick={closeGallery}
                style={{ background:"none", border:"none", color:"var(--muted)", fontSize:"1.1rem", cursor:"pointer", lineHeight:1, padding:"4px" }}
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:"8px", padding:"16px", backgroundColor:"var(--canvas)", overflow:"auto" }}>
              {galleryImages.length > 1 && (
                <button onClick={prevImage} style={{ background:"none", border:"1px solid var(--border)", borderRadius:"6px", color:"var(--text)", width:"28px", height:"28px", cursor:"pointer", flexShrink:0 }} aria-label="Previous image">
                  ‹
                </button>
              )}

              <img
                src={galleryImages[galleryIndex]}
                alt="Project screenshot"
                style={{ maxWidth:"100%", maxHeight:"60vh", borderRadius:"6px", objectFit:"contain", border:"1px solid var(--border)" }}
              />

              {galleryImages.length > 1 && (
                <button onClick={nextImage} style={{ background:"none", border:"1px solid var(--border)", borderRadius:"6px", color:"var(--text)", width:"28px", height:"28px", cursor:"pointer", flexShrink:0 }} aria-label="Next image">
                  ›
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  )
}