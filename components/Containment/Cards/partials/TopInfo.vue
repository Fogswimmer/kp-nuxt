<template>
  <div class="position-relative">
    <v-sheet min-height="260">
      <div class="d-flex justify-center">
        <div class="position-absolute text-center" style="top: -50%">
          <v-avatar
            size="250"
            border
            class="position-relative cursor-pointer"
            @click="showAvatarEditBtns = !showAvatarEditBtns"
          >
            <v-img :src="avatar || ''" cover>
              <template #placeholder>
                <ErrorPlaceHolder />
              </template>
              <template #error>
                <v-sheet height="100%">
                  <div class="d-flex align-center justify-center h-100">
                    <v-icon color="error" icon="mdi-image-broken" />
                  </div>
                </v-sheet>
              </template>
            </v-img>
          </v-avatar>
          <v-scroll-y-transition>
            <template v-if="showAvatarEditBtns">
              <v-sheet
                class="position-absolute d-flex flex-column ga-2 pa-2"
                style="top: 42%; left: 48%"
              >
                <div class="d-flex flex-column ga-2">
                  <v-btn
                    class="text-none"
                    variant="tonal"
                    block
                    slim
                    density="comfortable"
                    prepend-icon="mdi-pencil"
                    :disabled="!isAuthenticated"
                    @click="handleEditAvatar"
                    >{{ $t("actions.edit_avatar") }}</v-btn
                  >
                  <v-btn
                    variant="tonal"
                    block
                    slim
                    class="text-none"
                    density="comfortable"
                    prepend-icon="mdi-close"
                    @click="showAvatarEditBtns = false"
                    >{{ $t("actions.cancel") }}</v-btn
                  >
                </div>
              </v-sheet>
            </template>
          </v-scroll-y-transition>

          <template v-if="!loading">
            <div class="d-flex flex-column ga-1">
              <span class="text-h6 text-lg-h4 font-weight-bold text-primary">
                {{ title }}</span
              >
              <div class="text-caption text-lg-subtitle-1">
                {{ generalInfo?.map((item: Detail) => item.value).join(", ") }}
              </div>
              <div class="text-capitalize text-caption text-lg-subtitle-1">
                {{ subtitle }}
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
    </v-sheet>
  </div>
</template>

<script lang="ts" setup>
import { useAuthStore } from "~/stores/authStore";
import ErrorPlaceHolder from "../../Img/ErrorPlaceHolder.vue";
defineProps<{
  title: string | Detail[];
  subtitle: string | Detail[];
  generalInfo: Detail[];
  avatar: string;
  loading: boolean;
}>();

const { isAuthenticated } = storeToRefs(useAuthStore());

const showAvatarEditBtns = ref<boolean>(false);
const emit = defineEmits<{
  (event: "avatar:edit"): void;
}>();

const handleEditAvatar = () => {
  emit("avatar:edit");
  showAvatarEditBtns.value = false;
};
</script>

<style></style>
