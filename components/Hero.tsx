'use client'
import { useEffect, useRef, useState } from 'react'

function Sphere({ mouseX, mouseY }: { mouseX: number; mouseY: number }) {
  const size = 420
  const cx = size / 2
  const cy = size / 2
  const r = 160
  const nodes: {x:number;y:number;z:number}[] = []
  const count = 80
  for (let i = 0; i < count; i++) {
    const phi = Math.acos(-1 + (2 * i) / count)
    const theta = Math.sqrt(count * Math.PI) * phi
    const ox = Math.sin(phi) * Math.cos(theta)
    const oy = Math.sin(phi) * Math.sin(theta)
    const oz = Math.cos(phi)
    const rx = mouseX * 0.3
    const ry = mouseY * 0.3
    const cosRx = Math.cos(ry), sinRx = Math.sin(ry)
    const cosRy = Math.cos(rx), sinRy = Math.sin(rx)
    const y1 = oy * cosRx - oz * sinRx
    const z1 = oy * sinRx + oz * cosRx
    const x2 = ox * cosRy + z1 * sinRy
    const z2 = -ox * sinRy + z1 * cosRy
    nodes.push({ x: cx + x2 * r, y: cy + y1 * r, z: z2 })
  }
  nodes.sort((a, b) => a.z - b.z)
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ overflow: 'visible' }}>
      {nodes.map((n, i) => {
        const t = (n.z + 1) / 2
        const opacity = 0.08 + t * 0.55
        const nodeR = 1.2 + t * 1.8
        return <circle key={i} cx={n.x} cy={n.y} r={nodeR} fill="rgba(240,237,232,1)" opacity={opacity} />
      })}
    </svg>
  )
}

export default function Hero() {
  const [text1, setText1] = useState('')
  const [text2, setText2] = useState('')
  const [phase, setPhase] = useState(0)
  const [showSub, setShowSub] = useState(false)
  const [showBtn, setShowBtn] = useState(false)
  const [showSphere, setShowSphere] = useState(false)
  const [mouse, setMouse] = useState({ x: 0, y: 0 })
  const targetMouse = useRef({ x: 0, y: 0 })
  const currentMouse = useRef({ x: 0, y: 0 })
  const rafRef = useRef<number>(0)

  const line1 = 'Hechos para'
  const line2 = 'ascender.'

  useEffect(() => {
    setTimeout(() => setShowSphere(true), 600)
    setTimeout(() => setPhase(1), 400)
  }, [])

  useEffect(() => {
    if (phase === 1) {
      let i = 0
      const t = setInterval(() => {
        i++
        setText1(line1.slice(0, i))
        if (i >= line1.length) { clearInterval(t); setTimeout(() => setPhase(2), 200) }
      }, 60)
      return () => clearInterval(t)
    }
    if (phase === 2) {
      let i = 0
      const t = setInterval(() => {
        i++
        setText2(line2.slice(0, i))
        if (i >= line2.length) {
          clearInterval(t)
          setTimeout(() => setShowSub(true), 100)
          setTimeout(() => setShowBtn(true), 400)
        }
      }, 60)
      return () => clearInterval(t)
    }
  }, [phase])

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      targetMouse.current = {
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      }
    }
    window.addEventListener('mousemove', handleMove)
    const animate = () => {
      currentMouse.current.x += (targetMouse.current.x - currentMouse.current.x) * 0.04
      currentMouse.current.y += (targetMouse.current.y - currentMouse.current.y) * 0.04
      setMouse({ x: currentMouse.current.x, y: currentMouse.current.y })
      rafRef.current = requestAnimationFrame(animate)
    }
    rafRef.current = requestAnimationFrame(animate)
    return () => {
      window.removeEventListener('mousemove', handleMove)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', padding: '0 clamp(20px,5vw,56px)', position: 'relative', overflow: 'hidden' }}>

      <div style={{ flex: 1, maxWidth: '680px', paddingTop: '80px', zIndex: 2, position: 'relative' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', fontFamily: "'DM Sans', sans-serif", fontSize: '10px', letterSpacing: '3px', color: 'var(--white2)', textTransform: 'uppercase', marginBottom: '44px', opacity: phase > 0 ? 1 : 0, transform: phase > 0 ? 'translateY(0)' : 'translateY(16px)', transition: 'opacity 0.8s 0.3s, transform 0.8s 0.3s' }}>
          <span style={{ display: 'block', height: '1px', background: 'var(--white2)', width: phase > 0 ? '36px' : '0px', transition: 'width 1s 0.5s', flexShrink: 0 }} />
          Un studio nativo en IA
        </div>

        <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(56px,8vw,108px)', fontWeight: 300, lineHeight: 0.93, letterSpacing: '-2px', color: 'var(--white)', minHeight: '1.9em' }}>
          {text1}<br />
          <em style={{ fontStyle: 'italic' }}>{text2}</em>
          {phase < 2 || text2.length < line2.length ? <span className="tw-cursor" /> : null}
        </h1>

        <p style={{ maxWidth: '420px', color: 'var(--white2)', fontSize: 'clamp(13px,2vw,15px)', lineHeight: 1.8, marginTop: '36px', fontWeight: 300, fontFamily: "'DM Sans', sans-serif", opacity: showSub ? 1 : 0, transform: showSub ? 'translateY(0)' : 'translateY(20px)', transition: 'opacity 0.8s, transform 0.8s' }}>
          Un studio <strong style={{ color: 'var(--white)', fontWeight: 400 }}>nativo en IA</strong> que construye plataformas web y sistemas inteligentes sobre el stack de frontera.
        </p>

        <a href="https://wa.me/523312499320?text=Hola%20ORBIT" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', background: 'rgba(240,237,232,0.07)', border: '1px solid rgba(240,237,232,0.12)', color: 'var(--white)', fontFamily: "'DM Sans', sans-serif", fontSize: '12px', padding: '15px 28px', marginTop: '44px', borderRadius: '100px', opacity: showBtn ? 1 : 0, transform: showBtn ? 'translateY(0)' : 'translateY(16px)', transition: 'opacity 0.8s, transform 0.8s', textDecoration: 'none' }}>
          Iniciar proyecto
        </a>
      </div>

      <div className="sphere-wrap" style={{ opacity: showSphere ? 1 : 0, transition: 'opacity 1.5s 0.5s' }}>
        <Sphere mouseX={mouse.x} mouseY={mouse.y} />
      </div>

      <style>{`
        .tw-cursor { display: inline-block; width: 2px; height: 0.85em; background: var(--white); margin-left: 4px; vertical-align: middle; animation: blink 1s step-end infinite; }
        @keyframes blink { 0%,100%{opacity:1;} 50%{opacity:0;} }
        .sphere-wrap { position: absolute; right: clamp(-60px, -2vw, -20px); top: 50%; transform: translateY(-50%); pointer-events: none; }
        @media(max-width:768px) { .sphere-wrap { display: none; } }
      `}</style>
    </div>
  )
}
