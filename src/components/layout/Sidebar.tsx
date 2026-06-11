"use client"
import { personal } from "@/data"
import ThemeToggle from "@/components/ThemeToggle"
const navItems = ["About", "Skills", "Projects", "Experience", "Certifications"]
export default function Sidebar() {
  return (
    <aside style={{ position:"fixed", top:0, left:0, height:"100vh", width:"256px", display:"flex", flexDirection:"column", padding:"32px 24px", borderRight:"1px solid var(--border)", backgroundColor:"var(--canvas)", overflowY:"auto" }}>
      <div style={{ display:"flex", flexDirection:"column", alignItems:"center", textAlign:"center", marginBottom:"32px" }}>
        <img src={personal.avatarUrl} alt={personal.name} style={{ width:"96px", height:"96px", borderRadius:"50%", objectFit:"cover", marginBottom:"16px", border:"2px solid var(--border)" }} />
        <h1 style={{ fontSize:"1.1rem", fontWeight:600, color:"var(--text)", margin:0 }}>{personal.name}</h1>
        <p style={{ fontSize:"0.875rem", color:"var(--muted)", marginTop:"4px" }}>{personal.title}</p>
        <div style={{ width:"32px", height:"1px", backgroundColor:"var(--border)", marginTop:"12px" }} />
      </div>
      <p style={{ fontSize:"0.75rem", textAlign:"center", lineHeight:1.6, color:"var(--muted)", marginBottom:"24px" }}>{personal.bio}</p>
      <div style={{ display:"flex", flexDirection:"column", gap:"8px", marginBottom:"24px" }}>
        <a href={"mailto:"+personal.email} style={{ fontSize:"0.75rem", color:"var(--muted)", textDecoration:"none" }}>{personal.email}</a>
        <span style={{ fontSize:"0.75rem", color:"var(--muted)" }}>{personal.location}</span>
      </div>
      <div style={{ display:"flex", gap:"8px", justifyContent:"center", marginBottom:"24px" }}>
        <a href={personal.github} target="_blank" rel="noopener noreferrer" style={{ fontSize:"0.75rem", padding:"4px 12px", borderRadius:"6px", border:"1px solid var(--border)", color:"var(--muted)", textDecoration:"none" }}>GitHub</a>
        <a href={personal.linkedin} target="_blank" rel="noopener noreferrer" style={{ fontSize:"0.75rem", padding:"4px 12px", borderRadius:"6px", border:"1px solid var(--border)", color:"var(--muted)", textDecoration:"none" }}>LinkedIn</a>
      </div>
      <nav style={{ display:"flex", flexDirection:"column", gap:"4px", flex:1 }}>
        {navItems.map((item) => (
          <a key={item} href={"#"+item.toLowerCase()} style={{ fontSize:"0.875rem", padding:"8px 12px", borderRadius:"6px", color:"var(--muted)", textDecoration:"none" }}>{item}</a>
        ))}
      </nav>
      <div style={{ marginTop:"auto", paddingTop:"16px", display:"flex", justifyContent:"center", borderTop:"1px solid var(--border)" }}>
        <ThemeToggle />
      </div>
    </aside>
  )
}
