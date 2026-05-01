import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import heroBg from '../assets/hero-bg.png';

const Hero = () => {
  const [typedText, setTypedText] = useState('');
  const fullText = 'GOT A WISH WORTH DYING FOR?';

  useEffect(() => {
    let i = 0;
    const startDelay = setTimeout(() => {
      const interval = setInterval(() => {
        if (i <= fullText.length) {
          setTypedText(fullText.slice(0, i));
          i++;
        } else {
          clearInterval(interval);
        }
      }, 80);
      return () => clearInterval(interval);
    }, 3800);
    return () => clearTimeout(startDelay);
  }, []);

  return (
    <section id="hero" style={{
      position: 'relative',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
    }}>
      {/* Background image */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: `url(${heroBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        filter: 'brightness(0.3) saturate(0.7)',
        transform: 'scale(1.05)',
      }} />

      {/* Red fog overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(180deg, rgba(10,10,10,0.4) 0%, rgba(69,10,10,0.3) 50%, rgba(10,10,10,0.95) 100%)',
      }} />

      {/* Rain effect */}
      <div style={{
        position: 'absolute',
        inset: '-20%',
        overflow: 'hidden',
        pointerEvents: 'none',
        transform: 'rotate(8deg)',
      }}>
        {Array.from({ length: 150 }).map((_, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * -100}%`,
              width: Math.random() > 0.8 ? '2px' : '1px',
              height: `${Math.random() * 100 + 50}px`,
              background: 'linear-gradient(180deg, transparent, rgba(200,200,200,0.3), transparent)',
              animation: `rainFall ${Math.random() * 1.0 + 0.5}s linear infinite`,
              animationDelay: `${Math.random() * 2}s`,
              opacity: Math.random() * 0.6 + 0.2,
            }}
          />
        ))}
      </div>

      {/* CCTV overlay elements */}
      <div style={{
        position: 'absolute',
        top: '20px',
        left: '20px',
        fontFamily: 'var(--font-mono)',
        fontSize: '0.55rem',
        color: 'var(--crimson-dim)',
        letterSpacing: '0.15em',
        opacity: 0.6,
      }}>
        <div>REC ● CAM-07</div>
        <div style={{ marginTop: '4px' }}>SECTOR: UNKNOWN</div>
      </div>

      <div style={{
        position: 'absolute',
        top: '20px',
        right: '20px',
        fontFamily: 'var(--font-mono)',
        fontSize: '0.55rem',
        color: 'var(--crimson-dim)',
        letterSpacing: '0.15em',
        opacity: 0.6,
        textAlign: 'right',
      }}>
        <CCTVTime />
      </div>

      {/* Center content */}
      <div style={{
        position: 'relative',
        zIndex: 10,
        textAlign: 'center',
        maxWidth: '900px',
        padding: '0 2rem',
      }}>
        {/* Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 4, duration: 0.8 }}
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.65rem',
            letterSpacing: '0.4em',
            color: 'var(--crimson)',
            marginBottom: '1.5rem',
            textTransform: 'uppercase',
          }}
        >
          [ CHAPTER I — THE WISH BEGINS : SUBJECT ROHAN ]
        </motion.div>

        {/* Main title */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 4.3, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(3.5rem, 10vw, 9rem)',
            color: '#fff',
            letterSpacing: '0.08em',
            lineHeight: 0.9,
            marginBottom: '1.5rem',
          }}
        >
          <span className="glitch-text" data-text="IF WISHES">IF WISHES</span>
          <br />
          <span style={{
            color: 'transparent',
            WebkitTextStroke: '2px var(--crimson)',
            display: 'block',
            marginTop: '0.1em',
          }}>
            COULD KILL
          </span>
        </motion.h1>

        {/* Typed tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 4.8, duration: 0.5 }}
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'clamp(0.85rem, 1.5vw, 1.1rem)',
            color: 'var(--smoke)',
            marginBottom: '3rem',
            minHeight: '1.5em',
          }}
        >
          <span>{typedText}</span>
          <span className="typing-cursor" />
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 5.3, duration: 0.8 }}
          style={{
            display: 'flex',
            gap: '1rem',
            justifyContent: 'center',
            flexWrap: 'wrap',
          }}
        >
          <a href="#projects" style={{
            padding: '0.9rem 2rem',
            background: 'var(--crimson)',
            color: '#fff',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.7rem',
            letterSpacing: '0.2em',
            border: 'none',
            borderRadius: '2px',
            transition: 'all 0.3s',
            boxShadow: '0 0 20px rgba(220,38,38,0.3)',
          }}
            data-hover
            onMouseEnter={(e) => {
              e.target.style.boxShadow = '0 0 40px rgba(220,38,38,0.5)';
              e.target.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.target.style.boxShadow = '0 0 20px rgba(220,38,38,0.3)';
              e.target.style.transform = 'translateY(0)';
            }}
          >
            VIEW THE CONSEQUENCES
          </a>
          <a href="#about" style={{
            padding: '0.9rem 2rem',
            background: 'transparent',
            color: 'var(--smoke)',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.7rem',
            letterSpacing: '0.2em',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '2px',
            transition: 'all 0.3s',
          }}
            data-hover
            onMouseEnter={(e) => {
              e.target.style.borderColor = 'var(--crimson)';
              e.target.style.color = 'var(--crimson)';
            }}
            onMouseLeave={(e) => {
              e.target.style.borderColor = 'rgba(255,255,255,0.1)';
              e.target.style.color = 'var(--smoke)';
            }}
          >
            READ THE DOSSIER
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 6, duration: 1 }}
        style={{
          position: 'absolute',
          bottom: '2rem',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.5rem',
        }}
      >
        <span style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.5rem',
          letterSpacing: '0.3em',
          color: 'var(--fog)',
          textTransform: 'uppercase',
        }}>
          DESCEND
        </span>
        <div style={{
          width: '1px',
          height: '40px',
          background: 'linear-gradient(180deg, var(--crimson), transparent)',
          animation: 'floatSlow 2s ease-in-out infinite',
        }} />
      </motion.div>

      <style>{`
        @keyframes rainFall {
          0% { transform: translateY(-100vh); }
          100% { transform: translateY(100vh); }
        }
      `}</style>
    </section>
  );
};

/* Live CCTV time display */
const CCTVTime = () => {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);
  return (
    <div>
      <div>{time.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).toUpperCase()}</div>
      <div style={{ marginTop: '4px' }}>{time.toLocaleTimeString('en-GB', { hour12: false })}</div>
    </div>
  );
};

export default Hero;
