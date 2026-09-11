import React from 'react';
import {
  Badge,
  BrandLock,
  Button,
  Card,
  PulseDivider,
  Tag,
  ArrowRight,
  Activity,
  useIsMobile,
  richText,
} from '../../shared/ui.jsx';
import { CTA_URL, CLOSING, DIAGNOSIS_INTRO, QUESTIONS, SCORE_MAX, SCORE_MIN } from '../data/quiz.js';

/* Los colores de estado del sistema son oscuros por diseño; sobre navy se usan
   sus versiones aclaradas para mantener el contraste sin salirse de la paleta. */
const TONE = {
  danger: { light: 'var(--dc-danger)', dark: '#E4736C' },
  warning: { light: 'var(--dc-warning)', dark: '#E0AE5A' },
  success: { light: 'var(--dc-success)', dark: '#4FC49A' },
};

const BANDS = [
  { tone: 'danger', min: 9, max: 14 },
  { tone: 'warning', min: 15, max: 21 },
  { tone: 'success', min: 22, max: 27 },
];

/* ── medidor: la línea de ECG como escala de diagnóstico ───────────── */

function ScoreGauge({ score, tone }) {
  const X0 = 16;
  const X1 = 624;
  const Y = 34;
  const span = X1 - X0;
  const toX = (value) => X0 + ((value - SCORE_MIN) / (SCORE_MAX - SCORE_MIN)) * span;

  const mx = toX(score);
  const blip = mx - 52;
  const d =
    blip > X0 + 10
      ? `M${X0} ${Y} H${blip} L${blip + 10} ${Y} ${blip + 20} ${Y - 24} ${blip + 32} ${Y + 20} ${blip + 42} ${Y} H${mx}`
      : `M${X0} ${Y} H${mx}`;

  const accent = TONE[tone].dark;

  return (
    <div style={{ width: '100%' }}>
      <svg viewBox="0 0 640 84" fill="none" role="img" aria-label={`Puntaje ${score} de ${SCORE_MAX}`}>
        <path d={`M${X0} ${Y} H${X1}`} stroke="rgba(143,203,239,0.22)" strokeWidth="2" strokeLinecap="round" />
        <path
          d={d}
          stroke={accent}
          strokeWidth="2.5"
          strokeLinejoin="round"
          strokeLinecap="round"
          style={{ filter: `drop-shadow(0 0 8px ${accent}66)` }}
        />
        <circle cx={mx} cy={Y} r="7" fill={accent} style={{ filter: `drop-shadow(0 0 10px ${accent}99)` }} />
        <circle cx={mx} cy={Y} r="12" fill="none" stroke={accent} strokeOpacity="0.35" strokeWidth="1.5" />

        {BANDS.map((b) => {
          const from = toX(b.min - 0.5);
          const to = toX(b.max + 0.5);
          const active = b.tone === tone;
          return (
            <g key={b.tone}>
              <rect
                x={from + 3}
                y={Y + 22}
                width={Math.max(to - from - 6, 2)}
                height="3"
                rx="1.5"
                fill={TONE[b.tone].dark}
                fillOpacity={active ? 0.95 : 0.22}
              />
              <text
                x={(from + to) / 2}
                y={Y + 44}
                textAnchor="middle"
                fill={active ? TONE[b.tone].dark : 'rgba(168,198,222,0.6)'}
                style={{
                  font: `${active ? 700 : 500} 13px var(--font-body)`,
                }}
              >
                {b.min}–{b.max}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

/* ── recuento de plataformas de la pregunta 2 ──────────────────────── */

function platformSummary(answers, otherText) {
  const selected = answers.q2 ?? [];
  if (selected.length === 0) return null;
  if (selected.includes('ninguna')) return { none: true, list: [] };
  const byValue = Object.fromEntries(QUESTIONS.find((q) => q.id === 'q2').options.map((o) => [o.value, o.label]));
  const list = selected.map((v) => (v === 'otra' ? otherText.trim() || 'Otra' : byValue[v])).filter(Boolean);
  return { none: false, list };
}

/* ── pantalla ──────────────────────────────────────────────────────── */

export default function Result({ score, result, answers, otherText, leadName }) {
  const isMobile = useIsMobile();
  const platforms = platformSummary(answers, otherText);
  const accent = TONE[result.tone];
  // El diagnóstico viaja en la query para que la landing pueda personalizar su apertura.
  const ctaHref = CTA_URL === '#' ? '#' : `${CTA_URL}${CTA_URL.includes('?') ? '&' : '?'}dx=${result.id}`;
  const ctaDisabled = CTA_URL === '#';

  const wrap = {
    width: '100%',
    maxWidth: 720,
    margin: '0 auto',
    padding: isMobile ? '0 20px' : '0 32px',
  };

  const CtaButton = ({ children, variant = 'primary', size = 'lg', onDark = false }) =>
    ctaDisabled ? (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'flex-start' }}>
        <Button variant={variant} size={size} fullWidth={isMobile} iconAfter={<ArrowRight size={18} />} disabled>
          {children}
        </Button>
        <span
          style={{
            font: 'var(--type-caption)',
            color: onDark ? 'var(--text-muted-on-dark)' : 'var(--text-muted)',
          }}
        >
          Pendiente: definir VITE_CTA_URL con la landing de venta.
        </span>
      </div>
    ) : (
      <a href={ctaHref} style={{ textDecoration: 'none', display: isMobile ? 'block' : 'inline-block' }}>
        <Button variant={variant} size={size} fullWidth={isMobile} iconAfter={<ArrowRight size={18} />}>
          {children}
        </Button>
      </a>
    );

  return (
    <div className="dc-fade">
      {/* Cabecera oscura — el momento del diagnóstico */}
      <section
        style={{
          background: 'var(--gradient-hero-dark)',
          color: 'var(--text-on-dark)',
          padding: isMobile ? '32px 0 40px' : '48px 0 56px',
        }}
      >
        <div style={{ ...wrap, display: 'flex', flexDirection: 'column', gap: isMobile ? 20 : 24 }}>
          <BrandLock onDark size={isMobile ? 38 : 44} />

          <span
            style={{
              font: 'var(--type-label)',
              letterSpacing: 'var(--tracking-label)',
              textTransform: 'uppercase',
              color: 'var(--dc-pulse-400)',
            }}
          >
            {leadName ? `Diagnóstico de ${leadName}` : 'Tu diagnóstico'}
          </span>

          <div style={{ display: 'flex', alignItems: 'baseline', gap: 12 }}>
            <span
              style={{
                font: isMobile ? '800 60px/1 var(--font-display)' : '800 84px/1 var(--font-display)',
                letterSpacing: 'var(--tracking-display)',
                color: accent.dark,
              }}
            >
              {score}
            </span>
            <span
              style={{
                font: isMobile ? '700 20px/1 var(--font-display)' : '700 26px/1 var(--font-display)',
                color: 'var(--text-muted-on-dark)',
              }}
            >
              / {SCORE_MAX} puntos
            </span>
          </div>

          <ScoreGauge score={score} tone={result.tone} />

          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <span
              style={{
                font: 'var(--type-label)',
                letterSpacing: 'var(--tracking-label)',
                textTransform: 'uppercase',
                color: accent.dark,
              }}
            >
              {result.stage}
            </span>
            <h1
              style={{
                font: isMobile ? '800 30px/1.14 var(--font-display)' : 'var(--type-h1)',
                letterSpacing: 'var(--tracking-display)',
                color: '#fff',
                margin: 0,
              }}
            >
              {result.title}
            </h1>
            <p
              style={{
                font: isMobile ? 'var(--type-body)' : 'var(--type-body-lg)',
                color: 'var(--text-muted-on-dark)',
                margin: 0,
                maxWidth: '52ch',
              }}
            >
              {result.lede}
            </p>
          </div>
        </div>
      </section>

      {/* Cuerpo claro — la lectura del caso */}
      <section style={{ ...wrap, padding: isMobile ? '36px 20px 0' : '56px 32px 0' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: isMobile ? 28 : 36 }}>
          <blockquote
            style={{
              margin: 0,
              paddingLeft: 20,
              borderLeft: '2px solid var(--dc-sky-300)',
              font: 'italic 400 17px/1.6 var(--font-body)',
              color: 'var(--text-body)',
            }}
          >
            {DIAGNOSIS_INTRO}
            <footer
              style={{
                marginTop: 10,
                font: 'normal var(--type-label)',
                letterSpacing: 'var(--tracking-label)',
                textTransform: 'uppercase',
                color: 'var(--text-muted)',
              }}
            >
              Dr. David Campos
            </footer>
          </blockquote>

          {result.body.map((paragraph, i) => (
            <p
              key={i}
              style={{
                font: isMobile ? 'var(--type-body)' : 'var(--type-body-lg)',
                color: 'var(--text-body)',
                margin: 0,
              }}
            >
              {richText(paragraph, `body-${i}`)}
            </p>
          ))}

          {/* Mentira / verdad — el contraste que ordena el diagnóstico */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
              gap: 14,
            }}
          >
            <Card>
              <span
                style={{
                  font: 'var(--type-label)',
                  letterSpacing: 'var(--tracking-label)',
                  textTransform: 'uppercase',
                  color: accent.light,
                }}
              >
                {result.contrast.lieLabel}
              </span>
              <p
                className="dc-italic"
                style={{ margin: '10px 0 0', font: 'var(--type-body)', color: 'var(--text-display)' }}
              >
                {result.contrast.lie}
              </p>
            </Card>

            <Card>
              <span
                style={{
                  font: 'var(--type-label)',
                  letterSpacing: 'var(--tracking-label)',
                  textTransform: 'uppercase',
                  color: 'var(--dc-royal-600)',
                }}
              >
                {result.contrast.truthLabel}
              </span>
              <p style={{ margin: '10px 0 0', font: 'var(--type-body)', color: 'var(--text-display)' }}>
                {result.contrast.truth}
              </p>
            </Card>
          </div>

          {/* Presencia declarada en la pregunta 2 */}
          {platforms && (
            <Card variant="wash">
              <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <Activity size={20} style={{ color: 'var(--dc-royal-600)', marginTop: 2, flex: 'none' }} />
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <span style={{ font: 'var(--type-h4)', color: 'var(--text-display)' }}>
                    Tu presencia declarada
                  </span>
                  {platforms.none ? (
                    <p style={{ margin: 0, font: 'var(--type-body-sm)', color: 'var(--text-body)' }}>
                      Hoy no publicas en ninguna plataforma. Eso no es una falla — es un punto de
                      partida limpio. Empezar en una sola, bien elegida, pesa más que estar a medias
                      en cinco.
                    </p>
                  ) : (
                    <>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                        {platforms.list.map((p) => (
                          <Tag key={p}>{p}</Tag>
                        ))}
                      </div>
                      <p style={{ margin: 0, font: 'var(--type-body-sm)', color: 'var(--text-body)' }}>
                        {platforms.list.length === 1
                          ? 'Una sola plataforma bien trabajada es un buen cimiento. El método define qué publicar ahí y con qué frecuencia sostenerla.'
                          : 'Estás en varias plataformas. El método no te pide sumar más — te pide decidir cuál sostiene tu consulta y adaptar el resto desde ahí.'}
                      </p>
                    </>
                  )}
                </div>
              </div>
            </Card>
          )}

          {/* El tratamiento — el CTA */}
          <Card
            variant="dark"
            padding={isMobile ? 24 : 32}
            style={{ display: 'flex', flexDirection: 'column', gap: 18 }}
          >
            <Badge
              tone="pulse"
              style={{
                background: 'rgba(62,205,232,0.16)',
                color: 'var(--dc-pulse-400)',
                alignSelf: 'flex-start',
              }}
            >
              Tu tratamiento
            </Badge>
            <p
              style={{
                margin: 0,
                font: isMobile ? 'var(--type-body)' : 'var(--type-body-lg)',
                color: 'var(--text-on-dark)',
              }}
            >
              {result.treatment}
            </p>
            <PulseDivider onDark align="left" width={200} />
            <div>
              <CtaButton variant="onDark" onDark>
                {result.cta}
              </CtaButton>
            </div>
          </Card>
        </div>
      </section>

      {/* Cierre */}
      <section style={{ ...wrap, padding: isMobile ? '36px 20px 120px' : '48px 32px 140px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <PulseDivider align="left" width={240} />
          <blockquote
            style={{
              margin: 0,
              font: isMobile
                ? 'italic 400 17px/1.6 var(--font-body)'
                : 'italic 400 19px/1.6 var(--font-body)',
              color: 'var(--text-body)',
            }}
          >
            {CLOSING.quote}
          </blockquote>
          <p
            style={{
              margin: 0,
              font: isMobile ? '700 20px/1.3 var(--font-display)' : 'var(--type-h3)',
              letterSpacing: 'var(--tracking-display)',
              color: 'var(--text-display)',
            }}
          >
            {CLOSING.claim}
          </p>
          <p style={{ margin: 0, font: 'var(--type-body)', color: 'var(--text-body)' }}>{CLOSING.line}</p>
          <div style={{ marginTop: 4 }}>
            <CtaButton>{CLOSING.cta}</CtaButton>
          </div>
          <span style={{ font: '400 34px/1.2 var(--font-script)', color: 'var(--dc-royal-600)' }}>
            Dr. David Campos
          </span>

        </div>
      </section>

      {/* Barra fija: la invitación al método acompaña todo el diagnóstico desde el inicio. */}
      {!ctaDisabled && (
        <div
          className="dc-rise"
          style={{
            position: 'fixed',
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 60,
            padding: isMobile ? '10px 16px calc(10px + env(safe-area-inset-bottom))' : '12px 32px calc(12px + env(safe-area-inset-bottom))',
            background: 'rgba(246,248,251,0.96)',
            backdropFilter: 'blur(8px)',
            borderTop: '1px solid var(--border-subtle)',
          }}
        >
          <div
            style={{
              maxWidth: 720,
              margin: '0 auto',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 12,
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}>
              <span style={{ font: '700 14px/1.2 var(--font-display)', color: 'var(--text-display)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {isMobile ? 'Tu tratamiento existe' : 'Tu tratamiento existe: el Método 4C'}
              </span>
              <span style={{ font: 'var(--type-caption)', color: 'var(--text-muted)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {isMobile ? 'Del Dr. David Campos' : '16 lecciones · el sistema documentado del Dr. David Campos'}
              </span>
            </div>
            <a href={ctaHref} style={{ textDecoration: 'none', flex: 'none' }}>
              <Button size="md" iconAfter={<ArrowRight size={16} />}>Ver el método</Button>
            </a>
          </div>
        </div>
      )}

      {/* Barra fija: la invitación al método acompaña todo el diagnóstico desde el inicio. */}
      {!ctaDisabled && (
        <div
          className="dc-rise"
          style={{
            position: 'fixed',
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 60,
            padding: isMobile ? '10px 16px calc(10px + env(safe-area-inset-bottom))' : '12px 32px calc(12px + env(safe-area-inset-bottom))',
            background: 'rgba(246,248,251,0.96)',
            backdropFilter: 'blur(8px)',
            borderTop: '1px solid var(--border-subtle)',
          }}
        >
          <div
            style={{
              maxWidth: 720,
              margin: '0 auto',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 12,
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}>
              <span style={{ font: '700 14px/1.2 var(--font-display)', color: 'var(--text-display)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {isMobile ? 'Tu tratamiento existe' : 'Tu tratamiento existe: el Método 4C'}
              </span>
              <span style={{ font: 'var(--type-caption)', color: 'var(--text-muted)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {isMobile ? 'Del Dr. David Campos' : '16 lecciones · el sistema documentado del Dr. David Campos'}
              </span>
            </div>
            <a href={ctaHref} style={{ textDecoration: 'none', flex: 'none' }}>
              <Button size="md" iconAfter={<ArrowRight size={16} />}>Ver el método</Button>
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
