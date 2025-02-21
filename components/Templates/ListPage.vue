<template>
  <div>
    <v-app-bar order="1">
      <template #prepend>
        <BackBtn />
      </template>
      <v-app-bar-title>
        <span class="text-h6 text-lg-h5 font-weight-bold">
          {{ listTitle }}</span
        >
      </v-app-bar-title>
      <template #append>
        <v-btn
          icon
          :color="showFilters ? 'primary' : ''"
          @click="showFilters = !showFilters"
        >
          <v-icon>{{ showFilters ? "mdi-filter-off" : "mdi-filter" }}</v-icon>
          <v-tooltip activator="parent" location="bottom">
            {{ $t("filters.title") }}</v-tooltip
          >
        </v-btn>
        <v-btn icon :to="newPageLink">
          <v-icon>mdi-plus</v-icon>
          <v-tooltip activator="parent" location="bottom">
            {{ $t("actions.add") }}
          </v-tooltip>
        </v-btn>
      </template>
    </v-app-bar>
    <client-only>
      <v-navigation-drawer v-model="showFilters" order="1" location="end">
        <div class="pa-4">
          <v-text-field
            v-model="needle"
            :label="$t('actions.search')"
            chips
            hide-details
            prepend-inner-icon="mdi-magnify"
            variant="outlined"
            density="comfortable"
            @update:model-value="$emit('update:search', $event)"
          />
          <slot name="filters" />
        </div>
      </v-navigation-drawer>
    </client-only>

    <div>
      <v-list v-if="items.length > 0 && !loading">
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          rounded="lg"
          elevation="5"
          lines="two"
          :title="item.title"
          :subtitle="item.value"
          :value="item"
        >
          <template #prepend>
            <v-avatar size="100">
              <v-img :src="item.avatar">
                <template #placeholder>
                  <v-sheet height="100%">
                    <div class="d-flex align-center justify-center fill-height">
                      <v-icon icon="mdi-image-off" />
                    </div>
                  </v-sheet>
                </template>
              </v-img>
            </v-avatar>
          </template>
          <template v-if="$vuetify.display.mdAndUp" #append>
            <v-chip variant="plain" density="compact">
              {{ $t("general.created_at") + ": " + item.createdAt }}</v-chip
            >
          </template>
        </v-list-item>
      </v-list>
      <v-skeleton-loader
        v-for="n in limit"
        v-else
        :key="n"
        rounded="lg"
        class="my-3 stained-glass"
        type="list-item-avatar-three-line"
      />
    </div>
    <v-app-bar location="bottom" order="1">
      <v-footer class="d-flex justify-center">
        <v-pagination
          v-model="currentPage"
          :length="totalPages"
          rounded="lg"
          color="primary"
          :total-visible="3"
          @update:model-value="handlePageChange"
        />
      </v-footer>
    </v-app-bar>
    <slot name="empty-state" />
  </div>
</template>

<script lang="ts" setup>
import BackBtn from "../Containment/Btns/BackBtn.vue";
const emit = defineEmits([
  "update:page",
  "form:open",
  "update:search",
  "delete:item",
  "update:search",
]);
defineProps<{
  items: Detail[];
  totalPages: number;
  loading: boolean;
  page: number;
  paginationLabel?: string;
  newPageLink: string;
  listTitle?: string;
  limit?: number;
}>();

const currentPage = ref<number>(1);
const showFilters = ref<boolean>(false);
const needle = ref<string>("");

const handlePageChange = (page: number): void => {
  currentPage.value = page;
  emit("update:page", page);
};
</script>

<style></style>
