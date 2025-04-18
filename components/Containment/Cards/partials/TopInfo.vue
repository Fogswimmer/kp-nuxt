<template>
  <v-sheet min-height="300">
    <div class="d-flex justify-center">
      <div class="position-absolute text-center" style="top: -50%">
        <div class="position-relative">
          <div style="width: 300px" class="position-relative mx-auto">
            <v-avatar
              size="300"
              border
              class="cursor-pointer"
              @click="showAvatarEditBtns = !showAvatarEditBtns"
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
            <v-fab
              :active="showAvatarEditBtns"
              :disabled="!isAuthenticated"
              absolute
              color="secondary"
              location="bottom end"
              icon="mdi-pencil"
              @click="handleEditAvatar"
            />
          </div>
        </div>
        <template v-if="!loading">
          <div class="d-flex flex-column ga-1 justify-center align-center">
            <span class="text-h5 font-weight-bold text-primary text-center">
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

const handleEditAvatar = (): void => {
  emit("avatar:edit");
  showAvatarEditBtns.value = false;
};
</script>

<style>
.info-title {
  max-width: 60%;
  word-break: break-all !important;
}
</style>
