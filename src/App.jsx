import React, { useEffect, useState } from 'react';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Hackathons from './components/Hackathons';
import Wish from './components/Wish';
import Footer from './components/Footer';
import Preloader from './components/Preloader';
import SoundEffects from './components/SoundEffects';

function App() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 3500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <SoundEffects />
      {!loaded && <Preloader onComplete={() => setLoaded(true)} />}
      <div style={{
        opacity: loaded ? 1 : 0,
        transition: 'opacity 1s ease',
        pointerEvents: loaded ? 'auto' : 'none'
      }}>
        {/* Camera Viewfinder Overlay */}
        <div style={{ position: 'fixed', inset: '2rem', pointerEvents: 'none', zIndex: 9996 }}>
          <div style={{ position: 'absolute', top: 0, left: 0, width: '40px', height: '40px', borderTop: '2px solid rgba(255,255,255,0.2)', borderLeft: '2px solid rgba(255,255,255,0.2)' }} />
          <div style={{ position: 'absolute', top: 0, right: 0, width: '40px', height: '40px', borderTop: '2px solid rgba(255,255,255,0.2)', borderRight: '2px solid rgba(255,255,255,0.2)' }} />
          <div style={{ position: 'absolute', bottom: 0, left: 0, width: '40px', height: '40px', borderBottom: '2px solid rgba(255,255,255,0.2)', borderLeft: '2px solid rgba(255,255,255,0.2)' }} />
          <div style={{ position: 'absolute', bottom: 0, right: 0, width: '40px', height: '40px', borderBottom: '2px solid rgba(255,255,255,0.2)', borderRight: '2px solid rgba(255,255,255,0.2)' }} />
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '20px', height: '2px', background: 'rgba(255,255,255,0.1)' }} />
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '2px', height: '20px', background: 'rgba(255,255,255,0.1)' }} />
        </div>

        <div className="lightning" />
        <div className="film-grain" />
        <div className="scanlines" />
        <div className="vignette" />
        <CustomCursor />
        <Navbar />
        <main>
          <Hero />
          <About />
          <Projects />
          <Skills />
          <Hackathons />
          <Wish />
        </main>
        <Footer />
      </div>
    </>
  );
}

export default App;
