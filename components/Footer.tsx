'use client'

export default function Footer() {
  return (
    <>
      <footer style={{
        padding: 'clamp(24px, 4vw, 36px) clamp(20px, 5vw, 56px)',
        borderTop: '1px solid rgba(240,237,232,0.05)',
      }}>
        <div className="footer-inner">
          <div style={{
            fontFamily: "'DM Sans',sans-serif",
            fontSize: '11px', fontWeight: 400,
            letterSpacing: '5px', textTransform: 'uppercase',
            color: 'var(--white2)',
          }}>
            Ō R B I T
          </div>

          <div className="footer-links">
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
            fontSize: '10px', color: 'var(--gray2)',
            letterSpacing: '1px', fontFamily: "'DM Sans',sans-serif",
          }}>
            © 2025 ŌRBIT
          </div>
        </div>
      </footer>

      <style>{`
        .footer-inner {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 24px;
        }
        .footer-links {
          display: flex;
          gap: 24px;
          flex-wrap: wrap;
          justify-content: center;
        }
        @media (max-width: 768px) {
          .footer-inner {
            flex-direction: column;
            align-items: flex-start;
            gap: 20px;
          }
          .footer-links {
            justify-content: flex-start;
            gap: 16px;
          }
        }
      `}</style>
    </>
  )
}
