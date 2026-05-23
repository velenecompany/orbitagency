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
    <>
      <div
        ref={ref}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="service-row"
        style={{
          padding: 'clamp(20px, 3vw, 32px) 0',
          borderTop: '1px solid rgba(240,237,232,0.05)',
          gap: 'clamp(16px, 3vw, 36px)',
          cursor: 'default',
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(44px)',
          transition: `opacity 0.95s ${delay}s cubic-bezier(0.16,1,0.3,1), transform 0.95s ${delay}s cubic-bezier(0.16,1,0.3,1)`,
        }}
      >
        <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '10px', letterSpacing: '2px', color: 'var(--gray)', paddingTop: '4px', flexShrink: 0 }}>
          {service.num}
        </div>
        <div style={{
          fontFamily: "'Cormorant Garamond',serif",
          fontSize: 'clamp(22px, 3vw, 36px)',
          fontWeight: 300, letterSpacing: '-0.5px',
          color: hovered ? 'var(--white)' : 'var(--white2)',
          transition: 'color 0.3s, transform 0.4s cubic-bezier(0.16,1,0.3,1)',
          transform: hovered ? 'translateX(8px)' : 'translateX(0)',
          lineHeight: 1.1,
        }}>
          {service.title}
        </div>
        <div className="service-desc" style={{ fontSize: '12px', color: 'var(--gray)', lineHeight: 1.75, paddingTop: '4px', fontWeight: 300, fontFamily: "'DM Sans',sans-serif" }}>
          {service.desc}
        </div>
        <div className="service-tags" style={{ display: 'flex', flexDirection: 'column', gap: '5px', alignItems: 'flex-end', paddingTop: '4px' }}>
          {service.tags.map(tag => (
            <span key={tag} style={{
              fontFamily: "'DM Sans',sans-serif", fontSize: '9px', letterSpacing: '1.5px',
              color: hovered ? 'var(--white2)' : 'var(--gray)',
              textTransform: 'uppercase',
              border: `1px solid ${hovered ? 'rgba(240,237,232,0.15)' : 'rgba(240,237,232,0.07)'}`,
              padding: '4px 10px', whiteSpace: 'nowrap',
              transition: 'color 0.3s, border-color 0.3s',
            }}>
              {tag}
            </span>
          ))}
        </div>
      </div>
      <style>{`
        .service-row {
          display: grid;
          grid-template-columns: 48px 1fr 1fr auto;
        }
        @media (max-width: 768px) {
          .service-row {
            grid-template-columns: 36px 1fr;
            grid-template-rows: auto auto auto;
          }
          .service-desc {
            grid-column: 2;
            margin-top: 8px;
          }
          .service-tags {
            grid-column: 2;
            flex-direction: row !important;
            flex-wrap: wrap;
            align-items: flex-start !important;
            margin-top: 12px;
          }
        }
      `}</style>
    </>
  )
}

export default function Services() {
  const { ref: headerRef, visible: headerVisible } = useReveal()

  return (
    <section style={{ padding: 'clamp(40px, 8vw, 80px) clamp(20px, 5vw, 56px) clamp(60px, 10vw, 120px)', borderTop: '1px solid rgba(240,237,232,0.05)' }}>
      <div ref={headerRef} className="services-header">
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
          fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: 300,
          letterSpacing: '-1.5px', lineHeight: 1.0,
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

      <style>{`
        .services-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-bottom: clamp(40px, 6vw, 72px);
          gap: 24px;
        }
        @media (max-width: 768px) {
          .services-header {
            flex-direction: column;
            align-items: flex-start;
          }
        }
      `}</style>
    </section>
  )
}
