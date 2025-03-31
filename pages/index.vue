<template>
  <div>
    <Head>
      <Title>{{ definePageTitle($t("pages.home.title")) }}</Title>
      <Meta name="description" :content="$t('page_descriptions.home')" />
    </Head>
    <ClientOnly>
      <v-navigation-drawer location="start" floating color="transparent" />
      <v-navigation-drawer location="end" floating color="transparent" />
    </ClientOnly>
    <template v-if="filmsPresent && personsPresent">
      <main class="d-flex flex-column ga-6 overflow-y-hidden">
        <MasonrySection
          v-if="latestFilms.length > 0"
          :present="filmsPresent"
          :loading="filmLoading"
          :dark-accent-color="darkAccentColors[0]"
          :title="$t('pages.home.newest')"
        >
          <template #default>
            <FilmsMasonryWall
              :latest-films="latestFilms"
              :loading="filmLoading"
              :dark-accent-color="darkAccentColors[0]"
              :sidebar="false"
            />

          </template>
        </MasonrySection>
        <MasonrySection
          v-if="topFilms.length > 0"
          :present="filmsPresent"
          :loading="filmLoading"
          :dark-accent-color="darkAccentColors[1]"
          :title="$t('pages.home.top', topFilms.length)"
        >
          <template #default>
            <FilmsMasonryWall
              :latest-films="topFilms"
              :loading="filmLoading"
              :dark-accent-color="darkAccentColors[1]"
              :sidebar="false"
            />
          </template>
        </MasonrySection>

        <MasonrySection
          v-if="popularActors.length > 0"
          :present="personsPresent"
          :loading="personLoading"
          :dark-accent-color="darkAccentColors[2]"
          :title="$t('pages.home.popular_actors')"
        >
          <template #default>
            <PopularActorsMasonry
              :popular-actors="popularActors"
              :loading="personLoading"
              :dark-accent-color="darkAccentColors[2]"
              :sidebar="false"
            />
          </template>
        </MasonrySection>
      </main>
    </template>
    <template v-else-if="!filmLoading && !personLoading">
      <EmptyPage>
        <template #default>
          <v-empty-state
            :headline="$t('empty_states.no_content')"
            :title="$t('empty_states.no_content_notice')"
            :action-text="$t('empty_states.actions.add_persons')"
            icon="mdi-alert-circle"
            @click:action="navigateTo('/persons/new')"
          />
        </template>
      </EmptyPage>
    </template>
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
import FilmsMasonryWall from "~/components/Masonry/FilmsMasonryWall.vue";
import PopularActorsMasonry from "~/components/Masonry/PopularActorsMasonry.vue";
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

const darkAccentColors = ref<string[]>([]);

const fetchData = async (): Promise<void> => {
  await checkFilmsPresence();
  await checkPersonsPresence();
  if (filmsPresent.value) {
    await fetchLatestFilms();
    await fetchTopFilms();
  }
  if (personsPresent.value) {
    await listPopularActors();
  }
};

onMounted(async (): Promise<void> => {
  await fetchData();
  darkAccentColors.value = Array.from(
    { length: 2 },
    () => useBgAccentColor().value
  );
});

definePageMeta({
  name: "home",
  path: "/",
  description: "Home page",
});
</script>
