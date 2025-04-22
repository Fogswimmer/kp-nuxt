<template>
  <div>
    <Head>
      <Title>{{ definePageTitle($t("auth.sign_in")) }}</Title>
    </Head>
    <AuthCard :title="$t('auth.sign_in')">
      <v-form ref="loginFormRef" class="mt-4">
        <div class="d-flex flex-column ga-2">
          <v-text-field
            v-model="userForm.username"
            :label="$t('auth.login')"
            :placeholder="$t('auth.login_placeholder')"
            prepend-inner-icon="mdi-account-key"
            variant="outlined"
            :rules="requiredRules"
          />
          <v-text-field
            v-model="userForm.password"
            :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
            :type="visible ? 'text' : 'password'"
            :label="$t('auth.password')"
            :placeholder="$t('auth.password_placeholder')"
            prepend-inner-icon="mdi-lock-outline"
            variant="outlined"
            :rules="requiredRules"
            @click:append-inner="visible = !visible"
          />
        </div>
        <v-label>
          <NuxtLink :to="localeRoute('/auth/password-reset')">
            {{ $t("auth.forgot_password") }}</NuxtLink
          >
        </v-label>
      </v-form>
      <div class="d-flex flex-column ga-4 mt-10">
        <v-btn
          color="primary"
          size="large"
          variant="tonal"
          block
          :loading="loading"
          @click="validate"
        >
          {{ $t("auth.sign_in") }}
        </v-btn>
        <v-btn
          to="/auth/sign-up"
          variant="outlined"
          block
          size="large"
          color="secondary"
          prepend-icon="mdi-account-plus"
        >
          {{ $t("auth.register") }}
        </v-btn>

        <v-btn
          prepend-icon="mdi-account-off"
          variant="plain"
          block
          size="large"
          to="/"
        >
          {{ $t("auth.continue_as_guest") }}
        </v-btn>
      </div>
    </AuthCard>
    <v-snackbar
      v-model="showErrorMessage"
      color="error"
      :text="$t('auth.invalid_credentials')"
    />
  </div>
</template>

<script lang="ts" setup>
import { useAuthStore } from "~/stores/authStore";
import AuthCard from "~/components/Containment/Cards/AuthCard.vue";

const { userForm, loading, showErrorMessage } = storeToRefs(useAuthStore());
const { t } = useI18n();
const visible = ref<boolean>(false);
const localeRoute = useLocaleRoute();
const loginFormRef = ref<HTMLFormElement | null>();
const { login, fetchCurrentUser } = useAuthStore();
const requiredRules = [
  (value: string) => {
    if (value) return true;
    return t("forms.rules.required");
  },
];
const validate = async () => {
  if (loginFormRef.value) {
    const { valid } = await loginFormRef.value.validate();
    if (valid) {
      await login();
      if (!showErrorMessage.value) {
        await fetchCurrentUser();
        navigateTo("/");
      }
    }
  }
};

definePageMeta({
  name: "signIn",
  title: "Sign in",
});
</script>
