<template>
	<v-layout>
	<NuxtLayout>
			<Head>
				<Title>
					{{
						definePageTitle(
							$t(
								`toast.messages.server_errors.${error?.statusCode || 500}`,
							),
						)
					}}
				</Title>
			</Head>
			<v-main class="container">
				<v-empty-state
					:headline="error?.statusCode.toString()"
					:title="
						$t(
							`toast.messages.server_errors.${error?.statusCode || 500}`,
						)
					"
					:text="error?.message"
					icon="mdi-alert-rhombus"
					:action-text="$t('empty_states.actions.home')"
					@click:action="clearError({ redirect: '/' })"
				/>
			</v-main>
		</NuxtLayout>
	</v-layout>
</template>

<script setup lang="ts">
const error = useError();
</script>

<style scoped>
.container {
	display: flex;
	justify-content: center;
	align-items: center;
	height: calc(100vh - 64px);
}
</style>
