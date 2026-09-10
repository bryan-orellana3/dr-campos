import React from 'react';

/** Native select styled to match Input. */
export function Select({ label, hint, options = [], value, onChange, placeholder, disabled = false, style, ...rest }) {
  const [focus, setFocus] = React.useState(false);
  return (
    <label style={{ display: 'flex', flexDirection: 'column', gap: 6, ...style }}>
      {label && <span style={{ font: '600 13px/1.2 var(--font-body)', color: 'var(--text-display)' }}>{label}</span>}
      <div style={{ position: 'relative' }}>
        <select
          value={value}
          onChange={onChange}
          disabled={disabled}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          style={{
            font: 'var(--type-body)', color: value ? 'var(--text-body)' : 'var(--text-muted)',
            background: disabled ? 'var(--dc-neutral-100)' : 'var(--dc-white)',
            border: `1px solid ${focus ? 'var(--accent-primary)' : 'var(--border-strong)'}`,
            borderRadius: 'var(--radius-md)', padding: '11px 38px 11px 14px', outline: 'none',
            boxShadow: focus ? 'var(--focus-ring)' : 'none', width: '100%',
            appearance: 'none', WebkitAppearance: 'none', cursor: disabled ? 'not-allowed' : 'pointer',
          }}
          {...rest}
        >
          {placeholder && <option value="">{placeholder}</option>}
          {options.map((o) => (typeof o === 'string'
            ? <option key={o} value={o}>{o}</option>
            : <option key={o.value} value={o.value}>{o.label}</option>))}
        </select>
        <svg viewBox="0 0 24 24" fill="none" stroke="var(--dc-neutral-500)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
          style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', width: 16, height: 16, pointerEvents: 'none' }}>
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </div>
      {hint && <span style={{ font: 'var(--type-caption)', color: 'var(--text-muted)' }}>{hint}</span>}
    </label>
  );
}
