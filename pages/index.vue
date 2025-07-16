<template>
    <div>
        <Head>
            <Title>{{ definePageTitle($t("pages.home.title")) }}</Title>
            <Meta name="description" :content="$t('page_descriptions.home')" />
        </Head>
        <template v-if="filmsPresent && personsPresent">
            <div class="d-flex flex-column ga-2 overflow-y-hidden">
                <MasonrySection
                    v-if="latestFilms.length > 0"
                    :present="filmsPresent"
                    :loading="filmLoading"
                    :title="$t('pages.home.newest')"
                >
                    <template #default>
                        <v-carousel
                            v-model="currentFilm"
                            :height="$vuetify.display.mdAndUp ? 700 : 300"
                            hide-delimiter-background
                            progress="primary"
                            color="primary"
                        >
                            <v-carousel-item
                                v-for="(item, i) in latestFilmItems"
                                :key="i"
                                :value="item"
                                touch
                                progress="primary"
                            >
                                <v-container fluid>
                                    <v-row>
                                        <v-col>
                                            <v-img :src="item.avatar"></v-img>
                                        </v-col>
                                        <v-col>
                                            <v-card height="100%" flat>
                                                <v-card-title
                                                    class="text-center text-secondary text-h5"
                                                >
                                                    {{ item.title }} ({{
                                                        item.releaseYear
                                                    }})
                                                </v-card-title>
                                                <v-card-subtitle
                                                    class="text-center"
                                                >
                                                    <v-rating
                                                        :model-value="
                                                            item.rating || 0
                                                        "
                                                        density="comfortable"
                                                        color="yellow-darken-2"
                                                    ></v-rating>
                                                </v-card-subtitle>
                                                <v-card-text>
                                                    {{ item.subtitle }}
                                                </v-card-text>
                                            </v-card>
                                        </v-col>
                                    </v-row>
                                </v-container>
                                <!-- <div class="w-100">
                                    <v-card-title
                                        class="text-center text-secondary text-h5"
                                    >
                                        {{ item.title }} ({{
                                            item.releaseYear
                                        }})
                                    </v-card-title>
                                    <v-card-subtitle class="text-center">
                                        <v-rating
                                            :model-value="item.rating || 0"
                                            density="comfortable"
                                            size="small"
                                            color="yellow-darken-2"
                                        ></v-rating>
                                    </v-card-subtitle>
                                </div> -->
                            </v-carousel-item>
                        </v-carousel>
                    </template>
                </MasonrySection>
                <MasonrySection
                    v-if="topFilms.length > 0"
                    :present="filmsPresent"
                    :loading="filmLoading"
                    :title="$t('pages.home.top', topFilms.length)"
                >
                    <template #default>
                        <HomeWall
                            :items="topFilmItems"
                            :loading="filmLoading"
                            :sidebar="false"
                        />
                    </template>
                </MasonrySection>
                <MasonrySection
                    v-if="popularActors.length > 0"
                    :present="personsPresent"
                    :loading="personLoading"
                    :title="$t('pages.home.popular_actors')"
                >
                    <template #default>
                        <HomeWall
                            :items="personItems"
                            :loading="personLoading"
                            :sidebar="false"
                        />
                    </template>
                </MasonrySection>
            </div>
        </template>
        <template v-else>
            <PageLoader />
        </template>
        <v-bottom-sheet v-model="isOffline" inset>
            <v-alert type="error" icon="mdi-connection">
                <div class="w-100 d-flex align-center">
                    {{ $t("general.no_network") }}
                    <v-spacer />
                    <v-btn
                        prepend-icon="mdi-refresh"
                        variant="outlined"
                        @click="reload"
                        >{{ $t("actions.reload") }}</v-btn
                    >
                </div>
            </v-alert>
        </v-bottom-sheet>
    </div>
</template>

<script lang="ts" setup>
import MasonrySection from "~/components/Masonry/partials/MasonrySection.vue";
import HomeWall from "~/components/Masonry/HomeWall.vue";
import PageLoader from "~/components/Misc/PageLoader.vue";
import ErrorPlaceHolder from "~/components/Containment/Img/ErrorPlaceHolder.vue";
import ImgPlaceholder from "~/components/Containment/Img/ImgPlaceholder.vue";

import { useFilmStore } from "~/stores/filmStore";
import { usePersonStore } from "~/stores/personStore";

const {
    loading: filmLoading,
    filmsPresent,
    latestFilms,
    topFilms,
} = storeToRefs(useFilmStore());
const { fetchLatestFilms, checkFilmsPresence, fetchTopFilms } = useFilmStore();
const { listPopularActors, checkPersonsPresence } = usePersonStore();
const {
    loading: personLoading,
    personsPresent,
    popularActors,
} = storeToRefs(usePersonStore());

const { locale } = useI18n();
const localeRoute = useLocaleRoute();
const isOffline = ref<boolean>(false);

const fetchData = async (): Promise<void> => {
    await checkFilmsPresence();
    await checkPersonsPresence();
    if (filmsPresent.value) {
        await fetchLatestFilms();
        await fetchTopFilms();
    }
    if (personsPresent.value) {
        await listPopularActors(locale.value);
    }
    if (!filmsPresent.value || !personsPresent.value) {
        navigateTo(localeRoute("/empty-page"));
    }
};

const latestFilmItems = computed((): Detail[] => {
    return latestFilms.value[0] !== null
        ? latestFilms.value?.map((film: IFilm) => {
              return {
                  title: useInternationalName(
                      film.name,
                      film.internationalName,
                  ),
                  subtitle: film.description,
                  id: film.id,
                  releaseYear: film.releaseYear,
                  value: film.description || "",
                  rating: film.rating || "0",
                  avatar: film.poster || film.gallery[0] || "",
                  to: "/films/" + film.slug,
                  createdAt: film.createdAt || "",
              };
          })
        : [];
});

const currentFilm = ref<Detail>(latestFilmItems.value[0]);

const topFilmItems = computed((): Detail[] => {
    return topFilms.value[0] !== null
        ? topFilms.value?.map((film: IFilm) => {
              return {
                  title: useInternationalName(
                      film.name,
                      film.internationalName,
                  ),
                  value: film.description || "",
                  rating: film.rating || "0",
                  avatar: film.poster || film.gallery[0] || "",
                  to: "/films/" + film.slug,
                  createdAt: film.createdAt || "",
              };
          })
        : [];
});

const personItems = computed((): Detail[] => {
    return (
        popularActors.value &&
        popularActors.value?.map((person: IPerson): Detail => {
            return {
                title: useInternationalName(
                    person.name as IPerson["firstname"],
                    person.internationalName,
                ),
                value: person?.bio || "",
                avatar: person?.avatar || "",
                to: "/persons/" + person?.slug || "",
            };
        })
    );
});

const reload = () => {
    location.reload();
};

onMounted(async (): Promise<void> => {
    isOffline.value = !navigator.onLine;
    await fetchData();
});

definePageMeta({
    name: "home",
    path: "/",
    description: "Home page",
    layout: "home",
});
</script>

<style>
.carousel-card {
    position: absolute;
    left: 25%;
    right: 25%;
}
</style>
