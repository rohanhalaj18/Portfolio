import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const projects = [
  {
    id: 'CASE-001',
    title: 'DOCUCHAT-AI',
    category: 'AI DOCUMENT ANALYZER',
    description: 'An AI-powered document intelligence platform enabling seamless interactions and data extraction from complex documents.',
    tech: ['React', 'CSS', 'OpenAI', 'LangChain'],
    riskLevel: 'CRITICAL',
    impact: 'Information Retrieval Accelerated',
    outcome: 'OPERATIONAL',
    status: 'ACTIVE',
    url: 'https://github.com/rohanhalaj18/DocuChat-AI',
  },
  {
    id: 'CASE-002',
    title: 'VOTING SYSTEM',
    category: 'SECURE ELECTION PLATFORM',
    description: 'A robust, tamper-proof digital voting infrastructure designed for secure and transparent electoral processes.',
    tech: ['JavaScript', 'Node.js', 'Express', 'MongoDB'],
    riskLevel: 'HIGH',
    impact: 'Democracy Digitized',
    outcome: 'DEPLOYED',
    status: 'MONITORING',
    url: 'https://github.com/rohanhalaj18/VotingSystem',
  },
  {
    id: 'CASE-003',
    title: 'EXPOTECH',
    category: 'EVENT MANAGEMENT HUB',
    description: 'A centralized portal for managing tech expos, bridging communication between innovators and audiences.',
    tech: ['HTML', 'CSS', 'JavaScript', 'Vercel'],
    riskLevel: 'ELEVATED',
    impact: 'Community Engagement +80%',
    outcome: 'ARCHIVED',
    status: 'COMPLETE',
    url: 'https://github.com/rohanhalaj18/expotech',
  },
];

const riskColors = {
  CRITICAL: '#dc2626',
  HIGH: '#f59e0b',
  ELEVATED: '#9333ea',
};

const Projects = () => {
  const [hovered, setHovered] = useState(null);
  const [expanded, setExpanded] = useState(null);

  return (
    <section id="projects" className="section">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="section-label">CHAPTER III — CONSEQUENCES</div>
          <h2 className="section-title">CASE FILES</h2>
          <p style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.7rem',
            color: 'var(--fog)',
            letterSpacing: '0.15em',
            marginTop: '0.5rem',
          }}>
            EVERY PROJECT IS A WISH — AND EVERY WISH HAS CONSEQUENCES.
          </p>
        </motion.div>

        <div style={{
          display: 'grid',
          gap: '1.5rem',
          marginTop: '3rem',
        }}>
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              onMouseEnter={() => setHovered(project.id)}
              onMouseLeave={() => setHovered(null)}
              onClick={() => setExpanded(expanded === project.id ? null : project.id)}
              data-hover
              style={{
                background: hovered === project.id ? 'rgba(22,22,22,0.9)' : 'var(--bg-card)',
                border: `1px solid ${hovered === project.id ? 'rgba(220,38,38,0.3)' : 'rgba(255,255,255,0.03)'}`,
                borderRadius: '2px',
                overflow: 'hidden',
                cursor: 'none',
                transition: 'all 0.4s var(--ease-dramatic)',
                boxShadow: hovered === project.id
                  ? `0 0 40px rgba(220,38,38,0.1), inset 0 0 40px rgba(220,38,38,0.02)`
                  : 'none',
              }}
            >
              {/* Card Header */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '1.25rem 1.5rem',
                borderBottom: expanded === project.id ? '1px solid rgba(255,255,255,0.05)' : 'none',
                flexWrap: 'wrap',
                gap: '0.75rem',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
                  {/* Case ID */}
                  <span style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.6rem',
                    letterSpacing: '0.2em',
                    color: 'var(--fog)',
                    opacity: hovered === project.id ? 1 : 0.5,
                    transition: 'opacity 0.3s',
                  }}>
                    {project.id}
                  </span>

                  {/* Title & category */}
                  <div>
                    <h3 style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: '1.2rem',
                      fontWeight: 700,
                      color: hovered === project.id ? 'var(--crimson)' : '#fff',
                      transition: 'color 0.3s',
                      letterSpacing: '0.02em',
                    }}>
                      {project.title}
                    </h3>
                    <span style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.55rem',
                      letterSpacing: '0.2em',
                      color: 'var(--purple)',
                    }}>
                      {project.category}
                    </span>
                  </div>
                </div>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1.5rem',
                  flexWrap: 'wrap',
                }}>
                  {/* Risk Level */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                  }}>
                    <div style={{
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      background: riskColors[project.riskLevel],
                      boxShadow: `0 0 8px ${riskColors[project.riskLevel]}50`,
                      animation: 'pulseGlow 2s infinite',
                    }} />
                    <span style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.55rem',
                      letterSpacing: '0.2em',
                      color: riskColors[project.riskLevel],
                    }}>
                      {project.riskLevel}
                    </span>
                  </div>

                  {/* Status badge */}
                  <span style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.5rem',
                    letterSpacing: '0.2em',
                    padding: '0.25rem 0.6rem',
                    border: `1px solid ${project.status === 'ACTIVE' ? 'var(--crimson-dim)' : 'rgba(255,255,255,0.1)'}`,
                    borderRadius: '1px',
                    color: project.status === 'ACTIVE' ? 'var(--crimson)' : 'var(--fog)',
                  }}>
                    {project.status}
                  </span>

                  {/* Expand indicator */}
                  <span style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.75rem',
                    color: 'var(--fog)',
                    transform: expanded === project.id ? 'rotate(180deg)' : 'rotate(0)',
                    transition: 'transform 0.3s',
                    display: 'inline-block',
                  }}>
                    ▾
                  </span>
                </div>
              </div>

              {/* Expanded content */}
              <AnimatePresence>
                {expanded === project.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    style={{ overflow: 'hidden' }}
                  >
                    <div style={{ padding: '1.5rem' }}>
                      <div style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr 1fr',
                        gap: '1.5rem',
                        marginBottom: '1.5rem',
                      }}
                        className="project-detail-grid"
                      >
                        <div>
                          <div style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.55rem',
                            letterSpacing: '0.25em',
                            color: 'var(--fog)',
                            marginBottom: '0.5rem',
                          }}>BRIEFING</div>
                          <p style={{
                            fontSize: '0.85rem',
                            color: 'var(--smoke)',
                            lineHeight: 1.7,
                          }}>
                            {project.description}
                          </p>
                        </div>
                        <div>
                          <div style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.55rem',
                            letterSpacing: '0.25em',
                            color: 'var(--fog)',
                            marginBottom: '0.5rem',
                          }}>IMPACT ASSESSMENT</div>
                          <p style={{
                            fontSize: '0.85rem',
                            color: 'var(--crimson)',
                            fontWeight: 600,
                          }}>
                            {project.impact}
                          </p>
                          <p style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.65rem',
                            color: 'var(--fog)',
                            marginTop: '0.5rem',
                          }}>
                            OUTCOME: {project.outcome}
                          </p>
                        </div>
                        <div>
                          <div style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.55rem',
                            letterSpacing: '0.25em',
                            color: 'var(--fog)',
                            marginBottom: '0.5rem',
                          }}>ARSENAL</div>
                          <div style={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: '0.4rem',
                          }}>
                            {project.tech.map(t => (
                              <span key={t} style={{
                                fontFamily: 'var(--font-mono)',
                                fontSize: '0.55rem',
                                letterSpacing: '0.1em',
                                padding: '0.3rem 0.6rem',
                                border: '1px solid rgba(220,38,38,0.15)',
                                borderRadius: '1px',
                                color: 'var(--bone)',
                                background: 'rgba(220,38,38,0.03)',
                              }}>
                                {t}
                              </span>
                            ))}
                          </div>
                          {project.url && (
                            <a 
                              href={project.url} 
                              target="_blank" 
                              rel="noreferrer"
                              style={{
                                display: 'inline-block',
                                marginTop: '1rem',
                                fontFamily: 'var(--font-mono)',
                                fontSize: '0.65rem',
                                letterSpacing: '0.15em',
                                color: 'var(--crimson)',
                                textDecoration: 'none',
                                borderBottom: '1px solid var(--crimson)',
                                paddingBottom: '0.2rem',
                                cursor: 'none'
                              }}
                              data-hover
                            >
                              [ ACCESS SOURCE LOGS ]
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .project-detail-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
};

export default Projects;
