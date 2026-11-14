// Timeline Component
import { CONFIG } from '../config';
import { useResponsiveTimeline } from '../hooks';
import { iconSVGs } from '../utils';

function TimelineItem({ milestone, index, isMobile, isEven }) {
  const Icon = iconSVGs[milestone.icon] || iconSVGs.heart;

  if (isMobile) {
    return (
      <div
        key={index}
        className="reveal relative"
        style={{ transitionDelay: `${index * 0.15}s` }}
        role="listitem"
      >
        <div
          className="absolute left-6 top-4 w-3 h-3 rounded-full bg-rose-400 border-4 border-white shadow-lg z-10"
          aria-hidden="true"
        />
        <div className="ml-14 pb-10 last:pb-0">
          <div className="flex items-center gap-3 mb-2">
            <span className="font-display text-xl font-medium text-ink">
              {milestone.date}
            </span>
            <span
              className="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center text-rose-500 flex-shrink-0"
              aria-hidden="true"
            >
              {Icon}
            </span>
          </div>
          <h3 className="font-display text-lg font-medium text-ink mb-1">
            {milestone.title}
          </h3>
          <p className="text-rose-500 text-sm leading-relaxed">
            {milestone.desc}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      key={index}
      className="reveal relative"
      style={{
        transitionDelay: `${index * 0.15}s`,
        width: '50%',
        position: 'absolute',
        left: isEven ? '0' : '50%',
        top: `${index * 140}px`,
        padding: isEven ? '0 80px 0 40px' : '0 40px 0 80px',
        textAlign: isEven ? 'right' : 'left'
      }}
      role="listitem"
    >
      <div className="relative">
        <div
          className={`absolute top-4 ${isEven ? 'right-0' : 'left-0'} -translate-x-1/2 w-5 h-5 rounded-full bg-rose-400 border-4 border-white shadow-lg z-10`}
          aria-hidden="true"
          style={{
            transform: isEven ? 'translateX(50%)' : 'translateX(-50%)'
          }}
        />
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-rose-100">
          <div className="flex items-center justify-between mb-3">
            <span className="font-display text-lg font-medium text-ink">
              {milestone.date}
            </span>
            <span
              className="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center text-rose-500 flex-shrink-0"
              aria-hidden="true"
            >
              {Icon}
            </span>
          </div>
          <h3 className="font-display text-lg font-medium text-ink mb-1">
            {milestone.title}
          </h3>
          <p className="text-rose-500 text-sm leading-relaxed">
            {milestone.desc}
          </p>
        </div>
      </div>
    </div>
  );
}

export function Timeline() {
  const isMobile = useResponsiveTimeline();

  return (
    <section
      id="timeline"
      className="py-12 md:py-16 px-4 reveal"
      aria-labelledby="timeline-title"
    >
      <div className="max-w-2xl mx-auto">
        <div className="reveal-stagger">
          <h2
            id="timeline-title"
            className="font-display text-3xl md:text-4xl font-medium text-ink text-center mb-12"
          >
            Nuestra historia
          </h2>

          <div
            className="timeline relative"
            id="timeline-container"
            role="list"
            aria-label="Línea de tiempo de hitos"
            style={{
              height: isMobile ? 'auto' : `${CONFIG.milestones.length * 140}px`,
              position: isMobile ? 'static' : 'relative'
            }}
          >
            {CONFIG.milestones.map((milestone, index) => (
              <TimelineItem
                key={index}
                milestone={milestone}
                index={index}
                isMobile={isMobile}
                isEven={index % 2 === 0}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}