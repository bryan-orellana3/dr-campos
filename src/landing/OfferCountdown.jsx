import React from 'react';
import { OFFER_TIMER, PRICE } from './data/offer.js';

const KEY = 'dc-offer-deadline';

/** Lee la hora límite guardada en la sesión o arranca una nueva. Si ya venció, se respeta (no se reinicia al recargar). */
function readOrStartDeadline() {
  let stored = NaN;
  try {
    stored = Number(sessionStorage.getItem(KEY));
  } catch {
    /* almacenamiento bloqueado: el contador vive solo en memoria */
  }
  if (Number.isFinite(stored) && stored > 0) return stored;
  const deadline = Date.now() + OFFER_TIMER.minutes * 60 * 1000;
  try {
    sessionStorage.setItem(KEY, String(deadline));
  } catch {
    /* idem */
  }
  return deadline;
}

/** Cuenta regresiva compartida: se llama una vez en la página y se reparte a cada reloj. */
export function useOfferCountdown() {
  const [deadline] = React.useState(readOrStartDeadline);
  const [now, setNow] = React.useState(() => Date.now());

  React.useEffect(() => {
    const id = setInterval(() => {
      const t = Date.now();
      setNow(t);
      if (t >= deadline) clearInterval(id);
    }, 1000);
    return () => clearInterval(id);
  }, [deadline]);

  const remaining = Math.max(0, deadline - now);
  const total = Math.ceil(remaining / 1000);
  return {
    expired: remaining <= 0,
    urgent: remaining > 0 && remaining <= 60 * 1000,
    minutes: Math.floor(total / 60),
    seconds: total % 60,
  };
}

const pad = (n) => String(n).padStart(2, '0');

function ClockIcon({ size = 16, style }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ flex: '0 0 auto', ...style }}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}

/**
 * Reloj de la oferta, siempre sobre fondo oscuro. `size`: lg (hero y tarjeta de precio) | sm (barra fija).
 * `label={null}` deja solo el icono y los dígitos (barra fija en móvil).
 * Los dígitos son tabulares para que el ancho no baile cada segundo.
 */
export function OfferCountdown({ countdown, size = 'lg', label = OFFER_TIMER.label, style }) {
  const { expired, urgent, minutes, seconds } = countdown;
  const lg = size === 'lg';
  const digits = `${pad(minutes)}:${pad(seconds)}`;
  return (
    <div
      role="timer"
      aria-live="off"
      aria-label={expired ? OFFER_TIMER.expired : `${label} ${minutes} minutos ${seconds} segundos`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: lg ? 12 : 8,
        padding: lg ? '10px 18px 10px 14px' : '6px 12px 6px 10px',
        borderRadius: 'var(--radius-pill)',
        background: 'rgba(62,205,232,0.12)',
        border: '1px solid rgba(62,205,232,0.38)',
        color: 'var(--dc-pulse-400)',
        maxWidth: '100%',
        ...style,
      }}
    >
      <ClockIcon size={lg ? 18 : 15} />
      {(label || expired) && (
        <span style={{ font: lg ? '700 13px/1.2 var(--font-display)' : '700 11px/1.2 var(--font-display)', letterSpacing: '0.04em', textTransform: 'uppercase', color: 'var(--dc-sky-300)', whiteSpace: 'nowrap' }}>
          {expired ? (label ? OFFER_TIMER.expired : 'Por cerrar') : label}
        </span>
      )}
      {!expired && (
        <span
          className={urgent ? 'dc-breathe' : undefined}
          style={{
            font: lg ? '800 26px/1 var(--font-display)' : '800 20px/1 var(--font-display)',
            fontVariantNumeric: 'tabular-nums',
            color: '#fff',
            letterSpacing: '0.02em',
            '--beat': '1s',
          }}
        >
          {digits}
        </span>
      )}
    </div>
  );
}

/** Etiqueta sólida cian con el descuento — solo sobre fondo oscuro. */
export function DiscountBadge({ size = 'md', style }) {
  return (
    <span
      style={{
        font: size === 'sm' ? '800 11px/1 var(--font-display)' : '800 12px/1 var(--font-display)',
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        color: 'var(--dc-navy-950)',
        background: 'var(--dc-pulse-400)',
        borderRadius: 'var(--radius-pill)',
        padding: size === 'sm' ? '5px 8px' : '6px 10px',
        whiteSpace: 'nowrap',
        ...style,
      }}
    >
      {PRICE.discount} off
    </span>
  );
}

/** Precio tachado + precio final, para líneas de texto sobre fondo oscuro. */
export function StrikePrice({ size = 'md', style }) {
  const strike = { md: '600 15px/1 var(--font-display)', lg: '600 18px/1 var(--font-display)', sm: '600 13px/1 var(--font-display)' }[size];
  const final = { md: '800 20px/1 var(--font-display)', lg: '800 24px/1 var(--font-display)', sm: '800 17px/1 var(--font-display)' }[size];
  return (
    <span style={{ display: 'inline-flex', alignItems: 'baseline', gap: 8, whiteSpace: 'nowrap', ...style }}>
      <s style={{ font: strike, color: 'var(--text-muted-on-dark)', textDecorationColor: 'rgba(255,255,255,0.7)', textDecorationThickness: 2 }}>{PRICE.originalLabel}</s>
      <span style={{ font: final, color: '#fff' }}>{PRICE.label}</span>
    </span>
  );
}
