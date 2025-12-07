/** @portfolio-redesign/.astro/types.d.ts {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			fontFamily: {
				sans: ['Inter', 'sans-serif'],
				serif: ['Italiana', 'serif'],
				mono: ['JetBrains Mono', 'monospace'],
			},
			colors: {
				bg: '#F5F5F9',
				text: '#111116',
				border: '#E2E2EA',
			}
		},
	},
	plugins: [],
}