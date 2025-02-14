<template>
  <section :id="id" class="content-item">
   <div class="pa-2 d-flex flex-column ga-2 mb-2"> 
    <h4 class="text-h4 text-center">{{ title }}</h4>
    <span class="section-divider"/>
  </div>
   
    <v-card
      v-if="present"
      :loading="loading"
      variant="text"
      :class="[
        'd-flex flex-column ga-2',
        { 'content-item_light': !$vuetify.theme.global.current.dark },
      ]"
      :style="
        $vuetify.theme.global.current.dark
          ? `background-image: radial-gradient(
        circle at 50% 50%,
        ${darkAccentColor},
        transparent
      ) !important;`
          : ''
      "
    >
      <v-card-text v-if="!loading">
        <slot />
      </v-card-text>
      <v-row v-else>
        <v-col v-for="i in 2" :key="i">
          <v-skeleton-loader type="card" height="100vh" />
        </v-col>
      </v-row>
    </v-card>
  </section>
</template>

<script lang="ts" setup>
defineProps<{
  id: string;
  present: boolean;
  loading: boolean;
  title: string;
  darkAccentColor?: string;
}>();
</script>

<style lang="scss">
.content-item {
  &_light {
    background-image: radial-gradient(
      circle at center center,
      rgb(226, 226, 226),
      rgb(255, 255, 255)
    ) !important;
  }
}
.section-divider{
  width: 100%;
  height: 2px;
  background-image: linear-gradient(to right, rgba(0, 0, 0, 0), rgba(150, 150, 150, 0.6), rgba(0, 0, 0, 0));
}
</style>
