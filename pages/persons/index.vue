<template>
  <ListPage
    v-if="personsPresent"
    :items="personItems || []"
    :loading="loading"
    :total-pages="totalPages"
    :search-options="searchOptions"
    :page="currentPage"
    :limit="limit !== 'all' ? (limit as number) : 15"
    :list-title="$t('nav.persons')"
    new-page-link="/persons/new"
    @update:page="updateQueryParams"
    @update:search="search = $event"
    @update:search-options="updateSpecialtySort($event.value)"
  >
    <template #sidebar>
      <v-card class="pa-4" :title="$t('pages.home.popular_actors')">
        <PopularActorsMasonry
            :popular-actors="popularActors"
            :loading="loading"
            sidebar
          />
      </v-card>
    </template>
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
import PopularActorsMasonry from "~/components/Masonry/PopularActorsMasonry.vue";
import { usePersonStore } from "~/stores/personStore";

const { locale, t } = useI18n();
const {
  loading,
  totalPages,
  currentPage,
  personsPresent,
  persons,
  popularActors,
} = storeToRefs(usePersonStore());
const {
  fetchFilteredPersons,
  listPopularActors,
  fetchGenders,
  fetchSpecialties,
  checkPersonsPresence,
} = usePersonStore();
const limit = ref<number | string>(5);
const offset = ref<number>(0);
const search = ref<string>("");
const sortBy = ref<string>("firstname");
const order = ref<string>("asc");
const specialtySort = ref<string>("all");

const searchOptions = [
  { value: "all", title: t("filters.sort.all") },
  { value: "actor", title: t("filters.sort.persons.specialties.actors") },
  {
    value: "director",
    title: t("filters.sort.persons.specialties.directors"),
  },
  {
    value: "producer",
    title: t("filters.sort.persons.specialties.producers"),
  },
  {
    value: "writer",
    title: t("filters.sort.persons.specialties.writers"),
  },
  {
    value: "composer",
    title: t("filters.sort.persons.specialties.composers"),
  },
];
const selectedSpecialtySort = ref({
  value: "all",
  title: t("filters.sort.all"),
});
const sortOptions = [
  { value: "firstname", title: t("filters.sort.persons.firstname") },
  { value: "age", title: t("filters.sort.persons.age") },
];

const fetchData = async (): Promise<void> => {
  await checkPersonsPresence();
  if (personsPresent.value) {
    await Promise.allSettled([
      fetchFilteredPersons(
        limit.value,
        offset.value,
        search.value,
        sortBy.value,
        order.value,
        specialtySort.value,
        locale.value
      ),
      fetchGenders(locale.value),
      fetchSpecialties(locale.value),
      listPopularActors(),
    ]);
  } else {
    navigateTo("/persons/empty");
  }
};

const personItems = computed((): Detail[] => {
  return (
    persons.value &&
    persons.value?.map((person): Detail => {
      return {
        title: person?.firstname + " " + person?.lastname,
        value: person?.specialtyNames.join(", "),
        avatar: person?.avatar || "",
        to: "/persons/" + person?.id,
        createdAt: person?.createdAt || "",
        updatedAt: person?.updatedAt || "",
        publishedBy: person?.publisherData.name || "",
      };
    })
  );
});

const updateQueryParams = (page: number): void => {
  if (limit.value !== "all") {
    offset.value = (page - 1) * Number(limit.value);
  }
};

const updateSpecialtySort = (event: string) => {
  console.log(event);
  selectedSpecialtySort.value = searchOptions.find(
    (option) => option.value === event
  ) || { value: "all", title: t("filters.sort.all") };
  specialtySort.value = selectedSpecialtySort.value.value;
};

watch(
  [limit, offset, sortBy, order, specialtySort, locale],
  async ([
    newLimit,
    newOffset,
    newSortBy,
    newOrder,
    newSpecialtySort,
    newLocale,
  ]) => {
    await fetchFilteredPersons(
      newLimit,
      newOffset,
      "",
      newSortBy,
      newOrder,
      newSpecialtySort,
      newLocale
    );
  },
  {
    immediate: true,
  }
);

watch(
  search,
  debounce(async (newVal: string): Promise<void> => {
    await fetchFilteredPersons(
      limit.value,
      0,
      newVal,
      sortBy.value,
      order.value,
      specialtySort.value,
      locale.value
    );
  }, 1000)
);

onMounted(async (): Promise<void> => {
  await fetchData();
});

definePageMeta({
  name: "persons",
  path: "/persons",
  key: (route) => route.fullPath,
});
</script>

<style></style>
