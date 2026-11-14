// Gift Voucher Component - Simplified Popup
import { useState } from 'react';
import { CONFIG } from '../config';

export function Voucher() {
  const [isOpen, setIsOpen] = useState(false);

  const openVoucher = () => setIsOpen(true);
  const closeVoucher = () => setIsOpen(false);

  return (
    <section id="voucher" className="py-12 md:py-16 px-4 reveal safe-bottom" aria-labelledby="voucher-title">
      <div className="max-w-md mx-auto">
        <div className="reveal-stagger">
          <h2 id="voucher-title" className="font-display text-3xl md:text-4xl font-medium text-ink text-center mb-8">
            Un regalo para ti
          </h2>

          {/* Gift card button */}
          <button
            onClick={openVoucher}
            className="btn-press w-full bg-gradient-to-r from-rose-500 via-rose-600 to-rose-700 hover:from-rose-600 hover:via-rose-700 hover:to-rose-800 text-white font-bold text-lg md:text-xl py-6 px-8 rounded-2xl shadow-2xl shadow-rose-500/50 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] touch-target focus:ring-4 focus:ring-rose-300 relative overflow-hidden group"
            aria-label="Abrir regalo sorpresa"
            style={{ boxShadow: '0 20px 50px -15px rgba(219, 39, 119, 0.4)' }}
          >
            <span className="flex items-center justify-center gap-3 relative z-10">
              <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M21 8V21c0 1.657-1.343 3-3 3H6c-1.657 0-3-1.343-3-3V8M1 8V8c0-2.76 2.24-5 5-5h12.79M21 8H6.828M21 8l-4 4-4-4M3.172 8H18M12 18v-6" />
              </svg>
              Canjear Sorpresa
            </span>
            {/* Decorative hearts */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="absolute text-rose-300/30 text-2xl" style={{
                  left: `${10 + Math.random() * 80}%`,
                  top: `${10 + Math.random() * 80}%`,
                  animation: `floatGentle ${3 + Math.random() * 2}s ease-in-out infinite`,
                  animationDelay: `${Math.random() * 1}s`
                }}>♡</div>
              ))}
            </div>
          </button>

          {/* Popup Modal */}
          {isOpen && (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 backdrop-blur-sm animate-fadeIn"
              role="dialog"
              aria-modal="true"
              aria-labelledby="popup-title"
              onClick={closeVoucher}
            >
              <article
                className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl p-8 md:p-10 paper-popup transform transition-all duration-300 animate-scaleIn"
                onClick={(e) => e.stopPropagation()}
                style={{
                  backgroundImage: `
                    linear-gradient(#fdf8f5, #fdf8f5),
                    repeating-linear-gradient(
                      rgba(251, 207, 232, 0.4) 0px,
                      rgba(251, 207, 232, 0.4) 1px,
                      transparent 1px,
                      transparent 28px
                    )
                  `,
                  backgroundBlendMode: 'multiply',
                  boxShadow: '0 25px 80px -20px rgba(219, 39, 119, 0.3), 0 0 0 1px rgba(251, 207, 232, 0.5), inset 0 1px 0 rgba(255,255,255,0.8)'
                }}
              >
                {/* Decorative hearts on paper */}
                <div className="absolute top-4 right-4 text-rose-300/50 text-2xl" aria-hidden="true">♡</div>
                <div className="absolute bottom-4 left-4 text-rose-300/50 text-2xl rotate-180" aria-hidden="true">♡</div>
                <div className="absolute top-1/2 left-2 -translate-y-1/2 text-rose-300/30 text-xl" aria-hidden="true">♡</div>
                <div className="absolute top-1/2 right-2 -translate-y-1/2 text-rose-300/30 text-xl" aria-hidden="true">♡</div>

                <div className="relative z-10 text-center">
                  <svg className="w-16 h-16 mx-auto text-rose-500 mb-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>

                  <p id="popup-title" className="font-display text-2xl md:text-3xl font-medium text-ink mb-3">
                    {CONFIG.voucher.title}
                  </p>
                  <p className="text-rose-600 font-medium mb-6">{CONFIG.voucher.message}</p>

                  <div className="bg-gradient-to-br from-rose-50 via-white to-blush rounded-2xl p-6 mb-6 border border-rose-100 shadow-inner">
                    <p className="font-display text-xl md:text-2xl leading-relaxed text-rose-deep font-medium">
                      {CONFIG.voucher.detail}
                    </p>
                  </div>

                  <button
                    onClick={closeVoucher}
                    className="btn-press bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white font-medium py-3 px-8 rounded-full shadow-lg transition-all duration-200 hover:scale-105 active:scale-95 touch-target focus:ring-4 focus:ring-rose-300"
                    aria-label="Cerrar regalo"
                  >
                    Guardar este momento ♡
                  </button>
                </div>
              </article>
            </div>
          )}

          <style jsx global>{`
            @keyframes fadeIn {
              from { opacity: 0; }
              to { opacity: 1; }
            }
            @keyframes scaleIn {
              from { opacity: 0; transform: scale(0.9) translateY(20px); }
              to { opacity: 1; transform: scale(1) translateY(0); }
            }
            .animate-fadeIn { animation: fadeIn 0.3s ease-out forwards; }
            .animate-scaleIn { animation: scaleIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
            .paper-popup {
              background-color: #fdf8f5;
            }
          `}</style>
        </div>
      </div>
    </section>
  );
}