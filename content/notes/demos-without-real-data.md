Four of my projects started as internal tools: a corporate dashboard, a file management system, a task manager, and my own job application app. Recruiters can't log into internal systems, and screenshots only show so much. So I gave each one a **live demo anyone can click through**, without exposing a single real record.

The rule for all four was the same: **the demo must never talk to a real backend or a real database.**

## The pattern: a fake backend inside the frontend

Each frontend already sent its requests through one place: an Axios instance or `fetch`. That made it possible to swap the real network for a mock in one spot, controlled by a build-time flag:

- **Task Management App** (React): `REACT_APP_USE_MOCKS=true` installs an Axios adapter that answers requests from an in-memory store. Creating, moving and deleting tasks all work. Changes last until the page is refreshed.
- **Corporate Dashboard** (Vite + React): `VITE_USE_MOCKS=true` routes every API call to a mock router that returns the same shapes as the real Oracle and MySQL endpoints, so the charts render exactly as they do in production.
- **File Management System** (Vite + React): the mock layer patches both `fetch` and Axios, answers file and folder requests, and maps previews to bundled sample PDFs and images. The real-time chat normally uses WebSockets, so in demo mode the socket is stubbed and the conversation comes from fixtures.

To be sure, I recorded every network request during a full click-through of each demo: none of them contacted a real backend.

## Read-only where it matters

The file system demo is **read-only**. Any request that would change data gets a friendly *"This is a read-only demo"* message instead of an error. Browsing, searching, previewing and chatting all work, so nothing feels broken.

The task app is the opposite: it's more fun to drag tasks around, so changes are allowed, and they reset when the page reloads.

## Fake data that still looks real

Sample data has to look believable, or the demo feels empty. It also must not contain anything real:

- People are invented: "Demo Admin", "Alex Reyes", "Casey Santos". In the dashboard, real staff names that appeared in chart labels are replaced in demo mode with placeholders like "Encoder A".
- Files are generated sample documents with *"Sample"* printed on them.
- Every demo shows a banner saying it uses sample data, so nobody mistakes it for a real system.

## The job app: a separate deployment, not a mock

My Job Application Assistant is different. It's a full-stack Next.js app with its own database, so a frontend mock wasn't enough. Instead, the **same codebase** runs as a second deployment with its own database:

- `DEMO_MODE=true` loads a made-up person and sample jobs, including a fake Facebook-style post and an obvious scam example, so visitors can see the scam checks working.
- AI features return canned sample output, and uploads are turned off.
- The real login code stays untouched and still denies everything by default whenever `DEMO_MODE` isn't set.
- A test fails the build if demo mode is switched on while real credentials or real data are present.

## Keeping them alive

A dead demo link on a CV is worse than no link. Free hosting tiers change and builds break: one of my demos quietly stopped deploying new versions, and I only noticed weeks later. So a scheduled check opens every demo in a real browser each week, confirms that real content appears, and emails me if one breaks.

## What I learned

Routing all API calls through one client from day one is what made these demos cheap to build. When a project has a single doorway to the network, swapping the backend for a mock is a small, contained change instead of a rewrite.

Try them: [Job Application Assistant](https://job-assistant-demo.vercel.app), [Task Management App](https://task-management-app-rust-two.vercel.app), [Corporate Dashboard](https://nscsl-dashboard.vercel.app), [File Management System](https://file-management-system-avhs.vercel.app).
