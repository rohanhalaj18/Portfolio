import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const hackathons = [
  {
    id: 'FILE-001', event: 'TECHSPRINT', position: '1ST PLACE',
    project: 'VTU, Belagavi (Google Dev Group)',
    crew: ['Rohan', 'Ashish', 'Nayana', 'Adil'],
    impact: 'Secured the top payout in a high-stakes sprint. Mission accomplished with extreme efficiency.',
    stamp: 'TOP SECRET', date: '31 JAN 2026', classification: 'OMEGA',
  },
  {
    id: 'FILE-002', event: 'HACKAURA 2026', position: '1ST PLACE',
    project: 'VSM College Nipani',
    crew: ['Rohan', 'Ashish', 'Nayana', 'Adil'],
    impact: 'Dominant execution over a multi-day marathon operation. Secured maximum rewards.',
    stamp: 'TOP SECRET', date: '11-14 MAR 2026', classification: 'SIGMA',
  },
  {
    id: 'FILE-003', event: 'MINI HACKATHON', position: '2ND PLACE',
    project: 'KLE Tech Univ (ITS IEEE)',
    crew: ['Rohan', 'Ashish', 'Nayana', 'Adil'],
    impact: 'Infiltrated the IEEE systems. Secured a strong runner-up payout under tight conditions.',
    stamp: 'CONFIDENTIAL', date: '11-12 APR 2026', classification: 'DELTA',
  },
  {
    id: 'FILE-004', event: 'NEXORA', position: '2ND PLACE',
    project: 'Jain College, Belagavi',
    crew: ['Rohan', 'Ashish', 'Adil', 'Saish'],
    impact: 'A precision strike securing second place. Coordinated flawlessly with the crew.',
    stamp: 'RESOLVED', date: '11 OCT 2025', classification: 'ALPHA',
  },
];

const stampColors = {
  'TOP SECRET': '#dc2626',
  'CONFIDENTIAL': '#f59e0b',
  'RESOLVED': '#22c55e',
};

const Hackathons = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [hoveredId, setHoveredId] = useState(null);

  return (
    <section id="hackathons" className="section">
      <div className="section-container">
        <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
          <div className="section-label">CHAPTER V — RECORDED VICTORIES</div>
          <h2 className="section-title">MISSION<br />COMPLETED</h2>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem', paddingBottom: '1rem', borderBottom: '1px solid rgba(255,255,255,0.05)', flexWrap: 'wrap', gap: '0.5rem' }}>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--fog)', letterSpacing: '0.15em' }}>
              CLASSIFIED RECORDS — CLICK TO DECLASSIFY
            </p>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--crimson)', letterSpacing: '0.2em' }}>
              RECORDS: {String(hackathons.length).padStart(2, '0')}
            </div>
          </div>
        </motion.div>

        <div style={{ position: 'relative', marginTop: '3rem' }}>
          <div style={{ position: 'absolute', left: '20px', top: 0, bottom: 0, width: '1px', background: 'linear-gradient(180deg, var(--crimson-dim), rgba(220,38,38,0.05))' }} className="timeline-line" />

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {hackathons.map((hack, index) => (
              <motion.div key={hack.id} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: index * 0.1 }} style={{ position: 'relative', paddingLeft: '50px' }} className="hack-card-wrapper">
                <div style={{ position: 'absolute', left: '14px', top: '1.5rem', width: '13px', height: '13px', borderRadius: '50%', border: `2px solid ${stampColors[hack.stamp]}`, background: hoveredId === hack.id ? stampColors[hack.stamp] : 'var(--bg-void)', transition: 'all 0.3s', zIndex: 2 }} className="timeline-dot" />

                <div data-hover onMouseEnter={() => setHoveredId(hack.id)} onMouseLeave={() => setHoveredId(null)} onClick={() => setSelectedFile(hack)}
                  style={{ background: hoveredId === hack.id ? 'rgba(22,22,22,0.9)' : 'var(--bg-card)', border: `1px solid ${hoveredId === hack.id ? 'rgba(220,38,38,0.2)' : 'rgba(255,255,255,0.03)'}`, borderRadius: '2px', padding: '1.5rem', cursor: 'none', transition: 'all 0.3s', position: 'relative', overflow: 'hidden' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                    <div>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5rem', letterSpacing: '0.25em', color: 'var(--fog)', marginBottom: '0.4rem' }}>{hack.id} — {hack.date}</div>
                      <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.15rem', fontWeight: 700, color: hoveredId === hack.id ? 'var(--crimson)' : '#fff', transition: 'color 0.3s' }}>{hack.event}</h3>
                    </div>
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.85rem', letterSpacing: '0.15em', color: stampColors[hack.stamp], border: `2px solid ${stampColors[hack.stamp]}`, padding: '0.2rem 0.6rem', transform: 'rotate(-3deg)', opacity: 0.8 }}>{hack.stamp}</div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <span>🏆</span>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--amber)', fontWeight: 600 }}>{hack.position}</span>
                    </div>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--smoke)' }}>{hack.project}</span>
                  </div>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginTop: '1rem', opacity: hoveredId === hack.id ? 1 : 0.4, transition: 'opacity 0.3s' }}>
                    {hack.crew.map(c => (
                      <span key={c} style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5rem', padding: '0.2rem 0.5rem', border: '1px solid rgba(220,38,38,0.15)', borderRadius: '1px', color: 'var(--bone)', background: 'rgba(220,38,38,0.03)' }}>{c}</span>
                    ))}
                  </div>
                  <div style={{ position: 'absolute', bottom: '0.75rem', right: '0.75rem', fontFamily: 'var(--font-mono)', fontSize: '0.45rem', letterSpacing: '0.25em', color: 'var(--fog)', opacity: 0.4 }}>CLASS: {hack.classification}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {selectedFile && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedFile(null)}
            style={{ position: 'fixed', inset: 0, zIndex: 10000, background: 'rgba(10,10,10,0.92)', backdropFilter: 'blur(15px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
            <motion.div initial={{ scale: 0.9, y: 30 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 30 }} onClick={e => e.stopPropagation()}
              style={{ width: '100%', maxWidth: '600px', background: 'var(--bg-surface)', border: '1px solid rgba(220,38,38,0.15)', borderRadius: '2px', overflow: 'hidden', position: 'relative' }}>
              <div style={{ padding: '1rem 1.5rem', background: 'var(--bg-card)', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.25em', color: 'var(--crimson)' }}>◈ DECLASSIFIED — {selectedFile.id}</span>
                <button onClick={() => setSelectedFile(null)} style={{ background: 'none', border: '1px solid rgba(255,255,255,0.1)', color: 'var(--smoke)', padding: '0.3rem 0.8rem', fontSize: '0.6rem', letterSpacing: '0.15em', borderRadius: '1px' }}>✕</button>
              </div>
              <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%) rotate(-15deg)', fontFamily: 'var(--font-display)', fontSize: '4rem', color: stampColors[selectedFile.stamp], opacity: 0.06, pointerEvents: 'none', whiteSpace: 'nowrap' }}>{selectedFile.stamp}</div>
              <div style={{ padding: '2rem 1.5rem' }}>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', color: '#fff', letterSpacing: '0.08em', marginBottom: '0.25rem' }}>{selectedFile.event}</h3>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--amber)', marginBottom: '1.5rem' }}>🏆 {selectedFile.position}</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  <div><div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.55rem', letterSpacing: '0.25em', color: 'var(--fog)', marginBottom: '0.3rem' }}>LOCATION</div><div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--bone)' }}>{selectedFile.project}</div></div>
                  <div><div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.55rem', letterSpacing: '0.25em', color: 'var(--fog)', marginBottom: '0.5rem' }}>CREW</div><div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>{selectedFile.crew.map(c => (<span key={c} style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', padding: '0.3rem 0.6rem', border: '1px solid rgba(220,38,38,0.2)', borderRadius: '1px', color: 'var(--crimson)', background: 'rgba(220,38,38,0.05)' }}>{c}</span>))}</div></div>
                  <div><div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.55rem', letterSpacing: '0.25em', color: 'var(--fog)', marginBottom: '0.5rem' }}>MISSION OUTCOME</div><p style={{ fontSize: '0.85rem', color: 'var(--smoke)', lineHeight: 1.7, borderLeft: '2px solid var(--crimson-dim)', paddingLeft: '1rem' }}>{selectedFile.impact}</p></div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .timeline-line { left: 12px !important; }
          .timeline-dot { left: 6px !important; }
          .hack-card-wrapper { padding-left: 35px !important; }
        }
      `}</style>
    </section>
  );
};

export default Hackathons;
