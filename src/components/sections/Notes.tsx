import Link from "next/link"
import { formatNoteDate, notes } from "@/data/notes"

export default function Notes() {
  if (!notes.length) return null
  return (
    <section id="notes" style={{ padding:"32px 24px", borderBottom:"1px solid var(--border)" }}>
      <h2 style={{ fontSize:"0.75rem", fontWeight:600, letterSpacing:"0.1em", textTransform:"uppercase", color:"var(--accent)", marginBottom:"8px" }}>Engineering Notes</h2>
      <p style={{ fontSize:"0.8rem", color:"var(--muted)", margin:"0 0 20px" }}>Short write-ups on how I build and secure things.</p>
      <div style={{ display:"flex", flexDirection:"column", gap:"12px" }}>
        {notes.map((note) => (
          <Link key={note.slug} href={`/notes/${note.slug}`} style={{ display:"block", padding:"18px 20px", borderRadius:"8px", border:"1px solid var(--border)", backgroundColor:"var(--surface)", textDecoration:"none" }}>
            <p style={{ fontSize:"0.95rem", fontWeight:600, color:"var(--text)", margin:"0 0 6px" }}>{note.title}</p>
            <p style={{ fontSize:"0.85rem", lineHeight:1.6, color:"var(--muted)", margin:"0 0 8px" }}>{note.summary}</p>
            <p style={{ fontSize:"0.75rem", color:"var(--accent)", margin:0 }}>{formatNoteDate(note.date)} · {note.readMinutes} min read →</p>
          </Link>
        ))}
      </div>
    </section>
  )
}
