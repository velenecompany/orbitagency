'use client'
import { useEffect, useRef, useState, useCallback } from 'react'

const fullLines = [
  { text: 'No le pegamos un chatbot a un SaaS.', italic: false },
  { text: 'Reconstruimos el producto alrededor del modelo —', italic: false },
  { text: 'donde sucede el razonamiento.', italic: true },
]

const fullText = fullLines.map(l => l.text).join('\n')

export default function Quote() {
  const ref = useRef<HTMLDivElement>(null)
  const [charCount, setCharCount] = useState(0)
  const [direction, setDirection] = useState<'forward' | 'backward'>('forward')
  const [isVisible, setIsVisible] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const labelVisible = charCount > 0

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
    }, 28)
  }, [])

  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => {
        const entry = entries[0]
        if (entry.isIntersecting) {
          setIsVisible(true)
          setDirection('forward')
          animate('forward')
        } else {
          setIsVisible(false)
          setDirection('backward')
          animate('backward')
        }
      },
      { threshold: 0.25 }
    )
    if (ref.current) obs.observe(ref.current)
    return () => { obs.disconnect(); clearAnim() }
  }, [animate])

  // Reconstruct lines from charCount
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
        transition: 'opacity 0.6s, transform 0.6s',
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
      </p>
    </div>
  )
}
