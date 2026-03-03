<template>
	<v-app>
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
				<div class="container">
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
						class="full-height"
						@click:action="clearError({ redirect: '/' })"
					/>
				</div>
		</NuxtLayout>
	</v-app>
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
