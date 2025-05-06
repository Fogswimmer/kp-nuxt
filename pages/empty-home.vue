<template>
  <EmptyPage>
    <template #default>
      <v-empty-state
        :headline="$t('empty_states.no_content')"
        :title="$t('empty_states.no_content_notice')"
        :action-text="$t('empty_states.actions.add_persons')"
        icon="mdi-alert-circle"
        @click:action="navigateTo($localeRoute('/persons/new'))"
      />
    </template>
  </EmptyPage>
</template>

<script lang="ts" setup>
import EmptyPage from "~/components/Templates/EmptyPage.vue";
definePageMeta({
  name: "emptyHome",
  path: "/empty-home",
});
</script>

<style></style>
