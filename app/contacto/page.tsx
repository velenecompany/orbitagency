'use client'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'

const s = { black:'#090909', white:'#f0ede8', white2:'#b8b4ac', gray:'#4a4744', gray2:'#2a2826' }

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

const rv = (visible: boolean, delay = 0) => ({
  opacity: visible ? 1 : 0,
  transform: visible ? 'translateY(0)' : 'translateY(32px)',
  transition: `opacity .95s ${delay}s cubic-bezier(0.16,1,0.3,1), transform .95s ${delay}s cubic-bezier(0.16,1,0.3,1)`,
})

export default function Contacto() {
  const [started, setStarted] = useState(false)
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [business, setBusiness] = useState('')
  const [service, setService] = useState('')
  const [sent, setSent] = useState(false)
  const hero = useReveal()
  const cal = useReveal()
  const form = useReveal()

  useEffect(() => { setTimeout(() => setStarted(true), 100) }, [])

  const whatsappNumber = '523312499320'

  const handleWhatsapp = () => {
    if (!name || !business || !service) return
    const msg = encodeURIComponent(
      `Hola VANT Studio 👋\n\nMi nombre es *${name}*.\nTengo una empresa de *${business}*.\nMe interesa: *${service}*.\n\n¿Podemos hablar?`
    )
    window.open(`https://wa.me/${whatsappNumber}?text=${msg}`, '_blank')
    setSent(true)
  }

  const services = [
    'Estrategia IA', 'Página web premium', 'Agente WhatsApp IA',
    'Automatizaciones', 'SaaS / Dashboard', 'Chatbot IA',
  ]

  return (
    <main style={{ background: s.black, minHeight: '100vh', overflowX: 'hidden' }}>

      {/* NAV */}
      <nav style={{ position:'fixed', top:0, left:0, right:0, zIndex:200, display:'flex', alignItems:'center', justifyContent:'space-between', padding:'clamp(16px,3vw,24px) clamp(20px,5vw,56px)', background:'rgba(9,9,9,0.92)', backdropFilter:'blur(20px)', borderBottom:'1px solid rgba(240,237,232,0.05)' }}>
        <Link href="/" style={{ fontFamily:"'DM Sans',sans-serif", fontSize:'12px', fontWeight:500, letterSpacing:'5px', color:s.white, textTransform:'uppercase', textDecoration:'none' }}>V A N T</Link>
        <Link href="/" style={{ fontFamily:"'DM Sans',sans-serif", fontSize:'10px', letterSpacing:'2px', color:s.white2, textDecoration:'none', textTransform:'uppercase' }}>← Volver</Link>
      </nav>

      {/* HERO */}
      <div ref={hero.ref} style={{ padding:'clamp(110px,14vw,150px) clamp(20px,5vw,56px) clamp(40px,6vw,80px)', borderBottom:'1px solid rgba(240,237,232,0.05)' }}>
        <div style={{ ...rv(hero.visible), display:'flex', alignItems:'center', gap:'14px', fontFamily:"'DM Sans',sans-serif", fontSize:'10px', letterSpacing:'3px', color:s.white2, textTransform:'uppercase', marginBottom:'24px' }}>
          <span style={{ display:'block', width:'36px', height:'1px', background:s.white2, flexShrink:0 }}/>
          05 · Contacto
        </div>
        <h1 style={{ ...rv(hero.visible,.15), fontFamily:"'Cormorant Garamond',serif", fontSize:'clamp(48px,7vw,96px)', fontWeight:300, letterSpacing:'-2.5px', lineHeight:.93, color:s.white, maxWidth:'800px' }}>
          Hablemos de<br/><em style={{fontStyle:'italic',color:s.white2}}>tu proyecto.</em>
        </h1>
        <p style={{ ...rv(hero.visible,.3), fontFamily:"'DM Sans',sans-serif", fontSize:'clamp(13px,1.5vw,15px)', color:s.gray, lineHeight:1.8, marginTop:'24px', maxWidth:'480px', fontWeight:300 }}>
          30 minutos. Sin compromiso. Te decimos exactamente qué construir y cuánto cuesta.
        </p>
      </div>

      {/* MAIN GRID */}
      <div className="contact-grid">

        {/* FORM → WHATSAPP */}
        <div ref={form.ref} style={{ padding:'clamp(40px,6vw,80px) clamp(20px,5vw,56px)', borderRight:'1px solid rgba(240,237,232,0.05)' }}>
          <div style={{ ...rv(form.visible), fontFamily:"'DM Sans',sans-serif", fontSize:'10px', letterSpacing:'3px', color:s.white2, textTransform:'uppercase', marginBottom:'32px', display:'flex', alignItems:'center', gap:'12px' }}>
            <span style={{ display:'block', width:'24px', height:'1px', background:s.white2 }}/>
            Escríbenos por WhatsApp
          </div>

          {!sent ? (
            <div style={{ display:'flex', flexDirection:'column', gap:'16px', maxWidth:'480px' }}>
              {/* Name */}
              <div>
                <label style={{ fontFamily:"'DM Sans',sans-serif", fontSize:'10px', letterSpacing:'2px', color:s.gray, textTransform:'uppercase', display:'block', marginBottom:'8px' }}>Tu nombre</label>
                <input value={name} onChange={e=>setName(e.target.value)} placeholder="Fernando Herrera" style={{ width:'100%', background:'rgba(240,237,232,0.03)', border:'1px solid rgba(240,237,232,0.08)', color:s.white, fontFamily:"'DM Sans',sans-serif", fontSize:'14px', padding:'14px 16px', outline:'none', borderRadius:'0', transition:'border-color .2s' }}
                onFocus={e=>(e.target.style.borderColor='rgba(240,237,232,0.2)')}
                onBlur={e=>(e.target.style.borderColor='rgba(240,237,232,0.08)')}/>
              </div>

              {/* Business */}
              <div>
                <label style={{ fontFamily:"'DM Sans',sans-serif", fontSize:'10px', letterSpacing:'2px', color:s.gray, textTransform:'uppercase', display:'block', marginBottom:'8px' }}>Tu empresa o negocio</label>
                <input value={business} onChange={e=>setBusiness(e.target.value)} placeholder="Clínica, gimnasio, inmobiliaria..." style={{ width:'100%', background:'rgba(240,237,232,0.03)', border:'1px solid rgba(240,237,232,0.08)', color:s.white, fontFamily:"'DM Sans',sans-serif", fontSize:'14px', padding:'14px 16px', outline:'none', borderRadius:'0', transition:'border-color .2s' }}
                onFocus={e=>(e.target.style.borderColor='rgba(240,237,232,0.2)')}
                onBlur={e=>(e.target.style.borderColor='rgba(240,237,232,0.08)')}/>
              </div>

              {/* Service */}
              <div>
                <label style={{ fontFamily:"'DM Sans',sans-serif", fontSize:'10px', letterSpacing:'2px', color:s.gray, textTransform:'uppercase', display:'block', marginBottom:'12px' }}>¿Qué necesitas?</label>
                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'8px' }}>
                  {services.map(sv => (
                    <button key={sv} onClick={()=>setService(sv)} style={{ background: service===sv ? 'rgba(240,237,232,0.1)' : 'rgba(240,237,232,0.03)', border: `1px solid ${service===sv ? 'rgba(240,237,232,0.3)' : 'rgba(240,237,232,0.08)'}`, color: service===sv ? s.white : s.gray, fontFamily:"'DM Sans',sans-serif", fontSize:'11px', padding:'12px 14px', cursor:'pointer', textAlign:'left', transition:'all .2s', letterSpacing:'.3px' }}>
                      {sv}
                    </button>
                  ))}
                </div>
              </div>

              {/* CTA WhatsApp */}
              <button
                onClick={handleWhatsapp}
                disabled={!name || !business || !service}
                style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:'12px', background: (name&&business&&service) ? 'rgba(240,237,232,0.9)' : 'rgba(240,237,232,0.04)', border:`1px solid ${(name&&business&&service)?'transparent':'rgba(240,237,232,0.08)'}`, color: (name&&business&&service) ? s.black : s.gray, fontFamily:"'DM Sans',sans-serif", fontSize:'13px', fontWeight:500, padding:'16px 28px', cursor: (name&&business&&service)?'pointer':'default', borderRadius:'100px', marginTop:'8px', transition:'all .3s' }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.553 4.116 1.522 5.847L.057 23.04a.75.75 0 00.904.904l5.193-1.465A11.952 11.952 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.907 0-3.693-.5-5.24-1.375l-.374-.219-3.882 1.096 1.096-3.882-.22-.374A9.953 9.953 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/></svg>
                Enviar por WhatsApp
              </button>

              {!name || !business || !service ? (
                <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:'11px', color:s.gray2, textAlign:'center' }}>Completa los campos para continuar</p>
              ) : null}
            </div>
          ) : (
            <div style={{ maxWidth:'480px', padding:'40px', border:'1px solid rgba(240,237,232,0.08)', textAlign:'center' }}>
              <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'48px', fontWeight:300, color:s.white, marginBottom:'16px' }}>✓</div>
              <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'28px', fontWeight:300, color:s.white, marginBottom:'12px' }}>¡Mensaje enviado!</div>
              <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:'13px', color:s.gray, lineHeight:1.7, marginBottom:'24px' }}>
                Te responderemos en menos de 24 horas. También puedes agendar tu llamada directo en el calendario.
              </p>
              <button onClick={()=>setSent(false)} style={{ fontFamily:"'DM Sans',sans-serif", fontSize:'11px', color:s.gray, background:'transparent', border:'1px solid rgba(240,237,232,0.08)', padding:'10px 20px', cursor:'pointer', borderRadius:'100px' }}>
                Enviar otro mensaje
              </button>
            </div>
          )}

          {/* Info */}
          <div style={{ marginTop:'48px', display:'flex', flexDirection:'column', gap:'16px' }}>
            {[
              { label:'WhatsApp directo', value:'+52 1 249 932 041' },
              { label:'Email', value:'hola@orbit.mx' },
              { label:'Ubicación', value:'Guadalajara, México' },
            ].map(item => (
              <div key={item.label} style={{ display:'flex', gap:'16px', alignItems:'center', padding:'16px 0', borderTop:'1px solid rgba(240,237,232,0.05)' }}>
                <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:'10px', letterSpacing:'2px', color:s.gray, textTransform:'uppercase', minWidth:'120px' }}>{item.label}</div>
                <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'18px', fontWeight:300, color:s.white2 }}>{item.value}</div>
              </div>
            ))}
            <div style={{ borderBottom:'1px solid rgba(240,237,232,0.05)' }}/>
          </div>
        </div>

        {/* CALENDLY */}
        <div ref={cal.ref} style={{ padding:'clamp(40px,6vw,80px) clamp(20px,5vw,56px)' }}>
          <div style={{ ...rv(cal.visible), fontFamily:"'DM Sans',sans-serif", fontSize:'10px', letterSpacing:'3px', color:s.white2, textTransform:'uppercase', marginBottom:'32px', display:'flex', alignItems:'center', gap:'12px' }}>
            <span style={{ display:'block', width:'24px', height:'1px', background:s.white2 }}/>
            Agendar llamada
          </div>
          <div style={{ ...rv(cal.visible,.1), fontFamily:"'Cormorant Garamond',serif", fontSize:'clamp(28px,3vw,40px)', fontWeight:300, letterSpacing:'-1px', color:s.white, marginBottom:'8px', lineHeight:1.1 }}>
            30 minutos.<br/><em style={{fontStyle:'italic',color:s.white2}}>Sin compromiso.</em>
          </div>
          <p style={{ ...rv(cal.visible,.2), fontFamily:"'DM Sans',sans-serif", fontSize:'13px', color:s.gray, lineHeight:1.7, marginBottom:'32px', maxWidth:'360px' }}>
            Elige el día y hora que mejor te funcione. Hablamos de tu negocio y te decimos exactamente qué construir.
          </p>

          {/* Calendly embed */}
          <div style={{ ...rv(cal.visible,.3), borderRadius:'0', overflow:'hidden', border:'1px solid rgba(240,237,232,0.06)', background:'#0d0d0d' }}>
            <iframe
              src="https://calendly.com/fernandoherreranl/30min?hide_gdpr_banner=1&background_color=0d0d0d&text_color=f0ede8&primary_color=f0ede8"
              width="100%"
              height="620"
              frameBorder="0"
              style={{ display:'block' }}
              title="Agendar llamada con VANT Studio"
            />
          </div>
        </div>
      </div>

      {/* BOTTOM */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', borderTop:'1px solid rgba(240,237,232,0.05)' }} className="bottom-grid">
        {[
          { num:'30', unit:'min', label:'Llamada sin compromiso' },
          { num:'24', unit:'h', label:'Tiempo de respuesta máximo' },
          { num:'90', unit:'días', label:'Para ver resultados reales' },
        ].map(item => (
          <div key={item.label} style={{ padding:'clamp(24px,4vw,40px)', borderRight:'1px solid rgba(240,237,232,0.05)' }}>
            <div style={{ display:'flex', alignItems:'baseline', gap:'6px', marginBottom:'8px' }}>
              <span style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'clamp(40px,5vw,60px)', fontWeight:300, letterSpacing:'-2px', color:s.white, lineHeight:1 }}>{item.num}</span>
              <span style={{ fontFamily:"'DM Sans',sans-serif", fontSize:'14px', color:s.gray }}>{item.unit}</span>
            </div>
            <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:'10px', letterSpacing:'2px', color:s.gray, textTransform:'uppercase' }}>{item.label}</div>
          </div>
        ))}
      </div>

      <footer style={{ padding:'32px clamp(20px,5vw,56px)', borderTop:'1px solid rgba(240,237,232,0.05)', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
        <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:'11px', letterSpacing:'5px', textTransform:'uppercase', color:s.white2 }}>V A N T</div>
        <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:'10px', color:s.gray2, letterSpacing:'1px' }}>© 2025 VANT Studio.</div>
      </footer>

      <style>{`
        .contact-grid { display: grid; grid-template-columns: 1fr 1fr; }
        .bottom-grid { grid-template-columns: repeat(3,1fr); }
        .bottom-grid > div:last-child { border-right: none; }
        @media(max-width:768px){
          .contact-grid { grid-template-columns: 1fr !important; }
          .contact-grid > div:first-child { border-right: none !important; border-bottom: 1px solid rgba(240,237,232,0.05); }
          .bottom-grid { grid-template-columns: 1fr !important; }
          .bottom-grid > div { border-right: none !important; border-bottom: 1px solid rgba(240,237,232,0.05); }
        }
      `}</style>
    </main>
  )
}
