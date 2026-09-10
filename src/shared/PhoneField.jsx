import React from 'react';
// Solo las banderas de la lista: el import de namespace arrastraba las ~260 del paquete (+240 KB).
import { AR, BO, BR, CL, CO, CR, CU, EC, SV, ES, US, GT, GQ, HN, MX, NI, PA, PY, PE, PR, DO, UY, VE } from 'country-flag-icons/react/3x2';

const Flags = { AR, BO, BR, CL, CO, CR, CU, EC, SV, ES, US, GT, GQ, HN, MX, NI, PA, PY, PE, PR, DO, UY, VE };
import { COUNTRIES, countryByIso } from '../quiz/data/countries.js';

/**
 * Campo de WhatsApp: selector de país con bandera + número nacional.
 * Las banderas son SVG (sin emoji: el sistema lo prohíbe y Windows no las dibuja).
 * El selector es un listbox propio y accesible: flechas, Home/End, Enter, Esc,
 * búsqueda por letras, cierre al clicar fuera. El número es un input nativo.
 */

const CHEVRON = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ width: 14, height: 14, flex: 'none' }}>
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

function Flag({ iso, size = 22 }) {
  const Svg = Flags[iso];
  if (!Svg) return <span style={{ width: size, height: size * (2 / 3), display: 'inline-block' }} />;
  return (
    <Svg
      aria-hidden="true"
      style={{
        width: size,
        height: size * (2 / 3),
        borderRadius: 2,
        flex: 'none',
        boxShadow: '0 0 0 1px rgba(4,26,48,0.12)',
        display: 'block',
      }}
    />
  );
}

export default function PhoneField({ country, phone, onCountryChange, onPhoneChange, error, label = 'WhatsApp' }) {
  const [open, setOpen] = React.useState(false);
  const [focus, setFocus] = React.useState(false);
  const [active, setActive] = React.useState(() => Math.max(COUNTRIES.findIndex((c) => c.iso === country), 0));
  const wrap = React.useRef(null);
  const trigger = React.useRef(null);
  const list = React.useRef(null);
  const typed = React.useRef({ text: '', at: 0 });
  const id = React.useId();
  const current = countryByIso(country);

  // Cierre al clicar fuera y al perder el foco hacia fuera del componente.
  React.useEffect(() => {
    if (!open) return;
    const onDown = (e) => { if (!wrap.current?.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', onDown);
    document.addEventListener('touchstart', onDown, { passive: true });
    return () => { document.removeEventListener('mousedown', onDown); document.removeEventListener('touchstart', onDown); };
  }, [open]);

  // Al abrir: la opción activa es la seleccionada y recibe el foco.
  React.useEffect(() => {
    if (!open) return;
    const i = Math.max(COUNTRIES.findIndex((c) => c.iso === country), 0);
    setActive(i);
    window.requestAnimationFrame(() => list.current?.children[i]?.focus());
  }, [open, country]);

  const choose = (iso) => {
    onCountryChange(iso);
    setOpen(false);
    trigger.current?.focus();
  };

  const onListKey = (e) => {
    const n = COUNTRIES.length;
    let next = active;
    if (e.key === 'ArrowDown') next = (active + 1) % n;
    else if (e.key === 'ArrowUp') next = (active - 1 + n) % n;
    else if (e.key === 'Home') next = 0;
    else if (e.key === 'End') next = n - 1;
    else if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); choose(COUNTRIES[active].iso); return; }
    else if (e.key === 'Escape') { e.preventDefault(); setOpen(false); trigger.current?.focus(); return; }
    else if (e.key === 'Tab') { setOpen(false); return; }
    else if (e.key.length === 1 && /\S/.test(e.key)) {
      // Búsqueda por letras: "co" salta a Colombia, "cu" a Cuba.
      const now = Date.now();
      const t = now - typed.current.at < 700 ? typed.current.text + e.key : e.key;
      typed.current = { text: t.toLowerCase(), at: now };
      const hit = COUNTRIES.findIndex((c) => c.name.toLowerCase().startsWith(typed.current.text));
      if (hit >= 0) next = hit;
      else return;
    } else return;
    e.preventDefault();
    setActive(next);
    list.current?.children[next]?.focus();
  };

  const border = error ? 'var(--dc-danger)' : focus || open ? 'var(--accent-primary)' : 'var(--border-strong)';

  return (
    <div ref={wrap} style={{ display: 'flex', flexDirection: 'column', gap: 6, position: 'relative' }}>
      <label htmlFor={`${id}-num`} style={{ font: '600 13px/1.2 var(--font-body)', color: 'var(--text-display)' }}>
        {label}
      </label>

      <div
        style={{
          display: 'flex',
          alignItems: 'stretch',
          background: 'var(--dc-white)',
          border: `1px solid ${border}`,
          borderRadius: 'var(--radius-md)',
          boxShadow: focus || open ? 'var(--focus-ring)' : 'none',
          transition: 'border-color var(--duration-fast) var(--ease-out), box-shadow var(--duration-fast) var(--ease-out)',
        }}
      >
        <button
          ref={trigger}
          type="button"
          className="dc-btn"
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-controls={`${id}-list`}
          aria-label={`País: ${current.name}, prefijo +${current.dial}`}
          onClick={() => setOpen((o) => !o)}
          onKeyDown={(e) => { if (e.key === 'ArrowDown') { e.preventDefault(); setOpen(true); } }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            padding: '0 10px 0 12px',
            background: 'transparent',
            border: 'none',
            borderRight: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-md) 0 0 var(--radius-md)',
            font: 'var(--type-body)',
            color: 'var(--text-body)',
            cursor: 'pointer',
          }}
        >
          <Flag iso={current.iso} />
          <span style={{ color: 'var(--text-muted)', fontVariantNumeric: 'tabular-nums' }}>+{current.dial}</span>
          <span style={{ color: 'var(--dc-neutral-500)', transform: open ? 'rotate(180deg)' : 'none', transition: 'transform var(--duration-fast) var(--ease-out)', display: 'inline-flex' }}>
            {CHEVRON}
          </span>
        </button>

        <input
          id={`${id}-num`}
          type="tel"
          inputMode="numeric"
          autoComplete="tel-national"
          enterKeyHint="done"
          placeholder="Número"
          value={phone}
          onChange={(e) => onPhoneChange(e.target.value)}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          aria-invalid={error ? 'true' : undefined}
          aria-describedby={error ? `${id}-err` : undefined}
          style={{
            flex: 1,
            minWidth: 0,
            font: 'var(--type-body)',
            color: 'var(--text-body)',
            background: 'transparent',
            border: 'none',
            outline: 'none',
            padding: '12px 14px',
            borderRadius: '0 var(--radius-md) var(--radius-md) 0',
          }}
        />
      </div>

      {open && (
        <ul
          ref={list}
          id={`${id}-list`}
          role="listbox"
          aria-label="País"
          aria-activedescendant={`${id}-opt-${COUNTRIES[active]?.iso}`}
          onKeyDown={onListKey}
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            zIndex: 30,
            margin: '6px 0 0',
            padding: 6,
            listStyle: 'none',
            width: 'min(320px, 100%)',
            maxHeight: 288,
            overflowY: 'auto',
            background: 'var(--surface-card)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-lg)',
            boxShadow: 'var(--shadow-lg)',
          }}
        >
          {COUNTRIES.map((c, i) => {
            const selected = c.iso === country;
            const isActive = i === active;
            return (
              <li
                key={c.iso}
                id={`${id}-opt-${c.iso}`}
                role="option"
                aria-selected={selected}
                tabIndex={-1}
                onClick={() => choose(c.iso)}
                onMouseEnter={() => setActive(i)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  padding: '10px 12px',
                  borderRadius: 'var(--radius-sm)',
                  cursor: 'pointer',
                  outline: 'none',
                  background: isActive ? 'var(--surface-wash)' : 'transparent',
                  font: selected ? '600 14px/1.5 var(--font-body)' : 'var(--type-body-sm)',
                  color: selected ? 'var(--text-display)' : 'var(--text-body)',
                }}
              >
                <Flag iso={c.iso} size={24} />
                <span style={{ flex: 1 }}>{c.name}</span>
                <span style={{ color: 'var(--text-muted)', fontVariantNumeric: 'tabular-nums' }}>+{c.dial}</span>
              </li>
            );
          })}
        </ul>
      )}

      {error && (
        <span id={`${id}-err`} style={{ font: 'var(--type-caption)', color: 'var(--dc-danger)' }}>
          {error}
        </span>
      )}
    </div>
  );
}
