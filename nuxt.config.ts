export default defineNuxtConfig({
	modules: [
		"@nuxtjs/i18n",
		"@pinia/nuxt",
		"@nuxt/image",
		"vuetify-nuxt-module",
		"nuxt-auth-utils",
		"@nuxt/eslint",
	],
	ssr: true,
	imports: {
		dirs: ["types/*.ts", "store/*.ts", "types/**/*.ts", "utils/**/*.ts"],
	},
	devtools: { enabled: true },
	app: {
		pageTransition: {
			name: "slide",
			mode: "out-in", // default
		},
		layoutTransition: { name: "layout", mode: "out-in" },
		head: {
			title: process.env.NUXT_APP_NAME,
			charset: "utf-8",
			viewport: "width=device-width, initial-scale=1",
		},
	},
	css: ["@/assets/css/globals.scss"],
	nitro: {
		experimental: {
			wasm: false,
		},
	},
	build: {
		transpile: ["vuetify"],
	},
	runtimeConfig: {
		public: {
			apiBase: process.env.NUXT_API_BASE_URL,
			appName: process.env.NUXT_APP_NAME,
		},
	},
	future: {
		compatibilityVersion: 4,
	},
	srcDir: ".",
	dir: {
		app: "app",
	},
	experimental: {
		scanPageMeta: "after-resolve",
		sharedPrerenderData: false,
		normalizeComponentNames: false,
		defaults: {
			useAsyncData: {
				deep: true,
			},
		},
	},
	unhead: {
		renderSSRHeadOptions: {
			omitLineBreaks: false,
		},
	},

	vite: {
		optimizeDeps: {
			exclude: ["vuetify"],
		},
		build: {
			sourcemap: true,
		},
		server: {
			hmr: {
				timeout: 30000,
				overlay: true,
			},
			proxy: {
				"/api": {
					target: process.env.NUXT_API_BASE_URL,
					changeOrigin: true,
					rewrite: (path) => path.replace(/^\/api/, ""),
				},
			},
		},
	},
	i18n: {
		vueI18n: "./i18n.config.ts",
		strategy: "prefix_and_default",
		defaultLocale: "ru",
		baseUrl: process.env.NUXT_BASE_URL,
		bundle: {
			optimizeTranslationDirective: false,
		},
		locales: [
			{
				code: "ru",
				iso: "ru-RU",
			},
			{
				code: "en",
				iso: "en-US",
			},
			{
				code: "fr",
				iso: "fr-FR",
			},
		],
		detectBrowserLanguage: {
			useCookie: true,
			cookieKey: "i18n_redirected",
			redirectOn: "root",
		},
	},
	image: {
		domains: [process.env.DOMAIN_NAME as string],
		providers: {
			myProvider: {
				name: "myProvider",
				provider: "~/providers/my-provider.ts",
				options: {
					baseUrl: process.env.NUXT_BASE_URL,
					modifiers: {
						fit: "cover",
					},
				},
			},
		},
	},
	vuetify: {
		vuetifyOptions: "./vuetify.config.ts",
	},
	compatibilityDate: "2025-08-20",
});
