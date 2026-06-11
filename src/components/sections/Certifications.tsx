import { certifications } from "@/data"
export default function Certifications() {
  return (
    <section id="certifications" style={{ padding:"48px" }}>
      <h2 style={{ fontSize:"0.75rem", fontWeight:600, letterSpacing:"0.1em", textTransform:"uppercase", color:"var(--accent)", marginBottom:"24px" }}>Certifications</h2>
      <div style={{ display:"flex", flexDirection:"column", gap:"12px" }}>
        {certifications.map((cert, i) => (
          <div key={i} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"16px 20px", borderRadius:"8px", border:"1px solid var(--border)", backgroundColor:"var(--surface)" }}>
            <div>
              <h3 style={{ fontSize:"0.95rem", fontWeight:600, color:"var(--text)", margin:0, marginBottom:"4px" }}>{cert.title}</h3>
              <p style={{ fontSize:"0.8rem", color:"var(--muted)", margin:0 }}>{cert.issuer} · {cert.date}</p>
            </div>
            {cert.credentialUrl && <a href={cert.credentialUrl} target="_blank" rel="noopener noreferrer" style={{ fontSize:"0.75rem", padding:"4px 12px", borderRadius:"6px", border:"1px solid var(--accent)", color:"var(--accent)", textDecoration:"none", whiteSpace:"nowrap" }}>View</a>}
          </div>
        ))}
      </div>
    </section>
  )
}
