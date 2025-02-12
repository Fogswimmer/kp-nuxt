<template>
  <v-app id="films-empty">
    <v-main>
      <v-empty-state
        :title="$t('empty_states.films')"
        icon="mdi-filmstrip-off"
        :action-text="$t('empty_states.actions.add')"
        @click:action="navigateTo('/films/new')"
      />
    </v-main>
  </v-app>
</template>

<script lang="ts" setup></script>

<style></style>
