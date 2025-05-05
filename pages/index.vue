<template>
  <div>
    <Head>
      <Title>{{ definePageTitle($t("pages.home.title")) }}</Title>
      <Meta name="description" :content="$t('page_descriptions.home')" />
    </Head>
    <template v-if="filmsPresent && personsPresent">
      <main class="d-flex flex-column ga-2 overflow-y-hidden">
        <MasonrySection
          v-if="latestFilms.length > 0"
          :present="filmsPresent"
          :loading="filmLoading"
          :title="$t('pages.home.newest')"
        >
          <template #default>
            <HomeWall
              :items="latestFilmItems"
              :loading="filmLoading"
              :sidebar="false"
            />
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
      </main>
    </template>
<!-- 
    <EmptyPage v-else-if="!filmLoading && !personLoading">
      <template #default>
        <v-empty-state
          :headline="$t('empty_states.no_content')"
          :title="$t('empty_states.no_content_notice')"
          :action-text="$t('empty_states.actions.add_persons')"
          icon="mdi-alert-circle"
          @click:action="navigateTo('/persons/new')"
        />
      </template>
    </EmptyPage> -->

    <template v-else>
      <div
        style="height: calc(100vh - 100px)"
        class="d-flex align-center justify-center"
      >
        <v-progress-circular indeterminate color="primary" />
      </div>
    </template>
  </div>
</template>

<script lang="ts" setup>
import { useFilmStore } from "~/stores/filmStore";
import { usePersonStore } from "~/stores/personStore";
import EmptyPage from "~/components/Templates/EmptyPage.vue";
import MasonrySection from "~/components/Masonry/partials/MasonrySection.vue";
import HomeWall from "~/components/Masonry/HomeWall.vue";
import definePageTitle from "~/utils/definePageTitle";

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
};

const latestFilmItems = computed((): Detail[] => {
  return latestFilms.value[0] !== null
    ? latestFilms.value?.map((film: IFilm) => {
        return {
          title: useInternationalName(film.name, film.internationalName),
          value: film.description || "",
          rating: film.rating || "0",
          avatar: film.poster || film.gallery[0] || "",
          to: "/films/" + film.slug,
          createdAt: film.createdAt || "",
        };
      })
    : [];
});

const topFilmItems = computed((): Detail[] => {
  return topFilms.value[0] !== null
    ? topFilms.value?.map((film: IFilm) => {
        return {
          title: useInternationalName(film.name, film.internationalName),
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
          person.internationalName
        ),
        value: person?.bio || "",
        avatar: person?.avatar || "",
        to: "/persons/" + person?.slug || "",
      };
    })
  );
});

onMounted(async (): Promise<void> => {
  await fetchData();
});

definePageMeta({
  name: "home",
  path: "/",
  description: "Home page",
});
</script>
