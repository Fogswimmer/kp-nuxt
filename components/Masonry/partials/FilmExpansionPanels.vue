<template>
  <v-expansion-panels variant="accordion" bg-color="transparent">
    <v-expansion-panel
      value="description"
      :title="$t('pages.films.description')"
    >
      <v-expansion-panel-text>
        <v-list-item :subtitle="film?.description" lines="three" />
      </v-expansion-panel-text>
    </v-expansion-panel>
    <v-expansion-panel
      value="comments"
      :title="$t('pages.films.last_comments')"
    >
      <v-expansion-panel-text>
        <v-list v-if="film.assessments.length > 0">
          <v-list-item
            v-for="(comment, i) in film.assessments.slice(0, 5)"
            :key="i"
            :title="comment?.authorName ? comment?.authorName : 'Anonymous'"
            :subtitle="comment.comment"
          >
            <template #prepend>
              <v-avatar border>
                <v-img :src="comment?.authorAvatar || ''">
                  <template #placeholder>
                    <div class="d-flex fill-height align-center justify-center">
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
              <v-chip color="warning" density="compact" prepend-icon="mdi-star">
                {{ comment.rating }}
              </v-chip>
            </template>
          </v-list-item>
          <div
            v-if="film.assessments.length > 5"
            class="d-flex flex-column justify-center align-center"
          >
            <span class="text-h6 mb-2">...</span>
            <v-btn
              prepend-icon="mdi-arrow-right"
              variant="plain"
              @click="navigateTo(`/films/${film?.id}`)"
            >
              {{ $t("actions.to_page") }}</v-btn
            >
          </div>
        </v-list>
        <span v-else class="text-disabled">{{
          $t("pages.films.no_comments")
        }}</span>
      </v-expansion-panel-text>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script lang="ts" setup>
import ErrorPlaceHolder from "~/components/Containment/Img/ErrorPlaceHolder.vue";
defineProps<{ film: IFilm }>();
</script>

<style></style>
