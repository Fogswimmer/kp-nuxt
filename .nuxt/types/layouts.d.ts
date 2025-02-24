import type { ComputedRef, MaybeRef } from 'vue'
export type LayoutKey = "default"
declare module "../../node_modules/.pnpm/nuxt@3.15.4_@parcel+watcher@2.5.1_@types+node@22.13.5_db0@0.2.4_eslint@9.21.0_jiti@2.4.2__ior_dmpbufvxq3ohw2wwfmle2jr5dy/node_modules/nuxt/dist/pages/runtime/composables" {
  interface PageMeta {
    layout?: MaybeRef<LayoutKey | false> | ComputedRef<LayoutKey | false>
  }
}