import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import PortfolioLayout from "@/components/layout/PortfolioLayout"
import { personal } from "@/data"
import { formatNoteDate, getNote, notes } from "@/data/notes"
import { renderNote } from "@/lib/notes"

type Props = { params: Promise<{ slug: string }> }

export const dynamicParams = false

export function generateStaticParams() {
  return notes.map((n) => ({ slug: n.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const note = getNote((await params).slug)
  if (!note) return {}
  return {
    title: `${note.title} | ${personal.name}`,
    description: note.summary,
    alternates: { canonical: `/notes/${note.slug}` },
    openGraph: { type: "article", url: `/notes/${note.slug}`, title: note.title, description: note.summary },
  }
}

export default async function NotePage({ params }: Props) {
  const note = getNote((await params).slug)
  if (!note) notFound()

  return (
    <PortfolioLayout>
      <article style={{ padding:"32px 24px", maxWidth:"760px" }}>
        <Link href="/#notes" style={{ fontSize:"0.8rem", color:"var(--muted)", textDecoration:"none" }}>← Back to notes</Link>
        <p style={{ fontSize:"0.75rem", fontWeight:600, letterSpacing:"0.1em", textTransform:"uppercase", color:"var(--accent)", margin:"24px 0 8px" }}>Engineering note</p>
        <h1 style={{ fontSize:"1.6rem", fontWeight:600, lineHeight:1.3, color:"var(--text)", margin:"0 0 10px" }}>{note.title}</h1>
        <p style={{ fontSize:"0.8rem", color:"var(--muted)", margin:"0 0 28px" }}>
          {personal.name} · {formatNoteDate(note.date)} · {note.readMinutes} min read
        </p>
        {/* Rendered from my own Markdown files in the repo, never from visitor input. */}
        <div className="note-body" dangerouslySetInnerHTML={{ __html: renderNote(note.slug) }} />
        <div style={{ display:"flex", flexWrap:"wrap", gap:"10px", marginTop:"32px", paddingTop:"20px", borderTop:"1px solid var(--border)" }}>
          {note.caseStudy && <Link href={note.caseStudy} style={{ fontSize:"0.85rem", color:"var(--accent)" }}>Read the case study</Link>}
          <Link href="/#notes" style={{ fontSize:"0.85rem", color:"var(--accent)" }}>More notes</Link>
          <a href={`mailto:${personal.email}`} style={{ fontSize:"0.85rem", color:"var(--accent)" }}>Email me about this</a>
        </div>
      </article>
    </PortfolioLayout>
  )
}
