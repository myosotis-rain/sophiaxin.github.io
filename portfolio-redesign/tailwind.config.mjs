/** @portfolio-redesign/.astro/types.d.ts {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			fontFamily: {
				serif: ['"Newsreader"', 'serif'], // The standard for "Smart" text
				sans: ['"Manrope"', 'sans-serif'],
			},
            colors: {
                'paper': '#FDFCF8',
                'ink': '#1C1924',
                'accent': '#685E80',
                'accent-light': '#E6E4EA'
            }
		},
	},
	plugins: [
        require('@tailwindcss/typography'),
    ],
}