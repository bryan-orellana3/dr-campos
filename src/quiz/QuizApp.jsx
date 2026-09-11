import React from 'react';
import Intro from './screens/Intro.jsx';
import Question from './screens/Question.jsx';
import Dato from './screens/Dato.jsx';
import Capture from './screens/Capture.jsx';
import Result from './screens/Result.jsx';
import { BrandLock, useIsMobile } from '../shared/ui.jsx';
import { QUESTIONS, STEPS, buildQuizFields, computeScore, resultForScore } from './data/quiz.js';
import { getAttribution } from '../shared/tracking.js';

const STORAGE_KEY = 'dc-quiz-riesgo-digital-v2';

/* ── persistencia ligera: un refresh no debe borrar el avance ───────── */

function loadState() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const saved = JSON.parse(raw);
    if (!saved || typeof saved !== 'object') return null;
    // Un STEPS más corto (menos datos) dejaría el índice fuera de rango.
    if (typeof saved.stepIndex === 'number') {
      saved.stepIndex = Math.min(Math.max(saved.stepIndex, 0), STEPS.length - 1);
    }
    return saved;
  } catch {
    return null;
  }
}

function saveState(state) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    /* modo privado o cuota llena — el quiz sigue funcionando en memoria */
  }
}

/* ── barra de progreso: la línea de pulso como avance ──────────────── */

function ProgressBar({ value, onDark }) {
  return (
    <div
      role="progressbar"
      aria-valuenow={Math.round(value * 100)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Avance del diagnóstico"
      style={{
        height: 3,
        width: '100%',
        background: onDark ? 'rgba(143,203,239,0.18)' : 'var(--dc-neutral-200)',
      }}
    >
      <div
        style={{
          height: '100%',
          width: `${Math.max(value, 0.02) * 100}%`,
          background: onDark
            ? 'linear-gradient(90deg, #4FA8E0 0%, #3ECDE8 100%)'
            : 'var(--gradient-wordmark)',
          transition: 'width var(--duration-slow) var(--ease-out)',
        }}
      />
    </div>
  );
}

/** La cabecera sigue el tono de la pantalla para que los datos se lean de una pieza. */
function Header({ progress, onDark }) {
  const isMobile = useIsMobile();
  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        background: onDark ? 'rgba(4,26,48,0.82)' : 'rgba(246,248,251,0.94)',
        backdropFilter: 'blur(8px)',
        borderBottom: `1px solid ${onDark ? 'var(--border-on-dark)' : 'var(--border-subtle)'}`,
        transition: 'background var(--duration-base) var(--ease-out)',
      }}
    >
      <div
        style={{
          maxWidth: 900,
          margin: '0 auto',
          padding: isMobile ? '0 20px' : '0 32px',
          height: isMobile ? 64 : 78,
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <BrandLock onDark={onDark} size={isMobile ? 40 : 50} />
      </div>
      <ProgressBar value={progress} onDark={onDark} />
    </header>
  );
}

/* ── app ───────────────────────────────────────────────────────────── */

export default function App() {
  const saved = React.useMemo(loadState, []);

  const [stage, setStage] = React.useState(saved?.stage ?? 'intro');
  const [stepIndex, setStepIndex] = React.useState(saved?.stepIndex ?? 0);
  const [answers, setAnswers] = React.useState(saved?.answers ?? {});
  const [otherText, setOtherText] = React.useState(saved?.otherText ?? '');
  const [lead, setLead] = React.useState(saved?.lead ?? null);
  const [submitting, setSubmitting] = React.useState(false);

  React.useEffect(() => {
    saveState({ stage, stepIndex, answers, otherText, lead });
  }, [stage, stepIndex, answers, otherText, lead]);

  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [stage, stepIndex]);

  const score = computeScore(answers);
  const result = resultForScore(score);

  // Referencia viva del paso: el avance automático dispara desde un setTimeout,
  // y una clausura obsoleta saltaría a la pantalla equivocada.
  const stepRef = React.useRef(stepIndex);
  stepRef.current = stepIndex;

  const start = () => {
    setStepIndex(0);
    setStage('quiz');
  };

  const next = React.useCallback(() => {
    const i = stepRef.current;
    if (i >= STEPS.length - 1) setStage('capture');
    else setStepIndex(i + 1);
  }, []);

  const back = React.useCallback(() => {
    if (stage === 'capture') {
      setStage('quiz');
      setStepIndex(STEPS.length - 1);
      return;
    }
    const i = stepRef.current;
    if (i === 0) return;
    // Desde un dato se vuelve a su pregunta; desde una pregunta se salta el dato
    // intermedio, porque volver atrás es para cambiar la respuesta, no para releer.
    if (STEPS[i].kind === 'dato') {
      setStepIndex(i - 1);
      return;
    }
    let j = i - 1;
    while (j > 0 && STEPS[j].kind === 'dato') j -= 1;
    setStepIndex(j);
  }, [stage]);

  // Campos extra del formulario (dato rico + atribución): el External Tracking se los lleva en el submit.
  const quizFields = React.useMemo(
    () => buildQuizFields({ answers, otherText, score, result, attribution: getAttribution() ?? {} }),
    [answers, otherText, score, result]
  );

  // El envío a GHL lo hace el script de External Tracking al capturar el submit del form;
  // aquí solo queda guardar el lead y pasar al diagnóstico.
  const submitLead = (data) => {
    setSubmitting(true);
    setLead(data);
    setSubmitting(false);
    setStage('result');
  };

  const restart = () => {
    setAnswers({});
    setOtherText('');
    setStepIndex(0);
    setLead(null);
    setStage('intro');
  };

  if (stage === 'intro') return <Intro onStart={start} />;

  if (stage === 'result') {
    return (
      <Result
        score={score}
        result={result}
        answers={answers}
        otherText={otherText}
        leadName={lead?.name}
        onRestart={restart}
      />
    );
  }

  const isCapture = stage === 'capture';
  const step = STEPS[stepIndex];
  const onDark = !isCapture && step.kind === 'dato';
  const progress = isCapture ? 1 : (stepIndex + 1) / (STEPS.length + 1);

  return (
    <>
      <Header progress={progress} onDark={onDark} />
      <main>
        {isCapture ? (
          <Capture onSubmit={submitLead} submitting={submitting} onBack={back} hiddenFields={quizFields} />
        ) : step.kind === 'dato' ? (
          <Dato
            key={step.question.id}
            stat={step.stat}
            datoNo={step.datoNo}
            datoTotal={step.datoTotal}
            onNext={next}
            onBack={back}
          />
        ) : (
          <Question
            question={step.question}
            index={QUESTIONS.indexOf(step.question)}
            total={QUESTIONS.length}
            answer={answers[step.question.id]}
            otherText={otherText}
            onAnswer={(value) => setAnswers((a) => ({ ...a, [step.question.id]: value }))}
            onOtherText={setOtherText}
            onNext={next}
            onBack={back}
            canGoBack={stepIndex > 0}
          />
        )}
      </main>
    </>
  );
}
