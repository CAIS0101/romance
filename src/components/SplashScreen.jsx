// Splash Screen Component - Initial screen before main page
import { useState, useEffect } from 'react';

export function SplashScreen({ onDismiss }) {
  const [isVisible, setIsVisible] = useState(true);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Trigger entrance animation
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const handleDismiss = (e) => {
    // Prevent dismissal if clicking on interactive elements inside (except the dismiss button)
    if (e.target.closest('a') || (e.target.closest('button') && !e.target.closest('#dismiss-btn'))) return;

    setShowContent(false);
    const exitTimer = setTimeout(() => {
      setIsVisible(false);
      onDismiss();
    }, 600); // Match CSS transition duration

    return () => clearTimeout(exitTimer);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ' || e.key === 'Escape') {
      e.preventDefault();
      handleDismiss(e);
    }
  };

  if (!isVisible) return null;

  return (
    <div
      id="splash-screen"
      className={`fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-rose-50 via-cream to-blush transition-opacity duration-500 ${showContent ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="splash-title"
      onClick={handleDismiss}
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      <div
        className={`relative text-center px-6 transform transition-all duration-700 ease-out ${showContent ? 'scale-100 opacity-100' : 'scale-90 opacity-0'}`}
      >
        {/* Floating hearts background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute text-rose-300/50"
              style={{
                left: `${10 + Math.random() * 80}%`,
                top: `${10 + Math.random() * 80}%`,
                fontSize: `${20 + Math.random() * 20}px`,
                animation: `floatGentle ${4 + Math.random() * 3}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 2}s`
              }}
            >
              ♡
            </div>
          ))}
        </div>

        {/* Main content */}
        <div className="relative z-10">
          {/* Decorative top element */}
          <div className="mb-8">
            <svg
              className="w-20 h-20 mx-auto text-rose-300/60 animate-pulse"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </div>

          {/* Title */}
          <h1
            id="splash-title"
            className="font-display text-3xl md:text-4xl lg:text-5xl font-medium text-ink mb-4 leading-tight tracking-tight"
          >
            Para ti, mi amor
          </h1>

          {/* Subtitle */}
          <p className="font-display text-lg md:text-xl text-rose-600 mb-10 italic">
            He preparado algo especial para ti
          </p>

          {/* Tap instruction */}
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <button
                id="dismiss-btn"
                onClick={handleDismiss}
                className="btn-press bg-white/80 backdrop-blur-sm border-2 border-rose-200 text-rose-600 font-medium py-4 px-10 rounded-full shadow-lg transition-all duration-300 hover:scale-105 hover:border-rose-300 hover:bg-white focus:outline-none focus:ring-4 focus:ring-rose-300/50 touch-target group"
                aria-label="Tocar para descubrir la sorpresa"
              >
                <span className="flex items-center gap-3">
                  <svg
                    className="w-6 h-6 text-rose-400 group-hover:text-rose-500 transition-colors"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    aria-hidden="true"
                  >
                    <path d="M21 8V21c0 1.657-1.343 3-3 3H6c-1.657 0-3-1.343-3-3V8M1 8V8c0-2.76 2.24-5 5-5h12.79M21 8H6.828M21 8l-4 4-4-4M3.172 8H18M12 18v-6" />
                  </svg>
                  <span className="text-base md:text-lg">Tocar para descubrir la sorpresa</span>
                </span>
              </button>
            </div>

            {/* Animated hint */}
            <div className="flex items-center gap-2 text-rose-400/70 animate-bounce" aria-hidden="true">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 5v14M19 12l-7 7-7-7" />
              </svg>
              <span className="text-sm hidden sm:block">Desliza o toca en cualquier lugar</span>
            </div>
          </div>

          {/* Decorative bottom */}
          <div className="mt-12 flex justify-center gap-2" aria-hidden="true">
            <span className="w-16 h-px bg-gradient-to-r from-transparent via-rose-300 to-transparent" />
            <svg className="w-6 h-6 text-rose-300/50" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
            <span className="w-16 h-px bg-gradient-to-r from-transparent via-rose-300 to-transparent" />
          </div>
        </div>
      </div>
    </div>
  );
}