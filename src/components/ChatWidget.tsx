"use client"
import { useState, useRef, useEffect } from "react"

interface Message {
  role: "user" | "assistant"
  content: string
}

const suggestions = [
  "What technologies does he know?",
  "Tell me about his projects",
  "What is his work experience?",
  "Does he have any certifications?",
]

function formatMessage(text: string) {
  return text
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\n/g, "<br/>")
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([{ role:"assistant", content:"Hi! I can answer questions about this portfolio. What would you like to know?" }])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior:"smooth" })
  }, [messages])

  const send = async (text?: string) => {
    const content = text || input.trim()
    if (!content || loading) return
    setInput("")
    const newMessages: Message[] = [...messages, { role:"user", content }]
    setMessages(newMessages)
    setLoading(true)
    try {
      const res = await fetch("/api/chat", { method:"POST", headers:{ "Content-Type":"application/json" }, body:JSON.stringify({ messages: newMessages }) })
      const data = await res.json()
      setMessages([...newMessages, { role:"assistant", content:data.message }])
    } catch {
      setMessages([...newMessages, { role:"assistant", content:"Sorry, something went wrong." }])
    }
    setLoading(false)
  }

  return (
    <div style={{ position:"fixed", bottom:"24px", right:"24px", zIndex:1000 }}>
      {open && (
        <div style={{ width:"340px", height:"480px", borderRadius:"12px", border:"1px solid var(--border)", backgroundColor:"var(--canvas)", display:"flex", flexDirection:"column", marginBottom:"12px", boxShadow:"0 8px 32px rgba(0,0,0,0.12)" }}>
          <div style={{ padding:"16px", borderBottom:"1px solid var(--border)", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
            <div>
              <p style={{ margin:0, fontWeight:600, fontSize:"0.875rem", color:"var(--text)" }}>Portfolio Assistant</p>
              <p style={{ margin:0, fontSize:"0.7rem", color:"var(--muted)" }}>Ask me anything</p>
            </div>
            <button onClick={() => setOpen(false)} style={{ background:"none", border:"none", cursor:"pointer", fontSize:"1.2rem", color:"var(--muted)" }}>X</button>
          </div>
          <div style={{ flex:1, overflowY:"auto", padding:"16px", display:"flex", flexDirection:"column", gap:"12px" }}>
            {messages.map((m, i) => (
              <div key={i} style={{ display:"flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start" }}>
                <div
                  style={{ maxWidth:"80%", padding:"8px 12px", borderRadius:"8px", fontSize:"0.8rem", lineHeight:1.5, backgroundColor: m.role === "user" ? "var(--accent)" : "var(--surface)", color: m.role === "user" ? "#ffffff" : "var(--text)", border: m.role === "assistant" ? "1px solid var(--border)" : "none" }}
                  dangerouslySetInnerHTML={{ __html: formatMessage(m.content) }}
                />
              </div>
            ))}
            {loading && (
              <div style={{ display:"flex", justifyContent:"flex-start" }}>
                <div style={{ padding:"8px 12px", borderRadius:"8px", fontSize:"0.8rem", backgroundColor:"var(--surface)", color:"var(--muted)", border:"1px solid var(--border)" }}>Thinking...</div>
              </div>
            )}
            {messages.length === 1 && (
              <div style={{ display:"flex", flexDirection:"column", gap:"6px", marginTop:"8px" }}>
                {suggestions.map((s) => (
                  <button key={s} onClick={() => send(s)} style={{ textAlign:"left", padding:"6px 10px", borderRadius:"6px", border:"1px solid var(--border)", backgroundColor:"var(--surface)", color:"var(--muted)", fontSize:"0.75rem", cursor:"pointer" }}>{s}</button>
                ))}
              </div>
            )}
            <div ref={bottomRef} />
          </div>
          <div style={{ padding:"12px", borderTop:"1px solid var(--border)", display:"flex", gap:"8px" }}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              placeholder="Ask something..."
              style={{ flex:1, padding:"8px 12px", borderRadius:"6px", border:"1px solid var(--border)", backgroundColor:"var(--surface)", color:"var(--text)", fontSize:"0.8rem", outline:"none" }}
            />
            <button onClick={() => send()} disabled={loading} style={{ padding:"8px 14px", borderRadius:"6px", backgroundColor:"var(--accent)", color:"#ffffff", border:"none", cursor:"pointer", fontSize:"0.8rem", fontWeight:600 }}>Send</button>
          </div>
        </div>
      )}
      <button
        onClick={() => setOpen(!open)}
        style={{ width:"52px", height:"52px", borderRadius:"50%", backgroundColor:"var(--accent)", color:"#ffffff", border:"none", cursor:"pointer", fontSize:"1.4rem", display:"flex", alignItems:"center", justifyContent:"center", boxShadow:"0 4px 16px rgba(37,99,235,0.4)", marginLeft:"auto" }}
      >
        {open ? "X" : "?"}
      </button>
    </div>
  )
}
