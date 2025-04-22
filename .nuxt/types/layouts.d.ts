import type { ComputedRef, MaybeRef } from 'vue'
export type LayoutKey = "default"
declare module "../../node_modules/.pnpm/nuxt@3.16.2_@parcel+watcher@2.5.1_@types+node@22.14.0_db0@0.3.1_eslint@9.24.0_jiti@2.4._1a120f236ef0f4de29ca0265fec139be/node_modules/nuxt/dist/pages/runtime/composables" {
  interface PageMeta {
    layout?: MaybeRef<LayoutKey | false> | ComputedRef<LayoutKey | false>
  }
}