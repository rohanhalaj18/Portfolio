import React from 'react';

const Footer = () => {
  return (
    <footer style={{
      padding: '3rem 2rem',
      borderTop: '1px solid rgba(255,255,255,0.03)',
      background: 'var(--bg-void)',
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '1rem',
      }}>
        <div>
          <div style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.2rem',
            color: '#fff',
            letterSpacing: '0.1em',
            marginBottom: '0.25rem',
          }}>
            ROHAN<span style={{ color: 'var(--crimson)' }}>.</span>
          </div>
          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.5rem',
            color: 'var(--fog)',
            letterSpacing: '0.2em',
          }}>
            EVERY WISH HAS A PRICE
          </div>
        </div>

        <div style={{
          display: 'flex',
          gap: '2rem',
        }}>
          {['GITHUB', 'LINKEDIN', 'TWITTER'].map(link => {
            let href = '#';
            if (link === 'GITHUB') href = 'https://github.com/rohanhalaj18';
            else if (link === 'LINKEDIN') href = "https://www.linkedin.com/in/rohan-halaj";
            else if (link === 'TWITTER') href = 'https://twitter.com/rohanhalaj18';
            return (
              <a key={link} href={href} target="_blank" rel="noreferrer" style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.55rem',
                letterSpacing: '0.2em',
                color: 'var(--fog)',
                transition: 'color 0.3s',
              }}
                data-hover
                onMouseEnter={(e) => e.target.style.color = 'var(--crimson)'}
                onMouseLeave={(e) => e.target.style.color = 'var(--fog)'}
              >
                {link}
              </a>
            );
          })}
        </div>

        <div style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.5rem',
          color: 'rgba(255,255,255,0.1)',
          letterSpacing: '0.15em',
        }}>
          © {new Date().getFullYear()} — ALL CASES CLASSIFIED
        </div>
      </div>
    </footer>
  );
};

export default Footer;
