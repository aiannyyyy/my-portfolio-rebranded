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
    slug: "why-i-built-a-job-assistant",
    title: "Why I built my own job assistant",
    summary: "Working onsite and looking for remote work: an app that collects jobs from 8 official sources, filters and ranks them, and leaves applying to me.",
    date: "2026-11-08",
    readMinutes: 3,
    caseStudy: "/projects/job-assistant",
  },
  {
    slug: "replacing-excel-and-a-legacy-lims",
    title: "Replacing Excel reports and a legacy LIMS with a live dashboard",
    summary: "How NSCSL moved from an unsupported lab system and manual Excel reports to connected departments, live KPIs and Oracle queries about 40% faster.",
    date: "2026-11-08",
    readMinutes: 3,
    caseStudy: "/projects/corporate-dashboard",
  },
  {
    slug: "file-management-for-iso-accreditation",
    title: "From shared folders to a file system built for ISO accreditation",
    summary: "An ISO accreditation finding about network shared folders led to department-based access, activity history, previews and built-in chat.",
    date: "2026-11-08",
    readMinutes: 2,
    caseStudy: "/projects/file-management-system",
  },
  {
    slug: "three-desktop-tools-for-the-lab",
    title: "Three small desktop tools that closed gaps in the lab",
    summary: "Tracking filter card replacements, flagging blurry scans for recapture, and moving accounting out of Excel, with VB.NET and WinForms.",
    date: "2026-11-08",
    readMinutes: 2,
  },
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
