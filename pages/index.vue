<template>
  <div>
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
          />
        </v-list>
        <ScrollTopBtn :show="showScrollFab" @scroll:top="scrollTop" />
      </v-navigation-drawer>
    </client-only>
    <main v-scroll="onScroll" class="d-flex flex-column ga-6 overflow-y-auto">
      <v-card
        v-if="filmsPresent"
        id="newest_films"
        variant="text"
        :loading="filmLoading"
        :class="[
          'd-flex flex-column ga-2 px-12 content-item',
          { 'content-item_dark': $vuetify.theme.global.current.dark },
          { 'content-item_light': !$vuetify.theme.global.current.dark },
        ]"
      >
        <v-card-title>
          <h4 class="text-h4 text-center">{{ $t("pages.home.newest") }}</h4>
        </v-card-title>
        <v-card-text v-if="!filmLoading">
          <masonry-wall :items="latestFilms" :max-columns="2" :gap="32">
            <template #default="{ item, index }">
              <v-card
                :key="index"
                :title="item?.name + ' (' + item?.releaseYear + ')'"
                variant="text"
                :class="
                  $vuetify.theme.global.current.dark
                    ? 'dark-glass'
                    : 'light-glass'
                "
              >
                <v-img
                  :src="item?.cover || ''"
                  min-height="200"
                  cover
                  class="cursor-pointer"
                  @click="navigateTo(`/films/${item?.id}`)"
                />
                <template #append>
                  <ClientOnly>
                    <v-rating
                      :model-value="item?.rating || 0"
                      density="compact"
                      size="small"
                      active-color="yellow-darken-3"
                    />
                  </ClientOnly>
                </template>

                <v-card
                  :subtitle="$t('pages.films.description')"
                  variant="text"
                  border
                  class="ma-2"
                >
                  <template #append>
                    <v-icon size="x-small">mdi-details</v-icon>
                  </template>
                  <v-card-text>
                    <div class="d-flex flex-column ga-1">
                      <v-list-item
                        :subtitle="item?.description"
                        :lines="
                          item?.description.length > 100
                            ? expandedStates[index]
                              ? false
                              : 'three'
                            : 'two'
                        "
                      />
                      <ExpandBtn
                        v-if="item?.description.length > 100"
                        :expanded="expandedStates[index]"
                        @click="handleExpandDescription(index)"
                      />
                    </div>
                  </v-card-text>
                </v-card>

                <v-card
                  :subtitle="
                    $t('pages.films.comments') +
                    ' (' +
                    item.assessments.length +
                    ')'
                  "
                  variant="text"
                  border
                  class="ma-2"
                >
                  <template #append>
                    <v-icon size="x-small">mdi-comment-outline</v-icon>
                  </template>
                  <v-card-text v-if="item.assessments.length > 0">
                    <v-list>
                      <v-list-item
                        v-for="(comment, i) in item.assessments.slice(0, 2)"
                        :key="i"
                        :title="
                          comment?.authorName
                            ? comment?.authorName
                            : 'Anonymous'
                        "
                        :prepend-avatar="
                          comment?.authorAvatar
                            ? comment?.authorAvatar
                            : undefined
                        "
                        :subtitle="comment.comment"
                      >
                        <template #append>
                          <v-chip
                            color="warning"
                            density="compact"
                            prepend-icon="mdi-star"
                          >
                            {{ comment.rating }}
                          </v-chip>
                        </template>
                      </v-list-item>
                    </v-list>
                    <div
                      v-if="item.assessments.length > 2"
                      class="d-flex flex-column justify-center align-center"
                    >
                      <span class="text-h6 mb-2">...</span>
                      <v-btn
                        prepend-icon="mdi-arrow-right"
                        variant="plain"
                        @click="navigateTo(`/films/${item?.id}`)"
                      >
                        {{ $t("actions.to_page") }}</v-btn
                      >
                    </div>
                  </v-card-text>
                </v-card>
              </v-card>
            </template>
          </masonry-wall>
        </v-card-text>
        <v-row v-else>
          <v-col v-for="i in 2" :key="i">
            <v-skeleton-loader type="card" height="400" />
          </v-col>
        </v-row>
      </v-card>

      <v-card
        v-if="personsPresent"
        id="popular_actors"
        :class="[
          'd-flex flex-column ga-2 px-12 content-item',
          { 'content-item_dark': $vuetify.theme.global.current.dark },
          { 'content-item_light': !$vuetify.theme.global.current.dark },
        ]"
      >
        <v-card-title>
          <h4 class="text-h4 text-center">
            {{ $t("pages.home.popular_actors") }}
          </h4>
        </v-card-title>
        <v-divider />
        <v-card-text v-if="!personLoading">
          <masonry-wall :items="popularActors" :max-columns="3" :gap="16">
            <template #default="{ item, index }">
              <v-card
                :key="index"
                :loading="personLoading"
                elevation="10"
                :title="item?.name"
                :class="
                  $vuetify.theme.global.current.dark
                    ? 'dark-glass'
                    : 'light-glass'
                "
              >
                <v-img
                  :src="item?.avatar || ''"
                  min-height="400"
                  cover
                  class="cursor-pointer"
                  @click="navigateTo(`/persons/${item?.id}`)"
                />
              </v-card>
            </template>
          </masonry-wall>
        </v-card-text>
        <v-row v-else>
          <v-col v-for="i in 2" :key="i">
            <v-skeleton-loader type="card" height="400" />
          </v-col>
        </v-row>
      </v-card>
    </main>
  </div>
</template>

<script lang="ts" setup>
import { useFilmStore } from "~/stores/filmStore";
import { usePersonStore } from "~/stores/personStore";
import ExpandBtn from "~/components/Containment/Btns/ExpandBtn.vue";
import ScrollTopBtn from "~/components/Containment/Btns/ScrollTopBtn.vue";

// const theme = useTheme();
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
const expandedStates = ref<boolean[]>([]);
const activeSection = ref<string | undefined>("newest");

const showScrollFab = ref<boolean>(false);

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

const handleExpandDescription = (index: number): void => {
  expandedStates.value[index] = !expandedStates.value[index];
};

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

const onScroll = () => {
  watchScrolling("content-item", activeSection, showScrollFab);
};

onMounted(async (): Promise<void> => {
  await fetchData();
});

definePageMeta({
  name: "home",
  path: "/",
});
</script>

<style lang="scss">
.content-item {
  &_dark {
    background-image: radial-gradient(
      circle at center center,
      rgba(23, 93, 151, 0.247),
      rgb(8, 8, 8, 0.7)
    ) !important;
  }
  &_light {
    background-image: radial-gradient(
      circle at center center,
      rgb(173, 173, 173),
      rgb(255, 255, 255)
    ) !important;
  }
}
</style>
