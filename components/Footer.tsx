'use client'

export default function Footer() {
  return (
    <footer style={{
      padding: '36px 56px',
      borderTop: '1px solid rgba(240,237,232,0.05)',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    }}>
      <div style={{
        fontFamily: "'DM Sans',sans-serif",
        fontSize: '11px', fontWeight: 400,
        letterSpacing: '5px', textTransform: 'uppercase',
        color: 'var(--white2)',
      }}>
        Ō R B I T
      </div>

      <div style={{ display: 'flex', gap: '24px' }}>
        {['Instagram', 'LinkedIn', 'hola@orbit.mx', 'Guadalajara, México'].map(link => (
          <a key={link} href="#" style={{
            fontSize: '10px', letterSpacing: '2px',
            textTransform: 'uppercase', color: 'var(--gray)',
            textDecoration: 'none', fontFamily: "'DM Sans',sans-serif",
            transition: 'color 0.2s',
          }}
          onMouseEnter={e => (e.currentTarget.style.color = 'var(--white2)')}
          onMouseLeave={e => (e.currentTarget.style.color = 'var(--gray)')}
          >
            {link}
          </a>
        ))}
      </div>

      <div style={{
        fontSize: '10px', color: '#2a2826',
        letterSpacing: '1px', fontFamily: "'DM Sans',sans-serif",
      }}>
        © 2025 ŌRBIT. Todos los derechos reservados.
      </div>
    </footer>
  )
}
