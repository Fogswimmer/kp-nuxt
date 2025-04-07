<template>
  <div>
    <Head>
      <Title>{{ definePageTitle($t("pages.persons.title")) }}</Title>
      <Meta
        name="description"
        :content="$t('page_descriptions.persons_list')"
      />
    </Head>
    <div>
      <ListPage
        v-if="personsPresent"
        :items="personItems || []"
        :loading="loading"
        :total-pages="totalPages"
        :page="currentPage"
        :limit="computedLimitProp"
        :list-title="$t('nav.persons')"
        new-page-link="/persons/new"
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
            :title="$t('pages.home.popular_actors')"
            class="pa-4"
            variant="text"
          >
          <v-list v-if="popularActors.length">
              <v-list-item 
              v-for="(person, index) in popularActors" 
              :key="index"
              :title="person.name"
              :to="`/persons/${person.slug}`"
              >
              <template #prepend>
                <v-avatar size="64">
                  <v-img :src="person.avatar || person.photos[0] || ''">
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
import definePageTitle from "~/utils/definePageTitle";
import ImgLoader from "~/components/Containment/Img/ImgLoader.vue";
import ErrorPlaceHolder from "~/components/Containment/Img/ErrorPlaceHolder.vue";
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
        title:
          person?.firstname +
          " " +
          person?.lastname +
          (person?.internationalName
            ? " (" + person?.internationalName + ")"
            : ""),
        value: person?.specialtyNames.join(", "),
        avatar: person?.avatar || "",
        to: "/persons/" + person?.slug || "",
        createdAt: person?.createdAt || "",
        updatedAt: person?.updatedAt || "",
        publishedBy: person?.publisherData.name || "",
      };
    })
  );
});

const computedLimitProp = computed((): number => {
  return typeof limit.value === "number" ? limit.value : 15;
});

const updateQueryParams = (page: number): void => {
  if (limit.value !== "all") {
    offset.value = (page - 1) * Number(limit.value);
  }
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
  ]): Promise<void> => {
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
