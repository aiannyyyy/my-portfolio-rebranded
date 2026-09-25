import { education } from "@/data"
export default function Education() {
  return (
    <section id="education" style={{ padding:"48px", borderBottom:"1px solid var(--border)" }}>
      <h2 style={{ fontSize:"0.75rem", fontWeight:600, letterSpacing:"0.1em", textTransform:"uppercase", color:"var(--accent)", marginBottom:"24px" }}>Education</h2>
      <div style={{ display:"flex", flexDirection:"column", gap:"12px" }}>
        {education.map((edu, i) => (
          <div key={i} style={{ padding:"16px 20px", borderRadius:"8px", border:"1px solid var(--border)", backgroundColor:"var(--surface)" }}>
            <h3 style={{ fontSize:"0.95rem", fontWeight:600, color:"var(--text)", margin:0, marginBottom:"4px" }}>{edu.degree}</h3>
            <p style={{ fontSize:"0.8rem", color:"var(--accent)", margin:0, marginBottom:"4px" }}>{edu.school}</p>
            <p style={{ fontSize:"0.75rem", color:"var(--muted)", margin:0 }}>{edu.period}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
