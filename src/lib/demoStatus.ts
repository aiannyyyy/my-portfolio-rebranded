// Reads the latest result of the weekly demo check (.github/workflows/demo-check.yml)
// from the public GitHub API, so the hero can say the demos were recently verified.
// Returns null (badge hidden) when the last run failed, is too old, or GitHub is unreachable.

const RUNS_URL =
  "https://api.github.com/repos/aiannyyyy/my-portfolio-rebranded/actions/workflows/demo-check.yml/runs?branch=main&status=completed&per_page=1"

// Weekly schedule plus one day of slack.
const MAX_AGE_MS = 8 * 24 * 60 * 60 * 1000

export function parseLatestRun(body: unknown, now = Date.now()): Date | null {
  if (typeof body !== "object" || body === null) return null
  const runs = (body as { workflow_runs?: unknown }).workflow_runs
  if (!Array.isArray(runs) || runs.length === 0) return null
  const run = runs[0] as { conclusion?: unknown; updated_at?: unknown }
  if (run.conclusion !== "success" || typeof run.updated_at !== "string") return null
  const checkedAt = new Date(run.updated_at)
  const age = now - checkedAt.getTime()
  if (Number.isNaN(age) || age < 0 || age > MAX_AGE_MS) return null
  return checkedAt
}

// Formatted on the server in Philippine time, e.g. "Mon, Nov 9".
export function formatCheckDate(date: Date): string {
  return new Intl.DateTimeFormat("en-US", { weekday: "short", month: "short", day: "numeric", timeZone: "Asia/Manila" }).format(date)
}

export async function getDemoCheckDate(): Promise<string | null> {
  try {
    const res = await fetch(RUNS_URL, {
      headers: { Accept: "application/vnd.github+json" },
      next: { revalidate: 3600 },
      signal: AbortSignal.timeout(5000),
    })
    if (!res.ok) return null
    const checkedAt = parseLatestRun(await res.json())
    return checkedAt ? formatCheckDate(checkedAt) : null
  } catch {
    return null
  }
}
