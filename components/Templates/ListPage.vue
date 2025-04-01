<template>
  <div class="position-relative">
    <GradientWrapper>
      <v-app-bar class="glassed" elevation="5">
        <template #prepend>
          <BackBtn />
        </template>
        <v-toolbar-title>
          <span class="text-h6 text-lg-h5 font-weight-bold">
            {{ listTitle }}</span
          >
        </v-toolbar-title>
        <v-responsive v-if="$vuetify.display.mdAndUp" max-width="400">
          <v-text-field
            v-model="needle"
            :placeholder="$t('actions.search')"
            chips
            hide-details
            prepend-inner-icon="mdi-magnify"
            variant="outlined"
            density="comfortable"
            clearable
            @click:clear="needle = ''"
            @update:model-value="$emit('update:search', $event)"
          />
        </v-responsive>
        <template #append>
          <v-btn
            v-if="$vuetify.display.smAndDown"
            icon
            :color="showSearch ? 'primary' : ''"
            @click="showSearch = !showSearch"
          >
            <v-icon>mdi-magnify</v-icon>
            <v-tooltip activator="parent" location="bottom">
              {{ $t("filters.title") }}
            </v-tooltip>
          </v-btn>
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
          <v-btn
            icon
            :disabled="!isAuthenticated"
            :to="localeRoute(newPageLink)"
          >
            <v-icon>mdi-plus</v-icon>
            <v-tooltip activator="parent" location="bottom">
              {{ $t("actions.add") }}
            </v-tooltip>
          </v-btn>
        </template>
      </v-app-bar>

      <client-only>
        <v-navigation-drawer width="400">
          <slot name="sidebar" />
        </v-navigation-drawer>
        <v-navigation-drawer
          v-if="$vuetify.display.smAndDown"
          v-model="showSearch"
          order="1"
          width="300"
          temporary
        >
          <div class="pa-2 flex flex-column ga-4">
            <div class="d-flex ga-2">
              <v-text-field
                v-model="needle"
                :placeholder="$t('actions.search')"
                chips
                hide-details
                prepend-inner-icon="mdi-magnify"
                variant="outlined"
                :loading="loading"
                clearable
                @click:clear="needle = ''"
                @update:model-value="$emit('update:search', $event)"
              />
              <v-btn icon variant="plain" @click="closeMobileSearch">
                <v-icon>mdi-close</v-icon></v-btn
              >
            </div>
            <v-label v-if="needle && !loading" class="mt-2">
              <span v-if="items.length">{{
                $t("search.request_result", { count: items.length })
              }}</span>
              <span v-else>{{ $t("search.no_result") }}</span>
            </v-label>
          </div>
        </v-navigation-drawer>
        <v-navigation-drawer v-model="showFilters" width="300" location="end">
          <div class="pa-2 flex flex-column ga-4">
            <CloseBtn
              v-if="$vuetify.display.smAndDown"
              @close="showFilters = false"
            />
            <slot name="filters" />
          </div>
        </v-navigation-drawer>
      </client-only>

      <main class="position-relative">
        <v-sheet height="100%" width="100%" class="pa-2">
          <v-label
            v-if="needle && !loading && $vuetify.display.mdAndUp"
            class="mt-2"
          >
            <span v-if="items.length">{{
              $t("search.request_result", { count: items.length })
            }}</span>
          </v-label>

          <div v-if="items.length > 0 && !loading">
            <v-list-item
              v-for="(item, i) in items"
              :key="i"
              :to="localeRoute(item.to || '/')"
              border 
              rounded="lg"
              elevation="5"
              lines="two"
              class="glassed my-2"
              :title="item.title"
              :subtitle="item.value"
              :value="item"
            >
              <template #prepend>
                <v-avatar :size="$vuetify.display.mdAndUp ? 107 : 80">
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
              <template v-if="$vuetify.display.mdAndUp" #append>
                <v-chip variant="plain" density="compact">
                  {{ $t("general.created_at") + ": " + item.createdAt }}</v-chip
                >
              </template>
            </v-list-item>
          </div>
          <template v-else-if="items.length !== 0">
            <v-skeleton-loader
              v-for="n in limit"
              :key="n"
              rounded="lg"
              :height="$vuetify.display.mdAndUp ? 130 : 110"
              class="my-2 glassed"
              type="list-item-avatar-three-line"
            />
          </template>
          <template v-else-if="!loading">
            <v-empty-state
              :title="$t('empty_states.title')"
              icon="mdi-alert-rhombus"
            />
          </template>
        </v-sheet>
        <v-footer class="d-flex justify-center glassed position-absolute left-0 right-0" color="transparent">
            <v-pagination
              v-model="currentPage"
              :length="totalPages"
              rounded="lg"
              color="primary"
              :total-visible="3"
              @update:model-value="handlePageChange"
            />
        </v-footer>
        <v-spacer />
        <slot name="empty-state" />
      </main>
    </GradientWrapper>
  </div>
</template>

<script lang="ts" setup>
import BackBtn from "../Containment/Btns/BackBtn.vue";
import CloseBtn from "../Containment/Btns/CloseBtn.vue";
import GradientWrapper from "../Containment/Cards/GradientWrapper.vue";
import { useAuthStore } from "#imports";
const { isAuthenticated } = useAuthStore();
const localeRoute = useLocaleRoute();

const emit = defineEmits<{
  (e: "update:page" | "delete:item" | "form:open", value: number): void;
  (e: "update:search", value: string): void;
  (e: "update:search", value: string): void;
}>();
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
const showSearch = ref<boolean>(false);
const needle = ref<string>("");
const handlePageChange = (page: number): void => {
  currentPage.value = page;
  emit("update:page", page);
};

const closeMobileSearch = (): void => {
  showSearch.value = false;
  needle.value = "";
};
</script>

<style></style>
