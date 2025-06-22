<template>
  <v-sheet :height="$vuetify.display.smAndDown ? 220 : 300" class="glassed">
    <div class="d-flex justify-center">
      <div class="position-absolute text-center" style="top: -50%">
        <div class="position-relative">
          <div
            :style="`width: ${$vuetify.display.smAndDown ? 200 : 300}px; height: ${$vuetify.display.smAndDown ? 200 : 300}px;`"
            class="position-relative mx-auto"
          >
            <v-avatar
              :size="$vuetify.display.smAndDown ? 200 : 300"
              border
              class="cursor-pointer"
              @click="showFullScrenView = true"
            >
              <v-img :src="avatar || ''" cover>
                <template #placeholder>
                  <v-sheet height="100%">
                    <div class="fill-height d-flex align-center justify-center">
                      <v-progress-circular indeterminate />
                    </div>
                  </v-sheet>
                </template>
                <template #error>
                  <ErrorPlaceHolder />
                </template>
              </v-img>
            </v-avatar>
          </div>
        </div>
        <template v-if="!loading">
          <div class="d-flex flex-column ga-2 justify-center align-center">
            <span
              class="text-h5 text-lg-h4 font-weight-bold text-primary text-center"
            >
              {{ title }}</span
            >
            <div class="text-body-1 text-lg-h6">
              {{ generalInfo?.map((item: Detail) => item.value).join(", ") }}
            </div>
            <div class="d-flex ga-1">
              <v-chip
                v-for="(item, i) in subtitle"
                :key="i"
                class="text-caption text-lg-body-1"
              >
                {{ item }}
              </v-chip>
            </div>
          </div>
        </template>
        <template v-else>
          <v-skeleton-loader
            class="stained-glass"
            type="list-item-three-line"
          />
        </template>
      </div>
    </div>
    <BaseDialog
      v-model:opened="showFullScrenView"
      :loading="loading"
      :title="(title as string) || ''"
      @close="showFullScrenView = false"
    >
      <template #text>
        <v-img :src="avatar || ''" cover height="100%" width="100%"></v-img>
      </template>
    </BaseDialog>
  </v-sheet>
</template>

<script lang="ts" setup>
import ErrorPlaceHolder from "../../Img/ErrorPlaceHolder.vue";
import BaseDialog from "~/components/Dialogs/BaseDialog.vue";

const props = defineProps<{
  title: string | Detail[];
  subtitle: string | string[];
  generalInfo: Detail[];
  avatar: string;
  loading: boolean;
}>();

const { t } = useI18n();

const showFullScrenView = ref<boolean>(false);
</script>

<style>
.info-title {
  max-width: 60%;
  word-break: break-all !important;
}
</style>
