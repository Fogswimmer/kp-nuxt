<template>
  <div>
    <Head>
      <Title>{{ definePageTitle($t("auth.password_reset")) }}</Title>
    </Head>
    <v-sheet class="mx-auto" max-width="600">
      <v-toolbar>
        <template #prepend>
          <BackBtn />
        </template>
        <v-toolbar-title>
          {{ $t("auth.password_reset") }}
        </v-toolbar-title>
      </v-toolbar>

      <v-card variant="tonal">
        <v-card-text class="pa-4">
          <v-form ref="emailFormRef" class="mt-4">
            <div class="d-flex flex-column ga-2">
              <v-text-field
                v-model="passwordResetForm.email"
                :label="$t('auth.password_reset_email')"
                :placeholder="$t('auth.password_reset_email')"
                prepend-inner-icon="mdi-email-outline"
                variant="outlined"
                :rules="[required, emailRule]"
              />
            </div>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <SubmitBtn :loading="loading" @click="handleValidationAndSubmit" />
        </v-card-actions>
      </v-card>
    </v-sheet>
    <v-snackbar
      v-model="showSuccessMessage"
      color="success"
      :text="$t('auth.password_reset_messages.success')"
    />
    <v-snackbar
      v-model="showErrorMessage"
      color="error"
      :text="$t('auth.password_reset_messages.error')"
    />
  </div>
</template>

<script lang="ts" setup>
import BackBtn from "~/components/Containment/Btns/BackBtn.vue";
import SubmitBtn from "~/components/Containment/Btns/SubmitBtn.vue";
import { useAuthStore } from "~/stores/authStore";

const { loading, passwordResetForm, showErrorMessage } =
  storeToRefs(useAuthStore());
const { resetPasswordRequest } = useAuthStore();
const { required, email: emailRule } = useValidation();

const { locale } = useI18n();
const emailFormRef = ref<HTMLFormElement | null>(null);
const isFormValid = ref<boolean>(false);
const showSuccessMessage = ref<boolean>(false);

const validate = async (): Promise<boolean> => {
  if (!emailFormRef.value) return false;
  const result = await emailFormRef.value.validate();
  isFormValid.value = result.valid;

  return result.valid;
};
const handleValidationAndSubmit = async (): Promise<void> => {
  const isValid = await validate();
  if (isValid) {
    const success = await resetPasswordRequest(locale.value);
    if (success) {
      showSuccessMessage.value = true;
    }
  }
};
definePageMeta({
  name: "passwordResetEmail",
});
</script>
