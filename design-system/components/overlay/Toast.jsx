import React from 'react';

/** Inline toast notification. Tones: info | success | danger. */
export function Toast({ tone = 'info', title, children, onClose, style }) {
  const tones = {
    info: { border: 'var(--accent-primary)', icon: 'M12 16v-4M12 8h.01', color: 'var(--dc-royal-600)' },
    success: { border: 'var(--dc-success)', icon: 'M20 6L9 17l-5-5', color: 'var(--dc-success)' },
    danger: { border: 'var(--dc-danger)', icon: 'M18 6L6 18M6 6l12 12', color: 'var(--dc-danger)' },
  };
  const t = tones[tone];
  return (
    <div style={{
      display: 'flex', gap: 12, alignItems: 'flex-start',
      background: 'var(--surface-card)', border: '1px solid var(--border-subtle)',
      borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-md)',
      padding: '14px 16px', maxWidth: 420, ...style,
    }}>
      <svg viewBox="0 0 24 24" fill="none" stroke={t.color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: 18, height: 18, flex: 'none', marginTop: 2 }}>
        {tone === 'info' && <circle cx="12" cy="12" r="9" strokeWidth="2"></circle>}
        <path d={t.icon}></path>
      </svg>
      <div style={{ flex: 1 }}>
        {title && <div style={{ font: '700 14px/1.3 var(--font-body)', color: 'var(--text-display)' }}>{title}</div>}
        {children && <div style={{ font: 'var(--type-body-sm)', color: 'var(--text-muted)', marginTop: 2 }}>{children}</div>}
      </div>
      {onClose && (
        <button onClick={onClose} aria-label="Cerrar" style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', padding: 2 }}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" style={{ width: 14, height: 14 }}>
            <line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      )}
    </div>
  );
}
