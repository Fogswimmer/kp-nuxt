<template>
  <div>
    <Head>
      <Title>{{ definePageTitle($t("auth.password_reset")) }}</Title>
    </Head>
    <v-sheet class="mx-auto" max-width="600">
      <v-toolbar>
        <v-toolbar-title>
          {{ $t("auth.password_reset") }}
        </v-toolbar-title>
      </v-toolbar>
      <v-card variant="tonal">
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
    </v-sheet>
    <v-snackbar
      v-model="showErrorMessage"
      color="error"
      :text="$t('auth.password_reset_messages.error')"
    />
  </div>
</template>

<script lang="ts" setup>
import { useAuthStore } from "~/stores/authStore";
import SubmitBtn from "~/components/Containment/Btns/SubmitBtn.vue";

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
  path: "/password-reset/:slug",
});
</script>

<style></style>
