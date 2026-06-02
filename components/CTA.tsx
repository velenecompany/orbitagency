'use client'
import { useEffect, useRef, useState, useCallback } from 'react'

const fullLines = [
  { text: 'Tu competencia ya', italic: false },
  { text: 'está usando ', italic: false },
  { text: 'IA.', italic: true },
]

const fullText = fullLines.map(l => l.text).join('\n')

export default function CTA() {
  const ref = useRef<HTMLDivElement>(null)
  const [charCount, setCharCount] = useState(0)
  const [showSub, setShowSub] = useState(false)
  const [showBtn, setShowBtn] = useState(false)
  const [eyebrowVisible, setEyebrowVisible] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const clearAnim = () => {
    if (intervalRef.current) clearInterval(intervalRef.current)
  }

  const animate = useCallback((dir: 'forward' | 'backward') => {
    clearAnim()
    intervalRef.current = setInterval(() => {
      setCharCount(prev => {
        if (dir === 'forward') {
          if (prev >= fullText.length) { clearAnim(); return prev }
          return prev + 1
        } else {
          if (prev <= 0) { clearAnim(); return 0 }
          return prev - 1
        }
      })
    }, 48)
  }, [])

  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => {
        const entry = entries[0]
        if (entry.isIntersecting) {
          setEyebrowVisible(true)
          setTimeout(() => animate('forward'), 300)
        } else {
          setEyebrowVisible(false)
          setShowSub(false)
          setShowBtn(false)
          animate('backward')
        }
      },
      { threshold: 0.25 }
    )
    if (ref.current) obs.observe(ref.current)
    return () => { obs.disconnect(); clearAnim() }
  }, [animate])

  useEffect(() => {
    if (charCount >= fullText.length) {
      setTimeout(() => setShowSub(true), 200)
      setTimeout(() => setShowBtn(true), 500)
    }
    if (charCount === 0) {
      setShowSub(false)
      setShowBtn(false)
    }
  }, [charCount])

  const getDisplayedLines = () => {
    let remaining = charCount
    return fullLines.map(line => {
      const visible = line.text.slice(0, remaining)
      remaining = Math.max(0, remaining - line.text.length)
      return { text: visible, italic: line.italic }
    })
  }

  const displayedLines = getDisplayedLines()
  const isDone = charCount >= fullText.length

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
        {displayedLines.map((line, i) => (
          line.text.length > 0 && (
            <span key={i}>
              {i > 0 && <br />}
              <span style={{
                fontStyle: line.italic ? 'italic' : 'normal',
                color: line.italic ? 'var(--white2)' : 'var(--white)',
              }}>
                {line.text}
              </span>
            </span>
          )
        ))}
        {!isDone && charCount > 0 && <span className="tw-cursor" />}
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
        onClick={() => window.open('https://wa.me/523312499320?text=Hola%20VANT%20Studio%20quiero%20agendar%20una%20llamada', '_blank')}
      >
        Agendar conversación →
      </button>
    </div>
  )
}
