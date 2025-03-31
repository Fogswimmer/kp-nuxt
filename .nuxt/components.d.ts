
import type { DefineComponent, SlotsType } from 'vue'
type IslandComponent<T extends DefineComponent> = T & DefineComponent<{}, {refresh: () => Promise<void>}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, SlotsType<{ fallback: { error: unknown } }>>
type HydrationStrategies = {
  hydrateOnVisible?: IntersectionObserverInit | true
  hydrateOnIdle?: number | true
  hydrateOnInteraction?: keyof HTMLElementEventMap | Array<keyof HTMLElementEventMap> | true
  hydrateOnMediaQuery?: string
  hydrateAfter?: number
  hydrateWhen?: boolean
  hydrateNever?: true
}
type LazyComponent<T> = (T & DefineComponent<HydrationStrategies, {}, {}, {}, {}, {}, {}, { hydrated: () => void }>)
interface _GlobalComponents {
      'ContainmentBtnsAddBtn': typeof import("../components/Containment/Btns/AddBtn.vue")['default']
    'ContainmentBtnsBackBtn': typeof import("../components/Containment/Btns/BackBtn.vue")['default']
    'ContainmentBtnsCloseBtn': typeof import("../components/Containment/Btns/CloseBtn.vue")['default']
    'ContainmentBtnsExpandBtn': typeof import("../components/Containment/Btns/ExpandBtn.vue")['default']
    'ContainmentBtnsLocaleHandleBtn': typeof import("../components/Containment/Btns/LocaleHandleBtn.vue")['default']
    'ContainmentBtnsScrollTopFab': typeof import("../components/Containment/Btns/ScrollTopFab.vue")['default']
    'ContainmentBtnsSubmitBtn': typeof import("../components/Containment/Btns/SubmitBtn.vue")['default']
    'ContainmentBtnsToggleThemeBtn': typeof import("../components/Containment/Btns/ToggleThemeBtn.vue")['default']
    'ContainmentCardsDetailCard': typeof import("../components/Containment/Cards/DetailCard.vue")['default']
    'ContainmentCardsGradientWrapper': typeof import("../components/Containment/Cards/GradientWrapper.vue")['default']
    'ContainmentCardsPartialsTopInfo': typeof import("../components/Containment/Cards/partials/TopInfo.vue")['default']
    'ContainmentImgErrorPlaceHolder': typeof import("../components/Containment/Img/ErrorPlaceHolder.vue")['default']
    'DialogsBaseDialog': typeof import("../components/Dialogs/BaseDialog.vue")['default']
    'DialogsConfirmDialog': typeof import("../components/Dialogs/ConfirmDialog.vue")['default']
    'FilmPartialsAssessmentComments': typeof import("../components/FilmPartials/Assessment/Comments.vue")['default']
    'FilmPartialsAssessmentRating': typeof import("../components/FilmPartials/Assessment/Rating.vue")['default']
    'FilmPartialsAssessmentComponentsAssessmentGraph': typeof import("../components/FilmPartials/Assessment/components/AssessmentGraph.vue")['default']
    'FilmPartialsAssessmentComponentsComment': typeof import("../components/FilmPartials/Assessment/components/Comment.vue")['default']
    'FilmPartialsDetailMenu': typeof import("../components/FilmPartials/DetailMenu.vue")['default']
    'FilmPartialsFilmExpansionPanels': typeof import("../components/FilmPartials/FilmExpansionPanels.vue")['default']
    'FilmPartialsTrailer': typeof import("../components/FilmPartials/Trailer.vue")['default']
    'FormsAuthUserForm': typeof import("../components/Forms/Auth/UserForm.vue")['default']
    'FormsFilmAssessmentForm': typeof import("../components/Forms/Film/AssessmentForm.vue")['default']
    'FormsFilmForm': typeof import("../components/Forms/Film/FilmForm.vue")['default']
    'FormsFilmTrailerForm': typeof import("../components/Forms/Film/TrailerForm.vue")['default']
    'FormsPersonForm': typeof import("../components/Forms/Person/PersonForm.vue")['default']
    'GalleryFilmGalleryEdit': typeof import("../components/Gallery/FilmGalleryEdit.vue")['default']
    'GalleryFullscreenViewer': typeof import("../components/Gallery/GalleryFullscreenViewer.vue")['default']
    'GalleryUploader': typeof import("../components/Gallery/GalleryUploader.vue")['default']
    'GalleryViewer': typeof import("../components/Gallery/GalleryViewer.vue")['default']
    'GalleryPartialsMultipleImgSelector': typeof import("../components/Gallery/Partials/MultipleImgSelector.vue")['default']
    'GalleryPartialsSingleImgSelector': typeof import("../components/Gallery/Partials/SingleImgSelector.vue")['default']
    'GalleryPersonGalleryEdit': typeof import("../components/Gallery/PersonGalleryEdit.vue")['default']
    'MasonryFilmsMasonryWall': typeof import("../components/Masonry/FilmsMasonryWall.vue")['default']
    'MasonryPopularActorsMasonry': typeof import("../components/Masonry/PopularActorsMasonry.vue")['default']
    'MasonryPartialsMasonryCard': typeof import("../components/Masonry/partials/MasonryCard.vue")['default']
    'MasonryPartialsMasonrySection': typeof import("../components/Masonry/partials/MasonrySection.vue")['default']
    'MiscFilmRatingChip': typeof import("../components/Misc/FilmRatingChip.vue")['default']
    'MiscFilters': typeof import("../components/Misc/Filters.vue")['default']
    'MiscIndentedEditableText': typeof import("../components/Misc/IndentedEditableText.vue")['default']
    'MiscLoadingScreen': typeof import("../components/Misc/LoadingScreen.vue")['default']
    'MiscLogo': typeof import("../components/Misc/Logo.vue")['default']
    'MiscNotAuthWarning': typeof import("../components/Misc/NotAuthWarning.vue")['default']
    'MiscSectionDivider': typeof import("../components/Misc/SectionDivider.vue")['default']
    'MiscSuccessSnackbar': typeof import("../components/Misc/SuccessSnackbar.vue")['default']
    'NavigationAppHeader': typeof import("../components/Navigation/AppHeader.vue")['default']
    'NavigationAppNavDrawerContent': typeof import("../components/Navigation/AppNavDrawerContent.vue")['default']
    'NavigationBottomNav': typeof import("../components/Navigation/BottomNav.vue")['default']
    'NavigationNavBtns': typeof import("../components/Navigation/NavBtns.vue")['default']
    'NavigationProfileNav': typeof import("../components/Navigation/ProfileNav.vue")['default']
    'PersonPartialsFilmography': typeof import("../components/PersonPartials/Filmography.vue")['default']
    'TemplatesEmptyPage': typeof import("../components/Templates/EmptyPage.vue")['default']
    'TemplatesListPage': typeof import("../components/Templates/ListPage.vue")['default']
    'AuthState': typeof import("../node_modules/.pnpm/nuxt-auth-utils@0.5.14_@simplewebauthn+browser@13.1.0_@simplewebauthn+server@13.1.1_magicast@0.3.5/node_modules/nuxt-auth-utils/dist/runtime/app/components/AuthState.vue")['default']
    'NuxtWelcome': typeof import("../node_modules/.pnpm/nuxt@3.16.0_@parcel+watcher@2.5.1_@types+node@22.13.10_db0@0.3.1_eslint@9.22.0_jiti@2.4.2__io_s2oth3agfjxzfv6yc5beyd5qme/node_modules/nuxt/dist/app/components/welcome.vue")['default']
    'NuxtLayout': typeof import("../node_modules/.pnpm/nuxt@3.16.0_@parcel+watcher@2.5.1_@types+node@22.13.10_db0@0.3.1_eslint@9.22.0_jiti@2.4.2__io_s2oth3agfjxzfv6yc5beyd5qme/node_modules/nuxt/dist/app/components/nuxt-layout")['default']
    'NuxtErrorBoundary': typeof import("../node_modules/.pnpm/nuxt@3.16.0_@parcel+watcher@2.5.1_@types+node@22.13.10_db0@0.3.1_eslint@9.22.0_jiti@2.4.2__io_s2oth3agfjxzfv6yc5beyd5qme/node_modules/nuxt/dist/app/components/nuxt-error-boundary")['default']
    'ClientOnly': typeof import("../node_modules/.pnpm/nuxt@3.16.0_@parcel+watcher@2.5.1_@types+node@22.13.10_db0@0.3.1_eslint@9.22.0_jiti@2.4.2__io_s2oth3agfjxzfv6yc5beyd5qme/node_modules/nuxt/dist/app/components/client-only")['default']
    'DevOnly': typeof import("../node_modules/.pnpm/nuxt@3.16.0_@parcel+watcher@2.5.1_@types+node@22.13.10_db0@0.3.1_eslint@9.22.0_jiti@2.4.2__io_s2oth3agfjxzfv6yc5beyd5qme/node_modules/nuxt/dist/app/components/dev-only")['default']
    'ServerPlaceholder': typeof import("../node_modules/.pnpm/nuxt@3.16.0_@parcel+watcher@2.5.1_@types+node@22.13.10_db0@0.3.1_eslint@9.22.0_jiti@2.4.2__io_s2oth3agfjxzfv6yc5beyd5qme/node_modules/nuxt/dist/app/components/server-placeholder")['default']
    'NuxtLink': typeof import("../node_modules/.pnpm/nuxt@3.16.0_@parcel+watcher@2.5.1_@types+node@22.13.10_db0@0.3.1_eslint@9.22.0_jiti@2.4.2__io_s2oth3agfjxzfv6yc5beyd5qme/node_modules/nuxt/dist/app/components/nuxt-link")['default']
    'NuxtLoadingIndicator': typeof import("../node_modules/.pnpm/nuxt@3.16.0_@parcel+watcher@2.5.1_@types+node@22.13.10_db0@0.3.1_eslint@9.22.0_jiti@2.4.2__io_s2oth3agfjxzfv6yc5beyd5qme/node_modules/nuxt/dist/app/components/nuxt-loading-indicator")['default']
    'NuxtRouteAnnouncer': typeof import("../node_modules/.pnpm/nuxt@3.16.0_@parcel+watcher@2.5.1_@types+node@22.13.10_db0@0.3.1_eslint@9.22.0_jiti@2.4.2__io_s2oth3agfjxzfv6yc5beyd5qme/node_modules/nuxt/dist/app/components/nuxt-route-announcer")['default']
    'NuxtImg': typeof import("../node_modules/.pnpm/@nuxt+image@1.9.0_db0@0.3.1_ioredis@5.6.0_magicast@0.3.5/node_modules/@nuxt/image/dist/runtime/components/NuxtImg.vue")['default']
    'NuxtPicture': typeof import("../node_modules/.pnpm/@nuxt+image@1.9.0_db0@0.3.1_ioredis@5.6.0_magicast@0.3.5/node_modules/@nuxt/image/dist/runtime/components/NuxtPicture.vue")['default']
    'NuxtLinkLocale': typeof import("../node_modules/.pnpm/@nuxtjs+i18n@9.3.1_@vue+compiler-dom@3.5.13_eslint@9.22.0_jiti@2.4.2__magicast@0.3.5_rollup@4_gaj2iz5uhrpgepgndx2hgmfi4u/node_modules/@nuxtjs/i18n/dist/runtime/components/NuxtLinkLocale")['default']
    'SwitchLocalePathLink': typeof import("../node_modules/.pnpm/@nuxtjs+i18n@9.3.1_@vue+compiler-dom@3.5.13_eslint@9.22.0_jiti@2.4.2__magicast@0.3.5_rollup@4_gaj2iz5uhrpgepgndx2hgmfi4u/node_modules/@nuxtjs/i18n/dist/runtime/components/SwitchLocalePathLink")['default']
    'NuxtPage': typeof import("../node_modules/.pnpm/nuxt@3.16.0_@parcel+watcher@2.5.1_@types+node@22.13.10_db0@0.3.1_eslint@9.22.0_jiti@2.4.2__io_s2oth3agfjxzfv6yc5beyd5qme/node_modules/nuxt/dist/pages/runtime/page")['default']
    'NoScript': typeof import("../node_modules/.pnpm/nuxt@3.16.0_@parcel+watcher@2.5.1_@types+node@22.13.10_db0@0.3.1_eslint@9.22.0_jiti@2.4.2__io_s2oth3agfjxzfv6yc5beyd5qme/node_modules/nuxt/dist/head/runtime/components")['NoScript']
    'Link': typeof import("../node_modules/.pnpm/nuxt@3.16.0_@parcel+watcher@2.5.1_@types+node@22.13.10_db0@0.3.1_eslint@9.22.0_jiti@2.4.2__io_s2oth3agfjxzfv6yc5beyd5qme/node_modules/nuxt/dist/head/runtime/components")['Link']
    'Base': typeof import("../node_modules/.pnpm/nuxt@3.16.0_@parcel+watcher@2.5.1_@types+node@22.13.10_db0@0.3.1_eslint@9.22.0_jiti@2.4.2__io_s2oth3agfjxzfv6yc5beyd5qme/node_modules/nuxt/dist/head/runtime/components")['Base']
    'Title': typeof import("../node_modules/.pnpm/nuxt@3.16.0_@parcel+watcher@2.5.1_@types+node@22.13.10_db0@0.3.1_eslint@9.22.0_jiti@2.4.2__io_s2oth3agfjxzfv6yc5beyd5qme/node_modules/nuxt/dist/head/runtime/components")['Title']
    'Meta': typeof import("../node_modules/.pnpm/nuxt@3.16.0_@parcel+watcher@2.5.1_@types+node@22.13.10_db0@0.3.1_eslint@9.22.0_jiti@2.4.2__io_s2oth3agfjxzfv6yc5beyd5qme/node_modules/nuxt/dist/head/runtime/components")['Meta']
    'Style': typeof import("../node_modules/.pnpm/nuxt@3.16.0_@parcel+watcher@2.5.1_@types+node@22.13.10_db0@0.3.1_eslint@9.22.0_jiti@2.4.2__io_s2oth3agfjxzfv6yc5beyd5qme/node_modules/nuxt/dist/head/runtime/components")['Style']
    'Head': typeof import("../node_modules/.pnpm/nuxt@3.16.0_@parcel+watcher@2.5.1_@types+node@22.13.10_db0@0.3.1_eslint@9.22.0_jiti@2.4.2__io_s2oth3agfjxzfv6yc5beyd5qme/node_modules/nuxt/dist/head/runtime/components")['Head']
    'Html': typeof import("../node_modules/.pnpm/nuxt@3.16.0_@parcel+watcher@2.5.1_@types+node@22.13.10_db0@0.3.1_eslint@9.22.0_jiti@2.4.2__io_s2oth3agfjxzfv6yc5beyd5qme/node_modules/nuxt/dist/head/runtime/components")['Html']
    'Body': typeof import("../node_modules/.pnpm/nuxt@3.16.0_@parcel+watcher@2.5.1_@types+node@22.13.10_db0@0.3.1_eslint@9.22.0_jiti@2.4.2__io_s2oth3agfjxzfv6yc5beyd5qme/node_modules/nuxt/dist/head/runtime/components")['Body']
    'NuxtIsland': typeof import("../node_modules/.pnpm/nuxt@3.16.0_@parcel+watcher@2.5.1_@types+node@22.13.10_db0@0.3.1_eslint@9.22.0_jiti@2.4.2__io_s2oth3agfjxzfv6yc5beyd5qme/node_modules/nuxt/dist/app/components/nuxt-island")['default']
    'NuxtRouteAnnouncer': IslandComponent<typeof import("../node_modules/.pnpm/nuxt@3.16.0_@parcel+watcher@2.5.1_@types+node@22.13.10_db0@0.3.1_eslint@9.22.0_jiti@2.4.2__io_s2oth3agfjxzfv6yc5beyd5qme/node_modules/nuxt/dist/app/components/server-placeholder")['default']>
      'LazyContainmentBtnsAddBtn': LazyComponent<typeof import("../components/Containment/Btns/AddBtn.vue")['default']>
    'LazyContainmentBtnsBackBtn': LazyComponent<typeof import("../components/Containment/Btns/BackBtn.vue")['default']>
    'LazyContainmentBtnsCloseBtn': LazyComponent<typeof import("../components/Containment/Btns/CloseBtn.vue")['default']>
    'LazyContainmentBtnsExpandBtn': LazyComponent<typeof import("../components/Containment/Btns/ExpandBtn.vue")['default']>
    'LazyContainmentBtnsLocaleHandleBtn': LazyComponent<typeof import("../components/Containment/Btns/LocaleHandleBtn.vue")['default']>
    'LazyContainmentBtnsScrollTopFab': LazyComponent<typeof import("../components/Containment/Btns/ScrollTopFab.vue")['default']>
    'LazyContainmentBtnsSubmitBtn': LazyComponent<typeof import("../components/Containment/Btns/SubmitBtn.vue")['default']>
    'LazyContainmentBtnsToggleThemeBtn': LazyComponent<typeof import("../components/Containment/Btns/ToggleThemeBtn.vue")['default']>
    'LazyContainmentCardsDetailCard': LazyComponent<typeof import("../components/Containment/Cards/DetailCard.vue")['default']>
    'LazyContainmentCardsGradientWrapper': LazyComponent<typeof import("../components/Containment/Cards/GradientWrapper.vue")['default']>
    'LazyContainmentCardsPartialsTopInfo': LazyComponent<typeof import("../components/Containment/Cards/partials/TopInfo.vue")['default']>
    'LazyContainmentImgErrorPlaceHolder': LazyComponent<typeof import("../components/Containment/Img/ErrorPlaceHolder.vue")['default']>
    'LazyDialogsBaseDialog': LazyComponent<typeof import("../components/Dialogs/BaseDialog.vue")['default']>
    'LazyDialogsConfirmDialog': LazyComponent<typeof import("../components/Dialogs/ConfirmDialog.vue")['default']>
    'LazyFilmPartialsAssessmentComments': LazyComponent<typeof import("../components/FilmPartials/Assessment/Comments.vue")['default']>
    'LazyFilmPartialsAssessmentRating': LazyComponent<typeof import("../components/FilmPartials/Assessment/Rating.vue")['default']>
    'LazyFilmPartialsAssessmentComponentsAssessmentGraph': LazyComponent<typeof import("../components/FilmPartials/Assessment/components/AssessmentGraph.vue")['default']>
    'LazyFilmPartialsAssessmentComponentsComment': LazyComponent<typeof import("../components/FilmPartials/Assessment/components/Comment.vue")['default']>
    'LazyFilmPartialsDetailMenu': LazyComponent<typeof import("../components/FilmPartials/DetailMenu.vue")['default']>
    'LazyFilmPartialsFilmExpansionPanels': LazyComponent<typeof import("../components/FilmPartials/FilmExpansionPanels.vue")['default']>
    'LazyFilmPartialsTrailer': LazyComponent<typeof import("../components/FilmPartials/Trailer.vue")['default']>
    'LazyFormsAuthUserForm': LazyComponent<typeof import("../components/Forms/Auth/UserForm.vue")['default']>
    'LazyFormsFilmAssessmentForm': LazyComponent<typeof import("../components/Forms/Film/AssessmentForm.vue")['default']>
    'LazyFormsFilmForm': LazyComponent<typeof import("../components/Forms/Film/FilmForm.vue")['default']>
    'LazyFormsFilmTrailerForm': LazyComponent<typeof import("../components/Forms/Film/TrailerForm.vue")['default']>
    'LazyFormsPersonForm': LazyComponent<typeof import("../components/Forms/Person/PersonForm.vue")['default']>
    'LazyGalleryFilmGalleryEdit': LazyComponent<typeof import("../components/Gallery/FilmGalleryEdit.vue")['default']>
    'LazyGalleryFullscreenViewer': LazyComponent<typeof import("../components/Gallery/GalleryFullscreenViewer.vue")['default']>
    'LazyGalleryUploader': LazyComponent<typeof import("../components/Gallery/GalleryUploader.vue")['default']>
    'LazyGalleryViewer': LazyComponent<typeof import("../components/Gallery/GalleryViewer.vue")['default']>
    'LazyGalleryPartialsMultipleImgSelector': LazyComponent<typeof import("../components/Gallery/Partials/MultipleImgSelector.vue")['default']>
    'LazyGalleryPartialsSingleImgSelector': LazyComponent<typeof import("../components/Gallery/Partials/SingleImgSelector.vue")['default']>
    'LazyGalleryPersonGalleryEdit': LazyComponent<typeof import("../components/Gallery/PersonGalleryEdit.vue")['default']>
    'LazyMasonryFilmsMasonryWall': LazyComponent<typeof import("../components/Masonry/FilmsMasonryWall.vue")['default']>
    'LazyMasonryPopularActorsMasonry': LazyComponent<typeof import("../components/Masonry/PopularActorsMasonry.vue")['default']>
    'LazyMasonryPartialsMasonryCard': LazyComponent<typeof import("../components/Masonry/partials/MasonryCard.vue")['default']>
    'LazyMasonryPartialsMasonrySection': LazyComponent<typeof import("../components/Masonry/partials/MasonrySection.vue")['default']>
    'LazyMiscFilmRatingChip': LazyComponent<typeof import("../components/Misc/FilmRatingChip.vue")['default']>
    'LazyMiscFilters': LazyComponent<typeof import("../components/Misc/Filters.vue")['default']>
    'LazyMiscIndentedEditableText': LazyComponent<typeof import("../components/Misc/IndentedEditableText.vue")['default']>
    'LazyMiscLoadingScreen': LazyComponent<typeof import("../components/Misc/LoadingScreen.vue")['default']>
    'LazyMiscLogo': LazyComponent<typeof import("../components/Misc/Logo.vue")['default']>
    'LazyMiscNotAuthWarning': LazyComponent<typeof import("../components/Misc/NotAuthWarning.vue")['default']>
    'LazyMiscSectionDivider': LazyComponent<typeof import("../components/Misc/SectionDivider.vue")['default']>
    'LazyMiscSuccessSnackbar': LazyComponent<typeof import("../components/Misc/SuccessSnackbar.vue")['default']>
    'LazyNavigationAppHeader': LazyComponent<typeof import("../components/Navigation/AppHeader.vue")['default']>
    'LazyNavigationAppNavDrawerContent': LazyComponent<typeof import("../components/Navigation/AppNavDrawerContent.vue")['default']>
    'LazyNavigationBottomNav': LazyComponent<typeof import("../components/Navigation/BottomNav.vue")['default']>
    'LazyNavigationNavBtns': LazyComponent<typeof import("../components/Navigation/NavBtns.vue")['default']>
    'LazyNavigationProfileNav': LazyComponent<typeof import("../components/Navigation/ProfileNav.vue")['default']>
    'LazyPersonPartialsFilmography': LazyComponent<typeof import("../components/PersonPartials/Filmography.vue")['default']>
    'LazyTemplatesEmptyPage': LazyComponent<typeof import("../components/Templates/EmptyPage.vue")['default']>
    'LazyTemplatesListPage': LazyComponent<typeof import("../components/Templates/ListPage.vue")['default']>
    'LazyAuthState': LazyComponent<typeof import("../node_modules/.pnpm/nuxt-auth-utils@0.5.14_@simplewebauthn+browser@13.1.0_@simplewebauthn+server@13.1.1_magicast@0.3.5/node_modules/nuxt-auth-utils/dist/runtime/app/components/AuthState.vue")['default']>
    'LazyNuxtWelcome': LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.16.0_@parcel+watcher@2.5.1_@types+node@22.13.10_db0@0.3.1_eslint@9.22.0_jiti@2.4.2__io_s2oth3agfjxzfv6yc5beyd5qme/node_modules/nuxt/dist/app/components/welcome.vue")['default']>
    'LazyNuxtLayout': LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.16.0_@parcel+watcher@2.5.1_@types+node@22.13.10_db0@0.3.1_eslint@9.22.0_jiti@2.4.2__io_s2oth3agfjxzfv6yc5beyd5qme/node_modules/nuxt/dist/app/components/nuxt-layout")['default']>
    'LazyNuxtErrorBoundary': LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.16.0_@parcel+watcher@2.5.1_@types+node@22.13.10_db0@0.3.1_eslint@9.22.0_jiti@2.4.2__io_s2oth3agfjxzfv6yc5beyd5qme/node_modules/nuxt/dist/app/components/nuxt-error-boundary")['default']>
    'LazyClientOnly': LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.16.0_@parcel+watcher@2.5.1_@types+node@22.13.10_db0@0.3.1_eslint@9.22.0_jiti@2.4.2__io_s2oth3agfjxzfv6yc5beyd5qme/node_modules/nuxt/dist/app/components/client-only")['default']>
    'LazyDevOnly': LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.16.0_@parcel+watcher@2.5.1_@types+node@22.13.10_db0@0.3.1_eslint@9.22.0_jiti@2.4.2__io_s2oth3agfjxzfv6yc5beyd5qme/node_modules/nuxt/dist/app/components/dev-only")['default']>
    'LazyServerPlaceholder': LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.16.0_@parcel+watcher@2.5.1_@types+node@22.13.10_db0@0.3.1_eslint@9.22.0_jiti@2.4.2__io_s2oth3agfjxzfv6yc5beyd5qme/node_modules/nuxt/dist/app/components/server-placeholder")['default']>
    'LazyNuxtLink': LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.16.0_@parcel+watcher@2.5.1_@types+node@22.13.10_db0@0.3.1_eslint@9.22.0_jiti@2.4.2__io_s2oth3agfjxzfv6yc5beyd5qme/node_modules/nuxt/dist/app/components/nuxt-link")['default']>
    'LazyNuxtLoadingIndicator': LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.16.0_@parcel+watcher@2.5.1_@types+node@22.13.10_db0@0.3.1_eslint@9.22.0_jiti@2.4.2__io_s2oth3agfjxzfv6yc5beyd5qme/node_modules/nuxt/dist/app/components/nuxt-loading-indicator")['default']>
    'LazyNuxtRouteAnnouncer': LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.16.0_@parcel+watcher@2.5.1_@types+node@22.13.10_db0@0.3.1_eslint@9.22.0_jiti@2.4.2__io_s2oth3agfjxzfv6yc5beyd5qme/node_modules/nuxt/dist/app/components/nuxt-route-announcer")['default']>
    'LazyNuxtImg': LazyComponent<typeof import("../node_modules/.pnpm/@nuxt+image@1.9.0_db0@0.3.1_ioredis@5.6.0_magicast@0.3.5/node_modules/@nuxt/image/dist/runtime/components/NuxtImg.vue")['default']>
    'LazyNuxtPicture': LazyComponent<typeof import("../node_modules/.pnpm/@nuxt+image@1.9.0_db0@0.3.1_ioredis@5.6.0_magicast@0.3.5/node_modules/@nuxt/image/dist/runtime/components/NuxtPicture.vue")['default']>
    'LazyNuxtLinkLocale': LazyComponent<typeof import("../node_modules/.pnpm/@nuxtjs+i18n@9.3.1_@vue+compiler-dom@3.5.13_eslint@9.22.0_jiti@2.4.2__magicast@0.3.5_rollup@4_gaj2iz5uhrpgepgndx2hgmfi4u/node_modules/@nuxtjs/i18n/dist/runtime/components/NuxtLinkLocale")['default']>
    'LazySwitchLocalePathLink': LazyComponent<typeof import("../node_modules/.pnpm/@nuxtjs+i18n@9.3.1_@vue+compiler-dom@3.5.13_eslint@9.22.0_jiti@2.4.2__magicast@0.3.5_rollup@4_gaj2iz5uhrpgepgndx2hgmfi4u/node_modules/@nuxtjs/i18n/dist/runtime/components/SwitchLocalePathLink")['default']>
    'LazyNuxtPage': LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.16.0_@parcel+watcher@2.5.1_@types+node@22.13.10_db0@0.3.1_eslint@9.22.0_jiti@2.4.2__io_s2oth3agfjxzfv6yc5beyd5qme/node_modules/nuxt/dist/pages/runtime/page")['default']>
    'LazyNoScript': LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.16.0_@parcel+watcher@2.5.1_@types+node@22.13.10_db0@0.3.1_eslint@9.22.0_jiti@2.4.2__io_s2oth3agfjxzfv6yc5beyd5qme/node_modules/nuxt/dist/head/runtime/components")['NoScript']>
    'LazyLink': LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.16.0_@parcel+watcher@2.5.1_@types+node@22.13.10_db0@0.3.1_eslint@9.22.0_jiti@2.4.2__io_s2oth3agfjxzfv6yc5beyd5qme/node_modules/nuxt/dist/head/runtime/components")['Link']>
    'LazyBase': LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.16.0_@parcel+watcher@2.5.1_@types+node@22.13.10_db0@0.3.1_eslint@9.22.0_jiti@2.4.2__io_s2oth3agfjxzfv6yc5beyd5qme/node_modules/nuxt/dist/head/runtime/components")['Base']>
    'LazyTitle': LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.16.0_@parcel+watcher@2.5.1_@types+node@22.13.10_db0@0.3.1_eslint@9.22.0_jiti@2.4.2__io_s2oth3agfjxzfv6yc5beyd5qme/node_modules/nuxt/dist/head/runtime/components")['Title']>
    'LazyMeta': LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.16.0_@parcel+watcher@2.5.1_@types+node@22.13.10_db0@0.3.1_eslint@9.22.0_jiti@2.4.2__io_s2oth3agfjxzfv6yc5beyd5qme/node_modules/nuxt/dist/head/runtime/components")['Meta']>
    'LazyStyle': LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.16.0_@parcel+watcher@2.5.1_@types+node@22.13.10_db0@0.3.1_eslint@9.22.0_jiti@2.4.2__io_s2oth3agfjxzfv6yc5beyd5qme/node_modules/nuxt/dist/head/runtime/components")['Style']>
    'LazyHead': LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.16.0_@parcel+watcher@2.5.1_@types+node@22.13.10_db0@0.3.1_eslint@9.22.0_jiti@2.4.2__io_s2oth3agfjxzfv6yc5beyd5qme/node_modules/nuxt/dist/head/runtime/components")['Head']>
    'LazyHtml': LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.16.0_@parcel+watcher@2.5.1_@types+node@22.13.10_db0@0.3.1_eslint@9.22.0_jiti@2.4.2__io_s2oth3agfjxzfv6yc5beyd5qme/node_modules/nuxt/dist/head/runtime/components")['Html']>
    'LazyBody': LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.16.0_@parcel+watcher@2.5.1_@types+node@22.13.10_db0@0.3.1_eslint@9.22.0_jiti@2.4.2__io_s2oth3agfjxzfv6yc5beyd5qme/node_modules/nuxt/dist/head/runtime/components")['Body']>
    'LazyNuxtIsland': LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.16.0_@parcel+watcher@2.5.1_@types+node@22.13.10_db0@0.3.1_eslint@9.22.0_jiti@2.4.2__io_s2oth3agfjxzfv6yc5beyd5qme/node_modules/nuxt/dist/app/components/nuxt-island")['default']>
    'LazyNuxtRouteAnnouncer': LazyComponent<IslandComponent<typeof import("../node_modules/.pnpm/nuxt@3.16.0_@parcel+watcher@2.5.1_@types+node@22.13.10_db0@0.3.1_eslint@9.22.0_jiti@2.4.2__io_s2oth3agfjxzfv6yc5beyd5qme/node_modules/nuxt/dist/app/components/server-placeholder")['default']>>
}

declare module 'vue' {
  export interface GlobalComponents extends _GlobalComponents { }
}

export const ContainmentBtnsAddBtn: typeof import("../components/Containment/Btns/AddBtn.vue")['default']
export const ContainmentBtnsBackBtn: typeof import("../components/Containment/Btns/BackBtn.vue")['default']
export const ContainmentBtnsCloseBtn: typeof import("../components/Containment/Btns/CloseBtn.vue")['default']
export const ContainmentBtnsExpandBtn: typeof import("../components/Containment/Btns/ExpandBtn.vue")['default']
export const ContainmentBtnsLocaleHandleBtn: typeof import("../components/Containment/Btns/LocaleHandleBtn.vue")['default']
export const ContainmentBtnsScrollTopFab: typeof import("../components/Containment/Btns/ScrollTopFab.vue")['default']
export const ContainmentBtnsSubmitBtn: typeof import("../components/Containment/Btns/SubmitBtn.vue")['default']
export const ContainmentBtnsToggleThemeBtn: typeof import("../components/Containment/Btns/ToggleThemeBtn.vue")['default']
export const ContainmentCardsDetailCard: typeof import("../components/Containment/Cards/DetailCard.vue")['default']
export const ContainmentCardsGradientWrapper: typeof import("../components/Containment/Cards/GradientWrapper.vue")['default']
export const ContainmentCardsPartialsTopInfo: typeof import("../components/Containment/Cards/partials/TopInfo.vue")['default']
export const ContainmentImgErrorPlaceHolder: typeof import("../components/Containment/Img/ErrorPlaceHolder.vue")['default']
export const DialogsBaseDialog: typeof import("../components/Dialogs/BaseDialog.vue")['default']
export const DialogsConfirmDialog: typeof import("../components/Dialogs/ConfirmDialog.vue")['default']
export const FilmPartialsAssessmentComments: typeof import("../components/FilmPartials/Assessment/Comments.vue")['default']
export const FilmPartialsAssessmentRating: typeof import("../components/FilmPartials/Assessment/Rating.vue")['default']
export const FilmPartialsAssessmentComponentsAssessmentGraph: typeof import("../components/FilmPartials/Assessment/components/AssessmentGraph.vue")['default']
export const FilmPartialsAssessmentComponentsComment: typeof import("../components/FilmPartials/Assessment/components/Comment.vue")['default']
export const FilmPartialsDetailMenu: typeof import("../components/FilmPartials/DetailMenu.vue")['default']
export const FilmPartialsFilmExpansionPanels: typeof import("../components/FilmPartials/FilmExpansionPanels.vue")['default']
export const FilmPartialsTrailer: typeof import("../components/FilmPartials/Trailer.vue")['default']
export const FormsAuthUserForm: typeof import("../components/Forms/Auth/UserForm.vue")['default']
export const FormsFilmAssessmentForm: typeof import("../components/Forms/Film/AssessmentForm.vue")['default']
export const FormsFilmForm: typeof import("../components/Forms/Film/FilmForm.vue")['default']
export const FormsFilmTrailerForm: typeof import("../components/Forms/Film/TrailerForm.vue")['default']
export const FormsPersonForm: typeof import("../components/Forms/Person/PersonForm.vue")['default']
export const GalleryFilmGalleryEdit: typeof import("../components/Gallery/FilmGalleryEdit.vue")['default']
export const GalleryFullscreenViewer: typeof import("../components/Gallery/GalleryFullscreenViewer.vue")['default']
export const GalleryUploader: typeof import("../components/Gallery/GalleryUploader.vue")['default']
export const GalleryViewer: typeof import("../components/Gallery/GalleryViewer.vue")['default']
export const GalleryPartialsMultipleImgSelector: typeof import("../components/Gallery/Partials/MultipleImgSelector.vue")['default']
export const GalleryPartialsSingleImgSelector: typeof import("../components/Gallery/Partials/SingleImgSelector.vue")['default']
export const GalleryPersonGalleryEdit: typeof import("../components/Gallery/PersonGalleryEdit.vue")['default']
export const MasonryFilmsMasonryWall: typeof import("../components/Masonry/FilmsMasonryWall.vue")['default']
export const MasonryPopularActorsMasonry: typeof import("../components/Masonry/PopularActorsMasonry.vue")['default']
export const MasonryPartialsMasonryCard: typeof import("../components/Masonry/partials/MasonryCard.vue")['default']
export const MasonryPartialsMasonrySection: typeof import("../components/Masonry/partials/MasonrySection.vue")['default']
export const MiscFilmRatingChip: typeof import("../components/Misc/FilmRatingChip.vue")['default']
export const MiscFilters: typeof import("../components/Misc/Filters.vue")['default']
export const MiscIndentedEditableText: typeof import("../components/Misc/IndentedEditableText.vue")['default']
export const MiscLoadingScreen: typeof import("../components/Misc/LoadingScreen.vue")['default']
export const MiscLogo: typeof import("../components/Misc/Logo.vue")['default']
export const MiscNotAuthWarning: typeof import("../components/Misc/NotAuthWarning.vue")['default']
export const MiscSectionDivider: typeof import("../components/Misc/SectionDivider.vue")['default']
export const MiscSuccessSnackbar: typeof import("../components/Misc/SuccessSnackbar.vue")['default']
export const NavigationAppHeader: typeof import("../components/Navigation/AppHeader.vue")['default']
export const NavigationAppNavDrawerContent: typeof import("../components/Navigation/AppNavDrawerContent.vue")['default']
export const NavigationBottomNav: typeof import("../components/Navigation/BottomNav.vue")['default']
export const NavigationNavBtns: typeof import("../components/Navigation/NavBtns.vue")['default']
export const NavigationProfileNav: typeof import("../components/Navigation/ProfileNav.vue")['default']
export const PersonPartialsFilmography: typeof import("../components/PersonPartials/Filmography.vue")['default']
export const TemplatesEmptyPage: typeof import("../components/Templates/EmptyPage.vue")['default']
export const TemplatesListPage: typeof import("../components/Templates/ListPage.vue")['default']
export const AuthState: typeof import("../node_modules/.pnpm/nuxt-auth-utils@0.5.14_@simplewebauthn+browser@13.1.0_@simplewebauthn+server@13.1.1_magicast@0.3.5/node_modules/nuxt-auth-utils/dist/runtime/app/components/AuthState.vue")['default']
export const NuxtWelcome: typeof import("../node_modules/.pnpm/nuxt@3.16.0_@parcel+watcher@2.5.1_@types+node@22.13.10_db0@0.3.1_eslint@9.22.0_jiti@2.4.2__io_s2oth3agfjxzfv6yc5beyd5qme/node_modules/nuxt/dist/app/components/welcome.vue")['default']
export const NuxtLayout: typeof import("../node_modules/.pnpm/nuxt@3.16.0_@parcel+watcher@2.5.1_@types+node@22.13.10_db0@0.3.1_eslint@9.22.0_jiti@2.4.2__io_s2oth3agfjxzfv6yc5beyd5qme/node_modules/nuxt/dist/app/components/nuxt-layout")['default']
export const NuxtErrorBoundary: typeof import("../node_modules/.pnpm/nuxt@3.16.0_@parcel+watcher@2.5.1_@types+node@22.13.10_db0@0.3.1_eslint@9.22.0_jiti@2.4.2__io_s2oth3agfjxzfv6yc5beyd5qme/node_modules/nuxt/dist/app/components/nuxt-error-boundary")['default']
export const ClientOnly: typeof import("../node_modules/.pnpm/nuxt@3.16.0_@parcel+watcher@2.5.1_@types+node@22.13.10_db0@0.3.1_eslint@9.22.0_jiti@2.4.2__io_s2oth3agfjxzfv6yc5beyd5qme/node_modules/nuxt/dist/app/components/client-only")['default']
export const DevOnly: typeof import("../node_modules/.pnpm/nuxt@3.16.0_@parcel+watcher@2.5.1_@types+node@22.13.10_db0@0.3.1_eslint@9.22.0_jiti@2.4.2__io_s2oth3agfjxzfv6yc5beyd5qme/node_modules/nuxt/dist/app/components/dev-only")['default']
export const ServerPlaceholder: typeof import("../node_modules/.pnpm/nuxt@3.16.0_@parcel+watcher@2.5.1_@types+node@22.13.10_db0@0.3.1_eslint@9.22.0_jiti@2.4.2__io_s2oth3agfjxzfv6yc5beyd5qme/node_modules/nuxt/dist/app/components/server-placeholder")['default']
export const NuxtLink: typeof import("../node_modules/.pnpm/nuxt@3.16.0_@parcel+watcher@2.5.1_@types+node@22.13.10_db0@0.3.1_eslint@9.22.0_jiti@2.4.2__io_s2oth3agfjxzfv6yc5beyd5qme/node_modules/nuxt/dist/app/components/nuxt-link")['default']
export const NuxtLoadingIndicator: typeof import("../node_modules/.pnpm/nuxt@3.16.0_@parcel+watcher@2.5.1_@types+node@22.13.10_db0@0.3.1_eslint@9.22.0_jiti@2.4.2__io_s2oth3agfjxzfv6yc5beyd5qme/node_modules/nuxt/dist/app/components/nuxt-loading-indicator")['default']
export const NuxtRouteAnnouncer: typeof import("../node_modules/.pnpm/nuxt@3.16.0_@parcel+watcher@2.5.1_@types+node@22.13.10_db0@0.3.1_eslint@9.22.0_jiti@2.4.2__io_s2oth3agfjxzfv6yc5beyd5qme/node_modules/nuxt/dist/app/components/nuxt-route-announcer")['default']
export const NuxtImg: typeof import("../node_modules/.pnpm/@nuxt+image@1.9.0_db0@0.3.1_ioredis@5.6.0_magicast@0.3.5/node_modules/@nuxt/image/dist/runtime/components/NuxtImg.vue")['default']
export const NuxtPicture: typeof import("../node_modules/.pnpm/@nuxt+image@1.9.0_db0@0.3.1_ioredis@5.6.0_magicast@0.3.5/node_modules/@nuxt/image/dist/runtime/components/NuxtPicture.vue")['default']
export const NuxtLinkLocale: typeof import("../node_modules/.pnpm/@nuxtjs+i18n@9.3.1_@vue+compiler-dom@3.5.13_eslint@9.22.0_jiti@2.4.2__magicast@0.3.5_rollup@4_gaj2iz5uhrpgepgndx2hgmfi4u/node_modules/@nuxtjs/i18n/dist/runtime/components/NuxtLinkLocale")['default']
export const SwitchLocalePathLink: typeof import("../node_modules/.pnpm/@nuxtjs+i18n@9.3.1_@vue+compiler-dom@3.5.13_eslint@9.22.0_jiti@2.4.2__magicast@0.3.5_rollup@4_gaj2iz5uhrpgepgndx2hgmfi4u/node_modules/@nuxtjs/i18n/dist/runtime/components/SwitchLocalePathLink")['default']
export const NuxtPage: typeof import("../node_modules/.pnpm/nuxt@3.16.0_@parcel+watcher@2.5.1_@types+node@22.13.10_db0@0.3.1_eslint@9.22.0_jiti@2.4.2__io_s2oth3agfjxzfv6yc5beyd5qme/node_modules/nuxt/dist/pages/runtime/page")['default']
export const NoScript: typeof import("../node_modules/.pnpm/nuxt@3.16.0_@parcel+watcher@2.5.1_@types+node@22.13.10_db0@0.3.1_eslint@9.22.0_jiti@2.4.2__io_s2oth3agfjxzfv6yc5beyd5qme/node_modules/nuxt/dist/head/runtime/components")['NoScript']
export const Link: typeof import("../node_modules/.pnpm/nuxt@3.16.0_@parcel+watcher@2.5.1_@types+node@22.13.10_db0@0.3.1_eslint@9.22.0_jiti@2.4.2__io_s2oth3agfjxzfv6yc5beyd5qme/node_modules/nuxt/dist/head/runtime/components")['Link']
export const Base: typeof import("../node_modules/.pnpm/nuxt@3.16.0_@parcel+watcher@2.5.1_@types+node@22.13.10_db0@0.3.1_eslint@9.22.0_jiti@2.4.2__io_s2oth3agfjxzfv6yc5beyd5qme/node_modules/nuxt/dist/head/runtime/components")['Base']
export const Title: typeof import("../node_modules/.pnpm/nuxt@3.16.0_@parcel+watcher@2.5.1_@types+node@22.13.10_db0@0.3.1_eslint@9.22.0_jiti@2.4.2__io_s2oth3agfjxzfv6yc5beyd5qme/node_modules/nuxt/dist/head/runtime/components")['Title']
export const Meta: typeof import("../node_modules/.pnpm/nuxt@3.16.0_@parcel+watcher@2.5.1_@types+node@22.13.10_db0@0.3.1_eslint@9.22.0_jiti@2.4.2__io_s2oth3agfjxzfv6yc5beyd5qme/node_modules/nuxt/dist/head/runtime/components")['Meta']
export const Style: typeof import("../node_modules/.pnpm/nuxt@3.16.0_@parcel+watcher@2.5.1_@types+node@22.13.10_db0@0.3.1_eslint@9.22.0_jiti@2.4.2__io_s2oth3agfjxzfv6yc5beyd5qme/node_modules/nuxt/dist/head/runtime/components")['Style']
export const Head: typeof import("../node_modules/.pnpm/nuxt@3.16.0_@parcel+watcher@2.5.1_@types+node@22.13.10_db0@0.3.1_eslint@9.22.0_jiti@2.4.2__io_s2oth3agfjxzfv6yc5beyd5qme/node_modules/nuxt/dist/head/runtime/components")['Head']
export const Html: typeof import("../node_modules/.pnpm/nuxt@3.16.0_@parcel+watcher@2.5.1_@types+node@22.13.10_db0@0.3.1_eslint@9.22.0_jiti@2.4.2__io_s2oth3agfjxzfv6yc5beyd5qme/node_modules/nuxt/dist/head/runtime/components")['Html']
export const Body: typeof import("../node_modules/.pnpm/nuxt@3.16.0_@parcel+watcher@2.5.1_@types+node@22.13.10_db0@0.3.1_eslint@9.22.0_jiti@2.4.2__io_s2oth3agfjxzfv6yc5beyd5qme/node_modules/nuxt/dist/head/runtime/components")['Body']
export const NuxtIsland: typeof import("../node_modules/.pnpm/nuxt@3.16.0_@parcel+watcher@2.5.1_@types+node@22.13.10_db0@0.3.1_eslint@9.22.0_jiti@2.4.2__io_s2oth3agfjxzfv6yc5beyd5qme/node_modules/nuxt/dist/app/components/nuxt-island")['default']
export const NuxtRouteAnnouncer: IslandComponent<typeof import("../node_modules/.pnpm/nuxt@3.16.0_@parcel+watcher@2.5.1_@types+node@22.13.10_db0@0.3.1_eslint@9.22.0_jiti@2.4.2__io_s2oth3agfjxzfv6yc5beyd5qme/node_modules/nuxt/dist/app/components/server-placeholder")['default']>
export const LazyContainmentBtnsAddBtn: LazyComponent<typeof import("../components/Containment/Btns/AddBtn.vue")['default']>
export const LazyContainmentBtnsBackBtn: LazyComponent<typeof import("../components/Containment/Btns/BackBtn.vue")['default']>
export const LazyContainmentBtnsCloseBtn: LazyComponent<typeof import("../components/Containment/Btns/CloseBtn.vue")['default']>
export const LazyContainmentBtnsExpandBtn: LazyComponent<typeof import("../components/Containment/Btns/ExpandBtn.vue")['default']>
export const LazyContainmentBtnsLocaleHandleBtn: LazyComponent<typeof import("../components/Containment/Btns/LocaleHandleBtn.vue")['default']>
export const LazyContainmentBtnsScrollTopFab: LazyComponent<typeof import("../components/Containment/Btns/ScrollTopFab.vue")['default']>
export const LazyContainmentBtnsSubmitBtn: LazyComponent<typeof import("../components/Containment/Btns/SubmitBtn.vue")['default']>
export const LazyContainmentBtnsToggleThemeBtn: LazyComponent<typeof import("../components/Containment/Btns/ToggleThemeBtn.vue")['default']>
export const LazyContainmentCardsDetailCard: LazyComponent<typeof import("../components/Containment/Cards/DetailCard.vue")['default']>
export const LazyContainmentCardsGradientWrapper: LazyComponent<typeof import("../components/Containment/Cards/GradientWrapper.vue")['default']>
export const LazyContainmentCardsPartialsTopInfo: LazyComponent<typeof import("../components/Containment/Cards/partials/TopInfo.vue")['default']>
export const LazyContainmentImgErrorPlaceHolder: LazyComponent<typeof import("../components/Containment/Img/ErrorPlaceHolder.vue")['default']>
export const LazyDialogsBaseDialog: LazyComponent<typeof import("../components/Dialogs/BaseDialog.vue")['default']>
export const LazyDialogsConfirmDialog: LazyComponent<typeof import("../components/Dialogs/ConfirmDialog.vue")['default']>
export const LazyFilmPartialsAssessmentComments: LazyComponent<typeof import("../components/FilmPartials/Assessment/Comments.vue")['default']>
export const LazyFilmPartialsAssessmentRating: LazyComponent<typeof import("../components/FilmPartials/Assessment/Rating.vue")['default']>
export const LazyFilmPartialsAssessmentComponentsAssessmentGraph: LazyComponent<typeof import("../components/FilmPartials/Assessment/components/AssessmentGraph.vue")['default']>
export const LazyFilmPartialsAssessmentComponentsComment: LazyComponent<typeof import("../components/FilmPartials/Assessment/components/Comment.vue")['default']>
export const LazyFilmPartialsDetailMenu: LazyComponent<typeof import("../components/FilmPartials/DetailMenu.vue")['default']>
export const LazyFilmPartialsFilmExpansionPanels: LazyComponent<typeof import("../components/FilmPartials/FilmExpansionPanels.vue")['default']>
export const LazyFilmPartialsTrailer: LazyComponent<typeof import("../components/FilmPartials/Trailer.vue")['default']>
export const LazyFormsAuthUserForm: LazyComponent<typeof import("../components/Forms/Auth/UserForm.vue")['default']>
export const LazyFormsFilmAssessmentForm: LazyComponent<typeof import("../components/Forms/Film/AssessmentForm.vue")['default']>
export const LazyFormsFilmForm: LazyComponent<typeof import("../components/Forms/Film/FilmForm.vue")['default']>
export const LazyFormsFilmTrailerForm: LazyComponent<typeof import("../components/Forms/Film/TrailerForm.vue")['default']>
export const LazyFormsPersonForm: LazyComponent<typeof import("../components/Forms/Person/PersonForm.vue")['default']>
export const LazyGalleryFilmGalleryEdit: LazyComponent<typeof import("../components/Gallery/FilmGalleryEdit.vue")['default']>
export const LazyGalleryFullscreenViewer: LazyComponent<typeof import("../components/Gallery/GalleryFullscreenViewer.vue")['default']>
export const LazyGalleryUploader: LazyComponent<typeof import("../components/Gallery/GalleryUploader.vue")['default']>
export const LazyGalleryViewer: LazyComponent<typeof import("../components/Gallery/GalleryViewer.vue")['default']>
export const LazyGalleryPartialsMultipleImgSelector: LazyComponent<typeof import("../components/Gallery/Partials/MultipleImgSelector.vue")['default']>
export const LazyGalleryPartialsSingleImgSelector: LazyComponent<typeof import("../components/Gallery/Partials/SingleImgSelector.vue")['default']>
export const LazyGalleryPersonGalleryEdit: LazyComponent<typeof import("../components/Gallery/PersonGalleryEdit.vue")['default']>
export const LazyMasonryFilmsMasonryWall: LazyComponent<typeof import("../components/Masonry/FilmsMasonryWall.vue")['default']>
export const LazyMasonryPopularActorsMasonry: LazyComponent<typeof import("../components/Masonry/PopularActorsMasonry.vue")['default']>
export const LazyMasonryPartialsMasonryCard: LazyComponent<typeof import("../components/Masonry/partials/MasonryCard.vue")['default']>
export const LazyMasonryPartialsMasonrySection: LazyComponent<typeof import("../components/Masonry/partials/MasonrySection.vue")['default']>
export const LazyMiscFilmRatingChip: LazyComponent<typeof import("../components/Misc/FilmRatingChip.vue")['default']>
export const LazyMiscFilters: LazyComponent<typeof import("../components/Misc/Filters.vue")['default']>
export const LazyMiscIndentedEditableText: LazyComponent<typeof import("../components/Misc/IndentedEditableText.vue")['default']>
export const LazyMiscLoadingScreen: LazyComponent<typeof import("../components/Misc/LoadingScreen.vue")['default']>
export const LazyMiscLogo: LazyComponent<typeof import("../components/Misc/Logo.vue")['default']>
export const LazyMiscNotAuthWarning: LazyComponent<typeof import("../components/Misc/NotAuthWarning.vue")['default']>
export const LazyMiscSectionDivider: LazyComponent<typeof import("../components/Misc/SectionDivider.vue")['default']>
export const LazyMiscSuccessSnackbar: LazyComponent<typeof import("../components/Misc/SuccessSnackbar.vue")['default']>
export const LazyNavigationAppHeader: LazyComponent<typeof import("../components/Navigation/AppHeader.vue")['default']>
export const LazyNavigationAppNavDrawerContent: LazyComponent<typeof import("../components/Navigation/AppNavDrawerContent.vue")['default']>
export const LazyNavigationBottomNav: LazyComponent<typeof import("../components/Navigation/BottomNav.vue")['default']>
export const LazyNavigationNavBtns: LazyComponent<typeof import("../components/Navigation/NavBtns.vue")['default']>
export const LazyNavigationProfileNav: LazyComponent<typeof import("../components/Navigation/ProfileNav.vue")['default']>
export const LazyPersonPartialsFilmography: LazyComponent<typeof import("../components/PersonPartials/Filmography.vue")['default']>
export const LazyTemplatesEmptyPage: LazyComponent<typeof import("../components/Templates/EmptyPage.vue")['default']>
export const LazyTemplatesListPage: LazyComponent<typeof import("../components/Templates/ListPage.vue")['default']>
export const LazyAuthState: LazyComponent<typeof import("../node_modules/.pnpm/nuxt-auth-utils@0.5.14_@simplewebauthn+browser@13.1.0_@simplewebauthn+server@13.1.1_magicast@0.3.5/node_modules/nuxt-auth-utils/dist/runtime/app/components/AuthState.vue")['default']>
export const LazyNuxtWelcome: LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.16.0_@parcel+watcher@2.5.1_@types+node@22.13.10_db0@0.3.1_eslint@9.22.0_jiti@2.4.2__io_s2oth3agfjxzfv6yc5beyd5qme/node_modules/nuxt/dist/app/components/welcome.vue")['default']>
export const LazyNuxtLayout: LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.16.0_@parcel+watcher@2.5.1_@types+node@22.13.10_db0@0.3.1_eslint@9.22.0_jiti@2.4.2__io_s2oth3agfjxzfv6yc5beyd5qme/node_modules/nuxt/dist/app/components/nuxt-layout")['default']>
export const LazyNuxtErrorBoundary: LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.16.0_@parcel+watcher@2.5.1_@types+node@22.13.10_db0@0.3.1_eslint@9.22.0_jiti@2.4.2__io_s2oth3agfjxzfv6yc5beyd5qme/node_modules/nuxt/dist/app/components/nuxt-error-boundary")['default']>
export const LazyClientOnly: LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.16.0_@parcel+watcher@2.5.1_@types+node@22.13.10_db0@0.3.1_eslint@9.22.0_jiti@2.4.2__io_s2oth3agfjxzfv6yc5beyd5qme/node_modules/nuxt/dist/app/components/client-only")['default']>
export const LazyDevOnly: LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.16.0_@parcel+watcher@2.5.1_@types+node@22.13.10_db0@0.3.1_eslint@9.22.0_jiti@2.4.2__io_s2oth3agfjxzfv6yc5beyd5qme/node_modules/nuxt/dist/app/components/dev-only")['default']>
export const LazyServerPlaceholder: LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.16.0_@parcel+watcher@2.5.1_@types+node@22.13.10_db0@0.3.1_eslint@9.22.0_jiti@2.4.2__io_s2oth3agfjxzfv6yc5beyd5qme/node_modules/nuxt/dist/app/components/server-placeholder")['default']>
export const LazyNuxtLink: LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.16.0_@parcel+watcher@2.5.1_@types+node@22.13.10_db0@0.3.1_eslint@9.22.0_jiti@2.4.2__io_s2oth3agfjxzfv6yc5beyd5qme/node_modules/nuxt/dist/app/components/nuxt-link")['default']>
export const LazyNuxtLoadingIndicator: LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.16.0_@parcel+watcher@2.5.1_@types+node@22.13.10_db0@0.3.1_eslint@9.22.0_jiti@2.4.2__io_s2oth3agfjxzfv6yc5beyd5qme/node_modules/nuxt/dist/app/components/nuxt-loading-indicator")['default']>
export const LazyNuxtRouteAnnouncer: LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.16.0_@parcel+watcher@2.5.1_@types+node@22.13.10_db0@0.3.1_eslint@9.22.0_jiti@2.4.2__io_s2oth3agfjxzfv6yc5beyd5qme/node_modules/nuxt/dist/app/components/nuxt-route-announcer")['default']>
export const LazyNuxtImg: LazyComponent<typeof import("../node_modules/.pnpm/@nuxt+image@1.9.0_db0@0.3.1_ioredis@5.6.0_magicast@0.3.5/node_modules/@nuxt/image/dist/runtime/components/NuxtImg.vue")['default']>
export const LazyNuxtPicture: LazyComponent<typeof import("../node_modules/.pnpm/@nuxt+image@1.9.0_db0@0.3.1_ioredis@5.6.0_magicast@0.3.5/node_modules/@nuxt/image/dist/runtime/components/NuxtPicture.vue")['default']>
export const LazyNuxtLinkLocale: LazyComponent<typeof import("../node_modules/.pnpm/@nuxtjs+i18n@9.3.1_@vue+compiler-dom@3.5.13_eslint@9.22.0_jiti@2.4.2__magicast@0.3.5_rollup@4_gaj2iz5uhrpgepgndx2hgmfi4u/node_modules/@nuxtjs/i18n/dist/runtime/components/NuxtLinkLocale")['default']>
export const LazySwitchLocalePathLink: LazyComponent<typeof import("../node_modules/.pnpm/@nuxtjs+i18n@9.3.1_@vue+compiler-dom@3.5.13_eslint@9.22.0_jiti@2.4.2__magicast@0.3.5_rollup@4_gaj2iz5uhrpgepgndx2hgmfi4u/node_modules/@nuxtjs/i18n/dist/runtime/components/SwitchLocalePathLink")['default']>
export const LazyNuxtPage: LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.16.0_@parcel+watcher@2.5.1_@types+node@22.13.10_db0@0.3.1_eslint@9.22.0_jiti@2.4.2__io_s2oth3agfjxzfv6yc5beyd5qme/node_modules/nuxt/dist/pages/runtime/page")['default']>
export const LazyNoScript: LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.16.0_@parcel+watcher@2.5.1_@types+node@22.13.10_db0@0.3.1_eslint@9.22.0_jiti@2.4.2__io_s2oth3agfjxzfv6yc5beyd5qme/node_modules/nuxt/dist/head/runtime/components")['NoScript']>
export const LazyLink: LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.16.0_@parcel+watcher@2.5.1_@types+node@22.13.10_db0@0.3.1_eslint@9.22.0_jiti@2.4.2__io_s2oth3agfjxzfv6yc5beyd5qme/node_modules/nuxt/dist/head/runtime/components")['Link']>
export const LazyBase: LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.16.0_@parcel+watcher@2.5.1_@types+node@22.13.10_db0@0.3.1_eslint@9.22.0_jiti@2.4.2__io_s2oth3agfjxzfv6yc5beyd5qme/node_modules/nuxt/dist/head/runtime/components")['Base']>
export const LazyTitle: LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.16.0_@parcel+watcher@2.5.1_@types+node@22.13.10_db0@0.3.1_eslint@9.22.0_jiti@2.4.2__io_s2oth3agfjxzfv6yc5beyd5qme/node_modules/nuxt/dist/head/runtime/components")['Title']>
export const LazyMeta: LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.16.0_@parcel+watcher@2.5.1_@types+node@22.13.10_db0@0.3.1_eslint@9.22.0_jiti@2.4.2__io_s2oth3agfjxzfv6yc5beyd5qme/node_modules/nuxt/dist/head/runtime/components")['Meta']>
export const LazyStyle: LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.16.0_@parcel+watcher@2.5.1_@types+node@22.13.10_db0@0.3.1_eslint@9.22.0_jiti@2.4.2__io_s2oth3agfjxzfv6yc5beyd5qme/node_modules/nuxt/dist/head/runtime/components")['Style']>
export const LazyHead: LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.16.0_@parcel+watcher@2.5.1_@types+node@22.13.10_db0@0.3.1_eslint@9.22.0_jiti@2.4.2__io_s2oth3agfjxzfv6yc5beyd5qme/node_modules/nuxt/dist/head/runtime/components")['Head']>
export const LazyHtml: LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.16.0_@parcel+watcher@2.5.1_@types+node@22.13.10_db0@0.3.1_eslint@9.22.0_jiti@2.4.2__io_s2oth3agfjxzfv6yc5beyd5qme/node_modules/nuxt/dist/head/runtime/components")['Html']>
export const LazyBody: LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.16.0_@parcel+watcher@2.5.1_@types+node@22.13.10_db0@0.3.1_eslint@9.22.0_jiti@2.4.2__io_s2oth3agfjxzfv6yc5beyd5qme/node_modules/nuxt/dist/head/runtime/components")['Body']>
export const LazyNuxtIsland: LazyComponent<typeof import("../node_modules/.pnpm/nuxt@3.16.0_@parcel+watcher@2.5.1_@types+node@22.13.10_db0@0.3.1_eslint@9.22.0_jiti@2.4.2__io_s2oth3agfjxzfv6yc5beyd5qme/node_modules/nuxt/dist/app/components/nuxt-island")['default']>
export const LazyNuxtRouteAnnouncer: LazyComponent<IslandComponent<typeof import("../node_modules/.pnpm/nuxt@3.16.0_@parcel+watcher@2.5.1_@types+node@22.13.10_db0@0.3.1_eslint@9.22.0_jiti@2.4.2__io_s2oth3agfjxzfv6yc5beyd5qme/node_modules/nuxt/dist/app/components/server-placeholder")['default']>>

export const componentNames: string[]
