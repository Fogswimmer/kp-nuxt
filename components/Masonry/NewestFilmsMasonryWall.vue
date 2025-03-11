<template>
  <masonry-wall :items="latestFilms" :gap="16" :max-columns="3">
    <template #default="{ item, index }">
      <MasonryCard
        :loading="loading"
        :index="index"
        :item="item"
        :img="item?.poster || ''"
        :link="`/films/${item?.id}`"
      >
        <template #append>
          <ClientOnly>
            <v-rating
              v-if="$vuetify.display.mdAndUp"
              :model-value="item?.rating || 0"
              density="compact"
              size="small"
              readonly
              active-color="yellow-darken-3"
            />
            <v-chip
              v-else
              color="warning"
              density="compact"
              prepend-icon="mdi-star"
            >
              {{ item?.rating || 0 }}
            </v-chip>
          </ClientOnly>
        </template>

        <template #default>
          <v-list-item
            :subtitle="item?.description"
            elevation="5"
            rounded="lg"
            class="ma-2 glassed"
            density="compact"
            lines="three"
          />
          <v-list v-if="item.assessments.length > 0" :nav="sidebar">
            <v-list-subheader>{{
              $t("pages.films.last_comments")
            }}</v-list-subheader>
            <v-list-item
              v-for="(comment, i) in item.assessments.slice(0, 5)"
              :key="i"
              :title="comment?.authorName ? comment?.authorName : 'Anonymous'"
              :prepend-avatar="
                comment?.authorAvatar ? comment?.authorAvatar : undefined
              "
              :subtitle="comment.comment"
            >
              <template #prepend>
                <v-avatar border>
                  <v-img :src="comment?.authorAvatar || ''">
                    <template #placeholder>
                      <div
                        class="d-flex fill-height align-center justify-center"
                      >
                        <v-icon size="x-small">mdi-account</v-icon>
                      </div>
                    </template>
                    <template #error>
                      <ErrorPlaceHolder />
                    </template>
                  </v-img>
                </v-avatar>
              </template>
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
        </template>
      </MasonryCard>
    </template>
  </masonry-wall>
</template>

<script lang="ts" setup>
import MasonryCard from "./partials/MasonryCard.vue";
import ErrorPlaceHolder from "../Containment/Img/ErrorPlaceHolder.vue";

defineProps<{
  latestFilms: IFilm[];
  loading: boolean;
  sidebar?: boolean;
  link?: string;
}>();
</script>

<style></style>
