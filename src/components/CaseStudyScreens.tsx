"use client"
import { useState } from "react"
import ImageLightbox from "@/components/ImageLightbox"

type Props = { title: string; images: string[]; captions: string[]; layout: "phone" | "desktop" }

export default function CaseStudyScreens({ title, images, captions, layout }: Props) {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <>
      <div style={{ display:"grid", gridTemplateColumns:`repeat(auto-fill, minmax(${layout === "phone" ? "130px" : "260px"}, 1fr))`, gap:"16px" }}>
        {images.map((src, i) => (
          <figure key={src} style={{ margin:0 }}>
            <button
              onClick={() => setOpen(i)}
              aria-label={`View larger: ${captions[i]}`}
              style={{ display:"block", width:"100%", padding:0, border:"none", background:"none", cursor:"zoom-in" }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src.replace(/\.webp$/, "-sm.webp")} alt={captions[i]} loading="lazy" decoding="async" style={{ width:"100%", height:"auto", borderRadius:"8px", border:"1px solid var(--border)", display:"block" }} />
            </button>
            <figcaption style={{ fontSize:"0.75rem", color:"var(--muted)", marginTop:"6px", lineHeight:1.5 }}>{captions[i]}</figcaption>
          </figure>
        ))}
      </div>
      {open !== null && (
        <ImageLightbox images={images} captions={captions} startIndex={open} label={title} onClose={() => setOpen(null)} />
      )}
    </>
  )
}
