import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

const base = process.env.BASE_PATH || '/';

// https://astro.build/config
export default defineConfig({
  site: 'https://Seika139.github.io/astro-template/',
  base: base,
  output: 'static',
  integrations: [sitemap(), react(), tailwind()],
  server: {
    host: '0.0.0.0', // Dockerコンテナ内から外部アクセスを許可するため
    port: 4321,
  },
});
