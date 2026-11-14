// Hero Section Component
import { useCounter } from '../hooks';
import { CONFIG } from '../config';

export function Hero() {
  const { days, hours, minutes, seconds } = useCounter();

  const startDate = new Date(CONFIG.anniversaryDate);
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const anniversaryText = `Desde el ${startDate.toLocaleDateString('es-ES', options)}`;

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center px-4 py-12 md:py-20 reveal safe-top safe-bottom"
      aria-labelledby="hero-title"
    >
      <div className="text-center max-w-md mx-auto">
        <div className="mb-8 flex justify-center">
          <svg
            className="w-16 h-16 text-rose-300/50 heartbeat"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </div>

        <h1
          id="hero-title"
          className="font-display text-4xl md:text-5xl lg:text-6xl font-medium text-ink mb-4 leading-tight tracking-tight"
        >
          Para el amor de mi vida,
        </h1>

        <p className="font-display text-2xl md:text-3xl font-medium text-rose-deep mb-8 italic">
          <span id="partner-name" className="text-rose-dark">{CONFIG.partnerName}</span>
        </p>

        <div
          className="reveal-stagger bg-white/80 backdrop-blur-sm rounded-3xl p-6 md:p-8 shadow-xl border border-rose-100 mb-8"
          role="timer"
          aria-live="polite"
          aria-label="Tiempo juntos"
        >
          <p className="text-sm font-medium text-rose-600 uppercase tracking-wider mb-4">Tiempo juntos</p>
          <div className="flex flex-wrap justify-center gap-3 md:gap-6" id="counter-display">
            <div className="counter-item text-center min-w-[70px]">
              <div
                id="days"
                className="counter-number font-display text-4xl md:text-5xl font-bold text-rose-deep leading-none"
                aria-label="Días"
              >
                {days}
              </div>
              <div className="text-xs font-medium text-rose-500 uppercase tracking-wider mt-1">Días</div>
            </div>
            <div className="counter-item text-center min-w-[70px]">
              <div
                id="hours"
                className="counter-number font-display text-4xl md:text-5xl font-bold text-rose-deep leading-none"
                style={{ animationDelay: '0.1s' }}
                aria-label="Horas"
              >
                {hours}
              </div>
              <div className="text-xs font-medium text-rose-500 uppercase tracking-wider mt-1">Horas</div>
            </div>
            <div className="counter-item text-center min-w-[70px]">
              <div
                id="minutes"
                className="counter-number font-display text-4xl md:text-5xl font-bold text-rose-deep leading-none"
                style={{ animationDelay: '0.2s' }}
                aria-label="Minutos"
              >
                {minutes}
              </div>
              <div className="text-xs font-medium text-rose-500 uppercase tracking-wider mt-1">Minutos</div>
            </div>
            <div className="counter-item text-center min-w-[70px]">
              <div
                id="seconds"
                className="counter-number font-display text-4xl md:text-5xl font-bold text-rose-deep leading-none"
                style={{ animationDelay: '0.3s' }}
                aria-label="Segundos"
              >
                {seconds}
              </div>
              <div className="text-xs font-medium text-rose-500 uppercase tracking-wider mt-1">Segundos</div>
            </div>
          </div>
          <p id="anniversary-date" className="text-xs text-rose-400 mt-4" aria-hidden="true">
            {anniversaryText}
          </p>
        </div>

        <div className="flex flex-col items-center gap-2 text-rose-400 animate-bounce" aria-hidden="true">
          <span className="text-xs uppercase tracking-wider">Desliza para descubrir más</span>
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 5v14M19 12l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </section>
  );
}