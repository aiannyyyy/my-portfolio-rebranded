At **Newborn Screening Center - Southern Luzon (NSCSL)**, a lot of day-to-day work ran on an old, unsupported LIMS (laboratory information management system) and on Excel. Reports were built by hand from exported data, there were no live KPI displays, and departments that depend on each other kept their own separate records.

My job was to replace that with something the teams could actually rely on.

## The problem with Excel at this scale

Newborn screening produces a lot of data. Exporting it, cleaning it in spreadsheets and building charts by hand was slow, and it got slower as the data grew. Every report was a manual job, so nobody had an up-to-date view of the numbers that mattered.

## What I built

The **Corporate Dashboard** is a React and TypeScript web app with a Node.js and Express backend, reading from **Oracle** (the laboratory data) and **MySQL**. It replaces the manual reports with live charts and KPI cards, and it's split into modules for different teams, including laboratory, program operations, follow-up and IT job orders.

The bigger change is that departments are now **connected**. Registering filter cards (the cards used to collect newborn screening samples) feeds into the inventory processes that Admin and the Laboratory share, instead of each team keeping its own copy and reconciling it later.

## Making Oracle fast enough

The dashboard was only useful if it was fast. The Oracle tables weren't designed for this kind of reporting, so queries were slow. I combined four fixes:

1. **Indexes** on the columns used to filter and join, so Oracle stops reading whole tables.
2. **Rewritten queries** that select only the columns they need, filter earlier and page large results.
3. **Backend refactoring** so a page makes fewer database calls, combining queries where possible.
4. **Summary tables and views** that pre-compute totals, so charts don't recount raw rows on every load.

Together these made the system about **40% faster**.

## Where it is now

- The old LIMS is **no longer in use**.
- The **Program and Laboratory** departments are testing the dashboard now, before a wider rollout.
- The goal is to retire the manual Excel reports as each department moves onto the dashboard.

## What I learned

Replacing a legacy system isn't just a rebuild. The real wins came from connecting departments that used to work in separate files, and from treating database performance as a feature, not an afterthought.

The production system uses real patient and lab data, so the [live demo](https://nscsl-dashboard.vercel.app) runs on sample data only. There's also a [case study](/projects/corporate-dashboard).
