import { skills } from "@/data"
import { orderBy } from "@/data/roles"
import SkillChip from "@/components/SkillChip"
export default function Skills({ order }: { order?: string[] }) {
  return (
    <section id="skills" style={{ padding:"48px", borderBottom:"1px solid var(--border)" }}>
      <h2 style={{ fontSize:"0.75rem", fontWeight:600, letterSpacing:"0.1em", textTransform:"uppercase", color:"var(--accent)", marginBottom:"8px" }}>Core Skills</h2>
      <p style={{ fontSize:"0.8rem", color:"var(--muted)", margin:"0 0 24px" }}>Tap a blue skill to see the projects that use it.</p>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(2, 1fr)", gap:"24px" }}>
        {orderBy(skills, order, (g) => g.category).map((group) => (
          <div key={group.category}>
            <p style={{ fontSize:"0.75rem", fontWeight:600, color:"var(--muted)", marginBottom:"10px", textTransform:"uppercase", letterSpacing:"0.05em" }}>{group.category}</p>
            <div style={{ display:"flex", flexWrap:"wrap", gap:"8px" }}>
              {group.items.map((skill) => (
                <SkillChip key={skill} skill={skill} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
