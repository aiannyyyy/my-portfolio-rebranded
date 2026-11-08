At the laboratory where I work, a lot of day-to-day reporting ran on an old, unsupported LIMS (laboratory information management system) and on Excel. Reports were made by hand from exported data, there were no live KPI displays, and departments kept separate records of shared processes.

As part of my role, I've been building a web dashboard to take over this work.

## The need

The lab handles a lot of data, so making reports in Excel was slow, and it got slower as the data grew. Each report was a manual task, and there was no up-to-date view of the numbers.

## What the dashboard does

The **Corporate Dashboard** is a React and TypeScript web app with a Node.js and Express backend. It reads from **Oracle** (the laboratory data) and **MySQL**, and shows the numbers as charts and KPI cards. It has modules for different teams, including laboratory, program operations, follow-up and IT job orders.

It also links processes across departments. Registering filter cards (the cards used to collect newborn screening samples) now feeds into the inventory process that Admin and the Laboratory share, instead of each keeping its own records.

## Performance work

The Oracle tables weren't set up for this kind of reporting, so the queries were slow. I worked on it in four ways:

1. **Indexes** on the columns used for filtering and joining.
2. **Rewritten queries** that select only the needed columns, filter earlier and page large results.
3. **Backend changes** so each page makes fewer database calls.
4. **Summary tables and views** for totals, so charts don't recount raw rows every time.

Together, these made the system about **40% faster**.

## Current status

- The old LIMS is no longer in use.
- The Program and Laboratory departments are testing the dashboard.
- The plan is to move reports off Excel as each department starts using it.

The production system works with real patient and lab data, so the [live demo](https://nscsl-dashboard.vercel.app) uses sample data only. More details are in the [case study](/projects/corporate-dashboard).
