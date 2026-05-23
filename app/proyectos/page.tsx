'use client'
import { useEffect, useRef, useState, useCallback } from 'react'
import Link from 'next/link'

const projects = [
  { name:'Clínica Estética Lumina', category:'Clínica Estética', desc:'Plataforma con agendamiento automático, CRM integrado y chatbot IA que califica prospectos.', result:'↑ +280% agendamientos en 60 días', tags:['Next.js','TypeScript','Vercel'], headline:'Eleva tu belleza,\ntransforma tu confianza.', logo:'LUMINA', url:'lumina.mx', bg:'linear-gradient(160deg,#0a0612,#140820,#0c0a18)', overlay:'rgba(160,100,255,0.07)' },
  { name:'Apex Gym Premium', category:'Fitness & Wellness', desc:'Landing de alto impacto con WhatsApp IA para seguimiento automático y cobro de membresías.', result:'↑ +190% conversión de leads', tags:['Next.js','WhatsApp API','Stripe'], headline:'Entrena tu cuerpo,\nfortalece tu mente.', logo:'APEX', url:'apexgym.mx', bg:'linear-gradient(160deg,#060a06,#0a160a,#060c06)', overlay:'rgba(80,180,80,0.07)' },
  { name:'VELENÉ Athleisure', category:'E-Commerce · Moda', desc:'Ecommerce premium con drops limitados, carrito persistente y dashboard de operaciones.', result:'↑ Lanzamiento exitoso · Drops agotados', tags:['Next.js','Stripe','Neon DB'], headline:'Nueva colección\nOversized.', logo:'VELENÉ', url:'velene.mx', bg:'linear-gradient(160deg,#0c0a06,#1a1208,#100e08)', overlay:'rgba(200,150,60,0.07)' },
  { name:'Nexo Propiedades', category:'Real Estate', desc:'Portal inmobiliario con agente IA que califica compradores y agenda visitas automáticamente.', result:'↑ +420% consultas calificadas', tags:['Next.js','IA Agent','CRM'], headline:'Invierte en\ntu futuro.', logo:'NEXO', url:'nexoprop.mx', bg:'linear-gradient(160deg,#060810,#080c1a,#060a10)', overlay:'rgba(80,120,220,0.07)' },
  { name:'Restaurante Marea', category:'Hospitalidad', desc:'Sitio premium con reservaciones online, menú digital interactivo y SEO local optimizado.', result:'↑ +160% reservaciones online', tags:['Next.js','Booking','SEO'], headline:'Alta cocina,\nexperiencia única.', logo:'MAREA', url:'marea.mx', bg:'linear-gradient(160deg,#0e0806,#1a0e08,#120a06)', overlay:'rgba(200,80,60,0.07)' },
  { name:'FinTrack SaaS', category:'SaaS · Fintech', desc:'Plataforma SaaS con agente IA que analiza patrones, genera reportes y predice flujo de caja.', result:'↑ MVP lanzado en 6 semanas', tags:['Next.js','Neon DB','IA Agent'], headline:'Controla tus\nfinanzas con IA.', logo:'FINTRACK', url:'fintrack.io', bg:'linear-gradient(160deg,#060e0a,#081a10,#060e0a)', overlay:'rgba(60,180,120,0.07)' },
]

const N = projects.length
const RADIUS = 600
const CARD_W = 440

export default function Proyectos() {
  const [active, setActive] = useState(0)
  const [animating, setAnimating] = useState(false)
  const [started, setStarted] = useState(false)
  const autoRef = useRef<NodeJS.Timeout | null>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => { setTimeout(() => setStarted(true), 100) }, [])

  const goTo = useCallback((idx: number) => {
    if (animating) return
    setAnimating(true)
    setActive(((idx % N) + N) % N)
    setTimeout(() => setAnimating(false), 800)
  }, [animating])

  const resetAuto = useCallback(() => {
    if (autoRef.current) clearInterval(autoRef.current)
    autoRef.current = setInterval(() => setActive(a => (a + 1) % N), 4500)
  }, [])

  useEffect(() => {
    resetAuto()
    return () => { if (autoRef.current) clearInterval(autoRef.current) }
  }, [resetAuto])

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') { goTo(active - 1); resetAuto() }
      if (e.key === 'ArrowRight') { goTo(active + 1); resetAuto() }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [active, goTo, resetAuto])

  // Touch swipe
  useEffect(() => {
    let tx0 = 0
    const onStart = (e: TouchEvent) => { tx0 = e.touches[0].clientX }
    const onEnd = (e: TouchEvent) => {
      const dx = e.changedTouches[0].clientX - tx0
      if (Math.abs(dx) > 50) { dx < 0 ? goTo(active + 1) : goTo(active - 1); resetAuto() }
    }
    window.addEventListener('touchstart', onStart, { passive: true })
    window.addEventListener('touchend', onEnd, { passive: true })
    return () => { window.removeEventListener('touchstart', onStart); window.removeEventListener('touchend', onEnd) }
  }, [active, goTo, resetAuto])

  const baseAngle = -(360 / N) * active

  return (
    <main style={{ background: '#090909', minHeight: '100vh', overflowX: 'hidden' }}>

      {/* NAV */}
      <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '24px clamp(20px,5vw,56px)', background: 'rgba(9,9,9,0.92)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(240,237,232,0.05)' }}>
        <Link href="/" style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '12px', fontWeight: 500, letterSpacing: '5px', color: '#f0ede8', textTransform: 'uppercase', textDecoration: 'none' }}>
          Ō R B I T
        </Link>
        <Link href="/" style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '10px', letterSpacing: '2px', color: '#b8b4ac', textDecoration: 'none', textTransform: 'uppercase' }}>
          ← Volver
        </Link>
      </nav>

      {/* HEADER */}
      <div style={{ padding: 'clamp(110px,14vw,150px) clamp(20px,5vw,56px) clamp(40px,5vw,60px)', borderBottom: '1px solid rgba(240,237,232,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', opacity: started ? 1 : 0, transform: started ? 'translateY(0)' : 'translateY(20px)', transition: 'opacity .8s, transform .8s' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', fontFamily: "'DM Sans',sans-serif", fontSize: '10px', letterSpacing: '3px', color: '#b8b4ac', textTransform: 'uppercase', marginBottom: '24px' }}>
            <span style={{ display: 'block', width: '36px', height: '1px', background: '#b8b4ac' }} />
            03 · Portafolio
          </div>
          <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(48px,7vw,88px)', fontWeight: 300, letterSpacing: '-2px', lineHeight: .93, color: '#f0ede8' }}>
            Sistemas que ya<br /><em style={{ fontStyle: 'italic', color: '#b8b4ac' }}>generan resultados.</em>
          </h1>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(60px,8vw,100px)', fontWeight: 300, color: 'rgba(240,237,232,0.05)', letterSpacing: '-4px', lineHeight: 1 }}>
            {String(active + 1).padStart(2, '0')}
          </div>
          <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '11px', color: '#4a4744', letterSpacing: '1px', marginTop: '6px' }}>
            de 0{N} proyectos
          </div>
        </div>
      </div>

      {/* STAGE */}
      <div style={{ position: 'relative', height: 'clamp(500px,58vw,640px)', overflow: 'hidden' }}>
        {/* Edge fades */}
        <div style={{ position: 'absolute', top: 0, bottom: 0, left: 0, width: '22%', background: 'linear-gradient(90deg,#090909,transparent)', zIndex: 20, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: 0, bottom: 0, right: 0, width: '22%', background: 'linear-gradient(270deg,#090909,transparent)', zIndex: 20, pointerEvents: 'none' }} />

        {/* Cylinder */}
        <div ref={trackRef} style={{ position: 'absolute', top: '50%', left: '50%', transformStyle: 'preserve-3d', transform: `translate(-50%,-50%) rotateY(${baseAngle}deg)`, transition: 'transform .75s cubic-bezier(0.16,1,0.3,1)' }}>
          {projects.map((p, i) => {
            const angle = (360 / N) * i
            let diff = i - active
            if (diff > N / 2) diff -= N
            if (diff < -N / 2) diff += N
            const absD = Math.abs(diff)
            const opacity = absD === 0 ? 1 : absD === 1 ? 0.45 : 0.18
            const blur = absD === 0 ? 0 : absD === 1 ? 2 : 5
            const isActive = absD === 0

            return (
              <div
                key={i}
                onClick={() => { if (!isActive) { goTo(i); resetAuto() } }}
                style={{
                  position: 'absolute', top: 0, left: 0,
                  width: `${CARD_W}px`,
                  marginLeft: `-${CARD_W / 2}px`,
                  marginTop: '-230px',
                  transform: `rotateY(${angle}deg) translateZ(${RADIUS}px)`,
                  opacity, filter: `blur(${blur}px)`,
                  transition: 'opacity .5s, filter .5s',
                  cursor: isActive ? 'default' : 'pointer',
                  pointerEvents: absD > 2 ? 'none' : 'auto',
                  backfaceVisibility: 'hidden',
                }}
              >
                {/* Browser mockup */}
                <div style={{ background: '#101010', borderRadius: '14px', overflow: 'hidden', border: `1px solid ${isActive ? 'rgba(240,237,232,0.1)' : 'rgba(240,237,232,0.04)'}`, boxShadow: isActive ? '0 40px 100px rgba(0,0,0,0.8)' : '0 20px 40px rgba(0,0,0,0.5)', transition: 'box-shadow .5s, border-color .5s' }}>
                  {/* Topbar */}
                  <div style={{ background: '#1c1c1c', height: '34px', display: 'flex', alignItems: 'center', padding: '0 14px', gap: '7px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    {['#ff5f57','#febc2e','#28c840'].map(c => <div key={c} style={{ width: '10px', height: '10px', borderRadius: '50%', background: c }} />)}
                    <div style={{ flex: 1, height: '18px', background: 'rgba(255,255,255,0.05)', borderRadius: '100px', margin: '0 10px', display: 'flex', alignItems: 'center', padding: '0 10px', fontFamily: "'DM Sans',sans-serif", fontSize: '9px', color: 'rgba(255,255,255,0.2)', letterSpacing: '.5px' }}>
                      {p.url}
                    </div>
                  </div>
                  {/* Screen */}
                  <div style={{ height: '260px', background: p.bg, position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                    <div style={{ position: 'absolute', inset: 0, background: p.overlay }} />
                    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '34px', background: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 14px', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                      <span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '12px', fontWeight: 300, color: 'rgba(240,237,232,0.75)', letterSpacing: '2px' }}>{p.logo}</span>
                      <div style={{ display: 'flex', gap: '10px' }}>
                        {[0,1,2].map(j => <div key={j} style={{ width: '20px', height: '3px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px' }} />)}
                      </div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', padding: '14px', textAlign: 'center', marginTop: '16px', position: 'relative' }}>
                      <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '22px', fontWeight: 300, letterSpacing: '-0.5px', color: 'rgba(240,237,232,0.88)', lineHeight: 1.1 }}>
                        {p.headline.split('\n').map((l, j) => <span key={j}>{l}{j < p.headline.split('\n').length - 1 && <br />}</span>)}
                      </div>
                      <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '9px', color: 'rgba(240,237,232,0.28)', letterSpacing: '1px' }}>Descubre más</div>
                      <div style={{ background: 'rgba(240,237,232,0.08)', border: '1px solid rgba(240,237,232,0.12)', color: 'rgba(240,237,232,0.6)', fontFamily: "'DM Sans',sans-serif", fontSize: '8px', padding: '5px 14px', borderRadius: '100px', letterSpacing: '1px' }}>Ver más</div>
                    </div>
                    <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1px', background: 'rgba(255,255,255,0.03)' }}>
                      {[0,1,2].map(j => <div key={j} style={{ height: '36px', background: 'rgba(255,255,255,0.015)' }} />)}
                    </div>
                  </div>
                  {/* Meta */}
                  <div style={{ padding: '20px', borderTop: '1px solid rgba(240,237,232,0.05)', background: '#0d0d0d' }}>
                    <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '9px', letterSpacing: '2px', textTransform: 'uppercase', color: '#4a4744', marginBottom: '6px' }}>{p.category}</div>
                    <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '22px', fontWeight: 300, letterSpacing: '-0.5px', color: '#f0ede8', lineHeight: 1.1, marginBottom: '8px' }}>{p.name}</div>
                    {isActive && <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '11px', color: '#4a4744', lineHeight: 1.7, marginBottom: '10px' }}>{p.desc}</div>}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', marginBottom: isActive ? '10px' : '0' }}>
                      {p.tags.map(t => <span key={t} style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '8px', letterSpacing: '1.5px', color: '#4a4744', textTransform: 'uppercase', border: '1px solid rgba(240,237,232,0.06)', padding: '3px 7px' }}>{t}</span>)}
                    </div>
                    {isActive && <>
                      <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '11px', color: '#b8b4ac', marginBottom: '12px' }}>{p.result}</div>
                      <button style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(240,237,232,0.06)', border: '1px solid rgba(240,237,232,0.1)', color: '#f0ede8', fontFamily: "'DM Sans',sans-serif", fontSize: '10px', padding: '9px 18px', borderRadius: '100px', cursor: 'pointer', transition: 'background .2s' }}>Ver proyecto →</button>
                    </>}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* CONTROLS */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 'clamp(16px,3vw,32px)', padding: 'clamp(20px,3vw,36px) 0' }}>
        <button onClick={() => { goTo(active - 1); resetAuto() }} style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'transparent', border: '1px solid rgba(240,237,232,0.1)', color: '#f0ede8', fontSize: '16px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all .3s' }}>←</button>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          {projects.map((_, i) => (
            <button key={i} onClick={() => { goTo(i); resetAuto() }} style={{ height: '6px', width: i === active ? '24px' : '6px', borderRadius: '100px', border: 'none', padding: 0, background: i === active ? '#f0ede8' : 'rgba(240,237,232,0.15)', cursor: 'pointer', transition: 'all .5s cubic-bezier(0.16,1,0.3,1)' }} />
          ))}
        </div>
        <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '18px', fontWeight: 300, color: '#4a4744', letterSpacing: '1px', minWidth: '60px', textAlign: 'center' }}>
          {String(active + 1).padStart(2, '0')} / 0{N}
        </div>
        <button onClick={() => { goTo(active + 1); resetAuto() }} style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'transparent', border: '1px solid rgba(240,237,232,0.1)', color: '#f0ede8', fontSize: '16px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all .3s' }}>→</button>
      </div>

      {/* STATS */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', borderTop: '1px solid rgba(240,237,232,0.05)' }}>
        {[['+ 6','Proyectos entregados'],['3.2×','ROI promedio 90 días'],['72h','Primer prototipo'],['100%','En producción']].map(([num, label]) => (
          <div key={label} style={{ padding: 'clamp(24px,4vw,40px)', borderRight: '1px solid rgba(240,237,232,0.05)' }}>
            <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(36px,5vw,52px)', fontWeight: 300, letterSpacing: '-2px', color: '#f0ede8', lineHeight: 1, marginBottom: '6px' }}>{num}</div>
            <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '10px', letterSpacing: '2px', color: '#4a4744', textTransform: 'uppercase' }}>{label}</div>
          </div>
        ))}
      </div>

      <footer style={{ padding: '32px clamp(20px,5vw,56px)', borderTop: '1px solid rgba(240,237,232,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '11px', letterSpacing: '5px', textTransform: 'uppercase', color: '#b8b4ac' }}>Ō R B I T</div>
        <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '10px', color: '#2a2826', letterSpacing: '1px' }}>© 2025 ŌRBIT.</div>
      </footer>

      <style>{`
        @media(max-width:768px){
          nav ul{display:none!important;}
        }
      `}</style>
    </main>
  )
}
