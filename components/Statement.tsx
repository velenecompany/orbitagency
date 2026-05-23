'use client'
import { useEffect, useRef, useState } from 'react'

export default function Statement() {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => { if (entries[0].isIntersecting) { setVisible(true); obs.disconnect() } },
      { threshold: 0.1 }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  const words = [
    { text: 'Escribir', faded: true },
    { text: 'código', faded: true },
    { text: 'fue', faded: true },
    { text: 'la', faded: true },
    { text: 'habilidad', faded: true },
    { text: 'del', faded: true },
    { text: 'siglo', faded: true },
    { text: 'pasado.', faded: true },
    { text: 'La' },
    { text: 'nueva' },
    { text: 'es' },
    { text: 'saber' },
    { text: 'qué' },
    { text: 'pedirle' },
    { text: 'al' },
    { text: 'modelo' },
    { text: 'y', italic: true },
    { text: 'por', italic: true },
    { text: 'qué.', italic: true },
    { text: 'Pensamos' },
    { text: 'en' },
    { text: 'sistemas,' },
    { text: 'no' },
    { text: 'en' },
    { text: 'páginas.' },
  ]

  return (
    <div ref={ref} style={{
      padding: 'clamp(60px, 10vw, 130px) clamp(20px, 5vw, 56px)',
      borderTop: '1px solid rgba(240,237,232,0.05)',
    }}>
      <p style={{
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: 'clamp(28px, 5vw, 68px)',
        fontWeight: 300,
        lineHeight: 1.12,
        letterSpacing: '-1px',
        maxWidth: '1040px',
      }}>
        {words.map((word, i) => (
          <span key={i}>
            <span style={{
              display: 'inline-block',
              color: word.faded ? 'var(--gray)' : 'var(--white)',
              fontStyle: word.italic ? 'italic' : 'normal',
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(18px)',
              transition: `opacity 0.55s ${i * 0.045}s, transform 0.55s ${i * 0.045}s`,
            }}>
              {word.text}
            </span>
            {' '}
          </span>
        ))}
      </p>
    </div>
  )
}
