import { personal } from "@/data"
export default function About() {
  return (
    <section id="about" style={{ padding:"48px", borderBottom:"1px solid var(--border)" }}>
      <h2 style={{ fontSize:"0.75rem", fontWeight:600, letterSpacing:"0.1em", textTransform:"uppercase", color:"var(--accent)", marginBottom:"16px" }}>About</h2>
      <p style={{ fontSize:"1rem", lineHeight:1.8, color:"var(--text)", maxWidth:"600px" }}>{personal.bio}</p>
      <a href={personal.resumeUrl} target="_blank" rel="noopener noreferrer" style={{ display:"inline-block", marginTop:"24px", padding:"8px 20px", borderRadius:"6px", backgroundColor:"var(--accent)", color:"#ffffff", fontSize:"0.875rem", textDecoration:"none", fontWeight:500 }}>Download Resume</a>
    </section>
  )
}
