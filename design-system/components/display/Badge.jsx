import React from 'react';

/** Small status pill. Tones: brand | neutral | success | warning | danger | pulse. */
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
    <span style={{
      font: '700 11px/1 var(--font-display)', letterSpacing: '0.1em', textTransform: 'uppercase',
      borderRadius: 'var(--radius-pill)', padding: '6px 12px', display: 'inline-flex', alignItems: 'center', gap: 6,
      ...tones[tone], ...style,
    }}>
      {children}
    </span>
  );
}
