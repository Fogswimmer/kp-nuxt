<template>
	<v-empty-state
		:title="$t('empty_states.persons')"
		:text="$t('empty_states.no_persons_found')"
		icon="mdi-account-off"
		:action-text="$t('empty_states.actions.add')"
		@click:action="navigateTo('/persons/new')">
	</v-empty-state>
</template>

<script lang="ts" setup></script>

<style></style>
