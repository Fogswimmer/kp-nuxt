<template>
  <div>
    <client-only>
      <v-dialog v-if="$vuetify.display.smAndDown" v-model="showSearch">
        <v-sheet class="pa-2">
          <div class="d-flex ga-2">
            <v-text-field
              v-model="needle"
              :placeholder="$t('actions.search')"
              :loading="loading"
              chips
              hide-details
              prepend-inner-icon="mdi-magnify"
              variant="outlined"
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
        </v-sheet>
      </v-dialog>
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
    <v-app-bar flat>
      <template #prepend>
        <BackBtn />
      </template>
      <v-app-bar-title>
        <span class="text-lg-h5 font-weight-bold"> {{ listTitle }}</span>
      </v-app-bar-title>
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
          :to="$localeRoute(newPageLink)"
        >
          <v-icon>mdi-plus</v-icon>
          <v-tooltip activator="parent" location="bottom">
            {{ $t("actions.add") }}
          </v-tooltip>
        </v-btn>
      </template>
    </v-app-bar>

    <main class="pa-2">
      <template v-if="items.length">
        <div class="mt-2 w-100 d-flex align-center justify-center">
          <v-label v-if="needle && !loading && $vuetify.display.mdAndUp">
            <span v-if="items.length">{{
              $t("search.request_result", { count: items.length })
            }}</span>
          </v-label>
        </div>

        <template v-if="!loading">
          <GradientWrapper v-for="(item, i) in items" :key="i">
            <v-list>
              <v-list-item
                border
                rounded="lg"
                lines="three"
                class="overflow-x-hidden"
                :value="item"
                :to="$localeRoute(item.to || '/')"
              >
                <template #title>
                  <div class="text-primary text-lg-h6 d-flex ga-1">
                    <span class="text-truncate">{{ item.title }}</span>
                    <span v-if="item.releaseYear"
                      >({{ item.releaseYear }})</span
                    >
                  </div>
                </template>
                <template #subtitle>
                  {{ item.value }}
                </template>
                <template #prepend>
                  <v-avatar :size="94">
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
                  <v-sheet
                    height="94"
                    rounded="lg"
                    class="ml-2 cursor-default"
                    width="130"
                    :border="false"
                  >
                    <div
                  
                      class="d-flex flex-column align-center justify-center fill-height"
                    >
                      <v-rating
                        v-if="item.rating"
                        :model-value="item.rating"
                        readonly
                        density="compact"
                        size="x-small"
                        color="yellow-darken-2"
                      ></v-rating>

                      <v-chip variant="plain" size="x-small">
                        {{
                          $t("general.created_at") + ": " + item.createdAt
                        }}</v-chip
                      >
                      <v-chip
                        v-if="item.publisherData?.name"
                        variant="plain"
                        size="x-small"
                      >
                        <div
                          class="d-inline-block text-truncate"
                          style="width: 100px"
                        >
                          <span> {{ $t("general.published_by") + ": " }} </span>
                          <nuxt-link class="text-secondary">
                            {{ item.publisherData?.name }}
                          </nuxt-link>
                        </div>
                      </v-chip>
                    </div>
                  </v-sheet>
                </template>
              </v-list-item>
            </v-list>
          </GradientWrapper>
        </template>
        <v-skeleton-loader
          v-for="n in limit"
          v-else-if="items.length"
          :key="n"
          rounded="lg"
          :height="140"
          class="ma-2 glassed"
          type="list-item-avatar-three-line"
        />
      </template>
      <div
        v-else-if="!loading"
        class="d-flex flex-column align-center justify-center"
        style="height: 50vh"
      >
        <v-label class="mt-2">{{ $t("general.no_results") }}</v-label>
      </div>

      <slot name="empty-state" />
    </main>
    <v-app-bar location="bottom" order="1" permanent>
      <div class="w-100">
        <v-pagination
          v-model="currentPage"
          :length="totalPages"
          rounded="lg"
          color="primary"
          :total-visible="3"
          @update:model-value="handlePageChange"
        />
      </div>
    </v-app-bar>
  </div>
</template>

<script lang="ts" setup>
import BackBtn from "../Containment/Btns/BackBtn.vue";
import CloseBtn from "../Containment/Btns/CloseBtn.vue";
import GradientWrapper from "../Containment/Cards/GradientWrapper.vue";
import { useAuthStore } from "#imports";
import FilmRatingChip from "../Misc/FilmRatingChip.vue";

const { isAuthenticated } = useAuthStore();

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
  limit: number;
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
