import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');
  const [hovered, setHovered] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('TRANSMITTING...');
    setTimeout(() => {
      setStatus('WISH RECEIVED. THE CONSEQUENCES ARE NOW IN MOTION.');
      setForm({ name: '', email: '', message: '' });
      setTimeout(() => setStatus(''), 4000);
    }, 2000);
  };

  const inputStyle = {
    width: '100%',
    background: 'rgba(10,10,10,0.6)',
    border: '1px solid rgba(255,255,255,0.05)',
    borderRadius: '2px',
    padding: '0.9rem 1rem',
    color: 'var(--bone)',
    fontFamily: 'var(--font-mono)',
    fontSize: '0.75rem',
    letterSpacing: '0.05em',
    outline: 'none',
    transition: 'all 0.3s',
  };

  const inputFocusHandler = (e) => {
    e.target.style.borderColor = 'rgba(220,38,38,0.3)';
    e.target.style.boxShadow = '0 0 15px rgba(220,38,38,0.08)';
  };

  const inputBlurHandler = (e) => {
    e.target.style.borderColor = 'rgba(255,255,255,0.05)';
    e.target.style.boxShadow = 'none';
  };

  return (
    <section id="contact" className="section" style={{ background: 'var(--bg-deep)' }}>
      <div className="section-container" style={{ maxWidth: '700px' }}>
        <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
          <div className="section-label" style={{ justifyContent: 'center' }}>CHAPTER VI — MAKE A WISH</div>
          <h2 className="section-title" style={{ textAlign: 'center' }}>INITIATE<br />CONTACT</h2>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--fog)', letterSpacing: '0.1em', textAlign: 'center', marginBottom: '3rem' }}>
            EVERY WISH HAS CONSEQUENCES. ARE YOU PREPARED?
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }}>
          <form onSubmit={handleSubmit} style={{ background: 'var(--bg-card)', border: '1px solid rgba(255,255,255,0.03)', borderRadius: '2px', overflow: 'hidden' }}>
            <div style={{ padding: '1rem 1.5rem', background: 'var(--bg-surface)', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.25em', color: 'var(--crimson)' }}>◈ SECURE CHANNEL</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5rem', color: 'var(--fog)', letterSpacing: '0.15em' }}>ENCRYPTED</span>
            </div>

            <div style={{ padding: '2rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div>
                <label style={{ fontFamily: 'var(--font-mono)', fontSize: '0.55rem', letterSpacing: '0.25em', color: 'var(--fog)', marginBottom: '0.5rem', display: 'block' }}>IDENTIFIER</label>
                <input type="text" required value={form.name} onChange={e => setForm({...form, name: e.target.value})} placeholder="Your name..." style={inputStyle} onFocus={inputFocusHandler} onBlur={inputBlurHandler} />
              </div>
              <div>
                <label style={{ fontFamily: 'var(--font-mono)', fontSize: '0.55rem', letterSpacing: '0.25em', color: 'var(--fog)', marginBottom: '0.5rem', display: 'block' }}>COMMS LINK</label>
                <input type="email" required value={form.email} onChange={e => setForm({...form, email: e.target.value})} placeholder="your@email.com" style={inputStyle} onFocus={inputFocusHandler} onBlur={inputBlurHandler} />
              </div>
              <div>
                <label style={{ fontFamily: 'var(--font-mono)', fontSize: '0.55rem', letterSpacing: '0.25em', color: 'var(--fog)', marginBottom: '0.5rem', display: 'block' }}>THE WISH</label>
                <textarea required rows="5" value={form.message} onChange={e => setForm({...form, message: e.target.value})} placeholder="State your wish carefully..." style={{...inputStyle, resize: 'none'}} onFocus={inputFocusHandler} onBlur={inputBlurHandler} />
              </div>

              <button type="submit" data-hover
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                style={{
                  width: '100%', padding: '1rem', background: hovered ? 'var(--crimson)' : 'transparent',
                  border: '1px solid var(--crimson)', borderRadius: '2px',
                  color: hovered ? '#fff' : 'var(--crimson)',
                  fontFamily: 'var(--font-mono)', fontSize: '0.7rem', letterSpacing: '0.25em',
                  transition: 'all 0.4s var(--ease-dramatic)',
                  boxShadow: hovered ? '0 0 30px rgba(220,38,38,0.3)' : 'none',
                  position: 'relative', overflow: 'hidden',
                }}>
                {status || 'PROCEED AT YOUR OWN RISK'}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
