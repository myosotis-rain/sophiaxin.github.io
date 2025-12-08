import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  base: '/sophiaxin.github.io', // Set base to your repository name for GitHub Pages deployment
  integrations: [tailwind()]
});