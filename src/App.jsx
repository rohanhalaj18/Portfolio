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
