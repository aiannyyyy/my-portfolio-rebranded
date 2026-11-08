When **NSCSL** went through **ISO accreditation**, one of the findings was about how we stored documents: shared network folders. They're easy to use, but they don't give a lab the control an accreditation expects, like who can open which files, what changed, and where the official version of a document lives.

The solution was to build a proper **File Management System**.

## What it does

It's a web app built with React, TypeScript, Node.js and PostgreSQL, used across the whole company. What each person sees depends on their department and the access they've been given.

- **Department-based access:** files and folders are organized by department and category, and permissions decide who can view, upload or manage them.
- **Activity history:** uploads, moves and changes are logged, so there's a record of what happened to a document.
- **Search, starred files and sharing**, so people find documents instead of digging through folders.
- **In-browser previews** for PDFs and images.
- **Real-time team chat** built in with WebSockets, so questions about a document happen next to the document.

## The hardest part: Word and Excel files

Most office documents are Word and Excel files, and **browsers can't display or edit them natively**. PDFs and images preview in a modal, but an Office file has to be **downloaded, edited, and uploaded again**. That works, but it's clumsy.

The fix I've proposed is to **integrate Microsoft 365**, so documents open and save in Word and Excel online, directly from the app. The proposal hasn't been approved yet, so for now the download-and-re-upload flow stays.

## What I learned

Compliance requirements are product requirements. The access rules and activity history weren't extras; they were the reason the system exists. Building them in from the start was much easier than adding them later.

Company files are confidential, so the [live demo](https://file-management-system-avhs.vercel.app) is read-only with sample files. There's also a [case study](/projects/file-management-system).
