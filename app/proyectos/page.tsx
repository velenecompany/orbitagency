'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'

const s = { black:'#090909', white:'#f0ede8', white2:'#b8b4ac', gray:'#4a4744', gray2:'#2a2826' }

export default function Proyectos() {
  const [started, setStarted] = useState(false)
  useEffect(() => { setTimeout(() => setStarted(true), 100) }, [])

  const rv = (delay = 0) => ({
    opacity: started ? 1 : 0,
    transform: started ? 'translateY(0)' : 'translateY(32px)',
    transition: `opacity .95s ${delay}s cubic-bezier(0.16,1,0.3,1), transform .95s ${delay}s cubic-bezier(0.16,1,0.3,1)`,
  })

  const features = [
    'Sistema de membresías Pace / Drive / Apex por gasto acumulado con descuentos automáticos',
    'Integración Stripe Checkout con webhooks para órdenes y upgrades de tier automáticos',
    'Drops limitados con página de colecciones, cuenta de cliente y página de fundadores',
    'Dashboard interno de operaciones, programa de distribuidores y portal de socios',
    'Chatbot IA integrado para atención al cliente y resolución de dudas en tiempo real',
  ]

  return (
    <main style={{ background: s.black, minHeight: '100vh', overflowX: 'hidden' }}>

      {/* NAV */}
      <nav style={{ position:'fixed', top:0, left:0, right:0, zIndex:200, display:'flex', alignItems:'center', justifyContent:'space-between', padding:'clamp(16px,3vw,24px) clamp(20px,5vw,56px)', background:'rgba(9,9,9,0.92)', backdropFilter:'blur(20px)', borderBottom:'1px solid rgba(240,237,232,0.05)' }}>
        <Link href="/" style={{ fontFamily:"'DM Sans',sans-serif", fontSize:'12px', fontWeight:500, letterSpacing:'5px', color:s.white, textTransform:'uppercase', textDecoration:'none' }}>V A N T</Link>
        <Link href="/" style={{ fontFamily:"'DM Sans',sans-serif", fontSize:'10px', letterSpacing:'2px', color:s.white2, textDecoration:'none', textTransform:'uppercase' }}>← Volver</Link>
      </nav>

      {/* HEADER */}
      <div style={{ padding:'clamp(110px,14vw,150px) clamp(20px,5vw,56px) clamp(32px,4vw,48px)', borderBottom:'1px solid rgba(240,237,232,0.05)' }}>
        <div style={{ ...rv(0), display:'flex', alignItems:'center', gap:'14px', fontFamily:"'DM Sans',sans-serif", fontSize:'10px', letterSpacing:'3px', color:s.white2, textTransform:'uppercase', marginBottom:'24px' }}>
          <span style={{ display:'block', width:'36px', height:'1px', background:s.white2, flexShrink:0 }} />
          01 · Proyecto destacado
        </div>
        <h1 style={{ ...rv(.1), fontFamily:"'Cormorant Garamond',serif", fontSize:'clamp(48px,7vw,88px)', fontWeight:300, letterSpacing:'-2px', lineHeight:.93, color:s.white }}>
          Nuestro trabajo<br /><em style={{ fontStyle:'italic', color:s.white2 }}>en acción.</em>
        </h1>
      </div>

      {/* PROYECTO */}
      <div className="proj-grid">

        {/* IMAGEN */}
        <div style={{ position:'relative', overflow:'hidden', background:'linear-gradient(160deg,#0c0a06,#1a1208)', minHeight:'clamp(300px,50vw,600px)', ...rv(.2) }}>
          <img
            src="https://velene.vercel.app/velene-preview.png"
            alt="VELENÉ"
            style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover', opacity:.88 }}
          />
          <div style={{ position:'absolute', inset:0, background:'linear-gradient(90deg, transparent 50%, #090909 100%)' }} className="fade-right" />
          <div style={{ position:'absolute', inset:0, background:'linear-gradient(0deg, #090909 0%, transparent 30%)' }} />
          <div style={{ position:'absolute', bottom:'24px', left:'24px', display:'flex', gap:'8px', flexWrap:'wrap' }}>
            {['Next.js','Stripe','Neon DB','TypeScript'].map(t => (
              <span key={t} style={{ fontFamily:"'DM Sans',sans-serif", fontSize:'9px', letterSpacing:'1.5px', color:s.white2, textTransform:'uppercase', border:'1px solid rgba(240,237,232,0.1)', padding:'4px 10px' }}>{t}</span>
            ))}
          </div>
        </div>

        {/* DESCRIPCIÓN */}
        <div style={{ padding:'clamp(32px,5vw,56px)', borderLeft:'1px solid rgba(240,237,232,0.05)', display:'flex', flexDirection:'column', justifyContent:'space-between', ...rv(.3) }}>
          <div>
            <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:'10px', letterSpacing:'3px', color:s.gray, textTransform:'uppercase', marginBottom:'12px' }}>E-Commerce · Moda Premium</div>
            <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'clamp(36px,5vw,56px)', fontWeight:300, letterSpacing:'-1.5px', lineHeight:.93, color:s.white, marginBottom:'20px' }}>
              VELENÉ<br /><em style={{ fontStyle:'italic', color:s.white2 }}>Athleisure</em>
            </h2>
            <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:'clamp(12px,1.3vw,14px)', color:s.gray, lineHeight:1.85, marginBottom:'28px', fontWeight:300 }}>
              Plataforma e-commerce premium construida desde cero con Next.js 14, TypeScript y PostgreSQL. Sistema de drops limitados, carrito persistente, membresías por gasto acumulado y dashboard de operaciones interno.
            </p>

            <div style={{ display:'flex', flexDirection:'column', marginBottom:'24px' }}>
              {features.map((f, i) => (
                <div key={i} style={{ display:'flex', alignItems:'flex-start', gap:'12px', padding:'12px 0', borderTop:'1px solid rgba(240,237,232,0.05)' }}>
                  <span style={{ color:s.white2, fontSize:'12px', marginTop:'2px', flexShrink:0 }}>✓</span>
                  <span style={{ fontFamily:"'DM Sans',sans-serif", fontSize:'12px', color:s.white2, lineHeight:1.6 }}>{f}</span>
                </div>
              ))}
              <div style={{ borderBottom:'1px solid rgba(240,237,232,0.05)' }} />
            </div>

            <div style={{ display:'flex', alignItems:'center', gap:'12px', padding:'16px 0', borderTop:'1px solid rgba(240,237,232,0.05)' }}>
              <span style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'28px', fontWeight:300, color:s.white }}>↑</span>
              <div>
                <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:'12px', color:s.white, fontWeight:500 }}>Lanzamiento exitoso · Drops agotados</div>
                <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:'10px', color:s.gray, letterSpacing:'1px', marginTop:'2px' }}>velene.club</div>
              </div>
            </div>
          </div>

          <div style={{ display:'flex', gap:'10px', marginTop:'32px' }}>
            <a href="https://velene.club" target="_blank" rel="noopener noreferrer" style={{ display:'inline-flex', alignItems:'center', gap:'8px', background:'rgba(240,237,232,0.08)', border:'1px solid rgba(240,237,232,0.12)', color:s.white, fontFamily:"'DM Sans',sans-serif", fontSize:'11px', letterSpacing:'1px', padding:'12px 24px', borderRadius:'100px', textDecoration:'none', transition:'background .2s' }}
            onMouseEnter={e=>(e.currentTarget.style.background='rgba(240,237,232,0.15)')}
            onMouseLeave={e=>(e.currentTarget.style.background='rgba(240,237,232,0.08)')}
            >Ver proyecto →</a>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div style={{ padding:'32px clamp(20px,5vw,56px)', borderTop:'1px solid rgba(240,237,232,0.05)', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
        <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:'11px', letterSpacing:'5px', textTransform:'uppercase', color:s.white2 }}>V A N T</div>
        <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:'10px', color:s.gray2, letterSpacing:'1px' }}>01 / 01</div>
      </div>

      <style>{`
        .proj-grid { display: grid; grid-template-columns: 1fr 1fr; min-height: 600px; border-top: 1px solid rgba(240,237,232,0.05); }
        .fade-right { display: block; }
        @media(max-width: 768px) {
          .proj-grid { grid-template-columns: 1fr !important; }
          .fade-right { display: none !important; }
        }
      `}</style>
    </main>
  )
}
