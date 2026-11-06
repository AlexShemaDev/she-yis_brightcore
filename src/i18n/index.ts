import { es, type Dictionary } from './es';
import { en } from './en';
import { locales, type L10n, type Locale } from './types';

export { locales };
export type { Dictionary, L10n, Locale };

export const defaultLocale: Locale = 'es';

const dictionaries: Record<Locale, Dictionary> = { es, en };

export const useTranslations = (locale: Locale): Dictionary => dictionaries[locale];

/** Resolves a localized value. */
export const pick = (value: L10n, locale: Locale): string => value[locale];

export const otherLocale = (locale: Locale): Locale => (locale === 'es' ? 'en' : 'es');

/** Home path of a locale: `/` for Spanish (default), `/en/` for English. */
export const localePath = (locale: Locale): string => (locale === defaultLocale ? '/' : `/${locale}/`);

export function getLangFromUrl(url: URL): Locale {
  const [, first] = url.pathname.split('/');
  return (locales as readonly string[]).includes(first ?? '') ? (first as Locale) : defaultLocale;
}

/** BCP 47 tag used for `lang`, `og:locale` and `hreflang`. */
export const htmlLang: Record<Locale, string> = { es: 'es', en: 'en' };
export const ogLocale: Record<Locale, string> = { es: 'es_ES', en: 'en_US' };
