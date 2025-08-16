<template>
	<v-empty-state
		:title="$t('empty_states.persons')"
		:text="$t('empty_states.no_persons_found')"
		icon="mdi-account-off"
		:action-text="$t('empty_states.actions.add')"
		@click:action="navigateTo(localeRoute('/persons/new'))"
	/>
</template>

<script lang="ts" setup>
const localeRoute = useLocaleRoute();
</script>

<style></style>
