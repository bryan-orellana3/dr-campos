import React from 'react';

/** Toggle switch with optional label. */
export function Switch({ label, checked = false, onChange, disabled = false, style }) {
  return (
    <label style={{ display: 'inline-flex', alignItems: 'center', gap: 10, cursor: disabled ? 'not-allowed' : 'pointer', opacity: disabled ? 0.5 : 1, font: 'var(--type-body-sm)', color: 'var(--text-body)', ...style }}>
      <span style={{
        width: 40, height: 24, borderRadius: 'var(--radius-pill)', flex: 'none', position: 'relative',
        background: checked ? 'var(--accent-primary)' : 'var(--dc-neutral-300)',
        transition: 'background var(--duration-base) var(--ease-out)',
      }}>
        <span style={{
          position: 'absolute', top: 3, left: checked ? 19 : 3, width: 18, height: 18, borderRadius: '50%',
          background: '#fff', boxShadow: 'var(--shadow-sm)',
          transition: 'left var(--duration-base) var(--ease-out)',
        }}></span>
      </span>
      <input type="checkbox" role="switch" checked={checked} disabled={disabled} onChange={onChange} style={{ position: 'absolute', opacity: 0, width: 0 }} />
      {label}
    </label>
  );
}
