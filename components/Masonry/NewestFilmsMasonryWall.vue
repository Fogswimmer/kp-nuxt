<template>
  <masonry-wall :items="latestFilms" :max-columns="2" :gap="32">
    <template #default="{ item, index }">
      <MasonryCard
        :loading="loading"
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
            v-if="!sidebar"
            :subtitle="$t('pages.films.description')"
            variant="text"
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
              $t('pages.films.last_comments') +
              ' (' +
              item.assessments.length +
              ')'
            "
            variant="text"
            class="ma-2"
          >
            <template #append>
              <v-icon size="x-small">mdi-comment-outline</v-icon>
            </template>
            <v-card-text v-if="item.assessments.length > 0">
              <v-list
                :nav="sidebar"
              >
                <v-list-item
                  v-for="(comment, i) in item.assessments.slice(0, 5)"
                  :key="i"
                  :title="
                    comment?.authorName ? comment?.authorName : 'Anonymous'
                  "
                  :prepend-avatar="
                    comment?.authorAvatar ? comment?.authorAvatar : undefined
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

<script lang="ts" setup>
import MasonryCard from "./partials/MasonryCard.vue";
import ExpandBtn from "~/components/Containment/Btns/ExpandBtn.vue";

defineProps<{
  latestFilms: IFilm[];
  loading: boolean;
  sidebar?: boolean;
}>();

const expandedStates = ref<boolean[]>([]);

const handleExpandDescription = (index: number): void => {
  expandedStates.value[index] = !expandedStates.value[index];
};
</script>

<style></style>
