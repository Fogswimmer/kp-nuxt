<template>
  <v-sheet max-width="1000" class="mx-auto">
    <template v-if="loading" #loader>
      <v-progress-linear indeterminate color="primary" />
    </template>
   
    <v-toolbar>
      <template #prepend>
        <v-app-bar-nav-icon
          v-if="drawer && $vuetify.display.smAndDown"
          @click="$emit('drawer:toggle')"
        />
        <BackBtn v-else />
      </template>
      <v-app-bar-title>
        <div class="d-flex ga-2">
          <span class="font-weight-bold"> {{ pageName }} </span>
          <span v-if="!displayAvatar" class="font-weight-bold">
            {{ title }}</span
          >
        </div>
      </v-app-bar-title>
      <slot name="menu" />
    </v-toolbar>
    <template v-if="notification">
      <slot name="notification" />
    </template>

    <v-card>
      <template #image>
      <v-parallax height="500" :src="cover" cover class="img-blur" gradient=""/>
    </template>
      <v-img :src="cover" cover height="250">
        <template #placeholder>
          <v-sheet height="250" width="100%" class="default-cover" />
        </template>
      </v-img>
      <div v-if="displayAvatar" class="position-relative">
        <v-sheet height="200" border color="red">
          <div class="d-flex justify-center">
            <div class="position-absolute text-center" style="top: -50%">
              <div>
                <v-avatar size="200" border>
                  <v-img :src="avatar" :lazy-src="avatar" cover>
                    <template #placeholder>
                      <v-sheet height="100%">
                        <div class="d-flex align-center justify-center h-100">
                          <v-icon size="64" icon="mdi-account-off" />
                        </div>
                      </v-sheet>
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
              </div>
              <template v-if="!loading">
                <span class="text-h6 text-lg-h4 font-weight-bold text-primary">
                  {{ title }}</span
                >
                <div class="text-caption text-lg-subtitle-1">
                  {{
                    generalInfo?.map((item: Detail) => item.value).join(", ")
                  }}
                </div>
                <div class="text-capitalize text-caption text-lg-subtitle-1">
                  {{ subtitle }}
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
      <slot name="text" />
    </v-card>
  </v-sheet>
</template>

<script lang="ts" setup>
import BackBtn from "../Btns/BackBtn.vue";
defineEmits(["drawer:toggle"]);

defineProps<{
  title?: string;
  pageName?: string;
  subtitle?: string;
  loading: boolean;
  cover?: string;
  generalInfo?: Detail[];
  avatar?: string;
  displayAvatar?: boolean;
  drawer?: boolean;
  notification?: boolean;
}>();
</script>

<style>
.default-cover {
  background-image:
    linear-gradient(
      302deg,
      rgba(107, 70, 255, 0.5) 0%,
      rgba(107, 70, 255, 0.5) 14.286%,
      rgba(106, 86, 235, 0.5) 14.286%,
      rgba(106, 86, 235, 0.5) 28.572%,
      rgba(106, 102, 215, 0.5) 28.572%,
      rgba(106, 102, 215, 0.5) 42.858%,
      rgba(105, 118, 195, 0.5) 42.858%,
      rgba(105, 118, 195, 0.5) 57.144%,
      rgba(104, 134, 174, 0.5) 57.144%,
      rgba(104, 134, 174, 0.5) 71.43%,
      rgba(104, 150, 154, 0.5) 71.43%,
      rgba(104, 150, 154, 0.5) 85.716%,
      rgba(103, 166, 134, 0.5) 85.716%,
      rgba(103, 166, 134, 0.5) 100.002%
    ),
    linear-gradient(
      323deg,
      rgb(14, 186, 116) 0%,
      rgb(14, 186, 116) 14.286%,
      rgb(15, 160, 133) 14.286%,
      rgb(15, 160, 133) 28.572%,
      rgb(16, 133, 151) 28.572%,
      rgb(16, 133, 151) 42.858%,
      rgb(17, 107, 168) 42.858%,
      rgb(17, 107, 168) 57.144%,
      rgb(18, 80, 185) 57.144%,
      rgb(18, 80, 185) 71.43%,
      rgb(19, 54, 203) 71.43%,
      rgb(19, 54, 203) 85.716%,
      rgb(20, 27, 220) 85.716%,
      rgb(20, 27, 220) 100.002%
    );
}
</style>
