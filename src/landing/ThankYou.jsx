import React from 'react';
import { ArrowRight, BrandLock, Button, PulseDivider, useIsMobile } from '../shared/ui.jsx';
import { useDocumentTitle } from '../shared/useDocumentTitle.js';
import { ACCESS, SUPPORT } from './data/offer.js';

const STEPS = [
  {
    n: '1',
    t: 'Revisa tu correo',
    d: 'El acceso llega en los próximos minutos al correo con el que compraste, desde doctordavidcampos.com. Si no aparece, mira las carpetas de spam y promociones.',
  },
  {
    n: '2',
    t: 'Entra a la plataforma',
    d: `Las 16 lecciones viven en ${ACCESS.domain}. Entra con ese mismo correo.`,
  },
];

/** Página de gracias tras el checkout. Simple: confirmar, decir qué sigue y a dónde escribir. */
export default function ThankYou() {
  const isMobile = useIsMobile();
  useDocumentTitle(
    'Gracias — Método 4C | Dr. David Campos',
    'Tu acceso al Método 4C está en camino: revisa tu correo y entra a la plataforma.'
  );

  const mailto = `mailto:${SUPPORT.email}?subject=${encodeURIComponent(SUPPORT.subject)}`;

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

        <ol style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 14, width: '100%' }}>
          {STEPS.map((s) => (
            <li key={s.n} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
              <span
                aria-hidden="true"
                style={{
                  flex: '0 0 auto',
                  width: 34,
                  height: 34,
                  borderRadius: 'var(--radius-md)',
                  background: 'rgba(62,205,232,0.14)',
                  border: '1px solid rgba(62,205,232,0.32)',
                  color: 'var(--dc-pulse-400)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  font: '800 16px/1 var(--font-display)',
                }}
              >
                {s.n}
              </span>
              <span style={{ display: 'flex', flexDirection: 'column', gap: 4, minWidth: 0 }}>
                <span style={{ font: '700 16px/1.3 var(--font-display)', color: '#fff' }}>{s.t}</span>
                <span style={{ font: 'var(--type-body-sm)', color: 'var(--text-muted-on-dark)' }}>{s.d}</span>
              </span>
            </li>
          ))}
        </ol>

        <a href={ACCESS.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', width: isMobile ? '100%' : 'auto' }}>
          <Button variant="onDark" size="lg" fullWidth={isMobile} iconAfter={<ArrowRight size={18} />}>
            {ACCESS.cta}
          </Button>
        </a>

        <PulseDivider onDark align="left" width={isMobile ? 200 : 280} />

        <p style={{ font: 'var(--type-body-sm)', color: 'var(--text-muted-on-dark)', margin: 0, maxWidth: '54ch' }}>
          ¿No te llegó el correo o algo no funciona? Escríbenos a{' '}
          <a href={mailto} style={{ color: 'var(--dc-sky-300)', fontWeight: 600, textDecoration: 'underline', textUnderlineOffset: 3 }}>
            {SUPPORT.email}
          </a>{' '}
          y te damos el acceso a mano.
        </p>

        <p style={{ font: 'var(--type-body-sm)', color: 'var(--dc-sky-300)', margin: 0 }}>
          Nos vemos en la primera lección. — Dr. David Campos
        </p>
      </div>
    </section>
  );
}
