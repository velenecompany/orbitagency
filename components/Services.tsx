'use client'
import { useEffect, useRef, useState } from 'react'

const services = [
  {
    num: '01',
    title: 'Estrategia IA',
    desc: 'Auditamos tu operación, detectamos dónde la IA genera más valor y construimos un roadmap con retorno medible.',
    tags: ['Auditoría', 'Roadmap IA', 'ROI'],
  },
  {
    num: '02',
    title: 'Web & Plataformas',
    desc: 'Sitios y aplicaciones de alto rendimiento con SEO técnico, branding de frontera y chatbots IA que convierten.',
    tags: ['Next.js', 'SEO', 'Chatbot IA'],
  },
  {
    num: '03',
    title: 'Automatizaciones',
    desc: 'Workflows que atienden, califican y cierran prospectos vía WhatsApp y CRM sin intervención humana.',
    tags: ['WhatsApp IA', 'CRM', 'Workflows'],
  },
  {
    num: '04',
    title: 'SaaS & Agentes IA',
    desc: 'Plataformas propias, dashboards operativos y agentes IA que trabajan dentro de tu empresa 24/7.',
    tags: ['SaaS', 'Dashboards', 'Agentes IA'],
  },
]

function useReveal() {
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
  return { ref, visible }
}

function ServiceRow({ service, delay }: { service: typeof services[0]; delay: number }) {
  const { ref, visible } = useReveal()
  const [hovered, setHovered] = useState(false)

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'grid',
        gridTemplateColumns: '72px 1fr 1fr auto',
        alignItems: 'start',
        padding: '32px 0',
        borderTop: '1px solid rgba(240,237,232,0.05)',
        gap: '36px',
        cursor: 'default',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(44px)',
        transition: `opacity 0.95s ${delay}s cubic-bezier(0.16,1,0.3,1), transform 0.95s ${delay}s cubic-bezier(0.16,1,0.3,1)`,
      }}
    >
      <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '10px', letterSpacing: '2px', color: 'var(--gray)', paddingTop: '6px' }}>
        {service.num}
      </div>
      <div style={{
        fontFamily: "'Cormorant Garamond',serif",
        fontSize: 'clamp(24px,2.8vw,36px)',
        fontWeight: 300, letterSpacing: '-0.5px',
        color: hovered ? 'var(--white)' : 'var(--white2)',
        transition: 'color 0.3s', lineHeight: 1.1,
      }}>
        {service.title}
      </div>
      <div style={{ fontSize: '12px', color: 'var(--gray)', lineHeight: 1.75, paddingTop: '5px', maxWidth: '300px', fontWeight: 300, fontFamily: "'DM Sans',sans-serif" }}>
        {service.desc}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', alignItems: 'flex-end', paddingTop: '5px' }}>
        {service.tags.map(tag => (
          <span key={tag} style={{
            fontFamily: "'DM Sans',sans-serif", fontSize: '9px', letterSpacing: '1.5px',
            color: 'var(--gray)', textTransform: 'uppercase',
            border: '1px solid rgba(240,237,232,0.07)', padding: '4px 10px', whiteSpace: 'nowrap',
          }}>
            {tag}
          </span>
        ))}
      </div>
    </div>
  )
}

export default function Services() {
  const { ref: headerRef, visible: headerVisible } = useReveal()

  return (
    <section style={{ padding: '80px 56px 120px', borderTop: '1px solid rgba(240,237,232,0.05)' }}>
      <div ref={headerRef} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '72px' }}>
        <div style={{
          fontFamily: "'DM Sans',sans-serif", fontSize: '10px', letterSpacing: '3px',
          color: 'var(--white2)', textTransform: 'uppercase',
          opacity: headerVisible ? 1 : 0, transform: headerVisible ? 'translateY(0)' : 'translateY(44px)',
          transition: 'opacity 0.95s cubic-bezier(0.16,1,0.3,1), transform 0.95s cubic-bezier(0.16,1,0.3,1)',
        }}>
          01 · Lo que construimos
        </div>
        <h2 style={{
          fontFamily: "'Cormorant Garamond',serif",
          fontSize: 'clamp(38px,4.5vw,56px)', fontWeight: 300,
          letterSpacing: '-1.5px', lineHeight: 1.0,
          maxWidth: '480px', textAlign: 'right',
          opacity: headerVisible ? 1 : 0, transform: headerVisible ? 'translateY(0)' : 'translateY(44px)',
          transition: 'opacity 0.95s 0.18s cubic-bezier(0.16,1,0.3,1), transform 0.95s 0.18s cubic-bezier(0.16,1,0.3,1)',
        }}>
          Productos nativos<br />en IA, <em style={{ fontStyle: 'italic', color: 'var(--white2)' }}>de principio<br />a fin.</em>
        </h2>
      </div>

      {services.map((s, i) => (
        <ServiceRow key={s.num} service={s} delay={i * 0.1} />
      ))}
      <div style={{ borderBottom: '1px solid rgba(240,237,232,0.05)' }} />
    </section>
  )
}
