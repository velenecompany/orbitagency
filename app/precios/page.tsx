'use client'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'

const WA = 'https://wa.me/523312499320?text=Hola%20VANT Studio%20%F0%9F%91%8B%20Me%20interesa%20el%20plan%20'

const plans = [
  {
    name: 'Starter',
    price: '$8,500',
    desc: 'Ideal para negocios que quieren presencia digital profesional.',
    features: [
      'Página web premium',
      'Diseño UI/UX profesional',
      'SEO básico',
      'Formulario de contacto',
      'Responsive mobile',
      '2 semanas de soporte',
    ],
    cta: 'Quiero este plan',
    highlight: false,
  },
  {
    name: 'Negocio',
    price: '$15,000',
    desc: 'Para negocios que quieren automatizar ventas y atención al cliente.',
    features: [
      'Todo lo del plan Starter',
      'Chatbot IA en la web',
      'Agente WhatsApp IA 24/7',
      'Calificación automática de leads',
      'Integración con redes sociales',
      '1 mes de soporte',
    ],
    cta: 'Quiero este plan',
    highlight: true,
  },
  {
    name: 'Pro',
    price: '$25,000',
    desc: 'Para empresas que quieren un sistema completo de ventas automatizado.',
    features: [
      'Todo lo del plan Negocio',
      'CRM integrado',
      'Automatizaciones multicanal',
      'Dashboard de operaciones',
      'Reportes automáticos con IA',
      '2 meses de soporte',
    ],
    cta: 'Quiero este plan',
    highlight: false,
  },
]

const SYSTEM_PROMPT = `Eres el asistente de precios de VANT Studio, una agencia de desarrollo web e IA en Guadalajara, México.

Tu rol es explicar de forma simple y clara qué significa cada herramienta o servicio que ofrecemos.

Planes y precios:
- Plan Starter $8,500 MXN: Página web premium, diseño UI/UX, SEO básico, formulario de contacto, responsive mobile, 2 semanas de soporte.
- Plan Negocio $15,000 MXN: Todo lo del Starter + Chatbot IA, Agente WhatsApp IA 24/7, calificación de leads, integración redes sociales, 1 mes soporte.
- Plan Pro $25,000 MXN: Todo lo anterior + CRM, automatizaciones multicanal, dashboard, reportes IA, 2 meses soporte.

Glosario que debes explicar cuando pregunten:
- SEO: hace que tu negocio aparezca en Google cuando alguien busca tus servicios.
- Chatbot IA: un asistente automático en tu página que responde preguntas de clientes las 24 horas.
- Agente WhatsApp IA: responde automáticamente los mensajes de WhatsApp, califica si el cliente es serio y agenda citas sin que tú hagas nada.
- CRM: sistema que organiza todos tus clientes y prospectos en un solo lugar.
- Automatizaciones multicanal: envía mensajes automáticos por WhatsApp, email y más sin intervención humana.
- Dashboard: pantalla donde ves las métricas y resultados de tu negocio en tiempo real.
- Responsive mobile: tu página se ve perfecta en celular y computadora.
- UI/UX: diseño visual y experiencia de usuario — que tu página se vea premium y sea fácil de usar.
- Leads: personas interesadas en tu negocio que aún no han comprado.
- Calificación de leads: el sistema detecta automáticamente qué prospectos tienen más posibilidades de comprar.

Instrucciones:
- Responde en máximo 2-3 oraciones simples y directas
- Usa lenguaje cotidiano, nada técnico
- Si preguntan cuál plan les conviene, pregunta qué tipo de negocio tienen
- Al final siempre invita a agendar una llamada gratuita en WhatsApp: +52 33 1249 9320
- Habla en español mexicano natural`

interface Message {
  role: 'user' | 'assistant'
  content: string
}

const s = {
  black: '#090909', white: '#f0ede8', white2: '#b8b4ac',
  gray: '#4a4744', gray2: '#2a2826',
}

export default function Precios() {
  const [started, setStarted] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: '¡Hola! Soy el asistente de VANT Studio. Si tienes dudas sobre algún plan o no entiendes qué incluye alguna herramienta, aquí estoy. ¿En qué te ayudo?' }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [chatOpen, setChatOpen] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => { setTimeout(() => setStarted(true), 100) }, [])
  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [messages])

  const sendMessage = async () => {
    if (!input.trim() || loading) return
    const userMsg = input.trim()
    setInput('')
    setMessages(prev => [...prev, { role: 'user', content: userMsg }])
    setLoading(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, { role: 'user', content: userMsg }],
          system: SYSTEM_PROMPT,
        }),
      })
      const data = await response.json()
      setMessages(prev => [...prev, { role: 'assistant', content: data.content }])
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Hubo un error. Escríbenos directo al WhatsApp: +52 33 1249 9320' }])
    } finally {
      setLoading(false)
    }
  }

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage() }
  }

  const suggestions = [
    '¿Qué es el SEO?',
    '¿Cómo funciona el Chatbot IA?',
    '¿Qué plan me conviene?',
    '¿Qué es el CRM?',
  ]

  return (
    <main style={{ background: s.black, minHeight: '100vh', overflowX: 'hidden' }}>

      {/* NAV */}
      <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 'clamp(16px,3vw,24px) clamp(20px,5vw,56px)', background: 'rgba(9,9,9,0.92)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(240,237,232,0.05)' }}>
        <Link href="/" style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '12px', fontWeight: 500, letterSpacing: '5px', color: s.white, textTransform: 'uppercase', textDecoration: 'none' }}>V A N T</Link>
        <Link href="/" style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '10px', letterSpacing: '2px', color: s.white2, textDecoration: 'none', textTransform: 'uppercase' }}>← Volver</Link>
      </nav>

      {/* HEADER */}
      <div style={{ padding: 'clamp(110px,14vw,150px) clamp(20px,5vw,56px) clamp(40px,5vw,60px)', borderBottom: '1px solid rgba(240,237,232,0.05)', opacity: started ? 1 : 0, transform: started ? 'translateY(0)' : 'translateY(20px)', transition: 'opacity .8s, transform .8s' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', fontFamily: "'DM Sans',sans-serif", fontSize: '10px', letterSpacing: '3px', color: s.white2, textTransform: 'uppercase', marginBottom: '24px' }}>
          <span style={{ display: 'block', width: '36px', height: '1px', background: s.white2, flexShrink: 0 }} />
          05 · Precios
        </div>
        <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(48px,7vw,88px)', fontWeight: 300, letterSpacing: '-2px', lineHeight: .93, color: s.white, maxWidth: '700px' }}>
          Inversión clara.<br /><em style={{ fontStyle: 'italic', color: s.white2 }}>Sin sorpresas.</em>
        </h1>
        <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 'clamp(13px,1.5vw,15px)', color: s.gray, lineHeight: 1.8, marginTop: '24px', maxWidth: '480px', fontWeight: 300 }}>
          Elige el plan que se adapta a tu negocio. Si tienes dudas sobre qué incluye algo, pregúntale al asistente.
        </p>
      </div>

      {/* PLANES */}
      <div style={{ padding: 'clamp(40px,6vw,80px) clamp(20px,5vw,56px)' }}>
        <div className="plans-grid">
          {plans.map((plan, i) => (
            <div key={plan.name} style={{
              background: plan.highlight ? 'rgba(240,237,232,0.04)' : 'transparent',
              border: `1px solid ${plan.highlight ? 'rgba(240,237,232,0.15)' : 'rgba(240,237,232,0.07)'}`,
              padding: 'clamp(28px,4vw,40px)',
              position: 'relative',
              opacity: started ? 1 : 0,
              transform: started ? 'translateY(0)' : 'translateY(40px)',
              transition: `opacity .9s ${i * 0.1}s cubic-bezier(0.16,1,0.3,1), transform .9s ${i * 0.1}s cubic-bezier(0.16,1,0.3,1)`,
            }}>
              {plan.highlight && (
                <div style={{ position: 'absolute', top: '-1px', left: '50%', transform: 'translateX(-50%)', background: s.white, color: s.black, fontFamily: "'DM Sans',sans-serif", fontSize: '9px', letterSpacing: '2px', textTransform: 'uppercase', padding: '4px 14px', fontWeight: 500 }}>
                  Más popular
                </div>
              )}

              <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '10px', letterSpacing: '3px', color: s.gray, textTransform: 'uppercase', marginBottom: '16px' }}>{plan.name}</div>
              <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(36px,5vw,52px)', fontWeight: 300, letterSpacing: '-1.5px', color: s.white, lineHeight: 1, marginBottom: '8px' }}>{plan.price}<span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '14px', color: s.gray, letterSpacing: '1px' }}> MXN</span></div>
              <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '12px', color: s.gray, lineHeight: 1.7, marginBottom: '28px' }}>{plan.desc}</p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0', marginBottom: '32px' }}>
                {plan.features.map(f => (
                  <div key={f} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 0', borderTop: '1px solid rgba(240,237,232,0.05)' }}>
                    <span style={{ color: s.white2, fontSize: '12px', flexShrink: 0 }}>✓</span>
                    <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '12px', color: s.white2 }}>{f}</span>
                  </div>
                ))}
                <div style={{ borderBottom: '1px solid rgba(240,237,232,0.05)' }} />
              </div>

              <a href={`${WA}${encodeURIComponent(plan.name)}`} target="_blank" rel="noopener noreferrer" style={{
                display: 'block', textAlign: 'center',
                background: plan.highlight ? 'rgba(240,237,232,0.9)' : 'rgba(240,237,232,0.06)',
                border: `1px solid ${plan.highlight ? 'transparent' : 'rgba(240,237,232,0.1)'}`,
                color: plan.highlight ? s.black : s.white,
                fontFamily: "'DM Sans',sans-serif", fontSize: '12px', letterSpacing: '1px',
                padding: '14px 24px', borderRadius: '100px', textDecoration: 'none',
                transition: 'all .2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.opacity = '0.85' }}
              onMouseLeave={e => { e.currentTarget.style.opacity = '1' }}
              >{plan.cta} →</a>
            </div>
          ))}
        </div>

        {/* Nota */}
        <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '12px', color: s.gray, textAlign: 'center', marginTop: '32px', lineHeight: 1.7 }}>
          ¿Necesitas algo personalizado? <a href={WA + 'personalizado'} target="_blank" rel="noopener noreferrer" style={{ color: s.white2, textDecoration: 'underline' }}>Escríbenos</a> y armamos un plan a tu medida.
        </p>
      </div>

      {/* FAQ */}
      <div style={{ padding: '0 clamp(20px,5vw,56px) clamp(60px,8vw,100px)', borderTop: '1px solid rgba(240,237,232,0.05)', paddingTop: 'clamp(40px,6vw,80px)' }}>
        <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '10px', letterSpacing: '3px', color: s.white2, textTransform: 'uppercase', marginBottom: '40px', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ display: 'block', width: '24px', height: '1px', background: s.white2 }} />
          Preguntas frecuentes
        </div>
        <div className="faq-grid">
          {[
            { q: '¿Hay pagos mensuales?', a: 'No. El precio es un pago único por el desarrollo. El mantenimiento mensual es opcional desde $3,500 MXN.' },
            { q: '¿Cuánto tiempo tarda el desarrollo?', a: 'El Plan Starter en 1-2 semanas. El Plan Negocio en 2-3 semanas. El Plan Pro en 3-5 semanas.' },
            { q: '¿Puedo empezar con Starter y subir después?', a: 'Sí, siempre puedes escalar al siguiente plan pagando solo la diferencia.' },
            { q: '¿Qué necesito para empezar?', a: 'Solo una llamada de 30 minutos para entender tu negocio. Nosotros nos encargamos del resto.' },
          ].map((item, i) => (
            <div key={i} style={{ padding: 'clamp(20px,3vw,28px) 0', borderTop: '1px solid rgba(240,237,232,0.05)' }}>
              <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(18px,2vw,22px)', fontWeight: 300, color: s.white, marginBottom: '10px', letterSpacing: '-0.3px' }}>{item.q}</div>
              <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '13px', color: s.gray, lineHeight: 1.7 }}>{item.a}</p>
            </div>
          ))}
          <div style={{ borderBottom: '1px solid rgba(240,237,232,0.05)' }} />
        </div>
      </div>

      <footer style={{ padding: '32px clamp(20px,5vw,56px)', borderTop: '1px solid rgba(240,237,232,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '11px', letterSpacing: '5px', textTransform: 'uppercase', color: s.white2 }}>V A N T</div>
        <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '10px', color: s.gray2, letterSpacing: '1px' }}>© 2025 VANT Studio.</div>
      </footer>

      {/* CHATBOT FLOTANTE */}
      <div style={{ position: 'fixed', bottom: '28px', right: '28px', zIndex: 300 }}>
        {/* Chat window */}
        {chatOpen && (
          <div style={{
            position: 'absolute', bottom: '64px', right: 0,
            width: 'clamp(280px, 90vw, 360px)',
            background: '#0f0f0f', border: '1px solid rgba(240,237,232,0.1)',
            borderRadius: '16px', overflow: 'hidden',
            boxShadow: '0 20px 60px rgba(0,0,0,0.8)',
          }}>
            {/* Header */}
            <div style={{ padding: '16px 20px', borderBottom: '1px solid rgba(240,237,232,0.06)', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: '32px', height: '32px', background: 'rgba(240,237,232,0.06)', border: '1px solid rgba(240,237,232,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Cormorant Garamond',serif", fontSize: '14px', color: s.white, position: 'relative', flexShrink: 0 }}>
                Ō
                <div style={{ position: 'absolute', bottom: '1px', right: '1px', width: '6px', height: '6px', background: '#4ade80', borderRadius: '50%', border: `1px solid #0f0f0f` }} />
              </div>
              <div>
                <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '12px', fontWeight: 500, color: s.white }}>Asistente VANT Studio</div>
                <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '10px', color: '#4ade80' }}>● En línea</div>
              </div>
              <button onClick={() => setChatOpen(false)} style={{ marginLeft: 'auto', background: 'none', border: 'none', color: s.gray, cursor: 'pointer', fontSize: '18px', lineHeight: 1 }}>×</button>
            </div>

            {/* Messages */}
            <div style={{ height: '280px', overflowY: 'auto', padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {messages.map((msg, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start' }}>
                  <div style={{
                    maxWidth: '85%', padding: '10px 14px',
                    background: msg.role === 'user' ? 'rgba(240,237,232,0.08)' : 'rgba(240,237,232,0.04)',
                    border: `1px solid ${msg.role === 'user' ? 'rgba(240,237,232,0.12)' : 'rgba(240,237,232,0.06)'}`,
                    borderRadius: msg.role === 'user' ? '12px 12px 2px 12px' : '12px 12px 12px 2px',
                    fontFamily: "'DM Sans',sans-serif", fontSize: '12px',
                    color: msg.role === 'user' ? s.white : s.white2,
                    lineHeight: 1.6, fontWeight: 300,
                  }}>
                    {msg.content}
                  </div>
                </div>
              ))}
              {loading && (
                <div style={{ display: 'flex' }}>
                  <div style={{ padding: '10px 14px', background: 'rgba(240,237,232,0.04)', border: '1px solid rgba(240,237,232,0.06)', borderRadius: '12px 12px 12px 2px', display: 'flex', gap: '4px', alignItems: 'center' }}>
                    {[0,1,2].map(j => <div key={j} style={{ width: '5px', height: '5px', background: s.gray, borderRadius: '50%', animation: `bounce 1s ${j*0.15}s infinite` }} />)}
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Suggestions */}
            {messages.length <= 1 && (
              <div style={{ padding: '0 12px 10px', display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {suggestions.map(sg => (
                  <button key={sg} onClick={() => { setInput(sg); inputRef.current?.focus() }} style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '10px', color: s.gray, background: 'transparent', border: '1px solid rgba(240,237,232,0.07)', padding: '5px 10px', cursor: 'pointer', borderRadius: '100px', transition: 'all .2s', whiteSpace: 'nowrap' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(240,237,232,0.2)'; e.currentTarget.style.color = s.white2 }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(240,237,232,0.07)'; e.currentTarget.style.color = s.gray }}
                  >{sg}</button>
                ))}
              </div>
            )}

            {/* Input */}
            <div style={{ padding: '12px 16px', borderTop: '1px solid rgba(240,237,232,0.06)', display: 'flex', gap: '8px', alignItems: 'center' }}>
              <input ref={inputRef} value={input} onChange={e => setInput(e.target.value)} onKeyDown={handleKey} placeholder="Pregunta algo..." style={{ flex: 1, background: 'rgba(240,237,232,0.04)', border: '1px solid rgba(240,237,232,0.08)', color: s.white, fontFamily: "'DM Sans',sans-serif", fontSize: '12px', padding: '10px 14px', outline: 'none', borderRadius: '100px' }} />
              <button onClick={sendMessage} disabled={loading || !input.trim()} style={{ width: '36px', height: '36px', borderRadius: '50%', background: input.trim() ? 'rgba(240,237,232,0.9)' : 'rgba(240,237,232,0.06)', border: '1px solid rgba(240,237,232,0.1)', color: input.trim() ? s.black : s.gray, fontSize: '14px', cursor: input.trim() ? 'pointer' : 'default', transition: 'all .2s', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>→</button>
            </div>
          </div>
        )}

        {/* Botón flotante */}
        <button onClick={() => setChatOpen(!chatOpen)} style={{
          width: '52px', height: '52px', borderRadius: '50%',
          background: chatOpen ? 'rgba(240,237,232,0.1)' : 'rgba(240,237,232,0.9)',
          border: '1px solid rgba(240,237,232,0.2)',
          color: chatOpen ? s.white2 : s.black,
          fontSize: chatOpen ? '20px' : '22px',
          cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
          transition: 'all .3s',
        }}>
          {chatOpen ? '×' : '?'}
        </button>
      </div>

      <style>{`
        @keyframes bounce { 0%,100%{transform:translateY(0);opacity:.4;} 50%{transform:translateY(-4px);opacity:1;} }
        .plans-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 1px; background: rgba(240,237,232,0.05); }
        .faq-grid { display: grid; grid-template-columns: repeat(2,1fr); gap: 0 clamp(32px,5vw,80px); }
        @media(max-width:768px) {
          .plans-grid { grid-template-columns: 1fr !important; }
          .faq-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </main>
  )
}
