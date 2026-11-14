// Music Player Component - Simple Spotify Style (Single Track)
import { useMusicPlayer } from '../hooks';

export function MusicPlayer() {
  const {
    isPlaying,
    currentTime,
    duration,
    volume,
    song,
    toggle,
    seek,
    setVolume,
    audioRef,
    formatTime
  } = useMusicPlayer();

  const handleProgressClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    seek(percent * duration);
  };

  const handleVolumeClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const percent = 1 - (e.clientY - rect.top) / rect.height;
    setVolume(Math.max(0, Math.min(1, percent)));
  };

  return (
    <section id="music" className="py-12 md:py-16 px-4 reveal" aria-labelledby="music-title">
      <div className="max-w-xl mx-auto">
        <div className="reveal-stagger">
          <h2 id="music-title" className="font-display text-3xl md:text-4xl font-medium text-ink text-center mb-8">
            Nuestra canción
          </h2>

          {/* Spotify-style player card - Clean and simple */}
          <div className="bg-gradient-to-br from-rose-900 via-rose-800 to-rose-900 rounded-3xl shadow-2xl border border-rose-700/50 overflow-hidden relative p-6 md:p-8">
            
            {/* Track info & cover - horizontal layout */}
            <div className="flex flex-col md:flex-row gap-6 items-center md:items-start mb-6">
              {/* Cover art */}
              <div className="relative flex-shrink-0 w-32 h-32 md:w-40 md:h-40" aria-hidden="true">
                <div className="absolute inset-0 bg-gradient-to-br from-rose-500/30 to-rose-600/30 rounded-xl blur-xl" />
                <img
                  src={song.cover}
                  alt={song.title}
                  className="relative w-full h-full object-cover rounded-xl shadow-2xl transition-transform duration-300"
                  loading="lazy"
                />
              </div>

              {/* Track info */}
              <div className="flex-1 text-center md:text-left min-w-0">
                <p className="text-xs font-medium text-green-400 uppercase tracking-wider mb-2">Reproduciendo ahora</p>
                <h3 className="font-display text-xl md:text-2xl font-medium text-white mb-1 truncate">
                  {song.title}
                </h3>
                <p className="text-rose-200 font-medium" id="current-song-artist">
                  {song.artist}
                </p>
              </div>
            </div>

            {/* Progress bar */}
            <div className="mb-6">
              <div className="relative group">
                <div
                  className="h-1.5 bg-rose-700 rounded-full cursor-pointer"
                  onClick={handleProgressClick}
                  role="slider"
                  aria-label="Progreso de la canción"
                  aria-valuemin={0}
                  aria-valuemax={Math.floor(duration) || 100}
                  aria-valuenow={Math.floor(currentTime)}
                  tabIndex={0}
                  onKeyDown={(e) => {
                    const step = duration / 100;
                    if (e.key === 'ArrowRight') seek(currentTime + step);
                    if (e.key === 'ArrowLeft') seek(currentTime - step);
                  }}
                >
                  <div
                    className="h-full bg-green-500 rounded-full transition-all duration-75 ease-out"
                    style={{ width: `${duration > 0 ? (currentTime / duration) * 100 : 0}%` }}
                  >
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-green-400 rounded-full transform translate-x-1/2 opacity-0 group-hover:opacity-100 hover:scale-150 transition-all duration-200 shadow-lg" />
                  </div>
                </div>
                <div className="flex justify-between text-xs text-rose-300 mt-2 font-mono">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>
            </div>

            {/* Controls */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6">
              {/* Volume */}
              <div className="flex items-center gap-3 w-full md:w-auto">
                <button
                  onClick={() => setVolume(volume > 0 ? 0 : 0.8)}
                  className="text-rose-200 hover:text-green-400 transition-colors p-2"
                  aria-label={volume > 0 ? 'Silenciar' : 'Activar sonido'}
                >
                  {volume > 0.5 ? (
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                      <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
                    </svg>
                  ) : volume > 0 ? (
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                      <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                      <line x1="23" y1="9" x2="17" y2="15" />
                      <line x1="17" y1="9" x2="23" y2="15" />
                    </svg>
                  )}
                </button>
                <div 
                  className="flex-1 h-1.5 bg-rose-700 rounded-full cursor-pointer relative group"
                  onClick={handleVolumeClick}
                  role="slider"
                  aria-label="Volumen"
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-valuenow={Math.floor(volume * 100)}
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'ArrowUp') setVolume(Math.min(1, volume + 0.1));
                    if (e.key === 'ArrowDown') setVolume(Math.max(0, volume - 0.1));
                  }}
                >
                  <div
                    className="h-full bg-green-500 rounded-full transition-all duration-75"
                    style={{ width: `${volume * 100}%` }}
                  >
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-green-400 rounded-full transform translate-x-1/2 opacity-0 group-hover:opacity-100 hover:scale-150 transition-all duration-200 shadow-lg" />
                  </div>
                </div>
              </div>

              {/* Play/Pause - Main button */}
              <button
                onClick={toggle}
                className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-green-500 hover:bg-green-400 shadow-2xl shadow-green-500/50 flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-green-400/50 relative group"
                aria-label={isPlaying ? 'Pausar' : 'Reproducir'}
                aria-pressed={isPlaying}
              >
                {/* Pulse animation when playing */}
                <div className="absolute inset-0 rounded-full bg-green-500/20 animate-ping opacity-0 group-hover:opacity-100" aria-hidden="true" />
                {isPlaying ? (
                  <svg className="w-6 h-6 md:w-7 md:h-7 text-white ml-1" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <rect x="6" y="4" width="4" height="16" rx="1" />
                    <rect x="14" y="4" width="4" height="16" rx="1" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6 md:w-7 md:h-7 text-white ml-1" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Hidden audio element */}
          <audio
            ref={audioRef}
            id="audio-player"
            preload="metadata"
            crossOrigin="anonymous"
          >
            <source src={song.url} type="audio/mpeg" />
            Tu navegador no soporta audio HTML5.
          </audio>
        </div>
      </div>
    </section>
  );
}