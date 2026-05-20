'use client'
import { useEffect, useRef, useState } from 'react'

const lines = [
  { text: 'No le pegamos un chatbot a un SaaS.', italic: false },
  { text: 'Reconstruimos el producto alrededor del modelo —', italic: false },
  { text: 'donde sucede el razonamiento.', italic: true },
]

export default function Quote() {
  const ref = useRef<HTMLDivElement>(null)
  const [started, setStarted] = useState(false)
  const [displayed, setDisplayed] = useState<{ text: string; italic: boolean }[]>([])
  const [lineIdx, setLineIdx] = useState(0)
  const [charIdx, setCharIdx] = useState(0)
  const [done, setDone] = useState(false)
  const [labelVisible, setLabelVisible] = useState(false)

  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) {
          setStarted(true)
          setLabelVisible(true)
          obs.disconnect()
        }
      },
      { threshold: 0.25 }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    if (!started || lineIdx >= lines.length) {
      if (lineIdx >= lines.length) setDone(true)
      return
    }
    const line = lines[lineIdx]
    if (charIdx < line.text.length) {
      const t = setTimeout(() => {
        setDisplayed(prev => {
          const updated = [...prev]
          if (!updated[lineIdx]) updated[lineIdx] = { text: '', italic: line.italic }
          updated[lineIdx] = { ...updated[lineIdx], text: updated[lineIdx].text + line.text[charIdx] }
          return updated
        })
        setCharIdx(c => c + 1)
      }, 26 + Math.random() * 10)
      return () => clearTimeout(t)
    } else {
      const t = setTimeout(() => { setLineIdx(l => l + 1); setCharIdx(0) }, 120)
      return () => clearTimeout(t)
    }
  }, [started, lineIdx, charIdx])

  return (
    <div ref={ref} style={{
      padding: '100px 56px',
      borderTop: '1px solid rgba(240,237,232,0.05)',
      display: 'grid',
      gridTemplateColumns: '180px 1fr',
      gap: '60px',
      alignItems: 'start',
    }}>
      <div style={{
        fontFamily: "'DM Sans',sans-serif", fontSize: '10px',
        letterSpacing: '3px', color: 'var(--gray)',
        textTransform: 'uppercase', paddingTop: '10px',
        opacity: labelVisible ? 1 : 0,
        transform: labelVisible ? 'translateY(0)' : 'translateY(20px)',
        transition: 'opacity 0.8s, transform 0.8s',
      }}>
        Nuestra filosofía
      </div>

      <p style={{
        fontFamily: "'Cormorant Garamond',serif",
        fontSize: 'clamp(30px,3.5vw,50px)',
        fontWeight: 300, lineHeight: 1.15,
        letterSpacing: '-0.8px', color: 'var(--white)',
        minHeight: '4em',
      }}>
        {displayed.map((line, i) => (
          <span key={i}>
            {i > 0 && <br />}
            <span style={{ fontStyle: line.italic ? 'italic' : 'normal', color: line.italic ? 'var(--white2)' : 'var(--white)' }}>
              {line.text}
            </span>
          </span>
        ))}
        {!done && started && <span className="tw-cursor" />}
      </p>
    </div>
  )
}
