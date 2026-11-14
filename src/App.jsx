// Main App Component
import { useEffect, useState } from 'react';
import { CONFIG } from './config';
import { useScrollReveal, useFloatingHearts, useFloatingMessages } from './hooks';
import { announceToScreenReader } from './utils';

// Sections
import { Hero } from './components/Hero';
import { MusicPlayer } from './components/MusicPlayer';
import { Gallery } from './components/Gallery';
import { LoveLetter } from './components/LoveLetter';
import { Timeline } from './components/Timeline';
import { Voucher } from './components/Voucher';
import { SplashScreen } from './components/SplashScreen';

function App() {
  const [showSplash, setShowSplash] = useState(true);

  // Initialize scroll reveal
  useScrollReveal();

  // Initialize floating hearts
  useFloatingHearts();

  // Initialize floating romantic messages
  useFloatingMessages();

  // Announce page load for screen readers (after splash dismisses)
  useEffect(() => {
    if (showSplash) return;
    
    const timer = setTimeout(() => {
      announceToScreenReader(
        `Bienvenida, ${CONFIG.partnerName}. Página de amor cargada con contador, música, galería, carta, línea de tiempo y sorpresa interactiva.`
      );
    }, 1000);

    return () => clearTimeout(timer);
  }, [showSplash]);

  // Update page title
  useEffect(() => {
    document.title = `Para ${CONFIG.partnerName} ❤️`;
  }, []);

  // Initialize Lucide icons
  useEffect(() => {
    if (window.lucide) {
      window.lucide.createIcons();
    }
  }, []);

  const handleSplashDismiss = () => {
    setShowSplash(false);
  };

  return (
    <>
      {/* Splash Screen - shows first */}
      <SplashScreen onDismiss={handleSplashDismiss} />

      {/* Main content - shows after splash dismisses */}
      {!showSplash && (
        <>
          {/* Floating hearts background */}
          <div id="floating-hearts" aria-hidden="true" />

          {/* Confetti canvas */}
          <canvas id="confetti-canvas" aria-hidden="true" />

          {/* Skip to main content for accessibility */}
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-rose-600 focus:text-white focus:rounded-lg focus:font-medium"
          >
            Saltar al contenido principal
          </a>

          <main id="main-content" className="relative z-10 min-h-screen hero-gradient safe-top safe-bottom">
            <Hero />
            <MusicPlayer />
            <Gallery />
            <LoveLetter />
            <Timeline />
            <Voucher />

            {/* Footer */}
            <footer
              className="py-8 px-4 text-center border-t border-rose-100 cursor-pointer"
              role="contentinfo"
              tabIndex={0}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }}
              aria-label="Volver al inicio"
            >
              <p className="text-rose-400 text-sm font-medium">Hecho con 💕 para ti</p>
              <p className="text-rose-300 text-xs mt-1">Desliza hacia arriba para volver al inicio</p>
            </footer>
          </main>
        </>
      )}
    </>
  );
}

export default App;