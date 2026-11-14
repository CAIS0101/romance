// Custom hooks
import { useState, useEffect, useRef, useCallback } from 'react';
import { CONFIG } from './config';
import { padZero, announceToScreenReader } from './utils';

// Hook for real-time counter
export function useCounter() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: '00',
    minutes: '00',
    seconds: '00'
  });

  useEffect(() => {
    const updateCounter = () => {
      const startDate = new Date(CONFIG.anniversaryDate);
      const now = new Date();
      const diff = now - startDate;

      if (diff < 0) {
        setTimeLeft({ days: 0, hours: '00', minutes: '00', seconds: '00' });
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft({
        days,
        hours: padZero(hours),
        minutes: padZero(minutes),
        seconds: padZero(seconds)
      });
    };

    updateCounter();
    const interval = setInterval(updateCounter, 1000);
    return () => clearInterval(interval);
  }, []);

  return timeLeft;
}

// Hook for music player - Simple Spotify style (single track)
export function useMusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);
  
  const audioRef = useRef(null);

  const play = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(err => console.log('Audio play failed:', err));
    }
  }, []);

  const pause = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  }, []);

  const toggle = useCallback(() => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  }, [isPlaying, play, pause]);

  const seek = useCallback((time) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  }, []);

  const setVolumeLevel = useCallback((vol) => {
    if (audioRef.current) {
      audioRef.current.volume = vol;
      setVolume(vol);
    }
  }, []);

  // Handle audio events
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      audio.currentTime = 0;
    };

    const handleError = () => {
      console.log('Audio error');
      pause();
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('error', handleError);

    // Apply volume
    audio.volume = volume;

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('error', handleError);
    };
  }, [volume, pause]);

  const formatTime = (time) => {
    if (isNaN(time)) return '0:00';
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return {
    isPlaying,
    currentTime,
    duration,
    volume,
    song: CONFIG.song,
    play,
    pause,
    toggle,
    seek,
    setVolume: setVolumeLevel,
    audioRef,
    formatTime
  };
}

// Hook for scroll reveal (Intersection Observer)
export function useScrollReveal() {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const observeElements = () => {
      if (prefersReducedMotion) {
        document.querySelectorAll('.reveal, .reveal-stagger').forEach(el => {
          el.classList.add('visible');
        });
        return;
      }

      const observerOptions = {
        root: null,
        rootMargin: '0px 0px -10% 0px',
        threshold: 0.1
      };

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      }, observerOptions);

      document.querySelectorAll('.reveal, .reveal-stagger').forEach(el => {
        observer.observe(el);
      });

      return observer;
    };

    // Initial observation
    const observer = observeElements();

    // Also observe when new elements are added (e.g., after splash dismisses)
    const mutationObserver = new MutationObserver((mutations) => {
      let hasNewRevealElements = false;
      mutations.forEach(mutation => {
        mutation.addedNodes.forEach(node => {
          if (node.nodeType === 1) { // Element node
            if (node.matches('.reveal, .reveal-stagger') || node.querySelector('.reveal, .reveal-stagger')) {
              hasNewRevealElements = true;
            }
          }
        });
      });
      if (hasNewRevealElements) {
        if (observer) observer.disconnect();
        observeElements();
      }
    });

    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      if (observer) observer.disconnect();
      mutationObserver.disconnect();
    };
  }, []);
}

// Hook for confetti
export function useConfetti() {
  const triggerConfetti = useCallback((colors) => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    // Dynamically import confetti with error handling
    import('canvas-confetti')
      .then(({ default: confetti }) => {
        const canvas = document.getElementById('confetti-canvas');
        if (!canvas) {
          console.warn('Confetti canvas not found');
          return;
        }

        try {
          const myConfetti = confetti.create(canvas, {
            resize: true,
            useWorker: true
          });

          const duration = 3000;
          const end = Date.now() + duration;

          (function frame() {
            myConfetti({
              particleCount: 5,
              angle: 60,
              spread: 55,
              origin: { x: 0 },
              colors
            });
            myConfetti({
              particleCount: 5,
              angle: 120,
              spread: 55,
              origin: { x: 1 },
              colors
            });

            if (Date.now() < end) {
              requestAnimationFrame(frame);
            }
          }());

          setTimeout(() => {
            myConfetti({
              particleCount: 100,
              spread: 70,
              origin: { y: 0.6 },
              colors,
              scalar: 1.2
            });
          }, 500);
        } catch (err) {
          console.warn('Confetti initialization failed:', err);
        }
      })
      .catch((err) => {
        console.warn('Failed to load canvas-confetti:', err);
      });
  }, []);

  return { triggerConfetti };
}

// Hook for floating hearts
export function useFloatingHearts() {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const container = document.getElementById('floating-hearts');
    if (!container) return;

    const heartSVG = `<svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>`;

    for (let i = 0; i < 12; i++) {
      const heart = document.createElement('div');
      heart.className = 'floating-heart';
      heart.innerHTML = heartSVG;
      heart.style.left = `${Math.random() * 100}%`;
      heart.style.animationDelay = `${Math.random() * 8}s`;
      heart.style.animationDuration = `${8 + Math.random() * 4}s`;
      heart.style.opacity = `${0.3 + Math.random() * 0.4}`;
      heart.style.transform = `scale(${0.5 + Math.random() * 0.5})`;
      container.appendChild(heart);
    }

    return () => {
      container.innerHTML = '';
    };
  }, []);
}

// Hook for responsive timeline
export function useResponsiveTimeline() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return isMobile;
}

// Hook for floating romantic messages (bubbles)
export function useFloatingMessages() {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const messages = CONFIG.floatingMessages || [];
    if (messages.length === 0) return;

    // Create container for floating messages
    const container = document.createElement('div');
    container.id = 'floating-messages';
    container.setAttribute('aria-hidden', 'true');
    container.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 1;
      overflow: hidden;
    `;
    document.body.appendChild(container);

    const messageElements = [];

    // Create message bubbles
    messages.forEach((text, index) => {
      const bubble = document.createElement('div');
      bubble.className = 'floating-message-bubble';
      bubble.textContent = text;
      bubble.style.cssText = `
        position: absolute;
        padding: 12px 20px;
        background: linear-gradient(135deg, rgba(255,255,255,0.95), rgba(253,230,138,0.9));
        border: 2px solid rgba(219,39,119,0.3);
        border-radius: 50px;
        font-family: var(--font-display);
        font-size: 0.9rem;
        font-weight: 500;
        color: #9d174d;
        box-shadow: 
          0 4px 20px rgba(219,39,119,0.15),
          0 2px 8px rgba(219,39,119,0.1),
          inset 0 1px 0 rgba(255,255,255,0.6);
        white-space: nowrap;
        opacity: 0;
        transform: translateY(20px) scale(0.9);
        animation: floatMessageUp 20s ease-in-out infinite;
        animation-delay: ${index * 2.5}s;
        animation-duration: ${18 + Math.random() * 6}s;
      `;
      
      // Random horizontal position (15% to 85%)
      bubble.style.left = `${15 + Math.random() * 70}%`;
      // Start from bottom-ish
      bubble.style.bottom = `${-100 - Math.random() * 50}px`;
      
      container.appendChild(bubble);
      messageElements.push(bubble);
    });

    // Add keyframes dynamically
    const style = document.createElement('style');
    style.textContent = `
      @keyframes floatMessageUp {
        0% {
          opacity: 0;
          transform: translateY(100vh) scale(0.8) rotate(-2deg);
        }
        10% {
          opacity: 1;
          transform: translateY(80vh) scale(1) rotate(1deg);
        }
        40% {
          opacity: 0.9;
          transform: translateY(40vh) scale(1) rotate(-1deg);
        }
        70% {
          opacity: 0.7;
          transform: translateY(10vh) scale(0.95) rotate(1deg);
        }
        90% {
          opacity: 0.3;
          transform: translateY(-20vh) scale(0.9) rotate(-1deg);
        }
        100% {
          opacity: 0;
          transform: translateY(-50vh) scale(0.8) rotate(2deg);
        }
      }
      
      @media (prefers-reduced-motion: reduce) {
        .floating-message-bubble {
          animation: none !important;
          display: none !important;
        }
      }
    `;
    document.head.appendChild(style);

    return () => {
      container.remove();
      style.remove();
    };
  }, []);
}