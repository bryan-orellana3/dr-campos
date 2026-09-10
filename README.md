# Dr. David Campos — web de lanzamiento

Una sola app (Vite + React + React Router) con las piezas del funnel, sobre el
**Dr. David Campos Design System** que vive dentro del repo.

| Ruta | Qué es | Estado |
| --- | --- | --- |
| `/` | Landing con el VSL | pendiente — hoy redirige a `/quiz` conservando la query |
| `/quiz` | Autodiagnóstico digital para médicos | en producción |

```
design-system/     tokens, assets y componentes de marca — la única fuente de verdad
src/
├── main.jsx       enrutador; cada ruta carga su propio bundle (React.lazy)
├── shared/        ui.jsx (primitivas del sistema) y styles/global.css
└── quiz/          QuizApp.jsx, data/ y screens/
```

Los tokens no se copian: `src/shared/styles/global.css` importa `design-system/styles.css`.
Las imágenes de `public/` sí son copias optimizadas de `design-system/assets/` (el logo master
pesa 400 KB; la copia servida, 113 KB) — es una optimización deliberada, no duplicación.

Las redirecciones de `main.jsx` conservan `search` y `hash`: un `/?utm_source=…` llega al quiz
con sus UTM intactos. El `rewrites` de `vercel.json` sirve `index.html` en cualquier ruta para
que los enlaces profundos (`/quiz`) funcionen al recargar.

## El quiz

## Flujo

1. **Intro** — hero oscuro con el motivo de pulso y la promesa (10 preguntas, 3 minutos).
2. **10 preguntas + 4 datos clínicos**, una pantalla cada uno.
   - Las preguntas simples **auto-avanzan** 420 ms después de responder. La P10 no:
     el paso al diagnóstico es una decisión consciente.
   - La P2 es multi-selección, no puntúa, e incluye "Otra" (campo libre) y "Ninguna" (excluyente).
   - Tras las preguntas 1, 3, 7 y 8 se intercala una **pantalla de dato clínico** sobre navy,
     con foto, cifra destacada y fuente. Son las pausas del quiz: puntúan el ritmo de
     pantallas claras y sostienen el argumento. La cabecera se oscurece con ellas.
   - Volver atrás desde una pregunta **se salta el dato intermedio** — se vuelve para
     cambiar la respuesta, no para releer.
3. **Captura** — nombre, email y WhatsApp con selector de país (el país se adivina por zona horaria).
4. **Resultado** — puntaje sobre 27, medidor ECG con las tres bandas, diagnóstico completo
   del tramo, recuento de plataformas declaradas y los CTA al método.

Puntaje: 9 preguntas puntuadas × (A=1, B=2, C=3) → 9 a 27.
Tramos: 9–14 consulta silenciosa · 15–21 el debate · 22–27 camino al alta médica.

La secuencia sale de `STEPS` en `src/quiz/data/quiz.js`: se arma sola a partir de las preguntas
que llevan `stat`, así que añadir o quitar un dato reordena el flujo y el progreso sin tocar
la lógica. El avance se guarda en `localStorage`, así que un refresh no borra las respuestas.

## Configuración

Copia `.env.example` a `.env` en local, o define las variables en Vercel
(Project → Settings → Environment Variables). **Requieren un redeploy para aplicarse**:
Vite las inyecta en tiempo de build, no de ejecución.

| Variable | Para qué |
| --- | --- |
| `VITE_CTA_URL` | Landing de venta. Sin ella los CTA salen deshabilitados con un aviso visible. |
| `VITE_LEAD_WEBHOOK` | Sobreescribe el inbound webhook de GHL (el de producción va por defecto en `quiz.js`). |

## Leads → GoHighLevel

El formulario de captura envía un POST JSON al **inbound webhook** de GHL (`LEAD_WEBHOOK` en
`src/quiz/data/quiz.js`). El payload lo arma `buildLeadPayload()`: plano, en `snake_case` y
con valores escalares, para mapearlo campo a campo en el workflow sin transformar nada.

- Contacto con los nombres que GHL reconoce: `first_name`, `last_name` (el nombre se parte
  con `splitName()`, que separa tratamientos como *Dra.*), `email`, `phone` en E.164.
- Diagnóstico: `score`, `result_id`, `result_stage`, `plataformas`, `q1_valor…q10_valor`,
  `q1_respuesta…`, y `tags` (`quiz-riesgo-digital`, `resultado-<id>`).
- Consentimiento (`consent`, `consent_text`, `consent_at`) y atribución (`utm_*`, `fbclid`,
  `gclid`, `referrer`, `page_url`).

El envío tiene **tiempo límite de 8 s**. Si GHL falla o no responde, el diagnóstico se muestra
igual y el lead queda en `localStorage` bajo `dc-quiz-lead-pendiente` — nadie se queda sin su
resultado por un fallo de red.

El selector de país del WhatsApp (`src/shared/PhoneField.jsx`) es un listbox accesible con
banderas SVG de `country-flag-icons` — se importan solo las 23 de la lista; un `import *`
arrastra las 260 del paquete.

## Comandos

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # dist/
npm run preview
```

## Dónde tocar el contenido

Todo el copy vive en [`src/quiz/data/quiz.js`](src/quiz/data/quiz.js): preguntas, opciones
con su puntaje, datos clínicos con su fuente, los tres diagnósticos y el cierre. Los países
del selector de WhatsApp están en [`src/quiz/data/countries.js`](src/quiz/data/countries.js).

## Nota de marca

El logo master no tiene variante en negativo. Sobre fondo oscuro, `BrandLock` compone la
marca como manda el sistema: isotipo (orbe de foto) + logotipo tipografiado (script "Dr." +
Montserrat ExtraBold en caja alta). **Pendiente: pedir a marca el logo en negativo oficial.**

`public/isotipo.webp` se recortó del retrato original ajustando la circunferencia del disco
(centro y radio) para que la foto llene el círculo sin margen muerto; lleva máscara alfa con
2 px de sangrado interior para que no asome el fondo claro en el borde. `favicon.png` sale
del mismo recorte.

Las fuentes son las sustituciones de Google Fonts del sistema (Montserrat, Source Sans 3,
Sacramento en lugar de Brittany Signature). Si se licencian las originales, se reemplazan
en `design-system/tokens/fonts.css`.
