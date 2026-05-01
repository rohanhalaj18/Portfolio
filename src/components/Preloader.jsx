import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const phrases = [
  "INITIALIZING PROTOCOL...",
  "LOADING CASE FILES...",
  "ACCESSING CLASSIFIED DATA...",
  "EVERY WISH HAS A PRICE...",
];

const Preloader = ({ onComplete }) => {
  const [currentPhrase, setCurrentPhrase] = useState(0);
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const phraseInterval = setInterval(() => {
      setCurrentPhrase(prev => {
        if (prev < phrases.length - 1) return prev + 1;
        return prev;
      });
    }, 700);

    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + Math.random() * 15 + 3;
      });
    }, 200);

    const timeout = setTimeout(() => {
      setVisible(false);
      setTimeout(onComplete, 800);
    }, 3200);

    return () => {
      clearInterval(phraseInterval);
      clearInterval(progressInterval);
      clearTimeout(timeout);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 99999,
            background: '#0a0a0a',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'var(--font-mono)',
          }}
        >
          {/* Red glow */}
          <div style={{
            position: 'absolute',
            width: '300px',
            height: '300px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(220,38,38,0.15) 0%, transparent 70%)',
            filter: 'blur(60px)',
          }} />

          {/* Glitch title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2rem, 5vw, 4rem)',
              color: '#fff',
              letterSpacing: '0.15em',
              marginBottom: '2rem',
              textAlign: 'center',
              position: 'relative',
            }}
          >
            <span className="glitch-text" data-text="IF WISHES COULD KILL">
              IF WISHES COULD KILL
            </span>
          </motion.h1>

          {/* Cycling text */}
          <motion.div
            key={currentPhrase}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            style={{
              fontSize: '0.7rem',
              letterSpacing: '0.3em',
              color: 'var(--crimson)',
              marginBottom: '2.5rem',
              textTransform: 'uppercase',
            }}
          >
            {phrases[currentPhrase]}
          </motion.div>

          {/* Progress bar */}
          <div style={{
            width: '200px',
            height: '2px',
            background: 'rgba(255,255,255,0.05)',
            borderRadius: '1px',
            overflow: 'hidden',
          }}>
            <motion.div
              style={{
                height: '100%',
                background: 'linear-gradient(90deg, var(--crimson), var(--purple))',
                borderRadius: '1px',
              }}
              animate={{ width: `${Math.min(progress, 100)}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>

          {/* Progress text */}
          <div style={{
            marginTop: '1rem',
            fontSize: '0.6rem',
            color: 'var(--fog)',
            letterSpacing: '0.2em',
          }}>
            {Math.min(Math.floor(progress), 100)}%
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
