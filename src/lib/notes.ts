import { readFileSync } from "node:fs"
import path from "node:path"
import { marked } from "marked"

// Posts are my own Markdown files in the repo, rendered to HTML at build time.
export function renderNote(slug: string): string {
  const markdown = readFileSync(path.join(process.cwd(), "content", "notes", `${slug}.md`), "utf8")
  return marked.parse(markdown, { async: false })
}
