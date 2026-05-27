'use client'
import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

const SYSTEM_PROMPT = `Eres el asistente de ventas de VANT Studio, una agencia premium de desarrollo web e inteligencia artificial basada en Guadalajara, México.

Tu personalidad:
- Profesional pero cercano
- Hablas en español, de manera natural y directa
- Eres experto en IA aplicada a negocios
- Siempre enfocas las respuestas en ROI y resultados reales
- Nunca eres genérico, siempre das ejemplos concretos

Servicios de VANT Studio:
1. Agente IA para WhatsApp — responde, califica y agenda prospectos automáticamente 24/7
2. Chatbot IA para sitios web — convierte visitantes en clientes
3. Sistema de calificación de leads — filtra y prioriza prospectos automáticamente
4. Automatización de seguimiento — emails, WhatsApp y CRM en piloto automático
5. Dashboard con IA — reportes y análisis automáticos de tu negocio
6. Páginas web premium — Next.js, diseño editorial, conversión optimizada

Precios aproximados (menciónalos si preguntan):
- Chatbot básico: desde $8,000 MXN
- Agente WhatsApp IA: desde $12,000 MXN
- Sistema completo web + IA: desde $25,000 MXN
- Mantenimiento mensual: desde $3,500 MXN

Casos de éxito reales:
- Clínica Lumina: +280% agendamientos en 60 días
- Apex Gym: +190% conversión de leads
- Nexo Propiedades: +420% consultas calificadas

Al final de cada respuesta, si el cliente muestra interés, sugiere agendar una llamada de 30 minutos sin costo.

Responde siempre en máximo 3-4 oraciones cortas y directas. Nunca uses listas largas ni respuestas genéricas.`

export default function SoftwareIA() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: '¡Hola! Soy el asistente de VANT Studio. Cuéntame sobre tu negocio — ¿qué tipo de empresa tienes y qué proceso te gustaría automatizar?'
    }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [started, setStarted] = useState(false)
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
      setMessages(prev => [...prev, { role: 'assistant', content: 'Hubo un error. Por favor intenta de nuevo.' }])
    } finally {
      setLoading(false)
    }
  }

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage() }
  }

  const suggestions = [
    '¿Qué puede hacer la IA por mi negocio?',
    '¿Cómo funciona WhatsApp con IA?',
    '¿Cuánto cuesta implementar un chatbot?',
    '¿Qué resultados han tenido sus clientes?',
  ]

  const s = {
    black: '#090909', white: '#f0ede8', white2: '#b8b4ac',
    gray: '#4a4744', gray2: '#2a2826',
  }

  return (
    <main style={{ background: s.black, minHeight: '100vh', overflowX: 'hidden' }}>

      {/* NAV */}
      <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 'clamp(16px,3vw,24px) clamp(20px,5vw,56px)', background: 'rgba(9,9,9,0.92)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(240,237,232,0.05)' }}>
        <Link href="/" style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '12px', fontWeight: 500, letterSpacing: '5px', color: s.white, textTransform: 'uppercase', textDecoration: 'none' }}>
          V A N T
        </Link>
        <Link href="/" style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '10px', letterSpacing: '2px', color: s.white2, textDecoration: 'none', textTransform: 'uppercase' }}>
          ← Volver
        </Link>
      </nav>

      {/* HERO */}
      <div style={{ padding: 'clamp(110px,14vw,150px) clamp(20px,5vw,56px) clamp(40px,5vw,60px)', borderBottom: '1px solid rgba(240,237,232,0.05)', opacity: started ? 1 : 0, transform: started ? 'translateY(0)' : 'translateY(20px)', transition: 'opacity .8s, transform .8s' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', fontFamily: "'DM Sans',sans-serif", fontSize: '10px', letterSpacing: '3px', color: s.white2, textTransform: 'uppercase', marginBottom: '24px' }}>
          <span style={{ display: 'block', width: '36px', height: '1px', background: s.white2, flexShrink: 0 }} />
          02 · Software IA
        </div>
        <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(40px,6vw,80px)', fontWeight: 300, letterSpacing: '-2px', lineHeight: .93, color: s.white, maxWidth: '800px' }}>
          Así trabaja la IA<br /><em style={{ fontStyle: 'italic', color: s.white2 }}>para tu negocio.</em>
        </h1>
        <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 'clamp(13px,1.5vw,15px)', color: s.gray, lineHeight: 1.8, marginTop: '24px', maxWidth: '480px', fontWeight: 300 }}>
          Habla con nuestro agente IA ahora mismo. Él te explica exactamente qué automatizar en tu empresa y cómo.
        </p>
      </div>

      {/* CHAT + INFO */}
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1.4fr) minmax(0,1fr)', gap: '1px', background: 'rgba(240,237,232,0.05)', minHeight: '600px' }} className="chat-grid">

        {/* CHAT */}
        <div style={{ background: s.black, display: 'flex', flexDirection: 'column', height: 'clamp(500px,70vh,700px)' }}>
          {/* Chat header */}
          <div style={{ padding: '20px clamp(20px,4vw,40px)', borderBottom: '1px solid rgba(240,237,232,0.05)', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ position: 'relative' }}>
              <div style={{ width: '36px', height: '36px', background: 'rgba(240,237,232,0.06)', border: '1px solid rgba(240,237,232,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Cormorant Garamond',serif", fontSize: '16px', fontWeight: 300, color: s.white }}>
                Ō
              </div>
              <div style={{ position: 'absolute', bottom: '2px', right: '2px', width: '7px', height: '7px', background: '#4ade80', borderRadius: '50%', border: `1px solid ${s.black}` }} />
            </div>
            <div>
              <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '12px', fontWeight: 500, color: s.white }}>Agente VANT Studio</div>
              <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '10px', color: '#4ade80', letterSpacing: '1px' }}>● En línea ahora</div>
            </div>
          </div>

          {/* Messages */}
          <div style={{ flex: 1, overflowY: 'auto', padding: 'clamp(16px,3vw,28px) clamp(20px,4vw,40px)', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {messages.map((msg, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start' }}>
                <div style={{
                  maxWidth: '80%',
                  padding: '12px 16px',
                  background: msg.role === 'user' ? 'rgba(240,237,232,0.08)' : 'rgba(240,237,232,0.04)',
                  border: `1px solid ${msg.role === 'user' ? 'rgba(240,237,232,0.12)' : 'rgba(240,237,232,0.06)'}`,
                  borderRadius: msg.role === 'user' ? '12px 12px 2px 12px' : '12px 12px 12px 2px',
                  fontFamily: "'DM Sans',sans-serif", fontSize: '13px',
                  color: msg.role === 'user' ? s.white : s.white2,
                  lineHeight: 1.6, fontWeight: 300,
                }}>
                  {msg.content}
                </div>
              </div>
            ))}
            {loading && (
              <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                <div style={{ padding: '12px 16px', background: 'rgba(240,237,232,0.04)', border: '1px solid rgba(240,237,232,0.06)', borderRadius: '12px 12px 12px 2px', display: 'flex', gap: '4px', alignItems: 'center' }}>
                  {[0,1,2].map(j => (
                    <div key={j} style={{ width: '6px', height: '6px', background: s.gray, borderRadius: '50%', animation: `bounce 1s ${j * 0.15}s infinite` }} />
                  ))}
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Suggestions */}
          {messages.length <= 1 && (
            <div style={{ padding: '0 clamp(20px,4vw,40px) 12px', display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {suggestions.map(s2 => (
                <button key={s2} onClick={() => { setInput(s2); inputRef.current?.focus() }} style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '11px', color: s.gray, background: 'transparent', border: '1px solid rgba(240,237,232,0.07)', padding: '6px 12px', cursor: 'pointer', borderRadius: '100px', transition: 'border-color .2s, color .2s', whiteSpace: 'nowrap' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(240,237,232,0.2)'; e.currentTarget.style.color = s.white2 }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(240,237,232,0.07)'; e.currentTarget.style.color = s.gray }}
                >
                  {s2}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div style={{ padding: 'clamp(12px,2vw,20px) clamp(20px,4vw,40px)', borderTop: '1px solid rgba(240,237,232,0.05)', display: 'flex', gap: '12px', alignItems: 'center' }}>
            <input
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder="Escribe tu pregunta..."
              style={{ flex: 1, background: 'rgba(240,237,232,0.04)', border: '1px solid rgba(240,237,232,0.08)', color: s.white, fontFamily: "'DM Sans',sans-serif", fontSize: '13px', padding: '12px 16px', outline: 'none', borderRadius: '100px', transition: 'border-color .2s' }}
              onFocus={e => (e.target.style.borderColor = 'rgba(240,237,232,0.2)')}
              onBlur={e => (e.target.style.borderColor = 'rgba(240,237,232,0.08)')}
            />
            <button onClick={sendMessage} disabled={loading || !input.trim()} style={{ width: '44px', height: '44px', borderRadius: '50%', background: input.trim() ? 'rgba(240,237,232,0.9)' : 'rgba(240,237,232,0.06)', border: '1px solid rgba(240,237,232,0.1)', color: input.trim() ? s.black : s.gray, fontSize: '16px', cursor: input.trim() ? 'pointer' : 'default', transition: 'all .2s', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              →
            </button>
          </div>
        </div>

        {/* INFO PANEL */}
        <div style={{ background: '#0a0a0a', padding: 'clamp(24px,4vw,48px) clamp(20px,4vw,40px)', display: 'flex', flexDirection: 'column', gap: '40px' }}>
          <div>
            <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '10px', letterSpacing: '3px', color: s.white2, textTransform: 'uppercase', marginBottom: '20px' }}>Lo que automatizamos</div>
            {[
              { icon: '◈', title: 'Agente WhatsApp IA', desc: 'Responde, califica y agenda prospectos 24/7 sin intervención humana.' },
              { icon: '⬡', title: 'Chatbot para tu web', desc: 'Convierte visitantes en clientes desde el primer mensaje.' },
              { icon: '↗', title: 'Calificación de leads', desc: 'Filtra y prioriza automáticamente quién sí quiere comprar.' },
              { icon: '◇', title: 'Seguimiento automático', desc: 'Emails, WhatsApp y CRM en piloto automático.' },
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: '16px', padding: '16px 0', borderBottom: '1px solid rgba(240,237,232,0.05)' }}>
                <span style={{ fontSize: '16px', color: s.white2, flexShrink: 0, marginTop: '2px' }}>{item.icon}</span>
                <div>
                  <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '18px', fontWeight: 300, color: s.white, marginBottom: '4px' }}>{item.title}</div>
                  <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '12px', color: s.gray, lineHeight: 1.6 }}>{item.desc}</div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ background: 'rgba(240,237,232,0.03)', border: '1px solid rgba(240,237,232,0.07)', padding: '24px' }}>
            <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '10px', letterSpacing: '2px', color: s.gray, textTransform: 'uppercase', marginBottom: '12px' }}>Resultados reales</div>
            {[
              { name: 'Clínica Lumina', result: '+280% agendamientos' },
              { name: 'Apex Gym', result: '+190% conversión' },
              { name: 'Nexo Propiedades', result: '+420% consultas' },
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: i < 2 ? '1px solid rgba(240,237,232,0.05)' : 'none' }}>
                <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '11px', color: s.gray }}>{item.name}</span>
                <span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '16px', fontWeight: 300, color: s.white2 }}>{item.result}</span>
              </div>
            ))}
          </div>

          <a href="#" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', background: 'rgba(240,237,232,0.07)', border: '1px solid rgba(240,237,232,0.12)', color: s.white, fontFamily: "'DM Sans',sans-serif", fontSize: '12px', padding: '16px 28px', borderRadius: '100px', textDecoration: 'none', transition: 'background .2s', textAlign: 'center' }}
          onMouseEnter={e => (e.currentTarget.style.background = 'rgba(240,237,232,0.14)')}
          onMouseLeave={e => (e.currentTarget.style.background = 'rgba(240,237,232,0.07)')}
          >
            Agendar llamada gratuita →
          </a>
        </div>
      </div>

      <style>{`
        @keyframes bounce {
          0%,100%{transform:translateY(0);opacity:.4;}
          50%{transform:translateY(-4px);opacity:1;}
        }
        .chat-grid {
          grid-template-columns: minmax(0,1.4fr) minmax(0,1fr);
        }
        @media(max-width:768px){
          .chat-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </main>
  )
}
