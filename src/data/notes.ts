// Engineering notes: short posts. Each body is content/notes/<slug>.md.
export type Note = {
  slug: string
  title: string
  summary: string
  /** ISO date, shown as "Nov 2026". */
  date: string
  readMinutes: number
  /** Project case study this note relates to, if any. */
  caseStudy?: string
}

export const notes: Note[] = [
  {
    slug: "securing-my-job-app",
    title: "How I secured a personal app that holds my CV",
    summary: "Deny-by-default routes, two-step login, hashed sessions, field encryption bound to each row, and keeping my identity out of AI prompts.",
    date: "2026-11-07",
    readMinutes: 5,
    caseStudy: "/projects/job-assistant",
  },
  {
    slug: "demos-without-real-data",
    title: "Live demos of internal tools, without real data",
    summary: "How four internal apps got clickable public demos: a fake backend behind one switch, read-only modes, believable sample data, and a weekly health check.",
    date: "2026-11-07",
    readMinutes: 4,
  },
]

export const getNote = (slug: string) => notes.find((n) => n.slug === slug)

export const formatNoteDate = (iso: string) =>
  new Date(iso + "T00:00:00Z").toLocaleDateString("en-US", { month: "short", year: "numeric", timeZone: "UTC" })
