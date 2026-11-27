import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

const site = 'https://sheyisbrightcore.com';

export default defineConfig({
  site,
  output: 'static',
  i18n: {
    locales: ['es', 'en'],
    defaultLocale: 'es',
    routing: { prefixDefaultLocale: false },
  },
  integrations: [
    sitemap({
      i18n: { defaultLocale: 'es', locales: { es: 'es-ES', en: 'en-US' } },
    }),
  ],
});
