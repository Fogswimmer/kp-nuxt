<template>
	<v-app id ="persons-empty">
		<v-main>
			<v-empty-state
				:title="$t('empty_states.persons')"
				icon="mdi-account-off"
				:action-text="$t('empty_states.actions.add')"
				@click:action="navigateTo('/persons/new')"/>
		</v-main>
	</v-app>
	
</template>

<script lang="ts" setup></script>

<style></style>
