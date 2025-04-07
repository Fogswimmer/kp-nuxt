<template>
  <div>
    <Head>
      <Title>{{ definePageTitle($t("pages.films.title")) }}</Title>
      <Meta name="description" :content="$t('page_descriptions.films_list')" />
    </Head>
    <div>
      <ListPage
        v-if="filmsPresent"
        :items="filmItems || []"
        :loading="loading"
        :total-pages="totalPages"
        :page="currentPage"
        :limit="computedLimitProp"
        :list-title="$t('nav.films_list')"
        new-page-link="/films/new"
        @update:page="updateQueryParams"
        @update:search="search = $event"
      >
        <template #filters>
          <Filters
            :sort-options="sortOptions"
            @update:limit="limit = $event.value"
            @update:order="order = $event.value"
            @update:search="search = $event.value"
            @update:sort="sortBy = $event.value"
          />
        </template>
        <template v-if="$vuetify.display.mdAndUp" #sidebar>
          <v-card
            class="pa-4 glassed"
            :title="$t('pages.home.newest')"
            variant="text"
          
          >
            <v-list v-if="latestFilms.length">
              <v-list-item 
              v-for="(film, index) in latestFilms" 
              :key="index"
              :title="film.name"
              :to="`/films/${film.slug}`"
              >
              <template #prepend>
                <v-avatar size="64">
                  <v-img :src="film.poster || film.gallery[0] || ''">
                    <template #placeholder>
                      <ImgLoader />
                    </template>
                    <template #error>
                      <ErrorPlaceHolder />
                    </template>
                  </v-img>
                </v-avatar>
              </template> 
            </v-list-item>
            </v-list>
            <span v-else-if="!loading" class="text-disabled">{{
              $t("general.no_data")
            }}</span>
            <v-sheet v-else height="100%">
              <div class="fill-height d-flex align-center justify-center">
                <v-progress-circular indeterminate />
              </div>
            </v-sheet>
          </v-card>
        </template>
      </ListPage>
    </div>
  </div>
</template>

<script lang="ts" setup>
import ListPage from "~/components/Templates/ListPage.vue";
import Filters from "~/components/Misc/Filters.vue";

import { useFilmStore } from "~/stores/filmStore";
import definePageTitle from "~/utils/definePageTitle";
import ImgLoader from "~/components/Containment/Img/ImgLoader.vue";
import ErrorPlaceHolder from "~/components/Containment/Img/ErrorPlaceHolder.vue";

const { films, loading, totalPages, currentPage, filmsPresent, latestFilms } =
  storeToRefs(useFilmStore());
const { fetchFilteredFilms, checkFilmsPresence, fetchLatestFilms } =
  useFilmStore();
const { locale, t } = useI18n();
const limit = ref<number>(5);
const offset = ref<number>(0);
const search = ref<string>("");
const order = ref<string>("asc");
const sortBy = ref<string>("name");

const sortOptions = [
  { value: "name", title: t("forms.film.name") },
  { value: "year_of_release", title: t("forms.film.release_year") },
] as IOption[];

const fetchData = async (): Promise<void> => {
  await checkFilmsPresence();
  if (filmsPresent.value) {
    await Promise.allSettled([
      fetchFilteredFilms(
        limit.value,
        offset.value,
        search.value,
        order.value,
        sortBy.value,
        locale.value
      ),
      fetchLatestFilms(),
    ]);
  } else {
    navigateTo("/films/empty");
  }
};

const filmItems = computed((): Detail[] => {
  return films.value[0] !== null
    ? films.value?.map((film) => {
        return {
          title:
            film?.name +
            " (" +
            (film?.releaseYear ? film.releaseYear.toString() : "") +
            ")",
          value: film.description || "",
          avatar: film.poster || film.gallery[0] || "",
          to: "/films/" + film.slug,
          createdAt: film.createdAt || "",
        };
      })
    : [];
});

const computedLimitProp = computed((): number => {
  return typeof limit.value === "number" ? limit.value : 15;
});

const updateQueryParams = (page: number): void => {
  offset.value = (page - 1) * limit.value;
};

watch(
  [limit, offset, search, order, sortBy, locale],
  async ([
    newLimit,
    newOffset,
    newSearch,
    newOrder,
    newSortBy,
    newLocale,
  ]): Promise<void> => {
    await fetchFilteredFilms(
      newLimit,
      newOffset,
      newSearch === null ? "" : newSearch,
      newOrder,
      newSortBy,
      newLocale
    );
  },
  {
    immediate: true,
  }
);

onMounted(async (): Promise<void> => {
  await fetchData();
});

definePageMeta({
  name: "films",
  path: "/films",
  key: (route) => route.fullPath,
});
</script>

<style></style>
