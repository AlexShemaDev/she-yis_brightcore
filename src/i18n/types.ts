export const locales = ['es', 'en'] as const;
export type Locale = (typeof locales)[number];
export type L10n = Record<Locale, string>;
