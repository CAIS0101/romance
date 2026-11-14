// Gallery Component
import { CONFIG } from '../config';

export function Gallery() {
  return (
    <section id="gallery" className="py-12 md:py-16 px-4 reveal" aria-labelledby="gallery-title">
      <div className="max-w-5xl mx-auto">
        <div className="reveal-stagger">
          <h2
            id="gallery-title"
            className="font-display text-3xl md:text-4xl font-medium text-ink text-center mb-8"
          >
            Nuestros recuerdos
          </h2>

          <div
            className="grid grid-cols-2 gap-4 md:gap-6"
            id="gallery-grid"
            role="list"
            aria-label="Galería de fotos"
          >
            {CONFIG.photos.map((photo, index) => (
              <div
                key={index}
                className="reveal group relative aspect-square overflow-hidden rounded-2xl"
                style={{ transitionDelay: `${index * 0.1}s` }}
                role="listitem"
              >
                <img
                  src={photo.src}
                  alt={photo.alt}
                  className="gallery-img w-full h-full object-cover transition-all duration-500"
                  loading="lazy"
                  width="400"
                  height="400"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-rose-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <span className="font-display text-white text-sm w-full text-center">
                    {photo.caption}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}