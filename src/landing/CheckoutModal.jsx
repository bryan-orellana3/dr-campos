import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CHECKOUT_FORM_ID, CHECKOUT_HEIGHT, CHECKOUT_URL } from './data/offer.js';

/**
 * Popup con el checkout de GHL embebido, con los mismos atributos data-* del embed oficial
 * para que form_embed.js (cargado en index.html) ajuste la altura del iframe al contenido.
 * Esc y clic fuera cierran; el foco vuelve al botón que lo abrió. El cuerpo del popup se
 * desplaza como un todo, sin scroll anidado dentro del iframe.
 */
const THANKS_PATH = '/gracias';
const GHL_ORIGINS = ['leadconnectorhq.com', 'msgsndr.com'];

export default function CheckoutModal({ open, onClose, returnFocusTo }) {
  const closeBtn = React.useRef(null);
  const navigate = useNavigate();

  // Respaldo: si el formulario avisa del envío por postMessage, se cierra el popup y se va a
  // la página de gracias. El camino principal es la redirección "al enviar" configurada en GHL,
  // que su form_embed.js aplica a la página completa.
  React.useEffect(() => {
    if (!open) return;
    const onMessage = (e) => {
      if (!GHL_ORIGINS.some((o) => String(e.origin).includes(o))) return;
      let text = '';
      try {
        text = typeof e.data === 'string' ? e.data : JSON.stringify(e.data);
      } catch {
        return;
      }
      if (/submit|success|thank|paid|payment[_-]?complete/i.test(text) && !/height/i.test(text)) {
        onClose();
        navigate(THANKS_PATH);
      }
    };
    window.addEventListener('message', onMessage);
    return () => window.removeEventListener('message', onMessage);
  }, [open, onClose, navigate]);

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
          <div style={{ overflowY: 'auto', WebkitOverflowScrolling: 'touch', background: '#fff' }}>
            <iframe
              src={CHECKOUT_URL}
              id={`inline-${CHECKOUT_FORM_ID}`}
              title="Checkout"
              allow="payment *"
              data-layout="{'id':'INLINE'}"
              data-trigger-type="alwaysShow"
              data-trigger-value=""
              data-activation-type="alwaysActivated"
              data-activation-value=""
              data-deactivation-type="neverDeactivate"
              data-deactivation-value=""
              data-form-name="Checkout"
              data-height={String(CHECKOUT_HEIGHT)}
              data-layout-iframe-id={`inline-${CHECKOUT_FORM_ID}`}
              data-form-id={CHECKOUT_FORM_ID}
              data-cookie-consent="true"
              data-cookie-consent-provider="auto"
              style={{ width: '100%', height: CHECKOUT_HEIGHT, border: 'none', borderRadius: 8, display: 'block' }}
            />
          </div>
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
