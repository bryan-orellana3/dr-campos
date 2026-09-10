import React from 'react';

/** Radio button with label. */
export function Radio({ label, checked = false, onChange, disabled = false, name, style }) {
  return (
    <label style={{ display: 'inline-flex', alignItems: 'center', gap: 10, cursor: disabled ? 'not-allowed' : 'pointer', opacity: disabled ? 0.5 : 1, font: 'var(--type-body-sm)', color: 'var(--text-body)', ...style }}>
      <span style={{
        width: 20, height: 20, borderRadius: '50%', flex: 'none', boxSizing: 'border-box',
        background: 'var(--dc-white)',
        border: checked ? '6px solid var(--accent-primary)' : '1.5px solid var(--border-strong)',
        transition: 'border var(--duration-fast) var(--ease-out)',
      }}></span>
      <input type="radio" name={name} checked={checked} disabled={disabled} onChange={onChange} style={{ position: 'absolute', opacity: 0, width: 0 }} />
      {label}
    </label>
  );
}
