<template>
  <v-card v-if="assessments.length > 0" rounded="lg" border>
    <v-data-iterator
      :items="assessments"
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
            <span class="text-decoration-underline text-none text-subtitle-2">{{
              $t("general.see_all")
            }}</span>
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
        <Comment
          v-for="(item, i) in items"
          :key="i"
          :index="i"
          :comment="item.raw"
          :is-admin="isAdmin"
          :is-authenticated="isAuthenticated"
          :user-id="currentUser?.id || 0"
          @confirm:delete="confirmDelete"
        />
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
</template>

<script lang="ts" setup>
import Comment from "./components/Comment.vue";
const { currentUser, isAuthenticated, isAdmin } = storeToRefs(useAuthStore());
const emits = defineEmits<{
  (event: "coment:delete", id: number): void;
}>();
const props = defineProps<{
  assessments: IAssessment[];
  comment: string;
}>();
const page = ref<number>(1);
const itemsPerPage = ref<number>(5);
const showDeleteConfirm = ref<boolean>(false);
const seeAllOnClick = () => {
  itemsPerPage.value = itemsPerPage.value === 5 ? props.assessments.length : 5;
};
const confirmDelete = (id: number) => {
  console.log(id);
  emits("coment:delete", id);
  showDeleteConfirm.value = false;
};
</script>

<style></style>
