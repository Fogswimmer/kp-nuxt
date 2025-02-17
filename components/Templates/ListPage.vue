<template>
  <v-app id="list-page">
    <client-only>
      <v-navigation-drawer
        v-if="$vuetify.display.mdAndUp"
        location="start"
        order="0"
        width="350"
        :class="
          $vuetify.theme.global.current.dark ? 'neutral-glass' : 'light-glass'
        "
      >
        <slot name="sidebar" />
      </v-navigation-drawer>
      <v-navigation-drawer
        v-model="showFilters"
        order="1"
        width="400"
        location="end"
        :class="
          $vuetify.theme.global.current.dark ? 'neutral-glass' : 'light-glass'
        "
      >
        <div class="pa-4">
          <v-combobox
            v-model="activeSearchOption"
            v-model:search="needle"
            :label="$t('actions.search')"
            :items="searchOptions"
            chips
            hide-details
            prepend-inner-icon="mdi-magnify"
            variant="outlined"
            density="comfortable"
            @update:search="$emit('update:search', $event)"
            @update:model-value="$emit('update:search-options', $event)"
          />
          <slot name="filters" />
        </div>
      </v-navigation-drawer>
    </client-only>
    <v-app-bar order="0">
      <template v-if="$vuetify.display.mdAndUp" #prepend>
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
    <v-main>
      <v-card :loading="loading">
        <v-card-text>
          <v-list
            v-if="items.length > 0"
            :class="
              $vuetify.theme.global.current.dark
                ? 'neutral-glass'
                : 'light-glass'
            "
          >
            <v-list-item
              v-for="(item, i) in items"
              :key="i"
              :to="item.to"
              variant="tonal"
              rounded="lg"
              elevation="5"
              class="my-4 ma-4"
              lines="three"
              :title="item.title"
              :subtitle="item.value"
              :value="item"
            >
              <template #prepend>
                <v-avatar size="100">
                  <v-img :src="item.avatar">
                    <template #placeholder>
                      <v-sheet height="100%">
                        <div
                          class="d-flex align-center justify-center fill-height"
                        >
                          <v-icon icon="mdi-image-off" />
                        </div>
                      </v-sheet>
                    </template>
                  </v-img>
                </v-avatar>
              </template>
              <template #append>
                <span> {{ item.createdAt }}</span>
              </template>
            </v-list-item>
          </v-list>
          <v-skeleton-loader
            v-for="n in limit"
            v-else-if="loading"
            :key="n"
            rounded="lg"
            class="my-3 stained-glass"
            type="list-item-avatar-three-line"
          />
        </v-card-text>

        <slot name="empty-state" />
      </v-card>
    </v-main>
    <v-app-bar location="bottom">
      <v-footer class="d-flex justify-center">
        <ClientOnly>
          <v-pagination
            v-model="currentPage"
            :length="totalPages"
            rounded="lg"
            color="primary"
            :total-visible="3"
            @update:model-value="handlePageChange"
          />
        </ClientOnly>
      </v-footer>
    </v-app-bar>
  </v-app>
</template>

<script lang="ts" setup>
import BackBtn from "../Containment/Btns/BackBtn.vue";
const emit = defineEmits([
  "update:page",
  "form:open",
  "update:search",
  "delete:item",
  "update:search",
  "update:search-options",
]);
const props = defineProps<{
  items: Detail[];
  totalPages: number;
  loading: boolean;
  page: number;
  paginationLabel?: string;
  newPageLink: string;
  listTitle?: string;
  limit?: number;
  searchOptions: { value: string | number; title: string }[];
}>();

const currentPage = ref<number>(1);
const showFilters = ref<boolean>(false);
const activeSearchOption = ref<{ value: string | number; title: string }>(
  props.searchOptions[0]
);
const needle = ref<string>("");

/**
 * Handles pagination page change by updating the component's internal state
 * and emitting "update:page" event to notify parent components.
 * @param {number} page The new page number to navigate to.
 */

const handlePageChange = (page: number): void => {
  currentPage.value = page;
  emit("update:page", page);
};
</script>

<style></style>
