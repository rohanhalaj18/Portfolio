import React from 'react';
import { motion } from 'framer-motion';

// Importing the generated comic panels
import panel1 from '../assets/comic_panel_1.png';
import panel2 from '../assets/comic_panel_2.png';
import panel3 from '../assets/comic_panel_3.png';
import panel4 from '../assets/comic_panel_4.png';
import panel5 from '../assets/comic_panel_5.png';
import panel6 from '../assets/comic_panel_6.png';

const panels = [
  {
    id: 1,
    img: panel1,
    className: 'panel-1',
    badge: 'I. THE BEGINNING',
    caption: 'It started with curiosity… and a single line of code.',
  },
  {
    id: 2,
    img: panel2,
    className: 'panel-2',
    badge: 'II. THE OBSESSION',
    caption: 'The deeper I went, the harder it became to stop.',
  },
  {
    id: 3,
    img: panel3,
    className: 'panel-3',
    badge: 'III. THE SKILLS',
    caption: 'Not just skills… abilities shaped under pressure.',
  },
  {
    id: 4,
    img: panel4,
    className: 'panel-4',
    badge: 'IV. THE BUILDER',
    caption: 'I don’t just build projects… I create outcomes.',
  },
  {
    id: 5,
    img: panel5,
    className: 'panel-5',
    badge: 'V. THE CONSEQUENCE',
    caption: 'Every solution comes with a cost.',
    glitch: true,
  },
  {
    id: 6,
    img: panel6,
    className: 'panel-6',
    badge: 'VI. THE PRESENT',
    caption: 'Still building. Still evolving.',
  },
];

const About = () => {
  return (
    <section id="about" className="section" style={{ background: 'var(--bg-deep)' }}>
      <div className="section-container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{ marginBottom: '3rem' }}
        >
          <div className="section-label">CHAPTER II — THE MIND BEHIND THE WISH</div>
          <h2 className="section-title">ORIGIN<br />STORY</h2>
          
          <div style={{ 
            marginTop: '1.5rem', 
            fontFamily: 'var(--font-mono)', 
            fontSize: '0.85rem', 
            color: 'var(--smoke)', 
            letterSpacing: '0.1em',
            lineHeight: 1.8
          }}>
            <span style={{ color: 'var(--fog)' }}>SUBJECT:</span> ROHAN HALAJ <br />
            <span style={{ color: 'var(--fog)' }}>ALIAS:</span> rohanhalaj18 <br />
            <span style={{ color: 'var(--fog)' }}>PROFILE:</span> Genz Developer <br />
            <a 
              href="https://github.com/rohanhalaj18" 
              target="_blank" 
              rel="noreferrer" 
              style={{ 
                color: 'var(--crimson)', 
                textDecoration: 'none', 
                borderBottom: '1px solid var(--crimson)', 
                display: 'inline-block', 
                marginTop: '1rem',
                paddingBottom: '0.2rem',
                cursor: 'none'
              }} 
              data-hover
            >
              [ VIEW GITHUB DOSSIER ]
            </a>
          </div>
        </motion.div>

        {/* Comic Layout */}
        <div className="comic-grid">
          {panels.map((panel, index) => (
            <motion.div
              key={panel.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className={`comic-panel ${panel.className}`}
              data-hover
            >
              <img src={panel.img} alt={`Comic panel ${panel.id}`} />
              
              {panel.glitch && (
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(220,38,38,0.1) 3px, rgba(220,38,38,0.1) 4px)',
                  animation: 'glitchBefore 0.3s steps(4) infinite',
                  pointerEvents: 'none',
                  mixBlendMode: 'overlay',
                }} />
              )}

              <div className="comic-badge">{panel.badge}</div>
              
              <div className="panel-caption">
                {panel.caption}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
