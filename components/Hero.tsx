'use client'
import { useEffect, useRef, useState } from 'react'

function useTypewriter(lines: { text: string; italic?: boolean }[], speed: number, start: boolean) {
  const [displayed, setDisplayed] = useState<{ text: string; italic?: boolean }[]>([])
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
  const [showSphere, setShowSphere] = useState(false)
  const svgRef = useRef<SVGGElement>(null)
  const sphereWrapRef = useRef<HTMLDivElement>(null)
  const animRef = useRef<number>(0)
  const mouseRef = useRef({ x: 0, y: 0 })
  const currentRef = useRef({ x: 0, y: 0 })

  const lines = [
    { text: 'Hechos para' },
    { text: 'ascender.', italic: true },
  ]

  const { displayed, done } = useTypewriter(lines, 52, started)

  useEffect(() => {
    const t1 = setTimeout(() => setStarted(true), 400)
    const t2 = setTimeout(() => setShowSphere(true), 500)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])

  useEffect(() => {
    if (done) {
      setTimeout(() => setShowSub(true), 100)
      setTimeout(() => setShowBtn(true), 400)
    }
  }, [done])

  // Generate sphere dots
  useEffect(() => {
    const g = svgRef.current
    if (!g) return
    g.innerHTML = ''
    const cx = 210, cy = 210, R = 195
    const cols = 24, rows = 24
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const x = 8 + c * (404 / cols)
        const y = 8 + r * (404 / rows)
        const dx = x - cx, dy = y - cy
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist > R) continue
        const norm = dist / R
        const hlx = cx - R * 0.35, hly = cy - R * 0.3
        const hdx = x - hlx, hdy = y - hly
        const hdist = Math.sqrt(hdx * hdx + hdy * hdy)
        const hNorm = Math.min(hdist / (R * 1.15), 1)
        const size = (1 - norm * 0.65) * (0.35 + (1 - hNorm) * 0.65) * 10 + 0.8
        const bright = Math.round(15 + (1 - hNorm) * 0.72 * 230 + (1 - norm) * 0.28 * 55)
        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle')
        circle.setAttribute('cx', x.toFixed(1))
        circle.setAttribute('cy', y.toFixed(1))
        circle.setAttribute('r', Math.max(0.7, size).toFixed(1))
        circle.setAttribute('fill', `rgb(${bright},${bright},${bright})`)
        g.appendChild(circle)
      }
    }
  }, [])

  // Mouse tracking + smooth follow animation
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const wrap = sphereWrapRef.current
      if (!wrap) return
      const rect = wrap.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      // Normalize -1 to 1 relative to center of sphere
      mouseRef.current = {
        x: (e.clientX - centerX) / (rect.width / 2),
        y: (e.clientY - centerY) / (rect.height / 2),
      }
    }

    const handleMouseLeave = () => {
      // Smoothly return to center
      mouseRef.current = { x: 0, y: 0 }
    }

    window.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseleave', handleMouseLeave)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  // Smooth lerp animation loop
  useEffect(() => {
    if (!showSphere) return

    function animate() {
      // Lerp current toward mouse target
      currentRef.current.x += (mouseRef.current.x - currentRef.current.x) * 0.06
      currentRef.current.y += (mouseRef.current.y - currentRef.current.y) * 0.06

      const svg = svgRef.current?.closest('svg') as SVGSVGElement | null
      if (svg) {
        const maxMove = 28
        const tx = currentRef.current.x * maxMove
        const ty = currentRef.current.y * maxMove
        const rotateY = currentRef.current.x * 18
        const rotateX = -currentRef.current.y * 12
        svg.style.transform = `translate(${tx}px, ${ty}px) rotateY(${rotateY}deg) rotateX(${rotateX}deg)`
      }

      animRef.current = requestAnimationFrame(animate)
    }

    animRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animRef.current)
  }, [showSphere])

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', padding: '0 56px', position: 'relative', overflow: 'hidden' }}>
      <div style={{ flex: 1, maxWidth: '750px', paddingTop: '80px', zIndex: 2 }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: '14px',
          fontFamily: "'DM Sans', sans-serif", fontSize: '10px',
          letterSpacing: '3px', color: 'var(--white2)',
          textTransform: 'uppercase', marginBottom: '44px',
          opacity: started ? 1 : 0,
          transform: started ? 'translateY(0)' : 'translateY(16px)',
          transition: 'opacity 0.8s 0.3s, transform 0.8s 0.3s',
        }}>
          <span style={{
            display: 'block', height: '1px', background: 'var(--white2)',
            width: started ? '36px' : '0px', transition: 'width 1s 0.5s',
          }} />
          Un studio nativo en IA
        </div>

        <h1 style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 'clamp(68px, 8vw, 108px)',
          fontWeight: 300, lineHeight: 0.93,
          letterSpacing: '-2px', color: 'var(--white)',
          minHeight: '2.3em',
        }}>
          {displayed.map((line, i) => (
            <span key={i}>
              {i > 0 && <br />}
              <span style={{ fontStyle: line.italic ? 'italic' : 'normal' }}>
                {line.text}
              </span>
            </span>
          ))}
          {!done && <span className="tw-cursor" />}
        </h1>

        <p style={{
          maxWidth: '420px', color: 'var(--white2)',
          fontSize: '15px', lineHeight: 1.8,
          marginTop: '36px', fontWeight: 300,
          fontFamily: "'DM Sans', sans-serif",
          opacity: showSub ? 1 : 0,
          transform: showSub ? 'translateY(0)' : 'translateY(20px)',
          transition: 'opacity 0.8s, transform 0.8s',
        }}>
          Un studio <strong style={{ color: 'var(--white)', fontWeight: 400 }}>nativo en IA</strong> que construye plataformas web y sistemas inteligentes sobre el stack de frontera.
        </p>

        <button style={{
          display: 'inline-flex', alignItems: 'center', gap: '10px',
          background: 'rgba(240,237,232,0.07)',
          border: '1px solid rgba(240,237,232,0.12)',
          color: 'var(--white)',
          fontFamily: "'DM Sans', sans-serif",
          fontSize: '12px', padding: '15px 28px',
          marginTop: '44px', cursor: 'pointer',
          borderRadius: '100px',
          opacity: showBtn ? 1 : 0,
          transform: showBtn ? 'translateY(0)' : 'translateY(16px)',
          transition: 'opacity 0.8s, transform 0.8s, background 0.25s',
        }}
        onMouseEnter={e => (e.currentTarget.style.background = 'rgba(240,237,232,0.14)')}
        onMouseLeave={e => (e.currentTarget.style.background = 'rgba(240,237,232,0.07)')}
        >
          Iniciar proyecto →
        </button>
      </div>

      {/* Sphere con mouse tracking */}
      <div
        ref={sphereWrapRef}
        style={{
          position: 'absolute', right: 0, top: 0, bottom: 0, width: '46%',
          overflow: 'hidden', perspective: '800px',
        }}
      >
        <div style={{
          width: '100%', height: '100%',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          position: 'relative',
        }}>
          <div style={{
            position: 'absolute', left: 0, top: 0, bottom: 0, width: '240px',
            background: 'linear-gradient(90deg, var(--black) 0%, transparent 100%)', zIndex: 1,
          }} />
          <svg
            viewBox="0 0 420 420"
            style={{
              width: '420px', height: '420px',
              opacity: showSphere ? 1 : 0,
              transition: 'opacity 1.4s 0.4s',
              transformStyle: 'preserve-3d',
              willChange: 'transform',
            }}
          >
            <defs>
              <radialGradient id="sphGrad" cx="38%" cy="32%" r="62%">
                <stop offset="0%" stopColor="#fff" stopOpacity="1" />
                <stop offset="45%" stopColor="#999" stopOpacity="0.8" />
                <stop offset="80%" stopColor="#333" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#000" stopOpacity="0" />
              </radialGradient>
              <mask id="sphMask">
                <circle cx="210" cy="210" r="200" fill="url(#sphGrad)" />
              </mask>
            </defs>
            <g ref={svgRef} mask="url(#sphMask)" />
          </svg>
        </div>
      </div>
    </div>
  )
}
