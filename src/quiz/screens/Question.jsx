import React from 'react';
import { ArrowLeft, ArrowRight, Button, Check, Input, useIsMobile } from '../../shared/ui.jsx';

/* ── opción de respuesta ───────────────────────────────────────────── */

function OptionRow({ option, selected, multi, onSelect }) {
  const isMobile = useIsMobile();

  return (
    <button
      type="button"
      role={multi ? 'checkbox' : 'radio'}
      aria-checked={selected}
      aria-label={option.label}
      onClick={onSelect}
      className={`dc-option${selected ? ' is-selected' : ''}`}
      style={{ padding: isMobile ? '16px' : '18px 20px' }}
    >
      <span
        aria-hidden="true"
        style={{
          width: 22,
          height: 22,
          flex: 'none',
          marginTop: 1,
          boxSizing: 'border-box',
          borderRadius: multi ? 'var(--radius-sm)' : '50%',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#fff',
          background: selected && multi ? 'var(--accent-primary)' : 'var(--dc-white)',
          border:
            selected && !multi
              ? '7px solid var(--accent-primary)'
              : `1.5px solid ${selected ? 'var(--accent-primary)' : 'var(--border-strong)'}`,
          transition: 'border var(--duration-fast) var(--ease-out), background var(--duration-fast) var(--ease-out)',
        }}
      >
        {multi && selected && <Check size={13} />}
      </span>
      <span className="dc-option__label">{option.label}</span>
    </button>
  );
}

/* ── pantalla ──────────────────────────────────────────────────────── */

export default function Question({
  question,
  index,
  total,
  answer,
  otherText,
  onAnswer,
  onOtherText,
  onNext,
  onBack,
  canGoBack,
}) {
  const isMobile = useIsMobile();
  const multi = question.kind === 'multi';
  const selection = multi ? (answer ?? []) : answer;
  const answered = multi ? selection.length > 0 : Boolean(selection);

  const otherSelected = multi && selection.includes('otra');

  const isSelected = (opt) => (multi ? selection.includes(opt.value) : selection === opt.value);

  // Toda pregunta simple auto-avanza: las pausas del quiz ahora son las pantallas de dato.
  // La última nunca auto-avanza — el paso al diagnóstico es una decisión consciente.
  const autoAdvance = !multi && index < total - 1;
  const timer = React.useRef(null);
  React.useEffect(() => () => window.clearTimeout(timer.current), [question.id]);

  const handleSelect = (opt) => {
    if (!multi) {
      onAnswer(opt.value);
      if (autoAdvance) {
        window.clearTimeout(timer.current);
        timer.current = window.setTimeout(onNext, 420);
      }
      return;
    }
    const exclusive = question.options.find((o) => o.exclusive)?.value;
    let next;
    if (opt.exclusive) {
      next = selection.includes(opt.value) ? [] : [opt.value];
    } else {
      next = selection.includes(opt.value)
        ? selection.filter((v) => v !== opt.value)
        : [...selection.filter((v) => v !== exclusive), opt.value];
    }
    onAnswer(next);
  };

  return (
    <div
      key={question.id}
      className="dc-fade"
      style={{
        width: '100%',
        maxWidth: 720,
        margin: '0 auto',
        padding: isMobile ? '28px 20px 40px' : '48px 32px 64px',
        display: 'flex',
        flexDirection: 'column',
        gap: isMobile ? 22 : 28,
      }}
    >
      <header style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <span
          style={{
            font: 'var(--type-label)',
            letterSpacing: 'var(--tracking-label)',
            textTransform: 'uppercase',
            color: 'var(--dc-royal-600)',
          }}
        >
          {question.eyebrow} de {total}
        </span>
        <h2
          style={{
            font: isMobile ? '700 24px/1.2 var(--font-display)' : 'var(--type-h2)',
            letterSpacing: 'var(--tracking-display)',
            color: 'var(--text-display)',
            margin: 0,
          }}
        >
          {question.title}
        </h2>
        <p
          style={{
            font: isMobile ? 'var(--type-body)' : 'var(--type-body-lg)',
            color: 'var(--text-body)',
            margin: 0,
          }}
        >
          {question.prompt}
        </p>
        {question.help && (
          <p style={{ font: 'var(--type-caption)', color: 'var(--text-muted)', margin: 0 }}>
            {question.help}
          </p>
        )}
      </header>

      <div
        role={multi ? 'group' : 'radiogroup'}
        aria-label={question.prompt}
        style={{ display: 'flex', flexDirection: 'column', gap: 10 }}
      >
        {question.options.map((opt) => (
          <React.Fragment key={opt.value}>
            <OptionRow
              option={opt}
              multi={multi}
              selected={isSelected(opt)}
              onSelect={() => handleSelect(opt)}
            />
            {opt.isOther && otherSelected && (
              <Input
                value={otherText}
                onChange={(e) => onOtherText(e.target.value)}
                placeholder="¿Cuál?"
                aria-label="¿En qué otra plataforma publicas?"
                style={{ paddingLeft: 36 }}
              />
            )}
          </React.Fragment>
        ))}
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 12,
          marginTop: 4,
        }}
      >
        <Button
          variant="ghost"
          size={isMobile ? 'sm' : 'md'}
          onClick={onBack}
          disabled={!canGoBack}
          icon={<ArrowLeft size={16} />}
          style={{ color: 'var(--text-muted)', visibility: canGoBack ? 'visible' : 'hidden' }}
        >
          Atrás
        </Button>

        <Button
          size={isMobile ? 'md' : 'lg'}
          onClick={onNext}
          disabled={!answered}
          iconAfter={<ArrowRight size={18} />}
        >
          {index === total - 1 ? 'Ver mi diagnóstico' : 'Continuar'}
        </Button>
      </div>
    </div>
  );
}
