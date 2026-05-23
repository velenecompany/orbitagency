'use client'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

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

const s = { black:'#090909', white:'#f0ede8', white2:'#b8b4ac', gray:'#4a4744', gray2:'#2a2826' }

const rv = (visible: boolean, delay = 0, dir: 'up'|'left'|'right' = 'up') => ({
  opacity: visible ? 1 : 0,
  transform: visible ? 'translate(0,0)' : dir==='up' ? 'translateY(40px)' : dir==='left' ? 'translateX(-40px)' : 'translateX(40px)',
  transition: `opacity .95s ${delay}s cubic-bezier(0.16,1,0.3,1), transform .95s ${delay}s cubic-bezier(0.16,1,0.3,1)`,
})

function FeatureRow({ text }: { text: string }) {
  return (
    <div style={{ display:'flex', alignItems:'center', gap:'14px', padding:'12px 0', borderTop:'1px solid rgba(240,237,232,0.05)' }}>
      <div style={{ width:'4px', height:'4px', background:s.white2, borderRadius:'50%', flexShrink:0 }} />
      <span style={{ fontFamily:"'DM Sans',sans-serif", fontSize:'12px', color:s.white2 }}>{text}</span>
    </div>
  )
}

export default function Servicios() {
  const [started, setStarted] = useState(false)
  const [bars, setBars] = useState([30,50,40,70,55,80,65,90,75,100])
  const hero = useReveal()
  const s1 = useReveal()
  const s2 = useReveal()
  const s3 = useReveal()
  const s4 = useReveal()
  const stmt = useReveal()
  const cta = useReveal()

  useEffect(() => { setTimeout(() => setStarted(true), 100) }, [])
  useEffect(() => {
    const t = setInterval(() => setBars(Array.from({length:10}, () => Math.round(30+Math.random()*70))), 2000)
    return () => clearInterval(t)
  }, [])

  const NAV = (
    <nav style={{ position:'fixed', top:0, left:0, right:0, zIndex:200, display:'flex', alignItems:'center', justifyContent:'space-between', padding:'clamp(16px,3vw,24px) clamp(20px,5vw,56px)', background:'rgba(9,9,9,0.92)', backdropFilter:'blur(20px)', borderBottom:'1px solid rgba(240,237,232,0.05)' }}>
      <Link href="/" style={{ fontFamily:"'DM Sans',sans-serif", fontSize:'12px', fontWeight:500, letterSpacing:'5px', color:s.white, textTransform:'uppercase', textDecoration:'none' }}>Ō R B I T</Link>
      <Link href="/" style={{ fontFamily:"'DM Sans',sans-serif", fontSize:'10px', letterSpacing:'2px', color:s.white2, textDecoration:'none', textTransform:'uppercase' }}>← Volver</Link>
    </nav>
  )

  return (
    <main style={{ background:s.black, minHeight:'100vh', overflowX:'hidden' }}>
      {NAV}

      {/* HERO */}
      <div ref={hero.ref} style={{ minHeight:'100vh', display:'flex', flexDirection:'column', justifyContent:'flex-end', padding:'clamp(100px,14vw,140px) clamp(20px,5vw,56px) clamp(40px,6vw,80px)', borderBottom:'1px solid rgba(240,237,232,0.05)', position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', top:'clamp(100px,14vw,140px)', right:'clamp(20px,5vw,56px)', fontFamily:"'Cormorant Garamond',serif", fontSize:'clamp(120px,18vw,220px)', fontWeight:300, color:'rgba(240,237,232,0.03)', letterSpacing:'-8px', lineHeight:1, pointerEvents:'none' }}>04</div>
        <div style={{ ...rv(hero.visible), display:'flex', alignItems:'center', gap:'14px', fontFamily:"'DM Sans',sans-serif", fontSize:'10px', letterSpacing:'3px', color:s.white2, textTransform:'uppercase', marginBottom:'32px' }}>
          <span style={{ display:'block', width:'36px', height:'1px', background:s.white2 }} />04 · Servicios
        </div>
        <h1 style={{ ...rv(hero.visible,.15), fontFamily:"'Cormorant Garamond',serif", fontSize:'clamp(52px,8vw,110px)', fontWeight:300, letterSpacing:'-3px', lineHeight:.9, color:s.white, maxWidth:'900px' }}>
          Lo que<br/>construimos<br/><em style={{fontStyle:'italic',color:s.white2}}>para ti.</em>
        </h1>
        <p style={{ ...rv(hero.visible,.3), fontFamily:"'DM Sans',sans-serif", fontSize:'clamp(13px,1.5vw,15px)', color:s.gray, lineHeight:1.8, marginTop:'32px', maxWidth:'480px', fontWeight:300 }}>
          Desde estrategia hasta producción. Cada servicio está diseñado para generar resultados medibles en tu negocio.
        </p>
        <div style={{ ...rv(hero.visible,.45), display:'flex', alignItems:'center', gap:'12px', marginTop:'48px', fontFamily:"'DM Sans',sans-serif", fontSize:'10px', letterSpacing:'2px', color:s.gray, textTransform:'uppercase' }}>
          <span style={{ display:'block', width:'40px', height:'1px', background:s.gray }} />Scroll para explorar
        </div>
      </div>

      {/* S1 */}
      <div className="sgrid" style={{ borderBottom:'1px solid rgba(240,237,232,0.05)', minHeight:'100vh' }}>
        <div ref={s1.ref} style={{ padding:'clamp(60px,10vw,120px) clamp(20px,5vw,56px)', display:'flex', flexDirection:'column', justifyContent:'center' }}>
          <div style={{ ...rv(s1.visible), fontFamily:"'DM Sans',sans-serif", fontSize:'10px', letterSpacing:'3px', color:s.gray, textTransform:'uppercase', marginBottom:'32px', display:'flex', alignItems:'center', gap:'12px' }}>
            <span style={{ display:'block', width:'24px', height:'1px', background:s.gray }}/>01 · Estrategia IA
          </div>
          <h2 style={{ ...rv(s1.visible,.1), fontFamily:"'Cormorant Garamond',serif", fontSize:'clamp(44px,5.5vw,80px)', fontWeight:300, letterSpacing:'-2px', lineHeight:.95, color:s.white, marginBottom:'32px' }}>
            Auditoría y<br/><em style={{fontStyle:'italic',color:s.white2}}>roadmap</em><br/>inteligente.
          </h2>
          <p style={{ ...rv(s1.visible,.2), fontFamily:"'DM Sans',sans-serif", fontSize:'clamp(13px,1.3vw,15px)', color:s.gray, lineHeight:1.85, maxWidth:'420px', fontWeight:300, marginBottom:'40px' }}>
            Analizamos tu operación, identificamos dónde la IA genera más valor y construimos un plan con métricas de retorno reales.
          </p>
          <div style={{ ...rv(s1.visible,.25), marginBottom:'40px' }}>
            {['Auditoría completa de procesos','Identificación de oportunidades IA','Roadmap de implementación 90 días','Métricas de ROI proyectadas'].map(f=><FeatureRow key={f} text={f}/>)}
            <div style={{ borderBottom:'1px solid rgba(240,237,232,0.05)' }}/>
          </div>
          <div style={{ ...rv(s1.visible,.35), display:'inline-flex', alignItems:'center', gap:'12px' }}>
            <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'clamp(36px,4vw,56px)', fontWeight:300, letterSpacing:'-2px', color:s.white }}>3.2×</div>
            <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:'11px', color:s.gray, letterSpacing:'1px', maxWidth:'100px', lineHeight:1.4 }}>ROI promedio en primeros 90 días</div>
          </div>
        </div>
        <div style={{ background:'linear-gradient(135deg,#080810,#0d0a18,#080810)', display:'flex', alignItems:'center', justifyContent:'center', minHeight:'400px' }}>
          <div style={{ ...rv(s1.visible,.2,'right'), width:'clamp(200px,25vw,320px)', height:'clamp(200px,25vw,320px)', borderRadius:'50%', border:'1px solid rgba(240,237,232,0.06)', display:'flex', alignItems:'center', justifyContent:'center', animation:'rotate 20s linear infinite' }}>
            <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'clamp(14px,2vw,20px)', fontWeight:300, color:s.white2, letterSpacing:'3px', textAlign:'center', animation:'rotateRev 20s linear infinite' }}>
              ESTRATEGIA<br/>&amp; IA
            </div>
          </div>
        </div>
      </div>

      {/* S2 */}
      <div className="sgrid sgrid-rev" style={{ borderBottom:'1px solid rgba(240,237,232,0.05)', minHeight:'100vh' }}>
        <div style={{ background:'linear-gradient(135deg,#080a08,#0a1008,#080a08)', display:'flex', alignItems:'center', justifyContent:'center', minHeight:'400px' }}>
          <div style={{ ...rv(s2.visible,.2,'left'), width:'clamp(240px,30vw,380px)', background:'#111', borderRadius:'12px', overflow:'hidden', border:'1px solid rgba(240,237,232,0.08)', boxShadow:'0 40px 80px rgba(0,0,0,0.6)' }}>
            <div style={{ background:'#1c1c1c', height:'32px', display:'flex', alignItems:'center', padding:'0 12px', gap:'6px', borderBottom:'1px solid rgba(255,255,255,0.05)' }}>
              {['#ff5f57','#febc2e','#28c840'].map(c=><div key={c} style={{ width:'8px', height:'8px', borderRadius:'50%', background:c }}/>)}
            </div>
            <div style={{ padding:'20px', display:'flex', flexDirection:'column', gap:'10px' }}>
              {[100,60,40].map((w,i)=><div key={i} style={{ height:'8px', background:'rgba(240,237,232,0.06)', borderRadius:'4px', width:`${w}%` }}/>)}
              <div style={{ height:'60px', background:'rgba(240,237,232,0.03)', borderRadius:'4px', marginTop:'8px' }}/>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'8px' }}>
                <div style={{ height:'40px', background:'rgba(240,237,232,0.03)', borderRadius:'4px' }}/>
                <div style={{ height:'40px', background:'rgba(240,237,232,0.03)', borderRadius:'4px' }}/>
              </div>
            </div>
          </div>
        </div>
        <div ref={s2.ref} style={{ padding:'clamp(60px,10vw,120px) clamp(20px,5vw,56px)', display:'flex', flexDirection:'column', justifyContent:'center' }}>
          <div style={{ ...rv(s2.visible), fontFamily:"'DM Sans',sans-serif", fontSize:'10px', letterSpacing:'3px', color:s.gray, textTransform:'uppercase', marginBottom:'32px', display:'flex', alignItems:'center', gap:'12px' }}>
            <span style={{ display:'block', width:'24px', height:'1px', background:s.gray }}/>02 · Web & Marketing
          </div>
          <h2 style={{ ...rv(s2.visible,.1), fontFamily:"'Cormorant Garamond',serif", fontSize:'clamp(44px,5.5vw,80px)', fontWeight:300, letterSpacing:'-2px', lineHeight:.95, color:s.white, marginBottom:'32px' }}>
            Páginas que<br/><em style={{fontStyle:'italic',color:s.white2}}>convierten,</em><br/>no solo lucen.
          </h2>
          <p style={{ ...rv(s2.visible,.2), fontFamily:"'DM Sans',sans-serif", fontSize:'clamp(13px,1.3vw,15px)', color:s.gray, lineHeight:1.85, maxWidth:'420px', fontWeight:300, marginBottom:'40px' }}>
            Sitios web de alto rendimiento con Next.js, SEO técnico, branding premium y chatbots IA integrados que trabajan 24/7.
          </p>
          <div style={{ ...rv(s2.visible,.25), marginBottom:'40px' }}>
            {['Diseño UI/UX de frontera','SEO técnico avanzado','Chatbot IA integrado','Optimización de conversión'].map(f=><FeatureRow key={f} text={f}/>)}
            <div style={{ borderBottom:'1px solid rgba(240,237,232,0.05)' }}/>
          </div>
          <div style={{ ...rv(s2.visible,.35), display:'inline-flex', alignItems:'center', gap:'12px' }}>
            <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'clamp(36px,4vw,56px)', fontWeight:300, letterSpacing:'-2px', color:s.white }}>+280%</div>
            <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:'11px', color:s.gray, letterSpacing:'1px', maxWidth:'100px', lineHeight:1.4 }}>conversiones promedio en 60 días</div>
          </div>
        </div>
      </div>

      {/* S3 */}
      <div className="sgrid" style={{ borderBottom:'1px solid rgba(240,237,232,0.05)', minHeight:'100vh' }}>
        <div ref={s3.ref} style={{ padding:'clamp(60px,10vw,120px) clamp(20px,5vw,56px)', display:'flex', flexDirection:'column', justifyContent:'center' }}>
          <div style={{ ...rv(s3.visible), fontFamily:"'DM Sans',sans-serif", fontSize:'10px', letterSpacing:'3px', color:s.gray, textTransform:'uppercase', marginBottom:'32px', display:'flex', alignItems:'center', gap:'12px' }}>
            <span style={{ display:'block', width:'24px', height:'1px', background:s.gray }}/>03 · Automatizaciones
          </div>
          <h2 style={{ ...rv(s3.visible,.1), fontFamily:"'Cormorant Garamond',serif", fontSize:'clamp(44px,5.5vw,80px)', fontWeight:300, letterSpacing:'-2px', lineHeight:.95, color:s.white, marginBottom:'32px' }}>
            Tu negocio trabaja<br/>mientras<br/><em style={{fontStyle:'italic',color:s.white2}}>tú descansas.</em>
          </h2>
          <p style={{ ...rv(s3.visible,.2), fontFamily:"'DM Sans',sans-serif", fontSize:'clamp(13px,1.3vw,15px)', color:s.gray, lineHeight:1.85, maxWidth:'420px', fontWeight:300, marginBottom:'40px' }}>
            Workflows inteligentes que atienden, califican y cierran prospectos por WhatsApp, email y CRM sin intervención humana.
          </p>
          <div style={{ ...rv(s3.visible,.25), marginBottom:'40px' }}>
            {['Agente WhatsApp IA 24/7','Calificación automática de leads','Integración CRM completa','Seguimiento automático multicanal'].map(f=><FeatureRow key={f} text={f}/>)}
            <div style={{ borderBottom:'1px solid rgba(240,237,232,0.05)' }}/>
          </div>
          <div style={{ ...rv(s3.visible,.35), display:'inline-flex', alignItems:'center', gap:'12px' }}>
            <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'clamp(36px,4vw,56px)', fontWeight:300, letterSpacing:'-2px', color:s.white }}>20h</div>
            <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:'11px', color:s.gray, letterSpacing:'1px', maxWidth:'100px', lineHeight:1.4 }}>ahorradas por semana en promedio</div>
          </div>
        </div>
        <div style={{ background:'linear-gradient(135deg,#080a0d,#080d12,#080a0d)', display:'flex', alignItems:'center', justifyContent:'center', minHeight:'400px' }}>
          <div style={{ ...rv(s3.visible,.2,'right'), display:'flex', flexDirection:'column', width:'clamp(200px,25vw,300px)' }}>
            {[{icon:'💬',label:'Prospecto llega por WhatsApp'},{icon:'🤖',label:'Agente IA responde al instante'},{icon:'✓',label:'Lead calificado automáticamente'},{icon:'📅',label:'Cita agendada sin intervención'}].map((item,i)=>(
              <div key={i}>
                <div style={{ background:'rgba(240,237,232,0.04)', border:'1px solid rgba(240,237,232,0.08)', padding:'14px 18px', display:'flex', alignItems:'center', gap:'12px' }}>
                  <span style={{ fontSize:'16px' }}>{item.icon}</span>
                  <span style={{ fontFamily:"'DM Sans',sans-serif", fontSize:'11px', color:s.white2 }}>{item.label}</span>
                </div>
                {i<3 && <div style={{ display:'flex', justifyContent:'center', padding:'6px 0', fontSize:'14px', color:s.gray }}>↓</div>}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* S4 */}
      <div className="sgrid sgrid-rev" style={{ borderBottom:'1px solid rgba(240,237,232,0.05)', minHeight:'100vh' }}>
        <div style={{ background:'linear-gradient(135deg,#080d0a,#0a1208,#080d0a)', display:'flex', alignItems:'center', justifyContent:'center', minHeight:'400px' }}>
          <div style={{ ...rv(s4.visible,.2,'left'), width:'clamp(240px,28vw,360px)', background:'#0d0d0d', borderRadius:'12px', border:'1px solid rgba(240,237,232,0.06)', overflow:'hidden', boxShadow:'0 30px 60px rgba(0,0,0,0.5)' }}>
            <div style={{ padding:'16px 20px', borderBottom:'1px solid rgba(240,237,232,0.05)', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
              <span style={{ fontFamily:"'DM Sans',sans-serif", fontSize:'11px', color:s.white2, letterSpacing:'1px' }}>Dashboard IA</span>
              <span style={{ background:'rgba(74,222,128,0.1)', border:'1px solid rgba(74,222,128,0.2)', color:'#4ade80', fontFamily:"'DM Sans',sans-serif", fontSize:'9px', padding:'3px 8px', borderRadius:'100px' }}>● Live</span>
            </div>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1px', background:'rgba(240,237,232,0.05)' }}>
              {[['+ 340%','Leads / mes'],['72h','Deploy'],['24/7','Agente activo'],['3.2×','ROI']].map(([n,l])=>(
                <div key={l} style={{ background:'#0d0d0d', padding:'16px' }}>
                  <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'28px', fontWeight:300, color:s.white, letterSpacing:'-1px' }}>{n}</div>
                  <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:'9px', color:s.gray, letterSpacing:'1px', marginTop:'2px', textTransform:'uppercase' }}>{l}</div>
                </div>
              ))}
            </div>
            <div style={{ padding:'16px 20px' }}>
              <div style={{ display:'flex', alignItems:'flex-end', gap:'6px', height:'60px' }}>
                {bars.map((h,i)=><div key={i} style={{ flex:1, background:i===bars.length-1?'rgba(240,237,232,0.2)':'rgba(240,237,232,0.06)', borderRadius:'2px 2px 0 0', height:`${h}%`, transition:'height .8s cubic-bezier(0.16,1,0.3,1)' }}/>)}
              </div>
            </div>
          </div>
        </div>
        <div ref={s4.ref} style={{ padding:'clamp(60px,10vw,120px) clamp(20px,5vw,56px)', display:'flex', flexDirection:'column', justifyContent:'center' }}>
          <div style={{ ...rv(s4.visible), fontFamily:"'DM Sans',sans-serif", fontSize:'10px', letterSpacing:'3px', color:s.gray, textTransform:'uppercase', marginBottom:'32px', display:'flex', alignItems:'center', gap:'12px' }}>
            <span style={{ display:'block', width:'24px', height:'1px', background:s.gray }}/>04 · SaaS & Sistemas
          </div>
          <h2 style={{ ...rv(s4.visible,.1), fontFamily:"'Cormorant Garamond',serif", fontSize:'clamp(44px,5.5vw,80px)', fontWeight:300, letterSpacing:'-2px', lineHeight:.95, color:s.white, marginBottom:'32px' }}>
            Software a la<br/>medida de<br/><em style={{fontStyle:'italic',color:s.white2}}>tu empresa.</em>
          </h2>
          <p style={{ ...rv(s4.visible,.2), fontFamily:"'DM Sans',sans-serif", fontSize:'clamp(13px,1.3vw,15px)', color:s.gray, lineHeight:1.85, maxWidth:'420px', fontWeight:300, marginBottom:'40px' }}>
            Plataformas SaaS, dashboards operativos y agentes IA personalizados. El software que tu empresa necesita para escalar.
          </p>
          <div style={{ ...rv(s4.visible,.25), marginBottom:'40px' }}>
            {['Plataformas SaaS completas','Dashboards de operaciones','Agentes IA personalizados','Integraciones empresariales'].map(f=><FeatureRow key={f} text={f}/>)}
            <div style={{ borderBottom:'1px solid rgba(240,237,232,0.05)' }}/>
          </div>
          <div style={{ ...rv(s4.visible,.35), display:'inline-flex', alignItems:'center', gap:'12px' }}>
            <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'clamp(36px,4vw,56px)', fontWeight:300, letterSpacing:'-2px', color:s.white }}>6w</div>
            <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:'11px', color:s.gray, letterSpacing:'1px', maxWidth:'100px', lineHeight:1.4 }}>de idea a MVP en producción</div>
          </div>
        </div>
      </div>

      {/* STATEMENT */}
      <div ref={stmt.ref} style={{ padding:'clamp(80px,12vw,140px) clamp(20px,5vw,56px)', borderBottom:'1px solid rgba(240,237,232,0.05)', textAlign:'center' }}>
        <p style={{ ...rv(stmt.visible), fontFamily:"'Cormorant Garamond',serif", fontSize:'clamp(32px,4.5vw,64px)', fontWeight:300, letterSpacing:'-2px', lineHeight:1.05, color:s.white, maxWidth:'900px', margin:'0 auto' }}>
          <span style={{color:s.gray}}>No vendemos horas.</span>{' '}
          Construimos sistemas que <em style={{fontStyle:'italic',color:s.white2}}>trabajan por ti</em> mientras duermes.
        </p>
      </div>

      {/* CTA */}
      <div ref={cta.ref} style={{ padding:'clamp(80px,12vw,160px) clamp(20px,5vw,56px)', textAlign:'center', position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse 50% 50% at 50% 100%,rgba(240,237,232,0.025),transparent 70%)', pointerEvents:'none' }}/>
        <div style={{ ...rv(cta.visible), fontFamily:"'DM Sans',sans-serif", fontSize:'10px', letterSpacing:'3px', color:s.white2, textTransform:'uppercase', marginBottom:'40px' }}>¿Listo para empezar?</div>
        <h2 style={{ ...rv(cta.visible,.1), fontFamily:"'Cormorant Garamond',serif", fontSize:'clamp(44px,6vw,84px)', fontWeight:300, letterSpacing:'-2.5px', lineHeight:.93, color:s.white, maxWidth:'700px', margin:'0 auto 32px' }}>
          Tu competencia<br/>ya está usando <em style={{fontStyle:'italic',color:s.white2}}>IA.</em><br/>¿Tú cuándo?
        </h2>
        <p style={{ ...rv(cta.visible,.2), fontFamily:"'DM Sans',sans-serif", fontSize:'14px', color:s.gray, maxWidth:'360px', margin:'0 auto 44px', lineHeight:1.75, fontWeight:300 }}>
          30 minutos. Sin compromiso. Te decimos exactamente qué construir para ver resultados en 90 días.
        </p>
        <button style={{ ...rv(cta.visible,.3), display:'inline-flex', alignItems:'center', gap:'10px', background:'rgba(240,237,232,0.07)', border:'1px solid rgba(240,237,232,0.12)', color:s.white, fontFamily:"'DM Sans',sans-serif", fontSize:'12px', padding:'16px 32px', cursor:'pointer', borderRadius:'100px', transition:'background .25s' }}
          onMouseEnter={e=>(e.currentTarget.style.background='rgba(240,237,232,0.14)')}
          onMouseLeave={e=>(e.currentTarget.style.background='rgba(240,237,232,0.07)')}
        >Agendar conversación →</button>
      </div>

      <footer style={{ padding:'32px clamp(20px,5vw,56px)', borderTop:'1px solid rgba(240,237,232,0.05)', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
        <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:'11px', letterSpacing:'5px', textTransform:'uppercase', color:s.white2 }}>Ō R B I T</div>
        <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:'10px', color:s.gray2, letterSpacing:'1px' }}>© 2025 ŌRBIT.</div>
      </footer>

      <style>{`
        @keyframes rotate{from{transform:rotate(0deg);}to{transform:rotate(360deg);}}
        @keyframes rotateRev{from{transform:rotate(0deg);}to{transform:rotate(-360deg);}}
        .sgrid{display:grid;grid-template-columns:1fr 1fr;}
        .sgrid-rev>*:first-child{order:1;}
        .sgrid-rev>*:last-child{order:2;}
        @media(max-width:768px){
          .sgrid{grid-template-columns:1fr!important;}
          .sgrid-rev>*:first-child{order:2!important;}
          .sgrid-rev>*:last-child{order:1!important;}
        }
      `}</style>
    </main>
  )
}
