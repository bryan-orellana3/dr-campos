import React from 'react';
import { Button, Input, PulseDivider, ArrowLeft, ArrowRight, Lock, useIsMobile } from '../../shared/ui.jsx';
import PhoneField from '../../shared/PhoneField.jsx';
import { countryByIso, guessCountry } from '../data/countries.js';
import { CONSENT_TEXT } from '../data/quiz.js';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;

export function validate({ name, email, country, phone }) {
  const errors = {};
  if (name.trim().length < 2) errors.name = 'Escribe tu nombre.';
  if (!EMAIL_RE.test(email.trim())) errors.email = 'Revisa tu correo — no parece válido.';

  const digits = phone.replace(/\D/g, '');
  const c = countryByIso(country);
  if (digits.length === 0) errors.phone = 'Escribe tu WhatsApp.';
  else if (digits.length < Math.min(...c.len) || digits.length > Math.max(...c.len) + 1) {
    errors.phone = `Un número de ${c.name} tiene ${c.len.join(' o ')} dígitos.`;
  }
  return errors;
}

export default function Capture({ onSubmit, submitting, submitError, onBack }) {
  const isMobile = useIsMobile();
  const [form, setForm] = React.useState(() => ({
    name: '',
    email: '',
    country: guessCountry(),
    phone: '',
  }));
  const [errors, setErrors] = React.useState({});
  const [touched, setTouched] = React.useState(false);

  const set = (key) => (e) => {
    const value = e.target.value;
    setForm((f) => {
      const next = { ...f, [key]: value };
      if (touched) setErrors(validate(next));
      return next;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const found = validate(form);
    setErrors(found);
    setTouched(true);
    if (Object.keys(found).length > 0) return;

    const c = countryByIso(form.country);
    onSubmit({
      name: form.name.trim(),
      email: form.email.trim().toLowerCase(),
      country: c.iso,
      countryName: c.name,
      dial: c.dial,
      phone: form.phone.replace(/\D/g, ''),
      phoneE164: `+${c.dial}${form.phone.replace(/\D/g, '')}`,
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

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }} noValidate>
        <Input
          label="Nombre"
          value={form.name}
          onChange={set('name')}
          error={errors.name}
          placeholder="Dr. / Dra. …"
          autoComplete="name"
          enterKeyHint="next"
        />

        <Input
          label="Correo electrónico"
          type="email"
          value={form.email}
          onChange={set('email')}
          error={errors.email}
          placeholder="tu@correo.com"
          autoComplete="email"
          inputMode="email"
          enterKeyHint="next"
        />

        <PhoneField
          country={form.country}
          phone={form.phone}
          onCountryChange={(iso) => set('country')({ target: { value: iso } })}
          onPhoneChange={(v) => set('phone')({ target: { value: v } })}
          error={errors.phone}
        />

        {submitError && (
          <p style={{ font: 'var(--type-body-sm)', color: 'var(--dc-danger)', margin: 0 }}>
            {submitError}
          </p>
        )}

        <Button type="submit" size="lg" fullWidth disabled={submitting} iconAfter={<ArrowRight size={18} />}>
          {submitting ? 'Preparando tu diagnóstico…' : 'Ver mi diagnóstico'}
        </Button>

        <p
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: 8,
            font: 'var(--type-caption)',
            color: 'var(--text-muted)',
            margin: 0,
          }}
        >
          <Lock size={14} style={{ marginTop: 1, flex: 'none' }} />
          Tus datos son sólo para enviarte el diagnóstico y el material del método. Nada de spam, y
          puedes darte de baja cuando quieras.
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
