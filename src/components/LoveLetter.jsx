// Love Letter Component
import { CONFIG } from '../config';

export function LoveLetter() {
  return (
    <section id="letter" className="py-12 md:py-16 px-4 reveal" aria-labelledby="letter-title">
      <div className="max-w-2xl mx-auto">
        <div className="reveal-stagger">
          <h2
            id="letter-title"
            className="font-display text-3xl md:text-4xl font-medium text-ink text-center mb-8"
          >
            Mi carta para ti
          </h2>

          <article className="letter-paper rounded-2xl p-6 md:p-10 shadow-xl relative" aria-label="Carta de amor">
            <div className="absolute -top-4 -right-4 w-16 h-16 md:w-20 md:h-20 opacity-20" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full text-rose-500">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            </div>

            <div className="font-display text-lg md:text-xl leading-relaxed text-ink space-y-6" id="letter-content">
              {CONFIG.letter.map((paragraph, index) => (
                <p key={index} className="reveal" style={{ transitionDelay: `${index * 0.15}s` }}>
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="mt-10 pt-6 border-t border-rose-200 text-right">
              <p className="font-display text-xl italic text-rose-deep" id="letter-signature">
                Con todo mi amor,
              </p>
              <p className="font-display text-2xl font-medium text-ink mt-1" id="sender-name">
                {CONFIG.senderName}
              </p>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}