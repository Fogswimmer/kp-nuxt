<template>
  <ListPage
    v-if="filmsPresent"
    :items="filmItems || []"
    :loading="loading"
    :total-pages="totalPages"
    :page="currentPage"
    :search-options="genresOptions"
    :limit="limit !== 'all' ? (limit as number) : 15"
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
  </ListPage>
</template>

<script lang="ts" setup>
import ListPage from "~/components/Misc/ListPage.vue";
import Filters from "~/components/Misc/Filters.vue";
import { useFilmStore } from "~/stores/filmStore";

const { films, loading, totalPages, genres, currentPage, filmsPresent } =
  storeToRefs(useFilmStore());
const { fetchFilteredFilms, fetchGenres, checkFilmsPresence } = useFilmStore();
const { locale, t } = useI18n();
const limit = ref<number>(5);
const offset = ref<number>(0);
const search = ref<string>("");
const order = ref<string>("asc");
const sortBy = ref<string>("name");

const transformedGenres = computed((): IOption[] => {
  return genres.value.map((genre: IGenre) => {
    return { value: genre.value || "", title: genre.name || "" };
  }) as IOption[];
});
const genresOptions = [
  { value: "all", title: t("filters.sort.all") },
  ...transformedGenres.value,
] as IOption[];

const sortOptions = [
  { value: "name", title: t("forms.film.name") },
  { value: "year_of_release", title: t("forms.film.release_year") },
] as IOption[];

/**
 * Fetches all necessary data for the films list page.
 * Checks if films are present, if they are, fetches the films list and genres.
 * If not, navigates to the empty films page.
 * @returns {Promise<void>}
 */

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
      fetchGenres(locale.value),
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
          avatar: film.cover || film.gallery[0] || "",
          to: "/films/" + film.id,
        };
      })
    : [];
});

/**
 * Updates query parameters when the page changes.
 * @param page - The new page number.
 */

const updateQueryParams = (page: number): void => {
  offset.value = (page - 1) * limit.value;
};

watch(
  [limit, offset, order, sortBy, locale],
  async ([newLimit, newOffset, newOrder, newSortBy, newLocale]) => {
    await fetchFilteredFilms(
      newLimit,
      newOffset,
      "",
      newOrder,
      newSortBy,
      newLocale
    );
  },
  {
    immediate: true,
  }
);

watch(search, () =>
  debounce(async (newVal: string | number): Promise<void> => {
    await fetchFilteredFilms(
      limit.value,
      0,
      newVal as string,
      order.value,
      sortBy.value,
      locale.value
    );
  }, 1000)
);

onMounted(async () => {
  await fetchData();
});

definePageMeta({
  layout: "default",
  name: "films",
  path: "/films",
  key: (route) => route.fullPath,
});
</script>

<style></style>
