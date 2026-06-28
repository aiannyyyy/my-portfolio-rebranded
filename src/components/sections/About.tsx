import { personal } from "@/data"
export default function About() {
  return (
    <section id="about" style={{ padding:"32px 24px", borderBottom:"1px solid var(--border)" }}>
      <h2 style={{ fontSize:"0.75rem", fontWeight:600, letterSpacing:"0.1em", textTransform:"uppercase", color:"var(--accent)", marginBottom:"16px" }}>About</h2>
      <p style={{ fontSize:"0.95rem", lineHeight:1.8, color:"var(--muted)" }}>{personal.about}</p>
      <div style={{ display:"flex", gap:"12px", marginTop:"20px", flexWrap:"wrap" }}>
        <a href={personal.resumeUrl} target="_blank" rel="noopener noreferrer" style={{ display:"inline-block", padding:"6px 16px", borderRadius:"6px", backgroundColor:"var(--accent)", color:"#ffffff", fontSize:"0.8rem", textDecoration:"none", fontWeight:500 }}>
          Download Resume
        </a>
        <a href={personal.coverLetterUrl} target="_blank" rel="noopener noreferrer" style={{ display:"inline-block", padding:"6px 16px", borderRadius:"6px", border:"1px solid var(--accent)", color:"var(--accent)", fontSize:"0.8rem", textDecoration:"none", fontWeight:500 }}>
          Download Cover Letter
        </a>
      </div>
    </section>
  )
}
