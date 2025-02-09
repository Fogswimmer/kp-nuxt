<template>
	<div>
		<DetailCard
			display-avatar
			:title="currentUser?.displayName"
			:subtitle="computedLastLogin"
			:page-name="$t('pages.profile.title')"
			:general-info="computedGeneralInfo"
			:cover="currentUser?.cover || ''"
			:avatar="currentUser?.avatar || ''"
			:loading="loading"
			:is-auth="isAuthenticated">
			<template #menu>
				<template v-if="$vuetify.display.smAndDown">
					<v-menu location="bottom end">
						<template v-slot:activator="{ props }">
							<v-btn
								icon
								v-bind="props">
								<v-icon>mdi-dots-vertical</v-icon>
							</v-btn>
						</template>
						<v-list
							density="compact"
							class="dark-glass">
							<v-list-item
								:title="$t('actions.choose_cover')"
								prepend-icon="mdi-image"
								value="cover"
								@click="showCoverChooseDialog = true"></v-list-item>
							<v-list-item
								:title="$t('actions.edit_avatar')"
								prepend-icon="mdi-account"
								value="avatar"
								@click="showAvatarUploadDialog = true"></v-list-item>
							<v-list-item
								:title="$t('actions.edit')"
								prepend-icon="mdi-pencil"
								value="edit"
								@click="handleEdit"></v-list-item>
							<v-list-item
								:title="$t('auth.sign_out')"
								prepend-icon="mdi-logout"
								value="logout"
								@click="showConfirmLogoutDialog = true"></v-list-item>
						</v-list>
					</v-menu>
				</template>
				<template v-else>
					<div class="d-flex ga-1">
						<v-btn
							variant="tonal"
							prepend-icon="mdi-image"
							@click="showCoverChooseDialog = true"
							>{{ $t("actions.choose_cover") }}</v-btn
						>
						<v-btn
							variant="tonal"
							prepend-icon="mdi-account"
							@click="showAvatarUploadDialog = true">
							{{ $t("actions.edit_avatar") }}
						</v-btn>
						<v-btn
							variant="tonal"
							prepend-icon="mdi-pencil"
							@click="handleEdit">
							{{ $t("actions.edit") }}
						</v-btn>
						<v-btn
							variant="tonal"
							base-color="warning"
							prepend-icon="mdi-logout"
							@click="showConfirmLogoutDialog = true">
							{{ $t("auth.sign_out") }}
						</v-btn>
					</div>
				</template>
			</template>
		</DetailCard>

		<ConfirmDialog
			v-model="showWarning"
			:text="$t('pages.profile.avatar_replace_warning')"
			@cancel="showWarning = false"
			@confirm="replaceAvatar" />
		<BaseDialog
			v-model:opened="showAvatarUploadDialog"
			:title="
				currentUser?.avatar
					? $t('pages.profile.change_avatar')
					: $t('pages.profile.upload_avatar')
			"
			:loading="loading"
			@close="showAvatarUploadDialog = false">
			>
			<template #text>
				<GalleryUploader
					:upload-count="1"
					:upload-error="false"
					@files:upload="handleUploadAvatar" />
			</template>
		</BaseDialog>
		<BaseDialog
			v-model:opened="showCoverChooseDialog"
			:title="
				currentUser?.cover
					? $t('pages.profile.change_cover')
					: $t('pages.profile.upload_cover')
			"
			:loading="loading"
			@close="showCoverChooseDialog = false">
			>
			<template #text>
				<GalleryUploader
					:upload-count="1"
					:upload-error="false"
					@files:upload="handleUploadCover" />
			</template>
		</BaseDialog>
		<ConfirmDialog
			v-model="showConfirmLogoutDialog"
			:text="$t('auth.logout_confirm')"
			@cancel="showConfirmLogoutDialog = false"
			@confirm="handleSignOut" />
		<BaseDialog
			v-model:opened="editMode"
			:loading="loading"
			:title="$t('pages.profile.edit')"
			@close="editMode = false">
			<template #text>
				<UserForm
					v-model="currentUser"
					:is-new="false"
					@avatar:edit="showAvatarUploadDialog = true"
					@cancel="editMode = false" />
			</template>
			></BaseDialog
		>
	</div>
</template>

<script lang="ts" setup>
	import DetailCard from "~/components/Containment/Cards/DetailCard.vue";
	import { useAuthStore } from "~/stores/authStore";
	import ConfirmDialog from "~/components/Dialogs/ConfirmDialog.vue";
	import BaseDialog from "~/components/Dialogs/BaseDialog.vue";
	import GalleryUploader from "~/components/Gallery/GalleryUploader.vue";
	import UserForm from "~/components/Forms/UserForm.vue";
	const { currentUser, loading, userForm } = storeToRefs(useAuthStore());
	const showConfirmLogoutDialog = ref(false);
	const showCoverChooseDialog = ref(false);
	const { t, locale } = useI18n();
	const showDeleteDialog = ref(false);
	const {
		signOut,
		uploadAvatar,
		uploadCover,
		fetchCurrentUser,
		isAuthenticated,
	} = useAuthStore();
	const editMode = ref(false);
	const avatarFile = ref<File>();
	const handleSignOut = async () => {
		await signOut();
		showConfirmLogoutDialog.value = false;
		navigateTo("/");
	};

	const computedLastLogin = computed(() => {
		const lastLogin = new Date(
			currentUser.value?.lastLogin || 0
		).toLocaleString();
		return t("pages.profile.last_login", { time: lastLogin });
	});

	const showWarning = ref(false);
	const showAvatarUploadDialog = ref(false);

	const handleUploadCover = async (files: File[]) => {
		const file = files[0];
		const id = Number(currentUser.value?.id);
		if (file) {
			await uploadCover(file, id || 0);
		}
		showCoverChooseDialog.value = false;
	};

	const handleUploadAvatar = async (files: File[]) => {
		const file = files[0];
		const id = Number(currentUser.value?.id);
		if (file) {
			!currentUser.value?.avatar
				? await uploadAvatar(file, id || 0)
				: showWarningFunc(file);
		}
		showAvatarUploadDialog.value = false;
	};

	const showWarningFunc = (file: File) => {
		showWarning.value = true;
		avatarFile.value = file;
	};

	const handleEdit = () => {
		editMode.value = true;
		userForm.value = { ...currentUser.value };
	};

	const replaceAvatar = async () => {
		const id = Number(currentUser.value?.id);
		await uploadAvatar(avatarFile.value as File, id || 0);
		await fetchCurrentUser();
		showWarning.value = false;
	};

	const computedGeneralInfo = computed(() => {
		return {
			subheader: t("pages.general_info"),
			list: [
				{
					name: t("auth.email"),
					value: currentUser.value?.email || "",
					icon: "mdi-email",
				},
				{
					name: t("forms.person.age"),
					value:
						locale.value === "ru"
							? declineYearsInRussian(currentUser.value?.age || 0)
							: currentUser.value?.age + " " + t("general.years_old") || "",
					icon: "mdi-cake",
				},
			],
		};
	});
	definePageMeta({
		title: "Profile",
		key: (route) => route.fullPath,
	});
</script>

<style></style>
