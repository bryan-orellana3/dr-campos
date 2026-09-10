// Contenido del quiz — transcrito del documento fuente.
// Casing en oración y sin emoji, según las reglas del sistema de diseño.

/**
 * URL de la landing de venta. Todos los CTA del quiz apuntan aquí.
 * Cámbiala en este único lugar cuando la landing esté publicada,
 * o define VITE_CTA_URL en las variables de entorno de Vercel.
 */
export const CTA_URL = import.meta.env.VITE_CTA_URL || '#';

/**
 * Endpoint opcional para recibir los leads (webhook de GoHighLevel, Zapier, Make…).
 * Si no está definido, el lead se guarda solo en localStorage y el quiz continúa igual.
 */
export const LEAD_WEBHOOK = import.meta.env.VITE_LEAD_WEBHOOK || '';

export const QUESTIONS = [
  {
    id: 'q1',
    kind: 'single',
    eyebrow: 'Pregunta 1',
    title: 'Tu visibilidad digital',
    prompt:
      '¿Cuántos pacientes nuevos llegan a tu consultorio porque te encontraron en redes sociales?',
    options: [
      {
        value: 'a',
        points: 1,
        label: 'Ninguno o casi ninguno — mis pacientes llegan por recomendación boca a boca.',
      },
      { value: 'b', points: 2, label: 'Algunos, pero no tengo idea de cuántos exactamente.' },
      { value: 'c', points: 3, label: 'Sí me llegan — cada vez más me dicen "lo vi en redes".' },
    ],
    stat: {
      kicker: 'Cómo te buscan',
      figure: '71%',
      text: 'de los pacientes usa los perfiles online como primer paso para encontrar un nuevo médico.',
      source: 'Software Advice',
      image: '/dato-1.jpg',
      alt: 'Una paciente consulta a una médica por videollamada desde su teléfono.',
    },
  },
  {
    id: 'q2',
    kind: 'multi',
    scored: false,
    eyebrow: 'Pregunta 2',
    title: 'Tu presencia en plataformas',
    prompt: 'Marca las plataformas en las que publicas contenido actualmente.',
    help: 'Puedes marcar varias. Esta pregunta no suma puntos — afina tu diagnóstico.',
    options: [
      { value: 'facebook', label: 'Facebook' },
      { value: 'instagram', label: 'Instagram' },
      { value: 'tiktok', label: 'TikTok' },
      { value: 'youtube', label: 'YouTube' },
      { value: 'linkedin', label: 'LinkedIn' },
      { value: 'otra', label: 'Otra', isOther: true },
      { value: 'ninguna', label: 'Ninguna — no publico contenido en ninguna plataforma', exclusive: true },
    ],
  },
  {
    id: 'q3',
    kind: 'single',
    eyebrow: 'Pregunta 3',
    title: 'El bloqueo creativo',
    prompt: '¿Qué sucede cuando piensas en grabar un video o crear contenido?',
    options: [
      { value: 'a', points: 1, label: 'Siento que no es para mí — "eso no es de médicos serios".' },
      { value: 'b', points: 2, label: 'Quiero hacerlo pero no sé qué decir ni cómo empezar.' },
      { value: 'c', points: 3, label: 'Ya le agarré el ritmo — me organizo y publico con frecuencia.' },
    ],
    stat: {
      kicker: 'La duda es común',
      figure: '+90%',
      text: 'de los médicos ya usa redes sociales en lo personal, pero se siente inseguro de usarlas profesionalmente.',
      source: 'Journal of Medical Internet Research',
      image: '/dato-2.jpg',
      alt: 'Un médico con bata blanca, agotado, frente a la computadora de su consultorio.',
    },
  },
  {
    id: 'q4',
    kind: 'single',
    eyebrow: 'Pregunta 4',
    title: 'Los primeros 3 segundos',
    prompt: '¿Cómo empiezan tus videos o publicaciones?',
    options: [
      { value: 'a', points: 1, label: '"Hola, soy el Dr. X y hoy les voy a hablar de…"' },
      { value: 'b', points: 2, label: 'Intento variar, pero no tengo una fórmula clara.' },
      {
        value: 'c',
        points: 3,
        label: 'Arranco con algo que enganche — una pregunta, un dato, algo que atrape.',
      },
    ],
  },
  {
    id: 'q5',
    kind: 'single',
    eyebrow: 'Pregunta 5',
    title: 'Tu sistema de producción',
    prompt: '¿Cuántos videos o piezas de contenido produces al mes?',
    options: [
      { value: 'a', points: 1, label: 'Cero. No tengo tiempo o no sé cómo organizarme.' },
      { value: 'b', points: 2, label: 'Entre 1 y 4, pero sin un método claro.' },
      { value: 'c', points: 3, label: 'Publico seguido — ya encontré mi forma de organizarme.' },
    ],
  },
  {
    id: 'q6',
    kind: 'single',
    eyebrow: 'Pregunta 6',
    title: 'Monetización de tu audiencia',
    prompt: '¿Generas ingresos directos o indirectos a través de tus redes sociales?',
    options: [
      { value: 'a', points: 1, label: 'No — ni siquiera sabía que eso era posible siendo médico.' },
      {
        value: 'b',
        points: 2,
        label: 'Creo que podría, pero no sé cómo convertir seguidores en pacientes o ingresos.',
      },
      { value: 'c', points: 3, label: 'Sí — ya me generan consultas y alguna colaboración.' },
    ],
  },
  {
    id: 'q7',
    kind: 'single',
    eyebrow: 'Pregunta 7',
    title: 'Por qué algunos videos se ven más que otros',
    prompt:
      'Cuando publicas algo en redes, ¿sabes qué hace que unas publicaciones lleguen a más personas y otras pasen desapercibidas?',
    options: [
      { value: 'a', points: 1, label: 'No tengo idea — solo publico y espero que alguien lo vea.' },
      {
        value: 'b',
        points: 2,
        label: 'He escuchado algo al respecto, pero no sé cómo aplicarlo a lo que publico.',
      },
      { value: 'c', points: 3, label: 'Más o menos lo tengo claro — fui aprendiendo qué funciona.' },
    ],
    stat: {
      kicker: 'Dónde está su atención',
      figure: '2 h 27 min',
      text: 'es lo que tus pacientes pasan al día en redes sociales. ¿Cuántos de esos minutos te están dedicando a ti?',
      source: 'Statista, 2023',
      image: '/dato-3.jpg',
      alt: 'Una mujer mira su teléfono en la cama a las 3:17 de la madrugada.',
    },
  },
  {
    id: 'q8',
    kind: 'single',
    eyebrow: 'Pregunta 8',
    title: 'Lo que te frena',
    prompt:
      'Hoy en día, cada vez más pacientes buscan a su médico en redes sociales antes de agendar una cita. Frente a esta realidad, ¿cuál es tu posición?',
    options: [
      {
        value: 'a',
        points: 1,
        label:
          '"Yo estudié medicina para atender pacientes, no para grabar videos. Eso no va conmigo."',
      },
      {
        value: 'b',
        points: 2,
        label:
          '"Sé que el mundo está cambiando, pero me preocupa exponerme o que mis colegas y pacientes me juzguen."',
      },
      { value: 'c', points: 3, label: '"Ya lo entendí — estar visible hoy es parte del trabajo."' },
    ],
    stat: {
      kicker: 'Si no te encuentran a ti',
      figure: '72%',
      text: 'de los usuarios de internet busca información de salud online, y el 35% intenta auto-diagnosticarse en Google. Si no te encuentran a ti, encuentran a otro — o peor, se diagnostican solos.',
      source: 'Pew Research Center',
      image: '/dato-4.jpg',
      alt: 'Una mujer enferma en cama, vista a través de la pantalla de un teléfono rodeado de virus y pastillas.',
    },
  },
  {
    id: 'q9',
    kind: 'single',
    eyebrow: 'Pregunta 9',
    title: 'Tu esencia',
    prompt:
      '¿Tienes claro qué es eso que te hace único como médico — tu diferencial, esa esencia especial que solo tú le pones a tu práctica?',
    options: [
      {
        value: 'a',
        points: 1,
        label:
          'No — siento que soy un médico más y no sabría qué decir si me preguntan qué me hace diferente.',
      },
      {
        value: 'b',
        points: 2,
        label: 'Creo que lo tengo, pero nunca lo he puesto en palabras ni lo he comunicado a nadie.',
      },
      { value: 'c', points: 3, label: 'Sí — lo tengo claro y trato de que se note en todo lo que hago.' },
    ],
  },
  {
    id: 'q10',
    kind: 'single',
    eyebrow: 'Pregunta 10',
    title: 'Si existiera el camino',
    prompt:
      'Si un médico que ya logró llenar su consulta, ser referente y vivir de lo que ama te mostrara paso a paso cómo lo hizo, ¿qué tan dispuesto estarías a seguir ese camino?',
    options: [
      {
        value: 'a',
        points: 1,
        label: 'No creo que sea para mí — mi realidad es diferente y no tengo tiempo para eso.',
      },
      {
        value: 'b',
        points: 2,
        label:
          'Lo consideraría seriamente, sobre todo si es algo práctico y hecho por alguien que ya pasó por lo mismo.',
      },
      { value: 'c', points: 3, label: 'Totalmente — ya estoy en movimiento y quiero acelerar.' },
    ],
  },
];

export const SCORE_MIN = 9;
export const SCORE_MAX = 27;

export const RESULTS = [
  {
    id: 'ordinario',
    min: 9,
    max: 14,
    tone: 'danger',
    stage: 'El mundo ordinario',
    title: 'La consulta silenciosa',
    lede: 'Conozco tu caso porque fue el mío.',
    body: [
      'Eres un médico competente — probablemente excelente. Mientras tanto, pacientes que te necesitan están encontrando a otros médicos. No porque sean mejores. Porque **ellos sí aparecen**.',
      'No es tu culpa — nadie te enseñó esto en la facultad. Pero ahora lo sabes. Y la pregunta que me hice a mí mismo es la misma que te hago a ti: **¿vas a seguir siendo el mejor médico que nadie encuentra?**',
    ],
    contrast: {
      lieLabel: 'La mentira que te tiene atrapado',
      lie: '"Si soy bueno en lo que hago, los pacientes correctos me encontrarán solos."',
      truthLabel: 'La verdad que necesitas escuchar',
      truth:
        'Cada paciente que no te encuentra a tiempo, espera más, sufre más, o llega tarde al diagnóstico. Compartir tu conocimiento no es arrogancia. Es la extensión natural de tu consulta.',
    },
    treatment:
      'Yo diseñé un método para médicos exactamente como tú — brillantes en lo clínico, invisibles en redes sociales. El mismo camino que me llevó de la inseguridad de aparecer en redes a 3.9 millones de seguidores. Paso a paso.',
    cta: 'Quiero ver el método',
  },
  {
    id: 'debate',
    min: 15,
    max: 21,
    tone: 'warning',
    stage: 'El debate',
    title: 'Entre la resistencia y la acción',
    lede: 'Estás exactamente donde yo estuve: entre el "sé que debería" y el "pero no sé cómo".',
    body: [
      'Publicas algo de vez en cuando, quizás un video que te costó 3 horas producir y que vieron 47 personas. Te frustra.',
      'No te falta talento ni conocimiento clínico. **Te falta un método.** Una ruta que te saque de la improvisación y te lleve a producir contenido con tu esencia — como le hablas a tus pacientes, sin filtros, sin personaje.',
    ],
    contrast: {
      lieLabel: 'Lo que te dices a ti mismo',
      lie: '"Las redes no son lo mío, no me comunico bien, no me gusta salir en video, tengo miedo a que me critiquen colegas."',
      truthLabel: 'Lo que aprendí diciéndolo yo también',
      truth:
        'La resistencia es proporcional al tamaño del problema. Es la misma negación que ves en tus pacientes cuando les dices que necesitan cambiar hábitos.',
    },
    treatment:
      'Yo pasé por esta fase exacta. La resolví creando una estrategia que cualquier médico con guardias, consultas y vida real puede seguir. Sin necesidad de ser extrovertido. Solo siendo tú, con método.',
    cta: 'Quiero conocer el método',
  },
  {
    id: 'climax',
    min: 22,
    max: 27,
    tone: 'success',
    stage: 'El clímax',
    title: 'Camino al alta médica',
    lede: 'Ya estás en movimiento y eso vale mucho. Pero seamos honestos: todavía sientes que estás improvisando en algunas cosas.',
    body: [
      'Publicas, te organizas, te llegan pacientes por redes y tienes más o menos claro qué te hace diferente. Yo pasé por eso. Tenía tracción, pero no tenía un método. Publicaba, pero sin estrategia real. Llegaban pacientes, pero no sabía cómo escalar eso sin quemarme.',
      'El salto no es de "no hacer nada" a "hacer todo" — es de **hacer las cosas bien a hacerlas con un método que multiplique lo que ya tienes**.',
    ],
    contrast: {
      lieLabel: 'Dónde estás hoy',
      lie: 'Con tracción real, pero sostenida por esfuerzo e intuición más que por un sistema.',
      truthLabel: 'Qué es el alta médica',
      truth:
        'Cuando los pacientes llegan diciendo "lo vi en sus videos, doctor", cuando te invitan a congresos, cuando las marcas te buscan a ti — y todo eso pasa sin que sacrifiques tu vida personal ni tu consulta. Estás cerca. Pero cerca no es suficiente.',
    },
    treatment:
      'Tú ya no necesitas que te convenzan — necesitas el método que te lleve al siguiente nivel. El mismo que me permitió pasar de "publicar cuando podía" a 3.9M de seguidores, consultas llenas y oportunidades que ni imaginaba. Sin fórmulas mágicas.',
    cta: 'Quiero escalar mi marca médica',
  },
];

export const CLOSING = {
  quote:
    'Sin importar tu puntaje, si llegaste hasta aquí ya diste el primer paso: reconocer que algo necesita cambiar. Yo estuve exactamente donde tú estás. La inseguridad y la duda. Y hoy tengo 3.9 millones de personas que confían en lo que digo — no porque sea mejor médico que tú, sino porque decidí dejar de esconderme.',
  claim: 'Compartir tu conocimiento no es vanidad — es responsabilidad.',
  line: 'El método existe. El camino está probado. La única pregunta es si vas a dar el paso.',
  cta: 'Conoce el Método Dr. David Campos',
  signature: '— Dr. David Campos',
};

export const DIAGNOSIS_INTRO =
  'Yo pasé por cada una de estas fases. La consulta silenciosa, el miedo a exponerme, la creencia de que ser buen médico bastaba. Lo que sigue no es teoría — es el caso clínico que yo mismo viví.';

/** Preguntas que suman puntos (todas menos la 2). */
export const SCORED_QUESTIONS = QUESTIONS.filter((q) => q.scored !== false);

export function computeScore(answers) {
  return SCORED_QUESTIONS.reduce((total, q) => {
    const opt = q.options.find((o) => o.value === answers[q.id]);
    return total + (opt?.points ?? 0);
  }, 0);
}

export function resultForScore(score) {
  return RESULTS.find((r) => score >= r.min && score <= r.max) ?? RESULTS[0];
}

/**
 * Secuencia plana del quiz: cada pregunta y, detrás de las que traen dato clínico,
 * la pantalla del dato. Es la única fuente de verdad para el avance y el progreso,
 * así que añadir o quitar un `stat` reordena el flujo solo.
 */
export const STEPS = (() => {
  const steps = [];
  let datoNo = 0;
  for (const question of QUESTIONS) {
    steps.push({ kind: 'question', question });
    if (question.stat) {
      datoNo += 1;
      steps.push({ kind: 'dato', question, stat: question.stat, datoNo });
    }
  }
  return steps.map((s) => (s.kind === 'dato' ? { ...s, datoTotal: datoNo } : s));
})();

/** Índice del paso de una pregunta dentro de STEPS. */
export function stepIndexOfQuestion(questionId) {
  return STEPS.findIndex((s) => s.kind === 'question' && s.question.id === questionId);
}
