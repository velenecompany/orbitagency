'use client'
import { useEffect, useRef, useState } from 'react'

const lines = [
  { text: 'Tu competencia ya', italic: false },
  { text: 'está usando ', italic: false },
  { text: 'IA.', italic: true },
]

export default function CTA() {
  const ref = useRef<HTMLDivElement>(null)
  const [started, setStarted] = useState(false)
  const [displayed, setDisplayed] = useState<{ text: string; italic: boolean }[]>([])
  const [lineIdx, setLineIdx] = useState(0)
  const [charIdx, setCharIdx] = useState(0)
  const [done, setDone] = useState(false)
  const [showSub, setShowSub] = useState(false)
  const [showBtn, setShowBtn] = useState(false)
  const [eyebrowVisible, setEyebrowVisible] = useState(false)

  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) {
          setEyebrowVisible(true)
          setTimeout(() => setStarted(true), 300)
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
      }, 48 + Math.random() * 20)
      return () => clearTimeout(t)
    } else {
      const t = setTimeout(() => { setLineIdx(l => l + 1); setCharIdx(0) }, 150)
      return () => clearTimeout(t)
    }
  }, [started, lineIdx, charIdx])

  useEffect(() => {
    if (done) {
      setTimeout(() => setShowSub(true), 200)
      setTimeout(() => setShowBtn(true), 500)
    }
  }, [done])

  return (
    <div
      ref={ref}
      style={{
        padding: '160px 56px',
        textAlign: 'center',
        borderTop: '1px solid rgba(240,237,232,0.05)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse 50% 50% at 50% 100%, rgba(240,237,232,0.025) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{
        fontFamily: "'DM Sans',sans-serif", fontSize: '10px',
        letterSpacing: '3px', color: 'var(--white2)',
        textTransform: 'uppercase', marginBottom: '40px',
        opacity: eyebrowVisible ? 1 : 0,
        transform: eyebrowVisible ? 'translateY(0)' : 'translateY(20px)',
        transition: 'opacity 0.8s, transform 0.8s',
      }}>
        ¿Listo para el siguiente nivel?
      </div>

      <h2 style={{
        fontFamily: "'Cormorant Garamond',serif",
        fontSize: 'clamp(52px,7vw,92px)',
        fontWeight: 300, lineHeight: 0.93,
        letterSpacing: '-3px',
        maxWidth: '720px', margin: '0 auto',
        position: 'relative', minHeight: '2.8em',
      }}>
        {displayed.map((line, i) => (
          <span key={i}>
            {i > 0 && <br />}
            <span style={{
              fontStyle: line.italic ? 'italic' : 'normal',
              color: line.italic ? 'var(--white2)' : 'var(--white)',
            }}>
              {line.text}
            </span>
          </span>
        ))}
        {!done && started && <span className="tw-cursor" />}
      </h2>

      <p style={{
        color: 'var(--gray)', fontSize: '14px',
        maxWidth: '360px', margin: '28px auto 44px',
        lineHeight: 1.75, fontWeight: 300,
        fontFamily: "'DM Sans',sans-serif",
        opacity: showSub ? 1 : 0,
        transform: showSub ? 'translateY(0)' : 'translateY(20px)',
        transition: 'opacity 0.8s, transform 0.8s',
      }}>
        30 minutos. Sin compromiso. Te decimos exactamente qué construir para ver resultados en 90 días.
      </p>

      <button
        style={{
          display: 'inline-flex', alignItems: 'center', gap: '10px',
          background: 'rgba(240,237,232,0.07)',
          border: '1px solid rgba(240,237,232,0.12)',
          color: 'var(--white)',
          fontFamily: "'DM Sans',sans-serif",
          fontSize: '12px', padding: '16px 32px',
          cursor: 'pointer', borderRadius: '100px',
          opacity: showBtn ? 1 : 0,
          transform: showBtn ? 'translateY(0)' : 'translateY(20px)',
          transition: 'opacity 0.8s, transform 0.8s, background 0.25s',
        }}
        onMouseEnter={e => (e.currentTarget.style.background = 'rgba(240,237,232,0.14)')}
        onMouseLeave={e => (e.currentTarget.style.background = 'rgba(240,237,232,0.07)')}
      >
        Agendar conversación →
      </button>
    </div>
  )
}
