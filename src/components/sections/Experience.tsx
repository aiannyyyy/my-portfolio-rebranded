import { experience } from "@/data"
export default function Experience() {
  return (
    <section id="experience" style={{ padding:"48px", borderBottom:"1px solid var(--border)" }}>
      <h2 style={{ fontSize:"0.75rem", fontWeight:600, letterSpacing:"0.1em", textTransform:"uppercase", color:"var(--accent)", marginBottom:"24px" }}>Experience</h2>
      <div style={{ display:"flex", flexDirection:"column", gap:"0px" }}>
        {experience.map((job, i) => (
          <div key={i} style={{ display:"flex", gap:"16px", paddingBottom:"24px" }}>
            <div style={{ display:"flex", flexDirection:"column", alignItems:"center" }}>
              <div style={{ width:"8px", height:"8px", borderRadius:"50%", backgroundColor:"var(--accent)", marginTop:"6px", flexShrink:0 }} />
              {i < experience.length - 1 && <div style={{ width:"1px", flex:1, backgroundColor:"var(--border)", marginTop:"4px" }} />}
            </div>
            <div style={{ flex:1, paddingBottom:"8px" }}>
              <div style={{ display:"flex", justifyContent:"space-between", marginBottom:"4px" }}>
                <h3 style={{ fontSize:"0.95rem", fontWeight:600, color:"var(--text)", margin:0 }}>{job.role}</h3>
                <span style={{ fontSize:"0.75rem", color:"var(--muted)" }}>{job.period}</span>
              </div>
              <p style={{ fontSize:"0.8rem", color:"var(--accent)", marginBottom:"8px" }}>{job.company}</p>
              <ul style={{ margin:0, paddingLeft:"16px" }}>
                {job.description.map((d, j) => (
                  <li key={j} style={{ fontSize:"0.875rem", color:"var(--muted)", lineHeight:1.6 }}>{d}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
