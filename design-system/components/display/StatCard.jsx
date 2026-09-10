import React from 'react';

/** Numeric proof card — value + label (+ optional detail). Evidence-first brand pattern. */
export function StatCard({ value, label, detail, onDark = false, style }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4, ...style }}>
      <span style={{
        font: '800 40px/1.05 var(--font-display)', letterSpacing: 'var(--tracking-display)',
        background: onDark ? 'none' : 'var(--gradient-wordmark)',
        WebkitBackgroundClip: onDark ? undefined : 'text',
        backgroundClip: onDark ? undefined : 'text',
        color: onDark ? '#fff' : 'transparent',
      }}>{value}</span>
      <span style={{ font: '700 14px/1.3 var(--font-display)', color: onDark ? 'var(--dc-sky-300)' : 'var(--text-display)' }}>{label}</span>
      {detail && <span style={{ font: 'var(--type-caption)', color: onDark ? 'var(--text-muted-on-dark)' : 'var(--text-muted)' }}>{detail}</span>}
    </div>
  );
}
