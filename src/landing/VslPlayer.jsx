import React from 'react';
import { PulseDivider } from '../shared/ui.jsx';
import { REVEAL_AT_SECONDS, VSL_POSTER, VSL_URL } from './data/offer.js';

const REVEALED_KEY = 'dc-vsl-cta-revealed';

/**
 * Devuelve true cuando el botón de compra debe estar visible: al llegar al segundo
 * configurado de reproducción, o si ya se llegó en una visita anterior (persistido),
 * o con ?cta=1 para revisar la página sin esperar.
 */
export function useCtaReveal() {
  const [revealed, setRevealed] = React.useState(() => {
    try {
      if (new URLSearchParams(window.location.search).get('cta') === '1') return true;
      return window.localStorage.getItem(REVEALED_KEY) === '1';
    } catch {
      return false;
    }
  });
  const reveal = React.useCallback(() => {
    setRevealed(true);
    try {
      window.localStorage.setItem(REVEALED_KEY, '1');
    } catch {
      /* sin almacenamiento: se revela igual en esta visita */
    }
  }, []);
  return [revealed, reveal];
}

const PlayIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" style={{ width: 30, height: 30, marginLeft: 4 }}>
    <path d="M8 5v14l11-7z" />
  </svg>
);

/**
 * Reproductor del VSL. Sin URL muestra el hueco reservado con la estética de marca.
 * Con URL: portada + botón de play (los navegadores no permiten autoplay con sonido),
 * controles nativos, y aviso al llegar al segundo de revelado.
 */
export default function VslPlayer({ onReveal, revealed }) {
  const video = React.useRef(null);
  const [started, setStarted] = React.useState(false);

  const onTime = () => {
    if (!revealed && video.current && video.current.currentTime >= REVEAL_AT_SECONDS) onReveal();
  };

  const play = () => {
    setStarted(true);
    video.current?.play().catch(() => {});
  };

  const frame = {
    position: 'relative',
    width: '100%',
    aspectRatio: '16 / 9',
    borderRadius: 'var(--radius-xl)',
    overflow: 'hidden',
    background: 'var(--dc-navy-950)',
    boxShadow: 'var(--shadow-lg)',
    border: '1px solid var(--border-on-dark)',
  };

  if (!VSL_URL) {
    return (
      <div style={{ ...frame, display: 'flex', alignItems: 'center', justifyContent: 'center' }} aria-label="Espacio reservado para el video">
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14, padding: 24, textAlign: 'center' }}>
          <PulseDivider onDark width={220} />
          <span style={{ font: 'var(--type-label)', letterSpacing: 'var(--tracking-label)', textTransform: 'uppercase', color: 'var(--dc-pulse-400)' }}>
            Video del método
          </span>
          <span style={{ font: 'var(--type-body-sm)', color: 'var(--text-muted-on-dark)', maxWidth: '36ch' }}>
            Aquí va el VSL. Se activa definiendo VITE_VSL_URL con la URL del mp4.
          </span>
        </div>
      </div>
    );
  }

  return (
    <div style={frame}>
      <video
        ref={video}
        src={VSL_URL}
        poster={VSL_POSTER || undefined}
        playsInline
        preload="metadata"
        controls={started}
        controlsList="nodownload"
        onTimeUpdate={onTime}
        onPlay={() => setStarted(true)}
        style={{ width: '100%', height: '100%', display: 'block', objectFit: 'cover', background: '#000' }}
      />
      {!started && (
        <button
          type="button"
          className="dc-btn"
          onClick={play}
          aria-label="Reproducir el video"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            background: 'linear-gradient(180deg, rgba(2,39,70,0.15) 0%, rgba(2,39,70,0.55) 100%)',
            border: 'none',
            borderRadius: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
          }}
        >
          <span
            style={{
              width: 84,
              height: 84,
              borderRadius: '50%',
              background: '#fff',
              color: 'var(--dc-navy-800)',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: 'var(--shadow-pulse)',
            }}
          >
            <PlayIcon />
          </span>
        </button>
      )}
    </div>
  );
}
