import Groq from "groq-sdk"
import { personal, skills, projects, experience, certifications } from "@/data"

export async function POST(req: Request) {
  try {
    const apiKey = process.env.GROQ_API_KEY
    if (!apiKey) {
      return Response.json({ message: "API key missing" }, { status: 500 })
    }

    const groq = new Groq({ apiKey })

    const systemPrompt = "You are a helpful assistant on " + personal.name + " portfolio. Answer only about this person. Skills: " + skills.map(s => s.category + ": " + s.items.join(", ")).join(". ") + " Projects: " + projects.map(p => p.title + " - " + p.description + " tech: " + p.tech.join(", ")).join(". ") + " Experience: " + experience.map(e => e.role + " at " + e.company + " " + e.period).join(", ") + " Certifications: " + certifications.map(c => c.title + " by " + c.issuer).join(", ") + " Contact: " + personal.email

    const { messages } = await req.json()

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [{ role: "system", content: systemPrompt }, ...messages],
      max_tokens: 500,
    })

    return Response.json({ message: completion.choices[0].message.content })
  } catch (error) {
    console.error("Full error:", error)
    return Response.json({ message: "Error: " + String(error) }, { status: 500 })
  }
}
