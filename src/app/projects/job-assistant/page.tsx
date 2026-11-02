import type { Metadata } from "next"
import Link from "next/link"
import PortfolioLayout from "@/components/layout/PortfolioLayout"
import { jobAssistantCaseStudy as cs } from "@/data"

export const metadata: Metadata = {
  title: "Job Application Assistant - Case Study | John Adrian Ticatic",
  description: cs.tagline,
}

const section = { padding:"32px 24px", borderBottom:"1px solid var(--border)" }
const heading = { fontSize:"0.75rem", fontWeight:600, letterSpacing:"0.1em", textTransform:"uppercase" as const, color:"var(--accent)", marginBottom:"20px" }
const card = { padding:"16px", borderRadius:"8px", border:"1px solid var(--border)", backgroundColor:"var(--surface)" }
const body = { fontSize:"0.875rem", color:"var(--muted)", lineHeight:1.7, margin:0 }
const cardTitle = { fontSize:"0.9rem", fontWeight:600, color:"var(--text)", margin:"0 0 6px" }
const grid = { display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(240px, 1fr))", gap:"12px" }

function Arrow() {
  return <div aria-hidden="true" style={{ textAlign:"center", color:"var(--muted)", fontSize:"0.9rem", lineHeight:1, padding:"4px 0" }}>↓</div>
}

export default function JobAssistantCaseStudy() {
  return (
    <PortfolioLayout>
      <section style={section}>
        <Link href="/#projects" style={{ fontSize:"0.8rem", color:"var(--muted)", textDecoration:"none" }}>← Back to projects</Link>
        <p style={{ ...heading, marginTop:"24px", marginBottom:"8px" }}>Case study</p>
        <h1 style={{ fontSize:"1.6rem", fontWeight:600, color:"var(--text)", margin:"0 0 12px" }}>{cs.title}</h1>
        <p style={{ fontSize:"0.95rem", color:"var(--muted)", lineHeight:1.7, margin:"0 0 20px", maxWidth:"680px" }}>{cs.tagline}</p>
        <div style={{ display:"flex", flexWrap:"wrap", gap:"8px", marginBottom:"16px" }}>
          <a href={cs.demoUrl} target="_blank" rel="noopener noreferrer" style={{ fontSize:"0.8rem", padding:"8px 14px", borderRadius:"6px", backgroundColor:"var(--accent)", color:"#ffffff", textDecoration:"none" }}>Open the live demo</a>
        </div>
        <p style={{ fontSize:"0.75rem", color:"var(--muted)", lineHeight:1.6, margin:"0 0 20px", maxWidth:"680px" }}>{cs.repoNote}</p>
        <p style={{ fontSize:"0.8rem", color:"var(--text)", margin:"0 0 10px" }}><strong>Role:</strong> <span style={{ color:"var(--muted)" }}>{cs.role}</span></p>
        <div style={{ display:"flex", flexWrap:"wrap", gap:"6px" }}>
          {cs.stack.map((t) => (
            <span key={t} style={{ fontSize:"0.7rem", padding:"2px 8px", borderRadius:"4px", backgroundColor:"var(--canvas)", border:"1px solid var(--border)", color:"var(--accent)", fontFamily:"monospace" }}>{t}</span>
          ))}
        </div>
      </section>

      <section style={section}>
        <h2 style={heading}>The problem</h2>
        <ul style={{ ...body, paddingLeft:"20px", display:"flex", flexDirection:"column", gap:"8px" }}>
          {cs.problem.map((p) => <li key={p}>{p}</li>)}
        </ul>
      </section>

      <section style={section}>
        <h2 style={heading}>Screens (demo, sample data)</h2>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(130px, 1fr))", gap:"16px" }}>
          {cs.images.map((src, i) => (
            <figure key={src} style={{ margin:0 }}>
              <a href={src} target="_blank" rel="noopener noreferrer">
                <img src={src} alt={cs.imageCaptions[i]} loading="lazy" style={{ width:"100%", height:"auto", borderRadius:"8px", border:"1px solid var(--border)", display:"block" }} />
              </a>
              <figcaption style={{ fontSize:"0.75rem", color:"var(--muted)", marginTop:"6px", lineHeight:1.5 }}>{cs.imageCaptions[i]}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section style={section}>
        <h2 style={heading}>What it does</h2>
        <div style={grid}>
          {cs.features.map((f) => (
            <div key={f.title} style={card}>
              <h3 style={cardTitle}>{f.title}</h3>
              <p style={body}>{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section style={section}>
        <h2 style={heading}>Architecture</h2>
        <div style={grid}>
          <div>
            <p style={{ fontSize:"0.8rem", fontWeight:600, color:"var(--text)", margin:"0 0 10px" }}>A request</p>
            {cs.architecture.map((step, i) => (
              <div key={step.label}>
                {i > 0 && <Arrow />}
                <div style={card}>
                  <p style={{ ...cardTitle, fontSize:"0.85rem", margin:"0 0 4px" }}>{step.label}</p>
                  <p style={{ ...body, fontSize:"0.8rem", lineHeight:1.6 }}>{step.detail}</p>
                </div>
              </div>
            ))}
          </div>
          <div>
            <p style={{ fontSize:"0.8rem", fontWeight:600, color:"var(--text)", margin:"0 0 10px" }}>The daily fetch</p>
            {cs.pipeline.map((step, i) => (
              <div key={step}>
                {i > 0 && <Arrow />}
                <div style={{ ...card, padding:"12px 16px" }}>
                  <p style={{ ...body, fontSize:"0.8rem", color:"var(--text)", lineHeight:1.6 }}>{step}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={section}>
        <h2 style={heading}>Security decisions</h2>
        <div style={grid}>
          {cs.security.map((s) => (
            <div key={s.title} style={card}>
              <h3 style={cardTitle}>{s.title}</h3>
              <p style={body}>{s.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section style={section}>
        <h2 style={heading}>How it was built</h2>
        <ul style={{ ...body, paddingLeft:"20px", display:"flex", flexDirection:"column", gap:"8px" }}>
          {cs.engineering.map((e) => <li key={e}>{e}</li>)}
        </ul>
        <div style={{ marginTop:"24px" }}>
          <a href={cs.demoUrl} target="_blank" rel="noopener noreferrer" style={{ fontSize:"0.8rem", padding:"8px 14px", borderRadius:"6px", backgroundColor:"var(--accent)", color:"#ffffff", textDecoration:"none" }}>Try the demo</a>
        </div>
      </section>
    </PortfolioLayout>
  )
}
