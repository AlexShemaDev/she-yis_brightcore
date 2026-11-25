/** Single place for company-level constants. Replace placeholders before publishing. */
export const siteConfig = {
  name: 'SHE - YIS BRIGHTCORE LLC',
  shortName: 'SHE - YIS BRIGHTCORE',
  year: 2026,
  contactEmail: 'contacto@sheyisbrightcore.com',
  themeColor: '#0A0E27',
} as const;

/** Page sections in order: they are the seven "lights" on the circuit rail. */
export const sectionIds = [
  'top',
  'neuremy',
  'topoquizz',
  'ecosystem',
  'capabilities',
  'about',
  'contact',
] as const;

export type SectionId = (typeof sectionIds)[number];
