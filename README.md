# Dr. David Campos — web de lanzamiento

Una sola app (Vite + React + React Router) con las piezas del funnel, sobre el
**Dr. David Campos Design System** que vive dentro del repo.

| Ruta | Qué es | Estado |
| --- | --- | --- |
| `/` | Landing del VSL — Método 4C | en producción; el video y el checkout se activan por variables (abajo) |
| `/quiz` | Autodiagnóstico digital para médicos | en producción — `dr-david-campos.vercel.app` (alias histórico: `quiz-riesgo-digital.vercel.app`) |
| `/gracias` | Página de gracias tras el checkout | en producción; el formulario de GHL debe redirigir aquí *On Submit* |

```
design-system/     tokens, assets y componentes de marca — la única fuente de verdad
src/
├── main.jsx       enrutador; cada ruta carga su propio bundle (React.lazy)
├── shared/        ui.jsx (primitivas del sistema), PhoneField, tracking.js, styles/global.css
├── landing/       LandingPage.jsx, VslPlayer.jsx, CheckoutModal.jsx, data/offer.js (config + copy)
└── quiz/          QuizApp.jsx, data/ y screens/
```

**Un HTML por ruta pública.** `index.html` (landing), `quiz.html` y `gracias.html` cargan el mismo
bundle pero llevan su propio `<title>`, descripción y `og:*` — los rastreadores de WhatsApp,
Facebook o LinkedIn no ejecutan JavaScript, así que la previsualización sale de la cabecera
estática. Vite los compila como entradas múltiples y `vercel.json` reescribe `/quiz` y `/gracias`
a su HTML. La imagen de previsualización es `public/og-dr-campos.jpg` (1200×630, 94 KB: WhatsApp
no muestra la imagen grande por encima de ~300 KB), referenciada con URL absoluta. WhatsApp cachea
la previsualización por URL: para forzar la nueva en un enlace ya compartido, añadir `?v=2`.

Los tokens no se copian: `src/shared/styles/global.css` importa `design-system/styles.css`.
Las imágenes de `public/` sí son copias optimizadas de `design-system/assets/` (el logo master
pesa 400 KB; la copia servida, 113 KB) — es una optimización deliberada, no duplicación.

Las redirecciones de `main.jsx` conservan `search` y `hash`: un `/?utm_source=…` llega al quiz
con sus UTM intactos. El `rewrites` de `vercel.json` sirve `index.html` en cualquier ruta para
que los enlaces profundos (`/quiz`) funcionen al recargar.

## La landing del VSL

Todo el copy y la configuración están en `src/landing/data/offer.js`. El hero es el video y va
primero, antes del título. El reproductor (`VslPlayer.jsx`) no tiene controles de reproducción:
arranca solo y en silencio (autoplay muted) con el aviso "Tu video ya empezó. Toca para activar el
sonido"; al tocar vuelve al inicio con sonido; el único control es el altavoz (tocar el video
también silencia/activa); sin play, pausa ni barra; al terminar ofrece "Ver de nuevo". Si el
navegador bloquea el autoplay, el aviso pasa a "Toca para ver el video". El botón de compra bajo el
video está visible desde el inicio (`REVEAL_AT_SECONDS = 0`); si se configura un retardo, aparece
al llegar a esa **posición del video** (con o sin sonido; saltar más adelante también lo revela) y
queda visible en visitas posteriores (`localStorage`). Al pulsarlo se abre un popup con el checkout de GHL en un iframe. Si la visita
llega desde el quiz (`?dx=ordinario|debate|climax`), el hero abre con una línea personalizada.

**Video.** El original (`Drive/Dr Campos/VSL/IMG_9199.MOV`) viene en HEVC, que Chrome y Android no
reproducen. Se convirtió con `avconvert --preset PresetAppleM4V720pHD` a `IMG_9199-web-720p.mp4`
(H.264, 1080×720, 81 MB), dejado en la misma carpeta de Drive para subirlo a un host de video
(GHL Media Storage o Bunny Stream). Ni Drive ni Vercel sirven para alojarlo. La portada
(`public/vsl-poster.jpg`) salió del propio video. El reproductor toma la proporción real del archivo
(3:2) desde los metadatos. Para probar en local: `public/vsl.mp4` + `.env.local` con
`VITE_VSL_URL=/vsl.mp4` (ambos ignorados en git).

**Oferta.** USD 47, pago único, garantía de devolución de 7 días. Sin order bump, bonos ni upsell.

**Barra fija.** En todas las pantallas, una barra inferior fija con el precio y "Quiero el Método 4C"
acompaña toda la página (se oculta mientras el popup está abierto). Sin invitación al quiz al pie.

**Checkout.** El botón de compra abre un popup con el order form de GHL en un iframe. El formulario
está configurado en GHL con *On Submit → Redirect to URL →* `https://dr-david-campos.vercel.app/gracias`: `form_embed.js` aplica esa redirección a la página
completa, con lo que el popup desaparece. Como respaldo, `CheckoutModal` escucha `postMessage` del
origen de GHL y, si el mensaje indica envío, cierra y navega a `/gracias`.

Evidencia: cuatro liquidaciones de Meta (`public/proof-*.jpg`) recortadas por encima de
"Informações da transação" para no mostrar identificadores ni banco, y dos apariciones en TV.
Las cifras coinciden con lo que el Dr. Campos dice en la lección 1.3 (3.000–6.000 US$/mes).

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
   del tramo, recuento de plataformas declaradas, los CTA al método (`/?dx=<tramo>`) y una
   **barra fija** inferior con "Ver el método" visible desde el primer momento. Sin opción de
   repetir el test.

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
| `VITE_VSL_URL` | Sobreescribe el mp4 del VSL. El default en `offer.js` es el archivo en GHL Media Storage (H.264 720p, faststart, con Range). |
| `VITE_VSL_POSTER` | Sobreescribe la portada (default `/vsl-poster.jpg`, frame del propio video). |
| `VITE_REVEAL_AT_SECONDS` | Segundo de reproducción en que aparece el botón bajo el video. **Default 0: visible desde el inicio** (decisión del usuario; el retardo se recupera poniendo p. ej. 60). Con retardo, `?cta=1` lo muestra sin memorizar y `?cta=0` borra la memoria. |
| `VITE_CHECKOUT_URL` | Sobreescribe el checkout. El default es el order form de GHL `B8o92gWnDzyBvBEEF0B4`, embebido en el popup con los atributos del embed oficial y `form_embed.js` (en `index.html`). |
| `VITE_CTA_URL` | Destino de los CTA del quiz. Default `/` (la landing); el diagnóstico viaja como `?dx=<result_id>`. |

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
- **Sin checkbox ni aviso de consentimiento** (decisión del usuario), y por tanto sin campos de
  consentimiento en el envío: no se registra una aceptación que el médico no vio.
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
campaña en *Source*; y que un clic con el formulario vacío **no** crea nada. Verificado en
producción el 11 de septiembre de 2026 interceptando el beacon: 30 campos, contacto completo,
extras y UTM correctos; el envío vacío no dispara nada.

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

Sobre fondo oscuro, `BrandLock` compone la marca en horizontal: isotipo (orbe de foto) + el
trazo caligráfico oficial **"Dr."** + "DAVID CAMPOS" en Montserrat ExtraBold. El trazo es
`public/dr-script.png`, una máscara alfa recortada del lockup oscuro oficial que hay en
`Identidad GHL/Logo Dr David Campos - 640x640 fondo oscuro.png` (ese lockup existe, pero es
apilado — orbe arriba — y no sirve de cabecera), teñida por CSS con `mask-image`. Fuente de
92 px de alto: si marca entrega el "Dr" aislado en SVG, se sustituye el archivo y queda vectorial.
En los textos corridos se escribe "Dr." tipográfico; el trazo es solo para el lockup.

`public/isotipo.webp` es el retrato oficial completo — el disco azul con el arco y el pelo
sobresaliendo por arriba — con fondo transparente. La máscara se construyó por geometría: el
disco real se ajustó por mínimos cuadrados al borde izquierdo de la foto (centro ≈ (614, 672),
radio ≈ 515; el borde superior del pelo engaña, sobresale ~80 px del disco); dentro del disco se
conserva todo (bata blanca incluida) y fuera solo lo que no es fondo claro (arco y pelo). Se dibuja
sin recorte circular. Del mismo archivo salen `favicon-32.png`, `favicon.png` (192) y
`apple-touch-icon.png` (180), enlazados en las tres cabeceras.

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
