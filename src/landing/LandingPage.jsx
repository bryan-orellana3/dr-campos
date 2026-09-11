import React from 'react';
import { useLocation } from 'react-router-dom';
import { Badge, BrandLock, Button, Card, PulseDivider, SectionHeading, ArrowRight, Check, useIsMobile } from '../shared/ui.jsx';
import { useDocumentTitle } from '../shared/useDocumentTitle.js';
import VslPlayer, { useCtaReveal } from './VslPlayer.jsx';
import CheckoutModal from './CheckoutModal.jsx';
import { DiscountBadge, OfferCountdown, StrikePrice, useOfferCountdown } from './OfferCountdown.jsx';
import { DX_LINE, GUARANTEE, HERO, MENTOR, MODULES, OFFER, OFFER_TIMER, PILLARS, PRICE, PROOF } from './data/offer.js';

const label = (onDark) => ({
  font: 'var(--type-label)',
  letterSpacing: 'var(--tracking-label)',
  textTransform: 'uppercase',
  color: onDark ? 'var(--dc-pulse-400)' : 'var(--dc-royal-600)',
});

function Section({ children, dark = false, tight = false, style }) {
  const isMobile = useIsMobile();
  return (
    <section
      style={{
        background: dark ? 'var(--gradient-hero-dark)' : undefined,
        color: dark ? 'var(--text-on-dark)' : undefined,
        borderTop: dark ? 'none' : '1px solid var(--border-subtle)',
        ...style,
      }}
    >
      <div
        style={{
          maxWidth: 'var(--container-max)',
          margin: '0 auto',
          padding: isMobile ? (tight ? '40px 20px' : '56px 20px') : tight ? '56px 32px' : '88px 32px',
        }}
      >
        {children}
      </div>
    </section>
  );
}

function BuyButton({ onClick, variant = 'primary', size = 'lg', children, forwardedRef, className, style }) {
  const isMobile = useIsMobile();
  return (
    <Button ref={forwardedRef} variant={variant} size={size} onClick={onClick} fullWidth={isMobile} className={className} iconAfter={<ArrowRight size={18} />} style={style}>
      {children}
    </Button>
  );
}

export default function LandingPage() {
  const isMobile = useIsMobile();
  const { search } = useLocation();
  useDocumentTitle(
    'Método 4C — Presencia digital para médicos | Dr. David Campos',
    'El sistema documentado del Dr. David Campos para convertirte en el médico de referencia de tu ciudad: 16 lecciones, 4 pilares, sin agencias y sin dejar la consulta.'
  );

  const dx = new URLSearchParams(search).get('dx');
  const dxLine = dx && DX_LINE[dx];
  const [revealed, reveal] = useCtaReveal();
  const countdown = useOfferCountdown();
  const [checkout, setCheckout] = React.useState(false);
  const lastTrigger = React.useRef(null);
  const openCheckout = (e) => {
    lastTrigger.current = e?.currentTarget ?? null;
    setCheckout(true);
  };
  const closeCheckout = React.useCallback(() => setCheckout(false), []);


  return (
    <div className="dc-fade">
      {/* ── Hero: el video es la página ─────────────────────────────── */}
      <section style={{ background: 'var(--gradient-hero-dark)', color: 'var(--text-on-dark)' }}>
        <div
          style={{
            maxWidth: 'var(--container-max)',
            margin: '0 auto',
            padding: isMobile ? '24px 20px 48px' : '32px 32px 72px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: isMobile ? 18 : 24,
            textAlign: 'center',
          }}
        >
          <div style={{ alignSelf: 'flex-start' }}>
            <BrandLock onDark size={isMobile ? 40 : 48} />
          </div>

          {dxLine && (
            <span style={{ font: 'var(--type-body-sm)', color: 'var(--dc-sky-300)', background: 'rgba(143,203,239,0.12)', borderRadius: 'var(--radius-pill)', padding: '8px 16px' }}>
              {dxLine}
            </span>
          )}

          {/* El video es lo primero que se ve; el botón aparece justo debajo al llegar al segundo configurado. */}
          <div style={{ width: '100%', maxWidth: 900 }}>
            <VslPlayer onReveal={reveal} revealed={revealed} />
          </div>

          {revealed ? (
            <div className="dc-rise" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, width: isMobile ? '100%' : 'auto' }}>
              <BuyButton variant="onDark" onClick={openCheckout}>{HERO.cta}</BuyButton>
              <span style={{ display: 'inline-flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', columnGap: 8, rowGap: 6, font: 'var(--type-caption)', color: 'var(--text-muted-on-dark)' }}>
                <StrikePrice size="sm" />
                <DiscountBadge size="sm" />
                <span>{PRICE.note}</span>
              </span>
              <OfferCountdown countdown={countdown} size="lg" />
            </div>
          ) : (
            <PulseDivider onDark width={isMobile ? 200 : 300} />
          )}

          <Badge tone="pulse" style={{ background: 'rgba(62,205,232,0.16)', color: 'var(--dc-pulse-400)' }}>{HERO.eyebrow}</Badge>

          <h1
            style={{
              font: isMobile ? '800 28px/1.14 var(--font-display)' : '800 40px/1.1 var(--font-display)',
              letterSpacing: 'var(--tracking-display)',
              color: '#fff',
              margin: 0,
              maxWidth: '24ch',
            }}
          >
            {HERO.title}
          </h1>

          <p style={{ font: isMobile ? 'var(--type-body)' : 'var(--type-body-lg)', color: 'var(--text-muted-on-dark)', margin: 0, maxWidth: '62ch' }}>
            {HERO.lede}
          </p>
        </div>
      </section>

      {/* ── Evidencia ───────────────────────────────────────────────── */}
      <Section>
        <div style={{ display: 'flex', flexDirection: 'column', gap: isMobile ? 26 : 40 }}>
          <SectionHeading eyebrow={PROOF.eyebrow} title={PROOF.title} lede={PROOF.lede} />
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(4, 1fr)', gap: isMobile ? 12 : 18 }}>
            {PROOF.items.map((p) => (
              <Card key={p.src} padding={0} style={{ overflow: 'hidden' }}>
                <img src={p.src} alt={p.alt} loading="lazy" style={{ width: '100%', display: 'block', borderBottom: '1px solid var(--border-subtle)' }} />
                <div style={{ padding: isMobile ? '10px 12px 12px' : '14px 16px 16px', display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <span style={{ font: isMobile ? '800 17px/1.1 var(--font-display)' : '800 20px/1.1 var(--font-display)', color: 'var(--text-display)' }}>{p.amount}</span>
                  <span style={{ font: 'var(--type-caption)', color: 'var(--text-muted)' }}>{p.period} · Facebook</span>
                </div>
              </Card>
            ))}
          </div>
          <p style={{ margin: 0, font: 'var(--type-caption)', color: 'var(--text-muted)', maxWidth: '78ch' }}>{PROOF.note}</p>

          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1.4fr', gap: isMobile ? 16 : 32, alignItems: 'center' }}>
            <p style={{ margin: 0, font: 'var(--type-body-lg)', color: 'var(--text-body)' }}>{PROOF.tvLede}</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              {PROOF.tv.map((t) => (
                <figure key={t.src} style={{ margin: 0, borderRadius: 'var(--radius-lg)', overflow: 'hidden', boxShadow: 'var(--shadow-md)', background: 'var(--dc-navy-950)' }}>
                  <img src={t.src} alt={t.alt} loading="lazy" style={{ width: '100%', aspectRatio: '4 / 3', objectFit: 'cover', display: 'block' }} />
                  <figcaption style={{ font: 'var(--type-caption)', color: 'var(--text-muted-on-dark)', padding: '8px 12px' }}>{t.caption}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* ── Método 4C ───────────────────────────────────────────────── */}
      <Section style={{ background: 'var(--dc-white)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: isMobile ? 26 : 40 }}>
          <SectionHeading eyebrow="Método 4C" title="Cuatro pilares, cero improvisación" lede="No es un hack. Es una rutina — la misma que el Dr. Campos ejecuta cada semana, transferida con plantillas y métricas." />
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(4, 1fr)', gap: 18 }}>
            {PILLARS.map((p) => (
              <Card key={p.n} variant="wash">
                <div style={{ width: 46, height: 46, borderRadius: 'var(--radius-md)', background: 'var(--dc-white)', color: 'var(--dc-royal-600)', display: 'flex', alignItems: 'center', justifyContent: 'center', font: '800 22px/1 var(--font-display)', marginBottom: 14 }}>{p.n}</div>
                <div style={{ font: 'var(--type-h4)', color: 'var(--text-display)', marginBottom: 6 }}>{p.t}</div>
                <div style={{ font: 'var(--type-body-sm)', color: 'var(--text-muted)' }}>{p.d}</div>
              </Card>
            ))}
          </div>
        </div>
      </Section>

      {/* ── Qué incluye ─────────────────────────────────────────────── */}
      <Section>
        <div style={{ display: 'flex', flexDirection: 'column', gap: isMobile ? 26 : 40 }}>
          <SectionHeading eyebrow="El programa" title="16 lecciones, 4 módulos, 7 días" lede="Videos de 10 a 15 minutos en formato pregunta-respuesta. Cada módulo termina con un resultado concreto, no con teoría." />
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 18 }}>
            {MODULES.map((m) => (
              <Card key={m.n}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                  <span style={{ font: '800 26px/1 var(--font-display)', color: 'var(--dc-sky-400)' }}>0{m.n}</span>
                  <Badge>{m.pillar}</Badge>
                </div>
                <div style={{ font: 'var(--type-h4)', color: 'var(--text-display)', marginBottom: 6 }}>{m.title}</div>
                <div style={{ font: 'var(--type-body-sm)', color: 'var(--text-muted)', marginBottom: 14 }}>{m.result}</div>
                <ol style={{ margin: 0, paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 6, font: 'var(--type-body-sm)', color: 'var(--text-body)' }}>
                  {m.lessons.map((l, i) => (
                    <li key={i}>{l}</li>
                  ))}
                </ol>
              </Card>
            ))}
          </div>
        </div>
      </Section>

      {/* ── Mentor ──────────────────────────────────────────────────── */}
      <Section style={{ background: 'var(--dc-white)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1.1fr 1fr', gap: isMobile ? 28 : 56, alignItems: 'center' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            <SectionHeading eyebrow={MENTOR.eyebrow} title={MENTOR.title} />
            <p style={{ font: 'var(--type-body)', color: 'var(--text-body)', margin: 0, maxWidth: '60ch' }}>{MENTOR.body}</p>
            <PulseDivider align="left" width={280} />
            <blockquote style={{ margin: 0, font: 'italic 600 19px/1.5 var(--font-body)', color: 'var(--text-display)', maxWidth: '48ch' }}>
              "{MENTOR.quote}"
            </blockquote>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: isMobile ? 20 : 28 }}>
            {MENTOR.stats.map((s) => (
              <div key={s.label} style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <span style={{ font: '800 40px/1.05 var(--font-display)', letterSpacing: 'var(--tracking-display)', background: 'var(--gradient-wordmark)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>{s.value}</span>
                <span style={{ font: '700 14px/1.3 var(--font-display)', color: 'var(--text-display)' }}>{s.label}</span>
                <span style={{ font: 'var(--type-caption)', color: 'var(--text-muted)' }}>{s.detail}</span>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ── Oferta ──────────────────────────────────────────────────── */}
      <Section dark>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1.2fr 1fr', gap: isMobile ? 28 : 56, alignItems: 'center' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            <span style={label(true)}>{OFFER.eyebrow}</span>
            <h2 style={{ font: isMobile ? '800 28px/1.14 var(--font-display)' : 'var(--type-h1)', letterSpacing: 'var(--tracking-display)', color: '#fff', margin: 0 }}>{OFFER.title}</h2>
            <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
              {OFFER.includes.map((i) => (
                <li key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', font: 'var(--type-body)', color: 'var(--text-on-dark)' }}>
                  <Check size={18} style={{ color: 'var(--dc-pulse-400)', marginTop: 3 }} />
                  {i}
                </li>
              ))}
            </ul>
          </div>
          <Card variant="dark" padding={isMobile ? 24 : 32} style={{ display: 'flex', flexDirection: 'column', gap: 16, background: 'rgba(2,39,70,0.55)', border: '1px solid rgba(62,205,232,0.3)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
              <span style={label(true)}>{OFFER_TIMER.eyebrow}</span>
              <DiscountBadge />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <s style={{ font: '600 20px/1 var(--font-display)', color: 'var(--text-muted-on-dark)', textDecorationColor: 'rgba(255,255,255,0.7)', textDecorationThickness: 2 }}>
                {PRICE.originalLabel}
              </s>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                <span style={{ font: '800 56px/1 var(--font-display)', color: '#fff' }}>{PRICE.amount}</span>
                <span style={{ font: '700 20px/1 var(--font-display)', color: 'var(--dc-sky-300)' }}>{PRICE.currency}</span>
                <span style={{ font: '700 14px/1.2 var(--font-display)', color: 'var(--dc-pulse-400)', marginLeft: 4 }}>precio final</span>
              </div>
            </div>
            <span style={{ font: 'var(--type-body-sm)', color: 'var(--text-muted-on-dark)' }}>{OFFER.finePrint}</span>
            <OfferCountdown countdown={countdown} size="lg" style={{ alignSelf: 'flex-start' }} />
            <PulseDivider onDark align="left" width={200} />
            <BuyButton variant="onDark" className="dc-glow" onClick={openCheckout} style={{ width: '100%' }}>{OFFER.cta}</BuyButton>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <span style={{ font: '700 14px/1.3 var(--font-display)', color: 'var(--dc-sky-300)' }}>{GUARANTEE.title}</span>
              <span style={{ font: 'var(--type-body-sm)', color: 'var(--text-muted-on-dark)' }}>{GUARANTEE.text}</span>
            </div>
          </Card>
        </div>
      </Section>

      <footer style={{ background: 'var(--dc-navy-950)', color: 'var(--text-muted-on-dark)' }}>
        <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto', padding: isMobile ? '28px 20px' : '40px 32px', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
          <div style={{ font: '800 17px/1 var(--font-display)', letterSpacing: 'var(--tracking-caps)', color: '#fff', textTransform: 'uppercase' }}>
            David <span style={{ color: 'var(--dc-sky-300)' }}>Campos</span>
          </div>
          <div style={{ font: 'var(--type-caption)' }}>© 2026 Dr. David Campos · Método 4C</div>
        </div>
      </footer>

      {/* ── Barra fija: navy, precio tachado, descuento, reloj de la oferta y botón con brillo ── */}
      {revealed && !checkout && (
        <>
          <div aria-hidden="true" style={{ height: isMobile ? 118 : 96 }} />
          <div
            className="dc-rise"
            style={{
              position: 'fixed',
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 60,
              padding: isMobile ? '10px 16px calc(10px + env(safe-area-inset-bottom))' : '12px 32px calc(12px + env(safe-area-inset-bottom))',
              background: 'rgba(4,26,48,0.96)',
              backdropFilter: 'blur(8px)',
              borderTop: '1px solid rgba(62,205,232,0.35)',
              color: 'var(--text-on-dark)',
            }}
          >
            {isMobile ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10 }}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, minWidth: 0 }}>
                    <StrikePrice size="sm" />
                    <DiscountBadge size="sm" />
                  </span>
                  <OfferCountdown countdown={countdown} size="sm" label={null} style={{ flex: 'none' }} />
                </div>
                <Button variant="onDark" size="md" className="dc-glow" fullWidth onClick={openCheckout} iconAfter={<ArrowRight size={16} />}>
                  {HERO.cta}
                </Button>
              </div>
            ) : (
              <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto', display: 'flex', alignItems: 'center', gap: 20 }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4, flex: 1, minWidth: 0 }}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
                    <StrikePrice size="lg" />
                    <DiscountBadge />
                  </span>
                  <span style={{ font: 'var(--type-caption)', color: 'var(--dc-sky-300)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    Método 4C · pago único · acceso inmediato · garantía de 7 días
                  </span>
                </div>
                {/* El reloj nunca se recorta: cede el ancho la línea de texto de la izquierda. */}
                <OfferCountdown countdown={countdown} size="sm" label="Termina en" style={{ flex: 'none' }} />
                <Button variant="onDark" size="lg" className="dc-glow" onClick={openCheckout} style={{ flex: 'none' }} iconAfter={<ArrowRight size={16} />}>
                  {HERO.cta}
                </Button>
              </div>
            )}
          </div>
        </>
      )}

      <CheckoutModal open={checkout} onClose={closeCheckout} returnFocusTo={lastTrigger} />
    </div>
  );
}
