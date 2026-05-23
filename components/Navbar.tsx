'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'

const navItems = [
  { label: 'Proyectos', href: '/proyectos' },
  { label: 'Software IA', href: '/software-ia' },
  { label: 'Servicios', href: '/servicios' },
  { label: 'Contacto', href: '#cta' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: 'clamp(16px, 3vw, 24px) clamp(20px, 5vw, 56px)',
        background: scrolled || menuOpen ? 'rgba(9,9,9,0.95)' : 'rgba(9,9,9,0)',
        backdropFilter: scrolled || menuOpen ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(240,237,232,0.05)' : 'none',
        transition: 'background 0.4s, border 0.4s',
      }}>
        <Link href="/" style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: '12px', fontWeight: 500,
          letterSpacing: '5px', color: 'var(--white)',
          textTransform: 'uppercase', textDecoration: 'none',
        }}>
          Ō R B I T
        </Link>

        {/* Desktop links */}
        <ul style={{ display: 'flex', gap: '36px', listStyle: 'none' }} className="nav-desktop">
          {navItems.map(item => (
            <li key={item.label}>
              <Link href={item.href} style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '10px', fontWeight: 400,
                letterSpacing: '2.5px', color: 'var(--white2)',
                textDecoration: 'none', textTransform: 'uppercase',
                transition: 'color 0.2s',
              }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--white)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--white2)')}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <button className="nav-desktop" style={{
          background: 'rgba(240,237,232,0.08)',
          border: '1px solid rgba(240,237,232,0.14)',
          color: 'var(--white)', fontFamily: "'DM Sans', sans-serif",
          fontSize: '11px', letterSpacing: '1px',
          padding: '11px 22px', cursor: 'pointer',
          borderRadius: '100px', transition: 'background 0.2s',
        }}
        onMouseEnter={e => (e.currentTarget.style.background = 'rgba(240,237,232,0.15)')}
        onMouseLeave={e => (e.currentTarget.style.background = 'rgba(240,237,232,0.08)')}
        >
          Agendar llamada →
        </button>

        {/* Mobile hamburger */}
        <button
          className="nav-mobile"
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            background: 'none', border: 'none', cursor: 'pointer',
            display: 'flex', flexDirection: 'column', gap: '5px', padding: '4px',
          }}
        >
          <span style={{ display: 'block', width: '22px', height: '1px', background: 'var(--white)', transform: menuOpen ? 'rotate(45deg) translate(4px, 4px)' : 'none', transition: 'transform 0.3s' }} />
          <span style={{ display: 'block', width: '22px', height: '1px', background: 'var(--white)', opacity: menuOpen ? 0 : 1, transition: 'opacity 0.3s' }} />
          <span style={{ display: 'block', width: '22px', height: '1px', background: 'var(--white)', transform: menuOpen ? 'rotate(-45deg) translate(4px, -4px)' : 'none', transition: 'transform 0.3s' }} />
        </button>
      </nav>

      {/* Mobile menu */}
      <div style={{
        position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
        background: 'rgba(9,9,9,0.98)', zIndex: 190,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', gap: '40px',
        opacity: menuOpen ? 1 : 0,
        pointerEvents: menuOpen ? 'all' : 'none',
        transition: 'opacity 0.4s',
      }}>
        {navItems.map((item, i) => (
          <Link key={item.label} href={item.href}
            onClick={() => setMenuOpen(false)}
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: '40px', fontWeight: 300,
              letterSpacing: '-1px', color: 'var(--white)',
              textDecoration: 'none',
              opacity: menuOpen ? 1 : 0,
              transform: menuOpen ? 'translateY(0)' : 'translateY(20px)',
              transition: `opacity 0.4s ${i * 0.07}s, transform 0.4s ${i * 0.07}s`,
            }}
          >
            {item.label}
          </Link>
        ))}
        <button style={{
          background: 'rgba(240,237,232,0.08)',
          border: '1px solid rgba(240,237,232,0.14)',
          color: 'var(--white)', fontFamily: "'DM Sans', sans-serif",
          fontSize: '12px', letterSpacing: '1px',
          padding: '14px 28px', cursor: 'pointer',
          borderRadius: '100px', marginTop: '16px',
          opacity: menuOpen ? 1 : 0,
          transition: 'opacity 0.4s 0.28s',
        }}>
          Agendar llamada →
        </button>
      </div>

      <style>{`
        .nav-desktop { display: flex; }
        .nav-mobile { display: none; }
        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
          .nav-mobile { display: flex !important; }
        }
      `}</style>
    </>
  )
}
