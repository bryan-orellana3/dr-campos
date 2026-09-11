import React from 'react';
import { CHECKOUT_URL } from './data/offer.js';

/**
 * Popup con el checkout de GHL embebido. Esc y clic fuera cierran; el foco vuelve
 * al botón que lo abrió. Sin URL configurada muestra el aviso en lugar del iframe.
 */
export default function CheckoutModal({ open, onClose, returnFocusTo }) {
  const closeBtn = React.useRef(null);

  React.useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    window.requestAnimationFrame(() => closeBtn.current?.focus());
    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener('keydown', onKey);
      returnFocusTo?.current?.focus?.();
    };
  }, [open, onClose, returnFocusTo]);

  if (!open) return null;

  return (
    <div
      role="presentation"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100,
        background: 'rgba(4,26,48,0.72)',
        backdropFilter: 'blur(4px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Checkout del Método 4C"
        style={{
          width: 'min(560px, 100%)',
          maxHeight: 'min(92dvh, 900px)',
          background: 'var(--surface-card)',
          borderRadius: 'var(--radius-xl)',
          boxShadow: 'var(--shadow-lg)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '14px 16px 14px 20px',
            borderBottom: '1px solid var(--border-subtle)',
          }}
        >
          <span style={{ font: 'var(--type-h4)', color: 'var(--text-display)' }}>Método 4C</span>
          <button
            ref={closeBtn}
            type="button"
            className="dc-btn dc-btn--ghost dc-btn--sm"
            onClick={onClose}
            aria-label="Cerrar"
            style={{ padding: '8px 10px' }}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true" style={{ width: 18, height: 18 }}>
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {CHECKOUT_URL ? (
          <iframe
            src={CHECKOUT_URL}
            title="Checkout del Método 4C"
            allow="payment *"
            style={{ width: '100%', height: 'min(78dvh, 760px)', border: 0, display: 'block', background: '#fff' }}
          />
        ) : (
          <div style={{ padding: 28, display: 'flex', flexDirection: 'column', gap: 10 }}>
            <span style={{ font: 'var(--type-h3)', color: 'var(--text-display)' }}>Checkout pendiente</span>
            <p style={{ margin: 0, font: 'var(--type-body)', color: 'var(--text-body)' }}>
              Aquí se embebe el checkout de GoHighLevel. Se activa definiendo VITE_CHECKOUT_URL con la URL del
              payment link u order form.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
