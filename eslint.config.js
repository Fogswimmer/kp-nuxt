import { createConfigForNuxt } from "@nuxt/eslint-config/flat";

export default createConfigForNuxt({
	features: {
		stylistic: false,
		tooling: true,
	},
}).append({
	rules: {
		"@typescript-eslint/ban-types": "off",
	},
});
