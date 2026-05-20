'use client'
import { useEffect, useRef, useState } from 'react'

const steps = [
  { num: '01', title: 'Descubrimiento', desc: 'Entendemos tu negocio, tus objetivos y los puntos de fricción que frenan el crecimiento.' },
  { num: '02', title: 'Estrategia', desc: 'Definimos arquitectura, stack tecnológico y métricas de éxito antes de escribir una línea de código.' },
  { num: '03', title: 'Diseño', desc: 'UI/UX de frontera alineado con tu marca, construido para convertir, no solo para verse bien.' },
  { num: '04', title: 'Desarrollo', desc: 'Código limpio, escalable y en producción con velocidad quirúrgica. Sin procesos innecesarios.' },
  { num: '05', title: 'Deploy & QA', desc: 'Entrega en Vercel con pruebas de rendimiento, SEO técnico y accesibilidad completa.' },
  { num: '06', title: 'Optimización', desc: 'Monitoreamos, iteramos y mejoramos basados en datos reales. El trabajo no termina en el deploy.' },
]

function ProcessCard({ step, delay }: { step: typeof steps[0]; delay: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  const [hovered, setHovered] = useState(false)

  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => { if (entries[0].isIntersecting) { setVisible(true); obs.disconnect() } },
      { threshold: 0.08 }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? '#0f0f0f' : 'var(--black)',
        padding: '40px 32px',
        transition: `background 0.3s, opacity 0.95s ${delay}s cubic-bezier(0.16,1,0.3,1), transform 0.95s ${delay}s cubic-bezier(0.16,1,0.3,1)`,
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(44px)',
      }}
    >
      <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '10px', letterSpacing: '2px', color: 'var(--gray)', marginBottom: '28px' }}>
        {step.num}
      </div>
      <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '26px', fontWeight: 300, letterSpacing: '-0.3px', marginBottom: '14px', color: 'var(--white)' }}>
        {step.title}
      </div>
      <p style={{ fontSize: '12px', color: 'var(--gray)', lineHeight: 1.75, fontWeight: 300, fontFamily: "'DM Sans',sans-serif" }}>
        {step.desc}
      </p>
    </div>
  )
}

export default function Process() {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => { if (entries[0].isIntersecting) { setVisible(true); obs.disconnect() } },
      { threshold: 0.08 }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <section style={{ padding: '80px 56px 120px', borderTop: '1px solid rgba(240,237,232,0.05)' }}>
      <div ref={ref} style={{ marginBottom: '72px' }}>
        <div style={{
          fontFamily: "'DM Sans',sans-serif", fontSize: '10px', letterSpacing: '3px',
          color: 'var(--white2)', textTransform: 'uppercase', marginBottom: '20px',
          opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(44px)',
          transition: 'opacity 0.95s cubic-bezier(0.16,1,0.3,1), transform 0.95s cubic-bezier(0.16,1,0.3,1)',
        }}>
          02 · Cómo trabajamos
        </div>
        <h2 style={{
          fontFamily: "'Cormorant Garamond',serif",
          fontSize: 'clamp(40px,5vw,60px)', fontWeight: 300,
          letterSpacing: '-1.5px', lineHeight: 1.0,
          opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(44px)',
          transition: 'opacity 0.95s 0.1s cubic-bezier(0.16,1,0.3,1), transform 0.95s 0.1s cubic-bezier(0.16,1,0.3,1)',
        }}>
          De la idea al sistema<br /><em style={{ fontStyle: 'italic' }}>en producción.</em>
        </h2>
      </div>

      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(3,1fr)',
        gap: '1px', background: 'rgba(240,237,232,0.05)',
      }}>
        {steps.map((s, i) => (
          <ProcessCard key={s.num} step={s} delay={i * 0.1} />
        ))}
      </div>
    </section>
  )
}
