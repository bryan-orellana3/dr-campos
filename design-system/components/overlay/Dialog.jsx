import React from 'react';

/** Modal dialog with navy scrim. Controlled via open/onClose. */
export function Dialog({ open = false, onClose, title, children, footer, width = 480, style }) {
  if (!open) return null;
  return (
    <div
      onClick={onClose}
      style={{ position: 'fixed', inset: 0, background: 'rgba(4,26,48,0.55)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: 24 }}
    >
      <div
        role="dialog" aria-modal="true"
        onClick={(e) => e.stopPropagation()}
        style={{
          background: 'var(--surface-card)', borderRadius: 'var(--radius-xl)', boxShadow: 'var(--shadow-lg)',
          width, maxWidth: '100%', maxHeight: '85vh', overflow: 'auto',
          padding: 'var(--space-6)', display: 'flex', flexDirection: 'column', gap: 16, ...style,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16 }}>
          <h3 style={{ font: 'var(--type-h3)', color: 'var(--text-display)', margin: 0 }}>{title}</h3>
          <button onClick={onClose} aria-label="Cerrar" style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', padding: 4 }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" style={{ width: 18, height: 18 }}>
              <line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        <div style={{ font: 'var(--type-body)', color: 'var(--text-body)' }}>{children}</div>
        {footer && <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12 }}>{footer}</div>}
      </div>
    </div>
  );
}
