<template>
	<v-form ref="registerFormRef">
		<div class="d-flex flex-column ga-1">
			<template v-if="isNew">
				<v-text-field
					v-model="userForm.username"
					:label="$t('auth.login')"
					:placeholder="$t('auth.login_placeholder')"
					prepend-inner-icon="mdi-account-key"
					:rules="requiredRules"
					@update:model-value="validate">
				</v-text-field>
				<v-text-field
					v-model="userForm.password"
					:append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
					:type="visible ? 'text' : 'password'"
					:label="$t('auth.password')"
					:placeholder="$t('auth.password_placeholder')"
					prepend-inner-icon="mdi-lock-outline"
					:rules="requiredRules"
					@click:append-inner="visible = !visible">
				</v-text-field>
			</template>
			<v-text-field
				v-model="userForm.displayName"
				:label="$t('auth.display_name')"
				:placeholder="$t('auth.login_placeholder')"
				prepend-inner-icon="mdi-account-eye">
			</v-text-field>
			<v-text-field
				v-model="userForm.email"
				:label="$t('auth.email')"
				:placeholder="$t('auth.email_placeholder')"
				prepend-inner-icon="mdi-email-outline">
			</v-text-field>
			<v-text-field
				v-model.number="userForm.age"
				:label="$t('forms.person.age')"
				prepend-inner-icon="mdi-calendar">
			</v-text-field>
			<v-textarea
				v-model="userForm.about"
				:label="$t('auth.about')"
				rows="3"
				prepend-inner-icon="mdi-pencil">
			</v-textarea>
		</div>
	</v-form>
</template>

<script lang="ts" setup>
	import { useAuthStore } from "~/stores/authStore";
	defineProps<{
		isNew: boolean;
	}>();
	const emit = defineEmits(["form:submit"]);
	const isFormValid = ref(false);
	const { userForm, loading, authError, showErrorMessage } =
		storeToRefs(useAuthStore());
	const registerFormRef = ref();
	const { t } = useI18n();
	const visible = ref(false);

	const requiredRules = [
		(value: string) => {
			if (value) return true;
			return t("forms.rules.required");
		},
	];

	const validate = async () => {
		const { valid } = await registerFormRef.value.validate();
		if (valid) {
			isFormValid.value = true;
			emit("form:submit");
		}
	};
</script>

<style></style>
