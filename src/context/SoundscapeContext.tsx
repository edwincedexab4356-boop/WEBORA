import React, { createContext, useContext, useEffect, useRef, useState, useCallback, ReactNode } from 'react';

interface SoundscapeContextType {
  isMuted: boolean;
  isPlaying: boolean;
  toggleMute: () => void;
  activateSoundscape: () => void;
  playTick: () => void;
  playWhoosh: () => void;
}

const SoundscapeContext = createContext<SoundscapeContextType>({
  isMuted: false,
  isPlaying: false,
  toggleMute: () => {},
  activateSoundscape: () => {},
  playTick: () => {},
  playWhoosh: () => {},
});

export const useSoundscape = () => useContext(SoundscapeContext);

interface SoundscapeProviderProps {
  children: ReactNode;
}

export const SoundscapeProvider: React.FC<SoundscapeProviderProps> = ({ children }) => {
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  // Web Audio API Node References
  const audioCtxRef = useRef<AudioContext | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);
  const droneOsc1Ref = useRef<OscillatorNode | null>(null);
  const droneOsc2Ref = useRef<OscillatorNode | null>(null);
  const lfoOscRef = useRef<OscillatorNode | null>(null);
  const isInitializedRef = useRef(false);

  // Initialize Web Audio graph
  const initAudio = useCallback(() => {
    if (isInitializedRef.current || typeof window === 'undefined') return;

    try {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioContextClass) return;

      const ctx = new AudioContextClass();
      audioCtxRef.current = ctx;

      // Master output gain (whisper-quiet, elegant studio level)
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(isMuted ? 0 : 0.04, ctx.currentTime);
      masterGain.connect(ctx.destination);
      masterGainRef.current = masterGain;

      // Warm Low-Pass Filter
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(140, ctx.currentTime);
      filter.Q.setValueAtTime(1.8, ctx.currentTime);
      filter.connect(masterGain);

      // Deep atmospheric drone oscillator 1 (Root: 55Hz - A1 fundamental)
      const osc1 = ctx.createOscillator();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(55, ctx.currentTime);

      // Harmonic drone oscillator 2 (Harmonic fifth: 82.5Hz - E2)
      const osc2 = ctx.createOscillator();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(82.5, ctx.currentTime);

      // Slow breathing LFO for organic filter sweep (0.07Hz)
      const lfo = ctx.createOscillator();
      const lfoGain = ctx.createGain();
      lfo.frequency.setValueAtTime(0.07, ctx.currentTime);
      lfoGain.gain.setValueAtTime(35, ctx.currentTime);
      lfo.connect(lfoGain);
      lfoGain.connect(filter.frequency);

      // Connect drone voices
      const droneGain = ctx.createGain();
      droneGain.gain.setValueAtTime(0.7, ctx.currentTime);
      osc1.connect(droneGain);
      osc2.connect(droneGain);
      droneGain.connect(filter);

      // Start sound sources
      osc1.start();
      osc2.start();
      lfo.start();

      droneOsc1Ref.current = osc1;
      droneOsc2Ref.current = osc2;
      lfoOscRef.current = lfo;
      isInitializedRef.current = true;
    } catch {
      // Graceful fallback if Web Audio is unsupported
    }
  }, [isMuted]);

  // Activate audio upon user interaction (respects browser autoplay policy)
  const activateSoundscape = useCallback(() => {
    if (!audioCtxRef.current) {
      initAudio();
    }

    if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume().then(() => {
        setIsPlaying(true);
      }).catch(() => {});
    } else if (audioCtxRef.current && audioCtxRef.current.state === 'running') {
      setIsPlaying(true);
    }
  }, [initAudio]);

  // Toggle Mute function
  const toggleMute = useCallback(() => {
    setIsMuted((prev) => {
      const next = !prev;
      if (audioCtxRef.current && masterGainRef.current) {
        const ctx = audioCtxRef.current;
        if (ctx.state === 'suspended' && !next) {
          ctx.resume();
          setIsPlaying(true);
        }
        const now = ctx.currentTime;
        masterGainRef.current.gain.cancelScheduledValues(now);
        // Smooth 120ms fade in/out to prevent audio pops
        masterGainRef.current.gain.linearRampToValueAtTime(next ? 0 : 0.04, now + 0.12);
      }
      return next;
    });
  }, []);

  // Subtle tactile click/tick on button & navigation interaction
  const playTick = useCallback(() => {
    if (isMuted || !audioCtxRef.current || audioCtxRef.current.state !== 'running') return;
    try {
      const ctx = audioCtxRef.current;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const now = ctx.currentTime;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(1400, now);
      osc.frequency.exponentialRampToValueAtTime(400, now + 0.025);

      gain.gain.setValueAtTime(0.015, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.025);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.03);
    } catch {}
  }, [isMuted]);

  // Subtle sub-bass whoosh on cinematic section transitions
  const playWhoosh = useCallback(() => {
    if (isMuted || !audioCtxRef.current || audioCtxRef.current.state !== 'running') return;
    try {
      const ctx = audioCtxRef.current;
      const osc = ctx.createOscillator();
      const filter = ctx.createBiquadFilter();
      const gain = ctx.createGain();
      const now = ctx.currentTime;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(80, now);
      osc.frequency.exponentialRampToValueAtTime(130, now + 0.2);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(220, now);
      filter.frequency.exponentialRampToValueAtTime(400, now + 0.15);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.025, now + 0.1);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.35);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.36);
    } catch {}
  }, [isMuted]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, []);

  return (
    <SoundscapeContext.Provider
      value={{
        isMuted,
        isPlaying,
        toggleMute,
        activateSoundscape,
        playTick,
        playWhoosh,
      }}
    >
      {children}
    </SoundscapeContext.Provider>
  );
};
