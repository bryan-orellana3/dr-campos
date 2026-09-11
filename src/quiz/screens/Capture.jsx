import React from 'react';
import { Button, Input, PulseDivider, ArrowLeft, ArrowRight, Lock, useIsMobile } from '../../shared/ui.jsx';
import PhoneField from '../../shared/PhoneField.jsx';
import { countryByIso, guessCountry } from '../data/countries.js';
import { CONSENT_TEXT } from '../data/quiz.js';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;

/* Oculto para la vista, presente para el script: el patrón clásico "visually hidden". */
const SR_ONLY = {
  position: 'absolute',
  width: 1,
  height: 1,
  padding: 0,
  margin: -1,
  overflow: 'hidden',
  clip: 'rect(0, 0, 0, 0)',
  whiteSpace: 'nowrap',
  border: 0,
};

export function validate({ firstName, lastName, email, country, phone }) {
  const errors = {};
  if (firstName.trim().length < 2) errors.firstName = 'Escribe tu nombre.';
  if (lastName.trim().length < 2) errors.lastName = 'Escribe tu apellido.';
  if (!EMAIL_RE.test(email.trim())) errors.email = 'Revisa tu correo — no parece válido.';

  const digits = phone.replace(/\D/g, '');
  const c = countryByIso(country);
  if (digits.length === 0) errors.phone = 'Escribe tu WhatsApp.';
  else if (digits.length < Math.min(...c.len) || digits.length > Math.max(...c.len) + 1) {
    errors.phone = `Un número de ${c.name} tiene ${c.len.join(' o ')} dígitos.`;
  }
  return errors;
}

/**
 * Captura del lead. Es un <form> real porque el External Tracking de GHL lo detecta en el
 * DOM y, al dispararse el evento submit, se lleva todos sus campos y crea el contacto.
 *
 * Tres reglas que no se pueden romper (skill ghl-external-tracking, verificado interceptando
 * la petición del script):
 * - Los campos que GHL reconoce se llaman first_name, last_name, email y phone, y tienen que
 *   ser inputs visibles: el script descarta los type="hidden". El phone lleva el E.164.
 * - El dato rico viaja en inputs de texto readOnly ocultos con CSS, por lo mismo. Sin checkbox
 *   de consentimiento (decisión del usuario): el aviso va bajo el botón y a GHL viajan el texto
 *   mostrado y la hora del envío.
 * - El botón es type="button". GHL engancha el clic de cualquier button[type=submit] y envía
 *   el formulario 50 ms después aunque esté vacío. Aquí el submit solo existe si la
 *   validación pasa: sin evento, GHL no ve nada.
 */
export default function Capture({ onSubmit, submitting, onBack, hiddenFields = {} }) {
  const isMobile = useIsMobile();
  const formRef = React.useRef(null);
  const [form, setForm] = React.useState(() => ({
    firstName: '',
    lastName: '',
    email: '',
    country: guessCountry(),
    phone: '',
  }));
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
  const extras = Object.entries({ ...hiddenFields, phone_country: c.iso, consent_text: CONSENT_TEXT, consent_at: '' }).filter(
    ([k, v]) => k === 'consent_at' || (v !== '' && v != null)
  );

  // Solo hay evento submit si la validación pasa: es lo que evita contactos vacíos en GHL.
  const fireSubmit = () => {
    if (submitting) return;
    const found = validate(form);
    setErrors(found);
    setTouched(true);
    if (Object.keys(found).length > 0) return;
    const f = formRef.current;
    // La hora de aceptación se escribe en el DOM justo antes del submit: el script de GHL lee
    // los campos en ese instante, antes de cualquier re-render.
    const stamp = f.querySelector('input[name="consent_at"]');
    if (stamp) stamp.value = new Date().toISOString();
    if (typeof f.requestSubmit === 'function') f.requestSubmit();
    else f.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
  };

  // Este es el evento que GHL captura (fase capture sobre el form) con los campos ya llenos.
  const handleSubmit = (e) => {
    e.preventDefault();
    if (Object.keys(validate(form)).length > 0) return;
    onSubmit({
      name: `${form.firstName.trim()} ${form.lastName.trim()}`.trim(),
      firstName: form.firstName.trim(),
      lastName: form.lastName.trim(),
      email: form.email.trim().toLowerCase(),
      country: c.iso,
      countryName: c.name,
      dial: c.dial,
      phone: digits,
      phoneE164,
      consentAt: new Date().toISOString(),
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
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 12 }}>
          <Input
            label="Nombre"
            name="first_name"
            value={form.firstName}
            onChange={(e) => update('firstName', e.target.value)}
            error={errors.firstName}
            autoComplete="given-name"
            enterKeyHint="next"
          />
          <Input
            label="Apellido"
            name="last_name"
            value={form.lastName}
            onChange={(e) => update('lastName', e.target.value)}
            error={errors.lastName}
            autoComplete="family-name"
            enterKeyHint="next"
          />
        </div>

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
          name="phone"
          country={form.country}
          phone={form.phone}
          onCountryChange={(iso) => update('country', iso)}
          onPhoneChange={(v) => update('phone', v)}
          error={errors.phone}
        />

        {/* Dato rico y atribución: inputs reales (no hidden) fuera de la vista.
            El script de GHL descarta type="hidden"; estos sí los serializa. */}
        <div aria-hidden="true" style={SR_ONLY}>
          {extras.map(([k, v]) => (
            <input key={k} type="text" name={k} value={v} readOnly tabIndex={-1} />
          ))}
        </div>

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

        <p style={{ display: 'flex', alignItems: 'flex-start', gap: 8, font: 'var(--type-caption)', color: 'var(--text-muted)', margin: 0 }}>
          <Lock size={14} style={{ marginTop: 1, flex: 'none' }} />
          {CONSENT_TEXT}
        </p>
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
