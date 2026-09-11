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

## Leads → GoHighLevel (External Tracking)

La captura no llama a ninguna API propia: el script **External Tracking** de GHL (en
`index.html`, antes de `</body>`, con el `data-tracking-id` de la cuenta) detecta el `<form>`
de captura y, al dispararse su evento `submit`, envía todos los campos a GHL, que crea o
actualiza el contacto y le liga la atribución de la sesión. Verificado: engancha el formulario
aunque React lo monte después de cargar.

Reglas del formulario (`src/quiz/screens/Capture.jsx`), sacadas del skill `ghl-external-tracking`:

- **Nombres que GHL reconoce**: `first_name`, `last_name`, `email`, `phone` — y tienen que ser
  inputs **visibles**: interceptando la petición del script se comprobó que **descarta todos los
  `type="hidden"`** (a diferencia de lo que dice el skill). Por eso el nombre va en dos campos
  (Nombre / Apellido) y el input del teléfono lleva el E.164 completo con el prefijo fijo
  (`+591 71234567`), con la bandera en el botón.
- **El botón es `type="button"`** y solo llama a `requestSubmit()` si la validación pasa. GHL
  engancha el clic de cualquier `button[type=submit]` y envía el formulario 50 ms después
  aunque esté vacío; sin evento `submit`, no ve nada. Enter se replica a mano con el mismo
  camino. Prueba negativa: clic con todo vacío → 4 errores, cero envíos.
- **Checkbox de consentimiento** (`name="consent"`, obligatorio) dentro del form, con
  `consent_at` en hidden: queda registro y GHL puede tratar al contacto como suscrito.
- **Dato rico en inputs de texto `readOnly` ocultos con CSS** (no `hidden`), generados por
  `buildQuizFields()` en `quiz.js`: `score`, `result_id`, `result_stage`, `plataformas`,
  `q1_valor…q10_valor`, `tags`, `phone_country`, `consent_at`, más la atribución persistida por
  `src/shared/tracking.js` (`utm_*`, `fbclid`, `gclid`, `referrer`, `landing_url`). Los vacíos
  se omiten. Llegan a GHL como *Unmapped Fields*, mapeables a custom fields. El script añade
  `Timezone` por su cuenta.

Limitación conocida de SPA: el page view solo se registra en la carga inicial; el evento del
formulario se captura siempre.

**Verificación tras un deploy:** enviar un lead con correo único y comprobar en GHL que hay
**un** contacto con First Name, Phone y Email llenos, los *Unmapped Fields* presentes y la
campaña en *Source*; y que un clic con el formulario vacío **no** crea nada.

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

## Despliegue

Proyecto Vercel `dr-david-campos` (equipo *Bryan Orellana's projects*, plan **Hobby**), enlazado
al repo `bryan-orellana3/dr-campos`. En Hobby, Vercel **bloquea** cualquier deploy cuyo commit
no esté firmado por el GitHub conectado a la cuenta (`bryan-orellana3`): sale como *Blocked* y
solo pasa con *Authorize* a mano. Por eso los commits se firman como Bryan (`git config` local
del repo) — mira al autor del commit desplegado, no al historial.

- Con permiso de escritura en el repo de Bryan, cada `git push` a `main` despliega solo.
- Sin él, `vercel --prod` desde este directorio publica igual (la regla mira al autor del commit).
