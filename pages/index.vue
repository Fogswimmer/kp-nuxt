<template>
  <div>
    <Head>
      <Title>{{ definePageTitle($t("pages.home.title")) }}</Title>
      <Meta name="description" :content="$t('page_descriptions.home')" />
    </Head>
    <v-card class="mx-auto" max-width="1300" variant="text">
      <template v-if="filmLoading || personLoading" #loader>
        <v-progress-linear indeterminate color="primary" />
      </template>
      <template v-if="filmsPresent && personsPresent">
        <main
          v-scroll="onScroll"
          class="d-flex flex-column ga-6 overflow-y-hidden"
        >
          <section class="masonry-section">
            <MasonrySection
              v-if="latestFilms.length > 0"
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
          </section>

          <transition-group name="fade">
            <section v-if="showSection">
              <MasonrySection
                v-if="popularActors.length > 0"
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
              <AppFooter v-if="!filmLoading && !personLoading" />
            </section>
            <SectionDivider extended />
          </transition-group>
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
    </v-card>
  </div>
</template>

<script lang="ts" setup>
import { useFilmStore } from "~/stores/filmStore";
import { usePersonStore } from "~/stores/personStore";
import EmptyPage from "~/components/Templates/EmptyPage.vue";
import MasonrySection from "~/components/Masonry/partials/MasonrySection.vue";
import NewestFilmsMasonryWall from "~/components/Masonry/NewestFilmsMasonryWall.vue";
import PopularActorsMasonry from "~/components/Masonry/PopularActorsMasonry.vue";
import definePageTitle from "~/utils/definePageTitle";
import AppFooter from "~/components/Navigation/AppFooter.vue";
import SectionDivider from "~/components/Misc/SectionDivider.vue";
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

const fetchData = async (): Promise<void> => {
  await checkFilmsPresence();
  await checkPersonsPresence();
  if (filmsPresent.value) {
    await fetchLatestFilms();
  }
  if (personsPresent.value) {
    await listPopularActors();
  }
};

const darkAccentColors = Array.from({ length: 2 }, () =>
  randomColorGenerator()
);

const showSection = ref(false);

const onScroll = (): void => {
  if (window.scrollY > 0) {
    showSection.value = true;
  } else {
    showSection.value = false;
  }
};

onMounted(async (): Promise<void> => {
  await fetchData();
});

definePageMeta({
  name: "home",
  path: "/",
});
</script>
