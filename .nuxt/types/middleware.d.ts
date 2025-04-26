import type { NavigationGuard } from 'vue-router'
export type MiddlewareKey = "auth" | "content-present" | "guest" | "validate-reset-token"
declare module "../../node_modules/.pnpm/nuxt@3.16.2_@netlify+blobs@8.2.0_@parcel+watcher@2.5.1_@types+node@22.15.2_db0@0.3.2_en_51307845e002020a716d7c25bb2a0d63/node_modules/nuxt/dist/pages/runtime/composables" {
  interface PageMeta {
    middleware?: MiddlewareKey | NavigationGuard | Array<MiddlewareKey | NavigationGuard>
  }
}