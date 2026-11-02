import { ImageResponse } from "next/og"
import { personal } from "@/data"

// The picture shown when the portfolio link is shared on LinkedIn, Messenger, Slack and so on.
export const alt = `${personal.name} - Full-Stack Developer`
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div style={{ width:"100%", height:"100%", display:"flex", flexDirection:"column", justifyContent:"center", padding:"80px", backgroundColor:"#0d1117", color:"#e6edf3", fontFamily:"sans-serif" }}>
        <div style={{ fontSize:32, color:"#58a6ff", letterSpacing:4, textTransform:"uppercase" }}>Portfolio</div>
        <div style={{ fontSize:76, fontWeight:700, marginTop:20 }}>{personal.name}</div>
        <div style={{ fontSize:40, marginTop:16 }}>{personal.headline}</div>
        <div style={{ fontSize:30, color:"#8b949e", marginTop:28 }}>{personal.availability}</div>
        <div style={{ display:"flex", gap:24, marginTop:48 }}>
          {personal.highlights.slice(0, 3).map((h) => (
            <div key={h.value} style={{ display:"flex", flexDirection:"column", padding:"18px 26px", border:"2px solid #30363d", borderRadius:12 }}>
              <div style={{ fontSize:40, fontWeight:700, color:"#58a6ff" }}>{h.value}</div>
              <div style={{ fontSize:22, color:"#8b949e", maxWidth:260 }}>{h.label}</div>
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  )
}
