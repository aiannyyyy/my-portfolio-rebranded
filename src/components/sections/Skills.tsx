import { skills } from "@/data"
export default function Skills() {
  return (
    <section id="skills" style={{ padding:"48px", borderBottom:"1px solid var(--border)" }}>
      <h2 style={{ fontSize:"0.75rem", fontWeight:600, letterSpacing:"0.1em", textTransform:"uppercase", color:"var(--accent)", marginBottom:"24px" }}>Core Skills</h2>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(2, 1fr)", gap:"24px" }}>
        {skills.map((group) => (
          <div key={group.category}>
            <p style={{ fontSize:"0.75rem", fontWeight:600, color:"var(--muted)", marginBottom:"10px", textTransform:"uppercase", letterSpacing:"0.05em" }}>{group.category}</p>
            <div style={{ display:"flex", flexWrap:"wrap", gap:"8px" }}>
              {group.items.map((skill) => (
                <span key={skill} style={{ fontSize:"0.75rem", padding:"4px 10px", borderRadius:"9999px", border:"1px solid var(--border)", color:"var(--text)", backgroundColor:"var(--surface)" }}>{skill}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
