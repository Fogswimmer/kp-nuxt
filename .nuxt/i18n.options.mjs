
// @ts-nocheck


export const localeCodes =  [
  "ru",
  "en",
  "fr"
]

export const localeLoaders = {
  "ru": [],
  "en": [],
  "fr": []
}

export const vueI18nConfigs = [
  () => import("../i18n/i18n.config.ts?hash=5b32d2e0&config=1" /* webpackChunkName: "__i18n_config_ts_5b32d2e0" */)
]

export const nuxtI18nOptions = {
  "restructureDir": "i18n",
  "experimental": {
    "localeDetector": "",
    "switchLocalePathLinkSSR": false,
    "autoImportTranslationFunctions": false,
    "typedPages": true,
    "typedOptionsAndMessages": false,
    "generatedLocaleFilePathFormat": "absolute",
    "alternateLinkCanonicalQueries": false
  },
  "bundle": {
    "compositionOnly": true,
    "runtimeOnly": false,
    "fullInstall": true,
    "dropMessageCompiler": false,
    "optimizeTranslationDirective": true
  },
  "compilation": {
    "jit": true,
    "strictMessage": true,
    "escapeHtml": false
  },
  "customBlocks": {
    "defaultSFCLang": "json",
    "globalSFCScope": false
  },
  "vueI18n": "./i18n.config.ts",
  "locales": [
    {
      "code": "ru",
      "iso": "ru-RU"
    },
    {
      "code": "en",
      "iso": "en-US"
    },
    {
      "code": "fr",
      "iso": "fr-FR"
    }
  ],
  "defaultLocale": "ru",
  "defaultDirection": "ltr",
  "routesNameSeparator": "___",
  "trailingSlash": false,
  "defaultLocaleRouteNameSuffix": "default",
  "strategy": "prefix_except_default",
  "lazy": false,
  "langDir": "locales",
  "detectBrowserLanguage": {
    "alwaysRedirect": false,
    "cookieCrossOrigin": false,
    "cookieDomain": null,
    "cookieKey": "i18n_redirected",
    "cookieSecure": false,
    "fallbackLocale": "",
    "redirectOn": "root",
    "useCookie": true
  },
  "differentDomains": false,
  "baseUrl": "https://nebelschwimmer.site",
  "customRoutes": "page",
  "pages": {},
  "skipSettingLocaleOnNavigate": false,
  "types": "composition",
  "debug": false,
  "parallelPlugin": false,
  "multiDomainLocales": false,
  "i18nModules": []
}

export const normalizedLocales = [
  {
    "code": "ru",
    "iso": "ru-RU",
    "files": []
  },
  {
    "code": "en",
    "iso": "en-US",
    "files": []
  },
  {
    "code": "fr",
    "iso": "fr-FR",
    "files": []
  }
]

export const NUXT_I18N_MODULE_ID = "@nuxtjs/i18n"
export const parallelPlugin = false
export const isSSG = false
export const hasPages = true

export const DEFAULT_DYNAMIC_PARAMS_KEY = "nuxtI18nInternal"
export const DEFAULT_COOKIE_KEY = "i18n_redirected"
export const SWITCH_LOCALE_PATH_LINK_IDENTIFIER = "nuxt-i18n-slp"
