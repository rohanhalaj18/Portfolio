import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const CustomCursor = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [trail, setTrail] = useState({ x: -100, y: -100 });
  const [hovering, setHovering] = useState(false);
  const [clicking, setClicking] = useState(false);
  const [splatters, setSplatters] = useState([]);

  useEffect(() => {
    const onMove = (e) => {
      setPos({ x: e.clientX, y: e.clientY });
    };

    const onOver = (e) => {
      const t = e.target;
      if (t.tagName === 'A' || t.tagName === 'BUTTON' || t.closest('a') || t.closest('button') || t.closest('[data-hover]')) {
        setHovering(true);
      } else {
        setHovering(false);
      }
    };

    const onDown = (e) => {
      setClicking(true);
      const splatterId = Date.now();
      setSplatters(prev => [...prev, { x: e.clientX, y: e.clientY, id: splatterId }]);
      
      // Remove splatter after 3 seconds
      setTimeout(() => {
        setSplatters(prev => prev.filter(s => s.id !== splatterId));
      }, 3000);
    };
    const onUp = () => setClicking(false);

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseover', onOver);
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup', onUp);

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onOver);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
    };
  }, []);

  useEffect(() => {
    let raf;
    const animate = () => {
      setTrail(prev => ({
        x: prev.x + (pos.x - prev.x) * 0.15,
        y: prev.y + (pos.y - prev.y) * 0.15,
      }));
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [pos]);

  // Hide on touch devices
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    setIsMobile(window.matchMedia('(pointer: coarse)').matches);
  }, []);
  if (isMobile) return null;

  return (
    <>
      {/* Inner dot */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: hovering ? '6px' : '8px',
          height: hovering ? '6px' : '8px',
          borderRadius: '50%',
          background: clicking ? 'var(--crimson-glow)' : '#fff',
          transform: `translate(${pos.x - 4}px, ${pos.y - 4}px)`,
          transition: 'width 0.2s, height 0.2s, background 0.15s',
          pointerEvents: 'none',
          zIndex: 100000,
          mixBlendMode: 'difference',
        }}
      />
      {/* Outer trail ring */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: hovering ? '50px' : '35px',
          height: hovering ? '50px' : '35px',
          borderRadius: '50%',
          border: `1.5px solid ${hovering ? 'var(--crimson)' : 'rgba(220,38,38,0.3)'}`,
          transform: `translate(${trail.x - (hovering ? 25 : 17.5)}px, ${trail.y - (hovering ? 25 : 17.5)}px)`,
          transition: 'width 0.3s var(--ease-dramatic), height 0.3s var(--ease-dramatic), border-color 0.3s',
          pointerEvents: 'none',
          zIndex: 100000,
          boxShadow: hovering ? '0 0 20px rgba(220,38,38,0.2)' : 'none',
        }}
      />
      {/* Blood splatters */}
      {splatters.map(splatter => (
        <motion.div
          key={splatter.id}
          initial={{ opacity: 1, scale: 0, rotate: Math.random() * 360 }}
          animate={{ opacity: 0, scale: Math.random() * 2 + 1 }}
          transition={{ duration: 3, ease: 'easeOut' }}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '40px',
            height: '40px',
            background: 'radial-gradient(circle, rgba(220,38,38,0.8) 0%, transparent 70%)',
            borderRadius: '50%',
            transform: `translate(${splatter.x - 20}px, ${splatter.y - 20}px)`,
            pointerEvents: 'none',
            zIndex: 99999,
            filter: 'blur(2px)',
          }}
        />
      ))}
    </>
  );
};

export default CustomCursor;
