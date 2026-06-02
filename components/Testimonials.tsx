'use client'
import { useEffect, useRef, useState } from 'react'

const testimonials = [
  {
    quote: 'En 45 días teníamos un sistema que calificaba leads automáticamente. Nuestro equipo solo habla con prospectos que ya quieren comprar.',
    name: 'Marco Ramírez',
    role: 'CEO · Inmobiliaria Nexo, CDMX',
    initials: 'MR',
  },
  {
    quote: 'La web nueva convierte. Pasamos de 3 agendamientos por semana a más de 20. El ROI se pagó solo en el primer mes.',
    name: 'Sofía Castro',
    role: 'Directora · Clínica Lumina, GDL',
    initials: 'SC',
  },
  {
    quote: 'Mi chatbot responde, agenda y cobra mientras duermo. No sabía que automatizar WhatsApp era tan poderoso.',
    name: 'Fernando Herrera',
    role: 'Co-fundador · VELENÉ, Guadalajara',
    initials: 'FH',
  },
]

function TestimonialCard({ t, delay }: { t: typeof testimonials[0]; delay: number }) {
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
    <div ref={ref} style={{
      background: 'var(--black)',
      padding: 'clamp(24px, 4vw, 36px) clamp(20px, 3vw, 32px)',
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : 'translateY(44px)',
      transition: `opacity 0.95s ${delay}s cubic-bezier(0.16,1,0.3,1), transform 0.95s ${delay}s cubic-bezier(0.16,1,0.3,1)`,
    }}>
      <p style={{
        fontFamily: "'Cormorant Garamond',serif",
        fontSize: 'clamp(16px, 2vw, 18px)', fontWeight: 300,
        lineHeight: 1.6, color: 'var(--white2)',
        marginBottom: '28px', fontStyle: 'italic',
      }}>
        "{t.quote}"
      </p>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{
          width: '36px', height: '36px', flexShrink: 0,
          background: 'rgba(240,237,232,0.06)',
          border: '1px solid rgba(240,237,232,0.1)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: "'DM Sans',sans-serif", fontSize: '10px',
          fontWeight: 500, color: 'var(--white2)',
        }}>
          {t.initials}
        </div>
        <div>
          <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '12px', fontWeight: 500, color: 'var(--white)', marginBottom: '2px' }}>
            {t.name}
          </div>
          <div style={{ fontSize: '10px', color: 'var(--gray)', letterSpacing: '1px', fontFamily: "'DM Sans',sans-serif" }}>
            {t.role}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Testimonials() {
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
    <>
      <section style={{ padding: 'clamp(40px, 8vw, 80px) clamp(20px, 5vw, 56px) clamp(60px, 10vw, 120px)', borderTop: '1px solid rgba(240,237,232,0.05)' }}>
        <div ref={ref} style={{ marginBottom: 'clamp(32px, 5vw, 72px)' }}>
          <div style={{
            fontFamily: "'DM Sans',sans-serif", fontSize: '10px', letterSpacing: '3px',
            color: 'var(--white2)', textTransform: 'uppercase',
            opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(44px)',
            transition: 'opacity 0.95s cubic-bezier(0.16,1,0.3,1), transform 0.95s cubic-bezier(0.16,1,0.3,1)',
          }}>
            04 · Clientes
          </div>
        </div>

        <div className="testimonials-grid">
          {testimonials.map((t, i) => (
            <TestimonialCard key={t.initials} t={t} delay={i * 0.12} />
          ))}
        </div>
      </section>

      <style>{`
        .testimonials-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1px;
          background: rgba(240,237,232,0.05);
        }
        @media (max-width: 768px) {
          .testimonials-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </>
  )
}
