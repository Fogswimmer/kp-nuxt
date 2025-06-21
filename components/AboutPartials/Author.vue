<template>
  <div :class="$vuetify.display.smAndDown ? 'text-center' : ''">
    <v-avatar
      size="250"
      :class="[{ 'float-left mr-10': $vuetify.display.mdAndUp }]"
    >
      <v-img
        src="/public/img/nebelschwimmer_avatar.jpg"
        alt="Author"
        class="fill-height"
      >
        <template #placeholder>
          <ImgPlaceholder icon="mdi-account" />
        </template>
      </v-img>
    </v-avatar>

    <div class="d-flex flex-column ga-2">
      <h5 class="text-primary text-h6">
        {{ $t("pages.about.author.name") }}
      </h5>
      <div>{{ $t("pages.about.author.first_section") }}:</div>
      <v-divider />
      <div class="d-flex flex-column ga-2">
        <div class="d-flex align-center ga-2">
          <v-icon color="blue" size="large">mdi-react</v-icon>React JS
        </div>

        <div class="d-flex align-center ga-2">
          <v-icon size="large" color="green">mdi-nodejs</v-icon>
          Node JS
        </div>
        <div class="d-flex align-center ga-2">
          <v-icon size="large" color="pink">mdi-jquery</v-icon>
          jQuery
        </div>
      </div>
      <v-divider />
      <div class="d-flex ga-2 align-center">
        <span> {{ $t("pages.about.author.second_section") }}:</span>
        <div class="d-flex align-center ga-1">
          <v-icon color="blue" size="x-large">mdi-language-go</v-icon>
          Golang
        </div>
        <div class="d-flex align-center ga-1">
          <v-icon color="purple" size="x-large">mdi-all-inclusive</v-icon>
          DevOps
        </div>
      </div>
    </div>
    <a
      href="https://github.com/Fogswimmer"
      target="_blank"
      class="text-blue d-flex align-center justify-end ma-2 ga-2 flex-wrap"
      ><v-icon size="large">mdi-github</v-icon>GitHub</a
    >
  </div>
</template>

<script lang="ts" setup>
import ImgPlaceholder from "../Containment/Img/ImgPlaceholder.vue";
</script>

<style></style>
