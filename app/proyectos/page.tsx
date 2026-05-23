'use client'
import { useEffect, useState, useRef } from 'react'
import Link from 'next/link'

const projects = [
  {
    id: 1,
    name: 'Clínica Estética Lumina',
    category: 'Clínica Estética',
    desc: 'Sitio web premium para clínica estética con sistema de agendamiento, catálogo de tratamientos y chatbot IA.',
    result: '+280% agendamientos en 60 días',
    tags: ['Next.js', 'TypeScript', 'TailwindCSS', 'Vercel'],
    bg: 'linear-gradient(135deg, #0a0818 0%, #1a0a2e 50%, #0d0820 100%)',
    accent: '#a855f7',
    preview: 'LUMINA',
  },
  {
    id: 2,
    name: 'Apex Gym Premium',
    category: 'Fitness & Wellness',
    desc: 'Plataforma de alto impacto con WhatsApp IA para seguimiento automático de prospectos y cobro de membresías.',
    result: '+190% conversión de leads',
    tags: ['Next.js', 'WhatsApp API', 'Stripe'],
    bg: 'linear-gradient(135deg, #080d08 0%, #0d1a0d 50%, #081408 100%)',
    accent: '#22c55e',
    preview: 'APEX',
  },
  {
    id: 3,
    name: 'VELENÉ Athleisure',
    category: 'E-Commerce',
    desc: 'Ecommerce premium para marca de ropa con sistema de drops limitados, carrito persistente y dashboard interno.',
    result: 'Lanzamiento exitoso · Drops agotados',
    tags: ['Next.js', 'Stripe', 'Neon DB'],
    bg: 'linear-gradient(135deg, #0d0a06 0%, #1a1208 50%, #120e06 100%)',
    accent: '#f59e0b',
    preview: 'VELENÉ',
  },
  {
    id: 4,
    name: 'Nexo Propiedades',
    category: 'Real Estate',
    desc: 'Portal inmobiliario con agente IA que califica compradores, agenda visitas y mantiene seguimiento por WhatsApp.',
    result: '+420% consultas calificadas',
    tags: ['Next.js', 'IA Agent', 'CRM'],
    bg: 'linear-gradient(135deg, #06080d 0%, #080a1a 50%, #06080f 100%)',
    accent: '#3b82f6',
    preview: 'NEXO',
  },
  {
    id: 5,
    name: 'Restaurante Marea',
    category: 'Hospitalidad',
    desc: 'Sitio premium para restaurante de alta cocina con reservaciones online, menú digital y SEO local optimizado.',
    result: '+160% reservaciones online',
    tags: ['Next.js', 'Booking', 'SEO'],
    bg: 'linear-gradient(135deg, #0d0806 0%, #1a0e08 50%, #120a06 100%)',
    accent: '#ef4444',
    preview: 'MAREA',
  },
  {
    id: 6,
    name: 'FinTrack SaaS',
    category: 'SaaS & Fintech',
    desc: 'Plataforma SaaS para gestión financiera con agente IA que analiza patrones, genera reportes y predice flujo de caja.',
    result: 'MVP lanzado en 6 semanas',
    tags: ['Next.js', 'Neon DB', 'IA'],
    bg: 'linear-gradient(135deg, #060d0a 0%, #081a12 50%, #060f0a 100%)',
    accent: '#10b981',
    preview: 'FINTRACK',
  },
]

export default function Proyectos() {
  const [active, setActive] = useState(0)
  const [started, setStarted] = useState(false)
  const [animating, setAnimating] = useState(false)
  const autoRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    setTimeout(() => setStarted(true), 100)
  }, [])

  const goTo = (idx: number) => {
    if (animating) return
    setAnimating(true)
    setActive(idx)
    setTimeout(() => setAnimating(false), 600)
  }

  const prev = () => goTo((active - 1 + projects.length) % projects.length)
  const next = () => goTo((active + 1) % projects.length)

  // Auto rotate
  useEffect(() => {
    autoRef.current = setInterval(() => {
      setActive(a => (a + 1) % projects.length)
    }, 4000)
    return () => { if (autoRef.current) clearInterval(autoRef.current) }
  }, [])

  const resetAuto = () => {
    if (autoRef.current) clearInterval(autoRef.current)
    autoRef.current = setInterval(() => {
      setActive(a => (a + 1) % projects.length)
    }, 4000)
  }

  const getCardStyle = (idx: number) => {
    const total = projects.length
    let diff = idx - active
    if (diff > total / 2) diff -= total
    if (diff < -total / 2) diff += total

    const absD = Math.abs(diff)
    if (absD > 2) return { display: 'none' }

    const rotY = diff * 40
    const tz = absD === 0 ? 0 : absD === 1 ? -180 : -320
    const scale = absD === 0 ? 1 : absD === 1 ? 0.78 : 0.6
    const opacity = absD === 0 ? 1 : absD === 1 ? 0.55 : 0.25
    const zIndex = absD === 0 ? 10 : absD === 1 ? 5 : 1
    const blur = absD === 0 ? 0 : absD === 1 ? 2 : 5

    return {
      position: 'absolute' as const,
      top: '50%',
      left: '50%',
      transform: `translate(-50%, -50%) perspective(1200px) rotateY(${rotY}deg) translateZ(${tz}px) scale(${scale})`,
      opacity,
      zIndex,
      filter: `blur(${blur}px)`,
      transition: 'all 0.65s cubic-bezier(0.16,1,0.3,1)',
      cursor: absD === 0 ? 'default' : 'pointer',
      width: 'clamp(280px, 38vw, 460px)',
    }
  }

  const current = projects[active]

  return (
    <main style={{ background: '#080810', minHeight: '100vh', overflow: 'hidden' }}>

      {/* Background glow */}
      <div style={{
        position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0,
        background: `radial-gradient(ellipse 60% 50% at 50% 50%, ${current.accent}18 0%, transparent 70%)`,
        transition: 'background 0.8s',
      }} />

      {/* NAV */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: 'clamp(16px, 3vw, 22px) clamp(20px, 5vw, 48px)',
        background: 'rgba(8,8,16,0.85)', backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
      }}>
        <Link href="/" style={{
          fontFamily: "'DM Sans',sans-serif", fontSize: '13px',
          fontWeight: 500, letterSpacing: '4px',
          color: '#f0ede8', textTransform: 'uppercase', textDecoration: 'none',
        }}>
          Ō R B I T
        </Link>

        <div style={{ display: 'flex', gap: 'clamp(16px, 3vw, 32px)', alignItems: 'center' }}>
          {['Inicio', 'Servicios', 'Proyectos', 'Sobre mí', 'Contacto'].map(item => (
            <a key={item} href="#" style={{
              fontFamily: "'DM Sans',sans-serif", fontSize: '11px',
              letterSpacing: '1px', color: item === 'Proyectos' ? '#f0ede8' : 'rgba(240,237,232,0.45)',
              textDecoration: 'none', textTransform: 'uppercase',
              borderBottom: item === 'Proyectos' ? `1px solid ${current.accent}` : 'none',
              paddingBottom: '2px', transition: 'color 0.2s',
            }}
            className="nav-link-hide"
            >
              {item}
            </a>
          ))}
          <button style={{
            background: current.accent + '22',
            border: `1px solid ${current.accent}55`,
            color: '#f0ede8', fontFamily: "'DM Sans',sans-serif",
            fontSize: '11px', letterSpacing: '1px',
            padding: '10px 20px', cursor: 'pointer',
            borderRadius: '100px', transition: 'all 0.3s',
            display: 'flex', alignItems: 'center', gap: '6px',
          }}>
            Hablemos ↗
          </button>
        </div>
      </nav>

      {/* HEADER */}
      <div style={{
        paddingTop: 'clamp(100px, 14vw, 140px)',
        textAlign: 'center', position: 'relative', zIndex: 1,
      }}>
        <div style={{
          fontFamily: "'DM Sans',sans-serif", fontSize: '10px',
          letterSpacing: '4px', textTransform: 'uppercase',
          color: current.accent, marginBottom: '12px',
          opacity: started ? 1 : 0, transition: 'opacity 0.8s, color 0.8s',
        }}>
          PROYECTOS
        </div>
        <h1 style={{
          fontFamily: "'Cormorant Garamond',serif",
          fontSize: 'clamp(36px, 6vw, 72px)',
          fontWeight: 400, letterSpacing: '-1.5px',
          color: '#f0ede8', lineHeight: 1,
          opacity: started ? 1 : 0,
          transform: started ? 'translateY(0)' : 'translateY(20px)',
          transition: 'opacity 0.9s 0.1s, transform 0.9s 0.1s',
        }}>
          Explora mis proyectos
        </h1>
        <p style={{
          fontFamily: "'DM Sans',sans-serif", fontSize: '14px',
          color: 'rgba(240,237,232,0.4)', marginTop: '12px',
          opacity: started ? 1 : 0, transition: 'opacity 0.9s 0.2s',
        }}>
          Soluciones digitales que generan resultados.
        </p>
      </div>

      {/* CAROUSEL */}
      <div style={{
        position: 'relative', height: 'clamp(440px, 55vw, 620px)',
        marginTop: 'clamp(20px, 4vw, 40px)',
        zIndex: 1,
      }}>
        {/* Cards */}
        {projects.map((p, i) => {
          const cardStyle = getCardStyle(i)
          if (cardStyle.display === 'none') return null
          const isActive = i === active
          return (
            <div
              key={p.id}
              style={cardStyle}
              onClick={() => { if (!isActive) { goTo(i); resetAuto() } }}
            >
              <div style={{
                background: '#0d0d1a',
                border: `1px solid ${isActive ? p.accent + '40' : 'rgba(255,255,255,0.06)'}`,
                borderRadius: '16px',
                overflow: 'hidden',
                boxShadow: isActive ? `0 0 60px ${p.accent}20, 0 40px 80px rgba(0,0,0,0.6)` : '0 20px 40px rgba(0,0,0,0.4)',
                transition: 'box-shadow 0.65s, border-color 0.65s',
              }}>
                {/* Preview mockup */}
                <div style={{
                  height: 'clamp(180px, 22vw, 280px)',
                  background: p.bg,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  position: 'relative', overflow: 'hidden',
                }}>
                  <div style={{
                    position: 'absolute', inset: 0,
                    background: `radial-gradient(ellipse at 60% 30%, ${p.accent}25, transparent 65%)`,
                  }} />
                  {/* Fake browser bar */}
                  <div style={{
                    position: 'absolute', top: 0, left: 0, right: 0,
                    height: '32px', background: 'rgba(0,0,0,0.4)',
                    display: 'flex', alignItems: 'center', padding: '0 12px', gap: '6px',
                    borderBottom: '1px solid rgba(255,255,255,0.05)',
                  }}>
                    {['#ff5f57','#febc2e','#28c840'].map(c => (
                      <div key={c} style={{ width: '8px', height: '8px', borderRadius: '50%', background: c }} />
                    ))}
                    <div style={{
                      flex: 1, height: '16px', background: 'rgba(255,255,255,0.06)',
                      borderRadius: '4px', marginLeft: '8px',
                    }} />
                  </div>
                  <span style={{
                    fontFamily: "'Cormorant Garamond',serif",
                    fontSize: 'clamp(28px, 5vw, 48px)',
                    fontWeight: 300, letterSpacing: '-1px',
                    color: 'rgba(240,237,232,0.7)',
                    marginTop: '16px',
                  }}>
                    {p.preview}
                  </span>
                </div>

                {/* Info */}
                <div style={{ padding: 'clamp(16px, 2.5vw, 24px)' }}>
                  <div style={{
                    display: 'inline-block',
                    fontFamily: "'DM Sans',sans-serif", fontSize: '9px',
                    letterSpacing: '2px', textTransform: 'uppercase',
                    color: p.accent, border: `1px solid ${p.accent}40`,
                    padding: '3px 10px', borderRadius: '100px',
                    marginBottom: '10px',
                  }}>
                    {p.category}
                  </div>
                  <div style={{
                    fontFamily: "'Cormorant Garamond',serif",
                    fontSize: 'clamp(20px, 2.5vw, 28px)',
                    fontWeight: 300, color: '#f0ede8',
                    letterSpacing: '-0.5px', lineHeight: 1.1,
                    marginBottom: '8px',
                  }}>
                    {p.name}
                  </div>
                  <p style={{
                    fontFamily: "'DM Sans',sans-serif", fontSize: '12px',
                    color: 'rgba(240,237,232,0.4)', lineHeight: 1.65,
                    marginBottom: '14px',
                    display: isActive ? 'block' : 'none',
                  }}>
                    {p.desc}
                  </p>
                  <div style={{
                    display: 'flex', flexWrap: 'wrap', gap: '6px',
                    marginBottom: '16px',
                  }}>
                    {p.tags.map(t => (
                      <span key={t} style={{
                        fontFamily: "'DM Sans',sans-serif", fontSize: '9px',
                        letterSpacing: '1px', color: 'rgba(240,237,232,0.35)',
                        border: '1px solid rgba(255,255,255,0.08)',
                        padding: '3px 8px',
                      }}>
                        {t}
                      </span>
                    ))}
                  </div>
                  {isActive && (
                    <button style={{
                      display: 'inline-flex', alignItems: 'center', gap: '8px',
                      background: 'rgba(240,237,232,0.06)',
                      border: '1px solid rgba(240,237,232,0.12)',
                      color: '#f0ede8', fontFamily: "'DM Sans',sans-serif",
                      fontSize: '11px', letterSpacing: '0.5px',
                      padding: '10px 20px', cursor: 'pointer', borderRadius: '100px',
                    }}>
                      Ver proyecto →
                    </button>
                  )}
                </div>
              </div>
            </div>
          )
        })}

        {/* Arrows */}
        {(['prev', 'next'] as const).map(dir => (
          <button
            key={dir}
            onClick={() => { dir === 'prev' ? prev() : next(); resetAuto() }}
            style={{
              position: 'absolute', top: '50%',
              [dir === 'prev' ? 'left' : 'right']: 'clamp(12px, 3vw, 40px)',
              transform: 'translateY(-50%)',
              width: '44px', height: '44px', borderRadius: '50%',
              background: 'rgba(240,237,232,0.06)',
              border: '1px solid rgba(240,237,232,0.1)',
              color: '#f0ede8', fontSize: '16px',
              cursor: 'pointer', zIndex: 20,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'background 0.2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.background = 'rgba(240,237,232,0.12)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'rgba(240,237,232,0.06)')}
          >
            {dir === 'prev' ? '←' : '→'}
          </button>
        ))}
      </div>

      {/* Dots */}
      <div style={{
        display: 'flex', justifyContent: 'center', gap: '10px',
        marginTop: 'clamp(16px, 3vw, 24px)', position: 'relative', zIndex: 1,
      }}>
        {projects.map((p, i) => (
          <button
            key={i}
            onClick={() => { goTo(i); resetAuto() }}
            style={{
              width: i === active ? '24px' : '8px', height: '8px',
              borderRadius: '100px',
              background: i === active ? current.accent : 'rgba(240,237,232,0.15)',
              border: 'none', cursor: 'pointer', padding: 0,
              transition: 'all 0.4s cubic-bezier(0.16,1,0.3,1)',
            }}
          />
        ))}
      </div>

      {/* Result highlight */}
      <div style={{
        textAlign: 'center', marginTop: 'clamp(20px, 3vw, 32px)',
        position: 'relative', zIndex: 1,
        opacity: started ? 1 : 0, transition: 'opacity 0.6s',
      }}>
        <span style={{
          fontFamily: "'DM Sans',sans-serif", fontSize: '12px',
          color: current.accent, letterSpacing: '1px',
          transition: 'color 0.8s',
        }}>
          ↑ {current.result}
        </span>
      </div>

      {/* Bottom features */}
      <div style={{
        display: 'grid', marginTop: 'clamp(40px, 6vw, 80px)',
        borderTop: '1px solid rgba(255,255,255,0.05)',
        position: 'relative', zIndex: 1,
      }} className="features-grid">
        {[
          { icon: '◈', title: 'Diseño Premium', desc: 'Experiencias visuales modernas que conectan con tu audiencia.' },
          { icon: '⬡', title: 'Tecnología Avanzada', desc: 'Desarrollo con las mejores herramientas y prácticas del mercado.' },
          { icon: '↗', title: 'Resultados Reales', desc: 'Sitios web que convierten y hacen crecer tu negocio.' },
        ].map((f, i) => (
          <div key={i} style={{
            padding: 'clamp(24px, 4vw, 40px) clamp(20px, 4vw, 40px)',
            borderRight: i < 2 ? '1px solid rgba(255,255,255,0.05)' : 'none',
            display: 'flex', gap: '16px', alignItems: 'flex-start',
          }}>
            <span style={{ fontSize: '20px', color: current.accent, transition: 'color 0.8s', flexShrink: 0 }}>{f.icon}</span>
            <div>
              <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '13px', fontWeight: 500, color: '#f0ede8', marginBottom: '6px' }}>{f.title}</div>
              <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '12px', color: 'rgba(240,237,232,0.35)', lineHeight: 1.65 }}>{f.desc}</div>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap');
        body { background: #080810 !important; margin: 0; }
        * { box-sizing: border-box; }
        .features-grid { grid-template-columns: repeat(3,1fr); }
        @media (max-width: 768px) {
          .features-grid { grid-template-columns: 1fr; }
          .features-grid > div { border-right: none !important; border-bottom: 1px solid rgba(255,255,255,0.05); }
          .nav-link-hide { display: none; }
        }
      `}</style>
    </main>
  )
}
