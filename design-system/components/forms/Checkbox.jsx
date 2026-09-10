import React from 'react';

/** Checkbox with label. */
export function Checkbox({ label, checked = false, onChange, disabled = false, style }) {
  return (
    <label style={{ display: 'inline-flex', alignItems: 'center', gap: 10, cursor: disabled ? 'not-allowed' : 'pointer', opacity: disabled ? 0.5 : 1, font: 'var(--type-body-sm)', color: 'var(--text-body)', ...style }}>
      <span style={{
        width: 20, height: 20, borderRadius: 'var(--radius-sm)', flex: 'none',
        background: checked ? 'var(--accent-primary)' : 'var(--dc-white)',
        border: `1.5px solid ${checked ? 'var(--accent-primary)' : 'var(--border-strong)'}`,
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        transition: 'background var(--duration-fast) var(--ease-out)',
      }}>
        {checked && (
          <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ width: 13, height: 13 }}>
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        )}
      </span>
      <input type="checkbox" checked={checked} disabled={disabled} onChange={onChange} style={{ position: 'absolute', opacity: 0, width: 0 }} />
      {label}
    </label>
  );
}
