import React from 'react';

/** Text input with label, hint and error states. */
export function Input({ label, hint, error, type = 'text', placeholder, value, onChange, disabled = false, style, ...rest }) {
  const [focus, setFocus] = React.useState(false);
  return (
    <label style={{ display: 'flex', flexDirection: 'column', gap: 6, font: 'var(--type-body-sm)', color: 'var(--text-body)', ...style }}>
      {label && <span style={{ font: '600 13px/1.2 var(--font-body)', color: 'var(--text-display)' }}>{label}</span>}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        style={{
          font: 'var(--type-body)', color: 'var(--text-body)',
          background: disabled ? 'var(--dc-neutral-100)' : 'var(--dc-white)',
          border: `1px solid ${error ? 'var(--dc-danger)' : focus ? 'var(--accent-primary)' : 'var(--border-strong)'}`,
          borderRadius: 'var(--radius-md)', padding: '11px 14px', outline: 'none',
          boxShadow: focus ? 'var(--focus-ring)' : 'none',
          transition: 'border-color var(--duration-fast) var(--ease-out), box-shadow var(--duration-fast) var(--ease-out)',
          cursor: disabled ? 'not-allowed' : 'text',
        }}
        {...rest}
      />
      {error ? <span style={{ font: 'var(--type-caption)', color: 'var(--dc-danger)' }}>{error}</span>
        : hint ? <span style={{ font: 'var(--type-caption)', color: 'var(--text-muted)' }}>{hint}</span> : null}
    </label>
  );
}
