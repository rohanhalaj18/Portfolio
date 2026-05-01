import React, { useEffect, useState } from 'react';

const SoundEffects = () => {
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const initAudio = () => {
      if (started) return;
      setStarted(true);

      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      
      const ctx = new AudioContext();

      // Horror Ambient Drone
      const droneOsc = ctx.createOscillator();
      droneOsc.type = 'sine';
      droneOsc.frequency.value = 45; // Deep low frequency

      const lfo = ctx.createOscillator();
      lfo.type = 'sine';
      lfo.frequency.value = 0.05; // Very slow modulation

      const droneGain = ctx.createGain();
      droneGain.gain.value = 0.3; // Volume

      const lfoGain = ctx.createGain();
      lfoGain.gain.value = 15;
      
      lfo.connect(lfoGain);
      lfoGain.connect(droneOsc.frequency);

      droneOsc.connect(droneGain);
      droneGain.connect(ctx.destination);

      droneOsc.start();
      lfo.start();

      window.triggerWishEffect = () => {
        if (ctx.state === 'suspended') ctx.resume();

        // Start loud rain
        const bufferSize = ctx.sampleRate * 2; 
        const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const output = noiseBuffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          output[i] = Math.random() * 2 - 1;
        }

        const noiseSrc = ctx.createBufferSource();
        noiseSrc.buffer = noiseBuffer;
        noiseSrc.loop = true;

        const noiseFilter = ctx.createBiquadFilter();
        noiseFilter.type = 'lowpass';
        noiseFilter.frequency.value = 1000; 

        const noiseGain = ctx.createGain();
        noiseGain.gain.setValueAtTime(0, ctx.currentTime);
        noiseGain.gain.linearRampToValueAtTime(0.4, ctx.currentTime + 0.5); // Fade in loud rain
        noiseGain.gain.setValueAtTime(0.4, ctx.currentTime + 4.5);
        noiseGain.gain.linearRampToValueAtTime(0, ctx.currentTime + 6); // Fade out at 6s

        noiseSrc.connect(noiseFilter);
        noiseFilter.connect(noiseGain);
        noiseGain.connect(ctx.destination);
        noiseSrc.start();
        noiseSrc.stop(ctx.currentTime + 6);

        // Thunder Effect Generator
        const playThunder = (delay) => {
          const duration = 3;
          const thunderBuffer = ctx.createBuffer(1, ctx.sampleRate * duration, ctx.sampleRate);
          const tOut = thunderBuffer.getChannelData(0);
          let lastOut = 0;
          for (let i = 0; i < tOut.length; i++) {
            const white = Math.random() * 2 - 1;
            tOut[i] = (lastOut + (0.02 * white)) / 1.02;
            lastOut = tOut[i];
            tOut[i] *= 4.0; 
          }

          const tNoise = ctx.createBufferSource();
          tNoise.buffer = thunderBuffer;
          const tFilter = ctx.createBiquadFilter();
          tFilter.type = 'lowpass';
          tFilter.frequency.value = 150 + Math.random() * 100;
          const tGain = ctx.createGain();
          
          tGain.gain.setValueAtTime(0, ctx.currentTime + delay);
          tGain.gain.linearRampToValueAtTime(2.5, ctx.currentTime + delay + 0.1);
          tGain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + delay + duration);

          tNoise.connect(tFilter);
          tFilter.connect(tGain);
          tGain.connect(ctx.destination);
          tNoise.start(ctx.currentTime + delay);
        };

        playThunder(0.2); // Thunder almost immediately
        playThunder(2.5); // Second thunder strike
      };

      // Add horror squishy click sound effect
      const playClickSound = () => {
        if (ctx.state === 'suspended') ctx.resume();
        
        // Low pitch thud
        const osc = ctx.createOscillator();
        const gainNode = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(150, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(30, ctx.currentTime + 0.15);
        gainNode.gain.setValueAtTime(0.6, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);
        osc.connect(gainNode);
        gainNode.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.15);

        // Wet noise squish
        const bufferSize = ctx.sampleRate * 0.15; 
        const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const output = noiseBuffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          output[i] = Math.random() * 2 - 1;
        }
        const noiseSrc = ctx.createBufferSource();
        noiseSrc.buffer = noiseBuffer;
        
        const noiseFilter = ctx.createBiquadFilter();
        noiseFilter.type = 'bandpass';
        noiseFilter.frequency.value = 800;
        
        const noiseGain = ctx.createGain();
        noiseGain.gain.setValueAtTime(0.8, ctx.currentTime);
        noiseGain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);

        noiseSrc.connect(noiseFilter);
        noiseFilter.connect(noiseGain);
        noiseGain.connect(ctx.destination);
        noiseSrc.start();
      };
      
      window.addEventListener('mousedown', playClickSound);
      
      return () => {
        window.removeEventListener('mousedown', playClickSound);
      };
    };

    // Need user interaction to start ambient audio
    window.addEventListener('click', initAudio, { once: true });
    window.addEventListener('touchstart', initAudio, { once: true });
    
    return () => {
      window.removeEventListener('click', initAudio);
      window.removeEventListener('touchstart', initAudio);
    };
  }, [started]);

  return null;
};

export default SoundEffects;
