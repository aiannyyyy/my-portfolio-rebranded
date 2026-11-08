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
    title: "Moving lab reports from Excel and a legacy LIMS to a dashboard",
    summary: "Part of my role: a web dashboard that takes over manual Excel reports, links shared department processes, and the Oracle work that made it about 40% faster.",
    date: "2026-11-08",
    readMinutes: 3,
    caseStudy: "/projects/corporate-dashboard",
  },
  {
    slug: "file-management-for-iso-accreditation",
    title: "A file management system for an ISO accreditation finding",
    summary: "Replacing shared network folders with department-based access, activity history, previews and built-in chat, plus one current limitation.",
    date: "2026-11-08",
    readMinutes: 2,
    caseStudy: "/projects/file-management-system",
  },
  {
    slug: "three-desktop-tools-for-the-lab",
    title: "Three desktop tools for daily lab work",
    summary: "Small VB.NET and WinForms apps for tracking filter card replacements, flagging blurry scans for recapture, and accounting.",
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
