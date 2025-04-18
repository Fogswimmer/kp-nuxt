<template>
  <v-card
    border
    variant="outlined"
    class="ma-2"
    :color="color || 'surface-variant'"
    density="compact"
  >
    <v-toolbar class="pa-2" density="compact" color="transparent">
      <template #prepend>
        <div class="position-relative">
          <v-avatar border>
            <v-img :src="comment?.authorAvatar || ''">
              <template #placeholder>
                <ImgPlaceholder :loading="loading" icon="mdi-account" />
              </template>
              <template #error>
                <ErrorPlaceHolder />
              </template>
            </v-img>
          </v-avatar>
        </div>
      </template>
      <template #append>
        <FilmRatingChip :rating="comment.rating.toString() || '0'" />
      </template>
      <template #title>
        <div class="d-flex flex-column">
          <span
            class="text-body-2 text-lg-text-body-1 font-weight-bold text-truncate"
            >{{ comment.authorName ? comment.authorName : "???" }}</span
          >
          <span class="text-caption text-disabled">{{
            dateFormatter(comment.createdAt)
          }}</span>
        </div>
      </template>
    </v-toolbar>
    <v-divider />
    <div class="d-flex pa-2 align-center text-white">
      <span> {{ comment.comment }}</span>
      <v-spacer></v-spacer>
      <v-tooltip>
        <template #activator="{ props }">
          <v-btn
            v-if="(isAuthenticated && comment.authorId === userId) || isAdmin"
            v-bind="props"
            variant="plain"
            icon
            color="error"
            size="small"
            density="compact"
            @click="showDeleteConfirm = true"
          >
            <v-icon>mdi-delete</v-icon></v-btn>
        </template>{{ $t("actions.remove") }}
      </v-tooltip>
    </div>

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
import ImgPlaceholder from "~/components/Containment/Img/ImgPlaceholder.vue";
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
  loading: boolean;
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

const sortOrder = ref<"asc" | "desc">("asc");

const handleConfirm = (id: number) => {
  showDeleteConfirm.value = false;
  emits("confirm:delete", id);
};
</script>

<style></style>
