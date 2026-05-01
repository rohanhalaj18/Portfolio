import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

const skills = [
  { name: 'PYTHON', power: 92, category: 'LANGUAGE', classification: 'LETHAL' },
  { name: 'JAVASCRIPT', power: 90, category: 'LANGUAGE', classification: 'LETHAL' },
  { name: 'REACT', power: 88, category: 'FRAMEWORK', classification: 'DANGEROUS' },
  { name: 'NODE.JS', power: 85, category: 'RUNTIME', classification: 'DANGEROUS' },
  { name: 'LANGCHAIN / AI', power: 82, category: 'AI / ML', classification: 'CLASSIFIED' },
  { name: 'FIREBASE', power: 80, category: 'BACKEND', classification: 'DANGEROUS' },
  { name: 'THREE.JS / WEBGL', power: 75, category: 'GRAPHICS', classification: 'VOLATILE' },
  { name: 'SOLIDITY', power: 70, category: 'WEB3', classification: 'VOLATILE' },
  { name: 'FLASK / DJANGO', power: 78, category: 'FRAMEWORK', classification: 'DANGEROUS' },
  { name: 'GSAP', power: 76, category: 'ANIMATION', classification: 'VOLATILE' },
];

const classColors = {
  LETHAL: 'var(--crimson)',
  DANGEROUS: 'var(--amber)',
  CLASSIFIED: 'var(--purple)',
  VOLATILE: 'var(--smoke)',
};

const Skills = () => {
  return (
    <section id="skills" className="section" style={{
      background: 'var(--bg-deep)',
      borderTop: '1px solid rgba(255,255,255,0.02)',
      borderBottom: '1px solid rgba(255,255,255,0.02)',
    }}>
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="section-label">CHAPTER IV — ABILITIES</div>
          <h2 className="section-title">CLASSIFIED<br />POWERS</h2>
          <p style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.65rem',
            color: 'var(--fog)',
            letterSpacing: '0.15em',
            marginTop: '0.5rem',
          }}>
            EACH ABILITY CARRIES ITS OWN DANGER RATING. HANDLE WITH EXTREME CAUTION.
          </p>
        </motion.div>

        {/* Skills grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '0.75rem',
          marginTop: '3rem',
        }}
          className="skills-grid"
        >
          {skills.map((skill, index) => (
            <SkillBar key={skill.name} skill={skill} index={index} />
          ))}
        </div>

        {/* Legend */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          style={{
            display: 'flex',
            gap: '2rem',
            marginTop: '2.5rem',
            flexWrap: 'wrap',
          }}
        >
          {Object.entries(classColors).map(([label, color]) => (
            <div key={label} style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}>
              <div style={{
                width: '8px',
                height: '8px',
                borderRadius: '1px',
                background: color,
                boxShadow: `0 0 6px ${color}`,
              }} />
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.55rem',
                letterSpacing: '0.2em',
                color: 'var(--fog)',
              }}>
                {label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .skills-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
};

const SkillBar = ({ skill, index }) => {
  const [inView, setInView] = useState(false);
  const [hovered, setHovered] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const barColor = classColors[skill.classification] || 'var(--smoke)';

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      data-hover
      style={{
        padding: '1rem 1.25rem',
        background: hovered ? 'rgba(22,22,22,0.8)' : 'var(--bg-card)',
        border: `1px solid ${hovered ? 'rgba(220,38,38,0.15)' : 'rgba(255,255,255,0.02)'}`,
        borderRadius: '2px',
        transition: 'all 0.3s',
        cursor: 'none',
      }}
    >
      {/* Top row */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '0.6rem',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '0.8rem',
            fontWeight: 600,
            color: hovered ? '#fff' : 'var(--bone)',
            transition: 'color 0.3s',
            letterSpacing: '0.03em',
          }}>
            {skill.name}
          </span>
          <span style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.45rem',
            letterSpacing: '0.2em',
            color: 'var(--fog)',
            padding: '0.15rem 0.4rem',
            border: '1px solid rgba(255,255,255,0.05)',
            borderRadius: '1px',
          }}>
            {skill.category}
          </span>
        </div>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
        }}>
          <span style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.5rem',
            letterSpacing: '0.15em',
            color: barColor,
          }}>
            {skill.classification}
          </span>
          <span style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.65rem',
            color: 'var(--bone)',
          }}>
            {skill.power}%
          </span>
        </div>
      </div>

      {/* Progress bar */}
      <div style={{
        height: '3px',
        background: 'rgba(255,255,255,0.03)',
        borderRadius: '2px',
        overflow: 'hidden',
      }}>
        <div style={{
          height: '100%',
          width: inView ? `${skill.power}%` : '0%',
          background: `linear-gradient(90deg, ${barColor}, ${barColor}90)`,
          borderRadius: '2px',
          transition: 'width 1.2s var(--ease-dramatic)',
          transitionDelay: `${index * 0.08}s`,
          boxShadow: hovered ? `0 0 10px ${barColor}50` : 'none',
        }} />
      </div>
    </motion.div>
  );
};

export default Skills;
