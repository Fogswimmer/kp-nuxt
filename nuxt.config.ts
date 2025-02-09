export default defineNuxtConfig({
	modules: [
		"@nuxtjs/i18n",
		"@pinia/nuxt",
		"@nuxt/eslint",
		"@nuxt/image",
		"vuetify-nuxt-module",
		"@nuxt/test-utils/module",
		"nuxt-auth-utils",
	],
	app: {
		pageTransition: {
			name: "page",
			mode: "out-in", // default
		},
		layoutTransition: { name: "layout", mode: "out-in" },
		head: {
			title: "Kinopoisk Lite",
			charset: "utf-8",
			viewport: "width=device-width, initial-scale=1",
			meta: [
				{
					hid: "description",
					name: "description",
					content: "Kinopoisk Lite",
				},
				{
					hid: "og:title",
					name: "og:title",
					content: "Kinopoisk Lite",
				},
				{
					hid: "og:description",
					name: "og:description",
					content: "Kinopoisk Lite",
				},
				{},
			],
		},
	},
	vuetify: {
		vuetifyOptions: {
			labComponents: true,
			defaults: {
				VTextField: {
					variant: "filled",
				},
				VSelect: {
					variant: "filled",
				},
				VCombobox: {
					variant: "filled",
				},
			},
			theme: {
				// themes: {
				// 	light: {
				// 		dark: false,
				// 		colors: {
				// 			background: '#ffffff',
				// 			surface: 'rgb(235, 235, 235)',
				// 			primary: 'rgb(159, 58, 181)',
				// 			secondary: '#05c19c',
				// 			accent: '#ff00e9',
				// 		}
				// 	},
				// 	dark: {
				// 		dark: true,
				// 		colors: {
				// 			background: '#3b3b3b',
				// 			surface: 'rgb(28, 27, 33)',
				// 			primary: 'rgb(159, 58, 181)',
				// 			secondary: '#05c19c',
				// 			accent: '#ff00e9',
				// 		}
				// 	}
				// }
			}
		},
	},
	imports: {
		dirs: ["types/*.ts", "store/*.ts", "types/**/*.ts"],
	},
	i18n: {
		vueI18n: "./i18n.config.ts",
	},
	image: {
		domains: ["kinopoisk.light"],
		providers: {
			myProvider: {
				name: "myProvider",
				provider: "~/providers/my-provider.ts",
				options: {
					baseUrl: process.env.BASE_URL,
				},
			},
		},
	},

	runtimeConfig: {
		public: {
			apiBase: process.env.API_BASE_URL,
		},
	},

	vite: {
		build: {
			sourcemap: true,
		},
		css: {
			preprocessorOptions: {
				scss: {
					api: 'modern-compiler' // or "modern"
				}
			}
		},
		server: {
			hmr: {
				timeout: 30000,
				overlay: true, 
			},
			proxy: {
				"/api": {
					target: process.env.API_BASE_URL,
					changeOrigin: true,
					rewrite: (path) => path.replace(/^\/api/, ""),
				},
				"/uploads": {
					target: `${process.env.BASE_URL}/uploads`,
					changeOrigin: true,
					rewrite: (path) => path.replace(/^\/uploads/, ""),
				},
			},
		},
	},
	eslint: {
		config: {
			stylistic: {
				indent: "tab",
				semi: true,
			}, // <---
		},
	},

	compatibilityDate: "2024-04-03",
	devtools: { enabled: true },
});
