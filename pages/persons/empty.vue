<template>
    <v-empty-state
        :title="$t('empty_states.persons')"
        icon="mdi-account-off"
        :action-text="$t('empty_states.actions.add')"
        @click:action="navigateTo($localeRoute('/persons/new'))"
    />
</template>

<script lang="ts" setup>
definePageMeta({
    layout: "home",
});
</script>
