import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  base: '/', // Correct base for custom domain deployment
  integrations: [tailwind()]
});