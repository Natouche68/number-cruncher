/** @type {import('tailwindcss').Config} */
export default {
	content: ["./src/**/*.{html,js,svelte,ts}"],

	theme: {
		colors: {
			transparent: "transparent",
			black: "#000000",
			white: "#ffffff",
			"raisin-black": "#191C24",
			"space-cadet": "#23293B",
			"indigo-dye": "#044B7F",
			teal: "#107E7D",
			"light-blue": "#B8DBD9",
		},
		fontFamily: {
			sans: ["Inter", "sans-serif"],
		},
		boxShadow: {
			DEFAULT:
				"inset 0.3rem 0.3rem 1rem #ffffff50, 0.4rem 0.8rem 1rem #00000060",
		},
	},

	plugins: [],
};
