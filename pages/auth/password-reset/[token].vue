<template>
  <div>
    <Head>
      <Title>{{ definePageTitle($t("auth.password_reset")) }}</Title>
    </Head>
    <AuthCard :title="$t('auth.password_reset')">
      <v-card>
        <v-card-text class="pa-4">
          <v-form ref="emailFormRef" class="mt-4">
            <div class="d-flex flex-column ga-2">
              <span class="text-caption text-secondary">{{
                $t("forms.rules.password_requirement")
              }}</span>
              <v-text-field
                v-model="passwordResetForm.newPassword"
                :label="$t('auth.new_password')"
                prepend-inner-icon="mdi-email-outline"
                variant="outlined"
                :rules="[required, passwordRule]"
              />
            </div>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn>{{ $t('auth.login') }}</v-btn>

          <SubmitBtn :loading="loading" @click="handleNewPasswordSubmit" />
        </v-card-actions>
      </v-card>
    </AuthCard>
    <v-snackbar
      v-model="showErrorMessage"
      color="error"
      :text="$t('auth.password_reset_messages.error')"
    />
  </div>
</template>

<script lang="ts" setup>
import AuthCard from "~/components/Containment/Cards/AuthCard.vue";
import SubmitBtn from "~/components/Containment/Btns/SubmitBtn.vue";
import { useAuthStore } from "~/stores/authStore";

const { loading, passwordResetForm, showErrorMessage } =
  storeToRefs(useAuthStore());
const { required, password: passwordRule } = useValidation();
const { sendNewPassword } = useAuthStore();

const showSuccessMessage = ref<boolean>(false);
const handleNewPasswordSubmit = async (): Promise<void> => {
  const success = await sendNewPassword();
  if (success) {
    showSuccessMessage.value = true;
  }
};
definePageMeta({
  name: "passwordReset",
  path: "/auth/password-reset/:token",
  middleware: ["validate-reset-token"], 
});
</script>

<style></style>
