"use client"
import { useState } from "react"
import { personal } from "@/data"
import ThemeToggle from "@/components/ThemeToggle"

const navItems = ["About", "Skills", "Projects", "Experience", "Certifications"]

export default function MobileNav() {
  const [open, setOpen] = useState(false)

  return (
    <nav className="mobile-nav" style={{ display:"none", position:"sticky", top:0, zIndex:100, backgroundColor:"var(--canvas)", borderBottom:"1px solid var(--border)", padding:"12px 20px" }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
        <div>
          <p style={{ margin:0, fontWeight:600, fontSize:"0.95rem", color:"var(--text)" }}>{personal.name}</p>
          <p style={{ margin:0, fontSize:"0.75rem", color:"var(--muted)" }}>{personal.title}</p>
        </div>
        <div style={{ display:"flex", gap:"8px", alignItems:"center" }}>
          <ThemeToggle />
          <button onClick={() => setOpen(!open)} style={{ background:"none", border:"1px solid var(--border)", borderRadius:"6px", padding:"6px 10px", cursor:"pointer", color:"var(--text)", fontSize:"0.8rem" }}>
            {open ? "Close" : "Menu"}
          </button>
        </div>
      </div>
      {open && (
        <div style={{ marginTop:"12px", display:"flex", flexDirection:"column", gap:"4px" }}>
          {navItems.map((item) => (
            <a key={item} href={"#"+item.toLowerCase()} onClick={() => setOpen(false)} style={{ padding:"10px 12px", borderRadius:"6px", color:"var(--muted)", textDecoration:"none", fontSize:"0.875rem", backgroundColor:"var(--surface)" }}>
              {item}
            </a>
          ))}
          <div style={{ display:"flex", gap:"8px", marginTop:"8px" }}>
            <a href={personal.github} target="_blank" rel="noopener noreferrer" style={{ flex:1, textAlign:"center", padding:"8px", borderRadius:"6px", border:"1px solid var(--border)", color:"var(--muted)", textDecoration:"none", fontSize:"0.8rem" }}>GitHub</a>
            <a href={personal.linkedin} target="_blank" rel="noopener noreferrer" style={{ flex:1, textAlign:"center", padding:"8px", borderRadius:"6px", border:"1px solid var(--border)", color:"var(--muted)", textDecoration:"none", fontSize:"0.8rem" }}>LinkedIn</a>
          </div>
        </div>
      )}
    </nav>
  )
}
