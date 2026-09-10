import React from 'react';

/* ── hooks ─────────────────────────────────────────────────────────── */

export function useMediaQuery(query) {
  const [matches, setMatches] = React.useState(
    () => typeof window !== 'undefined' && window.matchMedia(query).matches
  );
  React.useEffect(() => {
    const mql = window.matchMedia(query);
    const onChange = (e) => setMatches(e.matches);
    mql.addEventListener('change', onChange);
    setMatches(mql.matches);
    return () => mql.removeEventListener('change', onChange);
  }, [query]);
  return matches;
}

export const useIsMobile = () => useMediaQuery('(max-width: 720px)');

/* ── primitivas del sistema de diseño ──────────────────────────────── */

/**
 * Botón principal. Variantes: primary | secondary | ghost | onDark. Tamaños: sm | md | lg.
 * Los estados viven en `global.css` (`.dc-btn`) para que el hover no se quede
 * pegado en dispositivos táctiles.
 */
export function Button({
  variant = 'primary',
  size = 'md',
  disabled = false,
  fullWidth = false,
  icon = null,
  iconAfter = null,
  type = 'button',
  className = '',
  children,
  onClick,
  style,
  ...rest
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`dc-btn dc-btn--${variant} dc-btn--${size} ${className}`.trim()}
      style={{ width: fullWidth ? '100%' : undefined, ...style }}
      {...rest}
    >
      {icon}
      {children}
      {iconAfter}
    </button>
  );
}

/** Superficie tipo tarjeta. Variantes: default | wash | dark. */
export function Card({ variant = 'default', padding = 24, children, style, ...rest }) {
  const variants = {
    default: {
      background: 'var(--surface-card)',
      border: '1px solid var(--border-subtle)',
      color: 'var(--text-body)',
      boxShadow: 'var(--shadow-sm)',
    },
    wash: {
      background: 'var(--surface-wash)',
      border: '1px solid transparent',
      color: 'var(--text-body)',
    },
    dark: {
      background: 'var(--surface-dark)',
      border: '1px solid var(--border-on-dark)',
      color: 'var(--text-on-dark)',
      boxShadow: 'var(--shadow-sm)',
    },
  };
  return (
    <div style={{ borderRadius: 'var(--radius-lg)', padding, ...variants[variant], ...style }} {...rest}>
      {children}
    </div>
  );
}

/** Píldora de estado. Tonos: brand | neutral | success | warning | danger | pulse. */
export function Badge({ tone = 'brand', children, style }) {
  const tones = {
    brand: { background: 'var(--surface-wash)', color: 'var(--dc-royal-600)' },
    neutral: { background: 'var(--dc-neutral-100)', color: 'var(--dc-neutral-700)' },
    success: { background: 'rgba(30,138,94,0.12)', color: 'var(--dc-success)' },
    warning: { background: 'rgba(185,126,31,0.12)', color: 'var(--dc-warning)' },
    danger: { background: 'rgba(192,69,62,0.12)', color: 'var(--dc-danger)' },
    pulse: { background: 'rgba(62,205,232,0.15)', color: '#1793AD' },
  };
  return (
    <span
      style={{
        font: '700 11px/1 var(--font-display)',
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        borderRadius: 'var(--radius-pill)',
        padding: '6px 12px',
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        ...tones[tone],
        ...style,
      }}
    >
      {children}
    </span>
  );
}

/** Etiqueta seleccionable en píldora. */
export function Tag({ children, style }) {
  return (
    <span
      style={{
        font: '600 14px/1.5 var(--font-body)',
        color: 'var(--dc-royal-600)',
        background: 'var(--dc-white)',
        border: '1px solid var(--border-strong)',
        borderRadius: 'var(--radius-pill)',
        padding: '7px 14px',
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
        ...style,
      }}
    >
      {children}
    </span>
  );
}

/** El motivo de marca: una línea fina con un solo latido de ECG. */
export function PulseDivider({ onDark = false, width = '100%', align = 'center', style }) {
  const id = React.useId().replace(/:/g, '');
  const p = { left: 120, center: 300, right: 480 }[align];
  return (
    <svg
      viewBox="0 0 640 24"
      fill="none"
      preserveAspectRatio="none"
      aria-hidden="true"
      style={{
        width,
        height: 24,
        display: 'block',
        filter: onDark ? 'drop-shadow(0 0 6px rgba(62,205,232,0.7))' : 'none',
        ...style,
      }}
    >
      <path
        d={`M0 12 H${p - 20} L${p - 4} 12 ${p + 4} 3 ${p + 16} 21 ${p + 26} 12 H640`}
        stroke={onDark ? 'var(--dc-pulse-400)' : `url(#${id})`}
        strokeWidth="2"
        strokeLinejoin="round"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />
      <defs>
        <linearGradient id={id} x1="0" x2="640" gradientUnits="userSpaceOnUse">
          <stop stopColor="#02325A" />
          <stop offset="1" stopColor="#4FA8E0" />
        </linearGradient>
      </defs>
    </svg>
  );
}

/**
 * Bloque de marca.
 * En claro usa el logo master (`logo.png`). En oscuro NO existe variante knockout oficial,
 * así que se compone según el sistema: isotipo (orbe de foto) + logotipo tipografiado
 * (script "Dr." + Montserrat ExtraBold en caja alta). Pendiente: pedir el logo en negativo a marca.
 */
export function BrandLock({ onDark = false, size = 48, style }) {
  if (!onDark) {
    return (
      <img
        src="/logo.png"
        alt="Dr. David Campos"
        style={{ height: size, width: 'auto', display: 'block', ...style }}
      />
    );
  }
  return (
    <span
      role="img"
      aria-label="Dr. David Campos"
      style={{ display: 'inline-flex', alignItems: 'center', gap: size * 0.26, ...style }}
    >
      <img
        src="/isotipo.webp"
        alt=""
        aria-hidden="true"
        style={{
          width: size,
          height: size,
          borderRadius: '50%',
          objectFit: 'cover',
          flex: 'none',
          boxShadow: '0 0 0 2px rgba(143,203,239,0.35)',
        }}
      />
      <span style={{ display: 'inline-flex', alignItems: 'baseline', gap: size * 0.1 }}>
        <span
          style={{
            font: `400 ${size * 0.62}px/0.8 var(--font-script)`,
            color: 'var(--dc-sky-300)',
            transform: `translateY(${size * 0.06}px)`,
          }}
        >
          Dr.
        </span>
        <span
          style={{
            font: `800 ${size * 0.4}px/1 var(--font-display)`,
            letterSpacing: 'var(--tracking-caps)',
            textTransform: 'uppercase',
            color: '#fff',
            whiteSpace: 'nowrap',
          }}
        >
          David <span style={{ color: 'var(--dc-sky-300)' }}>Campos</span>
        </span>
      </span>
    </span>
  );
}

/** Eyebrow + título display + entradilla opcional. */
export function SectionHeading({ eyebrow, title, lede, align = 'left', onDark = false, level = 2, style }) {
  const H = `h${level}`;
  const fonts = { 1: 'var(--type-h1)', 2: 'var(--type-h2)', 3: 'var(--type-h3)' };
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
        alignItems: align === 'center' ? 'center' : 'flex-start',
        textAlign: align,
        ...style,
      }}
    >
      {eyebrow && (
        <span
          style={{
            font: 'var(--type-label)',
            letterSpacing: 'var(--tracking-label)',
            textTransform: 'uppercase',
            color: onDark ? 'var(--dc-pulse-400)' : 'var(--dc-royal-600)',
          }}
        >
          {eyebrow}
        </span>
      )}
      <H
        style={{
          font: fonts[level] || fonts[2],
          letterSpacing: 'var(--tracking-display)',
          color: onDark ? '#fff' : 'var(--text-display)',
          margin: 0,
        }}
      >
        {title}
      </H>
      {lede && (
        <p
          style={{
            font: 'var(--type-body-lg)',
            color: onDark ? 'var(--text-muted-on-dark)' : 'var(--text-muted)',
            margin: 0,
            maxWidth: '58ch',
          }}
        >
          {lede}
        </p>
      )}
    </div>
  );
}

/**
 * Campo de texto con etiqueta, pista y estado de error.
 * `prefix` dibuja un afijo fijo dentro del campo (p. ej. el código de país)
 * — se posiciona contra el input, no contra el bloque, para no descolgarse
 * cuando aparece el mensaje de error.
 */
export function Input({
  label,
  hint,
  error,
  prefix,
  type = 'text',
  value,
  onChange,
  style,
  inputStyle,
  ...rest
}) {
  const [focus, setFocus] = React.useState(false);
  const id = React.useId();
  const prefixWidth = prefix ? 16 + String(prefix).length * 8.5 : 0;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6, ...style }}>
      {label && (
        <label htmlFor={id} style={{ font: '600 13px/1.2 var(--font-body)', color: 'var(--text-display)' }}>
          {label}
        </label>
      )}
      <div style={{ position: 'relative', display: 'flex' }}>
        {prefix && (
          <span
            aria-hidden="true"
            style={{
              position: 'absolute',
              left: 14,
              top: '50%',
              transform: 'translateY(-50%)',
              font: 'var(--type-body)',
              color: 'var(--text-muted)',
              pointerEvents: 'none',
            }}
          >
            {prefix}
          </span>
        )}
        <input
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          aria-invalid={error ? 'true' : undefined}
          style={{
            font: 'var(--type-body)',
            color: 'var(--text-body)',
            background: 'var(--dc-white)',
            border: `1px solid ${error ? 'var(--dc-danger)' : focus ? 'var(--accent-primary)' : 'var(--border-strong)'}`,
            borderRadius: 'var(--radius-md)',
            padding: `12px 14px 12px ${14 + prefixWidth}px`,
            outline: 'none',
            width: '100%',
            boxShadow: focus ? 'var(--focus-ring)' : 'none',
            transition:
              'border-color var(--duration-fast) var(--ease-out), box-shadow var(--duration-fast) var(--ease-out)',
            ...inputStyle,
          }}
          {...rest}
        />
      </div>
      {error ? (
        <span style={{ font: 'var(--type-caption)', color: 'var(--dc-danger)' }}>{error}</span>
      ) : hint ? (
        <span style={{ font: 'var(--type-caption)', color: 'var(--text-muted)' }}>{hint}</span>
      ) : null}
    </div>
  );
}

/** Select nativo con el mismo tratamiento visual que Input. */
export function Select({ label, options = [], value, onChange, error, style, selectStyle, ...rest }) {
  const [focus, setFocus] = React.useState(false);
  const id = React.useId();
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6, ...style }}>
      {label && (
        <label htmlFor={id} style={{ font: '600 13px/1.2 var(--font-body)', color: 'var(--text-display)' }}>
          {label}
        </label>
      )}
      <div style={{ position: 'relative' }}>
        <select
          id={id}
          value={value}
          onChange={onChange}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          style={{
            font: 'var(--type-body)',
            color: 'var(--text-body)',
            background: 'var(--dc-white)',
            border: `1px solid ${error ? 'var(--dc-danger)' : focus ? 'var(--accent-primary)' : 'var(--border-strong)'}`,
            borderRadius: 'var(--radius-md)',
            padding: '12px 34px 12px 14px',
            outline: 'none',
            boxShadow: focus ? 'var(--focus-ring)' : 'none',
            width: '100%',
            appearance: 'none',
            WebkitAppearance: 'none',
            cursor: 'pointer',
            ...selectStyle,
          }}
          {...rest}
        >
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="var(--dc-neutral-500)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          style={{
            position: 'absolute',
            right: 12,
            top: '50%',
            transform: 'translateY(-50%)',
            width: 16,
            height: 16,
            pointerEvents: 'none',
          }}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </div>
    </div>
  );
}

/* ── iconos (Lucide, trazo 1.75, extremos redondos) ────────────────── */

const iconBase = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.75,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  viewBox: '0 0 24 24',
  'aria-hidden': 'true',
};

export const ArrowRight = ({ size = 18, style }) => (
  <svg {...iconBase} style={{ width: size, height: size, flex: 'none', ...style }}>
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

export const ArrowLeft = ({ size = 18, style }) => (
  <svg {...iconBase} style={{ width: size, height: size, flex: 'none', ...style }}>
    <path d="M19 12H5M12 19l-7-7 7-7" />
  </svg>
);

export const Activity = ({ size = 18, style }) => (
  <svg {...iconBase} style={{ width: size, height: size, flex: 'none', ...style }}>
    <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
  </svg>
);

export const Check = ({ size = 18, style }) => (
  <svg {...iconBase} strokeWidth={2.5} style={{ width: size, height: size, flex: 'none', ...style }}>
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

export const Lock = ({ size = 18, style }) => (
  <svg {...iconBase} style={{ width: size, height: size, flex: 'none', ...style }}>
    <rect x="3" y="11" width="18" height="11" rx="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

export const Clock = ({ size = 18, style }) => (
  <svg {...iconBase} style={{ width: size, height: size, flex: 'none', ...style }}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </svg>
);

export const ListChecks = ({ size = 18, style }) => (
  <svg {...iconBase} style={{ width: size, height: size, flex: 'none', ...style }}>
    <path d="M3 6l2 2 3-3M3 14l2 2 3-3M13 7h8M13 17h8" />
  </svg>
);

export const Stethoscope = ({ size = 18, style }) => (
  <svg {...iconBase} style={{ width: size, height: size, flex: 'none', ...style }}>
    <path d="M4 3v6a5 5 0 0 0 10 0V3" />
    <path d="M4 3H2M14 3h2M9 14v2a5 5 0 0 0 10 0v-1" />
    <circle cx="19" cy="12" r="2" />
  </svg>
);

/* ── utilidades ────────────────────────────────────────────────────── */

/** Convierte **negritas** en <strong> dentro de un texto plano. */
export function richText(text, key = 'rt') {
  return text.split(/(\*\*[^*]+\*\*)/g).map((chunk, i) =>
    chunk.startsWith('**') && chunk.endsWith('**') ? (
      <strong key={`${key}-${i}`} style={{ color: 'var(--text-display)', fontWeight: 700 }}>
        {chunk.slice(2, -2)}
      </strong>
    ) : (
      <React.Fragment key={`${key}-${i}`}>{chunk}</React.Fragment>
    )
  );
}
