<template>
    <div>
        <Head>
            <Title>{{ definePageTitle(film?.name || '') }}</Title>
            <Meta name="description" :content="film?.description" />
        </Head>
        <NuxtLayout v-if="$vuetify.display.mdAndUp" name="right-drawer">
            <SimilarGenreFilms
                :films="filmsWithSimilarGenres"
                :loading="loading"
            />
        </NuxtLayout>

        <NuxtLayout name="detail">
            <v-app-bar order="1">
                <template #prepend>
                    <BackBtn v-if="$vuetify.display.smAndDown" />
                </template>
                <v-app-bar-title>
                    <span
                        v-if="!loading && $vuetify.display.smAndDown"
                        class="font-weight-bold"
                    >
                        {{
                            getName(
                                film?.name || '',
                                film?.internationalName || ''
                            )
                        }}
                    </span>

                    <v-breadcrumbs
                        v-if="!loading && $vuetify.display.mdAndUp"
                        :items="breadCrumbs"
                    />
                </v-app-bar-title>
                <div
                    v-if="$vuetify.display.mdAndUp && !isAuthenticated"
                    class="d-flex justify-center pa-2"
                >
                    <NotAuthWarning />
                </div>
                <FilmDetailMenu
                    :is-authenticated="isAuthenticated"
                    @edit:general="handleGeneralInfoEdit"
                    @edit:description="handleEditDescription"
                    @edit:gallery="openGalleryEditor"
                    @edit:trailer="showLinkTrailerDialog = true"
                    @delete:film="showDeleteWarning = true"
                />
            </v-app-bar>
            <DetailCard :loading="loading" no-cover>
                <template #publisher-info>
                    <v-chip size="small">
                        <div class="d-flex ga-2">
                            <span>{{ $t('general.published_by') }}:</span>
                            <nuxt-link class="text-secondary">{{
                                film?.publisherData
                                    ? film?.publisherData.name
                                    : ''
                            }}</nuxt-link>
                            <span>{{
                                dateFormatter(film?.createdAt || '')
                            }}</span>
                        </div>
                    </v-chip>
                </template>
                <template #top_film>
                    <v-container fluid>
                        <v-card v-if="!loading" class="pa-2" flat>
                            <v-row>
                                <v-col v-bind="colParams.poster">
                                    <v-img
                                        :src="film?.poster || ''"
                                        cover
                                        rounded="lg"
                                        :height="TOP_CARDS_HEIGHT"
                                        class="cursor-pointer"
                                        @click="
                                            showFullScreenPoster(
                                                film?.poster || ''
                                            )
                                        "
                                    >
                                        <template #placeholder>
                                            <ImgPlaceholder
                                                v-if="loading"
                                                :loading="loading"
                                            />
                                            <v-sheet v-else height="100%">
                                                <div
                                                    class="fill-height d-flex justify-center align-center"
                                                >
                                                    <v-icon>
                                                        mdi-filmstrip
                                                    </v-icon>
                                                </div>
                                            </v-sheet>
                                        </template>
                                        <template #error>
                                            <ErrorPlaceHolder />
                                        </template>
                                    </v-img>
                                </v-col>
                                <v-divider vertical />
                                <v-col
                                    v-if="$vuetify.display.mdAndUp"
                                    v-bind="colParams.info"
                                >
                                    <v-card flat :height="TOP_CARDS_HEIGHT">
                                        <div
                                            class="fill-height d-flex flex-column items-center"
                                        >
                                            <FilmGeneralInfo
                                                :general-info="generalInfo"
                                            />
                                        </div>
                                    </v-card>
                                </v-col>
                                <v-divider vertical />
                                <v-col
                                    v-if="$vuetify.display.mdAndUp"
                                    v-bind="colParams.rating"
                                >
                                    <v-card flat :height="TOP_CARDS_HEIGHT">
                                        <Rating
                                            :current-rating="film?.rating || ''"
                                            :assessments="
                                                film?.assessments || []
                                            "
                                            :assessments-graph="
                                                film?.assessmentsGraph || []
                                            "
                                            :is-assessing="isAssessing"
                                            :rating="rating"
                                            :comment="comment"
                                            @assession:submit="submitAssessment"
                                            @assession:enable="
                                                isAssessing = true
                                            "
                                            @assession:cancel="cancelAssessment"
                                            @comment:update="comment = $event"
                                            @rating:update="rating = $event"
                                        />
                                    </v-card>
                                </v-col>
                            </v-row>
                        </v-card>
                        <div
                            v-else-if="$vuetify.display.mdAndUp"
                            class="d-flex ga-2 fill-height"
                        >
                            <v-skeleton-loader
                                v-for="n in 3"
                                :key="n"
                                type="card"
                                :height="TOP_CARDS_HEIGHT"
                                width="calc(100% / 3)"
                            />
                        </div>
                        <v-skeleton-loader
                            v-else
                            type="card"
                            :height="TOP_CARDS_HEIGHT"
                        />
                    </v-container>
                </template>
                <template #text>
                    <main>
                        <FilmExpansionPanels
                            v-if="$vuetify.display.smAndDown"
                            :team="team"
                            :starring="starring"
                            :is-description-panel-open="isDescriptionPanelOpen"
                        >
                            <template #general-info>
                                <FilmGeneralInfo :general-info="generalInfo" />
                            </template>
                            <template #rating>
                                <Rating
                                    :current-rating="film?.rating || ''"
                                    :assessments="film?.assessments || []"
                                    :assessments-graph="
                                        film?.assessmentsGraph || []
                                    "
                                    :is-assessing="isAssessing"
                                    :rating="rating"
                                    :comment="comment"
                                    @assession:submit="submitAssessment"
                                    @assession:enable="isAssessing = true"
                                    @assession:cancel="cancelAssessment"
                                    @comment:update="comment = $event"
                                    @rating:update="rating = $event"
                                />
                            </template>
                            <template #description>
                                <IndentedEditableText
                                    v-if="film"
                                    :edit-mode="editDescriptionMode"
                                    :messages="
                                        $t('pages.films.edit_description')
                                    "
                                    :text="film?.description || ''"
                                    @sumbit:edit="submitDescriptionEdit"
                                    @cancel:edit="cancelDescriptionEdit"
                                />
                                <v-skeleton-loader
                                    v-else
                                    type="text"
                                    height="200"
                                ></v-skeleton-loader>
                            </template>
                            <template #comments>
                                <Comments
                                    :loading="loading"
                                    :assessments="film?.assessments || []"
                                    :comment="comment"
                                    @assession:submit="submitAssessment"
                                    @assession:enable="isAssessing = true"
                                    @assession:cancel="cancelAssessment"
                                    @assession:delete="deleteAssessment"
                                />
                            </template>
                            <template #similar-genres>
                                <SimilarGenreFilms
                                    :films="filmsWithSimilarGenres"
                                    :loading="loading"
                                />
                            </template>
                        </FilmExpansionPanels>
                        <template v-else>
                            <v-container fluid>
                                <v-row>
                                    <v-col>
                                        <v-card
                                            border
                                            :title="
                                                $t('pages.films.description')
                                            "
                                            prepend-icon="mdi-text"
                                        >
                                            <template #append>
                                                <v-btn
                                                    variant="tonal"
                                                    density="comfortable"
                                                    icon
                                                    :color="
                                                        editDescriptionMode
                                                            ? 'error'
                                                            : ''
                                                    "
                                                    @click="
                                                        editDescriptionMode =
                                                            !editDescriptionMode
                                                    "
                                                >
                                                    <v-icon>{{
                                                        !editDescriptionMode
                                                            ? 'mdi-pencil'
                                                            : 'mdi-close'
                                                    }}</v-icon>
                                                    <v-tooltip
                                                        activator="parent"
                                                        >{{
                                                            !editDescriptionMode
                                                                ? $t(
                                                                      'pages.films.edit_description'
                                                                  )
                                                                : $t(
                                                                      'actions.stop_edit'
                                                                  )
                                                        }}</v-tooltip
                                                    >
                                                </v-btn>
                                            </template>
                                            <v-card-text>
                                                <IndentedEditableText
                                                    :edit-mode="
                                                        editDescriptionMode
                                                    "
                                                    :messages="
                                                        $t(
                                                            'pages.films.edit_description'
                                                        )
                                                    "
                                                    :text="
                                                        film?.description || ''
                                                    "
                                                    @sumbit:edit="
                                                        submitDescriptionEdit
                                                    "
                                                    @cancel:edit="
                                                        cancelDescriptionEdit
                                                    "
                                                />
                                            </v-card-text>
                                        </v-card>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col>
                                        <v-card
                                            :title="$t('pages.films.starring')"
                                            prepend-icon="mdi-account"
                                            border
                                            max-height="300"
                                            height="100%"
                                            class="overflow-y-auto"
                                        >
                                            <v-list rounded="lg">
                                                <v-list-item
                                                    v-for="(
                                                        actor, index
                                                    ) in starring"
                                                    :key="index"
                                                    :title="actor.value"
                                                    :value="index"
                                                    :to="
                                                        $localeRoute(
                                                            actor.to || '/'
                                                        )
                                                    "
                                                    base-color="secondary"
                                                >
                                                    <template #prepend>
                                                        <v-avatar>
                                                            <v-img
                                                                v-if="
                                                                    actor.avatar
                                                                "
                                                                :src="
                                                                    actor.avatar
                                                                "
                                                            >
                                                                <template
                                                                    #placeholder
                                                                >
                                                                    <v-icon
                                                                        size="x-small"
                                                                    >
                                                                        mdi-account
                                                                    </v-icon>
                                                                </template>
                                                                <template
                                                                    #error
                                                                >
                                                                    <ErrorPlaceHolder />
                                                                </template>
                                                            </v-img>
                                                            <v-icon
                                                                v-else
                                                                icon="mdi-account"
                                                            />
                                                        </v-avatar>
                                                    </template>
                                                </v-list-item>
                                            </v-list>
                                        </v-card>
                                    </v-col>
                                    <v-col>
                                        <v-card
                                            :title="$t('pages.films.team')"
                                            prepend-icon="mdi-account-tie"
                                            border
                                            height="100%"
                                            max-height="300"
                                            class="overflow-y-auto"
                                        >
                                            <v-list rounded="lg">
                                                <v-list-item
                                                    v-for="(
                                                        person, index
                                                    ) in team"
                                                    :key="index"
                                                    rounded="lg"
                                                    :subtitle="$t(person.title)"
                                                    :title="person.value"
                                                    :value="index"
                                                    :to="
                                                        $localeRoute(
                                                            person.to || '/'
                                                        )
                                                    "
                                                    base-color="secondary"
                                                >
                                                    <template #prepend>
                                                        <v-avatar>
                                                            <v-img
                                                                :src="
                                                                    person.avatar
                                                                "
                                                            >
                                                                <template
                                                                    #placeholder
                                                                >
                                                                    <v-icon
                                                                        size="x-small"
                                                                    >
                                                                        mdi-account
                                                                    </v-icon>
                                                                </template>
                                                                <template
                                                                    #error
                                                                >
                                                                    <ErrorPlaceHolder />
                                                                </template>
                                                            </v-img>
                                                        </v-avatar>
                                                    </template>
                                                </v-list-item>
                                            </v-list>
                                        </v-card>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col>
                                        <v-card
                                            border
                                            :title="$t('pages.films.comments')"
                                            prepend-icon="mdi-comment"
                                        >
                                            <v-card-text>
                                                <Comments
                                                    :loading="loading"
                                                    :assessments="
                                                        film?.assessments || []
                                                    "
                                                    :comment="comment"
                                                    @assession:submit="
                                                        submitAssessment
                                                    "
                                                    @assession:enable="
                                                        isAssessing = true
                                                    "
                                                    @assession:cancel="
                                                        cancelAssessment
                                                    "
                                                    @assession:delete="
                                                        deleteAssessment
                                                    "
                                                />
                                            </v-card-text>
                                        </v-card>
                                    </v-col>
                                </v-row>
                            </v-container>
                        </template>
                    </main>
                </template>
            </DetailCard>
            <ConfirmDialog
                v-model="showConfirmDialog"
                type="error"
                :text="$t('forms.film.gallery_item_delete_confirm')"
                :loading="loading"
                @confirm="handleGalleryItemsDelete"
                @cancel="showConfirmDialog = false"
            />
            <BaseDialog
                v-model:opened="generalInfoEdit"
                :max-width="800"
                :title="$t('pages.films.edit') + ' ' + film?.name"
                :loading="loading"
                @close="generalInfoEdit = false"
            >
                <template #text>
                    <FilmForm
                        :film-form="filmForm"
                        :show-description="false"
                        :genres="genres"
                        :actors="actors"
                        :directors="directors"
                        :producers="producers"
                        :writers="writers"
                        :composers="composers"
                        :is-valid="isFormValid"
                        :countries="countries"
                        @validate="isFormValid = $event"
                        @form:submit="sumbitEdit"
                        @update:model-value="filmForm = $event"
                    />
                </template>
            </BaseDialog>
            <BaseDialog
                v-model:opened="editGalleryMode"
                :loading="loading"
                :title="computedGalleryEditTitle"
                :max-width="1200"
                @close="editGalleryMode = false"
            >
                <template #text>
                    <FilmGalleryEdit
                        v-model:selected="selectedImagesIndices"
                        :active-tab="activeTab"
                        :film="film"
                        :slider-arr="sliderGalleryArr || []"
                        :upload-count="uploadCount"
                        :edit-mode="editGalleryMode"
                        :upload-disabled="uploadCount === 0"
                        :remove-disabled="!film?.gallery.length"
                        :card-height="GALLERY_CARD_HEIGHT"
                        @poster:change="handleChangePoster"
                        @update:selected="selectedImagesIndices = $event"
                        @delete:selected="showConfirmDialog = true"
                        @upload:gallery="handleGalleryUpload"
                    />
                </template>
            </BaseDialog>
            <GalleryFullscreenViewer
                v-model:show-gallery="showFullScreenViewer"
                v-model:active-img-index="activeImg"
                :gallery-content="film?.gallery || []"
                :name="getName(film?.name || '', film?.internationalName || '')"
                :no-content-label="$t('pages.films.no_gallery')"
                :with-avatar="false"
                @close="showFullScreenViewer = false"
                @poster:set="handleChangePoster"
                @delete:img="handleDeleteImg"
            />
            <SuccessSnackbar
                v-model:show="showSnackbar"
                @close="showSnackbar = false"
            />
            <ConfirmDialog
                v-model="showDeleteWarning"
                :text="$t('general.entity_delete_warning')"
                @cancel="showDeleteWarning = false"
                @confirm="handleFilmDelete"
            />
            <ConfirmDialog
                v-model="showPosterSetDialog"
                :text="$t('actions.set_poster') + '?'"
                @cancel="showPosterSetDialog = false"
                @confirm="setAsPosterAfterUpload"
            />
        </NuxtLayout>
    </div>
</template>

<script lang="ts" setup>
import DetailCard from '~/components/Containment/Cards/DetailCard.vue'
import BaseDialog from '~/components/Dialogs/BaseDialog.vue'
import FilmGalleryEdit from '~/components/Gallery/FilmGalleryEdit.vue'
import ConfirmDialog from '~/components/Dialogs/ConfirmDialog.vue'
import FilmForm from '~/components/Forms/Film/FilmForm.vue'
import IndentedEditableText from '~/components/Misc/IndentedEditableText.vue'
import SuccessSnackbar from '~/components/Misc/SuccessSnackbar.vue'
import Comments from '~/components/FilmPartials/Assessment/Comments.vue'
import FilmDetailMenu from '~/components/FilmPartials/FilmDetailMenu.vue'
import NotAuthWarning from '~/components/Misc/NotAuthWarning.vue'
import FilmExpansionPanels from '~/components/FilmPartials/FilmExpansionPanels.vue'
import Rating from '~/components/FilmPartials/Assessment/Rating.vue'
import ErrorPlaceHolder from '~/components/Containment/Img/ErrorPlaceHolder.vue'
import ImgPlaceholder from '~/components/Containment/Img/ImgPlaceholder.vue'
import FilmGeneralInfo from '~/components/FilmPartials/FilmGeneralInfo.vue'
import GalleryFullscreenViewer from '~/components/Gallery/GalleryFullscreenViewer.vue'
import BackBtn from '~/components/Containment/Btns/BackBtn.vue'
import SimilarGenreFilms from '~/components/FilmPartials/SimilarGenreFilms.vue'

import { useFilmStore } from '~/stores/filmStore'
import { useAuthStore } from '~/stores/authStore'

const GALLERY_CARD_HEIGHT: number = 400
const TOP_CARDS_HEIGHT: number = 470

const localeRoute = useLocaleRoute()
const { locale, t } = useI18n()
const showDeleteWarning = ref<boolean>(false)
const editDescriptionMode = ref<boolean>(false)
const showConfirmDialog = ref<boolean>(false)
const editGalleryMode = ref<boolean>(false)
const showSnackbar = ref<boolean>(false)
const generalInfoEdit = ref<boolean>(false)
const isFormValid = ref<boolean>(true)
const isAssessing = ref<boolean>(false)
const showAssessDialog = ref<boolean>(false)
const showLinkTrailerDialog = ref<boolean>(false)
const showPosterSetDialog = ref<boolean>(false)
const comment = ref<string>('')
const rating = ref<number>(5)
const activeTab = ref<number>(0)
const selectedImagesIndices = ref<number[]>([])
const isDescriptionPanelOpen = ref<boolean>(false)
const showFullScreenViewer = ref<boolean>(false)
const { isAuthenticated } = storeToRefs(useAuthStore())
const {
    film,
    genres,
    filmForm,
    actors,
    composers,
    producers,
    writers,
    directors,
    loading,
    countries,
    filmsWithSimilarGenres,
} = storeToRefs(useFilmStore())
const {
    editFilm,
    fetchFilmForm,
    fetchFilmDetails,
    fetchGenres,
    uploadGallery,
    clearFilmForm,
    deleteGalleryItems,
    assessFilmById,
    deleteFilm,
    fetchSpecialists,
    deleteAssessmentById,
    fetchCountries,
    fetchFilmsWithSililarGenres,
    GALLERY_SIZE,
} = useFilmStore()

const colParams = {
    poster: {
        cols: 12,
        xl: 3,
        lg: 3,
        md: 4,
        sm: 12,
    },
    info: {
        cols: 12,
        xl: 5,
        lg: 5,
        md: 4,
        sm: 12,
    },
    rating: {
        cols: 12,
        xl: 4,
        lg: 4,
        md: 4,
        sm: 12,
    },
}
const getName = useInternationalName()
const activeImg = computed(() => {
    return film.value
        ? film.value?.gallery.findIndex(
              (img: string) => img === film.value?.poster || ''
          )
        : 0
})

const imagesToDelete = computed(() => {
    return film.value?.gallery
        .filter((_: string, index: number): boolean =>
            selectedImagesIndices.value.includes(index)
        )
        .map((imageName: string): string => {
            if (!imageName) return ''
            const fileName = imageName.split(/[/\\]/).at(-1) || ''
            return fileName.split('.')[0]
        })
}) as ComputedRef<string[]>

const breadCrumbs = computed(() => {
    return [
        {
            title: t('pages.home.title'),
            to: localeRoute('/'),
        },
        {
            title: t('pages.films.title'),
            to: localeRoute('/films'),
        },
        {
            title: film.value
                ? getName(
                      film.value?.name || '',
                      film.value?.internationalName || ''
                  )
                : '',
        },
    ]
})

const generalInfo = computed((): Detail[] => {
    const info = [
        {
            title: 'forms.film.name',
            value: getName(
                film.value?.name || '',
                film.value?.internationalName || ''
            ),
            icon: 'mdi-movie',
        },
        {
            title: 'forms.film.slogan',
            value: film.value?.slogan || '',
            icon: 'mdi-format-title',
        },
        {
            title: 'forms.film.duration',
            value: film.value?.duration || '',
            icon: 'mdi-timer',
        },
        {
            title: 'forms.film.genres',
            value: film.value?.genreNames
                ? film.value.genreNames.join(', ')
                : '',
            icon: 'mdi-filmstrip',
        },
        {
            title: 'forms.film.age',
            value: film.value?.age + '+' || '',
            icon: 'mdi-account-supervisor',
        },
        {
            title: 'pages.films.budget',
            value: film.value?.budget,
            icon: 'mdi-currency-usd',
        },
        {
            title: 'pages.films.fees',
            value: film.value?.fees,
            icon: 'mdi-cash',
        },
        {
            title: 'pages.films.country',
            value: film.value?.country,
            icon: 'mdi-flag',
            flag: countryCodeToEmoji(filmForm.value?.countryCode || ''),
        },
    ]

    return info as Detail[]
})

const computedGalleryEditTitle = computed((): string => {
    return t('pages.films.edit_gallery')
})

const starring = computed((): Detail[] => {
    return film.value
        ? film.value.actorsData?.map((person: FilmPerson): Detail => {
              return {
                  title: '',
                  id: person.id,
                  value: getName(
                      person?.name || '',
                      person.internationalName || ''
                  ),
                  to: localeRoute('/persons/' + person?.slug) || '',
                  avatar: person.avatar || '',
              }
          })
        : []
})

const team = computed((): Detail[] => {
    const teamMembersTitles = [
        'forms.film.director',
        'forms.film.writer',
        'forms.film.producer',
        'forms.film.composer',
        'forms.film.actors',
    ]
    return film.value
        ? film.value.teamData?.map(
              (person: FilmPerson, index: number): Detail => {
                  return {
                      title: teamMembersTitles[index],
                      id: person.id,
                      value: getName(
                          person?.name || '',
                          person.internationalName || ''
                      ),
                      to: localeRoute('/persons/' + person?.slug) || '',
                      avatar: person.avatar || '',
                  }
              }
          )
        : []
})

const fetchData = async (): Promise<void> => {
    const slug = useRoute().params.slug.toString()

    await Promise.allSettled([
        fetchGenres(locale.value),
        fetchFilmDetails(slug, locale.value),
        fetchFilmForm(slug, locale.value),
        fetchSpecialists(),
        fetchCountries(locale.value),
        fetchFilmsWithSililarGenres(slug),
    ])
}

const sliderGalleryArr = computed((): string[] => {
    const initialArr = Array.from({ length: GALLERY_SIZE }, (_, i) => i)

    return initialArr.map((item) => {
        return (film.value && film?.value.gallery[item]) || ''
    })
}) as ComputedRef<string[]>

const uploadCount = computed((): number => {
    return film.value?.gallery.length
        ? sliderGalleryArr.value.filter((item: string) => item === '').length
        : GALLERY_SIZE
})

const handleFilmDelete = async (): Promise<void> => {
    showDeleteWarning.value = false
    const filmId: number = film.value?.id || 0
    await deleteFilm(filmId)
    navigateTo(localeRoute('/films'))
}

const handleGeneralInfoEdit = (): void => {
    generalInfoEdit.value = true
}

const openGalleryEditor = (): void => {
    editGalleryMode.value = true
    activeTab.value = 1
}
const cancelAssessment = (): void => {
    showAssessDialog.value = false
    isAssessing.value = false
    rating.value = 0
    comment.value = ''
}

const submitAssessment = async (): Promise<void> => {
    const filmId: number = film.value?.id || 0
    await assessFilmById(filmId, rating.value, comment.value, locale.value)
    await fetchData()
    await nextTick(() => {
        showSnackbar.value = true
        cancelAssessment()
    })
}

const handleEditDescription = async (): Promise<void> => {
    editDescriptionMode.value = true
    const descriptionPanelElement = document.getElementById('description')
    await nextTick(() => {
        if (descriptionPanelElement) {
            descriptionPanelElement.scrollIntoView({ behavior: 'smooth' })
            isDescriptionPanelOpen.value = !isDescriptionPanelOpen.value
        }
    })
}

const sumbitEdit = async (): Promise<void> => {
    await editFilm(locale.value)
    await fetchData()
    await nextTick(() => {
        showSnackbar.value = true
        editDescriptionMode.value = false
        generalInfoEdit.value = false
    })
}

const handleGalleryItemsDelete = async (): Promise<void> => {
    await deleteGalleryItems(imagesToDelete.value)
    await fetchData()
    await nextTick(() => {
        showSnackbar.value = true
        showConfirmDialog.value = false
        editGalleryMode.value = false
    })
}

const handleDeleteImg = async (index: number): Promise<void> => {
    selectedImagesIndices.value.push(index)
    await handleGalleryItemsDelete()
}

const handleGalleryUpload = async (files: File[]): Promise<void> => {
    const filmId: number = film.value?.id || 0
    await uploadGallery(files, filmId)
    editGalleryMode.value = false
    await fetchData()
    if (!film.value?.poster) {
        showPosterSetDialog.value = true
    }
}

const handleChangePoster = async (index: number): Promise<void> => {
    filmForm.value.poster = film.value?.gallery[index] || ''
    await nextTick(() => {
        if (!film.value?.poster) {
            showPosterSetDialog.value = true
        }
    })
    await editFilm(locale.value)
    editGalleryMode.value = false
    await fetchData()
}

const setAsPosterAfterUpload = async (): Promise<void> => {
    filmForm.value.poster = film.value?.gallery.at(-1) || ''
    await editFilm(locale.value)
    showPosterSetDialog.value = false
    await nextTick(() => {
        showSnackbar.value = true
    })
}

const submitDescriptionEdit = async (text: string): Promise<void> => {
    filmForm.value.description = text
    await editFilm(locale.value)
    await fetchData()
    editDescriptionMode.value = false
}

const cancelDescriptionEdit = () => {
    editDescriptionMode.value = false
}

const deleteAssessment = async (assessmentId: number): Promise<void> => {
    const filmId: number = film.value?.id || 0
    await deleteAssessmentById(filmId, assessmentId)
    await fetchData()
}

const showFullScreenPoster = (poster: string) => {
    if (poster) {
        showFullScreenViewer.value = true
    } else editGalleryMode.value = true
}

watch(
    locale,
    async (newVal: string): Promise<void> => {
        const slug = useRoute().params.slug.toString()
        await fetchFilmDetails(slug, newVal)
    },
    { immediate: true }
)

onBeforeUnmount((): void => {
    clearFilmForm()
})

onMounted(async (): Promise<void> => {
    await fetchData()
})

definePageMeta({
    name: 'filmDetails',
    path: '/films/:slug',
})
</script>
