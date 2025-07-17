<template>
	<v-card max-width="600" class="mx-auto pa-5" variant="tonal">
		<v-card-text>
			<v-alert variant="outlined" color="error" class="text-center">{{
				$t("auth.password_reset_messages.invalid_token")
			}}</v-alert>
			<div class="text-center mt-5">
				<v-btn
					variant="tonal"
					prepend-icon="mdi-home"
					@click="navigateTo($localeRoute('/'))"
					>{{ $t("empty_states.actions.home") }}</v-btn
				>
			</div>
		</v-card-text>
	</v-card>
</template>

<script lang="ts" setup>
definePageMeta({
	name: "passwordResetInvalidToken",
	path: "/auth/password-reset/invalid",
	layout: "content-center",
});
</script>

<style></style>
