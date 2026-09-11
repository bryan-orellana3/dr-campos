import React from 'react';
import { PulseDivider } from '../shared/ui.jsx';
import { REVEAL_AT_SECONDS, VSL_POSTER, VSL_URL } from './data/offer.js';

const REVEALED_KEY = 'dc-vsl-cta-revealed';

/**
 * Devuelve true cuando el botón de compra debe estar visible: al llegar al segundo
 * configurado de reproducción (con o sin sonido), o si ya se llegó en una visita anterior
 * (persistido). Para revisar: ?cta=1 lo muestra sin memorizarlo; ?cta=0 borra la memoria.
 */
export function useCtaReveal() {
  const [revealed, setRevealed] = React.useState(() => {
    try {
      const cta = new URLSearchParams(window.location.search).get('cta');
      if (cta === '0') window.localStorage.removeItem(REVEALED_KEY);
      if (cta === '1') return true;
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

const icon = { fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round', viewBox: '0 0 24 24', 'aria-hidden': 'true' };
const SoundOff = ({ size = 22 }) => (
  <svg {...icon} style={{ width: size, height: size }}>
    <path d="M11 5 6 9H2v6h4l5 4V5zM23 9l-6 6M17 9l6 6" />
  </svg>
);
const SoundOn = ({ size = 22 }) => (
  <svg {...icon} style={{ width: size, height: size }}>
    <path d="M11 5 6 9H2v6h4l5 4V5zM15.5 8.5a5 5 0 0 1 0 7M19 5a9 9 0 0 1 0 14" />
  </svg>
);
const Replay = ({ size = 22 }) => (
  <svg {...icon} style={{ width: size, height: size }}>
    <path d="M3 12a9 9 0 1 0 3-6.7L3 8M3 3v5h5" />
  </svg>
);

/**
 * Reproductor del VSL sin controles de reproducción: arranca solo y en silencio,
 * al tocar vuelve al inicio con sonido, y el único control es el altavoz. Sin play,
 * pausa ni barra. Al terminar ofrece "Ver de nuevo". Sin URL muestra el hueco reservado.
 */
export default function VslPlayer({ onReveal, revealed }) {
  const video = React.useRef(null);
  const [muted, setMuted] = React.useState(true);
  const [ended, setEnded] = React.useState(false);
  const [blocked, setBlocked] = React.useState(false); // autoplay bloqueado por el navegador
  const [aspect, setAspect] = React.useState('16 / 9');

  React.useEffect(() => {
    const v = video.current;
    if (!v) return;
    v.muted = true;
    v.play().catch(() => setBlocked(true));
  }, []);

  const onMeta = () => {
    const v = video.current;
    if (v?.videoWidth && v?.videoHeight) setAspect(`${v.videoWidth} / ${v.videoHeight}`);
  };

  // El botón cuenta por posición del video, con o sin sonido (decisión del usuario).
  const onTime = () => {
    const v = video.current;
    if (!revealed && v && v.currentTime >= REVEAL_AT_SECONDS) onReveal();
  };

  // Desde el aviso: vuelve al inicio con sonido, para no perderse el arranque.
  const startWithSound = () => {
    const v = video.current;
    if (!v) return;
    v.currentTime = 0;
    v.muted = false;
    setMuted(false);
    setEnded(false);
    setBlocked(false);
    v.play().catch(() => {});
  };

  const toggleSound = (e) => {
    e?.stopPropagation();
    const v = video.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
    if (v.paused && !ended) v.play().catch(() => {});
  };

  const replay = () => {
    const v = video.current;
    if (!v) return;
    v.currentTime = 0;
    setEnded(false);
    v.play().catch(() => {});
  };

  const frame = {
    position: 'relative',
    width: '100%',
    aspectRatio: aspect,
    borderRadius: 'var(--radius-xl)',
    overflow: 'hidden',
    background: 'var(--dc-navy-950)',
    boxShadow: 'var(--shadow-lg)',
    border: '1px solid var(--border-on-dark)',
  };

  if (!VSL_URL) {
    return (
      <div style={{ ...frame, aspectRatio: '16 / 9', display: 'flex', alignItems: 'center', justifyContent: 'center' }} aria-label="Espacio reservado para el video">
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14, padding: 24, textAlign: 'center' }}>
          <PulseDivider onDark width={220} />
          <span style={{ font: 'var(--type-label)', letterSpacing: 'var(--tracking-label)', textTransform: 'uppercase', color: 'var(--dc-pulse-400)' }}>Video del método</span>
          <span style={{ font: 'var(--type-body-sm)', color: 'var(--text-muted-on-dark)', maxWidth: '36ch' }}>Aquí va el VSL. Se activa definiendo VITE_VSL_URL con la URL del mp4.</span>
        </div>
      </div>
    );
  }

  const overlayBtn = {
    position: 'absolute',
    inset: 0,
    width: '100%',
    height: '100%',
    border: 'none',
    borderRadius: 0,
    background: 'linear-gradient(180deg, rgba(2,39,70,0.25) 0%, rgba(2,39,70,0.6) 100%)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 14,
    cursor: 'pointer',
    color: '#fff',
    textAlign: 'center',
    padding: 24,
  };
  const disc = {
    width: 84,
    height: 84,
    borderRadius: '50%',
    background: '#fff',
    color: 'var(--dc-navy-800)',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: 'var(--shadow-pulse)',
  };

  return (
    <div style={frame} onClick={muted || ended ? undefined : toggleSound} onContextMenu={(e) => e.preventDefault()}>
      <video
        ref={video}
        src={VSL_URL}
        poster={VSL_POSTER || undefined}
        playsInline
        muted
        preload="auto"
        disablePictureInPicture
        controlsList="nodownload noplaybackrate noremoteplayback"
        onTimeUpdate={onTime}
        onLoadedMetadata={onMeta}
        onEnded={() => setEnded(true)}
        style={{ width: '100%', height: '100%', display: 'block', objectFit: 'contain', background: '#000', pointerEvents: 'none' }}
      />

      {/* En silencio (o autoplay bloqueado): el único camino es tocar para escuchar desde el inicio. */}
      {muted && !ended && (
        <button type="button" className="dc-btn" onClick={startWithSound} style={overlayBtn} aria-label="Activar el sonido y ver desde el inicio">
          <span style={disc}><SoundOff size={34} /></span>
          <span style={{ font: '700 17px/1.3 var(--font-display)', letterSpacing: '0.01em', maxWidth: '28ch' }}>
            {blocked ? 'Toca para ver el video' : 'Tu video ya empezó. Toca para activar el sonido.'}
          </span>
        </button>
      )}

      {ended && (
        <button type="button" className="dc-btn" onClick={replay} style={overlayBtn} aria-label="Ver el video de nuevo">
          <span style={disc}><Replay size={32} /></span>
          <span style={{ font: '700 17px/1.3 var(--font-display)' }}>Ver de nuevo</span>
        </button>
      )}

      {/* Único control: el altavoz. */}
      {!muted && !ended && (
        <button
          type="button"
          className="dc-btn"
          onClick={toggleSound}
          aria-label="Silenciar"
          aria-pressed={false}
          style={{
            position: 'absolute',
            right: 14,
            bottom: 14,
            width: 44,
            height: 44,
            padding: 0,
            borderRadius: '50%',
            border: '1px solid rgba(255,255,255,0.25)',
            background: 'rgba(2,39,70,0.6)',
            color: '#fff',
            backdropFilter: 'blur(6px)',
          }}
        >
          <SoundOn size={22} />
        </button>
      )}
    </div>
  );
}
