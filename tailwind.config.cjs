const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		colors:{
			primary: "#7358c6",
			secondary: "#f3e2fe",
			text: "#282828",
			accent: "#f5d0fe",
			background: "#18181b",
			muted: "hsl(210 40% 96.1%)",
			white: "#ffffff",
			black: "#000000",
			paper: "#FEF9EC"
		},
		fontFamily:{
			'body': ["Bungee", ...defaultTheme.fontFamily.sans],
			'sans': ["InterVariable", ...defaultTheme.fontFamily.sans],
			'serif': ["Roboto Slab Variable", ...defaultTheme.fontFamily.serif],
			'mono': ['"JetBrains Mono"', 'monospace'],
		},
		extend: {},
	},
	plugins: [],
}
