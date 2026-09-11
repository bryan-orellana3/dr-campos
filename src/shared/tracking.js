/**
 * Atribución de la sesión (UTM, click ids, referrer, URL de entrada).
 * Se captura al arrancar la app y se persiste en sessionStorage: en un SPA la URL con
 * UTM es la de entrada, pero el envío ocurre pantallas después. Luego viaja como campos
 * ocultos del formulario, reforzando la atribución nativa del External Tracking de GHL.
 */
const KEY = 'lead_attrib';
const PARAMS = [
  'utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content',
  'fbclid', 'gclid', 'gbraid', 'wbraid', 'ttclid', 'msclkid',
];

export function captureAttribution() {
  if (typeof window === 'undefined') return;
  try {
    const existing = getAttribution() ?? {};
    const params = new URLSearchParams(window.location.search);
    const found = {};
    for (const k of PARAMS) {
      const v = params.get(k);
      if (v) found[k] = v;
    }
    const externo =
      document.referrer && !document.referrer.includes(window.location.host) ? document.referrer : undefined;
    const merged = {
      ...existing,
      ...found,
      referrer: existing.referrer ?? externo ?? '',
      landing_url: existing.landing_url ?? window.location.href,
    };
    window.sessionStorage.setItem(KEY, JSON.stringify(merged));
  } catch {
    /* sin sessionStorage: el tracking nativo de GHL sigue funcionando */
  }
}

export function getAttribution() {
  try {
    const raw = window.sessionStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}
