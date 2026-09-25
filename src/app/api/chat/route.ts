import Groq from "groq-sdk"
import { personal, skills, projects, experience, certifications, education } from "@/data"

const MAX_HISTORY = 10
const MAX_MESSAGE_LENGTH = 500

const systemPrompt = [
  "You are the assistant on " + personal.name + "'s portfolio website. Answer visitors' questions about " + personal.name + " using ONLY the facts below.",
  "Rules:",
  "- Never invent projects, links, metrics, dates, employers, or features. If the answer is not in the facts, say you don't have that information and suggest contacting " + personal.email + ".",
  "- Politely decline questions unrelated to " + personal.name + ".",
  "- Keep answers short: a few sentences or a brief bullet list. No tables, no headings.",
  "- Only share links that appear in the facts.",
  "",
  "FACTS",
  "About: " + personal.about,
  "Location: " + personal.location,
  "Contact: " + personal.email + " | GitHub: " + personal.github + " | LinkedIn: " + personal.linkedin,
  "Skills: " + skills.map(s => s.category + ": " + s.items.join(", ")).join(". "),
  "Experience: " + experience.map(e => e.role + " at " + e.company + " (" + e.period + "): " + e.description.join("; ")).join(" | "),
  "Education: " + education.map(e => e.degree + " at " + e.school + ", " + e.period).join(" | "),
  "Projects: " + projects.map(p => p.title + ": " + p.description + " " + p.explanation + " Tech: " + p.tech.join(", ") + (p.liveUrl ? " Live: " + p.liveUrl : "") + (p.repoUrl ? " Repo: " + p.repoUrl : "")).join(" | "),
  "Certifications: " + certifications.map(c => c.title + " by " + c.issuer + " (" + c.date + ")").join(", "),
].join("\n")

type ChatMessage = { role: "user" | "assistant"; content: string }

function sanitizeMessages(input: unknown): ChatMessage[] {
  if (!Array.isArray(input)) return []
  return input
    .filter((m): m is ChatMessage =>
      !!m && (m.role === "user" || m.role === "assistant") && typeof m.content === "string")
    .slice(-MAX_HISTORY)
    .map(m => ({ role: m.role, content: m.content.slice(0, MAX_MESSAGE_LENGTH) }))
}

export async function POST(req: Request) {
  try {
    const apiKey = process.env.GROQ_API_KEY
    if (!apiKey) {
      console.error("GROQ_API_KEY is not set")
      return Response.json({ message: "The assistant is unavailable right now." }, { status: 500 })
    }

    const body = await req.json().catch(() => null)
    const messages = sanitizeMessages(body?.messages)
    if (messages.length === 0) {
      return Response.json({ message: "Please send a question." }, { status: 400 })
    }

    const groq = new Groq({ apiKey })

    const completion = await groq.chat.completions.create({
      model: "openai/gpt-oss-120b",
      reasoning_effort: "low",
      messages: [{ role: "system", content: systemPrompt }, ...messages],
      max_tokens: 700,
    })

    return Response.json({ message: completion.choices[0].message.content ?? "" })
  } catch (error) {
    console.error("Chat API error:", error)
    return Response.json({ message: "Sorry, something went wrong. Please try again later." }, { status: 500 })
  }
}
