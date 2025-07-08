import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

const base = process.env.BASE_PATH || '/';

// https://astro.build/config
export default defineConfig({
  site: 'https://Seika139.github.io/astro-template/',
  base: base,
  output: 'static',
  integrations: [sitemap(), react()],
  vite: {
    plugins: [tailwindcss()],
  },
  server: {
    host: '0.0.0.0', // Dockerコンテナ内から外部アクセスを許可するため
    port: 4321,
  },
});
