// Códigos de país para el WhatsApp del lead.
// `len` = longitud esperada del número nacional (validación indicativa, no estricta).
export const COUNTRIES = [
  { iso: 'AR', name: 'Argentina', dial: '54', len: [10, 11] },
  { iso: 'BO', name: 'Bolivia', dial: '591', len: [8] },
  { iso: 'BR', name: 'Brasil', dial: '55', len: [10, 11] },
  { iso: 'CL', name: 'Chile', dial: '56', len: [9] },
  { iso: 'CO', name: 'Colombia', dial: '57', len: [10] },
  { iso: 'CR', name: 'Costa Rica', dial: '506', len: [8] },
  { iso: 'CU', name: 'Cuba', dial: '53', len: [8] },
  { iso: 'EC', name: 'Ecuador', dial: '593', len: [9] },
  { iso: 'SV', name: 'El Salvador', dial: '503', len: [8] },
  { iso: 'ES', name: 'España', dial: '34', len: [9] },
  { iso: 'US', name: 'Estados Unidos', dial: '1', len: [10] },
  { iso: 'GT', name: 'Guatemala', dial: '502', len: [8] },
  { iso: 'GQ', name: 'Guinea Ecuatorial', dial: '240', len: [9] },
  { iso: 'HN', name: 'Honduras', dial: '504', len: [8] },
  { iso: 'MX', name: 'México', dial: '52', len: [10] },
  { iso: 'NI', name: 'Nicaragua', dial: '505', len: [8] },
  { iso: 'PA', name: 'Panamá', dial: '507', len: [8] },
  { iso: 'PY', name: 'Paraguay', dial: '595', len: [9] },
  { iso: 'PE', name: 'Perú', dial: '51', len: [9] },
  { iso: 'PR', name: 'Puerto Rico', dial: '1', len: [10] },
  { iso: 'DO', name: 'República Dominicana', dial: '1', len: [10] },
  { iso: 'UY', name: 'Uruguay', dial: '598', len: [8, 9] },
  { iso: 'VE', name: 'Venezuela', dial: '58', len: [10] },
];

export const DEFAULT_COUNTRY = 'MX';

const TZ_TO_ISO = {
  'America/Argentina': 'AR',
  'America/La_Paz': 'BO',
  'America/Sao_Paulo': 'BR',
  'America/Santiago': 'CL',
  'America/Bogota': 'CO',
  'America/Costa_Rica': 'CR',
  'America/Havana': 'CU',
  'America/Guayaquil': 'EC',
  'America/El_Salvador': 'SV',
  'Europe/Madrid': 'ES',
  'America/Guatemala': 'GT',
  'America/Tegucigalpa': 'HN',
  'America/Mexico_City': 'MX',
  'America/Monterrey': 'MX',
  'America/Tijuana': 'MX',
  'America/Cancun': 'MX',
  'America/Managua': 'NI',
  'America/Panama': 'PA',
  'America/Asuncion': 'PY',
  'America/Lima': 'PE',
  'America/Puerto_Rico': 'PR',
  'America/Santo_Domingo': 'DO',
  'America/Montevideo': 'UY',
  'America/Caracas': 'VE',
};

/** Adivina el país por zona horaria del navegador. Cae en México si no hay coincidencia. */
export function guessCountry() {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
    if (TZ_TO_ISO[tz]) return TZ_TO_ISO[tz];
    if (tz.startsWith('America/Argentina/')) return 'AR';
  } catch {
    /* sin Intl disponible */
  }
  return DEFAULT_COUNTRY;
}

export function countryByIso(iso) {
  return COUNTRIES.find((c) => c.iso === iso) ?? COUNTRIES.find((c) => c.iso === DEFAULT_COUNTRY);
}
