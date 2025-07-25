<template>
	<div>
		<Head>
			<Title>{{ definePageTitle($t("auth.password_reset")) }}</Title>
		</Head>

		<v-card variant="tonal" max-width="400">
			<v-card-title>
				{{ $t("auth.password_reset") }}
			</v-card-title>

			<v-list-item class="text-caption text-secondary" lines="two">
				<v-list-item-subtitle>
					{{ $t("forms.rules.password_requirement") }}
				</v-list-item-subtitle>
			</v-list-item>

			<v-card-text class="pa-4">
				<v-form ref="emailFormRef" class="mt-4">
					<v-text-field
						v-model="passwordResetForm.newPassword"
						:label="$t('auth.new_password')"
						prepend-inner-icon="mdi-email-outline"
						variant="outlined"
						:rules="[required, passwordRule]"
					/>
				</v-form>
			</v-card-text>
			<v-card-actions>
				<v-spacer />
				<v-btn prepend-icon="mdi-close" @click="closeWindow">
					{{ $t("actions.close_window") }}
				</v-btn>
				<SubmitBtn
					:loading="loading"
					@click="handleNewPasswordSubmit"
				/>
			</v-card-actions>
		</v-card>

		<v-snackbar
			v-model="showErrorMessage"
			color="error"
			:text="$t('auth.password_reset_messages.error')"
		/>
	</div>
</template>

<script lang="ts" setup>
import SubmitBtn from "~/components/Containment/Btns/SubmitBtn.vue";
import { useAuthStore } from "~/stores/authStore";

const { loading, passwordResetForm, showErrorMessage } =
	storeToRefs(useAuthStore());
const { required, password: passwordRule } = useValidation();
const { sendNewPassword } = useAuthStore();
const { locale } = useI18n();
const localeRoute = useLocaleRoute();

const handleNewPasswordSubmit = async (): Promise<void> => {
	const token = useRoute().params.token as string;
	const success = await sendNewPassword(token, locale.value);
	if (success) {
		navigateTo(localeRoute("/auth/password-reset/reset-success"));
	}
};
const { t } = useI18n();
const closeWindow = () => {
	if (confirm(t("actions.close_window"))) {
		close();
	}
};

definePageMeta({
	name: "passwordReset",
	path: "/auth/password-reset/:token",
	// middleware: ["validate-reset-token"],
	layout: "content-center",
});
</script>

<style></style>
