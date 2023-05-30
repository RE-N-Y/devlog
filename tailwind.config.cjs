const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		colors:{
			primary: "#7358c6",
			secondary: "#f3e2fe",
			text: "#ffffff",
			accent: "#f5d0fe",
			background: "#120727",
			muted: "hsl(210 40% 96.1%)",
			white: "#ffffff",
			black: "#000000"
		},
		fontFamily:{
			'body': ["InterVariable", ...defaultTheme.fontFamily.sans],
			'sans': ["InterVariable", ...defaultTheme.fontFamily.sans],
			'mono': ['"JetBrains Mono"', 'monospace'],
		},
		extend: {},
	},
	plugins: [],
}
