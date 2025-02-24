import type { NavigationGuard } from 'vue-router'
export type MiddlewareKey = "auth" | "content-present" | "guest"
declare module "../../node_modules/.pnpm/nuxt@3.15.4_@parcel+watcher@2.5.1_@types+node@22.13.5_db0@0.2.4_eslint@9.21.0_jiti@2.4.2__ior_dmpbufvxq3ohw2wwfmle2jr5dy/node_modules/nuxt/dist/pages/runtime/composables" {
  interface PageMeta {
    middleware?: MiddlewareKey | NavigationGuard | Array<MiddlewareKey | NavigationGuard>
  }
}
declare module 'nitropack' {
  interface NitroRouteConfig {
    appMiddleware?: MiddlewareKey | MiddlewareKey[] | Record<MiddlewareKey, boolean>
  }
}