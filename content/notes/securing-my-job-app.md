My Job Application Assistant holds the most personal data I own: my CV, phone number, email, address and every application I send. It runs on the public internet so I can use it from my phone. So I designed it as if someone would try to break in, even though I'm its only user.

These are the decisions that mattered most.

## 1. Deny everything by default

Every page and API route is private unless it's on a very short public list: the login pages, the app's install icons, and one scheduled-job endpoint that's protected by its own secret. Anything else without a valid session is stopped before it reaches any code.

Middleware alone is a single point of failure, so **every route handler checks the session again**. If a future change accidentally skips the middleware, the handler still refuses.

To keep this true, end-to-end tests sign out and request the protected pages and API routes (including made-up API paths) and expect a redirect to login or a `401`.

## 2. Two locks on the door

Signing in takes two steps:

1. **GitHub sign-in**, accepted only for my numeric GitHub user ID (not my username, which can be renamed), with two-factor authentication on the GitHub side. Sign-up doesn't exist.
2. **An app password**, hashed with **argon2id**, a password-hashing algorithm designed to be slow and memory-hungry for attackers.

Failed logins are rate limited (5 attempts per 15 minutes) without storing IP addresses, and the error message never says which part was wrong.

## 3. Sessions that are useless if stolen from the database

The session cookie holds a random 256-bit token. The database stores only a **SHA-256 hash** of it, so a copy of the database can't be used to log in. The cookie is `httpOnly` (JavaScript can't read it), `SameSite=Strict` and `Secure`. Sessions expire after 7 days, or after 12 hours of inactivity. Every request that changes data must also come from the app's own site, checked with the browser's `Sec-Fetch-Site` and `Origin` headers, which blocks cross-site request forgery.

## 4. Encrypt personal fields, and bind them to their row

Personal fields (contact details, my master resume, generated CVs and cover letters, notes about interviews) are encrypted with **AES-256-GCM** before they reach the database, each with a fresh random IV.

The detail I like most is the **associated data**. Each value is encrypted together with a label naming its column and row, like `applications.notes:42`. If someone with database access copied an encrypted value from one row into another, decryption would fail instead of quietly showing the wrong data. Uploaded files are encrypted the same way and stored in the database, and they can only be downloaded through a route that checks the session.

The key lives only in environment variables, never in git. The repository has a written checklist for rotating it.

## 5. Treat every job post as hostile

Job descriptions come from the internet and from Facebook posts I paste in. The app treats all of that text as **untrusted**:

- HTML is stripped to plain text, and job content is never rendered as raw HTML.
- Outbound requests go only to an allowlist of official job APIs and feeds, with timeouts and size limits.
- When I prepare an application with AI, the job text might contain instructions aimed at the AI. The prompt tells the model to ignore them, and the output is validated afterwards (see below).
- Scam checks flag posts that ask for fees, use Telegram-only contact, or ask for ID documents early.

## 6. Mask my identity before anything leaves the app

To tailor a CV, the app builds a prompt that I paste into my own Claude Project. Before that, my name, email, phone, address and links are replaced with placeholders like `{{NAME}}` and `{{EMAIL}}`. They're put back locally when I paste the result in.

The result is then checked against my master resume. Any skill, employer, date or number that isn't in it is flagged, and export is blocked until I fix or confirm it, so the AI can't invent experience.

## 7. Keep secrets and personal data out of git and logs

- `.env` files are ignored. A secret scanner (gitleaks) runs before every commit and again in CI.
- Logs use request IDs and never include personal data. Tests use only obviously fake people.
- Encrypted backups have a restore test, so I know a backup actually works.

## What I'd tell someone building something similar

Most of this isn't advanced. It's the same few habits applied everywhere: deny by default, check twice, store as little as possible, and encrypt what you must keep. The tests matter as much as the code, because they keep those habits from slowly eroding as the app grows.

You can try the [live demo](https://job-assistant-demo.vercel.app), which runs the same code with a made-up person and sample jobs, or read the [case study](/projects/job-assistant).
