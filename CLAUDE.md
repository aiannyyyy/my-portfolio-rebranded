@AGENTS.md

# CLAUDE.md

Personal portfolio for John Adrian Ticatic. Single-page Next.js 16 (App Router) + React 19 + TypeScript, deployed on Vercel.

## Commands

- `npm run dev` — start dev server (http://localhost:3000)
- `npm run build` — production build; run this to verify changes compile
- `npm run lint` — ESLint

There is no test suite.

## Structure

- `src/app/page.tsx` — the only page; composes the sections inside `PortfolioLayout`
- `src/app/api/chat/route.ts` — Groq-powered chatbot endpoint (needs `GROQ_API_KEY` in `.env.local`)
- `src/components/sections/` — one component per page section (About, Skills, Projects, Experience, Certifications)
- `src/components/layout/` — Sidebar, MobileNav, PortfolioLayout
- `src/data/` — all portfolio content, re-exported from `src/data/index.ts`
- `public/` — CV/cover letter PDFs, logo, and project screenshots (one folder per project)

## General rules

- **Content lives in `src/data/`.** To add or change projects, skills, experience, certifications, or personal info, edit the data files — don't hardcode content in components. The chatbot's system prompt is built from the same data, so it stays in sync automatically.
- **Match the existing styling approach.** Components use inline `style={{...}}` objects with the CSS variables from `src/app/globals.css` (`--canvas`, `--surface`, `--border`, `--text`, `--muted`, `--accent`). Use these variables instead of hardcoded colors so light/dark mode keeps working.
- **Dark mode** is handled by `next-themes` (class strategy). Any new color must have both a `:root` and a `.dark` value in `globals.css`.
- **Client components** need `"use client"` at the top (anything using state, effects, or `useTheme`). Keep components server-side when they don't need interactivity.
- Use the `@/` import alias (maps to `src/`).
- Keep the design minimal and GitHub-inspired, consistent with the existing sections.
- Project screenshots go in `public/<Project Name>/` and are referenced in the project's `images` array in `src/data/projects.ts`.
- Never commit `.env.local` or expose `GROQ_API_KEY` to client code.
- Before touching Next.js APIs, check `node_modules/next/dist/docs/` (see AGENTS.md) — this Next.js version differs from older conventions.
