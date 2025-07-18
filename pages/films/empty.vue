<template>
    <v-empty-state
        :title="$t('empty_states.films')"
        icon="mdi-filmstrip-off"
        :action-text="$t('empty_states.actions.add')"
        @click:action="navigateTo($localeRoute('/films/new'))"
    />
</template>

<script lang="ts" setup>
definePageMeta({
    layout: 'home',
})
</script>
