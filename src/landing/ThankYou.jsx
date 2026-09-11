import React from 'react';
import { BrandLock, PulseDivider, useIsMobile } from '../shared/ui.jsx';
import { useDocumentTitle } from '../shared/useDocumentTitle.js';

/** Página de gracias tras el checkout. Deliberadamente simple: confirmar y decir qué sigue. */
export default function ThankYou() {
  const isMobile = useIsMobile();
  useDocumentTitle('Gracias — Método 4C | Dr. David Campos', 'Tu acceso al Método 4C está en camino.');

  return (
    <section
      className="dc-fade"
      style={{
        minHeight: '100dvh',
        background: 'var(--gradient-hero-dark)',
        color: 'var(--text-on-dark)',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: 720,
          margin: '0 auto',
          padding: isMobile ? '48px 20px' : '80px 32px',
          display: 'flex',
          flexDirection: 'column',
          gap: isMobile ? 18 : 22,
          alignItems: 'flex-start',
        }}
      >
        <BrandLock onDark size={isMobile ? 40 : 48} />
        <span style={{ font: 'var(--type-label)', letterSpacing: 'var(--tracking-label)', textTransform: 'uppercase', color: 'var(--dc-pulse-400)' }}>
          Método 4C
        </span>
        <h1
          style={{
            font: isMobile ? '800 32px/1.12 var(--font-display)' : 'var(--type-h1)',
            letterSpacing: 'var(--tracking-display)',
            color: '#fff',
            margin: 0,
            maxWidth: '18ch',
          }}
        >
          Gracias. Tu acceso está en camino.
        </h1>
        <p style={{ font: isMobile ? 'var(--type-body)' : 'var(--type-body-lg)', color: 'var(--text-muted-on-dark)', margin: 0, maxWidth: '52ch' }}>
          En los próximos minutos recibes por correo y por WhatsApp el acceso a las 16 lecciones. Si el
          correo no aparece, revisa la carpeta de spam o promociones.
        </p>
        <PulseDivider onDark align="left" width={isMobile ? 200 : 280} />
        <p style={{ font: 'var(--type-body-sm)', color: 'var(--dc-sky-300)', margin: 0 }}>
          Nos vemos en la primera lección. — Dr. David Campos
        </p>
      </div>
    </section>
  );
}
