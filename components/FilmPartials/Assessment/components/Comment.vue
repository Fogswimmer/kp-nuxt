<template>
  <v-card
    class="ma-2"
    variant="tonal"
    :color="color || 'surface-variant'"
    density="compact"
  >
    <v-toolbar class="pa-2" density="compact" color="surface">
      <template #prepend>
        <span class="text-subtitle-2 text-disabled">#{{ index + 1 }}</span>
        <div class="position-relative">
          <v-avatar border class="ms-2">
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
          <v-icon
            v-if="!isAdmin"
            class="position-absolute top-0"
            style="right: -5px"
            size="x-small"
            color="yellow"
            >mdi-shield</v-icon
          >
        </div>
      </template>

      <v-toolbar-items>
        <v-btn
          v-if="(isAuthenticated && comment.authorId === userId) || isAdmin"
          variant="plain"
          color="error"
          prepend-icon="mdi-delete"
          class="text-none ms-2"
          @click="showDeleteConfirm = true"
        >
          {{ $t("actions.remove") }}</v-btn
        >
      </v-toolbar-items>
      <template #append>
        <FilmRatingChip :rating="comment.rating.toString() || '0'" />
      </template>
      <template #title>
        <div class="d-flex flex-column">
          <div class="d-flex ga-1 align-center">
            <span class="text-body-1 font-weight-bold text-truncate">{{
              comment.authorName ? comment.authorName : "???"
            }}</span>
          </div>

          <span class="text-caption text-disabled">{{
            dateFormatter(comment.createdAt)
          }}</span>
        </div>
      </template>
    </v-toolbar>
    <v-divider />
    <v-card-text>
      <v-sheet class="pa-2" rounded="lg">
        {{ comment.comment }}
      </v-sheet>
    </v-card-text>
    <ConfirmDialog
      v-model="showDeleteConfirm"
      :text="$t('actions.delete_assessment_warning')"
      @cancel="showDeleteConfirm = false"
      @confirm="handleConfirm(comment.id)"
    />
  </v-card>
</template>

<script lang="ts" setup>
import FilmRatingChip from "~/components/Misc/FilmRatingChip.vue";
import ErrorPlaceHolder from "~/components/Containment/Img/ErrorPlaceHolder.vue";
import ConfirmDialog from "~/components/Dialogs/ConfirmDialog.vue";
interface Comment {
  id: number;
  authorId: number;
  authorName: string;
  authorAvatar: string;
  rating: number;
  comment: string;
  createdAt: string;
  updatedAt: string;
}
defineProps<{
  index: number;
  comment: Comment;
  isAdmin: boolean;
  isAuthenticated: boolean;
  userId?: number;
  color?: string;
}>();

const emits = defineEmits<{
  (event: "confirm:delete", id: number): void;
}>();
const showDeleteConfirm = ref<boolean>(false);

const handleConfirm = (id: number) => {
  showDeleteConfirm.value = false;
  emits("confirm:delete", id);
};

</script>

<style></style>
