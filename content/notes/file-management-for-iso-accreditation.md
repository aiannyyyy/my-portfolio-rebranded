During my workplace's **ISO accreditation**, one of the findings concerned how documents were stored: shared network folders. They're easy to use, but they don't offer the control an accreditation expects, such as who can open which files and a record of what changed.

As part of my role, I built a **File Management System** to address it.

## What it does

It's a web app built with React, TypeScript, Node.js and PostgreSQL, used across the company. What each person can see depends on their department and access level.

- **Department-based access:** files and folders are organized by department and category, and permissions decide who can view, upload or manage them.
- **Activity history:** uploads, moves and changes are logged.
- **Search, starred files and sharing.**
- **In-browser previews** for PDFs and images.
- **Built-in team chat** using WebSockets.

## A current limitation

Browsers can't display or edit Word and Excel files natively. PDFs and images open in a preview, but an Office file has to be **downloaded, edited and uploaded again**.

I've proposed **integrating Microsoft 365** so these files can be opened and saved from the app. It hasn't been approved yet, so for now the download-and-re-upload flow stays.

Company files are confidential, so the [live demo](https://file-management-system-avhs.vercel.app) is read-only with sample files. More details are in the [case study](/projects/file-management-system).
