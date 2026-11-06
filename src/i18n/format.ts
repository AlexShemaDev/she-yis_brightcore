import type { Locale } from './types';

const tags: Record<Locale, string> = { es: 'es-ES', en: 'en-US' };

/**
 * Integer with thousands separators in every locale: 2.500 (es) / 2,500 (en).
 * `useGrouping: 'always'` is required because es-ES omits the separator for
 * four-digit numbers by default.
 */
export const formatInteger = (value: number, locale: Locale): string =>
  new Intl.NumberFormat(tags[locale], { useGrouping: 'always', maximumFractionDigits: 0 }).format(value);
