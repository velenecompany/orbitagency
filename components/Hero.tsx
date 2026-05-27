'use client'
import { useEffect, useState } from 'react'

function useTypewriter(lines:{text:string;italic?:boolean}[], speed:number, start:boolean) {
  const [displayed, setDisplayed] = useState<{text:string;italic?:boolean}[]>([])
  const [currentLine, setCurrentLine] = useState(0)
  const [currentChar, setCurrentChar] = useState(0)
  const [done, setDone] = useState(false)

  useEffect(() => {
    if (!start || currentLine >= lines.length) {
      if (currentLine >= lines.length) setDone(true)
      return
    }
    const line = lines[currentLine]
    if (currentChar < line.text.length) {
      const timeout = setTimeout(() => {
        setDisplayed(prev => {
          const updated = [...prev]
          if (!updated[currentLine]) updated[currentLine] = { text: '', italic: line.italic }
          updated[currentLine] = { ...updated[currentLine], text: updated[currentLine].text + line.text[currentChar] }
          return updated
        })
        setCurrentChar(c => c + 1)
      }, speed + Math.random() * speed * 0.35)
      return () => clearTimeout(timeout)
    } else {
      const timeout = setTimeout(() => {
        setCurrentLine(l => l + 1)
        setCurrentChar(0)
      }, speed * 4)
      return () => clearTimeout(timeout)
    }
  }, [start, currentLine, currentChar, lines, speed])

  return { displayed, done }
}

export default function Hero() {
  const [started, setStarted] = useState(false)
  const [showSub, setShowSub] = useState(false)
  const [showBtn, setShowBtn] = useState(false)
  const [showVideo, setShowVideo] = useState(false)

  const lines = [
    { text: 'Hechos para' },
    { text: 'ascender.', italic: true },
  ]

  const { displayed, done } = useTypewriter(lines, 52, started)

  useEffect(() => {
    const t1 = setTimeout(() => setStarted(true), 400)
    const t2 = setTimeout(() => setShowVideo(true), 300)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])

  useEffect(() => {
    if (done) {
      setTimeout(() => setShowSub(true), 100)
      setTimeout(() => setShowBtn(true), 400)
    }
  }, [done])

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', padding: '0 clamp(20px,5vw,56px)', position: 'relative', overflow: 'hidden' }}>

      <video autoPlay muted loop playsInline style={{ position: 'absolute', right: 0, top: 0, width: '55%', height: '100%', objectFit: 'cover', opacity: showVideo ? 0.6 : 0, transition: 'opacity 2s ease', zIndex: 0 }}>
        <source src="https://res.cloudinary.com/dzepodq0d/video/upload/v1779908059/kling_20260528_%E4%BD%9C%E5%93%81_Ultra_cine_715_0_hxpnae.mp4" type="video/mp4" />
      </video>

      <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '60%', background: 'linear-gradient(90deg, #090909 40%, transparent 100%)', zIndex: 1, pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: '40%', background: 'linear-gradient(0deg, #090909 0%, transparent 100%)', zIndex: 1, pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', left: 0, right: 0, top: 0, height: '20%', background: 'linear-gradient(180deg, #090909 0%, transparent 100%)', zIndex: 1, pointerEvents: 'none' }} />

      <div style={{ flex: 1, maxWidth: '680px', paddingTop: '80px', zIndex: 2, position: 'relative' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', fontFamily: "'DM Sans', sans-serif", fontSize: '10px', letterSpacing: '3px', color: 'var(--white2)', textTransform: 'uppercase', marginBottom: '44px', opacity: started ? 1 : 0, transform: started ? 'translateY(0)' : 'translateY(16px)', transition: 'opacity 0.8s 0.3s, transform 0.8s 0.3s' }}>
          <span style={{ display: 'block', height: '1px', background: 'var(--white2)', width: started ? '36px' : '0px', transition: 'width 1s 0.5s', flexShrink: 0 }} />
          Un studio nativo en IA
        </div>

        <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(56px,8vw,108px)', fontWeight: 300, lineHeight: 0.93, letterSpacing: '-2px', color: 'var(--white)', minHeight: '1.9em' }}>
          {displayed.map((line, i) => (
            <span key={i}>
              {i > 0 && <br />}
              <span style={{ fontStyle: line.italic ? 'italic' : 'normal' }}>{line.text}</span>
            </span>
          ))}
          {!done && <span className="tw-cursor" />}
        </h1>

        <p style={{ maxWidth: '420px', color: 'var(--white2)', fontSize: 'clamp(13px,2vw,15px)', lineHeight: 1.8, marginTop: '36px', fontWeight: 300, fontFamily: "'DM Sans', sans-serif", opacity: showSub ? 1 : 0, transform: showSub ? 'translateY(0)' : 'translateY(20px)', transition: 'opacity 0.8s, transform 0.8s' }}>
          Un studio <strong style={{ color: 'var(--white)', fontWeight: 400 }}>nativo en IA</strong> que construye plataformas web y sistemas inteligentes sobre el stack de frontera.
        </p>

        <a href="https://wa.me/523312499320?text=Hola%20ORBIT" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', background: 'rgba(240,237,232,0.07)', border: '1px solid rgba(240,237,232,0.12)', color: 'var(--white)', fontFamily: "'DM Sans', sans-serif", fontSize: '12px', padding: '15px 28px', marginTop: '44px', borderRadius: '100px', opacity: showBtn ? 1 : 0, transform: showBtn ? 'translateY(0)' : 'translateY(16px)', transition: 'opacity 0.8s, transform 0.8s', textDecoration: 'none' }}>
          Iniciar proyecto
        </a>
      </div>

      <style>{`
        .tw-cursor { display: inline-block; width: 2px; height: 0.85em; background: var(--white); margin-left: 4px; vertical-align: middle; animation: blink 1s step-end infinite; }
        @keyframes blink { 0%,100%{opacity:1;} 50%{opacity:0;} }
        @media(max-width:768px) { video { width: 100% !important; opacity: 0.3 !important; } }
      `}</style>
    </div>
  )
}
