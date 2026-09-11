/**
 * Configuración y copy de la landing del VSL — Método 4C.
 * Todo lo que cambia entre lanzamientos vive aquí. Las entradas marcadas como
 * pendientes se pueden fijar por variable de entorno (VITE_*) sin tocar código.
 */

/** URL directa del mp4 del VSL. Vacía → el reproductor muestra el hueco reservado. */
export const VSL_URL = import.meta.env.VITE_VSL_URL || '';
/** Imagen de portada del video (frame). Opcional. */
export const VSL_POSTER = import.meta.env.VITE_VSL_POSTER || '';
/** Segundo de reproducción en el que aparece el botón de compra. */
export const REVEAL_AT_SECONDS = Number(import.meta.env.VITE_REVEAL_AT_SECONDS || 60);
/** Checkout de GHL (payment link u order form) que se abre en el popup. Vacío → aviso. */
export const CHECKOUT_URL = import.meta.env.VITE_CHECKOUT_URL || '';

export const PRICE = { amount: 47, currency: 'USD', label: 'USD 47', note: 'Pago único · acceso inmediato · garantía de 7 días' };

export const GUARANTEE = {
  title: 'Garantía de 7 días',
  text: 'Si en la primera semana sientes que el método no es para ti, escribes y te devolvemos el dinero. Sin formularios ni explicaciones.',
};

export const HERO = {
  eyebrow: 'Método 4C · para médicos',
  title: 'El sistema documentado para ser el médico de referencia de tu ciudad',
  lede: 'Constancia, Cercanía, Contenido y Conversión: la rutina real con la que el Dr. David Campos llegó a 3.9M de seguidores sin agencias, sin equipo de producción y sin dejar la consulta. En 16 lecciones, para repetirla en 7 días.',
  cta: 'Quiero el Método 4C',
};

/** Línea personalizada según el diagnóstico del quiz (?dx=<result_id>). */
export const DX_LINE = {
  ordinario: 'Tu diagnóstico fue "La consulta silenciosa": el método empieza exactamente ahí.',
  debate: 'Tu diagnóstico fue "El debate": lo que te falta no es talento, es método.',
  climax: 'Tu diagnóstico fue "Camino al alta médica": esto es lo que multiplica lo que ya tienes.',
};

export const PROOF = {
  eyebrow: 'Evidencia, no promesas',
  title: 'Lo que documenta el método: pagos reales de monetización',
  lede: 'Cuatro liquidaciones de Meta por monetización de contenido en Facebook, tal como llegan a la cuenta del Dr. Campos. Él mismo lo dice en el curso: "unos 3.000 dólares en los meses bajos y hasta unos 6.000 en los mejores". Sin contar marcas, y sin dejar de atender pacientes.',
  items: [
    { src: '/proof-2024-12.jpg', amount: 'US$ 5.984,03', period: 'Diciembre 2024', alt: 'Liquidación de Meta: US$ 5.984,03 por contenido de diciembre de 2024, estado pagado.' },
    { src: '/proof-2025-01.jpg', amount: 'US$ 4.678,55', period: 'Enero 2025', alt: 'Liquidación de Meta: US$ 4.678,55 por contenido de enero de 2025, estado pagado.' },
    { src: '/proof-2026-02.jpg', amount: 'US$ 3.658,94', period: 'Febrero 2026', alt: 'Liquidación de Meta: US$ 3.658,94 por contenido de febrero de 2026, estado pagado.' },
    { src: '/proof-2026-03.jpg', amount: 'US$ 2.828,53', period: 'Marzo 2026', alt: 'Liquidación de Meta: US$ 2.828,53 por contenido de marzo de 2026, estado pagado.' },
  ],
  note: 'Capturas recortadas para no mostrar identificadores de transacción. Los ingresos por monetización dependen de la plataforma, el país y el alcance de cada cuenta: son el resultado documentado del Dr. Campos, no una garantía.',
  tv: [
    { src: '/tv-hola-pais.jpg', alt: 'El Dr. David Campos entrevistado en el set del programa de televisión Hola País.', caption: 'Programa "Hola País"' },
    { src: '/tv-dengue.jpg', alt: 'El Dr. David Campos en televisión explicando cómo prevenir el dengue, con su nombre en pantalla.', caption: 'Segmento de salud en TV' },
  ],
  tvLede: 'Las puertas que abre la visibilidad: hospitales, clínicas, marcas y programas de televisión que lo buscan a él.',
};

export const PILLARS = [
  { n: '1', t: 'Constancia', d: 'Sistema, no fuerza de voluntad. Resuelve al médico que empieza fuerte y abandona en la semana 3. Resultado: 30 videos al mes sin burnout.' },
  { n: '2', t: 'Cercanía', d: 'El balance entre autoridad médica y lenguaje coloquial. Resuelve al médico que suena a libro de texto. Resultado: una audiencia que confía y recomienda.' },
  { n: '3', t: 'Contenido', d: 'Nicho y formato que el algoritmo premia. Resuelve al médico invisible para el algoritmo. Resultado: alcance orgánico que crece mes a mes.' },
  { n: '4', t: 'Conversión', d: 'De seguidores a pacientes y a ingresos. Resuelve al médico con muchos likes y pocos pacientes. Resultado: seguidores que se vuelven consulta.' },
];

export const MODULES = [
  {
    n: '1', title: 'Fundamentos de la presencia digital médica', pillar: 'Cercanía',
    result: 'Claridad total sobre tu propuesta de valor como médico.',
    lessons: ['¿Por qué un médico necesita estar en redes sociales?', 'Venderte como producto: eres una marca personal', 'Casos de éxito: el camino del Dr. Campos', 'Expectativas realistas: el tiempo para ver resultados'],
  },
  {
    n: '2', title: 'Estrategia y planificación de contenido', pillar: 'Constancia',
    result: 'Nicho definido, banco de ideas y calendario de 7 días listo.',
    lessons: ['Identifica tu nicho y especialidad como diferenciador', 'Superar el bloqueo creativo: cómo generar ideas infinitas', 'Cómo usar el Calendario de Contenidos de 7 días', 'Tipos de contenido que generan visibilidad'],
  },
  {
    n: '3', title: 'Producción y creación de contenido', pillar: 'Contenido',
    result: 'Set de grabación listo, producción en lote y lectura de tus métricas.',
    lessons: ['Herramientas y material básico para crear contenido', 'Metodología de los 30 videos: rutina de producción', 'Creación de contenido efectivo: el balance perfecto', 'Conoce a tu público y optimiza tu alcance'],
  },
  {
    n: '4', title: 'Monetización y crecimiento', pillar: 'Conversión',
    result: 'Plan de monetización con metas claras y camino a tus primeros ingresos.',
    lessons: ['Convertir seguidores en pacientes', 'Monetización en YouTube', 'Monetización en Facebook y TikTok', 'Colaboraciones con marcas y oportunidades adicionales'],
  },
];

export const RESOURCES = [
  'Plantilla de Calendario de Contenidos en Google Sheets',
  'Templates de temas por especialidad médica',
  'Checklist de grabación semanal',
  'Guía de CTAs por plataforma',
];

export const MENTOR = {
  eyebrow: 'El mentor',
  title: 'Médico primero. Creador después.',
  body: 'El Dr. David Campos es médico general boliviano radicado en São Paulo y uno de los médicos con mayor audiencia en habla hispana: cerca de 3.9 millones de seguidores combinados en TikTok, Facebook, Instagram y YouTube. Empezó grabando con su celular y una sola luz, sin agencia ni equipo, y tardó dos años en cobrar sus primeros 100 dólares. Hoy sus redes le generan un ingreso mensual estable, le abrieron puertas a hospitales, clínicas, marcas y televisión, y le traen pacientes de varios países. Sigue ejerciendo: graba 30 videos por semana en sus fines de semana y publica todos los días.',
  quote: 'Esto no es magia. Es organización y constancia.',
  stats: [
    { value: '3.9M', label: 'Seguidores combinados', detail: 'Sin agencias ni pauta' },
    { value: '30', label: 'Videos por semana', detail: 'Grabados en fin de semana' },
    { value: '16', label: 'Lecciones en video', detail: '10 a 15 minutos cada una' },
    { value: '4C', label: 'Pilares del método', detail: 'Constancia · Cercanía · Contenido · Conversión' },
  ],
};

export const OFFER = {
  eyebrow: 'Acceso al método',
  title: 'Método 4C — Presencia digital para médicos',
  includes: [
    '16 lecciones en video de 10 a 15 minutos, estilo pregunta-respuesta',
    '4 módulos: fundamentos, estrategia, producción y monetización',
    'Plantilla de Calendario de Contenidos de 7 días (Google Sheets)',
    'Templates de temas por especialidad médica',
    'Checklist de grabación semanal',
    'Guía de CTAs por plataforma',
  ],
  cta: 'Quiero el Método 4C',
  finePrint: 'Pago único. Acceso inmediato tras la compra. Garantía de devolución de 7 días.',
};

export const FAQ = [
  { q: '¿Necesito equipo o saber editar?', a: 'No. El Dr. Campos empezó con su celular y una luz, sin saber editar. El módulo 3 muestra el material básico y una rutina de producción en lote que cabe en un fin de semana.' },
  { q: '¿Cuánto tiempo me va a tomar?', a: 'La rutina del método son 30 videos por semana grabados en fin de semana, pero puedes empezar con menos. Lo que importa es que sea constante: el sistema está diseñado para caber en una agenda clínica.' },
  { q: '¿Cuándo veo resultados?', a: 'El curso es honesto con esto: los primeros 3 meses son para aprender a grabar con constancia; entre los 3 y 6 aparecen patrones y quizá los primeros pacientes; entre los 6 y 12, una base sólida y posible monetización. Al Dr. Campos le tomó dos años cobrar sus primeros 100 dólares.' },
  { q: '¿Tengo que exponer mi vida privada?', a: 'No. El método se apoya en tu conocimiento médico y en hablar como le hablas a un paciente en consulta. Cercanía no es exposición: es tono.' },
  { q: '¿Sirve para mi especialidad?', a: 'Sí. La lección 2.1 trabaja el nicho a partir de tu especialidad y viene con templates de temas por especialidad médica.' },
  { q: '¿Y si no es para mí?', a: 'Tienes 7 días de garantía. Si en la primera semana sientes que el método no es para ti, escribes y te devolvemos el dinero.' },
];
