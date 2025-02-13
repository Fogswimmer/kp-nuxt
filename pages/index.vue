div
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
          <masonry-wall :items="latestFilms" :max-columns="2" :gap="32">
            <template #default="{ item, index }">
              <MasonryCard
                :loading="filmLoading"
                :index="index"
                :item="item"
                :img="item?.cover || ''"
                :link="`/films/${item?.id}`"
              >
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

                <template #default>
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
                          :expanded="expandedStates[index] || false"
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
                </template>
              </MasonryCard>
            </template>
          </masonry-wall>
        </template>
      </MasonrySection>

      <MasonrySection
        id="popular_actors"
        :present="personsPresent"
        :loading="personLoading"
        :dark-accent-color="darkAccentColors[1]"
        :title="$t('pages.home.popular_actors')"
      >
        <template #default>
          <masonry-wall :items="popularActors" :min-columns="3" :gap="16">
            <template #default="{ item, index }">
              <MasonryCard
                :loading="personLoading"
                :item="item"
                :index="index"
                :img="item?.avatar || ''"
                :link="`/persons/${item?.id}`"
              />
            </template>
          </masonry-wall>
        </template>
      </MasonrySection>
    </main>
  </div>
</template>

<script lang="ts" setup>
import { useFilmStore } from "~/stores/filmStore";
import { usePersonStore } from "~/stores/personStore";
import ExpandBtn from "~/components/Containment/Btns/ExpandBtn.vue";
import ScrollTopBtn from "~/components/Containment/Btns/ScrollTopBtn.vue";
import MasonryCard from "~/components/Containment/Cards/MasonryCard.vue";
import MasonrySection from "~/components/Containment/Cards/MasonrySection.vue";

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
  }
};

const handleExpandDescription = (index: number): void => {
  expandedStates.value[index] = !expandedStates.value[index];
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
  scrollPosition.value = window.scrollY;
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
