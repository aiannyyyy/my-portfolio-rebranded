"use client"
import { useEffect, useRef, useState } from "react"

type Props = {
  images: string[]
  captions?: string[]
  startIndex?: number
  label: string
  onClose: () => void
}

const navButton = { position:"absolute" as const, top:"50%", transform:"translateY(-50%)", width:"44px", height:"44px", borderRadius:"50%", border:"1px solid rgba(255,255,255,0.3)", backgroundColor:"rgba(0,0,0,0.55)", color:"#ffffff", fontSize:"1.4rem", lineHeight:1, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center" }

// Full-screen image viewer: swipe on phones, arrow keys and buttons on desktop, Esc to close.
export default function ImageLightbox({ images, captions, startIndex = 0, label, onClose }: Props) {
  const [index, setIndex] = useState(startIndex)
  const touchX = useRef<number | null>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const onCloseRef = useRef(onClose)
  const count = images.length

  useEffect(() => { onCloseRef.current = onClose }, [onClose])

  const next = () => setIndex((i) => (i + 1) % count)
  const prev = () => setIndex((i) => (i - 1 + count) % count)

  useEffect(() => {
    const opener = document.activeElement as HTMLElement | null
    const overflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    closeRef.current?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCloseRef.current()
      else if (e.key === "ArrowRight") setIndex((i) => (i + 1) % count)
      else if (e.key === "ArrowLeft") setIndex((i) => (i - 1 + count) % count)
    }
    window.addEventListener("keydown", onKey)
    return () => {
      window.removeEventListener("keydown", onKey)
      document.body.style.overflow = overflow
      opener?.focus()
    }
  }, [count])

  const onTouchEnd = (x: number) => {
    if (touchX.current === null || count < 2) return
    const dx = x - touchX.current
    touchX.current = null
    if (dx < -50) next()
    else if (dx > 50) prev()
  }

  const caption = captions?.[index]

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={label}
      onClick={onClose}
      style={{ position:"fixed", inset:0, height:"100dvh", zIndex:2000, backgroundColor:"rgba(0,0,0,0.9)", display:"flex", flexDirection:"column", paddingTop:"env(safe-area-inset-top)", paddingBottom:"env(safe-area-inset-bottom)", paddingLeft:"env(safe-area-inset-left)", paddingRight:"env(safe-area-inset-right)" }}
    >
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"8px 12px", color:"#ffffff", flexShrink:0 }}>
        <span style={{ fontSize:"0.8rem", fontWeight:600, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>
          {label}{count > 1 ? ` (${index + 1} / ${count})` : ""}
        </span>
        <button
          ref={closeRef}
          onClick={onClose}
          aria-label="Close"
          style={{ width:"44px", height:"44px", flexShrink:0, background:"none", border:"none", color:"#ffffff", fontSize:"1.3rem", cursor:"pointer" }}
        >
          ✕
        </button>
      </div>

      <div
        onTouchStart={(e) => { touchX.current = e.touches[0].clientX }}
        onTouchEnd={(e) => onTouchEnd(e.changedTouches[0].clientX)}
        style={{ position:"relative", flex:1, minHeight:0, display:"flex", alignItems:"center", justifyContent:"center", padding:"0 12px" }}
      >
        {images[index].endsWith(".mp4") ? (
          <video
            key={images[index]}
            src={images[index]}
            poster={images[index].replace(/\.mp4$/, "-poster.webp")}
            aria-label={caption ?? `${label} demo video`}
            onClick={(e) => e.stopPropagation()}
            autoPlay
            muted
            loop
            playsInline
            controls
            style={{ maxWidth:"100%", maxHeight:"100%", objectFit:"contain", borderRadius:"6px", display:"block", backgroundColor:"#000000" }}
          />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={images[index]}
            alt={caption ?? `${label} screenshot ${index + 1}`}
            onClick={(e) => e.stopPropagation()}
            style={{ maxWidth:"100%", maxHeight:"100%", objectFit:"contain", borderRadius:"6px", display:"block" }}
          />
        )}
        {count > 1 && (
          <>
            <button onClick={(e) => { e.stopPropagation(); prev() }} aria-label="Previous image" style={{ ...navButton, left:"8px" }}>‹</button>
            <button onClick={(e) => { e.stopPropagation(); next() }} aria-label="Next image" style={{ ...navButton, right:"8px" }}>›</button>
          </>
        )}
      </div>

      <p style={{ flexShrink:0, minHeight:"48px", margin:0, padding:"10px 16px 12px", textAlign:"center", fontSize:"0.8rem", lineHeight:1.5, color:"rgba(255,255,255,0.85)" }}>
        {caption ?? (count > 1 ? "Swipe or use the arrows to see more" : "")}
      </p>
    </div>
  )
}
