<template>
  <div v-scroll="onScroll">
    <v-navigation-drawer location="end" width="300">
        <v-card :title="$t('contents')" variant="text">
          <v-divider></v-divider>
          <v-list nav>
            <v-list-item
              v-for="item in pageContents"
              :key="item.title"
              :title="item.title"
              :prepend-icon="item.icon"
              :active="activeContentItem === item.value"
            ></v-list-item>
          </v-list>
        </v-card>
        <ScrollTopFab :show="showScrollBtn" @scroll:top="scrollToTop" />
      </v-navigation-drawer>
    <v-card>
      <v-toolbar>
        <template #prepend>
          <BackBtn />
        </template>
        <v-toolbar-title>
          <span v-if="!loading" class="font-weight-bold"> {{ pageName }} </span>
          <v-skeleton-loader v-else type="text" height="30" />
        </v-toolbar-title>
        <div
          v-if="$vuetify.display.mdAndUp && notification"
          class="d-flex justify-center pa-2"
        >
          <slot name="notification" />
        </div>
        <slot name="menu" />
      </v-toolbar>
      <div
        v-if="$vuetify.display.smAndDown && notification"
        class="d-flex justify-center pa-2 text-caption"
      >
        <slot name="notification" />
      </div>
      <v-card>
        <template v-if="loading" #loader>
          <v-progress-linear indeterminate color="primary" />
        </template>
        <v-card>
          <v-img
            v-if="cover"
            :src="cover"
            cover
            :height="$vuetify.display.mdAndUp ? 300 : 200"
            class="position-relative"
          >
            <template #placeholder>
              <ImgPlaceholder />
            </template>
            <template #error>
              <v-sheet
                :height="$vuetify.display.mdAndUp ? 300 : 200"
                width="100%"
                class="default-cover"
              />
            </template>
          </v-img>
          <v-sheet
            v-else-if="!trailer"
            :height="$vuetify.display.mdAndUp ? 300 : 200"
            width="100%"
            class="default-cover"
          />
          <slot name="top_film" />
          <slot name="general_info" />
          <slot name="text" />
        </v-card>
      </v-card>
      <slot name="footer" />
    </v-card>
  </div>
</template>

<script lang="ts" setup>
import BackBtn from "../Btns/BackBtn.vue";
import ImgPlaceholder from "../Img/ImgPlaceholder.vue";
import ScrollTopFab from "../Btns/ScrollTopFab.vue";
const props = defineProps<{
  pageName?: string;
  title?: string;
  loading: boolean;
  cover?: string;
  drawer?: boolean;
  notification?: boolean;
  poster?: boolean;
  trailer?: boolean;
  pageContents: PageContentItems[];
}>();

const activeContentItem = ref<string>(props.pageContents[0].value);
const showScrollBtn = ref<boolean>(false);
const scrollOffset = ref<number>(0);
const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};
const onScroll = (e: any): void => {
  scrollOffset.value = e.target.scrollingElement.scrollTop;
  showScrollBtn.value = scrollOffset.value > 200;
  const sections = document.querySelectorAll("section");
  const scrollPosition = window.scrollY + 100;

  for (const section of sections) {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;

    if (
      scrollPosition >= sectionTop &&
      scrollPosition < sectionTop + sectionHeight
    ) {
      activeContentItem.value = section.id;
      break;
    }
  }
};
</script>

<style>
.default-cover {
  background-image: linear-gradient(
    to top right,
    rgba(255, 166, 0, 0.123),
    rgba(30, 13, 78, 0.534)
  ) !important;
}
</style>
