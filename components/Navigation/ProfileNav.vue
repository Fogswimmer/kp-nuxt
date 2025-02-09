<template>
	<div>
		<v-btn
			v-if="!isAuthenticated"
			block
			prepend-icon="mdi-login"
			variant="tonal"
			to="/auth/sign-in">
			{{ $t("auth.sign_in") }}
		</v-btn>

		<v-list-item
			v-else
			link
			density="compact"
			rounded="lg"
			lines="one"
			:title="currentUser?.displayName || currentUser?.username || ''"
			:subtitle="currentUser?.email"
			to="/profile">
			<template
				#prepend
				vif="-">
				<v-avatar
					border
					v-if="isAuthenticated">
					<v-img
						v-if="currentUser?.avatar"
						:src="currentUser?.avatar || ''"
						@click="navigateTo('/profile')">
					</v-img>
					<v-icon
						v-else
						@click="navigateTo('/profile')">
						mdi-account</v-icon
					>
				</v-avatar>
			</template>
		</v-list-item>

		<ConfirmDialog
			v-model="showConfirmDialog"
			@cancel="showConfirmDialog = false"
			:text="$t('auth.logout_confirm')"
			@confirm="handleSignOut" />
	</div>
</template>

<script lang="ts" setup>
	import { useAuthStore } from "~/stores/authStore";
	import ConfirmDialog from "../Dialogs/ConfirmDialog.vue";
	const showConfirmDialog = ref(false);
	const { currentUser, isAuthenticated } = storeToRefs(useAuthStore());
	const { signOut, fetchCurrentUser } = useAuthStore();

	const handleSignOut = async () => {
		await signOut();
		showConfirmDialog.value = false;
	};

	onMounted(async () => {
		if (isAuthenticated.value) {
			await fetchCurrentUser();
		}
	});
</script>
