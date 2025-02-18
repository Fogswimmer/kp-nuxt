<template>
  <div>
    <template v-if="filmsPresent && personsPresent">
      <client-only>
        <v-navigation-drawer order="1" floating />
        <v-navigation-drawer
          v-if="$vuetify.display.mdAndUp"
          location="end"
          tag="aside"
          order="1"
        >
          <v-list nav>
            <v-list-item
              v-for="(link, index) in pageContents"
              :key="index"
              :active="link.value === activeSection"
              :title="link.title"
              :value="link.value"
              :prepend-icon="link.icon"
              :href="`/#${link.value}`"
              @click="activeSection = link.value"
            />
          </v-list>
          <ScrollTopBtn :show="showScrollFab" @scroll:top="scrollTop" />
        </v-navigation-drawer>
      </client-only>
      <main v-scroll="onScroll" class="d-flex flex-column ga-6 overflow-y-auto">
        <MasonrySection
          id="newest_films"
          class="content-item"
          :present="filmsPresent"
          :loading="filmLoading"
          :dark-accent-color="darkAccentColors[0]"
          :title="$t('pages.home.newest')"
        >
          <template #default>
            <NewestFilmsMasonryWall
              :latest-films="latestFilms"
              :loading="filmLoading"
              :sidebar="false"
            />
          </template>
        </MasonrySection>

        <MasonrySection
          v-if="popularActors.length > 0"
          id="popular_actors"
          :present="personsPresent"
          :loading="personLoading"
          :dark-accent-color="darkAccentColors[1]"
          :title="$t('pages.home.popular_actors')"
        >
          <template #default>
            <PopularActorsMasonry
              :popular-actors="popularActors"
              :loading="personLoading"
              :sidebar="false"
            />
          </template>
        </MasonrySection>
      </main>
    </template>
    <template v-else>
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
  </div>
</template>

<script lang="ts" setup>
import { useFilmStore } from "~/stores/filmStore";
import { usePersonStore } from "~/stores/personStore";
import EmptyPage from "~/components/Templates/EmptyPage.vue";
import ScrollTopBtn from "~/components/Containment/Btns/ScrollTopBtn.vue";
import MasonrySection from "~/components/Masonry/partials/MasonrySection.vue";
import NewestFilmsMasonryWall from "~/components/Masonry/NewestFilmsMasonryWall.vue";
import PopularActorsMasonry from "~/components/Masonry/PopularActorsMasonry.vue";

const { t } = useI18n();
const {
  loading: filmLoading,
  filmsPresent,
  latestFilms,
} = storeToRefs(useFilmStore());
const { fetchLatestFilms, checkFilmsPresence } = useFilmStore();
const { listPopularActors, checkPersonsPresence } = usePersonStore();
const {
  loading: personLoading,
  personsPresent,
  popularActors,
} = storeToRefs(usePersonStore());

const activeSection = ref<string | undefined>("newest_films");
const scrollPosition = ref<number>(0);
const showScrollFab = ref<boolean>(false);

const fetchData = async (): Promise<void> => {
  await checkFilmsPresence();
  await checkPersonsPresence();
  if (filmsPresent.value) {
    await fetchLatestFilms();
  }
  if (personsPresent.value) {
    await listPopularActors();
  } else if (!filmsPresent.value && !personsPresent.value) {
    navigateTo("/no-content");
  }
};

const darkAccentColors = Array.from({ length: 2 }, () =>
  randomColorGenerator()
);

const pageContents: Partial<Detail>[] = [
  {
    title: t("pages.home.newest"),
    value: "newest_films",
    icon: "mdi-new-box",
  },
  {
    title: t("pages.home.popular_actors"),
    value: "popular_actors",
    icon: "mdi-star",
  },
];

const onScroll = async () => {
  watchScrolling("content-item", activeSection, showScrollFab);
};

onMounted(async (): Promise<void> => {
  await fetchData();
});

watch(
  () => scrollPosition.value,
  () => {
    showScrollFab.value = scrollPosition.value > 100;
  }
);

definePageMeta({
  name: "home",
  path: "/",
});
</script>
