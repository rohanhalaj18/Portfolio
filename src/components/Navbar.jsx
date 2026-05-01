import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const navLinks = [
  { label: 'THE MIND', href: '#about' },
  { label: 'CONSEQUENCES', href: '#projects' },
  { label: 'ABILITIES', href: '#skills' },
  { label: 'VICTORIES', href: '#hackathons' },
  { label: 'MAKE A WISH', href: '#contact' },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 3.5, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          padding: scrolled ? '0.75rem 1.5rem' : '1.25rem 1.5rem',
          transition: 'padding 0.5s var(--ease-dramatic)',
        }}
      >
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0.75rem 1.5rem',
          borderRadius: '4px',
          background: scrolled ? 'rgba(10,10,10,0.85)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          border: scrolled ? '1px solid rgba(220,38,38,0.1)' : '1px solid transparent',
          transition: 'all 0.5s var(--ease-dramatic)',
        }}>
          {/* Logo */}
          <a href="#" style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.5rem',
            color: '#fff',
            letterSpacing: '0.1em',
            display: 'flex',
            alignItems: 'center',
            gap: '0.25rem',
          }}>
            ROHAN
            <span style={{
              color: 'var(--crimson)',
              fontSize: '2rem',
              lineHeight: 0,
              marginTop: '-2px',
            }}>.</span>
          </a>

          {/* Desktop Links */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '2rem',
          }}
            className="nav-desktop"
          >
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.65rem',
                  letterSpacing: '0.2em',
                  color: 'var(--smoke)',
                  transition: 'color 0.3s',
                  position: 'relative',
                }}
                onMouseEnter={(e) => e.target.style.color = 'var(--crimson)'}
                onMouseLeave={(e) => e.target.style.color = 'var(--smoke)'}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Mobile hamburger */}
          <button
            className="nav-mobile-btn"
            onClick={() => setMobileOpen(!mobileOpen)}
            style={{
              display: 'none',
              flexDirection: 'column',
              gap: '5px',
              background: 'none',
              border: 'none',
              padding: '8px',
            }}
          >
            <span style={{
              width: '22px', height: '2px', background: '#fff', display: 'block',
              transform: mobileOpen ? 'rotate(45deg) translate(4px, 4px)' : 'none',
              transition: 'transform 0.3s',
            }} />
            <span style={{
              width: '22px', height: '2px', background: '#fff', display: 'block',
              opacity: mobileOpen ? 0 : 1, transition: 'opacity 0.3s',
            }} />
            <span style={{
              width: '16px', height: '2px', background: 'var(--crimson)', display: 'block',
              transform: mobileOpen ? 'rotate(-45deg) translate(4px, -4px)' : 'none',
              transition: 'transform 0.3s',
            }} />
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 999,
        background: 'rgba(10,10,10,0.97)',
        backdropFilter: 'blur(20px)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '2rem',
        opacity: mobileOpen ? 1 : 0,
        pointerEvents: mobileOpen ? 'auto' : 'none',
        transition: 'opacity 0.4s ease',
      }}>
        {navLinks.map((link, i) => (
          <a
            key={link.label}
            href={link.href}
            onClick={() => setMobileOpen(false)}
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '2rem',
              letterSpacing: '0.15em',
              color: '#fff',
              transition: 'color 0.3s',
            }}
            onMouseEnter={(e) => e.target.style.color = 'var(--crimson)'}
            onMouseLeave={(e) => e.target.style.color = '#fff'}
          >
            {link.label}
          </a>
        ))}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
          .nav-mobile-btn { display: flex !important; }
        }
      `}</style>
    </>
  );
};

export default Navbar;
