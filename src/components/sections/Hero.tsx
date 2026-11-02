"use client"
import { useState } from "react"
import { personal } from "@/data"

const mailto = `mailto:${personal.email}?subject=${encodeURIComponent(`Job opportunity for ${personal.name}`)}`
const button = { display:"inline-flex", alignItems:"center", justifyContent:"center", minHeight:"40px", padding:"8px 16px", borderRadius:"6px", fontSize:"0.85rem", fontWeight:500, textDecoration:"none", cursor:"pointer" }
const primary = { ...button, backgroundColor:"var(--accent)", color:"#ffffff", border:"1px solid var(--accent)" }
const secondary = { ...button, backgroundColor:"transparent", color:"var(--accent)", border:"1px solid var(--accent)" }

export default function Hero() {
  const [copied, setCopied] = useState(false)

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(personal.email)
    } catch {
      window.prompt("Copy this email address:", personal.email)
      return
    }
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section id="top" style={{ padding:"32px 24px", borderBottom:"1px solid var(--border)" }}>
      <div className="mobile-only" style={{ alignItems:"center", gap:"14px", marginBottom:"20px" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={personal.avatarUrl} alt={personal.name} style={{ width:"64px", height:"64px", borderRadius:"50%", objectFit:"cover", border:"2px solid var(--border)" }} />
        <div>
          <p style={{ margin:0, fontWeight:600, color:"var(--text)" }}>{personal.name}</p>
          <p style={{ margin:0, fontSize:"0.8rem", color:"var(--muted)" }}>{personal.location}</p>
        </div>
      </div>

      <h2 style={{ fontSize:"clamp(1.35rem, 4vw, 1.9rem)", fontWeight:700, lineHeight:1.25, color:"var(--text)", margin:0 }}>{personal.headline}</h2>
      <p style={{ fontSize:"0.95rem", lineHeight:1.6, color:"var(--text)", margin:"12px 0 4px" }}>
        <span aria-hidden="true" style={{ display:"inline-block", width:"8px", height:"8px", borderRadius:"50%", backgroundColor:"#16a34a", marginRight:"8px", verticalAlign:"middle" }} />
        {personal.availability}
      </p>
      <p style={{ fontSize:"0.85rem", lineHeight:1.6, color:"var(--muted)", margin:0 }}>{personal.workingHours}</p>

      <ul style={{ listStyle:"none", padding:0, margin:"24px 0", display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(140px, 1fr))", gap:"12px" }}>
        {personal.highlights.map((h) => (
          <li key={h.value} style={{ padding:"14px", borderRadius:"8px", border:"1px solid var(--border)", backgroundColor:"var(--surface)" }}>
            <p style={{ margin:0, fontSize:"1.4rem", fontWeight:700, color:"var(--accent)" }}>{h.value}</p>
            <p style={{ margin:"4px 0 0", fontSize:"0.78rem", lineHeight:1.45, color:"var(--muted)" }}>{h.label}</p>
          </li>
        ))}
      </ul>

      <div style={{ display:"flex", flexWrap:"wrap", gap:"10px" }}>
        <a href="#projects" style={primary}>See live demos</a>
        <a href={mailto} style={secondary}>Email me</a>
        <button onClick={copyEmail} style={secondary} aria-live="polite">{copied ? "Email copied" : "Copy email"}</button>
        {personal.bookingUrl && <a href={personal.bookingUrl} target="_blank" rel="noopener noreferrer" style={secondary}>Book a call</a>}
        <a href={personal.resumeUrl} target="_blank" rel="noopener noreferrer" style={secondary}>Download CV</a>
      </div>
      <p style={{ fontSize:"0.8rem", lineHeight:1.6, color:"var(--muted)", margin:"12px 0 0" }}>{personal.callNote}</p>
    </section>
  )
}
