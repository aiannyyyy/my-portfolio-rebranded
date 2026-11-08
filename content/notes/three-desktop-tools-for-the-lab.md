Not every useful system is a big web app. At **NSCSL**, three gaps in daily work were filled by small, focused desktop applications built with **VB.NET and WinForms**. Each one replaced a process that had no system at all, or that lived in Excel.

## 1. Replacement System: tracking filter card replacements

Newborn screening samples are collected on **filter cards**. When a sample is **contaminated or rejected**, the facility needs a replacement card, and that replacement has to be tracked until it's resolved.

**Before:** there was no system for this.

**Now:** the Replacement System records each replacement, updates its status, and keeps a history of every transaction. **Crystal Reports** turns it into reports, so it's clear what was replaced, why, and what's still pending.

## 2. Image Verification System: catching blurry scans early

In the laboratory, filter cards are scanned, and the image has to be clear enough to use. A **blurry image needs to be recaptured**, and the sooner someone knows, the better.

**Before:** there was no automated way to verify the card images.

**Now:** staff verify scanned images in the app. When an image needs attention, it's flagged for recapture, and **real-time notifications over the local network** (built with WebSockets) alert the right person immediately.

## 3. Accounting System: out of Excel

The point-of-sale and accounting side of the business was handled **in Excel only**.

**Now:** the Accounting System handles receivables, payables and transactions in one place, backed by **MySQL**, and generates its reports through **Crystal Reports** instead of being assembled by hand.

## What they have in common

Each one started with a simple question: *where does work fall through the cracks?* The answers were untracked replacements, scans that needed rechecking, and accounting in spreadsheets. Each tool is small, but it made a daily process more convenient and much easier to trace.

These systems handle internal company data, so there's no public demo. Screenshots are in the [Projects section](/#projects).
