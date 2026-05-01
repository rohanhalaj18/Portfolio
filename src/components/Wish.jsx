import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import wishLogo from '../assets/wish-logo.png';

const Wish = () => {
  const [stage, setStage] = useState('IDLE'); // IDLE, CAMERA, RECORDING, SENDING, COUNTDOWN
  const [timeLeft, setTimeLeft] = useState(24 * 60 * 60);
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  useEffect(() => {
    let interval;
    if (stage === 'COUNTDOWN') {
      interval = setInterval(() => {
        setTimeLeft(t => t > 0 ? t - 1 : 0);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [stage]);

  const startCamera = async () => {
    setStage('CAMERA');
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error("Camera error:", err);
      // Fallback if camera is blocked
      setTimeout(() => {
         if(videoRef.current) videoRef.current.style.background = '#222';
      }, 100);
    }
  };

  const startRecording = () => {
    setStage('RECORDING');
    if (window.triggerWishEffect) window.triggerWishEffect();
    setTimeout(() => {
      setStage('SENDING');
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
      setTimeout(() => {
        setStage('COUNTDOWN');
      }, 3000);
    }, 4000); // Simulate 4 seconds of recording
  };

  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, '0')} : ${m.toString().padStart(2, '0')} : ${s.toString().padStart(2, '0')}`;
  };

  return (
    <section id="contact" className="section" style={{ background: 'var(--bg-void)', position: 'relative', overflow: 'hidden' }}>
      <div className="section-container" style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center', minHeight: '80vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <AnimatePresence mode="wait">
          {stage === 'IDLE' && (
            <motion.div key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '5rem', color: '#fff', letterSpacing: '0.1em', marginBottom: '3rem' }}>
                7 12 12
              </div>
              <div 
                onClick={startCamera}
                style={{ cursor: 'pointer', display: 'inline-block', position: 'relative' }}
                data-hover
              >
                <motion.img 
                  src={wishLogo}
                  alt="Make a wish"
                  animate={{ y: [0, -10, 0] }} 
                  transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                  style={{ width: '120px', filter: 'drop-shadow(0 0 10px rgba(255,255,255,0.2))' }}
                />
              </div>
              <div style={{ marginTop: '3rem', fontFamily: 'var(--font-mono)', fontSize: '2.5rem', color: '#fff', letterSpacing: '0.2em' }}>
                소원 빌기
              </div>
            </motion.div>
          )}

          {(stage === 'CAMERA' || stage === 'RECORDING') && (
            <motion.div key="camera" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} style={{ position: 'relative', width: '100%', height: '70vh', borderRadius: '20px', overflow: 'hidden', background: '#000', border: '1px solid rgba(255,255,255,0.1)' }}>
              <video 
                ref={videoRef} 
                autoPlay 
                playsInline 
                muted 
                style={{ width: '100%', height: '100%', objectFit: 'cover', transform: 'scaleX(-1)' }}
              />
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.8), transparent)', padding: '2rem 1rem' }}>
                <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.8rem', color: '#fff', marginBottom: '0.5rem', letterSpacing: '0.05em' }}>소원을 빌다</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.9rem', color: 'rgba(255,255,255,0.7)', letterSpacing: '0.05em' }}>셀카 모드에서 소원을 말하고 녹화해보세요</div>
              </div>

              {stage === 'RECORDING' && (
                <div style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: 'var(--crimson)' }}>
                    <motion.div animate={{ opacity: [1, 0, 1] }} transition={{ repeat: Infinity, duration: 1 }} style={{ width: '100%', height: '100%', background: 'inherit', borderRadius: 'inherit' }} />
                  </div>
                  <span style={{ color: 'var(--crimson)', fontFamily: 'var(--font-mono)', fontSize: '0.7rem', letterSpacing: '0.1em' }}>REC</span>
                </div>
              )}

              <div style={{ position: 'absolute', bottom: '2rem', left: 0, right: 0, display: 'flex', justifyContent: 'center' }}>
                <div 
                  onClick={stage === 'CAMERA' ? startRecording : null}
                  style={{ 
                    width: '70px', height: '70px', borderRadius: '50%', border: '2px solid rgba(255,255,255,0.8)', 
                    display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
                    background: stage === 'RECORDING' ? 'rgba(220,38,38,0.2)' : 'rgba(0,0,0,0.5)',
                    transition: 'all 0.3s'
                  }}
                  data-hover
                >
                  <img src={wishLogo} alt="Record wish" style={{ width: '40px', objectFit: 'contain' }} />
                </div>
              </div>
            </motion.div>
          )}

          {stage === 'SENDING' && (
            <motion.div key="sending" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ position: 'relative', height: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ position: 'relative', width: '120px', height: '150px' }}>
                <motion.div 
                  animate={{ scale: [1, 1.8, 2.5], opacity: [0.8, 0, 0] }} 
                  transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                  style={{ position: 'absolute', top: '50%', left: '50%', width: '150px', height: '150px', marginLeft: '-75px', marginTop: '-75px', border: '1px solid rgba(255,255,255,0.5)', borderRadius: '50%' }} 
                />
                <motion.div 
                  animate={{ scale: [1, 1.8, 2.5], opacity: [0.8, 0, 0] }} 
                  transition={{ repeat: Infinity, duration: 2, delay: 1, ease: "linear" }}
                  style={{ position: 'absolute', top: '50%', left: '50%', width: '150px', height: '150px', marginLeft: '-75px', marginTop: '-75px', border: '1px solid rgba(255,255,255,0.5)', borderRadius: '50%' }} 
                />
                <img src={wishLogo} alt="Sending wish" style={{ width: '120px', position: 'relative', zIndex: 2 }} />
              </div>
              <div style={{ marginTop: '4rem', fontFamily: 'var(--font-mono)', fontSize: '2rem', color: '#fff', letterSpacing: '0.2em' }}>
                소원 전송 중...
              </div>
            </motion.div>
          )}

          {stage === 'COUNTDOWN' && (
            <motion.div key="countdown" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} style={{ padding: '4rem 2rem', border: '1px solid rgba(220,38,38,0.2)', background: 'rgba(10,10,10,0.8)', borderRadius: '4px' }}>
              <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', color: '#fff', marginBottom: '0.5rem', letterSpacing: '0.05em' }}>소원이 이루어질 거예요</div>
              <h3 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--crimson)', letterSpacing: '0.2em', marginBottom: '3rem' }}>YOUR WISH IS FULFILLED </h3>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '5rem', color: '#fff', letterSpacing: '0.05em', textShadow: '0 0 20px rgba(220,38,38,0.3)' }}>
                {formatTime(timeLeft)}
              </div>
              <div style={{ marginTop: '2rem', fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--fog)', letterSpacing: '0.1em' }}>
                DO NOT CLOSE THIS TAB.<br/>THE CONSEQUENCES ARE NOW IN MOTION.
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Wish;
