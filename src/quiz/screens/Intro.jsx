import React from 'react';
import {
  Badge,
  BrandLock,
  Button,
  PulseDivider,
  ArrowRight,
  Clock,
  ListChecks,
  Stethoscope,
  useIsMobile,
} from '../../shared/ui.jsx';

const META = [
  { Icon: ListChecks, label: '10 preguntas' },
  { Icon: Clock, label: '3 minutos' },
  { Icon: Stethoscope, label: 'Diagnóstico inmediato' },
];

export default function Intro({ onStart }) {
  const isMobile = useIsMobile();

  return (
    <section
      style={{
        position: 'relative',
        overflow: 'hidden',
        background: 'var(--gradient-hero-dark)',
        color: 'var(--text-on-dark)',
        minHeight: '100dvh',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <img
        src="/bg-studio-mic.jpg"
        alt=""
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          opacity: 0.2,
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(90deg, rgba(2,39,70,0.94) 0%, rgba(2,39,70,0.72) 60%, rgba(2,39,70,0.45) 100%)',
        }}
      />

      <div
        className="dc-rise"
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: 860,
          margin: '0 auto',
          padding: isMobile ? '72px 20px 56px' : '96px 32px',
          display: 'flex',
          flexDirection: 'column',
          gap: isMobile ? 20 : 24,
          alignItems: 'flex-start',
        }}
      >
        <BrandLock onDark size={isMobile ? 40 : 48} style={{ marginBottom: 4 }} />

        <Badge tone="pulse" style={{ background: 'rgba(62,205,232,0.16)', color: 'var(--dc-pulse-400)' }}>
          Autodiagnóstico digital · para médicos
        </Badge>

        <h1
          style={{
            font: isMobile ? '800 34px/1.12 var(--font-display)' : 'var(--type-hero)',
            letterSpacing: 'var(--tracking-display)',
            margin: 0,
            color: '#fff',
            maxWidth: '18ch',
          }}
        >
          ¿Tu carrera médica está en riesgo digital?
        </h1>

        <p
          style={{
            font: isMobile ? 'var(--type-body)' : 'var(--type-body-lg)',
            color: 'var(--text-muted-on-dark)',
            margin: 0,
            maxWidth: '54ch',
          }}
        >
          Descubre si estás perdiendo pacientes sin saberlo — y qué tan preparado estás para el nuevo
          panorama de la medicina.
        </p>

        <PulseDivider onDark align="left" width={isMobile ? 220 : 320} style={{ marginTop: 4 }} />

        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            columnGap: isMobile ? 14 : 28,
            rowGap: 10,
          }}
        >
          {META.map(({ Icon, label }) => (
            <span
              key={label}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                font: 'var(--type-body-sm)',
                color: 'var(--dc-sky-300)',
              }}
            >
              <Icon size={17} />
              {label}
            </span>
          ))}
        </div>

        <div
          style={{
            borderLeft: '2px solid rgba(62,205,232,0.4)',
            paddingLeft: 18,
            maxWidth: '58ch',
            marginTop: 4,
          }}
        >
          <p style={{ font: 'var(--type-body-sm)', color: 'var(--text-muted-on-dark)', margin: 0 }}>
            Responde cada pregunta con honestidad: nadie más va a ver tus respuestas. Al terminar
            recibes tu diagnóstico completo, escrito por el Dr. David Campos a partir de su propio
            caso clínico.
          </p>
        </div>

        <Button
          variant="onDark"
          size="lg"
          onClick={onStart}
          fullWidth={isMobile}
          iconAfter={<ArrowRight size={18} />}
          style={{ marginTop: 8 }}
        >
          Comenzar el diagnóstico
        </Button>
      </div>
    </section>
  );
}
