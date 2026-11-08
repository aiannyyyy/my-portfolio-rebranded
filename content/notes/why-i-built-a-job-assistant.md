I work onsite, and I want my next role to be remote or hybrid. Looking for one meant opening job board after job board every day, scrolling past roles that were senior-only, onsite, or open only to people in the US or Europe, and trying to remember which ones I'd already seen.

So I built a tool to do the boring part for me.

## What it does

Every day, the **Job Application Assistant** collects developer jobs from **8 official job APIs and RSS feeds**, then:

- **Filters out what I can't apply for**: onsite roles, senior/lead/manager titles, jobs restricted to other countries, and pay below my minimum after converting it to monthly pesos.
- **Scores the rest from 0 to 100** and shows *why*: title match, skills overlap, level, location, salary and schedule, each with its own points.
- **Marks what's new since yesterday**, so a quick check on my phone is enough.

On its first scheduled run it pulled in **103 new postings and kept 2** that actually fit. That ratio is exactly the time I used to spend scrolling.

It doesn't stop at finding jobs. It also helps me check suspicious companies, prepare a tailored CV and cover letter from my real resume, keep reusable answers for application forms, and track every application with follow-up reminders.

## The hardest part: the biggest job boards

The obvious sources are **LinkedIn, Indeed and JobStreet**. None of them offers a public API for this, and their terms don't allow automated collection. Connecting my accounts to an automated tool could also get them **banned**, which is a big risk when those accounts are how recruiters find me.

So I made a rule early: **official sources only, and I stay in control.**

- The daily feed uses only official APIs and RSS feeds, with credit and links back to each source.
- For everything else, like a job on Facebook, a poster or a recruiter's message, there's **manual import**. I paste the text or upload a screenshot, the text is read on my device, and the app fills in a form for me to check. It also flags scam signs like fees, Telegram-only contact or early ID requests.

## I still apply myself

The app never applies on its own. "Apply" just opens the original posting. Before I apply, I check the company's own website and the warnings the app shows. Automation finds and sorts jobs, and I decide.

## Where it is now

I've been using it for less than a month, and finding jobs worth applying to is now easy: one list, already filtered and ranked. No offers yet. If you're hiring, you could be the first. 🙂

The real app is private because it holds my CV, but there's a [live demo](https://job-assistant-demo.vercel.app) with a made-up person and sample jobs, a [case study](/projects/job-assistant), and a note on [how I secured it](/notes/securing-my-job-app).
