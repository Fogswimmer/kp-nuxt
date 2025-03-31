<template>
  <div>
    <v-card v-if="assessments.length > 0" rounded="lg" border>
      <v-data-iterator
        :items="assementsWithColors"
        :page="page"
        :items-per-page="itemsPerPage"
      >
        <template #header="{ page: currPage, pageCount, prevPage, nextPage }">
          <div class="d-flex justify-space-between align-center pa-2">
            <v-btn
              class="me-8"
              variant="text"
              :disabled="assessments.length < itemsPerPage"
              @click="seeAllOnClick"
            >
              <span
                class="text-decoration-underline text-none text-subtitle-2"
                >{{ $t("general.see_all") }}</span
              >
            </v-btn>
            <div class="d-inline-flex">
              <v-btn
                :disabled="currPage === 1"
                class="me-2"
                icon="mdi-arrow-left"
                size="small"
                variant="plain"
                density="compact"
                @click="prevPage"
              />

              <v-btn
                :disabled="currPage === pageCount"
                icon="mdi-arrow-right"
                size="small"
                variant="plain"
                density="compact"
                @click="nextPage"
              />
            </div>
          </div>
          <v-divider />
        </template>
        <template #default="{ items }">
          <div v-for="(item, i) in items" :key="i">
            <Comment
              :color="item.raw.color"
              :index="i"
              :comment="item.raw"
              :is-admin="isAdmin"
              :is-authenticated="isAuthenticated"
              :user-id="currentUser?.id || 0"
              @confirm:delete="confirmDelete"
            />
          </div>
        </template>
        <template #footer="{ pageCount }">
          <v-footer class="justify-space-between text-subtitle-2 mt-4">
            {{ $t("general.total") }}: {{ assessments.length }}

            <div>
              {{ $t("general.page") }} {{ page }} {{ $t("general.of") }}
              {{ pageCount }}
            </div>
          </v-footer>
        </template>
      </v-data-iterator>
    </v-card>
    <v-sheet v-else height="100">
      <div class="d-flex fill-height justify-center align-center">
        <v-label class="text-caption">
          {{ $t("pages.films.no_comments") }} ...
        </v-label>
      </div>
    </v-sheet>
  </div>
</template>

<script lang="ts" setup>
import Comment from "./components/Comment.vue";

const emits = defineEmits<{
  (event: "coment:delete", id: number): void;
}>();
const props = defineProps<{
  assessments: IAssessment[];
  comment: string;
}>();

const { currentUser, isAuthenticated, isAdmin } = storeToRefs(useAuthStore());
const page = ref<number>(1);
const itemsPerPage = ref<number>(5);
const showDeleteConfirm = ref<boolean>(false);
const commentColors = [
  "primary",
  "secondary",
  "green",
  "blue",
  "orange",
  "yellow",
];
const seeAllOnClick = () => {
  itemsPerPage.value = itemsPerPage.value === 5 ? props.assessments.length : 5;
};

const assementsWithColors = computed(() => {
  const commentsWithSameAuthor = props.assessments.reduce((acc, item) => {
    const { authorId: author } = item;
    acc[author] = acc[author] || [];
    acc[author].push(item);
    return acc;
  }, {} as Record<string, IAssessment[]>);

  const assementsWithColors = Object.entries(commentsWithSameAuthor).map(
    ([_, comments]) => {
      const color = commentColors[comments.length % commentColors.length];
      return comments.map((comment) => {
        return {
          ...comment,
          color,
        };
      });
    }
  );

  return assementsWithColors.flat();
});
const confirmDelete = (id: number) => {
  console.log(id);
  emits("coment:delete", id);
  showDeleteConfirm.value = false;
};
</script>

<style></style>
