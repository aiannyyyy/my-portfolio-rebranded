Alongside the web systems, part of my role has been building small desktop applications with **VB.NET and WinForms** for specific tasks at the laboratory where I work. Each one handles a process that previously had no system or was done in Excel.

## Replacement System

Newborn screening samples are collected on **filter cards**. When a sample is **contaminated or rejected**, a replacement card is needed, and it has to be tracked until it's resolved.

There was no system for this before. The Replacement System records each replacement, updates its status and keeps a history of transactions. Reports are generated with **Crystal Reports**.

## Image Verification System

In the laboratory, filter cards are scanned, and a **blurry image needs to be recaptured**.

There was no automated way to verify these images before. Staff now verify scanned images in the app, images that need attention are flagged for recapture, and **notifications over the local network** (using WebSockets) alert the right person.

## Accounting System

The point-of-sale and accounting process was handled in Excel. The Accounting System now handles receivables, payables and transactions in one place, using **MySQL**, with reports from **Crystal Reports**.

These systems handle internal company data, so there's no public demo. Screenshots are in the [Projects section](/#projects).
