// Opens the portfolio and every live demo in a real browser and fails if one is
// down, blank, or throws errors, so a broken link is caught before a recruiter
// finds it. Run by .github/workflows/demo-check.yml; locally: node scripts/check-demos.mjs
import { chromium } from "playwright"

const checks = [
  { name: "Portfolio", url: "https://johnadrian.dev/", expect: ["Full-Stack Developer", "See live demos"] },
  { name: "Portfolio case study", url: "https://johnadrian.dev/projects/job-assistant", expect: ["Quick tour"] },
  // Links sent before the domain change must still land on the site.
  { name: "Old portfolio link", url: "https://my-portfolio-rebranded.vercel.app/notes/securing-my-job-app", expect: ["How I secured"] },
  { name: "Job Application Assistant", url: "https://job-assistant-demo.vercel.app/jobs", expect: ["Demo with sample data", "Jobs"] },
  { name: "Task Management App", url: "https://task-management-app-rust-two.vercel.app/", expect: ["Task Manager", "My Tasks"] },
  { name: "Corporate Dashboard", url: "https://nscsl-dashboard.vercel.app/dashboard/pdo", expect: ["Demo Admin"] },
  { name: "File Management System", url: "https://file-management-system-avhs.vercel.app/dashboard", expect: ["Demo Admin", "Dashboard"] },
]

const browser = await chromium.launch()
const failures = []

for (const check of checks) {
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } })
  const errors = []
  page.on("pageerror", (e) => errors.push(e.message.slice(0, 160)))
  let problem = null
  try {
    const res = await page.goto(check.url, { waitUntil: "networkidle", timeout: 60_000 })
    if (!res || res.status() >= 400) problem = `HTTP ${res ? res.status() : "no response"}`
    else {
      await page.waitForTimeout(1500)
      // innerText follows CSS text-transform, so compare without case.
      const text = (await page.locator("body").innerText()).toLowerCase()
      const missing = check.expect.filter((t) => !text.includes(t.toLowerCase()))
      if (missing.length) problem = `page loaded but is missing: ${missing.join(", ")}`
      else if (errors.length) problem = `page errors: ${errors.join(" | ")}`
    }
  } catch (e) {
    problem = e.message.split("\n")[0]
  }
  console.log(`${problem ? "FAIL" : "ok  "} ${check.name} - ${check.url}${problem ? `\n     ${problem}` : ""}`)
  if (problem) failures.push(check.name)
  await page.close()
}

await browser.close()
if (failures.length) {
  console.log(`\n${failures.length} demo(s) need attention: ${failures.join(", ")}`)
  process.exit(1)
}
console.log("\nAll demos are up.")
