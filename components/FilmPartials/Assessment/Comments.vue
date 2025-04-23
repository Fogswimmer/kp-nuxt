<template>
  <v-card elevation="5" border>
    <template v-if="assessments.length > 0">
      <v-data-iterator
        :items="assementsWithColors"
        :page="page"
        :items-per-page="itemsPerPage"
      >
        <template #header>
          <v-toolbar class="px-1" color="transparent">
            <v-toolbar-title>
            <span class="text-subtitle-1 text-lg-body-1">  {{ $t("pages.films.comments") }}</span>
            </v-toolbar-title>
            <v-btn
              variant="tonal"
              size="small"
              :disabled="assessments.length < itemsPerPage"
              @click="seeAllOnClick"
            >
              <span class="text-none text-subtitle-2">{{
                $t("general.see_all")
              }}</span>
            </v-btn>
          </v-toolbar>
        </template>
        <template #default="{ items }">
          <Comment
            v-for="(item, i) in items"
            :key="i"
            :loading="loading"
            :color="item.raw.color"
            :index="i"
            :comment="item.raw"
            :is-admin="isAdmin"
            :is-authenticated="isAuthenticated"
            :user-id="currentUser?.id || 0"
            @confirm:delete="confirmDelete"
          />
        </template>
        <template #footer="{ pageCount }">
          <v-footer class="justify-space-between text-subtitle-2 mt-2 glassed">
            <span> {{ $t("general.total") }}: {{ assessments.length }}</span>
            <ClientOnly>
              <v-pagination
                v-model="page"
                :length="pageCount"
                rounded="lg"
                variant="plain"
                color="secondary"
                :total-visible="3"
                density="compact"
              ></v-pagination
            ></ClientOnly>
          </v-footer>
        </template>
      </v-data-iterator>
    </template>
    <v-sheet v-else height="100">
      <div class="d-flex fill-height justify-center align-center">
        <v-label class="text-caption">
          {{ $t("pages.films.no_comments") }} ...
        </v-label>
      </div>
    </v-sheet>
  </v-card>
</template>

<script lang="ts" setup>
import Comment from "./components/Comment.vue";

const emits = defineEmits<{
  (event: "coment:delete", id: number): void;
}>();
const props = defineProps<{
  assessments: IAssessment[];
  comment: string;
  loading: boolean;
}>();

const { currentUser, isAuthenticated, isAdmin } = storeToRefs(useAuthStore());
const page = ref<number>(1);
const itemsPerPage = ref<number>(5);
const showDeleteConfirm = ref<boolean>(false);
const commentColors = [
  'blue',
  'green',
  'red',
  'yellow',
  'orange',
  'pink',
  'indigo',
  'purple',
  'teal',
  'cyan',
  'brown',
];
const seeAllOnClick = () => {
  itemsPerPage.value = itemsPerPage.value === 5 ? props.assessments.length : 5;
};

const assementsWithColors = computed(() => {
  const commentsWithSameAuthor = props.assessments.reduce(
    (acc, item) => {
      const { authorId: author } = item;
      acc[author] = acc[author] || [];
      acc[author].push(item);
      return acc;
    },
    {} as Record<string, IAssessment[]>
  );

  const mappedAssementsWithColors = Object.entries(commentsWithSameAuthor).map(
    ([_, comments]) => {
      const color = commentColors[
        Math.floor(Math.random() * commentColors.length)
      ];
      return comments.map((comment) => {
        return {
          ...comment,
          color,
        };
      });
    }
  );

  return mappedAssementsWithColors.flat().sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
});
const confirmDelete = (id: number) => {
  console.log(id);
  emits("coment:delete", id);
  showDeleteConfirm.value = false;
};
</script>

<style></style>
