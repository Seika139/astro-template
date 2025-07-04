import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  site: 'https://example.com',
  integrations: [sitemap(), react(), tailwind()],
  server: {
    host: '0.0.0.0', // Dockerコンテナ内から外部アクセスを許可するため
    port: 4321,
  },
});
