import React from 'react';
import { ArrowLeft, ArrowRight, Button, PulseDivider, useIsMobile } from '../../shared/ui.jsx';

/**
 * Pantalla de dato clínico: el compás entre preguntas.
 * Va sobre navy porque el sistema reserva el fondo oscuro para los momentos de
 * peso — y así los datos puntúan visualmente el ritmo de pantallas claras.
 */
export default function Dato({ stat, datoNo, datoTotal, onNext, onBack }) {
  const isMobile = useIsMobile();

  // "2 h 27 min" no cabe al tamaño de "71%": la cifra manda sobre su propia escala.
  const long = stat.figure.length > 6;
  const figureSize = isMobile ? (long ? 38 : 58) : long ? 54 : 80;

  return (
    <section
      style={{
        background: 'var(--gradient-hero-dark)',
        color: 'var(--text-on-dark)',
        minHeight: isMobile ? 'calc(100dvh - 67px)' : 'calc(100dvh - 81px)',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <div
        className="dc-rise"
        style={{
          width: '100%',
          maxWidth: 900,
          margin: '0 auto',
          padding: isMobile ? '32px 20px 44px' : '56px 32px',
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'minmax(0, 330px) minmax(0, 1fr)',
          gap: isMobile ? 26 : 44,
          alignItems: 'center',
        }}
      >
        <div
          style={{
            position: 'relative',
            borderRadius: 'var(--radius-xl)',
            overflow: 'hidden',
            border: '1px solid var(--border-on-dark)',
            boxShadow: 'var(--shadow-lg)',
            aspectRatio: isMobile ? '4 / 3' : '1 / 1',
          }}
        >
          <img
            src={stat.image}
            alt={stat.alt}
            loading="eager"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: stat.objectPosition || 'center',
              display: 'block',
            }}
          />
          {/* Velo navy: iguala fotografía y render 3D bajo la misma temperatura de marca. */}
          <div
            aria-hidden="true"
            style={{ position: 'absolute', inset: 0, background: 'rgba(2,39,70,0.14)' }}
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: isMobile ? 14 : 16 }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'baseline',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              columnGap: 16,
              rowGap: 6,
              font: 'var(--type-label)',
              letterSpacing: 'var(--tracking-label)',
              textTransform: 'uppercase',
            }}
          >
            <span style={{ color: 'var(--dc-pulse-400)' }}>{stat.kicker}</span>
            <span style={{ color: 'var(--text-muted-on-dark)', flex: 'none' }}>
              Dato {datoNo} de {datoTotal}
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <span
              style={{
                font: `800 ${figureSize}px/1 var(--font-display)`,
                letterSpacing: 'var(--tracking-display)',
                color: '#fff',
              }}
            >
              {stat.figure}
            </span>
            <p
              style={{
                margin: 0,
                font: isMobile ? 'var(--type-body)' : 'var(--type-body-lg)',
                color: 'var(--text-on-dark)',
                maxWidth: '40ch',
              }}
            >
              {stat.text}
            </p>
          </div>

          <PulseDivider onDark align="left" width={isMobile ? 180 : 230} />

          <span
            style={{
              font: 'var(--type-label)',
              letterSpacing: 'var(--tracking-label)',
              textTransform: 'uppercase',
              color: 'var(--text-muted-on-dark)',
            }}
          >
            {stat.source}
          </span>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 12,
              marginTop: isMobile ? 10 : 14,
            }}
          >
            <Button
              variant="ghost"
              size={isMobile ? 'sm' : 'md'}
              onClick={onBack}
              icon={<ArrowLeft size={16} />}
              style={{ color: 'var(--dc-sky-300)' }}
            >
              Atrás
            </Button>
            <Button
              variant="onDark"
              size={isMobile ? 'md' : 'lg'}
              onClick={onNext}
              iconAfter={<ArrowRight size={18} />}
            >
              Continuar
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
