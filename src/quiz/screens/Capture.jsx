import React from 'react';
import { Button, Input, PulseDivider, ArrowLeft, ArrowRight, useIsMobile } from '../../shared/ui.jsx';
import PhoneField from '../../shared/PhoneField.jsx';
import { countryByIso, guessCountry } from '../data/countries.js';
import { CONSENT_TEXT, splitName } from '../data/quiz.js';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;

export function validate({ name, email, country, phone, consent }) {
  const errors = {};
  if (name.trim().length < 2) errors.name = 'Escribe tu nombre.';
  if (!EMAIL_RE.test(email.trim())) errors.email = 'Revisa tu correo — no parece válido.';

  const digits = phone.replace(/\D/g, '');
  const c = countryByIso(country);
  if (digits.length === 0) errors.phone = 'Escribe tu WhatsApp.';
  else if (digits.length < Math.min(...c.len) || digits.length > Math.max(...c.len) + 1) {
    errors.phone = `Un número de ${c.name} tiene ${c.len.join(' o ')} dígitos.`;
  }
  if (!consent) errors.consent = 'Necesitamos tu aceptación para enviarte el diagnóstico.';
  return errors;
}

/**
 * Captura del lead. Es un <form> real porque el External Tracking de GHL lo detecta en el
 * DOM y, al dispararse el evento submit, se lleva todos sus campos y crea el contacto.
 *
 * Dos reglas que no se pueden romper (ver skill ghl-external-tracking):
 * - Los campos que GHL reconoce se llaman first_name, last_name, email y phone. El nombre
 *   visible es un solo campo, así que first/last salen partidos en inputs hidden; el phone
 *   visible es el número nacional y el hidden `phone` lleva el E.164.
 * - El botón es type="button". GHL engancha el clic de cualquier button[type=submit] y envía
 *   el formulario 50 ms después aunque esté vacío. Aquí el submit solo existe si la
 *   validación pasa: sin evento, GHL no ve nada.
 */
export default function Capture({ onSubmit, submitting, onBack, hiddenFields = {} }) {
  const isMobile = useIsMobile();
  const formRef = React.useRef(null);
  const [form, setForm] = React.useState(() => ({
    name: '',
    email: '',
    country: guessCountry(),
    phone: '',
    consent: false,
  }));
  const [consentAt, setConsentAt] = React.useState('');
  const [errors, setErrors] = React.useState({});
  const [touched, setTouched] = React.useState(false);

  const update = (key, value) =>
    setForm((f) => {
      const next = { ...f, [key]: value };
      if (touched) setErrors(validate(next));
      return next;
    });

  const c = countryByIso(form.country);
  const digits = form.phone.replace(/\D/g, '');
  const phoneE164 = digits ? `+${c.dial}${digits}` : '';
  const { honorific, first_name, last_name } = splitName(form.name);

  // Solo hay evento submit si la validación pasa: es lo que evita contactos vacíos en GHL.
  const fireSubmit = () => {
    if (submitting) return;
    const found = validate(form);
    setErrors(found);
    setTouched(true);
    if (Object.keys(found).length > 0) return;
    const f = formRef.current;
    if (typeof f.requestSubmit === 'function') f.requestSubmit();
    else f.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
  };

  // Este es el evento que GHL captura (fase capture sobre el form) con los campos ya llenos.
  const handleSubmit = (e) => {
    e.preventDefault();
    if (Object.keys(validate(form)).length > 0) return;
    onSubmit({
      name: form.name.trim(),
      email: form.email.trim().toLowerCase(),
      country: c.iso,
      countryName: c.name,
      dial: c.dial,
      phone: digits,
      phoneE164,
      consentAt,
    });
  };

  return (
    <div
      className="dc-fade"
      style={{
        width: '100%',
        maxWidth: 560,
        margin: '0 auto',
        padding: isMobile ? '28px 20px 48px' : '48px 32px 72px',
        display: 'flex',
        flexDirection: 'column',
        gap: isMobile ? 22 : 28,
      }}
    >
      <header style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <span
          style={{
            font: 'var(--type-label)',
            letterSpacing: 'var(--tracking-label)',
            textTransform: 'uppercase',
            color: 'var(--dc-royal-600)',
          }}
        >
          Último paso
        </span>
        <h2
          style={{
            font: isMobile ? '700 26px/1.18 var(--font-display)' : 'var(--type-h2)',
            letterSpacing: 'var(--tracking-display)',
            color: 'var(--text-display)',
            margin: 0,
          }}
        >
          Tu diagnóstico está listo
        </h2>
        <PulseDivider align="left" width={200} />
        <p style={{ font: 'var(--type-body)', color: 'var(--text-body)', margin: 0 }}>
          Dime a nombre de quién va y te lo muestro aquí mismo. Te envío además una copia por correo
          para que puedas releerlo con calma.
        </p>
      </header>

      <form
        ref={formRef}
        id="lead-form"
        onSubmit={handleSubmit}
        noValidate
        onKeyDown={(e) => {
          // Sin botón submit no hay envío implícito con Enter: se replica a mano, validando.
          if (e.key === 'Enter' && e.target.tagName !== 'TEXTAREA') {
            e.preventDefault();
            fireSubmit();
          }
        }}
        style={{ display: 'flex', flexDirection: 'column', gap: 16 }}
      >
        <Input
          label="Nombre"
          name="nombre_completo"
          value={form.name}
          onChange={(e) => update('name', e.target.value)}
          error={errors.name}
          placeholder="Dr. / Dra. …"
          autoComplete="name"
          enterKeyHint="next"
        />

        <Input
          label="Correo electrónico"
          name="email"
          type="email"
          value={form.email}
          onChange={(e) => update('email', e.target.value)}
          error={errors.email}
          placeholder="tu@correo.com"
          autoComplete="email"
          inputMode="email"
          enterKeyHint="next"
        />

        <PhoneField
          name="phone_national"
          country={form.country}
          phone={form.phone}
          onCountryChange={(iso) => update('country', iso)}
          onPhoneChange={(v) => update('phone', v)}
          error={errors.phone}
        />

        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <label
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: 10,
              cursor: 'pointer',
              font: 'var(--type-body-sm)',
              color: 'var(--text-body)',
            }}
          >
            <input
              type="checkbox"
              name="consent"
              required
              checked={form.consent}
              onChange={(e) => {
                update('consent', e.target.checked);
                setConsentAt(e.target.checked ? new Date().toISOString() : '');
              }}
              aria-invalid={errors.consent ? 'true' : undefined}
              style={{
                width: 20,
                height: 20,
                margin: '1px 0 0',
                flex: 'none',
                accentColor: 'var(--accent-primary)',
                cursor: 'pointer',
              }}
            />
            <span>{CONSENT_TEXT}</span>
          </label>
          {errors.consent && (
            <span style={{ font: 'var(--type-caption)', color: 'var(--dc-danger)', paddingLeft: 30 }}>
              {errors.consent}
            </span>
          )}
        </div>

        {/* Contacto en el formato que GHL reconoce, derivado de los campos visibles. */}
        <input type="hidden" name="first_name" value={first_name} />
        <input type="hidden" name="last_name" value={last_name} />
        <input type="hidden" name="phone" value={phoneE164} />
        <input type="hidden" name="honorific" value={honorific} />
        <input type="hidden" name="phone_country" value={c.iso} />
        <input type="hidden" name="phone_dial" value={`+${c.dial}`} />
        <input type="hidden" name="consent_at" value={consentAt} />
        {/* Diagnóstico y atribución: el único canal para el dato rico. */}
        {Object.entries(hiddenFields).map(([k, v]) => (
          <input key={k} type="hidden" name={k} value={v} />
        ))}

        <Button
          type="button"
          size="lg"
          fullWidth
          disabled={submitting}
          onClick={fireSubmit}
          iconAfter={<ArrowRight size={18} />}
          style={{ marginTop: 4 }}
        >
          {submitting ? 'Preparando tu diagnóstico…' : 'Ver mi diagnóstico'}
        </Button>
      </form>

      <Button
        variant="ghost"
        size="sm"
        onClick={onBack}
        icon={<ArrowLeft size={16} />}
        style={{ color: 'var(--text-muted)', alignSelf: 'flex-start' }}
      >
        Revisar mi última respuesta
      </Button>
    </div>
  );
}
