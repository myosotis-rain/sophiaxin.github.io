/** @portfolio-redesign/.astro/types.d.ts {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			fontFamily: {
				serif: ['"Playfair Display"', 'serif'],
				sans: ['"Space Grotesk"', 'sans-serif'],
			},
			colors: {
				paper: '#f9f9f7', 
				ink: '#1a1a1a',
				accent: '#d4cbb8',
				muted: '#666666'
			}
		},
	},
	plugins: [
        require('@tailwindcss/typography'),
    ],
}