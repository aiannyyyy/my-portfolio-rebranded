export type CaseStudy = {
  slug: string
  title: string
  tagline: string
  demoUrl: string
  repoNote: string
  role: string
  stack: string[]
  problem: string[]
  features: { title: string; body: string }[]
  architecture: { title: string; steps: { label: string; detail?: string }[] }[]
  security: { title: string; body: string }[]
  engineering: string[]
  /** "phone" for portrait phone screenshots, "desktop" for wide ones. */
  imageLayout: "phone" | "desktop"
  // Short silent tour recorded from the live demo; the poster is the same path with -poster.webp.
  video?: string
  images: string[]
  imageCaptions: string[]
}

export const caseStudies: CaseStudy[] = [
  {
    slug: "job-assistant",
    title: "Job Application Assistant",
    tagline: "A private, phone-first web app that finds remote developer jobs every day, ranks them, flags scams, and helps me prepare honest, tailored applications. It never applies on its own.",
    demoUrl: "https://job-assistant-demo.vercel.app",
    repoNote: "The source code is private because the real app holds my personal data. The demo is the same codebase running on sample data.",
    role: "Solo: design, build, security, testing, and deployment",
    stack: ["Next.js 16", "React 19", "TypeScript", "PostgreSQL (Neon)", "Drizzle ORM", "Zod", "Tailwind CSS", "Vitest", "Playwright", "GitHub Actions", "Vercel"],
    problem: [
      "Looking for remote work from the Philippines means checking many job boards, and most listings turn out to be US-only, senior, or onsite.",
      "Jobs shared on Facebook groups and as poster images are hard to track, and some are scams asking for fees or IDs.",
      "Tailoring a CV for every role takes time, and it's easy to drift into claiming skills I don't have.",
      "After applying, follow-ups and interview details get lost across email and chat.",
    ],
    features: [
      { title: "Daily job feed", body: "A scheduled job pulls from 8 official job APIs and RSS feeds (no scraping, no logging into job sites), removes duplicates, drops jobs that aren't open to the Philippines, and scores the rest from 0 to 100 with a visible breakdown." },
      { title: "Salary and schedule labels", body: "Parses salaries in any currency and period (hourly, monthly, annual), converts them to monthly PHP, and marks each job as target, negotiable, below range, or unknown. Detects weekend work and rotating shifts." },
      { title: "Manual import with scam checks", body: "Paste a Facebook post or upload a poster screenshot. OCR runs inside the app, fields are pre-filled for review, and posts that ask for fees, IDs, or Telegram-only contact get a visible warning." },
      { title: "Company check", body: "Checks the company website, domain age via public RDAP, and whether the contact email matches the domain, then builds search links I open myself. A helper verdict, never a guarantee." },
      { title: "Honest tailoring", body: "Builds a prompt with my contact details masked as placeholders, I run it in my own Claude Project, and paste the result back. A validator flags any skill, employer, date, or number that isn't in my master resume before I can export to Word or PDF." },
      { title: "Tracker and answer bank", body: "Pipeline from applied to offer, follow-up reminders after 7 days, a ghosted suggestion after 30, calendar files for interviews, and saved answers to common form questions with one-tap copy." },
    ],
    architecture: [
      {
        title: "A request",
        steps: [
          { label: "Phone or laptop", detail: "Installable web app, built for 360px screens first" },
          { label: "Proxy (every request)", detail: "Deny by default, strict CSP with nonces, CSRF check, security headers" },
          { label: "Sign-in", detail: "GitHub OAuth (PKCE, my numeric ID only, 2FA required), then an app password hashed with argon2id" },
          { label: "Next.js App Router", detail: "Server components, server actions, and route handlers; Zod validates every input" },
          { label: "Neon Postgres via Drizzle", detail: "Personal fields and files encrypted with AES-256-GCM before they reach the database" },
        ],
      },
      {
        title: "The daily fetch",
        steps: [
          { label: "Vercel Cron, once a day" },
          { label: "8 job APIs and RSS feeds (allowlisted domains, timeouts, size limits)" },
          { label: "Validate, sanitize, dedupe" },
          { label: "Hard filters and scoring" },
          { label: "Saved for the morning" },
        ],
      },
    ],
    security: [
      { title: "Encrypted at rest", body: "AES-256-GCM with a random IV per value and the column name bound in as associated data, so values can't be swapped between rows. Uploaded files are encrypted the same way." },
      { title: "Deny by default", body: "Every route is private unless listed as public, and every handler re-checks the session. A test fails the build if a new route isn't covered." },
      { title: "Two-step login", body: "GitHub sign-in restricted to one numeric user ID with 2FA enforced, followed by a rate-limited app password. Sessions are hashed server-side with idle and absolute timeouts." },
      { title: "PII masking", body: "Name, email, phone, and links are replaced with placeholders before any prompt leaves the app, and put back locally afterwards." },
      { title: "Untrusted input", body: "Job text is stripped of HTML and never followed as instructions. Uploads are checked by magic bytes, re-encoded, and stripped of metadata." },
      { title: "Safe demo", body: "The public demo runs the same code with sample data. It refuses every change in one place, and refuses to start if it's pointed at a database holding real data." },
    ],
    engineering: [
      "Built in phases, each on its own branch with a pull request, a written review checklist, and a release tag.",
      "CI on every push: lint, type check, unit and integration tests, build, dependency audit, and secret scanning.",
      "500+ unit and integration tests, plus 320+ end-to-end tests on three phone sizes and desktop, with accessibility checks.",
      "23 architecture decision records explaining choices like the encryption scheme and hosting.",
      "Batched the scoring updates so the daily run went from about 146 seconds to 7, well inside the hosting time limit.",
    ],
    imageLayout: "phone",
    video: "/demo-videos/job-assistant.mp4",
    images: ["/Job Assistant/1.webp", "/Job Assistant/2.webp", "/Job Assistant/3.webp", "/Job Assistant/4.webp", "/Job Assistant/5.webp"],
    imageCaptions: ["Ranked jobs with salary and schedule labels", "Why a job scored what it did", "Scam warnings on a sample post", "Tracker with follow-up reminders", "Answer bank for form questions"],
  },
  {
    slug: "task-management-app",
    title: "Task Management App",
    tagline: "A full-stack MERN task manager with a drag-and-drop board, team workspaces with roles and invites, recurring tasks, email reminders, and a calendar and statistics view.",
    demoUrl: "https://task-management-app-rust-two.vercel.app",
    repoNote: "The demo opens signed in with sample tasks and runs entirely in your browser, so it's always fast. The real app uses the Express API and MongoDB described below.",
    role: "Solo: frontend, backend, testing, and deployment",
    stack: ["React", "TypeScript", "Node.js", "Express", "MongoDB Atlas", "Mongoose", "JWT", "dnd-kit", "Recharts", "Jest", "Supertest", "Docker", "Vercel", "Render"],
    problem: [
      "I wanted one place for personal to-dos and small team projects, with the details a real team needs: who owns a task, what changed, and what's due.",
      "I also wanted to build and ship a complete MERN app end to end: API design, auth, file uploads, background jobs, tests, and separate frontend and backend deployments.",
    ],
    features: [
      { title: "Drag-and-drop board", body: "To Do, In Progress, and Done columns built with dnd-kit. Search, filter, and sort by priority, due date, or creation date." },
      { title: "Team workspaces", body: "Create a workspace, invite people with a link, and give them owner, admin, or member roles. Tasks can be assigned to a member, and personal tasks stay separate." },
      { title: "Rich tasks", body: "Labels, categories, priorities, subtasks, comments, and file attachments. Every change is written to a per-task history, so you can see who changed what." },
      { title: "Recurring tasks", body: "Daily, weekly, or monthly tasks with an interval and an end date. A background job checks every hour and creates the next occurrence." },
      { title: "Email reminders", body: "An hourly job finds tasks that are due soon or overdue and sends a formatted reminder email with Nodemailer." },
      { title: "Calendar, stats, export", body: "A month calendar of due dates, a statistics view with Recharts (status and priority breakdowns, completion rate, overdue count), export and import, and dark mode." },
    ],
    architecture: [
      {
        title: "A request",
        steps: [
          { label: "React + TypeScript (Vercel)", detail: "Axios client adds the JWT to every request" },
          { label: "Express REST API (Render)", detail: "Auth middleware verifies the token and loads the user" },
          { label: "Routes for auth, tasks, and workspaces", detail: "Queries are scoped to the signed-in user or a workspace they belong to" },
          { label: "MongoDB Atlas via Mongoose", detail: "User, Task, and Workspace models; attachments stored with Multer" },
        ],
      },
      {
        title: "Background jobs (every hour)",
        steps: [
          { label: "Recurring task scheduler", detail: "Creates the next copy of daily, weekly, and monthly tasks" },
          { label: "Due-date notifier", detail: "Emails reminders for tasks due soon or overdue" },
        ],
      },
    ],
    security: [
      { title: "Hashed passwords", body: "Passwords are hashed with bcrypt before they're stored, and the password field is excluded from queries by default, so it never reaches API responses." },
      { title: "Token auth", body: "Task and workspace routes require a signed JWT in the Authorization header; auth middleware verifies it and loads the user on every request." },
      { title: "Scoped data", body: "Personal tasks are only returned to their owner, and workspace tasks only to that workspace's members. Owner and admin roles gate member management." },
      { title: "Demo without a server", body: "The portfolio demo swaps the HTTP layer for an in-browser mock of the same API, so visitors never touch a real database and nothing they do is saved." },
    ],
    engineering: [
      "133 automated tests with Jest and Supertest: unit tests for the auth middleware and user model, and integration tests for the auth, task, and workspace routes.",
      "Docker Compose runs the frontend, backend, and MongoDB together for local development.",
      "Frontend and backend deploy separately (Vercel and Render), with MongoDB Atlas as the database.",
      "A demo mode, switched on with one environment variable, answers every API call in the browser with sample data.",
    ],
    imageLayout: "desktop",
    video: "/demo-videos/task-management-app.mp4",
    images: ["/Task Management App/1.webp", "/Task Management App/2.webp", "/Task Management App/3.webp", "/Task Management App/4.webp", "/Task Management App/5.webp"],
    imageCaptions: ["Team workspace board", "Task details with assignee and attachment", "Calendar of due dates", "Statistics view", "Dark mode"],
  },
  {
    slug: "corporate-dashboard",
    title: "Corporate Dashboard",
    tagline: "A multi-department dashboard for a newborn screening center: sample and facility KPIs, laboratory turnaround tracking, patient follow-ups, IT job orders, an intranet file system, and team chat in one app.",
    demoUrl: "https://nscsl-dashboard.vercel.app",
    repoNote: "Built for internal use at Newborn Screening Center - Southern Luzon, so the source code is private. The demo runs the real frontend with mock data: every patient, staff member, and number in it is made up.",
    role: "Design and full-stack development, from database queries to the desktop build",
    stack: ["React", "TypeScript", "Vite", "Tailwind CSS", "TanStack Query", "Recharts", "Socket.IO", "Node.js", "Express", "Oracle DB", "MySQL", "JWT", "Electron"],
    problem: [
      "The center's legacy laboratory system was no longer supported, and each department pulled its numbers by hand from different places.",
      "Program, laboratory, follow-up, and IT staff needed live views of their own work: samples received, turnaround times, recalls, and tickets.",
      "Data lived in two databases, Oracle for laboratory records and MySQL for the newer internal apps, so nobody had one picture of operations.",
    ],
    features: [
      { title: "Program (PDO) KPIs", body: "Samples received and screened, unsatisfactory rates, facility performance, visits, and per-province totals, with year-over-year charts that export to image or Excel." },
      { title: "Laboratory tracking", body: "Daily received samples, a turnaround pipeline from collection to release (average, median, and mode days), data-entry statistics and speed per encoder, and the most common entry errors." },
      { title: "Follow-up", body: "Recall activity per follow-up nurse, patient details by test result, logbook endorsements between departments, urgent cases, and a shared calendar." },
      { title: "IT job orders", body: "Tickets move from pending approval to queued, assigned, in progress, resolved, and closed. Department approvers sign off, and a floating tracker shows the status of your open tickets." },
      { title: "Intranet files", body: "Categories and folders for shared documents, with starring, sharing between staff, previews, and PDF stamping." },
      { title: "Real-time and desktop", body: "Socket.IO powers team chat and notifications, and the same app also ships as an Electron desktop build for workstations." },
    ],
    architecture: [
      {
        title: "A request",
        steps: [
          { label: "React + TypeScript (web or Electron)", detail: "TanStack Query caches and refreshes each module's data" },
          { label: "Express API", detail: "JWT middleware, then routes grouped by department (PDO, Laboratory, Follow-up, IT, Intranet, Admin)" },
          { label: "Oracle and MySQL connection pools", detail: "Laboratory records from Oracle; users, job orders, and intranet data in MySQL" },
        ],
      },
      {
        title: "Background and real-time",
        steps: [
          { label: "Socket.IO", detail: "Chat messages and notifications pushed to connected staff" },
          { label: "Hourly sync (node-cron)", detail: "Keeps facility status fields such as last sample sent up to date" },
        ],
      },
    ],
    security: [
      { title: "Hashed passwords", body: "User passwords are stored as bcrypt hashes; a one-time migration script converted the old stored passwords." },
      { title: "Token auth", body: "API routes check a signed JWT, and the frontend keeps the user's role and department to decide which menus and approval actions they see." },
      { title: "Department permissions", body: "Each module checks the user's department: its own staff can create, edit, delete, and export, and everyone else gets a read-only view. Job order approvals go to the requesting department's approvers." },
      { title: "A demo with no real data", body: "The portfolio build swaps the HTTP layer for an in-browser mock with made-up fixtures, and hides real staff names behind labels like 'Encoder A'. It never connects to the center's databases." },
    ],
    engineering: [
      "Organized by department: each module has its own routes, controllers, services, and React Query hooks.",
      "Charts export to PNG (html2canvas) and tables to Excel (xlsx); the backend generates PDFs with PDFKit.",
      "A mock mode, switched on with one environment variable, routes every API call to local fixtures so the full UI runs without a server.",
      "117 commits over five months, with the same codebase deployed as a web app and an Electron desktop app.",
    ],
    imageLayout: "desktop",
    video: "/demo-videos/corporate-dashboard.mp4",
    images: ["/Corporate Dashboard/1.webp", "/Corporate Dashboard/2.webp", "/Corporate Dashboard/3.webp", "/Corporate Dashboard/4.webp", "/Corporate Dashboard/5.webp", "/Corporate Dashboard/6.webp"],
    imageCaptions: ["Laboratory overview with team chat open", "Data-entry statistics and common errors", "Follow-up recalls and patient details", "IT job orders", "Intranet files: starred and shared", "Monthly samples, year over year"],
  },
  {
    slug: "file-management-system",
    title: "File Management System",
    tagline: "An intranet for sharing documents across departments: personal folders, department libraries, previews, sharing, version history, and built-in team chat.",
    demoUrl: "https://file-management-system-avhs.vercel.app",
    repoNote: "Built for internal use at Newborn Screening Center - Southern Luzon, so the source code is private. The demo runs the real frontend with sample files and made-up people; browsing and previews work, and changes are turned off.",
    role: "Design and full-stack development",
    stack: ["React", "TypeScript", "Vite", "Tailwind CSS", "Node.js", "Express", "PostgreSQL (Supabase)", "Multer", "Socket.IO", "JWT", "Vercel", "Render"],
    problem: [
      "Shared documents were scattered across personal drives, email attachments, and chat threads, so staff often worked from old copies.",
      "Each department needed its own library of forms and procedures, while still being able to share single files with other teams.",
      "Quick questions about a document happened in separate chat apps, away from the file itself.",
    ],
    features: [
      { title: "Folders and libraries", body: "Personal folders with breadcrumbs, plus department categories (policies, laboratory, HR, training, IT guides) with their own folder trees." },
      { title: "Upload with conflict handling", body: "Single, multiple, and bulk uploads. When a file name already exists, you choose to replace it, keep both, or save it as a new version." },
      { title: "Previews and versions", body: "PDFs, images, and text open in the browser. Earlier versions of a file can be listed, restored, or removed." },
      { title: "Move with undo", body: "Move files and folders in bulk with a preview of conflicts first, and undo a move batch within 24 hours." },
      { title: "Sharing and activity", body: "Share files with specific coworkers, star the ones you use often, get notifications when something is shared with you, and see recent activity on the dashboard." },
      { title: "Team chat", body: "Direct messages with file attachments, unread counts, and typing indicators, delivered in real time over Socket.IO." },
    ],
    architecture: [
      {
        title: "A request",
        steps: [
          { label: "React + TypeScript (Vercel)", detail: "Dashboard, Files, and Categories pages, with global search across all three" },
          { label: "Express API (Render)", detail: "About 130 routes for auth, files, categories, moves, sharing, notifications, and chat" },
          { label: "PostgreSQL on Supabase", detail: "Users, folders, files, categories, shares, activity logs, and messages" },
          { label: "File storage", detail: "Multer handles uploads; folders and selections download as ZIP archives" },
        ],
      },
      {
        title: "Real-time",
        steps: [
          { label: "Socket.IO", detail: "Chat messages, typing indicators, and online status pushed to connected users" },
        ],
      },
    ],
    security: [
      { title: "Hashed passwords", body: "Passwords are hashed with bcrypt at sign-up and checked with bcrypt at login; the app signs a JWT for the session." },
      { title: "Safer uploads", body: "Uploads go to a temporary location first, and name conflicts need an explicit choice instead of silently overwriting someone's file." },
      { title: "Protected PDFs (built, currently off)", body: "Code using qpdf can lock downloaded PDFs against editing and copying with an owner password; it's switched off until qpdf is installed on the server." },
      { title: "A demo with no real data", body: "The portfolio build answers every API call in the browser with made-up files and people, previews bundled sample files, and turns off all changes. It never connects to the real server or database." },
    ],
    engineering: [
      "Frontend on Vercel, API on Render, and PostgreSQL on Supabase, deployed separately.",
      "A mock layer for the portfolio intercepts fetch and axios, so the full UI runs with sample data and no server.",
      "One preview helper serves both the real file URL and the demo's sample files, so the demo needed no changes to how previews render.",
    ],
    imageLayout: "desktop",
    video: "/demo-videos/file-management-system.mp4",
    images: ["/File Management System/1.webp", "/File Management System/2.webp", "/File Management System/3.webp", "/File Management System/4.webp", "/File Management System/5.webp", "/File Management System/6.webp"],
    imageCaptions: ["Dashboard: starred, shared, and activity", "Folders with breadcrumbs", "Image preview", "Department library folder", "Team chat", "Search across files and categories"],
  },
]

export const getCaseStudy = (slug: string) => caseStudies.find((c) => c.slug === slug)
