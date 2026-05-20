'use client'
import { useEffect, useState } from 'react'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '24px 56px',
      background: scrolled ? 'rgba(9,9,9,0.92)' : 'rgba(9,9,9,0)',
      backdropFilter: scrolled ? 'blur(20px)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(240,237,232,0.05)' : 'none',
      transition: 'background 0.4s, border 0.4s',
    }}>
      <div style={{
        fontFamily: "'DM Sans', sans-serif",
        fontSize: '12px', fontWeight: 500,
        letterSpacing: '5px', color: 'var(--white)',
        textTransform: 'uppercase',
      }}>
        Ō R B I T
      </div>

      <ul style={{ display: 'flex', gap: '36px', listStyle: 'none' }}>
        {['Proyectos', 'Software IA', 'Servicios', 'Contacto'].map((item) => (
          <li key={item}>
            <a href="#" style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '10px', fontWeight: 400,
              letterSpacing: '2.5px', color: 'var(--white2)',
              textDecoration: 'none', textTransform: 'uppercase',
              transition: 'color 0.2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--white)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--white2)')}
            >
              {item}
            </a>
          </li>
        ))}
      </ul>

      <button style={{
        background: 'rgba(240,237,232,0.08)',
        border: '1px solid rgba(240,237,232,0.14)',
        color: 'var(--white)',
        fontFamily: "'DM Sans', sans-serif",
        fontSize: '11px', letterSpacing: '1px',
        padding: '11px 22px', cursor: 'pointer',
        borderRadius: '100px', transition: 'background 0.2s',
      }}
      onMouseEnter={e => (e.currentTarget.style.background = 'rgba(240,237,232,0.15)')}
      onMouseLeave={e => (e.currentTarget.style.background = 'rgba(240,237,232,0.08)')}
      >
        Agendar llamada →
      </button>
    </nav>
  )
}
