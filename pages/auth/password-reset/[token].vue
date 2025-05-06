<template>
  <div>
    <Head>
      <Title>{{ definePageTitle($t("auth.password_reset")) }}</Title>
    </Head>

    <v-card>
      <v-card-title>
        {{ $t("auth.password_reset") }}
      </v-card-title>
      <v-card-subtitle>
        <span class="text-caption text-secondary">{{
          $t("forms.rules.password_requirement")
        }}</span>
      </v-card-subtitle>
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
        <v-btn prepend-icon="mdi-close" @click="closeWindow">{{
          $t("actions.close_window")
        }}</v-btn>
        <SubmitBtn :loading="loading" @click="handleNewPasswordSubmit" />
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

const handleNewPasswordSubmit = async (): Promise<void> => {
  const token = useRoute().params.token as string;
  const success = await sendNewPassword(token);
  if (success) {
    navigateTo("/auth/password-reset/reset-success");
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
  middleware: ["validate-reset-token"],
  layout: "auth",
});
</script>

<style></style>
