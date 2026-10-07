import { useState, useEffect } from 'react';

interface DevicePerformanceProfile {
  shouldReduceMotion: boolean;
  prefersReducedMotion: boolean;
  isLowPerfDevice: boolean;
}

/**
 * High-performance hook to determine if complex animations, 3D tilt,
 * magnetic physics, and parallax calculations should be disabled.
 *
 * Checks:
 * 1. OS accessibility preference: (prefers-reduced-motion: reduce)
 * 2. Hardware profile: CPU concurrency <= 4 or device memory < 4GB
 * 3. Network Data-Saver mode: navigator.connection.saveData
 */
export function useMotionProfile(): DevicePerformanceProfile {
  const [profile, setProfile] = useState<DevicePerformanceProfile>(() => {
    if (typeof window === 'undefined') {
      return {
        shouldReduceMotion: false,
        prefersReducedMotion: false,
        isLowPerfDevice: false,
      };
    }

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Detect hardware concurrency and memory profiles
    const nav = navigator as unknown as {
      hardwareConcurrency?: number;
      deviceMemory?: number;
      connection?: { saveData?: boolean; effectiveType?: string };
    };

    const isLowMemory = typeof nav.deviceMemory === 'number' && nav.deviceMemory < 4;
    const isLowConcurrency = typeof nav.hardwareConcurrency === 'number' && nav.hardwareConcurrency <= 4;
    const isDataSaver = Boolean(nav.connection?.saveData);

    const isLowPerf = isLowMemory || isLowConcurrency || isDataSaver;

    return {
      shouldReduceMotion: prefersReduced || isLowPerf,
      prefersReducedMotion: prefersReduced,
      isLowPerfDevice: isLowPerf,
    };
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    const handleChange = (e: MediaQueryListEvent) => {
      setProfile((prev) => ({
        ...prev,
        prefersReducedMotion: e.matches,
        shouldReduceMotion: e.matches || prev.isLowPerfDevice,
      }));
    };

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
    } else {
      mediaQuery.addListener(handleChange);
    }

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handleChange);
      } else {
        mediaQuery.removeListener(handleChange);
      }
    };
  }, []);

  return profile;
}

/**
 * Drop-in useReducedMotion hook that returns true if the user prefers reduced motion
 * OR if the device has a lower performance profile.
 */
export function useReducedMotion(): boolean {
  const { shouldReduceMotion } = useMotionProfile();
  return shouldReduceMotion;
}

export default useReducedMotion;
